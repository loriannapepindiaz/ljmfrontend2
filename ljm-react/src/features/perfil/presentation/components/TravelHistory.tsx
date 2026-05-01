import React from 'react';

const TravelHistory: React.FC = () => {
  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white font-serif">Proximo Crucero</h2>
        </div>
        <div className="rounded-xl border border-dashed border-white/10 bg-[#132345] px-6 py-12 text-center shadow-2xl">
          <span className="material-symbols-outlined mb-3 text-5xl text-[#d4af37]/40">directions_boat</span>
          <p className="text-sm font-bold uppercase tracking-widest text-white">No hay reserva activa</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
            El proximo crucero se mostrara cuando esta cuenta tenga una reserva confirmada.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-white mb-4">Viajes Anteriores</h2>
        <div className="rounded-xl border border-dashed border-white/10 bg-[#132345] px-6 py-10 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Sin viajes anteriores</p>
          <p className="mt-2 text-xs text-slate-500">El historial aparecera cuando existan viajes completados.</p>
        </div>
      </section>
    </div>
  );
};

export default TravelHistory;
