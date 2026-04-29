// features/details_suit/presentation/components/ItineraryMap.tsx
import React from 'react';

const ItineraryMap: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-12 h-[1px] bg-maroon-gold" />
          <h3 className="text-xs font-bold text-maroon-gold uppercase tracking-[0.3em]">
            Itinerario de Navegacion
          </h3>
        </div>
        <span className="text-[10px] text-pearl-beige/60 uppercase tracking-widest font-bold">
          Sin ruta
        </span>
      </div>

      <div className="flex h-[380px] items-center justify-center rounded-[2rem] border border-dashed border-gray-200 bg-[#0e1a34]/5 px-8 text-center shadow-xl">
        <div>
          <span className="material-symbols-outlined mb-4 text-6xl text-maroon-gold/30">route</span>
          <p className="text-sm font-bold uppercase tracking-widest text-night-blue">Sin itinerario disponible</p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-gray-500">
            El mapa se dibujara cuando una reserva tenga puertos y coordenadas reales.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ItineraryMap;
