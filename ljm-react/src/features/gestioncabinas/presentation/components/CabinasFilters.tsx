import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { CategoryKey } from '../../data/types';

const CATEGORY_KEYS: CategoryKey[] = ['all', 'suite', 'balcony', 'seaView'];

interface CabinasFiltersProps {
  cruceros: Array<{ id: string; nombre: string }>;
  selectedCruceroId: string;
  selectedCategoria: CategoryKey;
  onCruceroChange: (id: string) => void;
  onCategoriaChange: (cat: CategoryKey) => void;
  onClear: () => void;
}

const CabinasFilters: React.FC<CabinasFiltersProps> = ({
  cruceros,
  selectedCruceroId,
  selectedCategoria,
  onCruceroChange,
  onCategoriaChange,
  onClear,
}) => {
  const { t } = useTranslation();
  const [openDropdown, setOpenDropdown] = useState<'ship' | null>(null);

  const selectedCrucero = cruceros.find(c => c.id === selectedCruceroId);

  return (
    <div className="bg-white px-4 py-3 rounded-xl border border-[#0e1a34]/10 mb-8 shadow-sm flex items-center gap-2">

      <span className="text-sm font-bold text-[#0e1a34]/50 whitespace-nowrap shrink-0">
        {t('cabins.filters.filterBy')}
      </span>

      {/* Dropdown Barco */}
      <div className="relative shrink-0">
        <button
          onClick={() => setOpenDropdown(openDropdown === 'ship' ? null : 'ship')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-medium transition-all whitespace-nowrap ${
            selectedCruceroId
              ? 'bg-[#eacea9] text-[#0e1a34] border-[#eacea9]'
              : 'bg-white text-[#0e1a34]/60 border-slate-200 hover:border-[#eacea9]'
          }`}
        >
          {selectedCrucero?.nombre ?? t('cabins.filters.allShips')}
          <span className="material-symbols-outlined text-[16px]">
            {openDropdown === 'ship' ? 'expand_less' : 'expand_more'}
          </span>
        </button>
        {openDropdown === 'ship' && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />
            <div className="absolute top-full left-0 mt-1 bg-white border border-[#0e1a34]/10 rounded-xl shadow-xl z-50 overflow-hidden min-w-[200px] max-h-56 overflow-y-auto">
              <button
                onClick={() => { onCruceroChange(''); setOpenDropdown(null); }}
                className={`w-full px-4 py-2.5 text-sm text-left transition-colors ${
                  !selectedCruceroId ? 'bg-[#eacea9] text-[#0e1a34] font-bold' : 'text-[#0e1a34]/50 hover:bg-[#eacea9]/10'
                }`}
              >
                {t('cabins.filters.allShips')}
              </button>
              {cruceros.map(c => (
                <button
                  key={c.id}
                  onClick={() => { onCruceroChange(c.id); setOpenDropdown(null); }}
                  className={`w-full px-4 py-2.5 text-sm text-left transition-colors ${
                    selectedCruceroId === c.id
                      ? 'bg-[#eacea9] text-[#0e1a34] font-bold'
                      : 'text-[#0e1a34]/70 hover:bg-[#eacea9]/10'
                  }`}
                >
                  {c.nombre}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Categorías */}
      {CATEGORY_KEYS.map((c) => (
        <button
          key={c}
          onClick={() => onCategoriaChange(c)}
          className={`text-sm px-3 py-2 rounded-full font-bold transition-all whitespace-nowrap shrink-0 ${
            selectedCategoria === c
              ? 'bg-[#0e1a34] text-white shadow-md'
              : 'bg-white border border-slate-200 text-[#0e1a34]/60 hover:border-[#eacea9]'
          }`}
        >
          {t(`cabins.filters.${c}`)}
        </button>
      ))}

      {/* Limpiar */}
      <button
        onClick={onClear}
        className="ml-auto flex items-center gap-1 text-sm font-bold text-[#0e1a34]/50 hover:text-[#0e1a34] transition-colors whitespace-nowrap shrink-0"
      >
        <span className="material-symbols-outlined text-[16px]">filter_list</span>
        {t('cabins.filters.clear')}
      </button>

    </div>
  );
};

export default CabinasFilters;
