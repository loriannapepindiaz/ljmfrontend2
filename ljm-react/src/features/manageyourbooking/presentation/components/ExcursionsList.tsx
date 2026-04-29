import React from 'react';
import ExcursionCard from './ExcursionCard';

const excursiones: Array<{ imagen: string; nombre: string; fecha: string; puerto: string; estado: string }> = [];

const ExcursionsList: React.FC = () => {
  return (
    <div
      className="rounded-xl p-6"
      style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(16px)', border: '1px solid rgba(234,230,169,0.1)' }}
    >
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-xl font-bold flex items-center gap-3 text-white">
          <span className="material-symbols-outlined text-[#eacea9]">explore</span>
          Excursiones
        </h4>
      </div>
      <div className="space-y-4 mb-6">
        {excursiones.length === 0 ? (
          <div className="rounded-lg border border-dashed border-white/10 bg-white/[0.03] px-4 py-8 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Sin excursiones agregadas</p>
            <p className="mt-2 text-xs text-slate-500">Las excursiones apareceran cuando se seleccionen para esta reserva.</p>
          </div>
        ) : excursiones.map((e) => (
          <ExcursionCard key={e.nombre} {...e} />
        ))}
      </div>
      <button className="w-full py-3 rounded-lg border border-[#eacea9]/30 text-[#eacea9] text-xs font-bold hover:bg-[#eacea9]/10 transition-all uppercase tracking-widest">
        Anadir Mas Excursiones
      </button>
    </div>
  );
};

export default ExcursionsList;
