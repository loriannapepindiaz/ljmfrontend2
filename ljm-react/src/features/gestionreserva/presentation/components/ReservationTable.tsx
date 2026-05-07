import React from 'react';
import { useTranslation } from 'react-i18next';
import type { AdminReserva } from '../../data/types';
import { STATUS_STYLES } from '../../data/types';

const PAGE_SIZE = 10;

interface ReservationTableProps {
  reservations: AdminReserva[];
  loading: boolean;
  error: string | null;
  onView: (r: AdminReserva) => void;
  onDelete: (r: AdminReserva) => void;
}

const SkeletonRow: React.FC = () => (
  <tr className="animate-pulse">
    {[1, 2, 3, 4, 5, 6, 7].map((i) => (
      <td key={i} className="px-8 py-5">
        <div className="h-4 bg-slate-100 rounded w-3/4" />
      </td>
    ))}
  </tr>
);

const ReservationTable: React.FC<ReservationTableProps> = ({
  reservations,
  loading,
  error,
  onView,
  onDelete,
}) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => { setCurrentPage(1); }, [reservations]);

  const totalPages = Math.max(1, Math.ceil(reservations.length / PAGE_SIZE));
  const page = Math.min(currentPage, totalPages);
  const paginated = reservations.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const columns = [
    { key: 'colId',      label: t('reservations.table.colId')      },
    { key: 'colGuest',   label: t('reservations.table.colGuest')   },
    { key: 'colShip',    label: t('reservations.table.colShip')    },
    { key: 'colCabin',   label: t('reservations.table.colCabin')   },
    { key: 'colStatus',  label: t('reservations.table.colStatus')  },
    { key: 'colTotal',   label: t('reservations.table.colTotal')   },
    { key: 'colActions', label: t('reservations.table.colActions') },
  ];

  const renderBody = () => {
    if (loading) return [0, 1, 2, 3, 4].map((i) => <SkeletonRow key={i} />);

    if (error) return (
      <tr>
        <td colSpan={7} className="px-8 py-16 text-center">
          <span className="material-symbols-outlined text-[40px] block mb-3 text-red-300">error</span>
          <p className="text-sm text-red-500 font-medium">{error}</p>
        </td>
      </tr>
    );

    if (paginated.length === 0) return (
      <tr>
        <td colSpan={7} className="px-8 py-16 text-center text-slate-400 text-sm">
          <span className="material-symbols-outlined text-[40px] block mb-3 text-slate-300">inbox</span>
          {t('reservations.table.empty')}
        </td>
      </tr>
    );

    return paginated.map((r) => (
      <tr key={r.id} className="hover:bg-slate-50/60 transition-colors">
        <td className="px-8 py-5 font-bold text-[#d4af37] text-sm">
          {r.codigo ?? `#${r.id}`}
        </td>
        <td className="px-8 py-5">
          <p className="text-sm font-semibold text-slate-700">{r.guest}</p>
          {r.guest_email && (
            <p className="text-xs text-slate-400">{r.guest_email}</p>
          )}
        </td>
        <td className="px-8 py-5 text-sm text-slate-500">{r.ship}</td>
        <td className="px-8 py-5 text-sm text-slate-500">{r.cabin}</td>
        <td className="px-8 py-5">
          <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-[11px] font-bold ${STATUS_STYLES[r.status] ?? 'bg-slate-100 text-slate-500'}`}>
            {r.status}
          </span>
        </td>
        <td className="px-8 py-5 text-sm font-bold text-[#0e1a34]">{r.total}</td>
        <td className="px-8 py-5">
          <div className="flex items-center gap-1.5">
            <button
              title="Ver"
              onClick={() => onView(r)}
              className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#0e1a34] hover:border-[#0e1a34] transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">visibility</span>
            </button>
<button
              title="Cancelar reserva"
              onClick={() => onDelete(r)}
              className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-300 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">cancel</span>
            </button>
          </div>
        </td>
      </tr>
    ));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            {columns.map((col) => (
              <th key={col.key} className="px-8 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">{renderBody()}</tbody>
      </table>

      <div className="px-8 py-5 bg-white flex items-center justify-between border-t border-slate-100">
        <p className="text-xs text-slate-400 font-medium">
          {loading ? '...' : `${reservations.length} reserva${reservations.length !== 1 ? 's' : ''}`}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="size-8 flex items-center justify-center rounded bg-slate-100 text-slate-400 hover:text-[#d4af37] transition-colors disabled:opacity-40"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
          </button>
          <button className="size-8 flex items-center justify-center rounded bg-[#eacea9] text-[#0e1a34] text-xs font-bold shadow-sm">
            {page}
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
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
