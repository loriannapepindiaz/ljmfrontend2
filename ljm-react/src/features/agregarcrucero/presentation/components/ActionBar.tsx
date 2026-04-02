import React from 'react';

const ActionBar: React.FC = () => {
  return (
    <div className="sticky bottom-0 bg-white/80 backdrop-blur-md border-t border-slate-200 p-6 px-8 flex flex-col md:flex-row justify-between items-center gap-4 z-30">
      <button className="text-slate-500 hover:text-red-500 font-bold text-sm transition-colors uppercase tracking-widest px-4">
        Cancelar Edición
      </button>
      <div className="flex gap-4 w-full md:w-auto">
        <button className="flex-1 md:flex-none border-2 border-[#0e1a34] text-[#0e1a34] hover:bg-[#0e1a34] hover:text-white font-bold py-3 px-8 rounded-lg transition-all text-sm uppercase tracking-widest">
          Guardar Borrador
        </button>
        <button className="flex-1 md:flex-none bg-[#eacea9] hover:bg-[#d4af37] text-[#0e1a34] font-black py-3 px-10 rounded-lg transition-all shadow-lg text-sm uppercase tracking-widest flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-lg">directions_boat</span>
          Publicar en Flota
        </button>
      </div>
    </div>
  );
};

export default ActionBar;