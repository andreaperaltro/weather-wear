export default function InitialMessage() {
  return (
    <div className="border-[3px] border-[#666666] bg-[#1E1E1E] p-6 md:p-10 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <h2 className="text-xl md:text-2xl font-bold uppercase mb-3 tracking-tight">ENTER LOCATION TO START</h2>
      <p className="opacity-70 text-sm md:text-base uppercase tracking-wide">GET WEATHER DATA AND OUTFIT RECOMMENDATIONS</p>
    </div>
  );
}
