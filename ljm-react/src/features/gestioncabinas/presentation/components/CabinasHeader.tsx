import React from 'react';

const CabinasHeader: React.FC = () => {
  return (
    <header className="h-16 border-b border-[#0e1a34]/10 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md shrink-0 sticky top-0 z-10">
      <h2 className="text-2xl font-bold text-[#0e1a34]">Gestión de Cabinas</h2>
      <div className="flex items-center gap-6">
        <div className="relative w-64">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#0e1a34]/40 text-xl">search</span>
          <input
            type="text"
            className="w-full bg-[#0e1a34]/5 border border-[#0e1a34]/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-[#eacea9]/50 text-[#0e1a34] placeholder-[#0e1a34]/40 outline-none"
            placeholder="Buscar cabina o pasajero..."
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-xl bg-[#0e1a34]/5 text-[#0e1a34]/70 hover:text-[#0e1a34] transition-colors relative">
            <span className="material-symbols-outlined text-xl">notifications</span>
            <span className="absolute top-2 right-2 size-2 bg-[#0e1a34] rounded-full border-2 border-white"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default CabinasHeader;