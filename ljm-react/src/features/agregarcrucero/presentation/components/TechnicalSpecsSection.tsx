import React from 'react';
import { useTranslation } from 'react-i18next';

const inputClass = "w-full rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#eacea9]/50 focus:border-[#eacea9] p-3 text-slate-900 bg-white outline-none text-sm transition-all";

interface TechnicalSpecsSectionProps {
  cubiertas: string;
  onCubiertasChange: (v: string) => void;
  eslora: string;
  onEsloraChange: (v: string) => void;
  tonelaje: string;
  onTonelajeChange: (v: string) => void;
}

const TechnicalSpecsSection: React.FC<TechnicalSpecsSectionProps> = ({
  cubiertas,
  onCubiertasChange,
  eslora,
  onEsloraChange,
  tonelaje,
  onTonelajeChange,
}) => {
  const { t } = useTranslation();

  return (
    <section className="bg-[#f6f7f8] p-8 rounded-xl border border-slate-200">
      <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-4">
        <span className="material-symbols-outlined text-[#0e1a34]">engineering</span>
        <h3 className="text-xl font-bold text-[#0e1a34]">{t('fleet.add.tech.title')}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
            {t('fleet.add.tech.year')}
          </label>
          <input type="number" placeholder="2023" className={inputClass} />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
            {t('fleet.add.tech.speed')}
          </label>
          <div className="relative">
            <input
              type="number"
              placeholder="22"
              className="w-full rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#eacea9]/50 focus:border-[#eacea9] p-3 pr-16 text-slate-900 bg-white outline-none text-sm transition-all"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs uppercase">
              {t('fleet.add.tech.knots')}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
            {t('fleet.add.tech.decks')}
          </label>
          <input
            type="number"
            placeholder="12"
            className={inputClass}
            value={cubiertas}
            onChange={(e) => onCubiertasChange(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
            Eslora (m)
          </label>
          <div className="relative">
            <input
              type="number"
              placeholder="180"
              className="w-full rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#eacea9]/50 focus:border-[#eacea9] p-3 pr-10 text-slate-900 bg-white outline-none text-sm transition-all"
              value={eslora}
              onChange={(e) => onEsloraChange(e.target.value)}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs uppercase">m</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
            Tonelaje
          </label>
          <div className="relative">
            <input
              type="number"
              placeholder="45000"
              className="w-full rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#eacea9]/50 focus:border-[#eacea9] p-3 pr-10 text-slate-900 bg-white outline-none text-sm transition-all"
              value={tonelaje}
              onChange={(e) => onTonelajeChange(e.target.value)}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs uppercase">t</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalSpecsSection;
