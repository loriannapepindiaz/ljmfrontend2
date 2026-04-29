export const VoyageRouteMap = () => {
  return (
    <div className="lg:w-1/2 flex flex-col bg-midnight-blue/40 rounded-[2.5rem] border border-white/10 p-10 relative overflow-hidden">
      <div className="flex flex-col flex-1 relative z-10">
        <div className="flex justify-between items-center mb-6 flex-shrink-0">
          <h4 className="text-xs font-bold tracking-widest uppercase text-pearl-beige">Ruta del Viaje</h4>
          <span className="text-[10px] text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/30 uppercase tracking-[0.2em] font-bold">
            Sin mapa
          </span>
        </div>

        <div className="flex min-h-[360px] flex-1 items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.03] px-8 text-center">
          <div>
            <span className="material-symbols-outlined mb-4 text-6xl text-primary/30">map</span>
            <p className="text-sm font-bold uppercase tracking-widest text-pearl-beige">Sin ruta disponible</p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/50">
              El mapa se mostrara solo cuando exista una ruta real asociada al viaje seleccionado.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
