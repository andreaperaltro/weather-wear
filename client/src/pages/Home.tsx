import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { WeatherData } from "@shared/schema";
import LocationInput from "@/components/LocationInput";
import WeatherDisplay from "@/components/WeatherDisplay";
import InitialMessage from "@/components/InitialMessage";
import ForecastDisplay from "@/components/ForecastDisplay";
import ThemeToggle from "@/components/ThemeToggle";

// Check if we're on GitHub Pages
const isGitHubPages = window.location.hostname.includes('github.io') || 
                      window.location.pathname.includes('/weather-wear/');

// Import the fallback data and adapt it to the correct format
import { fallbackData as rawFallbackData } from "../../../api/fallback-data";

// Adapter function to convert API format to app format
const adaptFallbackData = (): WeatherData => {
  return {
    location: {
      name: rawFallbackData.location.name,
      country: rawFallbackData.location.country,
      lat: rawFallbackData.location.lat,
      lon: rawFallbackData.location.lon
    },
    current: {
      date: new Date().toISOString().split('T')[0],
      temp: rawFallbackData.current.temp_c,
      feelsLike: rawFallbackData.current.feelslike_c,
      condition: rawFallbackData.current.condition.text,
      conditionIcon: "",  // We're using text representation anyway
      humidity: rawFallbackData.current.humidity,
      wind: rawFallbackData.current.wind_kph,
      uv: 0, // Default value
      time: new Date().toLocaleTimeString(),
      hasRainOrSnow: ["Rain", "Snow", "Drizzle", "Sleet"].includes(rawFallbackData.current.condition.text)
    },
    forecast: rawFallbackData.forecast.forecastday.map(day => ({
      date: day.date,
      minTemp: day.day.mintemp_c,
      maxTemp: day.day.maxtemp_c,
      condition: day.day.condition.text,
      hasRainOrSnow: ["Rain", "Snow", "Drizzle", "Sleet"].includes(day.day.condition.text),
      precipitationProbability: 0 // Default value
    }))
  };
};

// Create the static data for GitHub Pages
const staticFallbackData = adaptFallbackData();

export default function Home() {
  const [location, setLocation] = useState<string>("Milan");
  const [useFallback, setUseFallback] = useState<boolean>(isGitHubPages);
  const [showDebug, setShowDebug] = useState<boolean>(false);
  const [errorDetails, setErrorDetails] = useState<string>(
    isGitHubPages ? "This is a static demo with limited functionality on GitHub Pages." : ""
  );
  
  // For GitHub Pages, we'll use the static fallback data directly
  const [staticData] = useState<WeatherData>(staticFallbackData);
  
  // Construct the API URL with fallback parameter if needed
  const apiUrl = useFallback || isGitHubPages
    ? (isGitHubPages ? "api/weather.json" : `/api/weather?fallback=true`)
    : `/api/weather?location=${encodeURIComponent(location)}`;
  
  const {
    data: weatherData,
    isLoading,
    isError,
    error,
    refetch,
    failureCount,
    failureReason
  } = useQuery<WeatherData>({
    queryKey: [apiUrl],
    enabled: !isGitHubPages && (!!location || useFallback), // Don't run API queries on GitHub Pages
    retry: 1,
    retryDelay: 1000,
  });

  // Use a debug API to diagnose issues
  const { data: debugData } = useQuery({
    queryKey: ['/api/debug'],
    enabled: showDebug && !isGitHubPages,
  });

  // If there's an error, capture details and switch to fallback data
  useEffect(() => {
    if (isError && !useFallback) {
      console.error("Error fetching weather data:", error);
      // Extract error details for debugging
      const errorMessage = error instanceof Error ? error.message : String(error);
      setErrorDetails(errorMessage);
      console.log("Switching to fallback data");
      setUseFallback(true);
    }
  }, [isError, error, useFallback]);

  // Use the appropriate data source
  const displayData = isGitHubPages ? staticData : weatherData;

  const handleSearch = (searchValue: string) => {
    if (!isGitHubPages) {
      setUseFallback(false); // Reset fallback when user searches (only if not on GitHub Pages)
      setErrorDetails(""); // Clear previous errors
      setLocation(searchValue);
    } else {
      setErrorDetails("Search functionality is limited on the GitHub Pages deployment. This is a static demo with pre-loaded data for Milan.");
    }
  };

  const handleGeolocation = () => {
    if (isGitHubPages) {
      setErrorDetails("Geolocation is not available in the GitHub Pages demo. This is a static demo with pre-loaded data for Milan.");
      return;
    }
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUseFallback(false); // Reset fallback when using geolocation
          setErrorDetails(""); // Clear previous errors
          setLocation(`${latitude},${longitude}`);
        },
        (error) => {
          console.error("Error getting location:", error);
          setErrorDetails(`Geolocation error: ${error.message}`);
          setUseFallback(true); // Use fallback on geolocation error
        }
      );
    } else {
      setErrorDetails("Geolocation not supported by browser");
      setUseFallback(true); // Use fallback if geolocation not available
    }
  };

  // Function to retry with fallback data
  const handleRetry = () => {
    if (isError && !useFallback) {
      setUseFallback(true);
    } else if (!isGitHubPages) {
      refetch();
    }
  };

  // Secret key combination to toggle debug mode (triple click on title)
  const handleTitleClick = () => {
    let clickCounter = Number(localStorage.getItem('titleClickCounter') || '0');
    clickCounter++;
    
    localStorage.setItem('titleClickCounter', clickCounter.toString());
    
    if (clickCounter >= 3) {
      setShowDebug(!showDebug);
      localStorage.setItem('titleClickCounter', '0');
    }
    
    // Reset counter after 2 seconds
    setTimeout(() => {
      localStorage.setItem('titleClickCounter', '0');
    }, 2000);
  };

  return (
    <div className="min-h-screen text-white bg-[#121212]">
      <div className="container max-w-4xl mx-auto px-4 py-6 md:py-12">
        <div className="flex justify-between items-center mb-8 md:mb-12">
          <header>
            <h1 
              className="text-4xl md:text-6xl font-extrabold uppercase tracking-tighter border-b-4 border-[#666666] pb-2 inline-block"
              onClick={handleTitleClick}
            >
              WEATHER<span className="text-[#FF5252]">WEAR</span>
            </h1>
            <p className="text-sm md:text-base mt-2 uppercase tracking-wide">
              BRUTALIST WEATHER & OUTFIT GUIDE
            </p>
          </header>
          
          <ThemeToggle />
        </div>

        {isGitHubPages && (
          <div className="mb-4 p-3 bg-[#333333] text-xs border border-[#666666]">
            <p className="font-bold">📌 GitHub Pages Demo Mode</p>
            <p className="mt-1">This is a static demo with pre-loaded weather data for Milan. Location search and geolocation features are disabled.</p>
            <p className="mt-1">For full functionality, check out the <a href="https://github.com/andreaperaltro/weather-wear" className="underline text-[#FF5252]" target="_blank" rel="noopener noreferrer">source code</a>.</p>
          </div>
        )}

        <LocationInput 
          onSearch={handleSearch} 
          onGeolocation={handleGeolocation} 
          location={location}
        />

        {!location && !useFallback && !isLoading && !displayData && !isError && !isGitHubPages && (
          <InitialMessage />
        )}

        {(!!location || useFallback || isLoading || displayData || isError || isGitHubPages) && (
          <WeatherDisplay 
            weatherData={displayData} 
            isLoading={isLoading && !isGitHubPages}
            isError={isError && !useFallback && !isGitHubPages}
            onRetry={handleRetry}
          />
        )}

        {displayData?.forecast && displayData.forecast.length > 0 && !isLoading && (!isError || useFallback || isGitHubPages) && (
          <ForecastDisplay forecast={displayData.forecast} />
        )}

        {(useFallback || isGitHubPages) && displayData && (
          <div className="mt-4 text-center text-xs opacity-70">
            <p>Using demo data. Weather information may not be accurate.</p>
            {isGitHubPages && (
              <p className="mt-1">
                This is a static GitHub Pages demo. For full functionality, check out the 
                <a href="https://github.com/andreaperaltro/weather-wear" className="underline ml-1" target="_blank" rel="noopener noreferrer">source code</a>.
              </p>
            )}
          </div>
        )}

        {/* Error details for debugging */}
        {errorDetails && (
          <div className="mt-4 p-3 bg-[#333333] text-xs border border-[#FF5252] text-[#FF5252]">
            <p className="font-bold">Error details:</p>
            <p className="font-mono mt-1 break-all">{errorDetails}</p>
          </div>
        )}

        {/* Debug panel (hidden by default) */}
        {showDebug && !isGitHubPages && (
          <div className="mt-8 p-4 bg-[#333333] border-2 border-[#666666] text-xs font-mono overflow-auto">
            <h3 className="text-sm font-bold uppercase mb-2">Debug Information</h3>
            <p>API URL: {apiUrl}</p>
            <p>Failure Count: {failureCount}</p>
            <p>Failure Reason: {failureReason?.message || 'None'}</p>
            <p>Use Fallback: {useFallback ? 'Yes' : 'No'}</p>
            <div className="mt-2">
              <p className="font-bold mb-1">Debug API Response:</p>
              <pre className="whitespace-pre-wrap">
                {debugData ? JSON.stringify(debugData, null, 2) : 'Loading debug data...'}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
