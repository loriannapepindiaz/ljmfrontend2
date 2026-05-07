import React from 'react';
import { useTranslation } from 'react-i18next';
import type { EmpleadosMetricsData } from '../../data/empleadosService';

type EmpleadosMetricsProps = {
  metrics: EmpleadosMetricsData;
  loading: boolean;
};

const Skeleton: React.FC = () => (
  <div className="h-8 w-20 bg-slate-100 rounded animate-pulse mt-1" />
);

const formatPercent = (value: number, total: number) => {
  if (total <= 0) return '0%';
  return `${Math.round((value / total) * 100)}%`;
};

const EmpleadosMetrics: React.FC<EmpleadosMetricsProps> = ({ metrics, loading }) => {
  const { t } = useTranslation();

  const cards = [
    {
      labelKey:  'employees.metrics.total',
      value:     metrics.total,
      badge:     metrics.total > 0 ? '100%' : '0%',
      badgeColor: 'text-green-600',
      icon:      'groups',
      iconBg:    'bg-[#0e1a34]/10',
      iconText:  'text-[#0e1a34]',
    },
    {
      labelKey:  'employees.metrics.active',
      value:     metrics.activos,
      badge:     formatPercent(metrics.activos, metrics.total),
      badgeColor: 'text-green-600',
      icon:      'anchor',
      iconBg:    'bg-green-50',
      iconText:  'text-green-600',
    },
    {
      labelKey:  'employees.metrics.onLeave',
      value:     metrics.licencia,
      badge:     formatPercent(metrics.licencia, metrics.total),
      badgeColor: 'text-red-500',
      icon:      'event_busy',
      iconBg:    'bg-orange-50',
      iconText:  'text-orange-600',
    },
    {
      labelKey:  'employees.metrics.vacant',
      value:     metrics.vacantes,
      badge:     formatPercent(metrics.vacantes, metrics.total + metrics.vacantes),
      badgeColor: 'text-green-600',
      icon:      'work_outline',
      iconBg:    'bg-[#0e1a34]/10',
      iconText:  'text-[#0e1a34]',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((c) => (
        <div key={c.labelKey} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className={`p-2 ${c.iconBg} ${c.iconText} rounded-lg`}>
              <span className="material-symbols-outlined">{c.icon}</span>
            </div>
          </div>
          <p className="text-slate-500 text-sm font-medium">{t(c.labelKey)}</p>
          {loading ? <Skeleton /> : (
            <div className="flex items-end gap-2">
              <h3 className="text-2xl font-bold text-[#0e1a34] mt-1">{c.value.toLocaleString('es-ES')}</h3>
              <span className={`text-xs font-bold mb-1 ${c.badgeColor}`}>{c.badge}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default EmpleadosMetrics;
