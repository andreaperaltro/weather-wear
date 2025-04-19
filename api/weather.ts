import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';
import { format } from 'date-fns';

// API endpoints
const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";
const GEO_API_URL = "https://geocoding-api.open-meteo.com/v1/search";

// Type definitions
type GeocodingResult = {
  results?: Array<{
    name: string;
    country: string;
    latitude: number;
    longitude: number;
  }>;
};

type WeatherData = {
  current: {
    temperature_2m: number;
    apparent_temperature: number;
    relative_humidity_2m: number;
    weather_code: number;
    wind_speed_10m: number;
    precipitation: number;
  };
  daily?: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
    precipitation_probability_max: number[];
  };
};

// This is a Vercel Serverless Function
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Only allow GET requests
    if (req.method !== 'GET') {
      res.status(405).json({ message: 'Method not allowed' });
      return;
    }

    const location = req.query.location as string;
    if (!location) {
      res.status(400).json({ message: "Location parameter is required" });
      return;
    }

    // Extract coordinates or search for location
    const isCoordinates = location.includes(",");
    let lat: string, lon: string, locationName: string, country: string;

    if (isCoordinates) {
      // Parse coordinates
      [lat, lon] = location.split(",");
      
      try {
        const reverseGeoUrl = `${GEO_API_URL}?latitude=${lat}&longitude=${lon}&count=1`;
        const geoResponse = await fetch(reverseGeoUrl);
        
        if (geoResponse.ok) {
          const geoData = await geoResponse.json() as GeocodingResult;
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
      } catch (error) {
        // Fallback if reverse geocoding fails
        locationName = "Unknown Location";
        country = "";
      }
    } else {
      // Search by location name
      try {
        const geoUrl = `${GEO_API_URL}?name=${encodeURIComponent(location)}&count=1`;
        const geoResponse = await fetch(geoUrl);
        
        if (!geoResponse.ok) {
          res.status(404).json({ message: "Location not found" });
          return;
        }
        
        const geoData = await geoResponse.json() as GeocodingResult;
        if (!geoData.results || geoData.results.length === 0) {
          res.status(404).json({ message: "Location not found" });
          return;
        }
        
        lat = geoData.results[0].latitude.toString();
        lon = geoData.results[0].longitude.toString();
        locationName = geoData.results[0].name;
        country = geoData.results[0].country;
      } catch (error) {
        res.status(500).json({ message: "Error searching for location" });
        return;
      }
    }

    // Fetch weather data
    try {
      const weatherApiUrl = `${WEATHER_API_URL}?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,precipitation&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&forecast_days=5&windspeed_unit=kmh&timezone=auto`;
      const weatherResponse = await fetch(weatherApiUrl);
      
      if (!weatherResponse.ok) {
        res.status(weatherResponse.status).json({ 
          message: `Weather API error: ${weatherResponse.statusText}` 
        });
        return;
      }
      
      const weatherData = await weatherResponse.json() as WeatherData;
      const currentDate = new Date();
      const weatherCondition = weatherCodeToCondition(weatherData.current.weather_code);

      // Format weather data
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
          const condition = weatherCodeToCondition(weatherData.daily!.weather_code[index]);
          return {
            date: format(new Date(date), "EEE, d MMM").toUpperCase(),
            maxTemp: weatherData.daily!.temperature_2m_max[index],
            minTemp: weatherData.daily!.temperature_2m_min[index],
            condition,
            precipitationProbability: weatherData.daily!.precipitation_probability_max[index],
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
  } catch (error) {
    console.error("Unhandled error:", error);
    res.status(500).json({ message: "Internal server error" });
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