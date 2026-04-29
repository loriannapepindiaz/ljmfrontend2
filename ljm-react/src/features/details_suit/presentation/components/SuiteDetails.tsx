// features/details_suit/presentation/components/SuiteDetails.tsx
import React from 'react';

const SuiteDetails: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <span className="w-12 h-[1px] bg-maroon-gold" />
        <span className="text-xs font-bold text-maroon-gold uppercase tracking-[0.3em]">Resumen y Descripcion</span>
      </div>

      <h2 className="text-4xl magiona-title text-night-blue mb-4 leading-tight">Sin suite seleccionada</h2>

      <p className="text-gray-600 leading-relaxed text-lg mb-8 italic font-light">
        Selecciona una cabina real para ver el barco, tamano, capacidad, descripcion y servicios disponibles.
      </p>
    </div>
  );
};

export default SuiteDetails;
