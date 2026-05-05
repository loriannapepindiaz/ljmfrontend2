import React from 'react';
import { useTranslation } from 'react-i18next';

interface PasajerosMetricsProps {
  total: number;
  platinum: number;
  gold: number;
  recent: number;
}

const PasajerosMetrics: React.FC<PasajerosMetricsProps> = ({ total, platinum, gold, recent }) => {
  const { t } = useTranslation();

  const metrics = [
    { labelKey: 'passengers.metrics.total',    value: total,    icon: 'group'             },
    { labelKey: 'passengers.metrics.platinum', value: platinum, icon: 'military_tech'     },
    { labelKey: 'passengers.metrics.gold',     value: gold,     icon: 'workspace_premium' },
    { labelKey: 'passengers.metrics.recent',   value: recent,   icon: 'anchor'            },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((m) => (
        <div
          key={m.labelKey}
          className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start justify-between"
        >
          <div>
            <p className="text-sm font-medium text-slate-500">{t(m.labelKey)}</p>
            <p className="text-3xl font-bold text-[#0e1a34] mt-1">{m.value}</p>
          </div>
          <span className="material-symbols-outlined text-[#0e1a34]/20 text-4xl">{m.icon}</span>
        </div>
      ))}
    </div>
  );
};

export default PasajerosMetrics;
