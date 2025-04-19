import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { WeatherData } from "@shared/schema";
import LocationInput from "@/components/LocationInput";
import WeatherDisplay from "@/components/WeatherDisplay";
import InitialMessage from "@/components/InitialMessage";
import ForecastDisplay from "@/components/ForecastDisplay";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  const [location, setLocation] = useState<string>("");
  
  const { data: weatherData, isLoading, isError, refetch } = useQuery<WeatherData>({
    queryKey: [`/api/weather?location=${encodeURIComponent(location)}`],
    enabled: !!location,
  });

  const handleSearch = (searchValue: string) => {
    setLocation(searchValue);
  };

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude},${longitude}`);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
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

        {!location && !isLoading && !weatherData && !isError && (
          <InitialMessage />
        )}

        {(!!location || isLoading || weatherData || isError) && (
          <WeatherDisplay 
            weatherData={weatherData} 
            isLoading={isLoading} 
            isError={isError} 
          />
        )}

        {weatherData?.forecast && weatherData.forecast.length > 0 && !isLoading && !isError && (
          <ForecastDisplay forecast={weatherData.forecast} />
        )}
      </div>
    </div>
  );
}
