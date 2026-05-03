import React from 'react';
import { useAdminPreferences } from '../../../../context/AdminPreferencesContext';
import { useTheme } from '../../../../context/ThemeContext';

const ConfigHeader: React.FC = () => {
  const { t } = useAdminPreferences();
  const { tema } = useTheme();

  return (
    <header className="mb-10">
      <h1 className={`text-4xl font-bold transition-colors ${tema === 'oscuro' ? 'text-white' : 'text-[#0e1a34]'}`}>
        {t('config.title')}
      </h1>
      <div className={`mt-3 h-px w-full rounded-full ${tema === 'oscuro' ? 'bg-white/10' : 'bg-[#0e1a34]/10'}`} />
      <p className={`mt-3 max-w-2xl text-sm transition-colors ${tema === 'oscuro' ? 'text-slate-300' : 'text-slate-500'}`}>
        {t('config.subtitle')}
      </p>
    </header>
  );
};

export default ConfigHeader;
