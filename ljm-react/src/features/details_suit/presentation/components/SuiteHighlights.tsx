// features/details_suit/presentation/components/SuiteHighlights.tsx
import React from 'react';

const SuiteHighlights: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col h-full">
      <div className="flex justify-between items-start mb-8">
        <h3 className="magiona-title text-2xl text-night-blue font-bold">Detalles de la Suite</h3>
        <span className="text-[10px] font-bold text-maroon-gold uppercase tracking-widest">Sin suite seleccionada</span>
      </div>

      <div className="flex flex-1 items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-off-white/50 px-6 py-12 text-center">
        <div>
          <span className="material-symbols-outlined mb-3 text-5xl text-gray-300">hotel</span>
          <p className="text-sm font-bold uppercase tracking-widest text-night-blue">Sin destacados</p>
          <p className="mt-2 text-sm text-gray-500">Los destacados apareceran cuando se seleccione una suite real.</p>
        </div>
      </div>
    </div>
  );
};

export default SuiteHighlights;
