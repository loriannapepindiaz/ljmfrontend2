import React from 'react';
import { useTranslation } from 'react-i18next';

interface Stat {
  icon: string;
  labelKey: string;
  value: string;
  trend: string;
  trendUp: boolean | null;
}

const STATS_CONFIG: Omit<Stat, 'labelKey'>[] & { labelKey: string }[] = [
  { icon: 'confirmation_number', labelKey: 'dashboard.stats.totalReservations', value: '0', trend: '0%', trendUp: null },
  { icon: 'payments',            labelKey: 'dashboard.stats.income',            value: '$0', trend: '0%', trendUp: null },
  { icon: 'sailing',             labelKey: 'dashboard.stats.activeCruises',     value: '0', trend: '0%', trendUp: null },
  { icon: 'person_add',          labelKey: 'dashboard.stats.newPassengers',     value: '0', trend: '0%', trendUp: null },
];

const StatsGrid: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {STATS_CONFIG.map((stat) => (
        <div
          key={stat.labelKey}
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
          <p className="text-[#0e1a34]/60 text-sm font-medium">{t(stat.labelKey)}</p>
          <p className="text-3xl font-bold text-[#0e1a34]">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
