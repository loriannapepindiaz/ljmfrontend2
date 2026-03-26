import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [openEmpleados, setOpenEmpleados] = useState(false);

  // Detectar si estamos en alguna sección de empleados
  const isActive = (path: string) => location.pathname === path;
  const isEmpleadosSection = location.pathname.startsWith('/admin/empleados');

  const base = 'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer';
  const activeStyle = base + ' bg-[#eacea9] text-[#0e1a34] font-medium';
  const inactiveStyle = base + ' text-white/70 hover:bg-white/10 hover:text-white';

  return (
    <aside className="w-64 bg-[#0e1a34] flex flex-col h-full shrink-0">
      <div className="p-6">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div className="size-10 rounded-full bg-[#eacea9] flex items-center justify-center text-[#0e1a34]">
            <span className="material-symbols-outlined font-bold">sailing</span>
          </div>
          <div>
            <h1 className="font-bold text-lg text-white leading-none">LJM Sealine</h1>
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

          {/* Cruceros */}
          <button
            onClick={() => navigate('/admin/cruceros')}
            className={isActive('/admin/cruceros') ? activeStyle : inactiveStyle}
          >
            <span className="material-symbols-outlined text-[22px]">directions_boat</span>
            <span className="text-sm font-medium">Cruceros</span>
          </button>

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

          {/* EMPLEADOS - SOLO DESPLEGABLE */}
          <div>
            <button
              onClick={() => setOpenEmpleados(!openEmpleados)}   // ← Solo abre/cierra, NO navega
              className={`${isEmpleadosSection ? activeStyle : inactiveStyle} group`}
            >
              <span className="material-symbols-outlined text-[22px]">badge</span>
              <span className="text-sm font-medium flex-1 text-left">Empleados</span>
              
              {/* Flecha elegante */}
              <span 
                className={`material-symbols-outlined text-[20px] transition-all duration-300 ease-in-out 
                  ${openEmpleados ? 'rotate-180 text-[#eacea9]' : 'group-hover:text-white/90'}`}
              >
                keyboard_arrow_down
              </span>
            </button>

            {/* Submenú con animación suave */}
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openEmpleados ? 'max-h-32 opacity-100 mt-1' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="ml-6 border-l border-white/10 pl-4 flex flex-col gap-1 pt-1">
                {/* Opción 1: Lista de Empleados */}
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

                {/* Opción 2: Agregar Empleado */}
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

      {/* Footer */}
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