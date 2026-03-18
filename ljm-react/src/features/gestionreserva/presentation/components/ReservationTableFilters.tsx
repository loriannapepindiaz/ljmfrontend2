// features/gestionreserva/presentation/components/ReservationTableFilters.tsx
import React from 'react';

const ReservationTableFilters: React.FC = () => {
  return (
    <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
      <div className="flex items-center gap-2 flex-wrap">
        <button className="px-5 py-2 rounded-full bg-maroon-gold text-off-white text-xs font-bold transition-all shadow-sm hover:brightness-110">Todos</button>
        <button className="px-5 py-2 rounded-full bg-card-white text-gray-600 text-xs font-bold hover:bg-gray-50 transition-colors border border-gray-200">Confirmados</button>
        <button className="px-5 py-2 rounded-full bg-card-white text-gray-600 text-xs font-bold hover:bg-gray-50 transition-colors border border-gray-200">Pendentes</button>
        <button className="px-5 py-2 rounded-full bg-card-white text-gray-600 text-xs font-bold hover:bg-gray-50 transition-colors border border-gray-200">Pagos</button>
      </div>

      <div className="relative w-full max-w-md">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-maroon-gold text-[20px]">search</span>
        <input 
          className="w-full pl-12 pr-4 py-3 bg-card-white border border-gray-200 rounded-full focus:ring-2 focus:ring-maroon-gold/30 text-sm placeholder-gray-400 outline-none" 
          placeholder="Pesquisar por ID, hóspede ou navio..." 
          type="text"
        />
      </div>
    </div>
  );
};

export default ReservationTableFilters;