import React, { useEffect, useState } from 'react';
import { useTheme } from '../../../../context/ThemeContext';
import { useAdminPreferences } from '../../../../context/AdminPreferencesContext';
import { LANGUAGE_OPTIONS, TIMEZONE_OPTIONS } from '../../../../i18n';

const ConfigPreferencias: React.FC = () => {
  const { tema, setTema } = useTheme();
  const {
    language,
    timezone,
    locale,
    savePreferences,
    t,
    getLanguageLabel,
    getTimezoneLabel,
  } = useAdminPreferences();
  const [openDropdown, setOpenDropdown] = useState<'idioma' | 'zona' | null>(null);
  const [draftLanguage, setDraftLanguage] = useState(language);
  const [draftTimezone, setDraftTimezone] = useState(timezone);
  const [draftTema, setDraftTema] = useState(tema);
  const [saveState, setSaveState] = useState<'idle' | 'saved'>('idle');
  const [liveClock, setLiveClock] = useState('');

  useEffect(() => {
    const formatClock = () => {
      const current = new Date();

      const formatter = new Intl.DateTimeFormat(locale, {
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: draftLanguage === 'en',
        timeZone: draftTimezone,
      });

      const parts = formatter.formatToParts(current);
      const weekday = parts.find((part) => part.type === 'weekday')?.value ?? '';
      const hour = parts.find((part) => part.type === 'hour')?.value ?? '00';
      const minute = parts.find((part) => part.type === 'minute')?.value ?? '00';
      const second = parts.find((part) => part.type === 'second')?.value ?? '00';
      const dayPeriod = parts.find((part) => part.type === 'dayPeriod')?.value ?? '';

      setLiveClock(`${weekday} ${hour}:${minute}:${second}${dayPeriod ? ` ${dayPeriod}` : ''}`);
    };

    formatClock();
    const interval = setInterval(formatClock, 1000);
    return () => clearInterval(interval);
  }, [draftLanguage, draftTimezone, locale]);

  useEffect(() => {
    setDraftLanguage(language);
    setDraftTimezone(timezone);
  }, [language, timezone]);

  useEffect(() => {
    setDraftTema(tema);
  }, [tema]);

  useEffect(() => {
    if (saveState !== 'saved') return;
    const timer = window.setTimeout(() => setSaveState('idle'), 2000);
    return () => window.clearTimeout(timer);
  }, [saveState]);

  const currentTimeInZone = liveClock;

  const handleSavePreferences = () => {
    savePreferences({ language: draftLanguage, timezone: draftTimezone });
    setTema(draftTema);
    setSaveState('saved');
  };

  return (
    <section className={`rounded-xl border shadow-sm transition-colors duration-300 ${tema === 'oscuro' ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'}`}>
      <div className={`flex items-center gap-2 border-b px-6 py-4 ${tema === 'oscuro' ? 'border-slate-700 bg-slate-800/50' : 'border-slate-100 bg-slate-50/50'}`}>
        <span className={`material-symbols-outlined ${tema === 'oscuro' ? 'text-[#eacea9]' : 'text-[#0e1a34]'}`}>tune</span>
        <h2 className={`text-xl font-bold ${tema === 'oscuro' ? 'text-white' : 'text-[#0e1a34]'}`}>{t('config.preferences.title')}</h2>
      </div>
      <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-3">
        <div>
          <label className={`mb-2 block text-sm font-semibold ${tema === 'oscuro' ? 'text-slate-300' : 'text-slate-700'}`}>
            {t('config.preferences.language')}
          </label>
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'idioma' ? null : 'idioma')}
              className={`w-full rounded-lg border px-4 py-2.5 text-sm transition-all ${
                tema === 'oscuro' ? 'bg-slate-900' : 'bg-white'
              } ${
                openDropdown === 'idioma'
                  ? 'border-[#eacea9] ring-2 ring-[#eacea9]/50'
                  : tema === 'oscuro'
                    ? 'border-slate-600 hover:border-[#eacea9]'
                    : 'border-slate-300 hover:border-[#eacea9]'
              }`}
            >
              <span className="flex items-center justify-between">
                <span className={`font-medium ${tema === 'oscuro' ? 'text-white' : 'text-[#0e1a34]'}`}>{getLanguageLabel(draftLanguage)}</span>
                <span className="material-symbols-outlined text-[18px] text-slate-400">
                  {openDropdown === 'idioma' ? 'expand_less' : 'expand_more'}
                </span>
              </span>
            </button>
            {openDropdown === 'idioma' && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />
                <div className={`absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-xl border shadow-lg ${
                  tema === 'oscuro' ? 'border-slate-700 bg-slate-800' : 'border-[#0e1a34]/10 bg-white'
                }`}>
                  {LANGUAGE_OPTIONS.map((option) => (
                    <button
                      key={option.code}
                      onClick={() => {
                        setDraftLanguage(option.code);
                        setOpenDropdown(null);
                        setSaveState('idle');
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                        draftLanguage === option.code
                          ? 'bg-[#eacea9] font-bold text-[#0e1a34]'
                          : tema === 'oscuro'
                            ? 'text-white hover:bg-[#eacea9]/10'
                            : 'text-[#0e1a34] hover:bg-[#eacea9]/10'
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
          <label className={`mb-2 block text-sm font-semibold ${tema === 'oscuro' ? 'text-slate-300' : 'text-slate-700'}`}>
            {t('config.preferences.timezone')}
          </label>
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'zona' ? null : 'zona')}
              className={`w-full rounded-lg border px-4 py-2.5 text-sm transition-all ${
                tema === 'oscuro' ? 'bg-slate-900' : 'bg-white'
              } ${
                openDropdown === 'zona'
                  ? 'border-[#eacea9] ring-2 ring-[#eacea9]/50'
                  : tema === 'oscuro'
                    ? 'border-slate-600 hover:border-[#eacea9]'
                    : 'border-slate-300 hover:border-[#eacea9]'
              }`}
            >
              <span className="flex items-center justify-between">
                <span className={`truncate pr-2 font-medium ${tema === 'oscuro' ? 'text-white' : 'text-[#0e1a34]'}`}>{getTimezoneLabel(draftTimezone)}</span>
                <span className="material-symbols-outlined shrink-0 text-[18px] text-slate-400">
                  {openDropdown === 'zona' ? 'expand_less' : 'expand_more'}
                </span>
              </span>
            </button>
            {openDropdown === 'zona' && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />
                <div className={`absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-xl border shadow-lg ${
                  tema === 'oscuro' ? 'border-slate-700 bg-slate-800' : 'border-[#0e1a34]/10 bg-white'
                }`}>
                  {TIMEZONE_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setDraftTimezone(option.value);
                        setOpenDropdown(null);
                        setSaveState('idle');
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                        draftTimezone === option.value
                          ? 'bg-[#eacea9] font-bold text-[#0e1a34]'
                          : tema === 'oscuro'
                            ? 'text-white hover:bg-[#eacea9]/10'
                            : 'text-[#0e1a34] hover:bg-[#eacea9]/10'
                      }`}
                    >
                      {option.label[draftLanguage]}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          <p className="mt-1.5 text-xs text-slate-400">
            {t('config.preferences.currentTime')}:
          </p>
          <div
            className={`mt-2 inline-flex rounded-xl border px-3 py-2 font-mono text-sm font-bold tracking-[0.18em] ${
              tema === 'oscuro'
                ? 'border-slate-600 bg-slate-900 text-[#eacea9]'
                : 'border-[#eacea9]/60 bg-[#fff9f1] text-[#0e1a34]'
            }`}
          >
            {currentTimeInZone}
          </div>
        </div>

        <div>
          <label className={`mb-2 block text-sm font-semibold ${tema === 'oscuro' ? 'text-slate-300' : 'text-slate-700'}`}>
            {t('config.preferences.theme')}
          </label>
          <div className={`flex rounded-lg p-1 ${tema === 'oscuro' ? 'bg-slate-700' : 'bg-slate-100'}`}>
            <button
              onClick={() => {
                setTema('claro');
                setDraftTema('claro');
                setSaveState('idle');
              }}
              className={`flex-1 rounded-md py-2 text-sm font-bold transition-all ${
                draftTema === 'claro'
                  ? 'bg-white text-[#0e1a34] shadow-sm'
                  : tema === 'oscuro'
                    ? 'text-slate-400 hover:text-slate-300'
                    : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-base">light_mode</span>
                {t('config.preferences.light')}
              </span>
            </button>
            <button
              onClick={() => {
                setTema('oscuro');
                setDraftTema('oscuro');
                setSaveState('idle');
              }}
              className={`flex-1 rounded-md py-2 text-sm font-bold transition-all ${
                draftTema === 'oscuro'
                  ? 'bg-[#0e1a34] text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-base">dark_mode</span>
                {t('config.preferences.dark')}
              </span>
            </button>
          </div>
          <p className="mt-1.5 text-xs text-slate-400">{t('config.preferences.appliesImmediately')}</p>
        </div>
      </div>
      <div className={`flex items-center justify-end gap-3 border-t px-6 py-4 ${tema === 'oscuro' ? 'border-slate-700 bg-slate-800/40' : 'border-slate-100 bg-slate-50/50'}`}>
        {saveState === 'saved' ? (
          <span className="text-xs font-semibold text-emerald-600">{t('config.preferences.saved')}</span>
        ) : null}
        <button
          type="button"
          onClick={handleSavePreferences}
          className="rounded-xl bg-[#0e1a34] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800"
        >
          {t('config.preferences.save')}
        </button>
      </div>
    </section>
  );
};

export default ConfigPreferencias;
