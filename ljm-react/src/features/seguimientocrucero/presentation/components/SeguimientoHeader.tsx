import React from 'react';

const SeguimientoHeader: React.FC = () => {
  return (
    <section className="relative w-full h-[550px] flex flex-col items-center justify-center px-4 overflow-hidden bg-[#0e1a34]">
      <div className="absolute inset-0 bg-gradient-to-t from-[#0e1a34] via-[#0e1a34]/80 to-[#16264a]" />

      <div className="z-10 w-full max-w-5xl">
        <div className="p-8 md:p-12 rounded-3xl flex flex-col items-center text-center space-y-6">
          <div className="space-y-2">
            <span className="text-[#785d32] uppercase tracking-[0.4em] text-xs font-bold">Seguimiento de viaje</span>
            <h1 className="text-5xl md:text-8xl font-medium text-white tracking-tight mb-2">Sin reserva activa</h1>
            <p className="text-lg md:text-xl text-[#eacea9]/80 font-light italic">
              Los datos de seguimiento apareceran cuando exista un viaje confirmado.
            </p>
          </div>

          <div className="flex items-center gap-3 py-4 px-10 rounded-full border border-[#eacea9]/10 bg-[#0e1a34]/30 backdrop-blur-sm">
            <span className="material-symbols-outlined text-[#eacea9]">route</span>
            <span className="text-xs uppercase tracking-widest text-[#eacea9]/60 font-medium">Sin itinerario disponible</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeguimientoHeader;
