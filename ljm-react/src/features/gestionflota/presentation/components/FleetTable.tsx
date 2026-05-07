import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { AdminCruise } from '../../data/types';

interface FleetTableProps {
  cruises: AdminCruise[];
  loading: boolean;
  error: string | null;
  onView: (cruise: AdminCruise) => void;
  onEdit: (cruise: AdminCruise) => void;
  onDelete: (cruise: AdminCruise) => void;
  deletingId?: string | null;
}

const PAGE_SIZE = 10;

const StatusBadge: React.FC<{ activo: boolean }> = ({ activo }) =>
  activo ? (
    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
      Activo
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-500">
      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 inline-block" />
      Inactivo
    </span>
  );

const SkeletonRow: React.FC = () => (
  <tr className="animate-pulse">
    {[1, 2, 3, 4, 5].map(i => (
      <td key={i} className="px-6 py-4">
        <div className="h-4 bg-slate-100 rounded w-3/4" />
      </td>
    ))}
  </tr>
);

const FleetTable: React.FC<FleetTableProps> = ({
  cruises, loading, error, onView, onEdit, onDelete, deletingId,
}) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(cruises.length / PAGE_SIZE));
  const page = Math.min(currentPage, totalPages);
  const paginated = cruises.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const renderBody = () => {
    if (loading) {
      return [0, 1, 2, 3].map(i => <SkeletonRow key={i} />);
    }
    if (error) {
      return (
        <tr>
          <td colSpan={5} className="px-6 py-12 text-center">
            <span className="material-symbols-outlined text-[40px] block mb-3 text-red-300">error</span>
            <p className="text-sm text-red-500 font-medium">{error}</p>
          </td>
        </tr>
      );
    }
    if (paginated.length === 0) {
      return (
        <tr>
          <td colSpan={5} className="px-6 py-16 text-center text-slate-400 text-sm">
            <span className="material-symbols-outlined text-[40px] block mb-3 text-slate-300">inbox</span>
            {t('fleet.table.empty')}
          </td>
        </tr>
      );
    }
    return paginated.map(cruise => {
      const isDeleting = deletingId === cruise.id;
      return (
        <tr key={cruise.id} className="hover:bg-slate-50 transition-colors">
          <td className="px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-100 overflow-hidden shrink-0 flex items-center justify-center">
                {cruise.imageSrc ? (
                  <img src={cruise.imageSrc} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="material-symbols-outlined text-[16px] text-slate-400">directions_boat</span>
                )}
              </div>
              <div>
                <p className="text-sm font-bold text-[#0e1a34]">{cruise.nombre}</p>
                {cruise.badge && <p className="text-[11px] text-slate-400">{cruise.badge}</p>}
              </div>
            </div>
          </td>
          <td className="px-6 py-4">
            <StatusBadge activo={cruise.activo} />
          </td>
          <td className="px-6 py-4 text-sm text-slate-600">
            {cruise.guests != null ? `${cruise.guests} pax` : '—'}
          </td>
          <td className="px-6 py-4 text-sm text-slate-400">—</td>
          <td className="px-6 py-4 text-right">
            <div className="flex items-center justify-end gap-1.5">
              <button
                title="Ver detalle"
                onClick={() => onView(cruise)}
                className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#0e1a34] hover:border-[#0e1a34] transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">visibility</span>
              </button>
              <button
                title="Editar"
                onClick={() => onEdit(cruise)}
                className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#eacea9] hover:border-[#eacea9] transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">edit</span>
              </button>
              <button
                title="Desactivar"
                onClick={() => onDelete(cruise)}
                disabled={isDeleting}
                className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {isDeleting ? 'hourglass_empty' : 'delete'}
                </span>
              </button>
            </div>
          </td>
        </tr>
      );
    });
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-[#0e1a34]">{t('fleet.table.title')}</h3>
        <button className="text-slate-500 text-sm font-medium hover:text-[#0e1a34] flex items-center gap-1 transition-colors">
          {t('fleet.table.viewAll')}
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">{t('fleet.table.colName')}</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">{t('fleet.table.colStatus')}</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">{t('fleet.table.colCapacity')}</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">{t('fleet.table.colInspection')}</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">{t('fleet.table.colActions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">{renderBody()}</tbody>
        </table>

        <div className="px-6 py-4 bg-slate-50 flex items-center justify-between border-t border-slate-200">
          <p className="text-xs text-slate-400 font-medium">
            {loading ? '...' : `${cruises.length} crucero${cruises.length !== 1 ? 's' : ''}`}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="size-8 rounded border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-white transition-colors disabled:opacity-40"
            >
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <button className="size-8 rounded border border-slate-200 flex items-center justify-center text-[#0e1a34] bg-white shadow-sm font-bold text-xs">
              {page}
            </button>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="size-8 rounded border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-white transition-colors disabled:opacity-40"
            >
              <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FleetTable;
