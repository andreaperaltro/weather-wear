// @ts-ignore Import error for Vercel module - install as a dev dependency
import { VercelRequest, VercelResponse } from '@vercel/node';
import fetch from 'node-fetch';
import { fallbackData } from './fallback-data';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Prepare debug info
  const debugInfo: Record<string, any> = {
    timestamp: new Date().toISOString(),
    nodeEnv: process.env.NODE_ENV || 'not set',
    vercelEnv: process.env.VERCEL_ENV || 'not set',
    vercelRegion: process.env.VERCEL_REGION || 'not set',
    apiKeys: {
      weatherApiKey: process.env.WEATHER_API_KEY ? 'present' : 'missing',
      geocodeApiKey: process.env.GEOCODE_API_KEY ? 'present' : 'missing'
    },
    headers: {
      userAgent: req.headers['user-agent'] || 'not present',
      host: req.headers.host || 'not present',
      referer: req.headers.referer || 'not present'
    },
    connectionTests: {},
    sampleQuery: req.query,
    fallbackDataSample: {
      current: fallbackData.current,
      location: fallbackData.location
    }
  };

  try {
    // Test geocoding API
    const testLocation = 'Milan,Italy';
    const geocodeUrl = `https://geocode.maps.co/search?q=${encodeURIComponent(testLocation)}&api_key=${process.env.GEOCODE_API_KEY}`;
    
    const geocodeTestStart = Date.now();
    const geocodeResponse = await fetch(geocodeUrl, {
      headers: { 'User-Agent': 'WeatherWear/1.0 (Debug Tool)' }
    });
    const geocodeTestEnd = Date.now();
    
    debugInfo.connectionTests.geocoding = {
      url: geocodeUrl.replace(process.env.GEOCODE_API_KEY || '', '[REDACTED]'),
      status: geocodeResponse.status,
      statusText: geocodeResponse.statusText,
      responseTime: `${geocodeTestEnd - geocodeTestStart}ms`,
      headers: Object.fromEntries(geocodeResponse.headers.entries()),
      hasData: geocodeResponse.ok,
      error: null
    };

    if (geocodeResponse.ok) {
      const data = await geocodeResponse.json();
      debugInfo.connectionTests.geocoding.dataPreview = 
        Array.isArray(data) ? `Array with ${data.length} items` : typeof data;
      
      // If we got coordinates, test the weather API too
      if (Array.isArray(data) && data.length > 0) {
        const { lat, lon } = data[0] as { lat: string, lon: string };
        
        // Test Weather API with the coordinates
        const weatherUrl = `https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${lat},${lon}&days=3&aqi=no&alerts=no`;
        
        const weatherTestStart = Date.now();
        const weatherResponse = await fetch(weatherUrl, {
          headers: { 'User-Agent': 'WeatherWear/1.0 (Debug Tool)' }
        });
        const weatherTestEnd = Date.now();
        
        debugInfo.connectionTests.weatherApi = {
          url: weatherUrl.replace(process.env.WEATHER_API_KEY || '', '[REDACTED]'),
          status: weatherResponse.status,
          statusText: weatherResponse.statusText,
          responseTime: `${weatherTestEnd - weatherTestStart}ms`,
          headers: Object.fromEntries(weatherResponse.headers.entries()),
          hasData: weatherResponse.ok,
          error: null
        };
        
        if (weatherResponse.ok) {
          const weatherData = await weatherResponse.json() as any;
          debugInfo.connectionTests.weatherApi.dataPreview = {
            location: weatherData?.location?.name,
            condition: weatherData?.current?.condition?.text,
            temp_c: weatherData?.current?.temp_c,
            forecast: weatherData?.forecast?.forecastday?.length + ' days'
          };
        }
      }
    }
  } catch (error) {
    debugInfo.connectionTests.error = {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    };
  }

  // Return debug info
  res.status(200).json(debugInfo);
} 