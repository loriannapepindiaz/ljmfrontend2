import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import MetricsGrid from '../components/MetricsGrid';
import ReservationFilters from '../components/ReservationFilters';
import ReservationTable from '../components/ReservationTable';
import type { Reservation } from '../components/ReservationTableFilters';

const MOCK_RESERVATIONS: Reservation[] = [];

const ReservationManagementPage: React.FC = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);

  const METRICS = [
    { label: t('reservations.metrics.total'),       value: '0',    icon: 'calendar_month',  trend: '0%', trendUp: true,  trendText: t('reservations.metrics.vsLastMonth') },
    { label: t('reservations.metrics.confirmed'),   value: '0',    icon: 'check_circle',    trend: '0%', trendUp: true,  trendText: '0%' },
    { label: t('reservations.metrics.pending'),     value: '0',    icon: 'hourglass_empty', trend: '0%', trendUp: false, trendText: '0%' },
    { label: t('reservations.metrics.totalIncome'), value: 'R$ 0', icon: 'attach_money',    trend: '0%', trendUp: true,  trendText: '0%' },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 flex flex-col overflow-hidden bg-[#f8fafc]">
        <AdminHeader
          title={t('reservations.title')}
          subtitle="Supervise el estado de las reservas, filtre resultados y gestione cada solicitud desde un solo panel."
        />
        <div className="flex-1 overflow-auto p-8">
          <MetricsGrid metrics={METRICS} />
          <ReservationFilters
            onFilterChange={(f) => console.log('Filtro:', f)}
            onSearch={(q) => console.log('Búsqueda:', q)}
          />
          <ReservationTable
            reservations={MOCK_RESERVATIONS}
            totalCount={0}
            currentPage={currentPage}
            totalPages={1}
            onPageChange={setCurrentPage}
            onActionClick={(id) => console.log('Acción:', id)}
          />
        </div>
      </main>
    </div>
  );
};

export default ReservationManagementPage;
