import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../../gestionreserva/presentation/components/AdminSidebar';
import DashboardHeader from '../components/DashboardHeader';
import StatsGrid from '../components/StatsGrid';
import RecentActivityTable from '../components/RecentActivityTable';
import QuickActions from '../components/QuickActions';
import UpcomingDepartures from '../components/UpcomingDepartures';
import { dashboardService, EMPTY_METRICS, type DashboardMetrics, type ActivityRow } from '../../data/dashboardService';

const DashboardOverviewPage: React.FC = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics>(EMPTY_METRICS);
  const [activity, setActivity] = useState<ActivityRow[]>([]);
  const [loadingActivity, setLoadingActivity] = useState(true);

  useEffect(() => {
    // Each metric loads and displays independently — no metric blocks another
    dashboardService.fetchReservasStats()
      .then(({ totalReservas, trend }) =>
        setMetrics(prev => ({ ...prev, totalReservas, trends: { ...prev.trends, totalReservas: trend } }))
      )
      .catch(() =>
        setMetrics(prev => ({ ...prev, totalReservas: 0, trends: { ...prev.trends, totalReservas: 0 } }))
      );

    dashboardService.fetchIngresosTotal()
      .then(({ ingresos, trend }) =>
        setMetrics(prev => ({ ...prev, ingresos, trends: { ...prev.trends, ingresos: trend } }))
      )
      .catch(() =>
        setMetrics(prev => ({ ...prev, ingresos: 0, trends: { ...prev.trends, ingresos: 0 } }))
      );

    dashboardService.fetchCrucerosCount()
      .then(({ cruceroActivos }) =>
        setMetrics(prev => ({ ...prev, cruceroActivos, trends: { ...prev.trends, cruceroActivos: 0 } }))
      )
      .catch(() =>
        setMetrics(prev => ({ ...prev, cruceroActivos: 0, trends: { ...prev.trends, cruceroActivos: 0 } }))
      );

    dashboardService.fetchNuevosPasajeros()
      .then(({ nuevosPasajeros, trend }) =>
        setMetrics(prev => ({ ...prev, nuevosPasajeros, trends: { ...prev.trends, nuevosPasajeros: trend } }))
      )
      .catch(() =>
        setMetrics(prev => ({ ...prev, nuevosPasajeros: 0, trends: { ...prev.trends, nuevosPasajeros: 0 } }))
      );

    dashboardService.getRecentActivity()
      .then(setActivity)
      .catch(() => setActivity([]))
      .finally(() => setLoadingActivity(false));
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <main className="no-scrollbar flex-1 overflow-y-auto bg-white relative">

        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-[#0e1a34]/5 to-transparent pointer-events-none"></div>

        <DashboardHeader />

        <div className="p-8 flex flex-col gap-8">
          <StatsGrid metrics={metrics} />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
            <RecentActivityTable activity={activity} loading={loadingActivity} />
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
