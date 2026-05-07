import React from 'react';
import { useTranslation } from 'react-i18next';
import type { DashboardMetrics } from '../../data/dashboardService';

interface StatsGridProps {
  metrics: DashboardMetrics;
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);

const formatTrend = (pct: number): string =>
  pct === 0 ? '0%' : `${pct > 0 ? '+' : ''}${pct}%`;

const Skeleton: React.FC = () => (
  <div className="h-8 w-28 bg-slate-100 rounded animate-pulse mt-1" />
);

const ICON_COLORS: Record<string, { bg: string; text: string }> = {
  confirmation_number: { bg: 'bg-blue-50',   text: 'text-blue-500'   },
  payments:            { bg: 'bg-green-50',  text: 'text-green-600'  },
  sailing:             { bg: 'bg-[#0e1a34]/5', text: 'text-[#0e1a34]' },
  person_add:          { bg: 'bg-amber-50',  text: 'text-amber-600'  },
};

const StatsGrid: React.FC<StatsGridProps> = ({ metrics }) => {
  const { t } = useTranslation();

  const stats = [
    {
      icon:     'confirmation_number',
      labelKey: 'dashboard.stats.totalReservations',
      value:    metrics.totalReservas   === null ? null : String(metrics.totalReservas),
      trend:    metrics.trends.totalReservas,
    },
    {
      icon:     'payments',
      labelKey: 'dashboard.stats.income',
      value:    metrics.ingresos        === null ? null : formatCurrency(metrics.ingresos),
      trend:    metrics.trends.ingresos,
    },
    {
      icon:     'sailing',
      labelKey: 'dashboard.stats.activeCruises',
      value:    metrics.cruceroActivos  === null ? null : String(metrics.cruceroActivos),
      trend:    metrics.trends.cruceroActivos,
    },
    {
      icon:     'person_add',
      labelKey: 'dashboard.stats.newPassengers',
      value:    metrics.nuevosPasajeros === null ? null : String(metrics.nuevosPasajeros),
      trend:    metrics.trends.nuevosPasajeros,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const ic = ICON_COLORS[stat.icon] ?? { bg: 'bg-slate-50', text: 'text-slate-500' };
        const trendUp =
          stat.trend === null ? null :
          stat.trend > 0     ? true  :
          stat.trend < 0     ? false : null;

        return (
          <div
            key={stat.labelKey}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 ${ic.bg} ${ic.text} rounded-lg`}>
                <span className="material-symbols-outlined">{stat.icon}</span>
              </div>
              {stat.trend !== null && (
                <span className={`text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 ${
                  trendUp === true  ? 'text-green-600 bg-green-50' :
                  trendUp === false ? 'text-red-500 bg-red-50'     :
                  'text-slate-400 bg-slate-50'
                }`}>
                  {trendUp === true  && <span className="material-symbols-outlined text-xs">trending_up</span>}
                  {trendUp === false && <span className="material-symbols-outlined text-xs">trending_down</span>}
                  {formatTrend(stat.trend)}
                </span>
              )}
            </div>
            <p className="text-slate-500 text-sm font-medium">{t(stat.labelKey)}</p>
            {stat.value === null
              ? <Skeleton />
              : <h3 className="text-2xl font-bold text-[#0e1a34] mt-1">{stat.value}</h3>
            }
          </div>
        );
      })}
    </div>
  );
};

export default StatsGrid;
