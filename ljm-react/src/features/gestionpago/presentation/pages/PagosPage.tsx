import React from 'react';
import AdminSidebar from '../../../gestionreserva/presentation/components/AdminSidebar';
import PagosHeader from '../components/PagosHeader';
import PagosMetrics from '../components/PagosMetrics';
import PagosTable from '../components/PagosTable';

const PagosPage: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar activeItem="Pagos" />
      <main className="flex-1 overflow-y-auto bg-[#f6f7f8]">
        <div className="p-8">
          <PagosHeader />
          <PagosMetrics />
          <PagosTable />
        </div>
      </main>
    </div>
  );
};

export default PagosPage;