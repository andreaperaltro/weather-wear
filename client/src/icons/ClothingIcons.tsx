export interface OutfitItem {
  icon: JSX.Element;
  label: string;
}

export interface OutfitRecommendation {
  range: [number, number];
  head: OutfitItem;
  upper: OutfitItem;
  lower: OutfitItem;
  foot: OutfitItem;
  accessory: OutfitItem;
  extra: OutfitItem;
  color: string;
  advice: string;
  description: string;
}

// Icons for different clothing items - Improved SVG icons for better recognition
const WinterHatIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6,9 C6,4 12,3 12,3 C12,3 18,4 18,9 L18,13 C18,13 17,14 12,14 C7,14 6,13 6,13 L6,9 Z" />
    <path d="M6,13 L5,17 L19,17 L18,13" />
    <path d="M5,17 L4.5,19 L19.5,19 L19,17" />
    <path d="M9,14 L9,19" />
    <path d="M15,14 L15,19" />
  </svg>
);

const LightHatIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12,4 C8,4 6,6 6,8 C6,10 7,12 12,13 C17,12 18,10 18,8 C18,6 16,4 12,4 Z" />
    <path d="M8,13 L6,18 L18,18 L16,13" />
    <path d="M12,18 L12,21" />
    <path d="M9,21 L15,21" />
  </svg>
);

const NoHatIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <line x1="7" y1="12" x2="17" y2="12" strokeWidth="1.5" />
    <line x1="12" y1="7" x2="12" y2="17" strokeWidth="1.5" />
    <line x1="7.5" y1="7.5" x2="16.5" y2="16.5" strokeWidth="1.5" />
  </svg>
);

const HeavyCoatIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7,3 L7,21" />
    <path d="M17,3 L17,21" />
    <path d="M7,3 C7,3 9,2 12,2 C15,2 17,3 17,3" />
    <path d="M7,21 L17,21" />
    <path d="M5,5 L7,3" />
    <path d="M19,5 L17,3" />
    <path d="M5,5 L5,19 L7,21" />
    <path d="M19,5 L19,19 L17,21" />
    <path d="M9,7 L9,12" />
    <path d="M15,7 L15,12" />
  </svg>
);

const LightJacketIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8,3 L8,21" />
    <path d="M16,3 L16,21" />
    <path d="M8,3 C8,3 10,2 12,2 C14,2 16,3 16,3" />
    <path d="M8,21 L16,21" />
    <path d="M6,5 L8,3" />
    <path d="M18,5 L16,3" />
    <path d="M6,5 L6,19 L8,21" />
    <path d="M18,5 L18,19 L16,21" />
    <path d="M10,10 L14,10" />
  </svg>
);

const TShirtIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8,4 L5,6 L5,10 L8,9" />
    <path d="M16,4 L19,6 L19,10 L16,9" />
    <path d="M8,4 L8,20" />
    <path d="M16,4 L16,20" />
    <path d="M8,20 L16,20" />
    <path d="M8,4 C8,4 10,3 12,3 C14,3 16,4 16,4" />
  </svg>
);

const PantsIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7,4 L7,20" />
    <path d="M17,4 L17,20" />
    <path d="M7,4 L17,4" />
    <path d="M7,20 L10,20" />
    <path d="M17,20 L14,20" />
    <path d="M10,20 C10,15 12,12 12,12 C12,12 14,15 14,20" />
    <path d="M9,4 L9,10" />
    <path d="M15,4 L15,10" />
  </svg>
);

const ShortsIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7,4 L7,15" />
    <path d="M17,4 L17,15" />
    <path d="M7,4 L17,4" />
    <path d="M7,15 L10,15" />
    <path d="M17,15 L14,15" />
    <path d="M10,15 C10,13 12,12 12,12 C12,12 14,13 14,15" />
    <path d="M9,4 L9,10" />
    <path d="M15,4 L15,10" />
  </svg>
);

const WinterBootsIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8,12 L8,18 L19,18 C19,18 20,18 20,17 L20,14 C20,13 19,12 18,12 L8,12 Z" />
    <path d="M8,12 L7,7 L12,7 L13,12" />
    <path d="M8,18 L6,22 L18,22 L19,18" />
    <path d="M11,12 L11,18" />
    <path d="M15,12 L15,18" />
  </svg>
);

const SneakersIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6,12 C8,12 10,11 12,9 C14,11 17,12 19,12 L19,17 L6,17 L6,12 Z" />
    <path d="M19,17 L20,20 L5,20 L4,17 L6,17" />
    <path d="M6,12 L5,8 L8,8 L10,12" />
    <path d="M8,17 L8,20" />
    <path d="M12,17 L12,20" />
    <path d="M16,17 L16,20" />
  </svg>
);

const SandalsIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6,14 L18,14 L18,17 L6,17 L6,14 Z" />
    <path d="M8,14 L8,10" />
    <path d="M12,14 L12,10" />
    <path d="M16,14 L16,10" />
    <path d="M6,10 L8,10" />
    <path d="M10,10 L12,10" />
    <path d="M14,10 L16,10" />
    <path d="M16,10 L18,10" />
    <path d="M6,17 L5,20 L19,20 L18,17" />
  </svg>
);

const GlovesIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8,6 L8,3" />
    <path d="M12,6 L12,3" />
    <path d="M16,6 L16,3" />
    <path d="M6,6 C6,6 5,7 5,8 L5,15 C5,16 6,17 7,17 L17,17 C18,17 19,16 19,15 L19,8 C19,7 18,6 18,6" />
    <path d="M5,12 L19,12" />
    <path d="M7,17 L7,20" />
    <path d="M17,17 L17,20" />
    <path d="M7,20 L17,20" />
  </svg>
);

const SunglassesIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4,10 L20,10" />
    <path d="M7,10 C6,12 8,14 10,13 C12,12 11,10 10,10 L7,10 Z" />
    <path d="M17,10 C18,12 16,14 14,13 C12,12 13,10 14,10 L17,10 Z" />
    <path d="M7,10 L5,7 L8,6 L10,10" />
    <path d="M17,10 L19,7 L16,6 L14,10" />
  </svg>
);

const UmbrellaIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12,4 L12,19" />
    <path d="M12,19 C12,21 14,21 15,19" />
    <path d="M4,14 C4,8 7,4 12,4 C17,4 20,8 20,14" />
    <path d="M4,14 L20,14" />
    <path d="M8,14 C8,12 12,12 12,14" />
    <path d="M16,14 C16,12 12,12 12,14" />
  </svg>
);

const SunscreenIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="7" y="5" width="10" height="16" rx="2" />
    <path d="M10,5 L10,3" />
    <path d="M14,5 L14,3" />
    <path d="M7,9 L17,9" />
    <path d="M11,12 L13,12" />
    <path d="M11,15 L13,15" />
    <path d="M11,18 L13,18" />
  </svg>
);

const HotDrinkIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7,7 L5,21 L16,21 L14,7" />
    <path d="M7,7 L14,7" />
    <path d="M16,11 L18,11 C19,11 20,10 20,9 C20,8 19,7 18,7 C17,7 16,8 16,9" />
    <path d="M8,3 L13,3 L12,7" />
    <path d="M9,13 C11,12 13,12 14,13" />
  </svg>
);

const WaterBottleIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10,3 L14,3 L14,7 C15,7 16,8 16,9 L15,20 C15,21 14,21 12,21 C10,21 9,21 9,20 L8,9 C8,8 9,7 10,7 L10,3 Z" />
    <path d="M10,3 L14,3" />
    <path d="M10,7 L14,7" />
    <path d="M12,11 L12,17" />
    <path d="M10,14 L14,14" />
  </svg>
);

// Outfit recommendations based on temperature ranges
const outfitRecommendations: OutfitRecommendation[] = [
  {
    range: [-50, 0], // Very cold
    head: { icon: WinterHatIcon, label: 'WARM HAT' },
    upper: { icon: HeavyCoatIcon, label: 'HEAVY COAT' },
    lower: { icon: PantsIcon, label: 'THICK PANTS' },
    foot: { icon: WinterBootsIcon, label: 'WINTER BOOTS' },
    accessory: { icon: GlovesIcon, label: 'GLOVES/SCARF' },
    extra: { icon: HotDrinkIcon, label: 'HOT DRINK' },
    color: 'cold',
    advice: "IT'S FREEZING OUTSIDE. BUNDLE UP HEAVILY.",
    description: "HEAVY WINTER CLOTHING IS REQUIRED FOR TODAY'S EXTREME COLD."
  },
  {
    range: [0, 10], // Cold
    head: { icon: WinterHatIcon, label: 'BEANIE' },
    upper: { icon: HeavyCoatIcon, label: 'WINTER JACKET' },
    lower: { icon: PantsIcon, label: 'JEANS/PANTS' },
    foot: { icon: WinterBootsIcon, label: 'BOOTS' },
    accessory: { icon: GlovesIcon, label: 'SCARF' },
    extra: { icon: GlovesIcon, label: 'GLOVES' },
    color: 'cold',
    advice: "IT'S COLD OUTSIDE. DRESS WARMLY.",
    description: "A WARM LAYERED OUTFIT WILL KEEP YOU COMFORTABLE TODAY."
  },
  {
    range: [10, 15], // Cool
    head: { icon: LightHatIcon, label: 'LIGHT HAT' },
    upper: { icon: LightJacketIcon, label: 'LIGHT JACKET' },
    lower: { icon: PantsIcon, label: 'PANTS' },
    foot: { icon: SneakersIcon, label: 'SNEAKERS' },
    accessory: { icon: GlovesIcon, label: 'LIGHT SCARF' },
    extra: { icon: UmbrellaIcon, label: 'UMBRELLA' },
    color: 'cold',
    advice: "IT'S COOL OUTSIDE. LIGHT LAYERS RECOMMENDED.",
    description: "LIGHT LAYERS WILL WORK WELL FOR TODAY'S COOLER TEMPERATURES."
  },
  {
    range: [15, 20], // Mild
    head: { icon: LightHatIcon, label: 'NONE/CAP' },
    upper: { icon: LightJacketIcon, label: 'LIGHT SWEATER' },
    lower: { icon: PantsIcon, label: 'PANTS/JEANS' },
    foot: { icon: SneakersIcon, label: 'SNEAKERS' },
    accessory: { icon: NoHatIcon, label: 'NONE' },
    extra: { icon: UmbrellaIcon, label: 'UMBRELLA' },
    color: 'border-color',
    advice: "IT'S MILD OUTSIDE. COMFORTABLE CLOTHING WORKS WELL.",
    description: "A COMFORTABLE OUTFIT WITH LIGHT LAYERS WOULD BE PERFECT TODAY."
  },
  {
    range: [20, 25], // Warm
    head: { icon: LightHatIcon, label: 'CAP' },
    upper: { icon: TShirtIcon, label: 'T-SHIRT' },
    lower: { icon: PantsIcon, label: 'LIGHT PANTS' },
    foot: { icon: SneakersIcon, label: 'SNEAKERS' },
    accessory: { icon: SunglassesIcon, label: 'SUNGLASSES' },
    extra: { icon: WaterBottleIcon, label: 'WATER' },
    color: 'hot',
    advice: "IT'S WARM OUTSIDE. DRESS LIGHT.",
    description: "A LIGHT OUTFIT WOULD BE PERFECT FOR TODAY'S WEATHER."
  },
  {
    range: [25, 30], // Hot
    head: { icon: LightHatIcon, label: 'SUN HAT' },
    upper: { icon: TShirtIcon, label: 'T-SHIRT' },
    lower: { icon: ShortsIcon, label: 'SHORTS' },
    foot: { icon: SandalsIcon, label: 'SANDALS' },
    accessory: { icon: SunglassesIcon, label: 'SUNGLASSES' },
    extra: { icon: SunscreenIcon, label: 'SUNSCREEN' },
    color: 'hot',
    advice: "IT'S HOT OUTSIDE. DRESS VERY LIGHT.",
    description: "LIGHTWEIGHT, BREATHABLE CLOTHING IS RECOMMENDED FOR TODAY'S HEAT."
  },
  {
    range: [30, 50], // Very Hot
    head: { icon: LightHatIcon, label: 'SUN HAT' },
    upper: { icon: TShirtIcon, label: 'TANK TOP' },
    lower: { icon: ShortsIcon, label: 'SHORTS' },
    foot: { icon: SandalsIcon, label: 'SANDALS' },
    accessory: { icon: SunglassesIcon, label: 'SUNGLASSES' },
    extra: { icon: SunscreenIcon, label: 'SUNSCREEN' },
    color: 'hot',
    advice: "IT'S EXTREMELY HOT. MINIMAL CLOTHING RECOMMENDED.",
    description: "WEAR AS LITTLE AS POSSIBLE AND STAY HYDRATED IN THIS EXTREME HEAT."
  }
];

export function getOutfitRecommendation(temperature: number, weatherCondition: string = 'Clear', hasPrecipitation: boolean = false): OutfitRecommendation {
  // Find appropriate outfit recommendation
  let recommendation = outfitRecommendations.find(rec => 
    temperature >= rec.range[0] && temperature < rec.range[1]
  );
  
  // Default to mild weather if no match
  if (!recommendation) {
    recommendation = outfitRecommendations[3];
  }
  
  // Create a copy to modify based on weather conditions
  const modifiedRecommendation = {...recommendation};
  
  // Adjust for rain or snow
  if (weatherCondition === 'Rain' || weatherCondition === 'Drizzle' || hasPrecipitation) {
    // Always recommend an umbrella in rainy conditions
    modifiedRecommendation.extra = { icon: UmbrellaIcon, label: 'UMBRELLA' };
    
    // For cold rainy conditions, waterproof options
    if (temperature < 15) {
      modifiedRecommendation.advice = "IT'S RAINY AND COLD. DRESS WARM & WATERPROOF.";
      modifiedRecommendation.upper = { icon: HeavyCoatIcon, label: 'WATERPROOF JACKET' };
      modifiedRecommendation.foot = { icon: WinterBootsIcon, label: 'WATERPROOF BOOTS' };
    } else {
      modifiedRecommendation.advice = "IT'S RAINY. STAY DRY.";
      if (temperature < 20) {
        modifiedRecommendation.upper = { icon: LightJacketIcon, label: 'LIGHT RAINCOAT' };
      }
    }
  } 
  // Adjust for snow
  else if (weatherCondition === 'Snow') {
    modifiedRecommendation.extra = { icon: HotDrinkIcon, label: 'HOT DRINK' };
    modifiedRecommendation.advice = "IT'S SNOWING. KEEP WARM AND DRY.";
    modifiedRecommendation.upper = { icon: HeavyCoatIcon, label: 'SNOW-PROOF COAT' };
    modifiedRecommendation.foot = { icon: WinterBootsIcon, label: 'SNOW BOOTS' };
    modifiedRecommendation.accessory = { icon: GlovesIcon, label: 'GLOVES/SCARF' };
    if (temperature < 5) {
      modifiedRecommendation.head = { icon: WinterHatIcon, label: 'WARM HAT' };
    }
  }
  // Adjust for fog
  else if (weatherCondition === 'Fog') {
    modifiedRecommendation.advice = "IT'S FOGGY. WEAR VISIBLE COLORS.";
  }
  // Adjust for thunderstorm
  else if (weatherCondition === 'Thunderstorm') {
    modifiedRecommendation.extra = { icon: UmbrellaIcon, label: 'STAY INDOORS' };
    modifiedRecommendation.advice = "THUNDERSTORM! AVOID GOING OUTSIDE IF POSSIBLE.";
    modifiedRecommendation.upper = { icon: HeavyCoatIcon, label: 'WATERPROOF JACKET' };
  }
  // Adjust for very sunny days
  else if (weatherCondition === 'Clear' && temperature > 25) {
    modifiedRecommendation.accessory = { icon: SunglassesIcon, label: 'SUNGLASSES' };
    modifiedRecommendation.extra = { icon: SunscreenIcon, label: 'SUNSCREEN' };
    modifiedRecommendation.advice = "IT'S SUNNY AND HOT. PROTECT FROM UV.";
  }
  
  return modifiedRecommendation;
}
