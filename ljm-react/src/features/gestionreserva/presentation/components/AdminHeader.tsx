// features/gestionreserva/presentation/components/AdminHeader.tsx
import React from 'react';

const AdminHeader: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-8 py-6 bg-card-white border-b border-gray-200 shadow-sm">
      <h2 className="font-display text-2xl font-bold text-night-blue">Gestión de Reservas</h2>
      
      <div className="flex items-center gap-6">
        <button className="bg-maroon-gold hover:bg-maroon-gold/90 text-off-white font-bold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-premium text-sm">
          <span className="material-symbols-outlined text-[20px]">add</span>
          Añadir Reserva
        </button>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-bold text-night-blue">Admin User</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-tighter">SUPER ADMINISTRATOR</p>
          </div>
          <div className="size-10 rounded-full border-2 border-maroon-gold/20 overflow-hidden bg-gray-200" 
               style={{ backgroundImage: "url('https://lh3.googleusercontent.com/...')", backgroundSize: 'cover' }} />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;