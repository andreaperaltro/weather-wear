import { WeatherData } from "@shared/schema";
import { getOutfitRecommendation } from "@/icons/ClothingIcons";

interface OutfitRecommendationProps {
  weatherData: WeatherData;
}

export default function OutfitRecommendation({ weatherData }: OutfitRecommendationProps) {
  const temp = weatherData.current.temp;
  const condition = weatherData.current.condition;
  const hasPrecipitation = weatherData.current.hasRainOrSnow || false;
  const precipitation = weatherData.current.precipitation || 0;
  
  // Pass weather conditions to get more accurate recommendations
  const recommendation = getOutfitRecommendation(temp, condition, hasPrecipitation || precipitation > 0);
  
  const isCold = temp < 15;
  const isHot = temp >= 25;
  const borderColor = isCold ? "border-[#52B7FF]" : isHot ? "border-[#FF5252]" : "border-[#666666]";
  const iconColor = isCold ? "text-[#52B7FF]" : isHot ? "text-[#FF5252]" : "text-white";
  
  return (
    <div className="border-[3px] border-[#666666] bg-[#1E1E1E] p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-bold uppercase mb-4">RECOMMENDED OUTFIT</h2>
      
      <div className="md:flex gap-8">
        <div className="mb-6 md:mb-0 md:w-1/2">
          <div className="border-2 border-[#666666] bg-[#333333] p-3 md:p-5 mb-4">
            <h3 className="uppercase text-sm md:text-base mb-2">
              OUTFIT FOR {Math.round(temp)}°
            </h3>
            <p className="text-sm opacity-70 uppercase">
              {recommendation.description}
            </p>
          </div>
          
          <div className={`border-2 ${borderColor} bg-[#333333] p-3 md:p-5`}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`inline-block mr-2 h-5 w-5 ${iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isCold ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4M4 12l6-6m0 12l-6-6" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              )}
            </svg>
            <span className="uppercase text-sm">{recommendation.advice}</span>
          </div>
        </div>
        
        <div className="md:w-1/2">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] bg-[#333333] border-2 border-[#666666] flex flex-col items-center justify-center">
              {recommendation.head.icon}
              <span className="text-xs uppercase mt-2">{recommendation.head.label}</span>
            </div>
            
            <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] bg-[#333333] border-2 border-[#666666] flex flex-col items-center justify-center">
              {recommendation.upper.icon}
              <span className="text-xs uppercase mt-2">{recommendation.upper.label}</span>
            </div>
            
            <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] bg-[#333333] border-2 border-[#666666] flex flex-col items-center justify-center">
              {recommendation.lower.icon}
              <span className="text-xs uppercase mt-2">{recommendation.lower.label}</span>
            </div>
            
            <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] bg-[#333333] border-2 border-[#666666] flex flex-col items-center justify-center">
              {recommendation.foot.icon}
              <span className="text-xs uppercase mt-2">{recommendation.foot.label}</span>
            </div>
            
            <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] bg-[#333333] border-2 border-[#666666] flex flex-col items-center justify-center">
              {recommendation.accessory.icon}
              <span className="text-xs uppercase mt-2">{recommendation.accessory.label}</span>
            </div>
            
            <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] bg-[#333333] border-2 border-[#666666] flex flex-col items-center justify-center">
              {recommendation.extra.icon}
              <span className="text-xs uppercase mt-2">{recommendation.extra.label}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
