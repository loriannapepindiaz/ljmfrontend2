import React from 'react';
import { useTranslation } from 'react-i18next';
import AdminSidebar from '../../../gestionreserva/presentation/components/AdminSidebar';
import { getStoredAdminSession } from '../../../../lib/api';
import FormHeader from '../components/FormHeader';
import PersonalInfoSection from '../components/PersonalInfoSection';
import ProfessionalProfileSection from '../components/ProfessionalProfileSection';
import DocumentRepository from '../components/DocumentRepository';
import AssignmentContractSidebar from '../components/AssignmentContractSidebar';

const AgregarEmpleadoPage: React.FC = () => {
  const { t } = useTranslation();
  const session   = getStoredAdminSession();
  const adminName = session?.user.username ?? session?.user.email ?? 'Administrador';
  const adminRole = session?.user.rol ?? 'Admin';
  const initials  = adminName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f6f7f8]">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">

        <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-100 flex justify-between items-center h-16 px-8">
          <nav className="flex text-[10px] font-bold uppercase tracking-widest text-slate-500">
            <span>{t('employees.add.breadcrumb')}</span>
            <span className="mx-2">/</span>
            <span className="text-[#0e1a34]">{t('employees.add.breadcrumbSub')}</span>
          </nav>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 border-l border-slate-100 pl-6">
              <div className="text-right">
                <p className="text-[10px] font-bold uppercase tracking-tighter text-[#0e1a34]">{adminName}</p>
                <p className="text-[9px] text-slate-400 uppercase">{adminRole}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#0e1a34] border-2 border-[#eacea9]/40 flex items-center justify-center text-[#eacea9] text-[10px] font-bold">
                {initials}
              </div>
            </div>
          </div>
        </header>

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
