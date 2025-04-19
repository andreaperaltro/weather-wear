import { ForecastData } from "@shared/schema";
import { getOutfitRecommendation } from "@/icons/ClothingIcons";
import NewWeatherIcon from "@/components/NewWeatherIcon";
import NewClothingIcon from "@/components/NewClothingIcon";
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
      
      <div className="flex flex-col gap-4">
        {forecast.map((day, index) => {
          const temp = (day.maxTemp + day.minTemp) / 2;
          const isCold = temp < 15;
          const isHot = temp >= 25;
          const borderColor = isCold ? "border-[#52B7FF]" : isHot ? "border-[#FF5252]" : "border-[#666666]";
          const isSelected = selectedDay === index;
          
          return (
            <div 
              key={day.date} 
              className={`bg-[#333333] cursor-pointer transition-all duration-200 ${isSelected ? 'border-2 border-white' : 'border-2 ' + borderColor}`}
              onClick={() => handleDayClick(index)}
            >
              {/* Day header */}
              <div className="bg-[#222222] px-3 py-2 text-center">
                <div className="text-base uppercase font-medium">{day.date.split(',')[0]}</div>
              </div>
              
              <div className="p-3">
                {/* Two-column layout */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Weather column */}
                  <div className="flex flex-col items-center">
                    <NewWeatherIcon condition={day.condition} className="h-12 w-12 mb-2" />
                    <div className="uppercase text-sm font-medium text-center">{day.condition}</div>
                    
                    <div className="flex justify-between w-full mt-3 px-2">
                      <span className="text-sm">{Math.round(day.minTemp)}°</span>
                      <span className="text-sm font-bold">{Math.round(day.maxTemp)}°</span>
                    </div>
                    
                    {day.hasRainOrSnow && (
                      <div className="mt-2 flex items-center text-xs">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 text-[#52B7FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 19.5v2M13 19.5v2M10 19.5v2" />
                        </svg>
                        <span>{day.precipitationProbability}%</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Clothing column */}
                  <div className="flex flex-col">
                    <div className="text-xs uppercase font-bold mb-2">RECOMMENDED:</div>
                    <DayOutfitPreview temperature={temp} condition={day.condition} hasRainOrSnow={day.hasRainOrSnow} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Helper component to show clothing recommendations for each day
function DayOutfitPreview({ temperature, condition, hasRainOrSnow }: { temperature: number, condition: string, hasRainOrSnow: boolean }) {
  const recommendation = getOutfitRecommendation(temperature, condition, hasRainOrSnow);
  
  // Create categories for different types of clothing
  const essentials = []; // Core items everyone needs
  const weatherSpecific = []; // Items specific to the current weather
  const accessories = []; // Optional but helpful items
  
  // Categorize all items and filter out "NONE" labels
  if (recommendation.upper.label !== "NONE") 
    essentials.push(recommendation.upper);
  
  if (recommendation.lower.label !== "NONE") 
    essentials.push(recommendation.lower);
  
  // Weather-specific items based on conditions
  if (temperature < 15) {
    // Cold weather - outerwear and foot protection are essential
    if (recommendation.head.label !== "NONE" && recommendation.head.label !== "NONE/CAP")
      weatherSpecific.push(recommendation.head);
      
    if (recommendation.foot.label !== "NONE")
      weatherSpecific.push(recommendation.foot);
  } else {
    // Warm weather - foot protection still matters
    if (recommendation.foot.label !== "NONE")
      essentials.push(recommendation.foot);
      
    if (recommendation.head.label !== "NONE" && recommendation.head.label !== "NONE/CAP")
      weatherSpecific.push(recommendation.head);
  }
  
  // Weather protection accessories
  if (hasRainOrSnow && recommendation.extra.label.includes("UMBRELLA"))
    weatherSpecific.push(recommendation.extra);
  else if (temperature < 5 && (recommendation.accessory.label.includes("GLOVES") || recommendation.accessory.label.includes("SCARF")))
    weatherSpecific.push(recommendation.accessory);
  else if (temperature > 25 && (recommendation.accessory.label.includes("SUN") || recommendation.extra.label.includes("SUN"))) {
    if (recommendation.accessory.label.includes("SUN"))
      accessories.push(recommendation.accessory);
    if (recommendation.extra.label.includes("SUN"))
      accessories.push(recommendation.extra);
  } else {
    // Add remaining accessories that aren't "NONE"
    if (recommendation.accessory.label !== "NONE" && !weatherSpecific.includes(recommendation.accessory))
      accessories.push(recommendation.accessory);
    if (recommendation.extra.label !== "NONE" && !weatherSpecific.includes(recommendation.extra))
      accessories.push(recommendation.extra);
  }
  
  // Build final list with priority: essentials, weather-specific, accessories
  let displayItems = [
    ...essentials,
    ...weatherSpecific,
    ...accessories,
  ];
  
  // Ensure we have at least 2 items in very hot weather, 3 items otherwise
  const minItems = temperature > 30 ? 2 : 3;
  
  // If we don't have enough items, add placeholders (shouldn't happen with current setup)
  while (displayItems.length < minItems && essentials.length < 2) {
    if (!essentials.includes(recommendation.upper))
      displayItems.push(recommendation.upper);
    else if (!essentials.includes(recommendation.lower))
      displayItems.push(recommendation.lower);
    else
      break;
  }
  
  // Cap at 3 items maximum for display
  displayItems = displayItems.slice(0, 3);
  
  return (
    <div className="grid grid-cols-1 gap-2">
      {displayItems.map((item, index) => (
        <div key={index} className="bg-[#444444] flex items-center p-2 rounded">
          <NewClothingIcon type={item.label} className="h-7 w-7" />
          <span className="text-xs uppercase ml-2 leading-tight">{item.label}</span>
        </div>
      ))}
    </div>
  );
}