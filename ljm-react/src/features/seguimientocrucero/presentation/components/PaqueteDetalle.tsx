import React from 'react';
import { useNavigate } from 'react-router-dom';

const caracteristicas: Array<{ titulo: string; sub: string }> = [];

const PaqueteDetalle: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#341510]/10 rounded-3xl overflow-hidden border border-[#eacea9]/10 shadow-xl backdrop-blur-sm">
      <div className="grid md:grid-cols-2">
        <div className="flex h-64 items-center justify-center bg-[#0e1a34]/60 md:h-full">
          <span className="material-symbols-outlined text-7xl text-[#eacea9]/20">hotel</span>
        </div>

        <div className="p-8 md:p-12 space-y-8">
          <div className="space-y-2">
            <h3 className="text-3xl font-extrabold text-white leading-tight">Sin suite asignada</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Los detalles de la suite apareceran cuando exista una reserva con cabina seleccionada.
            </p>
          </div>

          {caracteristicas.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/10 bg-white/[0.03] px-5 py-8 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Sin beneficios de suite</p>
              <p className="mt-2 text-xs text-slate-500">No hay caracteristicas registradas para esta reserva.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
              {caracteristicas.map((c) => (
                <div key={c.titulo} className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#785d32] text-lg">verified</span>
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold text-white">{c.titulo}</p>
                    <p className="text-[11px] text-slate-500">{c.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="pt-6 border-t border-[#eacea9]/10 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Numero de Suite</p>
              <p className="text-xl font-bold text-[#eacea9]">Sin numero asignado</p>
            </div>

            <button
              onClick={() => navigate('/manage-booking')}
              className="bg-[#eacea9]/5 border border-[#eacea9]/20 text-[#eacea9] hover:bg-[#eacea9]/10 active:scale-95 active:bg-[#eacea9]/20 transition-all duration-150 text-xs font-bold py-3 px-6 rounded-xl uppercase tracking-wider"
            >
              Gestionar Reserva
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaqueteDetalle;
