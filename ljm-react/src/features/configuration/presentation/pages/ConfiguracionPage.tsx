import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../../gestionreserva/presentation/components/AdminSidebar';
import ConfigHeader from '../components/ConfigHeader';
import ConfigPerfil from '../components/ConfigPerfil';
import ConfigSeguridad from '../components/ConfigSeguridad';
import ConfigNotificaciones from '../components/ConfigNotificaciones';
import ConfigPreferencias from '../components/ConfigPreferencias';
import { useTheme } from '../../../../context/ThemeContext';

const TWO_FACTOR_ENABLED_KEY = 'ljm_admin_two_factor_enabled';

const ConfiguracionPage: React.FC = () => {
  const { tema } = useTheme();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  useEffect(() => {
    setTwoFactorEnabled(localStorage.getItem(TWO_FACTOR_ENABLED_KEY) === 'true');
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <main
        className={`flex-1 overflow-y-auto transition-colors ${
          tema === 'oscuro' ? 'bg-slate-900' : 'bg-[#f6f7f8]'
        }`}
      >
        <div className="p-10 max-w-5xl mx-auto">
          <ConfigHeader />
          <div className="space-y-8 pb-10">
            <ConfigPerfil />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ConfigSeguridad onTwoFactorChange={setTwoFactorEnabled} twoFactorEnabled={twoFactorEnabled} />
              <ConfigNotificaciones twoFactorEnabled={twoFactorEnabled} />
            </div>
            <ConfigPreferencias />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConfiguracionPage;
