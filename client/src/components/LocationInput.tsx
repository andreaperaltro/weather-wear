import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface LocationInputProps {
  onSearch: (location: string) => void;
  onGeolocation: () => void;
  location: string;
}

export default function LocationInput({ 
  onSearch, 
  onGeolocation,
  location 
}: LocationInputProps) {
  const [inputValue, setInputValue] = useState<string>(location);

  const handleSearch = () => {
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="border-[3px] border-[#666666] bg-[#1E1E1E] p-4 md:p-6 mb-8 md:mb-10">
      <h2 className="text-xl md:text-2xl font-bold uppercase mb-4">LOCATION</h2>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="grow">
          <Input 
            type="text" 
            placeholder="ENTER CITY NAME" 
            className="w-full px-4 py-3 bg-[#333333] border-2 border-[#666666] text-white font-mono uppercase placeholder:text-gray-500 focus:outline-none focus:border-white h-auto"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        
        <Button 
          onClick={handleSearch}
          className="px-5 py-3 bg-[#333333] border-2 border-[#666666] hover:bg-[#444444] hover:border-white transition-colors uppercase font-bold h-auto"
        >
          SEARCH
        </Button>
        
        <Button 
          onClick={onGeolocation}
          className="px-4 py-3 bg-[#333333] border-2 border-[#666666] hover:bg-[#444444] hover:border-white transition-colors h-auto"
          title="Use Current Location"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
        </Button>
      </div>
    </div>
  );
}
