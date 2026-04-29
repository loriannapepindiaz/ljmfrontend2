import React from 'react';

const ItinerarioBanner: React.FC = () => {
  return (
    <div className="relative rounded-3xl overflow-hidden border border-[#eacea9]/10 bg-[#0e1a34]">
      <div className="flex items-center p-8 md:p-12">
        <div className="space-y-2 max-w-md">
          <h4 className="text-2xl font-extrabold text-white">Sin guia de viaje disponible</h4>
          <p className="text-slate-300 text-sm font-light">
            La guia digital se generara cuando exista una reserva con destino e itinerario reales.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ItinerarioBanner;
