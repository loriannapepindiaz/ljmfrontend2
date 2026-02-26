export const VoyageRouteMap = () => {
  return (
    <div className="lg:w-1/2 flex flex-col h-full bg-midnight-blue/40 rounded-[2.5rem] border border-white/10 p-10 relative overflow-hidden">
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex justify-between items-center mb-10">
          <h4 className="text-xs font-bold tracking-widest uppercase text-pearl-beige">Voyage Route</h4>
          <span className="text-[10px] text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/30 uppercase tracking-[0.2em] font-bold">Interactive Map</span>
        </div>
        
        <div className="flex-grow relative min-h-[340px] flex items-center justify-center">
          <svg className="w-full h-full drop-shadow-2xl" fill="none" viewBox="0 0 500 400">
            <path className="map-line" d="M50 350C100 300 200 320 250 200C300 80 400 120 450 50" stroke="#C5A059" strokeWidth="2.5" strokeDasharray="8" />
            <circle cx="50" cy="350" fill="#C5A059" r="7" />
            <circle cx="250" cy="200" fill="#C5A059" r="8" />
            <circle cx="450" cy="50" fill="#C5A059" r="7" />
            <text fill="white" x="68" y="355" className="text-[12px] font-bold">ATHENS</text>
            <text fill="#eacea9" x="268" y="205" className="text-[12px] font-bold">SANTORINI</text>
          </svg>
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex justify-between text-[11px] text-pearl-beige/80 font-bold uppercase tracking-widest">
            <span>Day 1-2: Saronic Gulf</span>
            <span className="text-primary">In Transit</span>
          </div>
          <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden">
            <div className="bg-primary w-2/3 h-full shadow-[0_0_10px_rgba(197,160,89,0.5)]"></div>
          </div>
        </div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/10 rounded-full blur-[100px]"></div>
    </div>
  );
};