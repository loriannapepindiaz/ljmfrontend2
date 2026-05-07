import React from 'react';
import { useTranslation } from 'react-i18next';

interface CabinasMetricsProps {
  total: number;
  occupied: number;
  available: number;
  maintenance: number;
  loading?: boolean;
}

const Skeleton: React.FC = () => (
  <div className="h-8 w-20 bg-slate-100 rounded animate-pulse mt-1" />
);

const CabinasMetrics: React.FC<CabinasMetricsProps> = ({ total, occupied, available, maintenance, loading }) => {
  const { t } = useTranslation();

  const cards = [
    { labelKey: 'cabins.metrics.total',       value: total,       icon: 'hotel',        iconBg: 'bg-blue-50',   iconText: 'text-blue-500'   },
    { labelKey: 'cabins.metrics.occupied',    value: occupied,    icon: 'person_check', iconBg: 'bg-[#0e1a34]/5', iconText: 'text-[#0e1a34]' },
    { labelKey: 'cabins.metrics.available',   value: available,   icon: 'check_circle', iconBg: 'bg-green-50',  iconText: 'text-green-600'  },
    { labelKey: 'cabins.metrics.maintenance', value: maintenance, icon: 'handyman',     iconBg: 'bg-red-50',    iconText: 'text-red-500'    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {cards.map((c) => (
        <div key={c.labelKey} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className={`p-2 ${c.iconBg} ${c.iconText} rounded-lg`}>
              <span className="material-symbols-outlined">{c.icon}</span>
            </div>
          </div>
          <p className="text-slate-500 text-sm font-medium">{t(c.labelKey)}</p>
          {loading
            ? <Skeleton />
            : <h3 className="text-2xl font-bold text-[#0e1a34] mt-1">{c.value}</h3>
          }
        </div>
      ))}
    </div>
  );
};

export default CabinasMetrics;
