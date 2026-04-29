import React from 'react';

const CabinSelection: React.FC = () => {
  return (
    <div
      className="rounded-xl p-6"
      style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(16px)', border: '1px solid rgba(234,230,169,0.1)' }}
    >
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-xl font-bold flex items-center gap-3 text-white">
          <span className="material-symbols-outlined text-[#eacea9]">king_bed</span>
          Seleccion de Cabina
        </h4>
      </div>

      <div className="rounded-lg border border-dashed border-white/10 bg-white/[0.03] px-4 py-10 text-center">
        <span className="material-symbols-outlined mb-3 text-5xl text-[#eacea9]/30">bed</span>
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Sin cabina seleccionada</p>
        <p className="mx-auto mt-2 max-w-md text-xs text-slate-500">
          La cabina aparecera cuando se seleccione una habitacion real para esta reserva.
        </p>
      </div>
    </div>
  );
};

export default CabinSelection;
