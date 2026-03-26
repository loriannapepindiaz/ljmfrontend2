import React from 'react';

const paradas = [
  { estado: 'Salida', ciudad: 'Barcelona', detalle: 'Muelle 18 • Port de Barcelona', activo: 'completado' },
  { estado: 'En curso', ciudad: 'Mykonos', detalle: 'Llegada: Sept 15, 08:00 AM', activo: 'actual' },
  { estado: 'Próximo', ciudad: 'Santorini', detalle: 'Llegada: Sept 18', activo: 'futuro' },
];

const RutaProgreso: React.FC = () => {
  return (
    <div className="bg-[#341510]/20 rounded-3xl p-8 border border-[#eacea9]/5 shadow-2xl backdrop-blur-sm flex flex-col">
      <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-2">
        <span className="material-symbols-outlined text-[#785d32]">route</span>
        Ruta en Tiempo Real
      </h3>

      <div className="relative pl-12 space-y-12 flex-grow">
        <div className="absolute left-[23px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-[#785d32] via-[#eacea9]/20 to-[#0e1a34]" />

        {paradas.map((p) => (
          <div key={p.ciudad} className="relative">
            <div className={`absolute -left-[45px] top-0 size-7 rounded-full flex items-center justify-center border-4 ${
              p.activo === 'completado'
                ? 'bg-[#785d32] border-[#0e1a34]'
                : p.activo === 'actual'
                ? 'bg-[#0e1a34] border-[#785d32]/30'
                : 'bg-[#0e1a34] border-white/10'
            }`}>
              {p.activo === 'completado' && (
                <span className="material-symbols-outlined text-[14px] text-white">check</span>
              )}
              {p.activo === 'actual' && (
                <div className="size-2 rounded-full bg-[#eacea9] animate-pulse" />
              )}
            </div>
            <div className={`space-y-1 ${p.activo === 'futuro' ? 'opacity-40' : p.activo === 'actual' ? 'opacity-80' : ''}`}>
              <p className={`text-sm font-bold uppercase tracking-wider ${
                p.activo === 'completado' ? 'text-[#785d32]' :
                p.activo === 'actual' ? 'text-[#eacea9]' : 'text-slate-500'
              }`}>{p.estado}</p>
              <h4 className="text-xl font-bold text-white leading-tight">{p.ciudad}</h4>
              <p className="text-xs text-slate-400 font-medium">{p.detalle}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-10 py-4 bg-[#785d32] text-white rounded-xl font-bold text-xs tracking-widest uppercase hover:bg-[#785d32]/90 transition-all flex items-center justify-center gap-2">
        Ver Itinerario Completo
        <span className="material-symbols-outlined text-sm">chevron_right</span>
      </button>
    </div>
  );
};

export default RutaProgreso;