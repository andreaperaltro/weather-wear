import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { WeatherData } from "@shared/schema";
import LocationInput from "@/components/LocationInput";
import WeatherDisplay from "@/components/WeatherDisplay";
import InitialMessage from "@/components/InitialMessage";
import ForecastDisplay from "@/components/ForecastDisplay";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  const [location, setLocation] = useState<string>("");
  const [useFallback, setUseFallback] = useState<boolean>(false);
  
  // Construct the API URL with fallback parameter if needed
  const apiUrl = useFallback 
    ? `/api/weather?fallback=true` 
    : `/api/weather?location=${encodeURIComponent(location)}`;
  
  const { data: weatherData, isLoading, isError, error, refetch } = useQuery<WeatherData>({
    queryKey: [apiUrl],
    enabled: !!location || useFallback,
    retry: 1,
    retryDelay: 1000,
  });

  // If there's an error, switch to fallback data
  useEffect(() => {
    if (isError && !useFallback) {
      console.error("Error fetching weather data:", error);
      console.log("Switching to fallback data");
      setUseFallback(true);
    }
  }, [isError, error, useFallback]);

  const handleSearch = (searchValue: string) => {
    setUseFallback(false); // Reset fallback when user searches
    setLocation(searchValue);
  };

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUseFallback(false); // Reset fallback when using geolocation
          setLocation(`${latitude},${longitude}`);
        },
        (error) => {
          console.error("Error getting location:", error);
          setUseFallback(true); // Use fallback on geolocation error
        }
      );
    } else {
      setUseFallback(true); // Use fallback if geolocation not available
    }
  };

  // Function to retry with fallback data
  const handleRetry = () => {
    if (isError && !useFallback) {
      setUseFallback(true);
    } else {
      refetch();
    }
  };

  return (
    <div className="min-h-screen text-white bg-[#121212]">
      <div className="container max-w-4xl mx-auto px-4 py-6 md:py-12">
        <div className="flex justify-between items-center mb-8 md:mb-12">
          <header>
            <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tighter border-b-4 border-[#666666] pb-2 inline-block">
              WEATHER<span className="text-[#FF5252]">WEAR</span>
            </h1>
            <p className="text-sm md:text-base mt-2 uppercase tracking-wide">
              BRUTALIST WEATHER & OUTFIT GUIDE
            </p>
          </header>
          
          <ThemeToggle />
        </div>

        <LocationInput 
          onSearch={handleSearch} 
          onGeolocation={handleGeolocation} 
          location={location}
        />

        {!location && !useFallback && !isLoading && !weatherData && !isError && (
          <InitialMessage />
        )}

        {(!!location || useFallback || isLoading || weatherData || isError) && (
          <WeatherDisplay 
            weatherData={weatherData} 
            isLoading={isLoading} 
            isError={isError && !useFallback}
            onRetry={handleRetry}
          />
        )}

        {weatherData?.forecast && weatherData.forecast.length > 0 && !isLoading && (!isError || useFallback) && (
          <ForecastDisplay forecast={weatherData.forecast} />
        )}

        {useFallback && weatherData && (
          <div className="mt-4 text-center text-xs opacity-70">
            <p>Using demo data. Weather information may not be accurate.</p>
          </div>
        )}
      </div>
    </div>
  );
}
