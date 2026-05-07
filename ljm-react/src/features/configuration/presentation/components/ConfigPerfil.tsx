import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ADMIN_SESSION_EVENT, getStoredAdminSession } from '../../../../lib/api';
import { useTheme } from '../../../../context/ThemeContext';

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '?';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const ConfigPerfil: React.FC = () => {
  const { t } = useTranslation();
  const { tema } = useTheme();
  const adminUser = getStoredAdminSession()?.user;
  const [nombre, setNombre] = useState(adminUser?.username ?? '');
  const [email, setEmail] = useState(adminUser?.email ?? '');
  const [saveMessage, setSaveMessage] = useState('');

  const handleSaveProfile = () => {
    const currentSession = getStoredAdminSession();
    if (!currentSession?.user) return;

    const updatedUser = {
      ...currentSession.user,
      username: nombre.trim() || currentSession.user.username,
      email: email.trim() || currentSession.user.email,
    };

    localStorage.setItem('ljm_admin_user', JSON.stringify(updatedUser));
    window.dispatchEvent(new Event(ADMIN_SESSION_EVENT));
    setSaveMessage(t('config.preferences.saved'));
    window.setTimeout(() => setSaveMessage(''), 2000);
  };

  return (
    <section
      className={`overflow-hidden rounded-xl border shadow-sm transition-colors ${
        tema === 'oscuro' ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'
      }`}
    >
      <div className={`px-6 py-4 border-b ${tema === 'oscuro' ? 'border-slate-700 bg-slate-800/50' : 'border-slate-100 bg-slate-50/50'}`}>
        <h2 className={`text-xl font-bold ${tema === 'oscuro' ? 'text-white' : 'text-[#0e1a34]'}`}>{t('config.profile.title')}</h2>
      </div>
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-8 items-start">

          {/* Avatar */}
          <div className="size-28 rounded-full border-4 border-[#eacea9] shadow-md flex items-center justify-center bg-[#0e1a34] shrink-0">
            <span className="text-3xl font-bold text-[#eacea9] select-none tracking-wide">
              {getInitials(nombre || adminUser?.username || '?')}
            </span>
          </div>

          {/* Campos */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <div>
              <label className={`mb-2 block text-sm font-semibold ${tema === 'oscuro' ? 'text-slate-200' : 'text-slate-700'}`}>{t('config.profile.fullName')}</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder={t('config.profile.namePlaceholder')}
                className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-[#eacea9] focus:ring-2 focus:ring-[#eacea9]/50 ${
                  tema === 'oscuro'
                    ? 'border-slate-600 bg-slate-900 text-white placeholder:text-slate-400'
                    : 'border-slate-300 bg-white text-slate-900'
                }`}
              />
            </div>
            <div>
              <label className={`mb-2 block text-sm font-semibold ${tema === 'oscuro' ? 'text-slate-200' : 'text-slate-700'}`}>{t('config.profile.email')}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('config.profile.emailPlaceholder')}
                className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-[#eacea9] focus:ring-2 focus:ring-[#eacea9]/50 ${
                  tema === 'oscuro'
                    ? 'border-slate-600 bg-slate-900 text-white placeholder:text-slate-400'
                    : 'border-slate-300 bg-white text-slate-900'
                }`}
              />
            </div>
            <div>
              <label className={`mb-2 block text-sm font-semibold ${tema === 'oscuro' ? 'text-slate-200' : 'text-slate-700'}`}>{t('config.profile.systemRole')}</label>
              <input
                type="text"
                value={adminUser?.rol ?? t('config.profile.superAdmin')}
                disabled
                className={`w-full cursor-not-allowed rounded-lg border px-4 py-2.5 text-sm ${
                  tema === 'oscuro'
                    ? 'border-slate-700 bg-slate-900 text-slate-400'
                    : 'border-slate-200 bg-slate-50 text-slate-400'
                }`}
              />
            </div>
            <div className="flex items-end">
              <div className="flex items-center gap-3">
                {saveMessage ? <span className="text-xs font-semibold text-emerald-600">{saveMessage}</span> : null}
                <button
                  type="button"
                  onClick={handleSaveProfile}
                  className="bg-[#0e1a34] text-white px-6 py-2.5 rounded-lg font-bold hover:bg-slate-800 transition-all shadow-md text-sm"
                >
                {t('config.profile.saveChanges')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConfigPerfil;
