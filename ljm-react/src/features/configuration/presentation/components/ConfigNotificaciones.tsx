import React, { useState } from 'react';

interface NotifItem {
  label: string;
  desc: string;
  email: boolean;
  push: boolean;
}

const ConfigNotificaciones: React.FC = () => {
  const [notifs, setNotifs] = useState<NotifItem[]>([
    { label: 'Nuevas Reservas',      desc: 'Email y Push',             email: false, push: true  },
    { label: 'Estado de los Barcos', desc: 'Alertas de mantenimiento', email: true,  push: true  },
    { label: 'Reportes Semanales',   desc: 'Resumen de ingresos',      email: true,  push: false },
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
        <h2 className="text-xl font-bold text-[#0e1a34]">Notificaciones</h2>
      </div>
      <div className="p-6 space-y-5">
        {notifs.map((n, i) => (
          <div key={n.label} className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-700">{n.label}</p>
              <p className="text-xs text-slate-400">{n.desc}</p>
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
                Email
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
                Push
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ConfigNotificaciones;