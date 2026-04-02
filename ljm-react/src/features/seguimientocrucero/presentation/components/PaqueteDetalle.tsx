import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaqueteDetalle: React.FC = () => {
  const navigate = useNavigate();

  const caracteristicas = [
    { titulo: 'Veranda Privada',      sub: '200 m² de cubierta abierta' },
    { titulo: 'Concierge Personal',   sub: 'Servicio dedicado 24/7'      },
    { titulo: 'Selección Vintage',    sub: 'Bodega de vinos premium'     },
    { titulo: 'Acceso Prioritario',   sub: 'Restauración y Excursiones'  },
  ];

  return (
    <div className="bg-[#341510]/10 rounded-3xl overflow-hidden border border-[#eacea9]/10 shadow-xl backdrop-blur-sm">
      <div className="grid md:grid-cols-2">
        <div className="relative h-64 md:h-full overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYeDR8EIhUnexYAW_eSJ_jQW7IoGBlJOI89hmHJhSVgf6qgBfD9qQbr3L4ZixIsr2KDNUI-XRJN50VeVwe9lhpHYUm-cGQkle3cGksz0DDfUgMnIfOXFHE06lo6PyLzBEIrh4tB4FPp85snzvc8rUxD2o7FpW2Uifg31xHYH_n_2--oKGC9tz8A57lruqVw-_GVJ7QhIa1ntUE1Sh5tb4RtlL6HGKRJwe_CxfIv0p3sPQWKU6tRyP3dg6VX5w2x8SuhvrodAnN9dOp"
            alt="Suite"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e1a34]/80 to-transparent" />
          <div className="absolute top-6 left-6">
            <span className="bg-[#785d32]/90 text-white text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full shadow-lg">
              Royal Choice
            </span>
          </div>
        </div>

        <div className="p-8 md:p-12 space-y-8">
          <div className="space-y-2">
            <h3 className="text-3xl font-extrabold text-white leading-tight">Experiencia Suite Royal Ocean</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Lujo supremo con vistas panorámicas y servicios a medida.
            </p>
          </div>

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

          <div className="pt-6 border-t border-[#eacea9]/10 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Número de Suite</p>
              <p className="text-xl font-bold text-[#eacea9]">Cubierta 12 • 1204</p>
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