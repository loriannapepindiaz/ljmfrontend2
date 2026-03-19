import React from 'react';

const FeaturedShipsGrid: React.FC = () => {
  return (
    <section className="mb-12">
      <h3 className="text-xl font-bold text-[#0e1a34] mb-6">Barcos Destacados</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        <div className="flex flex-col items-center justify-center p-12 rounded-xl border-2 border-dashed border-slate-200 text-center">
          <span className="material-symbols-outlined text-[48px] text-slate-300 mb-3">directions_boat</span>
          <p className="text-sm font-bold text-slate-400">Sin barcos destacados</p>
          <p className="text-xs text-slate-300 mt-1">Los barcos aparecerán aquí al conectar la base de datos</p>
        </div>

      </div>
    </section>
  );
};

export default FeaturedShipsGrid;