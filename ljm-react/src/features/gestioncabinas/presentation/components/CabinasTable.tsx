import React, { useState } from 'react';

const CabinasTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="bg-white rounded-xl border border-[#0e1a34]/10 shadow-sm overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#0e1a34]/5 text-[#0e1a34]/60 text-xs uppercase tracking-wider font-semibold">
              <th className="px-6 py-4">Nº Cabina</th>
              <th className="px-6 py-4">Categoría</th>
              <th className="px-6 py-4">Estado</th>
              <th className="px-6 py-4">Información del Huésped</th>
              <th className="px-6 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-sm text-[#0e1a34]/80 divide-y divide-[#0e1a34]/5">
            <tr>
              <td colSpan={5} className="px-6 py-16 text-center text-slate-400 text-sm">
                <span className="material-symbols-outlined text-[40px] block mb-3 text-slate-300">bed</span>
                No hay cabinas registradas
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-[#0e1a34]/5 px-6 py-4 border-t border-[#0e1a34]/10 flex items-center justify-between">
        <p className="text-xs text-[#0e1a34]/60 font-medium">Sin cabinas registradas</p>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-1.5 bg-white border border-[#0e1a34]/10 rounded-lg text-xs font-bold text-[#0e1a34]/40 disabled:opacity-50 hover:bg-[#0e1a34]/5 transition-colors"
          >
            Anterior
          </button>
          <button className="px-4 py-1.5 bg-[#eacea9] text-[#0e1a34] rounded-lg text-xs font-bold shadow-md">
            {currentPage}
          </button>
          <button
            onClick={() => setCurrentPage(p => p + 1)}
            className="px-4 py-1.5 bg-white border border-[#0e1a34]/10 rounded-lg text-xs font-bold text-[#0e1a34] hover:bg-[#0e1a34]/5 transition-colors"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default CabinasTable;