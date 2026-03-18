// pages/ReservationManagementPage.tsx
import React from 'react';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import MetricsGrid from '../components/MetricsGrid';
import ReservationTableFilters from '../components/ReservationTableFilters';
import ReservationTable from '../components/ReservationTable';

const ReservationManagementPage: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-off-white">
      <AdminSidebar />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        
        <div className="flex-1 overflow-auto p-8">
          <MetricsGrid />
          <ReservationTableFilters />
          <ReservationTable />
        </div>
      </main>
    </div>
  );
};

export default ReservationManagementPage;