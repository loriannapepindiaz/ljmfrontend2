import React, { useState } from 'react';

const PagosTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <PagosFilters />
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">ID Pago</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Pasajero</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Viaje / Ruta</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Fecha</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Monto</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-center">Estado</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            <tr>
              <td colSpan={7} className="px-6 py-16 text-center text-slate-400 text-sm">
                <span className="material-symbols-outlined text-[40px] block mb-3 text-slate-300">payments</span>
                No hay transacciones registradas
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="p-6 border-t border-slate-100 flex items-center justify-between">
        <p className="text-sm text-slate-500 font-medium">
          Sin transacciones registradas
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors disabled:opacity-40"
          >
            <span className="material-symbols-outlined text-lg">chevron_left</span>
          </button>
          <button className="w-10 h-10 rounded-lg bg-[#eacea9] text-[#0e1a34] font-bold text-sm">
            {currentPage}
          </button>
          <button
            onClick={() => setCurrentPage(p => p + 1)}
            className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
};

import PagosFilters from './PagosFilters';

export default PagosTable;