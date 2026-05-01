import React from 'react';
import { useTranslation } from 'react-i18next';

const UpcomingDepartures: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-white border border-[#0e1a34]/10 rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-bold text-[#0e1a34] mb-4">{t('dashboard.upcomingDepartures.title')}</h3>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4 p-3 rounded-lg text-center text-slate-400 text-sm">
          <span className="material-symbols-outlined text-[40px] block text-slate-300">directions_boat</span>
          <p>{t('dashboard.upcomingDepartures.empty')}</p>
        </div>
      </div>
    </div>
  );
};

export default UpcomingDepartures;