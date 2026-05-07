import React from 'react';
import { useTranslation } from 'react-i18next';

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
  loading?: boolean;
}

const iconStyles: Record<string, { bg: string; text: string }> = {
  calendar_month:  { bg: 'bg-blue-50',      text: 'text-blue-500'   },
  check_circle:    { bg: 'bg-green-50',     text: 'text-green-600'  },
  hourglass_empty: { bg: 'bg-amber-50',     text: 'text-amber-500'  },
  attach_money:    { bg: 'bg-[#0e1a34]/5',  text: 'text-[#0e1a34]' },
};

const Skeleton: React.FC = () => (
  <div className="h-8 w-20 bg-slate-100 rounded animate-pulse mt-1 mb-2" />
);

const MetricsGrid: React.FC<MetricsGridProps> = ({ metrics, loading }) => {
  const { t } = useTranslation();

  const DEFAULT_METRICS: Metric[] = [
    {
      label: t('reservations.metrics.total'),
      value: '0',
      icon: 'calendar_month',
      trend: '0%',
      trendUp: true,
      trendText: '0% vs mes anterior',
    },
    {
      label: t('reservations.metrics.confirmed'),
      value: '0',
      icon: 'check_circle',
      trend: '0%',
      trendUp: true,
      trendText: '0%',
    },
    {
      label: t('reservations.metrics.pending'),
      value: '0',
      icon: 'hourglass_empty',
      trend: '0%',
      trendUp: false,
      trendText: '0%',
    },
    {
      label: t('reservations.metrics.totalIncome'),
      value: '$0.00',
      icon: 'attach_money',
      trend: '0%',
      trendUp: true,
      trendText: '0%',
    },
  ];

  const resolvedMetrics = metrics ?? DEFAULT_METRICS;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {resolvedMetrics.map((metric) => {
        const ic = iconStyles[metric.icon] ?? { bg: 'bg-slate-50', text: 'text-slate-500' };
        return (
          <div
            key={metric.label}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 ${ic.bg} ${ic.text} rounded-lg`}>
                <span className="material-symbols-outlined">{metric.icon}</span>
              </div>
            </div>

            <p className="text-slate-500 text-sm font-medium">{metric.label}</p>

            {loading
              ? <Skeleton />
              : <h3 className="text-2xl font-bold text-[#0e1a34] mt-1 mb-2">{metric.value}</h3>
            }

            <div className="flex items-center gap-1">
              <span className={`material-symbols-outlined text-[14px] ${metric.trendUp ? 'text-green-500' : 'text-red-500'}`}>
                {metric.trendUp ? 'trending_up' : 'trending_down'}
              </span>
              <span className={`text-xs font-bold ${metric.trendUp ? 'text-green-500' : 'text-red-500'}`}>
                {metric.trendText || metric.trend}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MetricsGrid;
