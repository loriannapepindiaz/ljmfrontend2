import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { AdminPasajero } from '../../data/types';

interface PasajerosTableProps {
  pasajeros: AdminPasajero[];
  loading: boolean;
  error: string | null;
  onView: (p: AdminPasajero) => void;
  onEdit: (p: AdminPasajero) => void;
}

const PAGE_SIZE = 10;

const tierStyle = (tier: string) => {
  if (tier === 'Admiral')   return 'bg-slate-100 text-slate-700';
  if (tier === 'Navegante') return 'bg-amber-50 text-amber-700';
  if (tier === 'Explorer')  return 'bg-blue-50 text-blue-700';
  if (tier === 'Commodore') return 'bg-purple-50 text-purple-700';
  return 'bg-slate-100 text-slate-500';
};

const SkeletonRow: React.FC = () => (
  <tr className="animate-pulse">
    {[1, 2, 3, 4].map(i => (
      <td key={i} className="px-6 py-4"><div className="h-4 bg-slate-100 rounded w-3/4" /></td>
    ))}
  </tr>
);

const PasajerosTable: React.FC<PasajerosTableProps> = ({
  pasajeros, loading, error, onView, onEdit,
}) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(pasajeros.length / PAGE_SIZE));
  const page       = Math.min(currentPage, totalPages);
  const paginated  = pasajeros.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const renderBody = () => {
    if (loading) return [0, 1, 2, 3].map(i => <SkeletonRow key={i} />);

    if (error) return (
      <tr>
        <td colSpan={4} className="px-6 py-16 text-center">
          <span className="material-symbols-outlined text-[40px] block mb-3 text-red-300">error</span>
          <p className="text-sm text-red-500 font-medium">{error}</p>
        </td>
      </tr>
    );

    if (paginated.length === 0) return (
      <tr>
        <td colSpan={4} className="px-6 py-16 text-center text-slate-400 text-sm">
          <span className="material-symbols-outlined text-[40px] block mb-3 text-slate-300">group</span>
          {t('passengers.table.empty')}
        </td>
      </tr>
    );

    return paginated.map(p => {
      const fullName  = [p.nombre, p.apellido].filter(Boolean).join(' ') || '—';
      const initials  = [p.nombre?.[0], p.apellido?.[0]].filter(Boolean).join('').toUpperCase() || '?';
      const lastTrip  = p.ultimo_viaje
        ? new Date(p.ultimo_viaje).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })
        : '—';
      return (
        <tr key={p.id} className={`hover:bg-slate-50 transition-colors ${!p.activo ? 'opacity-50' : ''}`}>
          {/* Detalles */}
          <td className="px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-full bg-[#0e1a34] flex items-center justify-center text-white text-xs font-bold shrink-0">
                {initials}
              </div>
              <div>
                <p className="text-sm font-bold text-[#0e1a34]">{fullName}</p>
                <p className="text-xs text-slate-400">{p.email ?? p.documento_id ?? '—'}</p>
              </div>
            </div>
          </td>

          {/* Lealtad */}
          <td className="px-6 py-4">
            <span className={`inline-flex items-center text-[11px] font-bold px-2.5 py-1 rounded-full ${tierStyle(p.loyalty_tier)}`}>
              {p.loyalty_tier}
            </span>
          </td>

          {/* Último viaje */}
          <td className="px-6 py-4 text-sm text-slate-600">{lastTrip}</td>

          {/* Acciones */}
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
            </div>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">{t('passengers.table.colDetails')}</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">{t('passengers.table.colLoyalty')}</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">{t('passengers.table.colLastTrip')}</th>
            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">{t('passengers.table.colActions')}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">{renderBody()}</tbody>
      </table>

      <div className="px-6 py-4 bg-slate-50 flex justify-between items-center border-t border-slate-200">
        <p className="text-xs text-slate-500 font-medium">
          {loading ? '...' : `${pasajeros.length} pasajero${pasajeros.length !== 1 ? 's' : ''}`}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="size-8 rounded border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-white transition-colors disabled:opacity-40"
          >
            <span className="material-symbols-outlined text-sm">chevron_left</span>
          </button>
          <button className="size-8 rounded border border-slate-200 flex items-center justify-center bg-[#eacea9] text-[#0e1a34] font-bold text-xs shadow-sm">
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
  );
};

export default PasajerosTable;
