import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../../gestionreserva/presentation/components/AdminSidebar';
import CrucerosHeader from '../components/CrucerosHeader';
import CrucerosTabs from '../components/CrucerosTabs';
import FeaturedShipsGrid from '../components/FeaturedShipsGrid';
import FleetTable from '../components/FleetTable';

const CrucerosPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar activeItem="Cruceros" />
      <main className="flex-1 overflow-y-auto bg-white">
        <CrucerosHeader onAddClick={() => navigate('/admin/cruceros/agregar')} />
        <div className="p-8">
          <CrucerosTabs onTabChange={(tab) => console.log('Tab:', tab)} />
          <FeaturedShipsGrid />
          <FleetTable />
        </div>
      </main>
    </div>
  );
};

export default CrucerosPage;