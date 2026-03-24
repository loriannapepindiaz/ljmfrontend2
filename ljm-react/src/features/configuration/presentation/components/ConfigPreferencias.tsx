import React, { useState, useEffect } from 'react';
import { useTheme } from '../../../../context/ThemeContext';

const idiomas = ['Español (ES)', 'English (US)'];
const zonas = [
  '(GMT-05:00) Bogota, Lima, Quito',
  '(GMT-04:00) Atlantic Time (Canada)',
  '(GMT+01:00) Madrid, Paris, Berlin',
];

const ConfigPreferencias: React.FC = () => {
  const { tema, setTema } = useTheme();
  const [idioma, setIdioma] = useState('Español (ES)');
  const [zona, setZona] = useState('(GMT-05:00) Bogota, Lima, Quito');
  const [openDropdown, setOpenDropdown] = useState<'idioma' | 'zona' | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedIdioma = localStorage.getItem('idioma');
    const savedZona = localStorage.getItem('zona');
    if (savedIdioma) setIdioma(savedIdioma);
    if (savedZona) setZona(savedZona);
  }, []);

  const handleApply = () => {
    localStorage.setItem('idioma', idioma);
    localStorage.setItem('zona', zona);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <section className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition-colors duration-300">
      <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 flex items-center gap-2">
        <span className="material-symbols-outlined text-[#0e1a34] dark:text-[#eacea9]">tune</span>
        <h2 className="text-xl font-bold text-[#0e1a34] dark:text-white">Preferencias del Sistema</h2>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Idioma */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Idioma</label>
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'idioma' ? null : 'idioma')}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg border text-sm transition-all bg-white dark:bg-slate-900 ${
                openDropdown === 'idioma'
                  ? 'border-[#eacea9] ring-2 ring-[#eacea9]/50'
                  : 'border-slate-300 dark:border-slate-600 hover:border-[#eacea9]'
              }`}
            >
              <span className="text-[#0e1a34] dark:text-white font-medium">{idioma}</span>
              <span className="material-symbols-outlined text-[18px] text-slate-400">
                {openDropdown === 'idioma' ? 'expand_less' : 'expand_more'}
              </span>
            </button>
            {openDropdown === 'idioma' && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-[#0e1a34]/10 dark:border-slate-700 rounded-xl shadow-lg z-50 overflow-hidden">
                  {idiomas.map((i) => (
                    <button
                      key={i}
                      onClick={() => { setIdioma(i); setOpenDropdown(null); }}
                      className={`w-full px-4 py-2.5 text-sm text-left transition-colors ${
                        idioma === i
                          ? 'bg-[#eacea9] text-[#0e1a34] font-bold'
                          : 'text-[#0e1a34] dark:text-white hover:bg-[#eacea9]/10'
                      }`}
                    >
                      {i}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1.5">⚠️ Requiere conexión a BD</p>
        </div>

        {/* Zona Horaria */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Zona Horaria</label>
          <div className="relative">
            <button
              onClick={() => setOpenDropdown(openDropdown === 'zona' ? null : 'zona')}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg border text-sm transition-all bg-white dark:bg-slate-900 ${
                openDropdown === 'zona'
                  ? 'border-[#eacea9] ring-2 ring-[#eacea9]/50'
                  : 'border-slate-300 dark:border-slate-600 hover:border-[#eacea9]'
              }`}
            >
              <span className="text-[#0e1a34] dark:text-white font-medium truncate pr-2">{zona}</span>
              <span className="material-symbols-outlined text-[18px] text-slate-400 shrink-0">
                {openDropdown === 'zona' ? 'expand_less' : 'expand_more'}
              </span>
            </button>
            {openDropdown === 'zona' && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-[#0e1a34]/10 dark:border-slate-700 rounded-xl shadow-lg z-50 overflow-hidden">
                  {zonas.map((z) => (
                    <button
                      key={z}
                      onClick={() => { setZona(z); setOpenDropdown(null); }}
                      className={`w-full px-4 py-2.5 text-sm text-left transition-colors ${
                        zona === z
                          ? 'bg-[#eacea9] text-[#0e1a34] font-bold'
                          : 'text-[#0e1a34] dark:text-white hover:bg-[#eacea9]/10'
                      }`}
                    >
                      {z}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1.5">⚠️ Requiere conexión a BD</p>
        </div>

        {/* Tema Visual */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Tema Visual</label>
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
              Claro
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
              Oscuro
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-1.5">✅ Se aplica inmediatamente</p>
        </div>

      </div>

      <div className="px-6 pb-6">
        <button
          onClick={handleApply}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
            saved
              ? 'bg-green-500 text-white'
              : 'bg-[#eacea9] text-[#0e1a34] hover:bg-[#d4af37]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">
            {saved ? 'check_circle' : 'save'}
          </span>
          {saved ? '¡Guardado!' : 'Guardar preferencias'}
        </button>
      </div>
    </section>
  );
};

export default ConfigPreferencias;