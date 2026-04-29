import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ReservationFiltersProps {
  onFilterChange?: (filter: string) => void;
  onSearch?: (query: string) => void;
}

const ReservationFilters: React.FC<ReservationFiltersProps> = ({ onFilterChange, onSearch }) => {
  const { t } = useTranslation();

  const filterKeys = [
    { key: 'all',       label: t('reservations.filters.all')       },
    { key: 'confirmed', label: t('reservations.filters.confirmed') },
    { key: 'pending',   label: t('reservations.filters.pending')   },
    { key: 'paid',      label: t('reservations.filters.paid')      },
  ];

  const [active, setActive] = useState(filterKeys[0].label);

  const handleFilter = (label: string) => {
    setActive(label);
    onFilterChange?.(label);
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        {filterKeys.map((f) => {
          const activeClass = 'px-5 py-2 rounded-full bg-[#eacea9] text-[#0e1a34] text-xs font-bold shadow-sm';
          const inactiveClass = 'px-5 py-2 rounded-full bg-white text-slate-600 text-xs font-bold hover:bg-slate-50 border border-slate-200 transition-colors';
          return (
            <button key={f.key} onClick={() => handleFilter(f.label)} className={active === f.label ? activeClass : inactiveClass}>
              {f.label}
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
          onChange={(e) => onSearch?.(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-full focus:ring-2 focus:ring-[#eacea9]/30 text-sm placeholder-slate-400 outline-none text-slate-700"
          placeholder={t('reservations.filters.search')}
        />
      </div>
    </div>
  );
};

export default ReservationFilters;
