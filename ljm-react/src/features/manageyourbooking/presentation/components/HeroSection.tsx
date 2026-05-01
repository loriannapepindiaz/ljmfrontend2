import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <div className="mb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-[#eacea9] uppercase tracking-[0.2em] text-xs font-bold mb-2">
            Gestion de Reserva
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Gestiona Tu Reserva
          </h1>
          <div className="flex items-center gap-3 text-slate-400">
            <span className="bg-[#eacea9]/10 text-[#eacea9] border border-[#eacea9]/20 px-3 py-1 rounded-full text-xs font-bold">
              Sin reserva activa
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
