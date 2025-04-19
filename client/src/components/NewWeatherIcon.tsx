import { useState, useEffect } from 'react';

interface NewWeatherIconProps {
  condition: string;
  className?: string;
}

export default function NewWeatherIcon({ condition, className = "h-12 w-12" }: NewWeatherIconProps) {
  // Get a short text representation for the weather condition
  const conditionLower = condition.toLowerCase();
  let weatherText = "☀️"; // Default to sun
  
  if (conditionLower.includes('snow') || conditionLower.includes('blizzard')) {
    weatherText = "❄️";
  } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle') || conditionLower.includes('shower')) {
    weatherText = "🌧️";
  } else if (conditionLower.includes('thunder') || conditionLower.includes('storm')) {
    weatherText = "⚡";
  } else if (conditionLower.includes('fog') || conditionLower.includes('mist')) {
    weatherText = "🌫️";
  } else if (conditionLower.includes('cloud') || conditionLower.includes('overcast')) {
    weatherText = "☁️";
  } else if (conditionLower.includes('clear') && conditionLower.includes('night')) {
    weatherText = "🌙";
  } else if (conditionLower.includes('clear')) {
    weatherText = "☀️";
  }
  
  console.log('Weather condition:', condition, 'Using text symbol:', weatherText);
  
  // Parse the className to extract size information for our text
  const sizeClass = className?.split(' ').find(c => c.startsWith('h-')) || 'h-12';
  const size = parseInt(sizeClass.replace('h-', '')) * 4; // Convert Tailwind size to px (approximate)
  
  return (
    <div 
      className={`flex items-center justify-center ${className}`}
      style={{ fontSize: `${size}px`, lineHeight: 1 }}
      title={`Weather condition: ${condition}`}
    >
      {weatherText}
    </div>
  );
} 