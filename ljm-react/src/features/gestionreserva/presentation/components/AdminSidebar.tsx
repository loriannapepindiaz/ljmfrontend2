import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAdminPreferences } from '../../../../context/AdminPreferencesContext';
import { clearAdminSession, getStoredAdminSession } from '../../../../lib/api';

const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, timezone, locale } = useAdminPreferences();

  const [openEmpleados, setOpenEmpleados] = useState(false);
  const [openCruceros, setOpenCruceros] = useState(false);
  const [now, setNow] = useState(() => new Date());
  const adminSession = getStoredAdminSession();
  const adminName = adminSession?.user.username ?? adminSession?.user.email ?? 'Administrador';
  const adminRole = adminSession?.user.rol ?? t('sidebar.superAdmin');

  const handleLogout = () => {
    clearAdminSession();
    navigate('/admin');
  };

  useEffect(() => {
    document.body.classList.add('admin-panel');
    return () => {
      document.body.classList.remove('admin-panel');
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const zonedTime = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: timezone,
      }).format(now),
    [locale, timezone, now],
  );

  const isActive = (path: string) => location.pathname === path;
  const isEmpleadosSection = location.pathname.startsWith('/admin/empleados');
  const isCrucerosSection = location.pathname.startsWith('/admin/cruceros');

  const base = 'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer';
  const activeStyle = base + ' bg-[#eacea9] text-[#0e1a34] font-medium';
  const inactiveStyle = base + ' text-white/70 hover:bg-white/10 hover:text-white';

  return (
    <aside className="sidebar-nav w-64 bg-[#0e1a34] flex flex-col h-full shrink-0 overflow-y-auto">
      {/* inner wrapper restores LTR direction */}
      <div className="flex flex-col flex-1 min-w-0" style={{ direction: 'ltr' }}>

        {/* Header — sticky so it stays visible while nav scrolls */}
        <div className="sticky top-0 z-10 bg-[#0e1a34] p-6 pb-4">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="LJM Sealine Logo" className="size-12 object-contain" />
            <div>
              <h1 className="font-bold text-lg text-[#eacea9] leading-none">LJM Sealine</h1>
              <p className="text-white/60 text-[10px] uppercase tracking-widest mt-1">{t('sidebar.panel')}</p>
            </div>
          </div>
        </div>

        {/* Nav — flows naturally, no separate scroll container */}
        <div className="px-6 flex-1">
        <nav className="flex flex-col gap-1 pb-6">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className={isActive('/admin/dashboard') ? activeStyle : inactiveStyle}
          >
            <span className="material-symbols-outlined text-[22px]">dashboard</span>
            <span className="text-sm font-medium">{t('sidebar.dashboard')}</span>
          </button>

          <div>
            <button
              onClick={() => setOpenCruceros(!openCruceros)}
              className={`${isCrucerosSection ? activeStyle : inactiveStyle} group w-full`}
            >
              <span className="material-symbols-outlined text-[22px]">directions_boat</span>
              <span className="text-sm font-medium flex-1 text-left">{t('sidebar.cruises')}</span>
              <span
                className={`material-symbols-outlined text-[20px] transition-all duration-300 ease-in-out ${
                  openCruceros ? 'rotate-180 text-[#eacea9]' : 'group-hover:text-white/90'
                }`}
              >
                keyboard_arrow_down
              </span>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openCruceros ? 'max-h-32 opacity-100 mt-1' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="ml-6 border-l border-white/10 pl-4 flex flex-col gap-1 pt-1">
                <button
                  onClick={() => navigate('/admin/cruceros')}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                    isActive('/admin/cruceros')
                      ? 'bg-[#eacea9]/20 text-[#eacea9] font-medium'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">directions_boat</span>
                  {t('sidebar.cruises.list')}
                </button>
                <button
                  onClick={() => navigate('/admin/cruceros/agregar')}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                    isActive('/admin/cruceros/agregar')
                      ? 'bg-[#eacea9]/20 text-[#eacea9] font-medium'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">add_circle</span>
                  {t('sidebar.cruises.add')}
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/admin/reservas')}
            className={isActive('/admin/reservas') ? activeStyle : inactiveStyle}
          >
            <span className="material-symbols-outlined text-[22px]">calendar_month</span>
            <span className="text-sm font-medium">{t('sidebar.reservations')}</span>
          </button>

          <button
            onClick={() => navigate('/admin/pasajeros')}
            className={isActive('/admin/pasajeros') ? activeStyle : inactiveStyle}
          >
            <span className="material-symbols-outlined text-[22px]">group</span>
            <span className="text-sm font-medium">{t('sidebar.passengers')}</span>
          </button>

          <button
            onClick={() => navigate('/admin/cabinas')}
            className={isActive('/admin/cabinas') ? activeStyle : inactiveStyle}
          >
            <span className="material-symbols-outlined text-[22px]">bed</span>
            <span className="text-sm font-medium">{t('sidebar.cabins')}</span>
          </button>

          <div>
            <button
              onClick={() => setOpenEmpleados(!openEmpleados)}
              className={`${isEmpleadosSection ? activeStyle : inactiveStyle} group w-full`}
            >
              <span className="material-symbols-outlined text-[22px]">badge</span>
              <span className="text-sm font-medium flex-1 text-left">{t('sidebar.employees')}</span>
              <span
                className={`material-symbols-outlined text-[20px] transition-all duration-300 ease-in-out ${
                  openEmpleados ? 'rotate-180 text-[#eacea9]' : 'group-hover:text-white/90'
                }`}
              >
                keyboard_arrow_down
              </span>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openEmpleados ? 'max-h-32 opacity-100 mt-1' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="ml-6 border-l border-white/10 pl-4 flex flex-col gap-1 pt-1">
                <button
                  onClick={() => navigate('/admin/empleados')}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                    isActive('/admin/empleados')
                      ? 'bg-[#eacea9]/20 text-[#eacea9] font-medium'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">group</span>
                  {t('sidebar.employees.list')}
                </button>
                <button
                  onClick={() => navigate('/admin/empleados/agregar')}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                    isActive('/admin/empleados/agregar')
                      ? 'bg-[#eacea9]/20 text-[#eacea9] font-medium'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">person_add</span>
                  {t('sidebar.employees.add')}
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/admin/pagos')}
            className={isActive('/admin/pagos') ? activeStyle : inactiveStyle}
          >
            <span className="material-symbols-outlined text-[22px]">payments</span>
            <span className="text-sm font-medium">{t('sidebar.payments')}</span>
          </button>

          <button
            onClick={() => navigate('/admin/reportes')}
            className={isActive('/admin/reportes') ? activeStyle : inactiveStyle}
          >
            <span className="material-symbols-outlined text-[22px]">bar_chart</span>
            <span className="text-sm font-medium">{t('sidebar.reports')}</span>
          </button>

          <div className="my-3 border-t border-white/10" />

          <button
            onClick={() => navigate('/admin/configuracion')}
            className={isActive('/admin/configuracion') ? activeStyle : inactiveStyle}
          >
            <span className="material-symbols-outlined text-[22px]">settings</span>
            <span className="text-sm font-medium">{t('sidebar.settings')}</span>
          </button>

          <div className="my-3 border-t border-white/10" />

          <div className="flex items-center gap-3 px-2 py-2">
            <div className="size-9 rounded-full bg-[#eacea9]/20 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px] text-[#eacea9]">person</span>
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-none">{adminName}</p>
              <p className="text-[10px] text-white/50 mt-0.5">{adminRole}</p>
              <p className="text-[10px] text-white/50 mt-1">
                {t('sidebar.currentTime')}: {zonedTime}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-white/5 py-3 px-4 text-sm font-bold text-white hover:bg-white/10 transition-all border border-white/10 mb-2"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            {t('sidebar.logout')}
          </button>
        </nav>
        </div>{/* /px-6 */}
      </div>{/* /ltr wrapper */}
    </aside>
  );
};

export default AdminSidebar;
