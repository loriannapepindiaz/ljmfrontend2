// features/gestionreserva/presentation/components/AdminSidebar.tsx
import React from 'react';

const AdminSidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-night-blue flex flex-col h-full flex-shrink-0 text-white">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="size-10 rounded-full bg-pearl-beige flex items-center justify-center text-night-blue">
            <span className="material-symbols-outlined font-bold">sailing</span>
          </div>
          <div>
            <h1 className="font-display font-bold text-lg leading-none">LJM Sealine</h1>
            <p className="text-white/70 text-xs uppercase tracking-widest mt-1">ADMIN PANEL</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1">
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-white/80">
            <span className="material-symbols-outlined text-[22px]">dashboard</span>
            <span className="text-sm font-medium">Dashboard</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-pearl-beige text-night-blue font-bold transition-colors">
            <span className="material-symbols-outlined text-[22px] fill-1">calendar_month</span>
            <span className="text-sm">Reservas</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-[22px]">directions_boat</span>
            <span className="text-sm font-medium">Cruceros</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-[22px]">group</span>
            <span className="text-sm font-medium">Pasajeros</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-[22px]">payments</span>
            <span className="text-sm font-medium">Pagos</span>
          </a>

          <div className="my-6 border-t border-white/10"></div>

          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-[22px]">settings</span>
            <span className="text-sm font-medium">Configuración</span>
          </a>
        </nav>
      </div>

      <div className="mt-auto p-6">
        <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-white/10 py-3 px-4 text-sm font-bold hover:bg-white/20 transition-all border border-white/10">
          <span className="material-symbols-outlined text-sm">logout</span>
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;