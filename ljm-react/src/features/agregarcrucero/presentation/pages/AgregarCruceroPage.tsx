import React from 'react';
import AdminSidebar from '../../../gestionreserva/presentation/components/AdminSidebar';
import BasicInfoSection from '../components/BasicInfoSection';
import TechnicalSpecsSection from '../components/TechnicalSpecsSection';
import FacilitiesSection from '../components/FacilitiesSection';
import AccommodationSection from '../components/AccommodationSection';
import SidebarPanel from '../components/SidebarPanel';
import ActionBar from '../components/ActionBar';

const AgregarCruceroPage: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">

        {/* Breadcrumb + Header */}
        <div className="p-8 pb-4">
          <nav className="flex text-sm font-medium text-slate-500 mb-4">
            <a href="#" className="hover:text-[#0e1a34]">Gestión de Flota</a>
            <span className="mx-2 text-slate-400">/</span>
            <span className="text-[#0e1a34] font-bold">Añadir Crucero</span>
          </nav>
          <h2 className="text-4xl font-bold text-[#0e1a34] tracking-tight">Nuevo Crucero de Lujo</h2>
          <p className="text-slate-500 mt-2">Ingrese las especificaciones y características de la nueva embarcación.</p>
        </div>

        {/* Form */}
        <div className="p-8 grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-8">
            <BasicInfoSection />
            <TechnicalSpecsSection />
            <FacilitiesSection />
            <AccommodationSection />
          </div>
          <div>
            <SidebarPanel />
          </div>
        </div>

        <ActionBar />
      </main>
    </div>
  );
};

export default AgregarCruceroPage;