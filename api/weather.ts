import type { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';
import { format } from 'date-fns';
import { fallbackData } from './fallback-data';

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

/**
 * The API handler for the /api/weather endpoint
 */
export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  // Add timestamp to help debug
  console.log(`[${new Date().toISOString()}] API weather request received:`, req.url);
  
  // Enable CORS for all origins
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,HEAD');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Only allow GET requests
    if (req.method !== 'GET') {
      console.log(`[${new Date().toISOString()}] Method not allowed: ${req.method}`);
      res.status(405).json({ message: 'Method not allowed' });
      return;
    }

    // Immediately check for fallback parameter - if present, return fallback data
    if (req.query.fallback === 'true') {
      console.log(`[${new Date().toISOString()}] Serving fallback data as requested`);
      res.status(200).json(fallbackData);
      return;
    }

    const location = req.query.location as string;
    console.log(`[${new Date().toISOString()}] Location requested: ${location}`);
    
    if (!location) {
      console.log(`[${new Date().toISOString()}] No location provided, using fallback data`);
      res.status(200).json(fallbackData);
      return;
    }

    // Extract coordinates or search for location
    const isCoordinates = location.includes(",");
    let lat: string, lon: string, locationName: string, country: string;

    if (isCoordinates) {
      // Parse coordinates
      [lat, lon] = location.split(",");
      console.log(`[${new Date().toISOString()}] Coordinates provided: ${lat}, ${lon}`);
      
      try {
        const reverseGeoUrl = `${GEO_API_URL}?latitude=${lat}&longitude=${lon}&count=1`;
        console.log(`[${new Date().toISOString()}] Fetching from: ${reverseGeoUrl}`);
        
        const geoResponse = await fetch(reverseGeoUrl);
        
        if (geoResponse.ok) {
          const geoData = await geoResponse.json() as GeocodingResult;
          if (geoData.results && geoData.results.length > 0) {
            locationName = geoData.results[0].name;
            country = geoData.results[0].country;
            console.log(`[${new Date().toISOString()}] Reverse geocoding successful: ${locationName}, ${country}`);
          } else {
            locationName = "Unknown Location";
            country = "";
            console.log(`[${new Date().toISOString()}] Reverse geocoding returned no results`);
          }
        } else {
          locationName = "Unknown Location";
          country = "";
          console.log(`[${new Date().toISOString()}] Reverse geocoding failed with status: ${geoResponse.status}`);
        }
      } catch (error) {
        // Fallback if reverse geocoding fails
        console.error(`[${new Date().toISOString()}] Error in reverse geocoding:`, error);
        console.log(`[${new Date().toISOString()}] Using fallback data due to reverse geocoding error`);
        res.status(200).json(fallbackData);
        return;
      }
    } else {
      // Search by location name
      try {
        const geoUrl = `${GEO_API_URL}?name=${encodeURIComponent(location)}&count=1`;
        console.log(`[${new Date().toISOString()}] Fetching from: ${geoUrl}`);
        
        const geoResponse = await fetch(geoUrl, {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'WeatherWardrobe/1.0'
          }
        });
        
        if (!geoResponse.ok) {
          console.log(`[${new Date().toISOString()}] Geocoding failed with status: ${geoResponse.status}`);
          console.log(`[${new Date().toISOString()}] Using fallback data due to geocoding error`);
          res.status(200).json(fallbackData);
          return;
        }
        
        const geoData = await geoResponse.json() as GeocodingResult;
        if (!geoData.results || geoData.results.length === 0) {
          console.log(`[${new Date().toISOString()}] Geocoding returned no results`);
          console.log(`[${new Date().toISOString()}] Using fallback data due to no geocoding results`);
          res.status(200).json(fallbackData);
          return;
        }
        
        lat = geoData.results[0].latitude.toString();
        lon = geoData.results[0].longitude.toString();
        locationName = geoData.results[0].name;
        country = geoData.results[0].country;
        console.log(`[${new Date().toISOString()}] Geocoding successful: ${locationName}, ${country} (${lat}, ${lon})`);
      } catch (error) {
        console.error(`[${new Date().toISOString()}] Error in geocoding:`, error);
        console.log(`[${new Date().toISOString()}] Using fallback data due to geocoding error`);
        res.status(200).json(fallbackData);
        return;
      }
    }

    // Fetch weather data
    try {
      const weatherApiUrl = `${WEATHER_API_URL}?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,precipitation&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&forecast_days=5&windspeed_unit=kmh&timezone=auto`;
      console.log(`[${new Date().toISOString()}] Fetching weather from: ${weatherApiUrl}`);
      
      const weatherResponse = await fetch(weatherApiUrl, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'WeatherWardrobe/1.0'
        }
      });
      
      if (!weatherResponse.ok) {
        console.log(`[${new Date().toISOString()}] Weather API failed with status: ${weatherResponse.status}`);
        console.log(`[${new Date().toISOString()}] Using fallback data due to weather API error`);
        res.status(200).json(fallbackData);
        return;
      }
      
      const weatherData = await weatherResponse.json() as WeatherData;
      const currentDate = new Date();
      const weatherCondition = weatherCodeToCondition(weatherData.current.weather_code);
      console.log(`[${new Date().toISOString()}] Weather condition: ${weatherCondition}`);

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
      console.log(`[${new Date().toISOString()}] Successfully returning weather data`);
      res.status(200).json(formattedWeatherData);
    } catch (error) {
      console.error(`[${new Date().toISOString()}] Error fetching weather data:`, error);
      console.log(`[${new Date().toISOString()}] Using fallback data due to weather data error`);
      res.status(200).json(fallbackData);
    }
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Unhandled error:`, error);
    console.log(`[${new Date().toISOString()}] Using fallback data due to unhandled error`);
    res.status(200).json(fallbackData);
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