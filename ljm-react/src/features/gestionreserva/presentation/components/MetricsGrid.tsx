import React from 'react';

interface Metric {
  label: string;
  value: string;
  icon: string;
  trend: string;
  trendUp: boolean;
  trendText?: string;
}

interface MetricsGridProps {
  metrics?: Metric[];
}

const DEFAULT_METRICS: Metric[] = [
  {
    label: 'Total Reservas',
    value: '0',
    icon: 'calendar_month',
    trend: '0%',
    trendUp: true,
    trendText: '0% vs mes anterior',
  },
  {
    label: 'Confirmadas',
    value: '0',
    icon: 'check_circle',
    trend: '0%',
    trendUp: true,
    trendText: '0%',
  },
  {
    label: 'Pendientes',
    value: '0',
    icon: 'hourglass_empty',
    trend: '0%',
    trendUp: false,
    trendText: '0%',
  },
  {
    label: 'Ingresos Totales',
    value: 'R$ 0',
    icon: 'attach_money',
    trend: '0%',
    trendUp: true,
    trendText: '0%',
  },
];

const iconColors: Record<string, string> = {
  calendar_month:  'text-slate-500',
  check_circle:    'text-green-500',
  hourglass_empty: 'text-amber-500',
  attach_money:    'text-blue-500',
};

const MetricsGrid: React.FC<MetricsGridProps> = ({ metrics = DEFAULT_METRICS }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
        >
          {/* Label + icono arriba */}
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {metric.label}
            </p>
            <span className={`material-symbols-outlined text-[22px] ${iconColors[metric.icon] ?? 'text-slate-400'}`}>
              {metric.icon}
            </span>
          </div>

          {/* Valor grande */}
          <p className="text-3xl font-bold text-[#0e1a34] mb-2">{metric.value}</p>

          {/* Trend abajo */}
          <div className="flex items-center gap-1">
            <span className={`material-symbols-outlined text-[14px] ${metric.trendUp ? 'text-green-500' : 'text-red-500'}`}>
              {metric.trendUp ? 'trending_up' : 'trending_down'}
            </span>
            <span className={`text-xs font-bold ${metric.trendUp ? 'text-green-500' : 'text-red-500'}`}>
              {metric.trendText || metric.trend}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsGrid;