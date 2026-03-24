import React from 'react';
import AdminSidebar from '../../../gestionreserva/presentation/components/AdminSidebar';
import ConfigHeader from '../components/ConfigHeader';
import ConfigPerfil from '../components/ConfigPerfil';
import ConfigSeguridad from '../components/ConfigSeguridad';
import ConfigNotificaciones from '../components/ConfigNotificaciones';
import ConfigPreferencias from '../components/ConfigPreferencias';

const ConfiguracionPage: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar activeItem="Configuración" />
      <main className="flex-1 overflow-y-auto bg-[#f6f7f8]">
        <div className="p-10 max-w-5xl">
          <ConfigHeader />
          <div className="space-y-8">
            <ConfigPerfil />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ConfigSeguridad />
              <ConfigNotificaciones />
            </div>
            <ConfigPreferencias />
            <div className="flex justify-end gap-4 pt-4 pb-10">
              <button className="px-8 py-3 text-slate-500 font-bold hover:text-slate-700 transition-colors">
                Cancelar
              </button>
              <button className="bg-[#0e1a34] text-white px-10 py-3 rounded-lg font-bold shadow-xl hover:bg-slate-800 transition-all">
                Aplicar Todo
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConfiguracionPage;