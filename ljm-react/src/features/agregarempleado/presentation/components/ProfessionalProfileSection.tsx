import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { empleadosService, type EmpleadosCatalogos } from '../../../employeemanagement/data/empleadosService';

const inputClass = "w-full bg-slate-100/50 border-none px-4 py-2.5 rounded-lg focus:ring-1 focus:ring-[#eacea9] outline-none text-sm appearance-none";
const tableInputClass = "w-full bg-transparent border-none p-0 text-xs focus:ring-0 outline-none";
const dateInputClass = "w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-[#eacea9]";

type CertificationRow = {
  id: string;
  nombre: string;
  entidad: string;
  vencimiento: string;
};

const createCertification = (): CertificationRow => ({
  id: crypto.randomUUID(),
  nombre: '',
  entidad: '',
  vencimiento: '',
});

const ProfessionalProfileSection: React.FC = () => {
  const { t } = useTranslation();
  const [catalogos, setCatalogos] = useState<EmpleadosCatalogos>({ cargos: [], departamentos: [], puertos: [] });
  const [certifications, setCertifications] = useState<CertificationRow[]>([
    { id: crypto.randomUUID(), nombre: 'STCW II/2', entidad: 'Autoridad Maritima', vencimiento: '' },
    { id: crypto.randomUUID(), nombre: 'Formacion Basica Seguridad', entidad: 'Entidad acreditada', vencimiento: '' },
  ]);

  useEffect(() => {
    empleadosService.getCatalogos()
      .then(setCatalogos)
      .catch(() => setCatalogos({ cargos: [], departamentos: [], puertos: [] }));
  }, []);

  const updateCertification = (id: string, field: keyof Omit<CertificationRow, 'id'>, value: string) => {
    setCertifications((current) =>
      current.map((certification) =>
        certification.id === id ? { ...certification, [field]: value } : certification
      )
    );
  };

  const removeCertification = (id: string) => {
    setCertifications((current) => current.filter((certification) => certification.id !== id));
  };

  return (
    <section className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="bg-slate-50 px-8 py-4 border-b border-slate-100">
        <h2 className="text-xl font-bold text-[#0e1a34]">{t('employees.add.professional.title')}</h2>
      </div>
      <div className="p-8 space-y-8">
        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
              {t('employees.add.professional.role')}
            </label>
            <div className="relative">
              <select name="cargo" className={inputClass}>
                <option value="">Seleccionar cargo</option>
                {catalogos.cargos.map((cargo) => (
                  <option key={cargo.id} value={cargo.nombre}>{cargo.nombre}</option>
                ))}
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[18px]">expand_more</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
              {t('employees.add.professional.department')}
            </label>
            <div className="relative">
              <select name="departamento" className={inputClass}>
                <option value="">Seleccionar departamento</option>
                {catalogos.departamentos.length === 0 ? (
                  <>
                    <option value={t('employees.add.professional.deptDeck')}>{t('employees.add.professional.deptDeck')}</option>
                    <option value={t('employees.add.professional.deptEngine')}>{t('employees.add.professional.deptEngine')}</option>
                    <option value={t('employees.add.professional.deptService')}>{t('employees.add.professional.deptService')}</option>
                  </>
                ) : (
                  catalogos.departamentos.map((departamento) => (
                    <option key={departamento.id} value={departamento.nombre}>{departamento.nombre}</option>
                  ))
                )}
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[18px]">expand_more</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
            {t('employees.add.professional.certifications')}
          </label>
          <div className="overflow-x-auto border border-slate-100 rounded-lg">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-2 text-[10px] uppercase font-bold text-slate-400">
                    {t('employees.add.professional.colCert')}
                  </th>
                  <th className="px-4 py-2 text-[10px] uppercase font-bold text-slate-400">
                    {t('employees.add.professional.colIssuer')}
                  </th>
                  <th className="px-4 py-2 text-[10px] uppercase font-bold text-slate-400 w-40">
                    {t('employees.add.professional.colExpiry')}
                  </th>
                  <th className="px-4 py-2 w-16"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {certifications.map((certification) => (
                  <tr key={certification.id}>
                    <td className="px-4 py-3">
                      <input
                        name="certificacion_nombre"
                        type="text"
                        value={certification.nombre}
                        onChange={(event) => updateCertification(certification.id, 'nombre', event.target.value)}
                        placeholder="STCW II/2"
                        className={tableInputClass}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        name="certificacion_entidad"
                        type="text"
                        value={certification.entidad}
                        onChange={(event) => updateCertification(certification.id, 'entidad', event.target.value)}
                        placeholder="Autoridad Maritima"
                        className={tableInputClass}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        name="certificacion_vencimiento"
                        type="date"
                        value={certification.vencimiento}
                        onChange={(event) => updateCertification(certification.id, 'vencimiento', event.target.value)}
                        className={dateInputClass}
                      />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => removeCertification(certification.id)}
                        className="text-slate-300 hover:text-red-400 transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              type="button"
              onClick={() => setCertifications((current) => [...current, createCertification()])}
              className="w-full py-2 bg-slate-50 text-[10px] font-bold uppercase text-slate-400 hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              {t('employees.add.professional.addCert')}
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
            {t('employees.add.professional.experience')}
          </label>
          <textarea
            name="experiencia_notas"
            className="w-full bg-slate-100/50 border-none px-4 py-3 rounded-lg focus:ring-1 focus:ring-[#eacea9] outline-none text-sm h-32 resize-none"
            placeholder={t('employees.add.professional.experiencePlaceholder')}
          />
        </div>
      </div>
    </section>
  );
};

export default ProfessionalProfileSection;
