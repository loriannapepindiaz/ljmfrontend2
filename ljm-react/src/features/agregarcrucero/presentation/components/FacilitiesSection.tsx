import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FACILITY_KEYS = ['spa', 'gym', 'casino', 'helipad', 'theater', 'pool', 'restaurant', 'cinema'] as const;
type FacilityKey = typeof FACILITY_KEYS[number];

const inputClass = "w-full rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#eacea9]/50 focus:border-[#eacea9] p-3 text-slate-900 bg-white outline-none text-sm transition-all";

const FacilitiesSection: React.FC = () => {
  const { t } = useTranslation();
  const [checked, setChecked] = useState<FacilityKey[]>([]);

  const toggle = (item: FacilityKey) => {
    setChecked((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  return (
    <section className="bg-[#f6f7f8] p-8 rounded-xl border border-slate-200">
      <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-4">
        <span className="material-symbols-outlined text-[#0e1a34]">restaurant</span>
        <h3 className="text-xl font-bold text-[#0e1a34]">{t('fleet.add.facilities.title')}</h3>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {FACILITY_KEYS.map((key) => (
          <button
            key={key}
            onClick={() => toggle(key)}
            className={`flex items-center gap-3 p-3 rounded-lg border text-xs font-bold transition-all text-left ${
              checked.includes(key)
                ? 'bg-[#eacea9] border-[#eacea9] text-[#0e1a34]'
                : 'bg-white border-white hover:border-[#eacea9] text-slate-600'
            }`}
          >
            <span className={`material-symbols-outlined text-[16px] ${checked.includes(key) ? 'text-[#0e1a34]' : 'text-slate-400'}`}>
              {checked.includes(key) ? 'check_box' : 'check_box_outline_blank'}
            </span>
            {t(`fleet.add.facilities.items.${key}`)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
            {t('fleet.add.facilities.restaurants')}
          </label>
          <input type="number" placeholder="5" className={inputClass} />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
            {t('fleet.add.facilities.bars')}
          </label>
          <input type="number" placeholder="8" className={inputClass} />
        </div>
      </div>
    </section>
  );
};

export default FacilitiesSection;
