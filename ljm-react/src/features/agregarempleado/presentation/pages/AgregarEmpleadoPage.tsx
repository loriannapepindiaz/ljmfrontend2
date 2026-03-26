import React from 'react';
import AdminSidebar from '../../../gestionreserva/presentation/components/AdminSidebar';
import FormHeader from '../components/FormHeader';
import PersonalInfoSection from '../components/PersonalInfoSection';
import ProfessionalProfileSection from '../components/ProfessionalProfileSection';
import DocumentRepository from '../components/DocumentRepository';
import AssignmentContractSidebar from '../components/AssignmentContractSidebar';

const AgregarEmpleadoPage: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-[#f6f7f8]">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">

        {/* Top bar */}
        <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-100 flex justify-between items-center h-16 px-8">
          <nav className="flex text-[10px] font-bold uppercase tracking-widest text-slate-500">
            <span>Empleados</span>
            <span className="mx-2">/</span>
            <span className="text-[#0e1a34]">Añadir Nuevo Empleado</span>
          </nav>
          <div className="flex items-center gap-6">
            <div className="relative">
              <span className="material-symbols-outlined text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 text-sm">search</span>
              <input
                type="text"
                className="bg-slate-100 border-none text-xs rounded-full pl-10 pr-4 py-2 w-64 focus:ring-1 focus:ring-[#eacea9] outline-none"
                placeholder="Buscar en el manifiesto..."
              />
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <span className="material-symbols-outlined hover:text-[#0e1a34] cursor-pointer">notifications</span>
              <span className="material-symbols-outlined hover:text-[#0e1a34] cursor-pointer">help_outline</span>
            </div>
            <div className="flex items-center gap-3 border-l border-slate-100 pl-6">
              <div className="text-right">
                <p className="text-[10px] font-bold uppercase tracking-tighter text-[#0e1a34]">Admiral Henderson</p>
                <p className="text-[9px] text-slate-400 uppercase">Fleet Commander</p>
              </div>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCw9Qh6s9PhGxCHucuiIXuLx78cVvfQRGtcCJFstlELaLxcmIJfXfzjp4Rrht7-yeE_n-8MK8fkDotu1LbX9sih8NjnZS7VCLjZxMXZstywemsYnYqvEPV-UQcBWze5NNwRKh1ODlYDvqavBF1O1AwpKcN7_o3Sg-zz7dc7IsyoWhur6ZVd1O3NBCa3OTlGnbKaK3_QUcabqUj7qDA45WS-Esg2qvLXolQOYfxI22GtYt5zjYPPTGQNRyYJtaP_umCtl_rXEbs5GVEM"
                alt="Admiral"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-[#eacea9]/20"
              />
            </div>
          </div>
        </header>

        {/* Contenido */}
        <div className="p-8 max-w-[1500px] mx-auto">
          <FormHeader />
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-8 space-y-8">
              <PersonalInfoSection />
              <ProfessionalProfileSection />
              <DocumentRepository />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <AssignmentContractSidebar />
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default AgregarEmpleadoPage;