import React from 'react';
import { useTranslation } from 'react-i18next';

interface CrucerosHeaderProps {
  onAddClick?: () => void;
}

const CrucerosHeader: React.FC<CrucerosHeaderProps> = ({ onAddClick }) => {
  const { t } = useTranslation();
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-[#0e1a34]">{t('fleet.title')}</h2>
          <p className="text-slate-500 text-sm mt-1">{t('fleet.subtitle')}</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={onAddClick}
            className="bg-[#eacea9] hover:bg-[#d4af37] text-[#0e1a34] px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            {t('fleet.addCruise')}
          </button>
        </div>
      </div>
    </header>
  );
};

export default CrucerosHeader;