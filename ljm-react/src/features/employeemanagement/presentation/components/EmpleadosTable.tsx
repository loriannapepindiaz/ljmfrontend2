import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { EmpleadoDashboard } from '../../data/empleadosService';
import { getBackendMediaUrl } from '../../../../lib/api';

const EmployeeAvatar: React.FC<{ fotoUrl: string | null; nombre: string }> = ({ fotoUrl, nombre }) => {
  const [error, setError] = useState(false);
  const src = getBackendMediaUrl(fotoUrl);
  const showPhoto = src && !error;
  const initials = nombre.split(' ').filter(Boolean).map(w => w[0]).join('').toUpperCase().slice(0, 2);
  return (
    <div className={`size-10 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center font-bold text-xs ${
      showPhoto ? '' : 'bg-[#0e1a34] text-[#eacea9]'
    }`}>
      {showPhoto ? (
        <img src={src} alt="" className="size-full object-cover" onError={() => setError(true)} />
      ) : initials}
    </div>
  );
};

type EmpleadosTableProps = {
  empleados: EmpleadoDashboard[];
  loading: boolean;
  onRefresh: () => void;
  onView: (empleado: EmpleadoDashboard) => void;
  onEdit: (empleado: EmpleadoDashboard) => void;
};

const PAGE_SIZE = 8;

const statusClassName = (estado: string) => {
  if (estado === 'activo' || estado === 'activa') return 'bg-emerald-50 text-emerald-700 border-emerald-100';
  if (estado === 'licencia' || estado === 'de licencia' || estado === 'permiso') {
    return 'bg-amber-50 text-amber-700 border-amber-100';
  }
  return 'bg-slate-100 text-slate-600 border-slate-200';
};

const EmpleadosTable: React.FC<EmpleadosTableProps> = ({ empleados, loading, onRefresh, onView, onEdit }) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDept, setFilterDept] = useState('');

  const handleClear = () => {
    setFilterStatus('');
    setFilterDept('');
    setCurrentPage(1);
  };

  const filteredEmpleados = empleados.filter((empleado) => {
    const matchesStatus = !filterStatus || empleado.estado_label.toLowerCase() === filterStatus.toLowerCase();
    const matchesDept = !filterDept || empleado.departamento === filterDept || empleado.puerto === filterDept;
    return matchesStatus && matchesDept;
  });

  const totalPages = Math.max(1, Math.ceil(filteredEmpleados.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const visibleEmpleados = filteredEmpleados.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const showLoading = loading && empleados.length === 0;

  const statuses = [
    t('employees.table.statusActive'),
    t('employees.table.statusOnLeave'),
    t('employees.table.statusTraining'),
    t('employees.table.statusOffDuty'),
  ];

  const departments = [
    t('employees.table.deptDeck'),
    t('employees.table.deptEntertainment'),
    t('employees.table.deptCulinary'),
    t('employees.table.deptEngineering'),
    t('employees.table.deptHospitality'),
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">

      <div className="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-xl font-bold text-[#0e1a34]">{t('employees.table.title')}</h3>
        <div className="flex items-center gap-3">
          <button
            onClick={onRefresh}
            className="p-2 rounded-lg bg-[#f6f7f8] text-slate-600 hover:bg-slate-100 transition-colors"
            title="Actualizar"
          >
            <span className="material-symbols-outlined text-xl">refresh</span>
          </button>
          <button
            onClick={() => setShowFilter(true)}
            className={`p-2 rounded-lg transition-colors ${
              filterStatus || filterDept
                ? 'bg-[#eacea9] text-[#0e1a34]'
                : 'bg-[#f6f7f8] text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span className="material-symbols-outlined text-xl">filter_list</span>
          </button>
        </div>
      </div>

      {/* Filter modal */}
      {showFilter && (
        <>
          <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={() => setShowFilter(false)} />
          <div
            className="fixed z-50 bg-white rounded-2xl shadow-2xl border border-[#0e1a34]/10 p-6 w-96"
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-xl bg-[#eacea9]/30 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px] text-[#0e1a34]">filter_list</span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#0e1a34]">{t('employees.table.filterTitle')}</h4>
                  <p className="text-[11px] text-[#0e1a34]/40">{t('employees.table.filterParams')}</p>
                </div>
              </div>
              <button
                onClick={() => setShowFilter(false)}
                className="size-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-[#0e1a34]/40 hover:text-[#0e1a34] transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="mb-5">
              <label className="text-[11px] font-bold text-[#0e1a34]/50 uppercase tracking-wider block mb-2">{t('employees.table.statusLabel')}</label>
              <div className="flex flex-wrap gap-2">
                {statuses.map((s) => (
                  <button
                    key={s}
                    onClick={() => { setFilterStatus(filterStatus === s ? '' : s); setCurrentPage(1); }}
                    className={`text-xs px-3 py-1.5 rounded-full font-bold transition-all border ${
                      filterStatus === s
                        ? 'bg-[#eacea9] text-[#0e1a34] border-[#eacea9]'
                        : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-[#eacea9]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <label className="text-[11px] font-bold text-[#0e1a34]/50 uppercase tracking-wider block mb-2">{t('employees.table.departmentLabel')}</label>
              <div className="flex flex-wrap gap-2">
                {departments.map((d) => (
                  <button
                    key={d}
                    onClick={() => { setFilterDept(filterDept === d ? '' : d); setCurrentPage(1); }}
                    className={`text-xs px-3 py-1.5 rounded-full font-bold transition-all border ${
                      filterDept === d
                        ? 'bg-[#eacea9] text-[#0e1a34] border-[#eacea9]'
                        : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-[#eacea9]'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {(filterStatus || filterDept) && (
              <div className="mb-4 px-3 py-2 bg-[#eacea9]/20 rounded-lg flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-[#0e1a34]/60">filter_alt</span>
                <p className="text-xs text-[#0e1a34]/60 font-medium">
                  {[filterStatus, filterDept].filter(Boolean).join(' · ')}
                </p>
              </div>
            )}

            <div className="border-t border-slate-100 pt-4 flex gap-3">
              <button
                onClick={handleClear}
                className="flex-1 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-500 hover:bg-slate-50 transition-all"
              >
                {t('employees.table.clear')}
              </button>
              <button
                onClick={() => setShowFilter(false)}
                className="flex-1 py-3 rounded-xl bg-[#eacea9] text-[#0e1a34] text-xs font-bold hover:bg-[#d4b896] transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[16px]">check</span>
                {t('employees.table.applyFilter')}
              </button>
            </div>
          </div>
        </>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold">
              <th className="px-6 py-4">{t('employees.table.colEmployee')}</th>
              <th className="px-6 py-4">{t('employees.table.colDepartment')}</th>
              <th className="px-6 py-4">{t('employees.table.colStatus')}</th>
              <th className="px-6 py-4 text-right">{t('employees.table.colActions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {showLoading ? (
              <tr>
                <td colSpan={4} className="px-6 py-16 text-center text-slate-400 text-sm">
                  <span className="material-symbols-outlined text-[40px] block mb-3 text-slate-300">hourglass_empty</span>
                  Cargando empleados...
                </td>
              </tr>
            ) : visibleEmpleados.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-16 text-center text-slate-400 text-sm">
                  <span className="material-symbols-outlined text-[40px] block mb-3 text-slate-300">groups</span>
                  {t('employees.table.empty')}
                </td>
              </tr>
            ) : (
              visibleEmpleados.map((empleado) => (
                <tr key={empleado.id} className="text-sm text-[#0e1a34] hover:bg-slate-50/60 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <EmployeeAvatar fotoUrl={empleado.foto_url} nombre={empleado.nombre_completo} />
                      <div>
                        <p className="font-bold">{empleado.nombre_completo}</p>
                        <p className="text-xs text-slate-400">{empleado.cargo ?? empleado.email ?? 'Sin cargo'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{empleado.departamento_barco}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-bold ${statusClassName(empleado.estado)}`}>
                      {empleado.estado_label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => onView(empleado)}
                        className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-500 hover:bg-slate-100 hover:text-[#0e1a34] transition-colors"
                        title="Ver detalles"
                      >
                        <span className="material-symbols-outlined text-[16px]">visibility</span>
                        Ver
                      </button>
                      <button
                        onClick={() => onEdit(empleado)}
                        className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold text-[#0e1a34] bg-[#eacea9]/20 hover:bg-[#eacea9] transition-colors"
                        title="Editar empleado"
                      >
                        <span className="material-symbols-outlined text-[16px]">edit</span>
                        Editar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
        <p className="text-xs text-slate-500">
          {loading
            ? 'Cargando...'
            : filteredEmpleados.length > 0
              ? `${filteredEmpleados.length} empleado${filteredEmpleados.length === 1 ? '' : 's'} registrado${filteredEmpleados.length === 1 ? '' : 's'}`
              : t('employees.table.empty')}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            className="p-1.5 rounded border border-slate-200 bg-white text-slate-400 disabled:opacity-50 hover:bg-slate-50 transition-colors"
          >
            <span className="material-symbols-outlined text-sm leading-none">chevron_left</span>
          </button>
          <button className="px-3 py-1 rounded border border-[#eacea9] bg-[#eacea9] text-[#0e1a34] text-xs font-bold">
            {safePage}
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            className="p-1.5 rounded border border-slate-200 bg-white text-slate-600 disabled:opacity-50 hover:bg-slate-50 transition-colors"
          >
            <span className="material-symbols-outlined text-sm leading-none">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmpleadosTable;
