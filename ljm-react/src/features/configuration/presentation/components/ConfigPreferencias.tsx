import React, { useEffect, useMemo, useState } from 'react';
import { useTheme } from '../../../../context/ThemeContext';
import { useAdminPreferences } from '../../../../context/AdminPreferencesContext';
import { LANGUAGE_OPTIONS, TIMEZONE_OPTIONS } from '../../../../i18n';

const ConfigPreferencias: React.FC = () => {
  const { tema, setTema } = useTheme();
  const {
    language,
    timezone,
    locale,
    setLanguage,
    setTimezone,
    t,
    getLanguageLabel,
    getTimezoneLabel,
  } = useAdminPreferences();
  const [openDropdown, setOpenDropdown] = useState<'idioma' | 'zona' | null>(null);
  const [saved, setSaved] = useState(false);
  const [now, setNow] = useState(() => new Date());
  const [draftLanguage, setDraftLanguage] = useState(language);
  const [draftTimezone, setDraftTimezone] = useState(timezone);

  useEffect(() => {
    setDraftLanguage(language);
  }, [language]);

  useEffect(() => {
    setDraftTimezone(timezone);
  }, [timezone]);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const currentTimeInZone = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: draftTimezone,
      }).format(now),
    [locale, draftTimezone, now],
  );

  const applyPreferences = () => {
    setLanguage(draftLanguage);
    setTimezone(draftTimezone);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleApply = () => {
    applyPreferences();
  };

  useEffect(() => {
    const onApplyAll = () => applyPreferences();
    window.addEventListener('admin-preferences-apply', onApplyAll);
    return () => window.removeEventListener('admin-preferences-apply', onApplyAll);
  }, [draftLanguage, draftTimezone]);

  return (
    <section className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors duration-300">
      <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 flex items-center gap-2">
        <span className="material-symbols-outlined text-[#0e1a34] dark:text-[#eacea9]">tune</span>
        <h2 className="text-xl font-bold text-[#0e1a34] dark:text-white">{t('config.preferences.title')}</h2>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            {t('config.preferences.language')}
          </label>
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'idioma' ? null : 'idioma')}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg border text-sm transition-all bg-white dark:bg-slate-900 ${
                openDropdown === 'idioma'
                  ? 'border-[#eacea9] ring-2 ring-[#eacea9]/50'
                  : 'border-slate-300 dark:border-slate-600 hover:border-[#eacea9]'
              }`}
            >
              <span className="text-[#0e1a34] dark:text-white font-medium">{getLanguageLabel(draftLanguage)}</span>
              <span className="material-symbols-outlined text-[18px] text-slate-400">
                {openDropdown === 'idioma' ? 'expand_less' : 'expand_more'}
              </span>
            </button>
            {openDropdown === 'idioma' && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-[#0e1a34]/10 dark:border-slate-700 rounded-xl shadow-lg z-50 overflow-hidden">
                  {LANGUAGE_OPTIONS.map((option) => (
                    <button
                      key={option.code}
                      onClick={() => {
                        setDraftLanguage(option.code);
                        setLanguage(option.code);
                        setOpenDropdown(null);
                      }}
                      className={`w-full px-4 py-2.5 text-sm text-left transition-colors ${
                        draftLanguage === option.code
                          ? 'bg-[#eacea9] text-[#0e1a34] font-bold'
                          : 'text-[#0e1a34] dark:text-white hover:bg-[#eacea9]/10'
                      }`}
                    >
                      {option.label[draftLanguage]}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            {t('config.preferences.timezone')}
          </label>
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'zona' ? null : 'zona')}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg border text-sm transition-all bg-white dark:bg-slate-900 ${
                openDropdown === 'zona'
                  ? 'border-[#eacea9] ring-2 ring-[#eacea9]/50'
                  : 'border-slate-300 dark:border-slate-600 hover:border-[#eacea9]'
              }`}
            >
              <span className="text-[#0e1a34] dark:text-white font-medium truncate pr-2">{getTimezoneLabel(draftTimezone)}</span>
              <span className="material-symbols-outlined text-[18px] text-slate-400 shrink-0">
                {openDropdown === 'zona' ? 'expand_less' : 'expand_more'}
              </span>
            </button>
            {openDropdown === 'zona' && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-[#0e1a34]/10 dark:border-slate-700 rounded-xl shadow-lg z-50 overflow-hidden">
                  {TIMEZONE_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setDraftTimezone(option.value);
                        setOpenDropdown(null);
                      }}
                      className={`w-full px-4 py-2.5 text-sm text-left transition-colors ${
                        draftTimezone === option.value
                          ? 'bg-[#eacea9] text-[#0e1a34] font-bold'
                          : 'text-[#0e1a34] dark:text-white hover:bg-[#eacea9]/10'
                      }`}
                    >
                      {option.label[draftLanguage]}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1.5">
            {t('config.preferences.currentTime')}: {currentTimeInZone}
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            {t('config.preferences.theme')}
          </label>
          <div className="flex p-1 bg-slate-100 dark:bg-slate-700 rounded-lg">
            <button
              onClick={() => setTema('claro')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-bold transition-all ${
                tema === 'claro'
                  ? 'bg-white shadow-sm text-[#0e1a34]'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              <span className="material-symbols-outlined text-base">light_mode</span>
              {t('config.preferences.light')}
            </button>
            <button
              onClick={() => setTema('oscuro')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-bold transition-all ${
                tema === 'oscuro'
                  ? 'bg-[#0e1a34] shadow-sm text-white'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              <span className="material-symbols-outlined text-base">dark_mode</span>
              {t('config.preferences.dark')}
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-1.5">{t('config.preferences.appliesImmediately')}</p>
        </div>
      </div>

      <div className="px-6 pb-6">
        <button
          onClick={handleApply}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
            saved ? 'bg-green-500 text-white' : 'bg-[#eacea9] text-[#0e1a34] hover:bg-[#d4af37]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">{saved ? 'check_circle' : 'save'}</span>
          {saved ? t('config.preferences.saved') : t('config.preferences.save')}
        </button>
      </div>
    </section>
  );
};

export default ConfigPreferencias;
