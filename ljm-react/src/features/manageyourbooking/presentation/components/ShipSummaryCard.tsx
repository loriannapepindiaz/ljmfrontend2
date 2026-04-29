import React from 'react';

const ShipSummaryCard: React.FC = () => {
  return (
    <div
      className="rounded-xl overflow-hidden mb-10 flex flex-col md:flex-row shadow-2xl"
      style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(16px)', border: '1px solid rgba(234,230,169,0.1)' }}
    >
      <div className="md:w-1/3 h-48 md:h-auto bg-white/[0.03] flex items-center justify-center">
        <span className="material-symbols-outlined text-6xl text-[#eacea9]/20">directions_boat</span>
      </div>
      <div className="p-8 flex-1 flex flex-col justify-center">
        <h3 className="text-2xl font-bold text-white mb-2">Sin barco asignado</h3>
        <p className="text-slate-400 mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#eacea9]">info</span>
          Esta seccion se completa con los datos reales de la reserva.
        </p>
      </div>
    </div>
  );
};

export default ShipSummaryCard;
