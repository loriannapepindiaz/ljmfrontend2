import React from 'react';
import AdminSidebar from '../../../gestionreserva/presentation/components/AdminSidebar';
import PasajerosHeader from '../components/PasajerosHeader';
import PasajerosMetrics from '../components/PasajerosMetrics';
import PasajerosFilters from '../components/PasajerosFilters';
import PasajerosTable from '../components/PasajerosTable';

const PasajerosPage: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar activeItem="Pasajeros" />
      <main className="flex-1 flex flex-col overflow-hidden bg-[#f6f7f8]">
        <PasajerosHeader onAddClick={() => alert('Añadir pasajero')} />
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          <PasajerosMetrics />
          <PasajerosFilters
            onFilterChange={(f) => console.log('Filtro:', f)}
            onSearch={(q) => console.log('Búsqueda:', q)}
          />
          <PasajerosTable />
        </div>
      </main>
    </div>
  );
};

export default PasajerosPage;