import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface NotifItem {
  labelKey: string;
  descKey: string;
  email: boolean;
  push: boolean;
}

const ConfigNotificaciones: React.FC = () => {
  const { t } = useTranslation();

  const [notifs, setNotifs] = useState<NotifItem[]>([
    { labelKey: 'config.notifications.newReservations', descKey: 'config.notifications.newReservationsDesc', email: false, push: true  },
    { labelKey: 'config.notifications.shipStatus',      descKey: 'config.notifications.shipStatusDesc',      email: true,  push: true  },
    { labelKey: 'config.notifications.weeklyReports',   descKey: 'config.notifications.weeklyReportsDesc',   email: true,  push: false },
  ]);

  const toggle = (index: number, type: 'email' | 'push') => {
    setNotifs(prev => prev.map((n, i) =>
      i === index ? { ...n, [type]: !n[type] } : n
    ));
  };

  return (
    <section className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
        <span className="material-symbols-outlined text-[#0e1a34]">notifications_active</span>
        <h2 className="text-xl font-bold text-[#0e1a34]">{t('config.notifications.title')}</h2>
      </div>
      <div className="p-6 space-y-5">
        {notifs.map((n, i) => (
          <div key={n.labelKey} className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-700">{t(n.labelKey)}</p>
              <p className="text-xs text-slate-400">{t(n.descKey)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggle(i, 'email')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                  n.email
                    ? 'bg-[#0e1a34] text-white border-[#0e1a34]'
                    : 'bg-slate-50 text-slate-400 border-slate-200 hover:border-[#eacea9]'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">mail</span>
                {t('config.notifications.email')}
              </button>
              <button
                onClick={() => toggle(i, 'push')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                  n.push
                    ? 'bg-[#0e1a34] text-white border-[#0e1a34]'
                    : 'bg-slate-50 text-slate-400 border-slate-200 hover:border-[#eacea9]'
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">phone_iphone</span>
                {t('config.notifications.push')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ConfigNotificaciones;
