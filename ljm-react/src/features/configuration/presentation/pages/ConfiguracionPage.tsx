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
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto bg-[#f6f7f8] dark:bg-slate-900 transition-colors">
        <div className="p-10 max-w-5xl mx-auto">
          <ConfigHeader />
          <div className="space-y-8 pb-10">
            <ConfigPerfil />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ConfigSeguridad />
              <ConfigNotificaciones />
            </div>
            <ConfigPreferencias />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConfiguracionPage;
