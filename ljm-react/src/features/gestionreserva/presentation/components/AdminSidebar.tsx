import React, { useState } from 'react';

interface AdminSidebarProps {
  activeItem?: string;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeItem: initialActive = '' }) => {
  const [activeItem, setActiveItem] = useState(initialActive);

  const base = 'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors cursor-pointer';
  const activeStyle = base + ' bg-[#eacea9] text-[#0e1a34]';
  const inactiveStyle = base + ' text-white/70 hover:bg-white/10';

  return (
    <aside className="w-64 bg-[#0e1a34] flex flex-col h-full shrink-0">
      <div className="p-6">

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

          <button onClick={() => setActiveItem('Panel de Control')} className={activeItem === 'Panel de Control' ? activeStyle : inactiveStyle}>
            <span className="material-symbols-outlined text-[22px]">dashboard</span>
            <span className={activeItem === 'Panel de Control' ? 'text-sm font-bold' : 'text-sm font-medium'}>Panel de Control</span>
          </button>

          <button onClick={() => setActiveItem('Cruceros')} className={activeItem === 'Cruceros' ? activeStyle : inactiveStyle}>
            <span className="material-symbols-outlined text-[22px]">directions_boat</span>
            <span className={activeItem === 'Cruceros' ? 'text-sm font-bold' : 'text-sm font-medium'}>Cruceros</span>
          </button>

          <button onClick={() => setActiveItem('Reservas')} className={activeItem === 'Reservas' ? activeStyle : inactiveStyle}>
            <span className="material-symbols-outlined text-[22px]">calendar_month</span>
            <span className={activeItem === 'Reservas' ? 'text-sm font-bold' : 'text-sm font-medium'}>Reservas</span>
          </button>

          <button onClick={() => setActiveItem('Pasajeros')} className={activeItem === 'Pasajeros' ? activeStyle : inactiveStyle}>
            <span className="material-symbols-outlined text-[22px]">group</span>
            <span className={activeItem === 'Pasajeros' ? 'text-sm font-bold' : 'text-sm font-medium'}>Pasajeros</span>
          </button>

          <button onClick={() => setActiveItem('Cabinas')} className={activeItem === 'Cabinas' ? activeStyle : inactiveStyle}>
            <span className="material-symbols-outlined text-[22px]">bed</span>
            <span className={activeItem === 'Cabinas' ? 'text-sm font-bold' : 'text-sm font-medium'}>Cabinas</span>
          </button>

          <button onClick={() => setActiveItem('Pagos')} className={activeItem === 'Pagos' ? activeStyle : inactiveStyle}>
            <span className="material-symbols-outlined text-[22px]">payments</span>
            <span className={activeItem === 'Pagos' ? 'text-sm font-bold' : 'text-sm font-medium'}>Pagos</span>
          </button>

          <button onClick={() => setActiveItem('Empleados')} className={activeItem === 'Empleados' ? activeStyle : inactiveStyle}>
            <span className="material-symbols-outlined text-[22px]">badge</span>
            <span className={activeItem === 'Empleados' ? 'text-sm font-bold' : 'text-sm font-medium'}>Empleados</span>
          </button>

          <button onClick={() => setActiveItem('Reportes')} className={activeItem === 'Reportes' ? activeStyle : inactiveStyle}>
            <span className="material-symbols-outlined text-[22px]">bar_chart</span>
            <span className={activeItem === 'Reportes' ? 'text-sm font-bold' : 'text-sm font-medium'}>Reportes</span>
          </button>

          <div className="my-3 border-t border-white/10" />

          <button onClick={() => setActiveItem('Configuración')} className={activeItem === 'Configuración' ? activeStyle : inactiveStyle}>
            <span className="material-symbols-outlined text-[22px]">settings</span>
            <span className={activeItem === 'Configuración' ? 'text-sm font-bold' : 'text-sm font-medium'}>Configuración</span>
          </button>

        </nav>
      </div>

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