import React from 'react';
import { useTranslation } from 'react-i18next';

interface PasajerosHeaderProps {
  onAddClick?: () => void;
}

const PasajerosHeader: React.FC<PasajerosHeaderProps> = ({ onAddClick }) => {
  const { t } = useTranslation();
  return (
    <header className="bg-white border-b border-slate-200 px-8 py-6 shrink-0">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-bold text-[#0e1a34]">{t('passengers.title')}</h2>
          <p className="text-slate-500 mt-1">{t('passengers.subtitle')}</p>
        </div>
      </div>
    </header>
  );
};

export default PasajerosHeader;