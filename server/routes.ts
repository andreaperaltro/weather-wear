import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fetch from "node-fetch";
import { format } from "date-fns";

// Weather API configuration - using Open-Meteo which is free and doesn't require an API key
const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";
const GEO_API_URL = "https://geocoding-api.open-meteo.com/v1/search";

// Type definitions for API responses
interface GeocodingResult {
  results?: Array<{
    name: string;
    country: string;
    latitude: number;
    longitude: number;
  }>;
}

interface WeatherData {
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
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Endpoint to get weather data based on location (city name or coordinates)
  app.get("/api/weather", async (req, res) => {
    try {
      const location = req.query.location as string;
      
      if (!location) {
        return res.status(400).json({ message: "Location parameter is required" });
      }
      
      // Check if location is coordinates (latitude,longitude)
      const isCoordinates = location.includes(",");
      
      let lat, lon, locationName, country;
      
      // If coordinates are provided directly, use them
      if (isCoordinates) {
        [lat, lon] = location.split(",");
        // Use reverse geocoding to get location name
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
      } 
      // Otherwise, search for the location by name
      else {
        // Get coordinates from location name
        const geoUrl = `${GEO_API_URL}?name=${encodeURIComponent(location)}&count=1`;
        const geoResponse = await fetch(geoUrl);
        
        if (!geoResponse.ok) {
          return res.status(404).json({ message: "Location not found" });
        }
        
        const geoData = await geoResponse.json() as GeocodingResult;
        
        if (!geoData.results || geoData.results.length === 0) {
          return res.status(404).json({ message: "Location not found" });
        }
        
        lat = geoData.results[0].latitude.toString();
        lon = geoData.results[0].longitude.toString();
        locationName = geoData.results[0].name;
        country = geoData.results[0].country;
      }
      
      // Get weather data using coordinates including 5-day forecast
      const weatherApiUrl = `${WEATHER_API_URL}?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,precipitation&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&forecast_days=5&windspeed_unit=kmh&timezone=auto`;
      const weatherResponse = await fetch(weatherApiUrl);
      
      if (!weatherResponse.ok) {
        return res.status(weatherResponse.status).json({ 
          message: `Weather API error: ${weatherResponse.statusText}` 
        });
      }
      
      const weatherData = await weatherResponse.json() as WeatherData;
      const currentDate = new Date();

      // Map weather code to condition
      const weatherCondition = weatherCodeToCondition(weatherData.current.weather_code);
      
      // Format the weather data
      const formattedWeatherData = {
        location: {
          name: locationName,
          country: country,
          lat: parseFloat(lat),
          lon: parseFloat(lon),
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
        forecast: weatherData.daily ? weatherData.daily.time.map((date, index) => {
          const condition = weatherCodeToCondition(weatherData.daily!.weather_code[index]);
          return {
            date: format(new Date(date), "EEE, d MMM").toUpperCase(),
            maxTemp: weatherData.daily!.temperature_2m_max[index],
            minTemp: weatherData.daily!.temperature_2m_min[index],
            condition: condition,
            precipitationProbability: weatherData.daily!.precipitation_probability_max[index],
            hasRainOrSnow: condition === "Rain" || condition === "Snow" || condition === "Drizzle"
          };
        }) : []
      };
      
      res.json(formattedWeatherData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      res.status(500).json({ message: "Failed to fetch weather data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Function to convert weather code to condition string
function weatherCodeToCondition(code: number): string {
  // Based on WMO Weather interpretation codes (WW)
  // https://open-meteo.com/en/docs
  if (code <= 3) return "Clear";
  if (code <= 49) return "Fog";
  if (code <= 59) return "Drizzle";
  if (code <= 69) return "Rain";
  if (code <= 79) return "Snow";
  if (code <= 99) return "Thunderstorm";
  return "Clear";
}
