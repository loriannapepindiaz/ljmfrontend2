import React, { useEffect, useMemo, useState } from 'react';
import { useTheme } from '../../../../context/ThemeContext';
import { getStoredAdminSession } from '../../../../lib/api';

type ConfigNotificacionesProps = {
  twoFactorEnabled: boolean;
};

const ConfigNotificaciones: React.FC<ConfigNotificacionesProps> = ({ twoFactorEnabled }) => {
  const { tema } = useTheme();
  const adminSession = getStoredAdminSession();
  const adminUser = adminSession?.user;
  const [resolvedLoginAt, setResolvedLoginAt] = useState(() => adminSession?.loginAt ?? localStorage.getItem('ljm_admin_login_at'));

  useEffect(() => {
    const storedLoginAt = localStorage.getItem('ljm_admin_login_at');

    if (storedLoginAt) {
      setResolvedLoginAt(storedLoginAt);
      return;
    }

    const fallbackLoginAt = new Date().toISOString();
    localStorage.setItem('ljm_admin_login_at', fallbackLoginAt);
    setResolvedLoginAt(fallbackLoginAt);
  }, []);

  const currentSession = useMemo(
    () => {
      const loginDate = resolvedLoginAt ? new Date(resolvedLoginAt) : null;
      const baseDate = loginDate && !Number.isNaN(loginDate.getTime()) ? loginDate : new Date();

      return baseDate.toLocaleString('es-ES', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      });
    },
    [resolvedLoginAt],
  );

  return (
    <section className={`rounded-xl border shadow-sm ${tema === 'oscuro' ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'}`}>
      <div className={`flex items-center gap-2 border-b px-6 py-4 ${tema === 'oscuro' ? 'border-slate-700 bg-slate-800/50' : 'border-slate-100 bg-slate-50/50'}`}>
        <span className="material-symbols-outlined text-[#0e1a34]">devices</span>
        <h2 className={`text-xl font-bold ${tema === 'oscuro' ? 'text-white' : 'text-[#0e1a34]'}`}>Sesion y Accesos</h2>
      </div>

      <div className="space-y-5 p-6">
        <div className={`rounded-2xl border p-4 ${tema === 'oscuro' ? 'border-slate-700 bg-slate-900/60' : 'border-slate-100 bg-slate-50'}`}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className={`text-sm font-semibold ${tema === 'oscuro' ? 'text-slate-100' : 'text-slate-700'}`}>Sesion actual del panel</p>
              <p className={`mt-1 text-xs leading-relaxed ${tema === 'oscuro' ? 'text-slate-400' : 'text-slate-500'}`}>
                <span className="break-all">{adminUser?.email ?? 'Administrador conectado'}</span>
                {' '}
                <span>desde este navegador.</span>
              </p>
            </div>
            <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700">
              Activa
            </span>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className={`rounded-xl border px-3 py-3 ${tema === 'oscuro' ? 'border-slate-700 bg-slate-800' : 'border-white bg-white'}`}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Inicio reciente</p>
              <p className={`mt-1 text-sm font-semibold ${tema === 'oscuro' ? 'text-slate-100' : 'text-slate-700'}`}>{currentSession}</p>
            </div>
            <div className={`rounded-xl border px-3 py-3 ${tema === 'oscuro' ? 'border-slate-700 bg-slate-800' : 'border-white bg-white'}`}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Verificacion</p>
              <p className={`mt-1 text-sm font-semibold ${twoFactorEnabled ? 'text-emerald-600' : 'text-amber-600'}`}>
                {twoFactorEnabled ? '2FA activa' : 'Pendiente de 2FA'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConfigNotificaciones;
