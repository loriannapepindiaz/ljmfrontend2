import React from 'react';
import { useAdminPreferences } from '../../../../context/AdminPreferencesContext';

const ConfigHeader: React.FC = () => {
  const { t } = useAdminPreferences();

  return (
    <header className="mb-10">
      <h1 className="text-4xl font-bold text-[#0e1a34] dark:text-white mb-2 transition-colors">{t('config.title')}</h1>
      <p className="text-slate-500 dark:text-slate-300 transition-colors">{t('config.subtitle')}</p>
    </header>
  );
};

export default ConfigHeader;
