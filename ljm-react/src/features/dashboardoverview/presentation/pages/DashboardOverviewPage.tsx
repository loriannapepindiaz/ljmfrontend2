import React from 'react';
import AdminSidebar from '../../../gestionreserva/presentation/components/AdminSidebar';
import DashboardHeader from '../components/DashboardHeader';
import StatsGrid from '../components/StatsGrid';
import RecentActivityTable from '../components/RecentActivityTable';
import QuickActions from '../components/QuickActions';
import UpcomingDepartures from '../components/UpcomingDepartures';

const DashboardOverviewPage: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar activeItem="Panel de Control" />
      <main className="flex-1 overflow-y-auto bg-white relative">

        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-[#0e1a34]/5 to-transparent pointer-events-none"></div>

        <DashboardHeader />

        <div className="p-8 flex flex-col gap-8">
          <StatsGrid />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
            <RecentActivityTable />
            <div className="flex flex-col gap-8">
              <QuickActions />
              <UpcomingDepartures />
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default DashboardOverviewPage;