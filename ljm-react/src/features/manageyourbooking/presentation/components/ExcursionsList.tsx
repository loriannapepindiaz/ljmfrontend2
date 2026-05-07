import React from 'react';
import ExcursionCard from './ExcursionCard';
import type { ManageBookingData } from '../manageBookingData';

type Props = {
  excursiones?: ManageBookingData['excursions'];
  onAddExcursion?: () => void;
};

const ExcursionsList: React.FC<Props> = ({ excursiones = [], onAddExcursion }) => {
  return (
    <div
      className="rounded-xl p-6"
      style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(16px)', border: '1px solid rgba(234,230,169,0.1)' }}
    >
      <div className="mb-6 flex items-center justify-between">
        <h4 className="flex items-center gap-3 text-xl font-bold text-white">
          <span className="material-symbols-outlined text-[#eacea9]">explore</span>
          Excursiones
        </h4>
      </div>
      <div className="mb-6 space-y-4">
        {excursiones.length === 0 ? (
          <div className="rounded-lg border border-dashed border-white/10 bg-white/[0.03] px-4 py-8 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Sin excursiones agregadas</p>
            <p className="mt-2 text-xs text-slate-500">Las excursiones aparecerán cuando se seleccionen para esta reserva.</p>
          </div>
        ) : excursiones.map((excursion) => (
          <ExcursionCard key={excursion.nombre} {...excursion} />
        ))}
      </div>
      <button
        onClick={onAddExcursion}
        className="w-full rounded-lg border border-[#eacea9]/30 py-3 text-xs font-bold uppercase tracking-widest text-[#eacea9] transition-all hover:bg-[#eacea9]/10"
        type="button"
      >
        Añadir más excursiones
      </button>
    </div>
  );
};

export default ExcursionsList;
