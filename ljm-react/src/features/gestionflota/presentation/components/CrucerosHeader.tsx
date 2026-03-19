import React from 'react';

interface CrucerosHeaderProps {
  onAddClick?: () => void;
}

const CrucerosHeader: React.FC<CrucerosHeaderProps> = ({ onAddClick }) => {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-[#0e1a34]">Gestión de Flota</h2>
          <p className="text-slate-500 text-sm mt-1">Supervise y gestione la flota de cruceros de lujo de LJM Sealine.</p>
        </div>
        <div className="flex items-center gap-4">
          <label className="relative hidden lg:block">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <span className="material-symbols-outlined">search</span>
            </span>
            <input
              type="text"
              className="pl-10 pr-4 py-2 w-64 rounded-lg bg-slate-100 border-none focus:ring-2 focus:ring-[#eacea9]/50 text-sm outline-none"
              placeholder="Buscar crucero..."
            />
          </label>
          <button
            onClick={onAddClick}
            className="bg-[#eacea9] hover:bg-[#d4af37] text-[#0e1a34] px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            Añadir Crucero
          </button>
          <div className="size-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer">
            <span className="material-symbols-outlined">notifications</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CrucerosHeader;