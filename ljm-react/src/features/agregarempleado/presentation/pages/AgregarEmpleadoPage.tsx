import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../../gestionreserva/presentation/components/AdminSidebar';
import { getStoredAdminSession } from '../../../../lib/api';
import { empleadosService } from '../../../employeemanagement/data/empleadosService';
import FormHeader from '../components/FormHeader';
import PersonalInfoSection from '../components/PersonalInfoSection';
import ProfessionalProfileSection from '../components/ProfessionalProfileSection';
import DocumentRepository from '../components/DocumentRepository';
import AssignmentContractSidebar from '../components/AssignmentContractSidebar';

const AgregarEmpleadoPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const docFilesRef = useRef<File[]>([]);
  const session   = getStoredAdminSession();
  const adminName = session?.user.username ?? session?.user.email ?? 'Administrador';
  const adminRole = session?.user.rol ?? 'Admin';
  const initials  = adminName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

  const REQUIRED_LABELS: Record<string, string> = {
    nombre_completo: 'Nombre completo', fecha_nac: 'Fecha de nacimiento',
    nacionalidad: 'Nacionalidad', numero_identificacion: 'N° de identificación',
    telefono: 'Teléfono', contacto_emergencia: 'Contacto de emergencia',
    direccion: 'Dirección', barco: 'Barco', tipo_contrato: 'Tipo de contrato',
    fecha_contrato: 'Fecha de contrato', turno_rotacion: 'Turno / Rotación',
    puerto: 'Puerto', cargo: 'Cargo', departamento: 'Departamento',
    experiencia_notas: 'Experiencia / Notas',
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const fd = new FormData(event.currentTarget);
    const missing = Object.keys(REQUIRED_LABELS).filter(f => !String(fd.get(f) ?? '').trim());
    if (missing.length > 0) {
      setError(`Completa los campos requeridos: ${missing.map(f => REQUIRED_LABELS[f]).join(', ')}.`);
      event.currentTarget.querySelector<HTMLElement>('[data-error]')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const nombres = formData.getAll('certificacion_nombre').map(String);
    const entidades = formData.getAll('certificacion_entidad').map(String);
    const vencimientos = formData.getAll('certificacion_vencimiento').map(String);
    const certificaciones = nombres
      .map((nombre, index) => ({
        nombre: nombre.trim(),
        entidad_emisora: entidades[index]?.trim() ?? '',
        fecha_expiracion: vencimientos[index]?.trim() ?? '',
      }))
      .filter((certificacion) => certificacion.nombre && certificacion.fecha_expiracion);

    formData.delete('certificacion_nombre');
    formData.delete('certificacion_entidad');
    formData.delete('certificacion_vencimiento');
    formData.set('certificaciones', JSON.stringify(certificaciones));

    try {
      await empleadosService.create(formData);
      navigate('/admin/empleados');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo crear el empleado.');
    } finally {
      setSubmitting(false);
    }
  };

  const REQUIRED_FIELDS = [
    'nombre_completo', 'fecha_nac', 'nacionalidad', 'numero_identificacion',
    'telefono', 'contacto_emergencia', 'direccion', 'barco', 'tipo_contrato',
    'fecha_contrato', 'turno_rotacion', 'puerto', 'cargo', 'departamento', 'experiencia_notas',
  ];

  const calcProgress = (form: HTMLFormElement, docFiles: File[]) => {
    const formData = new FormData(form);
    const completed = REQUIRED_FIELDS.filter((f) => String(formData.get(f) ?? '').trim()).length;
    const hasPhoto = (formData.get('foto') as File | null)?.size ? 1 : 0;
    const hasDocs = docFiles.length > 0 ? 1 : 0;
    setProgress(Math.round(((completed + hasPhoto + hasDocs) / (REQUIRED_FIELDS.length + 2)) * 100));
  };

  const handleFormChange = (event: React.FormEvent<HTMLFormElement>) => {
    calcProgress(event.currentTarget, docFilesRef.current);
  };

  const handleDocFilesChange = (files: File[]) => {
    docFilesRef.current = files;
    const form = document.querySelector<HTMLFormElement>('form');
    if (form) calcProgress(form, files);
  };

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

        <form className="p-8 max-w-[1500px] mx-auto" onSubmit={handleSubmit} onInput={handleFormChange} onChange={handleFormChange}>
          <FormHeader submitting={submitting} onCancel={() => navigate('/admin/empleados')} />
          {error && (
            <div className="mb-6 rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
              {error}
            </div>
          )}
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-8 space-y-8">
              <PersonalInfoSection />
              <ProfessionalProfileSection />
              <DocumentRepository onFilesChange={handleDocFilesChange} />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <AssignmentContractSidebar progress={progress} />
            </div>
          </div>
        </form>

      </main>
    </div>
  );
};

export default AgregarEmpleadoPage;
