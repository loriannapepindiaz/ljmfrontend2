import React from 'react';
import type { Reservation } from './ReservationTableFilters';
import { statusStyles } from './ReservationTableFilters';

interface ReservationTableProps {
  reservations: Reservation[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onActionClick?: (id: string) => void;
}

const ReservationTable: React.FC<ReservationTableProps> = ({
  reservations,
  totalCount,
  currentPage,
  totalPages,
  onPageChange,
  onActionClick,
}) => {
  const columns = ['ID Reserva', 'Huésped', 'Barco', 'Cabina', 'Estado', 'Total', 'Acciones'];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            {columns.map((col) => (
              <th
                key={col}
                className={`px-8 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest ${col === 'Acciones' ? 'text-center' : ''}`}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {reservations.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-8 py-16 text-center text-slate-400 text-sm">
                <span className="material-symbols-outlined text-[40px] block mb-3 text-slate-300">
                  inbox
                </span>
                No hay reservas registradas
              </td>
            </tr>
          ) : (
            reservations.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="px-8 py-5 font-bold text-[#d4af37]">{r.id}</td>
                <td className="px-8 py-5 text-sm font-semibold text-slate-700">{r.guest}</td>
                <td className="px-8 py-5 text-sm text-slate-500">{r.ship}</td>
                <td className="px-8 py-5 text-sm text-slate-500">{r.cabin}</td>
                <td className="px-8 py-5">
                  <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-bold ${statusStyles[r.status]}`}>
                    {r.status}
                  </span>
                </td>
                <td className="px-8 py-5 text-sm font-bold text-[#0e1a34]">{r.total}</td>
                <td className="px-8 py-5 text-center">
                  <button
                    onClick={() => onActionClick?.(r.id)}
                    className="text-slate-300 hover:text-[#d4af37] transition-colors"
                  >
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="px-8 py-5 bg-white flex items-center justify-between border-t border-slate-100">
        <p className="text-xs text-slate-400 font-medium">
          {totalCount === 0
            ? 'Sin reservas registradas'
            : `Mostrando ${(currentPage - 1) * 5 + 1} a ${Math.min(currentPage * 5, totalCount)} de ${totalCount.toLocaleString('es-ES')} reservas`
          }
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="size-8 flex items-center justify-center rounded bg-slate-100 text-slate-400 hover:text-[#d4af37] transition-colors disabled:opacity-40"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
          </button>

          {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1).map((p) => {
            const activeBtn = 'size-8 flex items-center justify-center rounded bg-[#eacea9] text-[#0e1a34] text-xs font-bold';
            const inactiveBtn = 'size-8 flex items-center justify-center rounded hover:bg-slate-100 text-slate-400 text-xs font-bold transition-colors';
            return (
              <button key={p} onClick={() => onPageChange(p)} className={p === currentPage ? activeBtn : inactiveBtn}>
                {p}
              </button>
            );
          })}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="size-8 flex items-center justify-center rounded bg-slate-100 text-slate-400 hover:text-[#d4af37] transition-colors disabled:opacity-40"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationTable;