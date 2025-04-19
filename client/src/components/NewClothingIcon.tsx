import React from 'react';

interface NewClothingIconProps {
  type: string;
  className?: string;
}

export const NewClothingIcon: React.FC<NewClothingIconProps> = ({ type, className = '' }) => {
  console.log('Clothing type:', type);
  
  // Map clothing types to text representations
  const clothingText = getClothingText(type);
  
  // Determine font size based on className (small, medium, large)
  let fontSize = '1.5rem'; // default size
  if (className.includes('small')) {
    fontSize = '1rem';
  } else if (className.includes('large')) {
    fontSize = '2rem';
  }
  
  return (
    <div 
      style={{ 
        fontSize, 
        display: 'inline-block',
        textAlign: 'center',
        lineHeight: 1,
        padding: '0.25rem'
      }}
      title={`${type} clothing item`}
    >
      {clothingText}
    </div>
  );
};

// Get text representation for each clothing type
function getClothingText(type: string): string {
  switch (type.toLowerCase()) {
    case 'tshirt':
      return '👕';
    case 't-shirt':
      return '👕';
    case 'pants':
      return '👖';
    case 'hat':
      return '🧢';
    case 'coat':
      return '🧥';
    case 'jacket':
      return '🧥';
    case 'sweater':
      return '🧶';
    case 'shorts':
      return '🩳';
    case 'sunglasses':
      return '🕶️';
    case 'umbrella':
      return '☂️';
    case 'scarf':
      return '🧣';
    case 'gloves':
      return '🧤';
    case 'boots':
      return '👢';
    case 'sandals':
      return '👡';
    case 'shoes':
      return '👟';
    default:
      return '👚';
  }
} 