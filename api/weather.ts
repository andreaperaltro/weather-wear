import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';
import { format } from 'date-fns';

const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";
const GEO_API_URL = "https://geocoding-api.open-meteo.com/v1/search";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    // Only allow GET requests
    if (req.method !== 'GET') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    const location = req.query.location as string;
    if (!location) {
      return res.status(400).json({ message: "Location parameter is required" });
    }

    const isCoordinates = location.includes(",");
    let lat, lon, locationName, country;

    // Handle location input (coordinates or place name)
    if (isCoordinates) {
      [lat, lon] = location.split(",");
      const reverseGeoUrl = `${GEO_API_URL}?latitude=${lat}&longitude=${lon}&count=1`;
      const geoResponse = await fetch(reverseGeoUrl);
      
      if (geoResponse.ok) {
        const geoData = await geoResponse.json() as any;
        if (geoData.results && geoData.results.length > 0) {
          locationName = geoData.results[0].name;
          country = geoData.results[0].country;
        } else {
          locationName = "Unknown Location";
          country = "";
        }
      } else {
        locationName = "Unknown Location";
        country = "";
      }
    } else {
      const geoUrl = `${GEO_API_URL}?name=${encodeURIComponent(location)}&count=1`;
      const geoResponse = await fetch(geoUrl);
      
      if (!geoResponse.ok) {
        return res.status(404).json({ message: "Location not found" });
      }
      
      const geoData = await geoResponse.json() as any;
      if (!geoData.results || geoData.results.length === 0) {
        return res.status(404).json({ message: "Location not found" });
      }
      
      lat = geoData.results[0].latitude.toString();
      lon = geoData.results[0].longitude.toString();
      locationName = geoData.results[0].name;
      country = geoData.results[0].country;
    }

    // Fetch weather data from API
    const weatherApiUrl = `${WEATHER_API_URL}?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,precipitation&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&forecast_days=5&windspeed_unit=kmh&timezone=auto`;
    const weatherResponse = await fetch(weatherApiUrl);
    
    if (!weatherResponse.ok) {
      return res.status(weatherResponse.status).json({ 
        message: `Weather API error: ${weatherResponse.statusText}` 
      });
    }
    
    const weatherData = await weatherResponse.json() as any;
    const currentDate = new Date();
    const weatherCondition = weatherCodeToCondition(weatherData.current.weather_code);

    // Format weather data for frontend
    const formattedWeatherData = {
      location: {
        name: locationName,
        country,
        lat: parseFloat(lat),
        lon: parseFloat(lon)
      },
      current: {
        temp: weatherData.current.temperature_2m,
        feelsLike: weatherData.current.apparent_temperature,
        condition: weatherCondition,
        conditionIcon: "01d", // Placeholder icon code
        humidity: weatherData.current.relative_humidity_2m,
        wind: Math.round(weatherData.current.wind_speed_10m),
        precipitation: weatherData.current.precipitation || 0,
        uv: 0, // Not available in this API, using placeholder
        date: format(currentDate, "EEE, d MMM").toUpperCase(),
        time: format(currentDate, "HH:mm"),
        hasRainOrSnow: weatherCondition === "Rain" || weatherCondition === "Snow" || weatherCondition === "Drizzle"
      },
      forecast: weatherData.daily ? weatherData.daily.time.map((date: string, index: number) => {
        const condition = weatherCodeToCondition(weatherData.daily.weather_code[index]);
        return {
          date: format(new Date(date), "EEE, d MMM").toUpperCase(),
          maxTemp: weatherData.daily.temperature_2m_max[index],
          minTemp: weatherData.daily.temperature_2m_min[index],
          condition,
          precipitationProbability: weatherData.daily.precipitation_probability_max[index],
          hasRainOrSnow: condition === "Rain" || condition === "Snow" || condition === "Drizzle"
        };
      }) : []
    };

    // Return formatted weather data
    res.status(200).json(formattedWeatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ message: "Failed to fetch weather data" });
  }
}

// Convert weather code to condition string
function weatherCodeToCondition(code: number): string {
  if (code <= 3) return "Clear";
  if (code <= 49) return "Fog";
  if (code <= 59) return "Drizzle";
  if (code <= 69) return "Rain";
  if (code <= 79) return "Snow";
  if (code <= 99) return "Thunderstorm";
  return "Clear";
} 