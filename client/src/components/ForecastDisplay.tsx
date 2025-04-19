import { ForecastData } from "@shared/schema";
import { WeatherIcon } from "@/icons/WeatherIcons";
import { getOutfitRecommendation } from "@/icons/ClothingIcons";
import { useState } from "react";

interface ForecastDisplayProps {
  forecast: ForecastData[];
}

export default function ForecastDisplay({ forecast }: ForecastDisplayProps) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  
  if (!forecast || forecast.length === 0) {
    return null;
  }

  const handleDayClick = (index: number) => {
    setSelectedDay(selectedDay === index ? null : index);
  };
  
  return (
    <div className="border-[3px] border-[#666666] bg-[#1E1E1E] p-4 md:p-6 mb-8 md:mb-10">
      <h2 className="text-xl md:text-2xl font-bold uppercase mb-4">5-DAY FORECAST</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {forecast.map((day, index) => {
          const temp = (day.maxTemp + day.minTemp) / 2;
          const isCold = temp < 15;
          const isHot = temp >= 25;
          const borderColor = isCold ? "border-[#52B7FF]" : isHot ? "border-[#FF5252]" : "border-[#666666]";
          const isSelected = selectedDay === index;
          
          return (
            <div 
              key={day.date} 
              className={`bg-[#333333] p-3 cursor-pointer transition-all duration-200 ${isSelected ? 'border-2 border-white' : 'border-2 ' + borderColor}`}
              onClick={() => handleDayClick(index)}
            >
              <div className="text-center">
                <div className="text-sm uppercase">{day.date.split(',')[0]}</div>
                <div className="mt-2 text-4xl flex justify-center">
                  <WeatherIcon condition={day.condition} />
                </div>
                <div className="uppercase text-xs mt-1">{day.condition}</div>
                
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm">{Math.round(day.minTemp)}°</span>
                  <span className="text-sm font-bold">{Math.round(day.maxTemp)}°</span>
                </div>
                
                {day.hasRainOrSnow && (
                  <div className="mt-1 flex items-center justify-center text-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 text-[#52B7FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 19.5v2M13 19.5v2M10 19.5v2" />
                    </svg>
                    <span>{day.precipitationProbability}%</span>
                  </div>
                )}
              </div>
              
              {isSelected && (
                <div className="mt-3 pt-3 border-t border-[#666666]">
                  <p className="text-xs uppercase mb-2 font-bold">RECOMMENDED:</p>
                  <DayOutfitPreview temperature={temp} condition={day.condition} hasRainOrSnow={day.hasRainOrSnow} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Helper component to show a compact outfit preview for each day
function DayOutfitPreview({ temperature, condition, hasRainOrSnow }: { temperature: number, condition: string, hasRainOrSnow: boolean }) {
  const recommendation = getOutfitRecommendation(temperature, condition, hasRainOrSnow);
  
  // Filter out items with "NONE" label (except when it's the only choice)
  const significantItems = [
    { item: recommendation.head, type: 'head' },
    { item: recommendation.upper, type: 'upper' },
    { item: recommendation.lower, type: 'lower' },
    { item: recommendation.foot, type: 'foot' },
    { item: recommendation.accessory, type: 'accessory' },
    { item: recommendation.extra, type: 'extra' }
  ].filter(({ item }) => item.label !== "NONE" && item.label !== "NONE/CAP");
  
  // Always include upper and lower body clothing 
  const upperIncluded = significantItems.some(item => item.type === 'upper');
  const lowerIncluded = significantItems.some(item => item.type === 'lower');
  
  // Final items to display, prioritizing important items first
  const displayItems = [
    ...(!upperIncluded ? [recommendation.upper] : []),
    ...(!lowerIncluded ? [recommendation.lower] : []),
    ...significantItems.map(item => item.item)
  ].slice(0, 3); // Show at most 3 items
  
  // If only showing one item, add in the essentials
  if (displayItems.length === 1) {
    displayItems.push(recommendation.upper);
    displayItems.push(recommendation.lower);
  } else if (displayItems.length === 2) {
    // If only showing two items, ensure at least one is a key weather item
    if (hasRainOrSnow && !displayItems.some(item => item.label.includes("UMBRELLA"))) {
      displayItems.push(recommendation.extra);
    } else if (temperature > 25 && !displayItems.some(item => item.label.includes("SUN"))) {
      displayItems.push(recommendation.accessory);
    } else if (temperature < 10 && !displayItems.some(item => item.label.includes("COAT") || item.label.includes("JACKET"))) {
      displayItems.push(recommendation.upper);
    }
  }
  
  return (
    <div className="grid grid-cols-3 gap-2">
      {displayItems.slice(0, 3).map((item, index) => (
        <div key={index} className="bg-[#444444] flex flex-col items-center justify-center p-1">
          {item.icon}
          <span className="text-[8px] uppercase">{item.label}</span>
        </div>
      ))}
    </div>
  );
}