import React, { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import MetricsGrid from '../components/MetricsGrid';
import ReservationFilters from '../components/ReservationFilters';
import ReservationTable from '../components/ReservationTable';
import type { Reservation } from '../components/ReservationTableFilters';

const MOCK_RESERVATIONS: Reservation[] = [];

const METRICS = [
  { label: 'Total Reservas',   value: '0'    },
  { label: 'Confirmadas',      value: '0'    },
  { label: 'Pendientes',       value: '0'    },
  { label: 'Ingresos Totales', value: 'R$ 0' },
];

const ReservationManagementPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 flex flex-col overflow-hidden bg-[#f8fafc]">
        <AdminHeader
          title="Gestión de Reservas"
          onAddClick={() => alert('Añadir reserva')}
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