import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FILTER_KEYS = ['all', 'paid', 'pending'] as const;
type FilterKey = typeof FILTER_KEYS[number];

const PagosFilters: React.FC = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  return (
    <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-1 min-w-[300px] items-center gap-3">

        {/* Búsqueda */}
        <div className="relative flex-1 max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#eacea9] outline-none transition-all"
            placeholder={t('payments.filters.search')}
          />
        </div>

        {/* Filtros de estado */}
        <div className="flex items-center bg-slate-50 rounded-xl p-1 border border-slate-100">
          {FILTER_KEYS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                activeFilter === f
                  ? 'bg-white text-[#0e1a34] shadow-sm'
                  : 'text-slate-500 hover:text-[#0e1a34]'
              }`}
            >
              {t(`payments.filters.${f}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Rango de fechas */}
      <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors">
        <span className="material-symbols-outlined text-lg text-slate-400">calendar_today</span>
        <span>{t('payments.filters.last30Days')}</span>
      </button>
    </div>
  );
};

export default PagosFilters;
