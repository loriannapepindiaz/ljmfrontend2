export const DestinationHeader = () => {
  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-primary text-[11px] font-bold tracking-[0.4em] uppercase">
          <span className="w-10 h-[1.5px] bg-primary"></span>
          7-Night Mediterranean Cruise
        </div>
        <h1 className="text-5xl md:text-7xl font-display leading-[1.1] text-white">
          Grecian Isles <br />
          <span className="italic text-pearl-beige font-medium">Odyssey</span>
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-8 py-8 border-y border-white/10">
        <div>
          <p className="text-[11px] font-bold text-primary tracking-widest uppercase mb-2">Duration</p>
          <p className="text-xl font-medium text-white flex items-center gap-3">
            <span className="material-symbols-outlined text-pearl-beige">schedule</span>
            8 Days / 7 Nights
          </p>
        </div>
        <div>
          <p className="text-[11px] font-bold text-primary tracking-widest uppercase mb-2">Departure Port</p>
          <p className="text-xl font-medium text-white flex items-center gap-3">
            <span className="material-symbols-outlined text-pearl-beige">anchor</span>
            Athens (Piraeus)
          </p>
        </div>
      </div>
    </div>
  );
};