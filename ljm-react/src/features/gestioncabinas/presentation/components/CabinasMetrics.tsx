import React from 'react';
import { useTranslation } from 'react-i18next';

const CabinasMetrics: React.FC = () => {
  const { t } = useTranslation();

  const metrics = [
    { labelKey: 'cabins.metrics.total',       value: '0', icon: 'hotel',        accent: null,    trend: true  },
    { labelKey: 'cabins.metrics.occupied',    value: '0', icon: 'person_check', accent: 'blue',  trend: false },
    { labelKey: 'cabins.metrics.available',   value: '0', icon: 'check_circle', accent: 'green', trend: false },
    { labelKey: 'cabins.metrics.maintenance', value: '0', icon: 'handyman',     accent: 'red',   trend: false },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {metrics.map((m) => (
        <div
          key={m.labelKey}
          className={`bg-white border border-[#0e1a34]/10 p-6 rounded-xl shadow-sm hover:border-[#eacea9]/50 transition-all flex flex-col gap-2 ${
            m.accent ? `border-l-4 border-l-${m.accent}-500` : ''
          }`}
        >
          <div className="flex justify-between items-start">
            <span className="p-2 bg-[#0e1a34]/5 rounded-lg text-[#0e1a34]">
              <span className="material-symbols-outlined">{m.icon}</span>
            </span>
            {m.trend && (
              <span className="text-green-600 text-xs font-bold flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full">
                <span className="material-symbols-outlined text-xs">trending_up</span> 0%
              </span>
            )}
          </div>
          <p className="text-[#0e1a34]/60 text-sm font-medium uppercase tracking-wider">{t(m.labelKey)}</p>
          <h3 className="text-3xl font-bold text-[#0e1a34]">{m.value}</h3>
        </div>
      ))}
    </div>
  );
};

export default CabinasMetrics;
