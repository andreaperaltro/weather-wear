interface WeatherIconProps {
  condition: string;
}

export function WeatherIcon({ condition }: WeatherIconProps) {
  const conditionLower = condition.toLowerCase();
  
  // Determine which icon to display based on the condition
  if (conditionLower.includes('snow') || conditionLower.includes('blizzard')) {
    return <SnowIcon />;
  } else if (conditionLower.includes('rain') || conditionLower.includes('drizzle') || conditionLower.includes('shower')) {
    return <RainIcon />;
  } else if (conditionLower.includes('thunder') || conditionLower.includes('storm')) {
    return <ThunderstormIcon />;
  } else if (conditionLower.includes('fog') || conditionLower.includes('mist')) {
    return <FogIcon />;
  } else if (conditionLower.includes('cloud') || conditionLower.includes('overcast')) {
    return <CloudyIcon />;
  } else if (conditionLower.includes('clear') && conditionLower.includes('night')) {
    return <MoonIcon />;
  } else {
    // Default is sunny
    return <SunIcon />;
  }
}

function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#FF5252]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="4" fill="currentColor" />
      <path d="M12,3 L12,5" />
      <path d="M12,19 L12,21" />
      <path d="M5,12 L3,12" />
      <path d="M21,12 L19,12" />
      <path d="M7,7 L5.5,5.5" />
      <path d="M18.5,18.5 L17,17" />
      <path d="M16.5,7.5 L18,6" />
      <path d="M6,18 L7.5,16.5" />
    </svg>
  );
}

function CloudyIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path d="M6,19 L18,19 C20,19 21,17 21,15.5 C21,13 19,11 17,11 C17,7 14,5 11,5 C8,5 5,7 5,11 C3,11 2,13 2,15 C2,17 3,19 6,19 Z" />
    </svg>
  );
}

function RainIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#52B7FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path d="M6,19 L18,19 C20,19 21,17 21,15.5 C21,13 19,11 17,11 C17,7 14,5 11,5 C8,5 5,7 5,11 C3,11 2,13 2,15 C2,17 3,19 6,19 Z" />
      <path d="M7,19 L6,22" />
      <path d="M11,19 L10,22" />
      <path d="M15,19 L14,22" />
      <path d="M17,19 L16,22" />
    </svg>
  );
}

function SnowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#52B7FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path d="M6,16 L18,16 C20,16 21,14 21,12.5 C21,10 19,8 17,8 C17,4 14,2 11,2 C8,2 5,4 5,8 C3,8 2,10 2,12 C2,14 3,16 6,16 Z" />
      <path d="M8,17 L8,21" />
      <path d="M6.5,18.5 L9.5,19.5" />
      <path d="M6.5,20 L9.5,19" />
      <path d="M12,17 L12,21" />
      <path d="M10.5,18.5 L13.5,19.5" />
      <path d="M10.5,20 L13.5,19" />
      <path d="M16,17 L16,21" />
      <path d="M14.5,18.5 L17.5,19.5" />
      <path d="M14.5,20 L17.5,19" />
    </svg>
  );
}

function ThunderstormIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path d="M6,16 L18,16 C20,16 21,14 21,12.5 C21,10 19,8 17,8 C17,4 14,2 11,2 C8,2 5,4 5,8 C3,8 2,10 2,12 C2,14 3,16 6,16 Z" />
      <path stroke="#FFD700" d="M12,16 L9,20 L14,20 L11,24" />
      <path stroke="#FFD700" d="M17,16 L14,20 L16,20 L15,22" />
    </svg>
  );
}

function FogIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path d="M3,8 L7,8" />
      <path d="M11,8 L21,8" />
      <path d="M3,12 L16,12" />
      <path d="M20,12 L21,12" />
      <path d="M3,16 L4,16" />
      <path d="M8,16 L21,16" />
      <path d="M3,20 L21,20" />
      <path d="M12,5 C14,5 16,4 16,2" />
      <path d="M8,5 C6,5 4,4 4,2" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path d="M21,12 C21,7 17,3 12,3 C12,3 13,7 11,9 C9,11 5,10 5,10 C5,15 9,19 14,19 C16.5,19 18.5,18 20,16.5 C18,16 16.5,14 16.5,12 C16.5,10 18,7.5 20,7 C19,5.5 17,4 14.5,4" />
    </svg>
  );
}
