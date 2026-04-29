import React from 'react';
import { useNavigate } from 'react-router-dom';

const paradas: Array<{ estado: string; ciudad: string; detalle: string; activo: string }> = [];

const RutaProgreso: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#341510]/20 rounded-3xl p-8 border border-[#eacea9]/5 shadow-2xl backdrop-blur-sm flex flex-col">
      <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-2">
        <span className="material-symbols-outlined text-[#785d32]">route</span>
        Ruta en Tiempo Real
      </h3>

      {paradas.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/10 bg-white/[0.03] px-5 py-10 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Sin ruta registrada</p>
          <p className="mt-2 text-xs text-slate-500">
            El progreso se mostrara cuando exista un itinerario real para esta reserva.
          </p>
        </div>
      ) : (
        <div className="relative pl-12 space-y-12 grow">
          <div className="absolute left-5.75 top-2 bottom-2 w-0.5 bg-linear-to-b from-[#785d32] via-[#eacea9]/20 to-[#0e1a34]" />
          {paradas.map((p) => (
            <div key={p.ciudad} className="relative">
              <div className="space-y-1">
                <p className="text-sm font-bold uppercase tracking-wider text-[#eacea9]">{p.estado}</p>
                <h4 className="text-xl font-bold text-white leading-tight">{p.ciudad}</h4>
                <p className="text-xs text-slate-400 font-medium">{p.detalle}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => navigate('/details-suit')}
        className="w-full mt-10 py-4 bg-[#785d32] text-white rounded-xl font-bold text-xs tracking-widest uppercase hover:bg-[#785d32]/90 transition-all flex items-center justify-center gap-2"
      >
        Ver Itinerario Completo
        <span className="material-symbols-outlined text-sm">chevron_right</span>
      </button>
    </div>
  );
};

export default RutaProgreso;
