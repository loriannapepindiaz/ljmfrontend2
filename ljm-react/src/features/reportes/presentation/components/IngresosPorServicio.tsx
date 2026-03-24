import React from 'react';

const services = [
  { label: 'Cruceros',      color: 'bg-[#0e1a34]', value: '0%' },
  { label: 'Dining',        color: 'bg-[#eacea9]', value: '0%' },
  { label: 'Excursiones',   color: 'bg-slate-700',  value: '0%' },
  { label: 'Spa & Wellness', color: 'bg-slate-400', value: '0%' },
];

const IngresosPorServicio: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
      <h3 className="text-lg font-bold text-[#0e1a34] mb-6">Ingresos por Servicio</h3>

      <div className="relative size-48 mx-auto mb-6 flex items-center justify-center">
        <svg className="size-full" viewBox="0 0 36 36">
          <circle cx="18" cy="18" fill="none" r="15.915" stroke="#f1f2f4" strokeWidth="3" />
          <circle cx="18" cy="18" fill="none" r="15.915" stroke="#0e1a34" strokeDasharray="25 75" strokeDashoffset="25" strokeWidth="3" />
          <circle cx="18" cy="18" fill="none" r="15.915" stroke="#eacea9" strokeDasharray="25 75" strokeDashoffset="0" strokeWidth="3" />
          <circle cx="18" cy="18" fill="none" r="15.915" stroke="#334155" strokeDasharray="25 75" strokeDashoffset="75" strokeWidth="3" />
          <circle cx="18" cy="18" fill="none" r="15.915" stroke="#94a3b8" strokeDasharray="25 75" strokeDashoffset="50" strokeWidth="3" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-[#0e1a34]">—</span>
          <span className="text-[10px] text-slate-400 uppercase tracking-widest">Sin datos</span>
        </div>
      </div>

      <div className="space-y-2">
        {services.map((s) => (
          <div key={s.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`size-2 rounded-full ${s.color}`}></span>
              <span className="text-xs font-medium">{s.label}</span>
            </div>
            <span className="text-xs font-bold">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IngresosPorServicio;