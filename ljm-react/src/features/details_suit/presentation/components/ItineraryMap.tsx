// features/details_suit/presentation/components/ItineraryMap.tsx
import React from 'react';

const ItineraryMap: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-12 h-[1px] bg-maroon-gold" />
          <h3 className="text-xs font-bold text-maroon-gold uppercase tracking-[0.3em]">
            Itinerario de Navegación
          </h3>
        </div>
        <span className="text-[10px] text-pearl-beige/60 uppercase tracking-widest font-bold">
          Barcelona — Venecia
        </span>
      </div>

      <div className="map-container relative h-[380px] rounded-[2rem] overflow-hidden bg-night-blue shadow-xl">
        {/* Fondo degradado oscuro */}
        <div className="absolute inset-0 bg-gradient-to-b from-night-blue via-[#0D1B2A] to-[#0a0f18]" />

        {/* Línea de ruta SVG */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C5A059" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#C5A059" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#C5A059" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <path
            className="route-path"
            d="M100,280 Q250,240 350,200 T700,120"
            fill="none"
            stroke="url(#routeGradient)"
            strokeDasharray="6,4"
            strokeWidth="2"
            opacity="0.6"
          />
        </svg>

        {/* Punto Barcelona (Inicio) */}
        <div className="absolute bottom-[30%] left-[12%] flex flex-col items-center z-10">
          <div className="bg-night-blue border border-pearl-beige/40 px-3 py-1.5 rounded-full mb-3">
            <p className="text-[8px] text-pearl-beige font-bold uppercase tracking-wider">
              Barcelona
            </p>
          </div>
          <div className="w-2.5 h-2.5 bg-pearl-beige rounded-full shadow-lg shadow-pearl-beige/40" />
        </div>

        {/* Punto Roma (Centro) */}
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 flex flex-col items-center z-10">
          <div className="bg-night-blue border border-pearl-beige/40 px-3 py-1.5 rounded-full mb-3">
            <p className="text-[8px] text-pearl-beige font-bold uppercase tracking-wider">
              Roma
            </p>
          </div>
          <div className="w-1.5 h-1.5 bg-maroon-gold rounded-full shadow-lg shadow-maroon-gold/40" />
        </div>

        {/* Punto Venecia (Final) */}
        <div className="absolute top-[25%] right-[12%] flex flex-col items-center z-10">
          <div className="bg-night-blue border border-pearl-beige/40 px-3 py-1.5 rounded-full mb-3">
            <p className="text-[8px] text-pearl-beige font-bold uppercase tracking-wider">
              Venecia
            </p>
          </div>
          <div className="w-2.5 h-2.5 bg-pearl-beige rounded-full shadow-lg shadow-pearl-beige/40" />
        </div>
      </div>
    </div>
  );
};

export default ItineraryMap;