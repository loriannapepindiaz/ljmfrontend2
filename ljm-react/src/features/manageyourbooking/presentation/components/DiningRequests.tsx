import React from 'react';

const reservas = [
  { label: 'Restaurante Confirmado',  nombre: 'The Pearl Oyster',       detalle: 'Oct 14 • 8:30 PM'        },
  { label: 'Preferencias Dietéticas', nombre: 'Vegano / Sin Gluten',    detalle: 'Anotado en todos los locales' },
];

const DiningRequests: React.FC = () => {
  return (
    <div
      className="rounded-xl p-6"
      style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(16px)', border: '1px solid rgba(234,230,169,0.1)' }}
    >
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-xl font-bold flex items-center gap-3 text-white">
          <span className="material-symbols-outlined text-[#eacea9]">restaurant</span>
          Restauración y Solicitudes
        </h4>
        <div className="flex gap-3">
          <button className="px-3 py-1.5 rounded border border-[#eacea9]/30 text-[#eacea9] text-[10px] font-bold hover:bg-[#eacea9]/10 transition-all uppercase tracking-widest flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">add</span>
            Añadir Solicitud
          </button>
          <button className="px-3 py-1.5 rounded bg-[#eacea9]/10 border border-[#eacea9]/20 text-[#eacea9] text-[10px] font-bold hover:bg-[#eacea9]/20 transition-all uppercase tracking-widest">
            Reservar Mesa
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {reservas.map((r) => (
          <div key={r.label} className="p-4 rounded-lg border border-white/5 bg-white/[0.03] flex justify-between items-start">
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase mb-1">{r.label}</p>
              <p className="font-bold text-white">{r.nombre}</p>
              <p className="text-xs text-[#eacea9]">{r.detalle}</p>
            </div>
            <button className="text-slate-500 hover:text-red-400 transition-colors">
              <span className="material-symbols-outlined text-lg">delete</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiningRequests;