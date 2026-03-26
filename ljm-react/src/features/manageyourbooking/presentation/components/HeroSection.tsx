import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <div className="mb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-[#eacea9] uppercase tracking-[0.2em] text-xs font-bold mb-2">
            Gestión de Reserva
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Gestiona Tu Reserva
          </h1>
          <div className="flex items-center gap-3 text-slate-400">
            <span className="bg-[#eacea9]/10 text-[#eacea9] border border-[#eacea9]/20 px-3 py-1 rounded-full text-xs font-bold">
              #SV-8831
            </span>
            <span className="text-sm">Confirmado • Oct 12 - Oct 26, 2024</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2.5 rounded-lg border border-[#eacea9]/30 text-[#eacea9] font-bold text-sm hover:bg-[#eacea9]/10 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">download</span>
            E-Ticket
          </button>
          <button className="px-6 py-2.5 rounded-lg bg-[#eacea9] text-[#0e1a34] font-bold text-sm hover:brightness-110 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">help</span>
            Soporte
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;