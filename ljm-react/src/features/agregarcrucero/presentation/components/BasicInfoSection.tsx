import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ROUTE_KEYS = ['mediterranean', 'caribbean', 'nordic', 'none'] as const;

const inputClass = "w-full rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#eacea9]/50 focus:border-[#eacea9] p-3 text-slate-900 bg-white outline-none text-sm transition-all";

const BasicInfoSection: React.FC = () => {
  const { t } = useTranslation();
  const [ruta, setRuta] = useState('');
  const [openRuta, setOpenRuta] = useState(false);

  return (
    <section className="bg-[#f6f7f8] p-8 rounded-xl border border-slate-200">
      <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-4">
        <span className="material-symbols-outlined text-[#0e1a34]">info</span>
        <h3 className="text-xl font-bold text-[#0e1a34]">{t('fleet.add.basic.title')}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
            {t('fleet.add.basic.cruiseName')}
          </label>
          <input type="text" placeholder="ej. Majestic Sealine II" className={inputClass} />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
              {t('fleet.add.basic.fleetId')}
            </label>
            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              {t('fleet.add.basic.verified')}
            </span>
          </div>
          <input type="text" placeholder="CR-00124-ESP" className={inputClass} />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
            {t('fleet.add.basic.capacity')}
          </label>
          <input type="number" placeholder="450" className={inputClass} />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
            {t('fleet.add.basic.route')}
          </label>
          <div className="relative">
            <button
              onClick={() => setOpenRuta(!openRuta)}
              className={`w-full flex items-center justify-between px-3 py-3 rounded-lg border text-sm transition-all bg-white ${
                openRuta
                  ? 'border-[#eacea9] ring-2 ring-[#eacea9]/50'
                  : 'border-slate-300 hover:border-[#eacea9]'
              }`}
            >
              <span className={ruta ? 'text-slate-900 font-medium' : 'text-slate-400'}>
                {ruta || t('fleet.add.basic.selectRoute')}
              </span>
              <span className="material-symbols-outlined text-[18px] text-slate-400">
                {openRuta ? 'expand_less' : 'expand_more'}
              </span>
            </button>
            {openRuta && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setOpenRuta(false)} />
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#0e1a34]/10 rounded-xl shadow-xl z-50 overflow-hidden">
                  {ROUTE_KEYS.map((key) => (
                    <button
                      key={key}
                      onClick={() => { setRuta(t(`fleet.add.basic.routes.${key}`)); setOpenRuta(false); }}
                      className={`w-full px-4 py-2.5 text-sm text-left transition-colors ${
                        ruta === t(`fleet.add.basic.routes.${key}`)
                          ? 'bg-[#eacea9] text-[#0e1a34] font-bold'
                          : 'text-[#0e1a34] hover:bg-[#eacea9]/10'
                      }`}
                    >
                      {t(`fleet.add.basic.routes.${key}`)}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default BasicInfoSection;
