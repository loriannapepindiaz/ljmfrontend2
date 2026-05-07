import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PagosFilters from './PagosFilters';
import type { AdminPago, PagoFilterKey } from '../../data/types';
import { PAGO_STATUS_STYLES } from '../../data/types';

const PAGE_SIZE = 10;

interface PagosTableProps {
  pagos: AdminPago[];
  loading: boolean;
  error: string | null;
  search: string;
  activeFilter: PagoFilterKey;
  last30: boolean;
  onSearch: (q: string) => void;
  onFilterChange: (f: PagoFilterKey) => void;
  onLast30Change: (v: boolean) => void;
  onView: (p: AdminPago) => void;
  onEdit: (p: AdminPago) => void;
  onDelete: (p: AdminPago) => void;
}

const SkeletonRow: React.FC = () => (
  <tr className="animate-pulse">
    {[1, 2, 3, 4, 5, 6, 7].map((i) => (
      <td key={i} className="px-6 py-4">
        <div className="h-4 bg-slate-100 rounded w-3/4" />
      </td>
    ))}
  </tr>
);

const PagosTable: React.FC<PagosTableProps> = ({
  pagos, loading, error,
  search, activeFilter, last30,
  onSearch, onFilterChange, onLast30Change,
  onView, onEdit, onDelete,
}) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);

  React.useEffect(() => { setCurrentPage(1); }, [pagos]);

  const totalPages = Math.max(1, Math.ceil(pagos.length / PAGE_SIZE));
  const page = Math.min(currentPage, totalPages);
  const paginated = pagos.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const renderBody = () => {
    if (loading) return [0, 1, 2, 3, 4].map((i) => <SkeletonRow key={i} />);

    if (error) return (
      <tr>
        <td colSpan={7} className="px-6 py-16 text-center">
          <span className="material-symbols-outlined text-[40px] block mb-3 text-red-300">error</span>
          <p className="text-sm text-red-500 font-medium">{error}</p>
        </td>
      </tr>
    );

    if (paginated.length === 0) return (
      <tr>
        <td colSpan={7} className="px-6 py-16 text-center text-slate-400 text-sm">
          <span className="material-symbols-outlined text-[40px] block mb-3 text-slate-300">payments</span>
          {t('payments.table.empty')}
        </td>
      </tr>
    );

    return paginated.map((p) => {
      const fecha = p.fecha_pago
        ? new Date(p.fecha_pago).toLocaleDateString('es-ES', {
            year: 'numeric', month: 'short', day: 'numeric',
          })
        : '—';

      return (
        <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
          <td className="px-6 py-4 font-bold text-[#d4af37] text-sm">
            {p.referencia ?? `#${p.id}`}
          </td>
          <td className="px-6 py-4">
            <p className="text-sm font-semibold text-slate-700">{p.pasajero}</p>
            {p.pasajero_email && (
              <p className="text-xs text-slate-400">{p.pasajero_email}</p>
            )}
          </td>
          <td className="px-6 py-4 text-sm text-slate-500">{p.ruta}</td>
          <td className="px-6 py-4 text-sm text-slate-500">{fecha}</td>
          <td className="px-6 py-4 text-sm font-bold text-[#0e1a34] text-right">
            {p.monto_formatted}
          </td>
          <td className="px-6 py-4 text-center">
            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-[11px] font-bold ${PAGO_STATUS_STYLES[p.estado] ?? 'bg-slate-100 text-slate-500'}`}>
              {p.estado}
            </span>
          </td>
          <td className="px-6 py-4">
            <div className="flex items-center gap-1.5">
              <button
                title="Ver"
                onClick={() => onView(p)}
                className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#0e1a34] hover:border-[#0e1a34] transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">visibility</span>
              </button>
              <button
                title="Editar"
                onClick={() => onEdit(p)}
                className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#eacea9] hover:border-[#eacea9] transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">edit</span>
              </button>
              <button
                title="Eliminar"
                onClick={() => onDelete(p)}
                className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-300 transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">delete</span>
              </button>
            </div>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <PagosFilters
        activeFilter={activeFilter}
        search={search}
        last30={last30}
        onFilterChange={onFilterChange}
        onSearch={onSearch}
        onLast30Change={onLast30Change}
      />
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">{t('payments.table.colId')}</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">{t('payments.table.colPassenger')}</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">{t('payments.table.colRoute')}</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">{t('payments.table.colDate')}</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">{t('payments.table.colAmount')}</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-center">{t('payments.table.colStatus')}</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">{t('payments.table.colActions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">{renderBody()}</tbody>
        </table>
      </div>

      <div className="p-6 border-t border-slate-100 flex items-center justify-between">
        <p className="text-sm text-slate-500 font-medium">
          {loading ? '...' : `${pagos.length} pago${pagos.length !== 1 ? 's' : ''}`}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors disabled:opacity-40"
          >
            <span className="material-symbols-outlined text-lg">chevron_left</span>
          </button>
          <button className="w-10 h-10 rounded-lg bg-[#eacea9] text-[#0e1a34] font-bold text-sm">
            {page}
          </button>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors disabled:opacity-40"
          >
            <span className="material-symbols-outlined text-lg">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PagosTable;
