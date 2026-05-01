import React from 'react';
import { useTranslation } from 'react-i18next';

const DashboardHeader: React.FC = () => {
  const { t } = useTranslation();
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md border-b border-[#0e1a34]/10">
      <h2 className="text-2xl font-bold text-[#0e1a34]">{t('dashboard.title')}</h2>
    </header>
  );
};

export default DashboardHeader;