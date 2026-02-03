// features/details_suit/presentation/components/SuiteDetails.tsx
import React from 'react';

const SuiteDetails: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <span className="w-12 h-[1px] bg-maroon-gold" />
        <span className="text-xs font-bold text-maroon-gold uppercase tracking-[0.3em]">Resumen y Descripción</span>
      </div>

      <h2 className="text-4xl magiona-title text-night-blue mb-4 leading-tight">The Majestic Pearl</h2>

      <div className="flex gap-8 mb-8 border-y border-gray-200 py-6">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Nombre Barco</span>
          <span className="font-semibold text-night-blue">The Majestic Pearl</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Tamaño Suite</span>
          <span className="font-semibold text-night-blue">850 sq ft</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Capacidad</span>
          <span className="font-semibold text-night-blue">2 Adultos + 1 Niño</span>
        </div>
      </div>

      <p className="text-gray-600 leading-relaxed text-lg mb-8 italic font-light">
        "Una experiencia de hospitalidad inigualable donde cada detalle ha sido diseñado para evocar la calma del océano y el refinamiento de la alta sociedad europea."
      </p>

      <p className="text-gray-500 leading-relaxed mb-8 font-light">
        Ubicada en la cubierta superior del navío The Majestic Pearl, la Royal Owner's Suite ofrece vistas panorámicas ininterrumpidas del Mediterráneo. Disfrute de servicios exclusivos que incluyen mayordomo privado las 24 horas, acceso preferente a restaurantes Michelin y una selección curada de vinos en su bodega privada.
      </p>
    </div>
  );
};

export default SuiteDetails;