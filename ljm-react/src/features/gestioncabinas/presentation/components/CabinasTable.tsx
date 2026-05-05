import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { AdminCabina } from '../../data/types';

interface CabinasTableProps {
  cabinas: AdminCabina[];
  loading: boolean;
  error: string | null;
  onView: (cabina: AdminCabina) => void;
}

const PAGE_SIZE = 10;

type EstadoStyle = { pill: string; dot: string; label: string };

const estadoStyle = (estado: string | null): EstadoStyle => {
  const s = estado?.toLowerCase() ?? '';
  if (s === 'disponible') return { pill: 'bg-emerald-50 text-emerald-700', dot: 'bg-emerald-500', label: 'Disponible' };
  if (s === 'ocupada')    return { pill: 'bg-blue-50 text-blue-700',       dot: 'bg-blue-500',    label: 'Ocupada' };
  if (s === 'mantenimiento') return { pill: 'bg-amber-50 text-amber-700',  dot: 'bg-amber-400',   label: 'Mantenimiento' };
  return { pill: 'bg-slate-100 text-slate-500', dot: 'bg-slate-400', label: estado ?? '—' };
};

const StatusBadge: React.FC<{ estado: string | null }> = ({ estado }) => {
  const { pill, dot, label } = estadoStyle(estado);
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full ${pill}`}>
      <span className={`w-1.5 h-1.5 rounded-full inline-block ${dot}`} />
      {label}
    </span>
  );
};

const SkeletonRow: React.FC = () => (
  <tr className="animate-pulse">
    {[1, 2, 3, 4, 5].map(i => (
      <td key={i} className="px-6 py-4">
        <div className="h-4 bg-slate-100 rounded w-3/4" />
      </td>
    ))}
  </tr>
);

const CabinasTable: React.FC<CabinasTableProps> = ({ cabinas, loading, error, onView }) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(cabinas.length / PAGE_SIZE));
  const page = Math.min(currentPage, totalPages);
  const paginated = cabinas.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const renderBody = () => {
    if (loading) {
      return [0, 1, 2, 3].map(i => <SkeletonRow key={i} />);
    }
    if (error) {
      return (
        <tr>
          <td colSpan={5} className="px-6 py-16 text-center">
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
            <span className="material-symbols-outlined text-[40px] block mb-3 text-slate-300">bed</span>
            {t('cabins.table.empty')}
          </td>
        </tr>
      );
    }
    return paginated.map(cabina => (
      <tr key={cabina.id} className="hover:bg-[#0e1a34]/5 transition-colors text-sm text-[#0e1a34]/80">
        <td className="px-6 py-4">
          <div>
            <p className="font-bold text-[#0e1a34]">{cabina.numero_cabina ?? '—'}</p>
            {cabina.cubierta_numero != null && (
              <p className="text-[11px] text-slate-400">Cubierta {cabina.cubierta_numero}</p>
            )}
          </div>
        </td>
        <td className="px-6 py-4">
          <div>
            <p className="font-medium">{cabina.categoria ?? '—'}</p>
            {cabina.crucero_nombre && (
              <p className="text-[11px] text-slate-400">{cabina.crucero_nombre}</p>
            )}
          </div>
        </td>
        <td className="px-6 py-4">
          <StatusBadge estado={cabina.estado} />
        </td>
        <td className="px-6 py-4 text-slate-400 text-[12px]">—</td>
        <td className="px-6 py-4 text-right">
          <button
            title="Ver detalle"
            onClick={() => onView(cabina)}
            className="size-8 rounded-lg border border-slate-200 inline-flex items-center justify-center text-slate-400 hover:text-[#0e1a34] hover:border-[#0e1a34] transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">visibility</span>
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="bg-white rounded-xl border border-[#0e1a34]/10 shadow-sm overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#0e1a34]/5 text-[#0e1a34]/60 text-xs uppercase tracking-wider font-semibold">
              <th className="px-6 py-4">{t('cabins.table.colNumber')}</th>
              <th className="px-6 py-4">{t('cabins.table.colCategory')}</th>
              <th className="px-6 py-4">{t('cabins.table.colStatus')}</th>
              <th className="px-6 py-4">{t('cabins.table.colGuest')}</th>
              <th className="px-6 py-4 text-right">{t('cabins.table.colActions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#0e1a34]/5">{renderBody()}</tbody>
        </table>
      </div>

      <div className="bg-[#0e1a34]/5 px-6 py-4 border-t border-[#0e1a34]/10 flex items-center justify-between">
        <p className="text-xs text-[#0e1a34]/60 font-medium">
          {loading ? '...' : `${cabinas.length} cabina${cabinas.length !== 1 ? 's' : ''}`}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-1.5 bg-white border border-[#0e1a34]/10 rounded-lg text-xs font-bold text-[#0e1a34]/40 disabled:opacity-50 hover:bg-[#0e1a34]/5 transition-colors"
          >
            {t('cabins.table.prev')}
          </button>
          <button className="px-4 py-1.5 bg-[#eacea9] text-[#0e1a34] rounded-lg text-xs font-bold shadow-md">
            {page}
          </button>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-1.5 bg-white border border-[#0e1a34]/10 rounded-lg text-xs font-bold text-[#0e1a34] hover:bg-[#0e1a34]/5 transition-colors disabled:opacity-50"
          >
            {t('cabins.table.next')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CabinasTable;
