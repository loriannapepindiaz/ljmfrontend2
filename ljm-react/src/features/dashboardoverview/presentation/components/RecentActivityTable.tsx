import React, { useState } from 'react';

const RecentActivityTable: React.FC = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [filterDay, setFilterDay] = useState('');
  const [filterMonth, setFilterMonth] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [view, setView] = useState<'main' | 'month' | 'year'>('main');

  const handleClear = () => {
    setFilterDay('');
    setFilterMonth('');
    setFilterYear('');
  };

  const months = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic',
  ];

  const monthsFull = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
  ];

  const years = ['2025', '2026', '2027', '2028', '2029', '2030'];

  return (
    <div className="xl:col-span-2 bg-white border border-[#0e1a34]/10 rounded-xl shadow-sm flex flex-col">

      <div className="p-6 border-b border-[#0e1a34]/10 flex items-center justify-between">
        <h3 className="text-lg font-bold text-[#0e1a34]">Actividad Reciente</h3>
        <button
          onClick={() => { setShowFilter(!showFilter); setView('main'); }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all border ${
            showFilter
              ? 'bg-[#eacea9] text-[#0e1a34] border-[#eacea9]'
              : 'bg-white text-[#0e1a34]/60 border-[#0e1a34]/10 hover:border-[#eacea9] hover:text-[#0e1a34]'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">tune</span>
          Filtrar
        </button>
      </div>

      {/* Modal */}
      {showFilter && (
        <>
          <div className="fixed inset-0 z-40 bg-black/25 backdrop-blur-sm" onClick={() => setShowFilter(false)} />
          <div
            className="fixed z-50 bg-white rounded-2xl shadow-2xl border border-[#0e1a34]/10 w-96"
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-xl bg-[#eacea9]/30 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px] text-[#0e1a34]">calendar_month</span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#0e1a34]">Filtrar por fecha</h4>
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

            {/* Vista principal */}
            {view === 'main' && (
              <div className="p-5 flex flex-col gap-4">

                {/* Día */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-[#0e1a34]/50 uppercase tracking-wider">Día</label>
                  <input
                    type="number"
                    min={1}
                    max={31}
                    value={filterDay}
                    onChange={(e) => setFilterDay(e.target.value)}
                    placeholder="Ej: 15"
                    className="w-full border border-[#0e1a34]/10 rounded-xl px-4 py-3 text-sm text-[#0e1a34] placeholder-[#0e1a34]/30 focus:ring-2 focus:ring-[#eacea9]/50 outline-none bg-slate-50/50"
                  />
                </div>

                {/* Mes */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-[#0e1a34]/50 uppercase tracking-wider">Mes</label>
                  <button
                    onClick={() => setView('month')}
                    className="w-full border border-[#0e1a34]/10 rounded-xl px-4 py-3 text-sm text-left flex items-center justify-between bg-slate-50/50 hover:border-[#eacea9] transition-all"
                  >
                    <span className={filterMonth ? 'text-[#0e1a34] font-medium' : 'text-[#0e1a34]/30'}>
                      {filterMonth ? monthsFull[parseInt(filterMonth) - 1] : 'Seleccionar mes'}
                    </span>
                    <span className="material-symbols-outlined text-[18px] text-[#0e1a34]/40">chevron_right</span>
                  </button>
                </div>

                {/* Año */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold text-[#0e1a34]/50 uppercase tracking-wider">Año</label>
                  <button
                    onClick={() => setView('year')}
                    className="w-full border border-[#0e1a34]/10 rounded-xl px-4 py-3 text-sm text-left flex items-center justify-between bg-slate-50/50 hover:border-[#eacea9] transition-all"
                  >
                    <span className={filterYear ? 'text-[#0e1a34] font-medium' : 'text-[#0e1a34]/30'}>
                      {filterYear || 'Seleccionar año'}
                    </span>
                    <span className="material-symbols-outlined text-[18px] text-[#0e1a34]/40">chevron_right</span>
                  </button>
                </div>

                {/* Resumen activo */}
                {(filterDay || filterMonth || filterYear) && (
                  <div className="px-3 py-2 bg-[#eacea9]/20 rounded-lg flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#0e1a34]/60">filter_alt</span>
                    <p className="text-xs text-[#0e1a34]/60 font-medium">
                      {[filterDay && `Día ${filterDay}`, filterMonth && monthsFull[parseInt(filterMonth) - 1], filterYear].filter(Boolean).join(' · ')}
                    </p>
                  </div>
                )}

                <div className="border-t border-slate-100 pt-4 flex gap-3">
                  <button
                    onClick={handleClear}
                    className="flex-1 py-3 rounded-xl border border-[#0e1a34]/10 text-xs font-bold text-[#0e1a34]/60 hover:bg-slate-50 transition-all"
                  >
                    Limpiar
                  </button>
                  <button
                    onClick={() => { console.log({ filterDay, filterMonth, filterYear }); setShowFilter(false); }}
                    className="flex-1 py-3 rounded-xl bg-[#eacea9] text-[#0e1a34] text-xs font-bold hover:bg-[#d4af37] transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px]">check</span>
                    Aplicar filtro
                  </button>
                </div>
              </div>
            )}

            {/* Vista meses */}
            {view === 'month' && (
              <div className="p-5">
                <button
                  onClick={() => setView('main')}
                  className="flex items-center gap-2 text-sm font-bold text-[#0e1a34]/60 hover:text-[#0e1a34] mb-4 transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                  Selecciona un mes
                </button>
                <div className="grid grid-cols-3 gap-2">
                  {months.map((m, i) => (
                    <button
                      key={m}
                      onClick={() => { setFilterMonth(String(i + 1)); setView('main'); }}
                      className={`py-3 rounded-xl text-sm font-bold transition-all border ${
                        filterMonth === String(i + 1)
                          ? 'bg-[#eacea9] text-[#0e1a34] border-[#eacea9] shadow-sm'
                          : 'bg-slate-50 text-[#0e1a34]/70 border-slate-100 hover:border-[#eacea9] hover:text-[#0e1a34]'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => { setFilterMonth(''); setView('main'); }}
                  className="mt-4 w-full py-2.5 rounded-xl border border-[#0e1a34]/10 text-xs font-bold text-[#0e1a34]/50 hover:bg-slate-50 transition-all"
                >
                  Todos los meses
                </button>
              </div>
            )}

            {/* Vista años */}
            {view === 'year' && (
              <div className="p-5">
                <button
                  onClick={() => setView('main')}
                  className="flex items-center gap-2 text-sm font-bold text-[#0e1a34]/60 hover:text-[#0e1a34] mb-4 transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                  Selecciona un año
                </button>
                <div className="grid grid-cols-3 gap-2">
                  {years.map((y) => (
                    <button
                      key={y}
                      onClick={() => { setFilterYear(y); setView('main'); }}
                      className={`py-3 rounded-xl text-sm font-bold transition-all border ${
                        filterYear === y
                          ? 'bg-[#eacea9] text-[#0e1a34] border-[#eacea9] shadow-sm'
                          : 'bg-slate-50 text-[#0e1a34]/70 border-slate-100 hover:border-[#eacea9] hover:text-[#0e1a34]'
                      }`}
                    >
                      {y}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => { setFilterYear(''); setView('main'); }}
                  className="mt-4 w-full py-2.5 rounded-xl border border-[#0e1a34]/10 text-xs font-bold text-[#0e1a34]/50 hover:bg-slate-50 transition-all"
                >
                  Todos los años
                </button>
              </div>
            )}
          </div>
        </>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#0e1a34]/5 text-[#0e1a34]/60 text-xs uppercase tracking-wider font-semibold">
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Pasajero</th>
              <th className="px-6 py-4">Crucero</th>
              <th className="px-6 py-4">Estado</th>
              <th className="px-6 py-4">Monto</th>
            </tr>
          </thead>
          <tbody className="text-sm text-[#0e1a34]/80 divide-y divide-[#0e1a34]/5">
            <tr>
              <td colSpan={5} className="px-6 py-16 text-center text-slate-400 text-sm">
                <span className="material-symbols-outlined text-[40px] block mb-3 text-slate-300">inbox</span>
                No hay actividad reciente
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="p-6 bg-white border-t border-[#0e1a34]/10 flex justify-center">
        <button className="bg-[#0e1a34] text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-[#1a2a4a] transition-all shadow-md flex items-center gap-2">
          Ver toda la actividad
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default RecentActivityTable;