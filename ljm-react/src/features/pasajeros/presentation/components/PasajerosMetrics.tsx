import React from 'react';

const metrics = [
  { label: 'Total Pasajeros',    value: '0', icon: 'group'              },
  { label: 'Élite Platino',      value: '0', icon: 'military_tech'      },
  { label: 'Miembros Oro',       value: '0', icon: 'workspace_premium'  },
  { label: 'Viajeros Recientes', value: '0', icon: 'anchor'             },
];

const PasajerosMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((m) => (
        <div
          key={m.label}
          className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between"
        >
          <div>
            <p className="text-sm font-medium text-slate-500">{m.label}</p>
            <p className="text-3xl font-bold text-[#0e1a34] mt-1">{m.value}</p>
          </div>
          <span className="material-symbols-outlined text-[#0e1a34]/20 text-4xl">{m.icon}</span>
        </div>
      ))}
    </div>
  );
};

export default PasajerosMetrics;