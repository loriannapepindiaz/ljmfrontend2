import React, { useState } from 'react';

const PasajerosTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Detalles del Pasajero</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Estado de Lealtad</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Último Viaje</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          <tr>
            <td colSpan={4} className="px-6 py-16 text-center text-slate-400 text-sm">
              <span className="material-symbols-outlined text-[40px] block mb-3 text-slate-300">group</span>
              No hay pasajeros registrados
            </td>
          </tr>
        </tbody>
      </table>

      <div className="px-6 py-4 bg-slate-50 flex justify-between items-center border-t border-slate-200">
        <p className="text-xs text-slate-500 font-medium">Sin pasajeros registrados</p>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="size-8 rounded border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-white transition-colors disabled:opacity-40"
          >
            <span className="material-symbols-outlined text-sm">chevron_left</span>
          </button>

          <button className="size-8 rounded border border-slate-200 flex items-center justify-center bg-[#eacea9] text-[#0e1a34] font-bold text-xs shadow-sm">
            {currentPage}
          </button>

          <button
            onClick={() => setCurrentPage(p => p + 1)}
            className="size-8 rounded border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-white transition-colors"
          >
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasajerosTable;