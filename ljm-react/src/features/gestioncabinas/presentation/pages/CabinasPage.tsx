import React from 'react';
import AdminSidebar from '../../../gestionreserva/presentation/components/AdminSidebar';
import CabinasHeader from '../components/CabinasHeader';
import CabinasMetrics from '../components/CabinasMetrics';
import CabinasFilters from '../components/CabinasFilters';
import CabinasTable from '../components/CabinasTable';

const CabinasPage: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar activeItem="Cabinas" />
      <main className="flex-1 flex flex-col overflow-hidden bg-white relative">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-[#0e1a34]/5 to-transparent pointer-events-none" />
        <CabinasHeader />
        <div className="flex-1 overflow-y-auto p-8 relative z-0">
          <CabinasMetrics />
          <CabinasFilters />
          <CabinasTable />
        </div>
      </main>
    </div>
  );
};

export default CabinasPage;