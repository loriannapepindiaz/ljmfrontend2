import React from 'react';
import AdminSidebar from '../../../gestionreserva/presentation/components/AdminSidebar';
import ReportesHeader from '../components/ReportesHeader';
import ReportesKPIs from '../components/ReportesKPIs';
import IngresosTendencia from '../components/IngresosTendencia';
import IngresosPorServicio from '../components/IngresosPorServicio';
import OcupacionPorCrucero from '../components/OcupacionPorCrucero';

const ReportesPage: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar activeItem="Reportes" />
      <main className="flex-1 overflow-y-auto bg-[#f6f7f8]">
        <div className="p-8">
          <ReportesHeader />
          <ReportesKPIs />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <IngresosTendencia />
            <IngresosPorServicio />
          </div>
          <OcupacionPorCrucero />
        </div>
      </main>
    </div>
  );
};

export default ReportesPage;