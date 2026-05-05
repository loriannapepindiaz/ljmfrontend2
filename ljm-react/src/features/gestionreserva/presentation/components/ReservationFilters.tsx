import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { ReservaFilterKey } from '../../data/types';
import { FILTER_LABELS } from '../../data/types';

const FILTER_KEYS: ReservaFilterKey[] = ['all', 'confirmed', 'pending', 'paid'];

interface ReservationFiltersProps {
  activeFilter: ReservaFilterKey;
  onFilterChange: (filter: ReservaFilterKey) => void;
  onSearch: (query: string) => void;
}

const ReservationFilters: React.FC<ReservationFiltersProps> = ({
  activeFilter,
  onFilterChange,
  onSearch,
}) => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (val: string) => {
    setSearchValue(val);
    onSearch(val);
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        {FILTER_KEYS.map((key) => {
          const activeClass = 'px-5 py-2 rounded-full bg-[#eacea9] text-[#0e1a34] text-xs font-bold shadow-sm';
          const inactiveClass = 'px-5 py-2 rounded-full bg-white text-slate-600 text-xs font-bold hover:bg-slate-50 border border-slate-200 transition-colors';
          return (
            <button
              key={key}
              onClick={() => onFilterChange(key)}
              className={activeFilter === key ? activeClass : inactiveClass}
            >
              {FILTER_LABELS[key]}
            </button>
          );
        })}
      </div>

      <div className="relative w-full max-w-md">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#eacea9] text-[20px]">
          search
        </span>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-full focus:ring-2 focus:ring-[#eacea9]/30 text-sm placeholder-slate-400 outline-none text-slate-700"
          placeholder={t('reservations.filters.search')}
        />
      </div>
    </div>
  );
};

export default ReservationFilters;
