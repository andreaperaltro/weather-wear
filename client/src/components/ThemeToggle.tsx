import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  useEffect(() => {
    // Check for stored preference in localStorage
    const storedTheme = localStorage.getItem('theme') || 'dark';
    setIsDarkMode(storedTheme === 'dark');
    
    // Apply the theme class to the document
    if (storedTheme === 'light') {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  }, []);
  
  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    if (newMode) {
      // Dark mode
      document.documentElement.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      // Light mode
      document.documentElement.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    }
  };
  
  return (
    <button 
      onClick={toggleTheme}
      className="p-2 rounded-full bg-[#333333] hover:bg-[#444444] transition-colors"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        // Sun icon for light mode
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      ) : (
        // Moon icon for dark mode
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M21,12 C21,7 17,3 12,3 C12,3 13,7 11,9 C9,11 5,10 5,10 C5,15 9,19 14,19 C16.5,19 18.5,18 20,16.5 C18,16 16.5,14 16.5,12 C16.5,10 18,7.5 20,7 C19,5.5 17,4 14.5,4" />
        </svg>
      )}
    </button>
  );
}