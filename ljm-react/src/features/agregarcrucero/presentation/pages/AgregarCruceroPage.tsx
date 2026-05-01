import React from 'react';
import { useTranslation } from 'react-i18next';
import AdminSidebar from '../../../gestionreserva/presentation/components/AdminSidebar';
import BasicInfoSection from '../components/BasicInfoSection';
import TechnicalSpecsSection from '../components/TechnicalSpecsSection';
import FacilitiesSection from '../components/FacilitiesSection';
import AccommodationSection from '../components/AccommodationSection';
import SidebarPanel from '../components/SidebarPanel';
import ActionBar from '../components/ActionBar';

const AgregarCruceroPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">

        <div className="px-8 pt-6 pb-0">
          <nav className="flex text-sm font-medium text-slate-500 mb-3">
            <a href="#" className="hover:text-[#0e1a34]">{t('fleet.add.breadcrumb')}</a>
            <span className="mx-2 text-slate-400">/</span>
            <span className="text-[#0e1a34] font-bold">{t('fleet.add.breadcrumbSub')}</span>
          </nav>
          <h2 className="text-4xl font-bold text-[#0e1a34] tracking-tight">{t('fleet.add.title')}</h2>
          <p className="text-slate-500 mt-2">{t('fleet.add.subtitle')}</p>
        </div>

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
