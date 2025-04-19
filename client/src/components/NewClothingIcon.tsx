interface NewClothingIconProps {
  type: string;
  className?: string;
}

export default function NewClothingIcon({ type, className = "h-8 w-8" }: NewClothingIconProps) {
  // Get a short text representation for the clothing item
  const typeLower = type.toLowerCase();
  let clothingText = "👕"; // Default to t-shirt
  
  // Head items
  if (typeLower.includes('hat') || typeLower.includes('beanie') || typeLower.includes('cap')) {
    if (typeLower.includes('warm') || typeLower.includes('winter')) {
      clothingText = "🧢";
    } else {
      clothingText = "👒";
    }
  } 
  // Upper body items
  else if (typeLower.includes('coat') || typeLower.includes('jacket')) {
    if (typeLower.includes('heavy') || typeLower.includes('winter')) {
      clothingText = "🧥";
    } else {
      clothingText = "🥼";
    }
  }
  else if (typeLower.includes('t-shirt') || typeLower.includes('tshirt') || typeLower.includes('tank')) {
    clothingText = "👕";
  }
  // Lower body items
  else if (typeLower.includes('pants') || typeLower.includes('jeans')) {
    clothingText = "👖";
  }
  else if (typeLower.includes('shorts')) {
    clothingText = "🩳";
  }
  // Footwear
  else if (typeLower.includes('boots') || typeLower.includes('sneakers') || typeLower.includes('sandals')) {
    if (typeLower.includes('boots')) {
      clothingText = "👢";
    } else if (typeLower.includes('sandals')) {
      clothingText = "👡";
    } else {
      clothingText = "👟";
    }
  }
  // Accessories
  else if (typeLower.includes('umbrella')) {
    clothingText = "☂️";
  }
  else if (typeLower.includes('gloves')) {
    clothingText = "🧤";
  }
  else if (typeLower.includes('scarf')) {
    clothingText = "🧣";
  }
  else if (typeLower.includes('sunglasses')) {
    clothingText = "🕶️";
  }
  else if (typeLower.includes('water')) {
    clothingText = "💧";
  }
  
  console.log('Clothing type:', type, 'Using text symbol:', clothingText);
  
  // Parse the className to extract size information for our text
  const sizeClass = className?.split(' ').find(c => c.startsWith('h-')) || 'h-8';
  const size = parseInt(sizeClass.replace('h-', '')) * 4; // Convert Tailwind size to px (approximate)
  
  return (
    <div 
      className={`flex items-center justify-center ${className}`}
      style={{ fontSize: `${size}px`, lineHeight: 1 }}
      title={`Clothing item: ${type}`}
    >
      {clothingText}
    </div>
  );
} 