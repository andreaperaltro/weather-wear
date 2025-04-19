import { WeatherData } from "@shared/schema";
import { getOutfitRecommendation } from "@/icons/ClothingIcons";
import { NewClothingIcon } from "@/components/NewClothingIcon";

interface OutfitRecommendationProps {
  weatherData: WeatherData;
  simplified?: boolean;
}

export default function OutfitRecommendation({ weatherData, simplified = false }: OutfitRecommendationProps) {
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

  // Organize clothing items into categories
  const essentials = [];
  const weatherProtection = [];
  const accessories = [];
  
  // Categorize all items by their purpose
  if (recommendation.upper.label !== "NONE") 
    essentials.push(recommendation.upper);
  
  if (recommendation.lower.label !== "NONE") 
    essentials.push(recommendation.lower);
  
  if (recommendation.foot.label !== "NONE")
    essentials.push(recommendation.foot);
    
  // Weather protection items
  if (recommendation.head.label !== "NONE" && recommendation.head.label !== "NONE/CAP")
    weatherProtection.push(recommendation.head);
  
  if (hasPrecipitation && recommendation.extra.label.includes("UMBRELLA"))
    weatherProtection.push(recommendation.extra);
  else if (temp < 5 && (recommendation.accessory.label.includes("GLOVES") || recommendation.accessory.label.includes("SCARF")))
    weatherProtection.push(recommendation.accessory);
  
  // Add remaining accessories
  if (recommendation.accessory.label !== "NONE" && 
      !weatherProtection.includes(recommendation.accessory))
    accessories.push(recommendation.accessory);
    
  if (recommendation.extra.label !== "NONE" && 
      !weatherProtection.includes(recommendation.extra))
    accessories.push(recommendation.extra);
  
  // If simplified mode is enabled, show the organized display
  if (simplified)
    return (
      <>
        {/* Essentials */}
        {essentials.map((item, index) => (
          <div key={`essential-${index}`} className="bg-[#444444] p-2 flex flex-col items-center justify-center">
            <NewClothingIcon type={item.label} />
            <span className="text-xs uppercase mt-1">{item.label}</span>
          </div>
        ))}
        
        {/* Weather Protection */}
        {weatherProtection.map((item, index) => (
          <div key={`weather-${index}`} className="bg-[#444444] p-2 flex flex-col items-center justify-center">
            <NewClothingIcon type={item.label} />
            <span className="text-xs uppercase mt-1">{item.label}</span>
          </div>
        ))}
        
        {/* Accessories */}
        {accessories.map((item, index) => (
          <div key={`accessory-${index}`} className="bg-[#444444] p-2 flex flex-col items-center justify-center">
            <NewClothingIcon type={item.label} />
            <span className="text-xs uppercase mt-1">{item.label}</span>
          </div>
        ))}
        
        <div className="bg-[#444444] p-2 col-span-3">
          <p className="text-xs uppercase">{recommendation.advice}</p>
        </div>
      </>
    );

  return (
    <div className={`border-[3px] ${borderColor} bg-[#1E1E1E] p-4 md:p-6 mb-8 md:mb-10`}>
      <h2 className="text-xl md:text-2xl font-bold uppercase mb-4">OUTFIT RECOMMENDATION</h2>
      
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="md:w-1/2 flex flex-col">
          <p className={`text-base md:text-lg font-bold uppercase mb-3 ${iconColor}`}>
            {recommendation.advice}
          </p>
          <p className="text-sm md:text-base mb-4">
            {recommendation.description}
          </p>
        </div>
        
        <div className="md:w-1/2">
          {/* Outfit section with categories */}
          <div className="flex flex-col gap-4">
            {essentials.length > 0 && (
              <div>
                <h3 className="text-sm uppercase font-bold mb-2">Essentials</h3>
                <div className="grid grid-cols-3 gap-3">
                  {essentials.map((item, index) => (
                    <div key={`essential-${index}`} className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] bg-[#333333] border-2 border-[#666666] flex flex-col items-center justify-center">
                      <NewClothingIcon type={item.label} />
                      <span className="text-xs uppercase mt-2">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {weatherProtection.length > 0 && (
              <div>
                <h3 className="text-sm uppercase font-bold mb-2">Weather Protection</h3>
                <div className="grid grid-cols-3 gap-3">
                  {weatherProtection.map((item, index) => (
                    <div key={`weather-${index}`} className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] bg-[#333333] border-2 border-[#666666] flex flex-col items-center justify-center">
                      <NewClothingIcon type={item.label} />
                      <span className="text-xs uppercase mt-2">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {accessories.length > 0 && (
              <div>
                <h3 className="text-sm uppercase font-bold mb-2">Accessories</h3>
                <div className="grid grid-cols-3 gap-3">
                  {accessories.map((item, index) => (
                    <div key={`accessory-${index}`} className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] bg-[#333333] border-2 border-[#666666] flex flex-col items-center justify-center">
                      <NewClothingIcon type={item.label} />
                      <span className="text-xs uppercase mt-2">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
