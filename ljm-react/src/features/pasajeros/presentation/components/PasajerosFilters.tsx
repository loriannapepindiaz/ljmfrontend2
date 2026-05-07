import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { LoyaltyFilterKey } from '../../data/types';

const FILTER_KEYS: LoyaltyFilterKey[] = ['all', 'elite', 'gold', 'silver', 'diamond'];

interface PasajerosFiltersProps {
  activeFilter: LoyaltyFilterKey;
  onFilterChange: (filter: LoyaltyFilterKey) => void;
  onSearch: (query: string) => void;
}

const PasajerosFilters: React.FC<PasajerosFiltersProps> = ({ activeFilter, onFilterChange, onSearch }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
      <div className="relative w-full md:w-96">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
        <input
          type="text"
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-[#0e1a34]/20 text-sm outline-none"
          placeholder={t('passengers.filters.search')}
        />
      </div>
      <div className="flex gap-2 overflow-x-auto w-full md:w-auto">
        {FILTER_KEYS.map((f) => (
          <button
            key={f}
            onClick={() => onFilterChange(f)}
            className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
              activeFilter === f
                ? 'bg-[#0e1a34] text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {t(`passengers.filters.${f}`)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PasajerosFilters;
