import React, { useState } from 'react';

const EmpleadosTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDept, setFilterDept] = useState('');

  const handleClear = () => {
    setFilterStatus('');
    setFilterDept('');
  };

  const statuses = ['Activo', 'De Licencia', 'En Entrenamiento', 'Fuera de Servicio'];
  const departments = ['Cubierta', 'Entretenimiento', 'Culinario', 'Ingeniería', 'Hospitalidad'];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">

      <div className="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-xl font-bold text-[#0e1a34]">Directorio de Empleados</h3>
        <div className="flex items-center gap-3">
          <div className="relative min-w-[300px]">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 bg-[#f6f7f8] border-none rounded-lg text-sm focus:ring-2 focus:ring-[#0e1a34]/20 outline-none"
              placeholder="Buscar nombre, rol o barco..."
            />
          </div>

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

      {/* Modal centrado */}
      {showFilter && (
        <>
          <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={() => setShowFilter(false)} />
          <div
            className="fixed z-50 bg-white rounded-2xl shadow-2xl border border-[#0e1a34]/10 p-6 w-96"
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-xl bg-[#eacea9]/30 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px] text-[#0e1a34]">filter_list</span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#0e1a34]">Filtrar empleados</h4>
                  <p className="text-[11px] text-[#0e1a34]/40">Selecciona los parámetros</p>
                </div>
              </div>
              <button
                onClick={() => setShowFilter(false)}
                className="size-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-[#0e1a34]/40 hover:text-[#0e1a34] transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Estado */}
            <div className="mb-5">
              <label className="text-[11px] font-bold text-[#0e1a34]/50 uppercase tracking-wider block mb-2">Estado</label>
              <div className="flex flex-wrap gap-2">
                {statuses.map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilterStatus(filterStatus === s ? '' : s)}
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

            {/* Departamento */}
            <div className="mb-5">
              <label className="text-[11px] font-bold text-[#0e1a34]/50 uppercase tracking-wider block mb-2">Departamento</label>
              <div className="flex flex-wrap gap-2">
                {departments.map((d) => (
                  <button
                    key={d}
                    onClick={() => setFilterDept(filterDept === d ? '' : d)}
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

            {/* Resumen activo */}
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
                Limpiar
              </button>
              <button
                onClick={() => {
                  console.log('Filtrar:', { filterStatus, filterDept });
                  setShowFilter(false);
                }}
                className="flex-1 py-3 rounded-xl bg-[#eacea9] text-[#0e1a34] text-xs font-bold hover:bg-[#d4af37] transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[16px]">check</span>
                Aplicar filtro
              </button>
            </div>
          </div>
        </>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold">
              <th className="px-6 py-4">Empleado</th>
              <th className="px-6 py-4">Departamento / Barco</th>
              <th className="px-6 py-4">Estado</th>
              <th className="px-6 py-4">Rendimiento</th>
              <th className="px-6 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td colSpan={5} className="px-6 py-16 text-center text-slate-400 text-sm">
                <span className="material-symbols-outlined text-[40px] block mb-3 text-slate-300">groups</span>
                No hay empleados registrados
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
        <p className="text-xs text-slate-500">Sin empleados registrados</p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded border border-slate-200 bg-white text-slate-400 disabled:opacity-50 hover:bg-slate-50 transition-colors"
          >
            <span className="material-symbols-outlined text-sm leading-none">chevron_left</span>
          </button>
          <button className="px-3 py-1 rounded border border-[#eacea9] bg-[#eacea9] text-[#0e1a34] text-xs font-bold">
            {currentPage}
          </button>
          <button
            onClick={() => setCurrentPage(p => p + 1)}
            className="p-1.5 rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <span className="material-symbols-outlined text-sm leading-none">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmpleadosTable;