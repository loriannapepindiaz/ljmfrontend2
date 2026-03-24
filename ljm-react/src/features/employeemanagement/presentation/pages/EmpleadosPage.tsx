import React from 'react';
import AdminSidebar from '../../../gestionreserva/presentation/components/AdminSidebar';
import EmpleadosHeader from '../components/EmpleadosHeader';
import EmpleadosMetrics from '../components/EmpleadosMetrics';
import EmpleadosTable from '../components/EmpleadosTable';

const EmpleadosPage: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar activeItem="Empleados" />
      <main className="flex-1 overflow-y-auto bg-[#f6f7f8]">
        <div className="p-8">
          <EmpleadosHeader />
          <EmpleadosMetrics />
          <EmpleadosTable />
        </div>
      </main>
    </div>
  );
};

export default EmpleadosPage;