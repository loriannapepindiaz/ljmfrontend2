import React from 'react';

interface Stat {
  icon: string;
  label: string;
  value: string;
  trend: string;
  trendUp: boolean | null;
}

const stats: Stat[] = [
  { icon: 'confirmation_number', label: 'Total Reservas',      value: '0', trend: '0%',     trendUp: null  },
  { icon: 'payments',            label: 'Ingresos',            value: '$0', trend: '0%',    trendUp: null  },
  { icon: 'sailing',             label: 'Cruceros Activos',    value: '0', trend: '0%',     trendUp: null  },
  { icon: 'person_add',          label: 'Nuevos Pasajeros',    value: '0', trend: '0%',     trendUp: null  },
];

const StatsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white border border-[#0e1a34]/10 rounded-xl p-6 shadow-sm flex flex-col gap-2 hover:border-[#eacea9]/50 transition-all"
        >
          <div className="flex justify-between items-start">
            <div className="p-2 bg-[#0e1a34]/5 rounded-lg">
              <span className="material-symbols-outlined text-[#0e1a34]">{stat.icon}</span>
            </div>
            <span className={`text-xs font-bold flex items-center gap-1 ${stat.trendUp === true ? 'text-green-600' : stat.trendUp === false ? 'text-red-500' : 'text-[#0e1a34]/40'}`}>
              <span className="material-symbols-outlined text-xs">
                {stat.trendUp === true ? 'trending_up' : stat.trendUp === false ? 'trending_down' : 'horizontal_rule'}
              </span>
              {stat.trend}
            </span>
          </div>
          <p className="text-[#0e1a34]/60 text-sm font-medium">{stat.label}</p>
          <p className="text-3xl font-bold text-[#0e1a34]">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;