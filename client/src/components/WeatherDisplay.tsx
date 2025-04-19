import { WeatherData } from "@shared/schema";
import OutfitRecommendation from "@/components/OutfitRecommendation";
import NewWeatherIcon from "@/components/NewWeatherIcon";

interface WeatherDisplayProps {
  weatherData: WeatherData | undefined;
  isLoading: boolean;
  isError: boolean;
  onRetry?: () => void;
}

export default function WeatherDisplay({ 
  weatherData, 
  isLoading, 
  isError,
  onRetry
}: WeatherDisplayProps) {
  return (
    <div className="border-[3px] border-[#666666] bg-[#1E1E1E] p-4 md:p-6 mb-8 md:mb-10">
      {isLoading && (
        <div className="text-center py-10">
          <svg className="animate-spin mx-auto h-10 w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 uppercase">LOADING DATA</p>
        </div>
      )}
      
      {weatherData && !isLoading && !isError && (
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl md:text-3xl font-bold uppercase">{weatherData.location.name}</h2>
              <p className="text-sm md:text-base opacity-70 uppercase">{weatherData.location.country}</p>
            </div>
            <div className="text-right">
              <p className="text-sm md:text-base opacity-70 uppercase">{weatherData.current.date}</p>
              <p className="text-sm md:text-base opacity-70 uppercase">{weatherData.current.time}</p>
            </div>
          </div>
          
          <div className="mt-6 md:mt-10 flex flex-col md:flex-row gap-8">
            {/* Current weather */}
            <div className="md:w-1/2">
              <div className="flex items-center mb-4">
                <div className="mr-4 text-6xl md:text-7xl font-bold">
                  <span>{Math.round(weatherData.current.temp)}</span>°
                </div>
                <div>
                  <div className="text-5xl md:text-6xl mb-2">
                    <NewWeatherIcon condition={weatherData.current.condition} className="h-16 w-16" />
                  </div>
                  <div className="uppercase text-sm md:text-base">{weatherData.current.condition}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-center mb-4">
                <div className="bg-[#333333] p-2">
                  <div className="text-xs opacity-70 uppercase">FEELS LIKE</div>
                  <div className="text-lg font-bold">{Math.round(weatherData.current.feelsLike)}°</div>
                </div>
                
                <div className="bg-[#333333] p-2">
                  <div className="text-xs opacity-70 uppercase">HUMIDITY</div>
                  <div className="text-lg font-bold">{weatherData.current.humidity}%</div>
                </div>
                
                <div className="bg-[#333333] p-2">
                  <div className="text-xs opacity-70 uppercase">WIND</div>
                  <div className="text-lg font-bold">{weatherData.current.wind} KM/H</div>
                </div>
                
                <div className="bg-[#333333] p-2">
                  <div className="text-xs opacity-70 uppercase">
                    {(weatherData.current.precipitation || 0) > 0 ? "RAIN" : "UV INDEX"}
                  </div>
                  <div className="text-lg font-bold">
                    {(weatherData.current.precipitation || 0) > 0 ? 
                      `${weatherData.current.precipitation || 0} mm` : 
                      weatherData.current.uv}
                  </div>
                </div>
              </div>
              
              {/* Daily forecast info if available */}
              {weatherData.forecast && weatherData.forecast[0] && (
                <div className="bg-[#333333] p-3 border-2 border-[#666666]">
                  <p className="uppercase text-sm font-bold mb-2">TODAY'S FORECAST</p>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs uppercase">MIN/MAX</span>
                    <span className="text-sm font-bold">
                      {Math.round(weatherData.forecast[0].minTemp)}°/{Math.round(weatherData.forecast[0].maxTemp)}°
                    </span>
                  </div>
                  {weatherData.forecast[0].precipitationProbability > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-xs uppercase">PRECIPITATION</span>
                      <span className="text-sm font-bold">{weatherData.forecast[0].precipitationProbability}%</span>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Today's clothing recommendation */}
            <div className="md:w-1/2 bg-[#333333] border-2 border-[#666666] p-4">
              <h3 className="text-sm uppercase font-bold mb-3">TODAY'S OUTFIT</h3>
              <div className="grid grid-cols-3 gap-3">
                {weatherData && <OutfitRecommendation weatherData={weatherData} simplified={true} />}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {isError && !isLoading && (
        <div className="py-6 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-[#FF5252]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="mt-4 uppercase font-bold text-[#FF5252]">LOCATION NOT FOUND</p>
          <p className="mt-2 text-sm">PLEASE TRY ANOTHER CITY NAME</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-4 bg-[#444444] hover:bg-[#555555] text-white uppercase px-4 py-2 text-sm font-bold border border-[#666666]"
            >
              Use Demo Data
            </button>
          )}
        </div>
      )}
    </div>
  );
}
