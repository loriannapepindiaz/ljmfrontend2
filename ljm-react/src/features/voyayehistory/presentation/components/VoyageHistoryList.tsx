import React from 'react';

const VoyageHistoryList: React.FC = () => {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-[#0e1a34]" style={{ fontFamily: 'Newsreader, serif' }}>
          Viajes Completados
        </h3>
        <div className="flex gap-2">
          <button className="p-2 border border-slate-200 rounded hover:bg-white transition-colors">
            <span className="material-symbols-outlined text-sm">filter_list</span>
          </button>
          <button className="p-2 border border-slate-200 rounded hover:bg-white transition-colors">
            <span className="material-symbols-outlined text-sm">search</span>
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-dashed border-slate-200 bg-white/70 px-6 py-12 text-center">
        <span className="material-symbols-outlined mb-3 text-4xl text-slate-300">travel_explore</span>
        <p className="text-sm font-bold uppercase tracking-widest text-[#0e1a34]">No hay viajes completados</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
          El historial se mostrara cuando existan reservas finalizadas para esta cuenta.
        </p>
      </div>
    </section>
  );
};

export default VoyageHistoryList;
