export const DestinationHeader = () => {
  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-primary text-[11px] font-bold tracking-[0.4em] uppercase">
          <span className="w-10 h-[1.5px] bg-primary"></span>
          Crucero Mediterráneo de 7 Noches
        </div>
        <h1 className="text-5xl md:text-7xl font-display leading-[1.1] text-white">
          Islas Griegas <br />
          <span className="italic text-pearl-beige font-medium">Odisea</span>
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-8 py-8 border-y border-white/10">
        <div>
          <p className="text-[11px] font-bold text-primary tracking-widest uppercase mb-2">Duración</p>
          <p className="text-xl font-medium text-white flex items-center gap-3">
            <span className="material-symbols-outlined text-pearl-beige">schedule</span>
            8 Días / 7 Noches
          </p>
        </div>
        <div>
          <p className="text-[11px] font-bold text-primary tracking-widest uppercase mb-2">Puerto de Salida</p>
          <p className="text-xl font-medium text-white flex items-center gap-3">
            <span className="material-symbols-outlined text-pearl-beige">anchor</span>
            Atenas (El Pireo)
          </p>
        </div>
      </div>
    </div>
  );
};