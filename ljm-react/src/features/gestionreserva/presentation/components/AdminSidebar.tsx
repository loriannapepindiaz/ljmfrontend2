import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [openEmpleados, setOpenEmpleados] = useState(false);
  const [openCruceros, setOpenCruceros] = useState(false);

  const isActive = (path: string) => location.pathname === path;
  const isEmpleadosSection = location.pathname.startsWith('/admin/empleados');
  const isCrucerosSection = location.pathname.startsWith('/admin/cruceros');

  const base = 'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer';
  const activeStyle = base + ' bg-[#eacea9] text-[#0e1a34] font-medium';
  const inactiveStyle = base + ' text-white/70 hover:bg-white/10 hover:text-white';

  return (
    <aside className="w-64 bg-[#0e1a34] flex flex-col h-full shrink-0">
      <div className="p-6">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <img src="/logo.png" alt="LJM Sealine Logo" className="size-12 object-contain" />
          <div>
            <h1 className="font-bold text-lg text-[#eacea9] leading-none">LJM Sealine</h1>
            <p className="text-white/60 text-[10px] uppercase tracking-widest mt-1">Panel Admin</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1">

          {/* Panel de Control */}
          <button
            onClick={() => navigate('/admin/dashboard')}
            className={isActive('/admin/dashboard') ? activeStyle : inactiveStyle}
          >
            <span className="material-symbols-outlined text-[22px]">dashboard</span>
            <span className="text-sm font-medium">Panel de Control</span>
          </button>

          {/* CRUCEROS - DESPLEGABLE */}
          <div>
            <button
              onClick={() => setOpenCruceros(!openCruceros)}
              className={`${isCrucerosSection ? activeStyle : inactiveStyle} group w-full`}
            >
              <span className="material-symbols-outlined text-[22px]">directions_boat</span>
              <span className="text-sm font-medium flex-1 text-left">Cruceros</span>
              <span className={`material-symbols-outlined text-[20px] transition-all duration-300 ease-in-out ${
                openCruceros ? 'rotate-180 text-[#eacea9]' : 'group-hover:text-white/90'
              }`}>
                keyboard_arrow_down
              </span>
            </button>

            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openCruceros ? 'max-h-32 opacity-100 mt-1' : 'max-h-0 opacity-0'
            }`}>
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
                  Lista de Cruceros
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
                  Agregar Crucero
                </button>
              </div>
            </div>
          </div>

          {/* Reservas */}
          <button
            onClick={() => navigate('/admin/reservas')}
            className={isActive('/admin/reservas') ? activeStyle : inactiveStyle}
          >
            <span className="material-symbols-outlined text-[22px]">calendar_month</span>
            <span className="text-sm font-medium">Reservas</span>
          </button>

          {/* Pasajeros */}
          <button
            onClick={() => navigate('/admin/pasajeros')}
            className={isActive('/admin/pasajeros') ? activeStyle : inactiveStyle}
          >
            <span className="material-symbols-outlined text-[22px]">group</span>
            <span className="text-sm font-medium">Pasajeros</span>
          </button>

          {/* Cabinas */}
          <button
            onClick={() => navigate('/admin/cabinas')}
            className={isActive('/admin/cabinas') ? activeStyle : inactiveStyle}
          >
            <span className="material-symbols-outlined text-[22px]">bed</span>
            <span className="text-sm font-medium">Cabinas</span>
          </button>

          {/* EMPLEADOS - DESPLEGABLE */}
          <div>
            <button
              onClick={() => setOpenEmpleados(!openEmpleados)}
              className={`${isEmpleadosSection ? activeStyle : inactiveStyle} group w-full`}
            >
              <span className="material-symbols-outlined text-[22px]">badge</span>
              <span className="text-sm font-medium flex-1 text-left">Empleados</span>
              <span className={`material-symbols-outlined text-[20px] transition-all duration-300 ease-in-out ${
                openEmpleados ? 'rotate-180 text-[#eacea9]' : 'group-hover:text-white/90'
              }`}>
                keyboard_arrow_down
              </span>
            </button>

            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openEmpleados ? 'max-h-32 opacity-100 mt-1' : 'max-h-0 opacity-0'
            }`}>
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
                  Lista de Empleados
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
                  Agregar Empleado
                </button>
              </div>
            </div>
          </div>

          {/* Pagos */}
          <button
            onClick={() => navigate('/admin/pagos')}
            className={isActive('/admin/pagos') ? activeStyle : inactiveStyle}
          >
            <span className="material-symbols-outlined text-[22px]">payments</span>
            <span className="text-sm font-medium">Pagos</span>
          </button>

          {/* Reportes */}
          <button
            onClick={() => navigate('/admin/reportes')}
            className={isActive('/admin/reportes') ? activeStyle : inactiveStyle}
          >
            <span className="material-symbols-outlined text-[22px]">bar_chart</span>
            <span className="text-sm font-medium">Reportes</span>
          </button>

          <div className="my-3 border-t border-white/10" />

          {/* Configuración */}
          <button
            onClick={() => navigate('/admin/configuracion')}
            className={isActive('/admin/configuracion') ? activeStyle : inactiveStyle}
          >
            <span className="material-symbols-outlined text-[22px]">settings</span>
            <span className="text-sm font-medium">Configuración</span>
          </button>

        </nav>
      </div>

      {/* Footer Perfil */}
      <div className="mt-auto p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="size-9 rounded-full bg-[#eacea9]/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px] text-[#eacea9]">person</span>
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-none">Capitán Morgan</p>
            <p className="text-[10px] text-white/50 mt-0.5">Super Administrador</p>
          </div>
        </div>
        <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-white/5 py-3 px-4 text-sm font-bold text-white hover:bg-white/10 transition-all border border-white/10">
          <span className="material-symbols-outlined text-sm">logout</span>
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;