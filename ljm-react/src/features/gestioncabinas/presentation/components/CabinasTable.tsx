import React, { useState } from 'react';
import type { AsignacionCabina } from '../../data/types';

interface Props {
  asignaciones: AsignacionCabina[];
  loading: boolean;
  error: string | null;
  onView: (a: AsignacionCabina) => void;
}

const PAGE_SIZE = 10;

const formatDate = (d: string | null) => {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
};

const formatCurrency = (n: number | null) =>
  n != null ? `$${n.toLocaleString('en-US')}` : '—';

const EstadoCell: React.FC<{
  ocupacion: 'Ocupada' | 'Disponible';
  fisico: string | null;
  onView: () => void;
}> = ({ ocupacion, fisico, onView }) => {
  const isOcupada = ocupacion === 'Ocupada';
  const isMant    = fisico?.toLowerCase() === 'en_mantenimiento';

  return (
    <div className="flex items-center gap-2">
      <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full border whitespace-nowrap ${
        isOcupada
          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
          : 'bg-slate-100 text-slate-500 border-slate-200'
      }`}>
        <span className={`w-1.5 h-1.5 rounded-full ${isOcupada ? 'bg-emerald-500' : 'bg-slate-400'}`} />
        {ocupacion}
      </span>

      {isMant && (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full border bg-amber-50 text-amber-700 border-amber-200 whitespace-nowrap">
          <span className="material-symbols-outlined text-[12px]">build</span>
          Mant.
        </span>
      )}

      <button
        onClick={onView}
        className="size-7 rounded-lg border border-slate-200 inline-flex items-center justify-center text-slate-400 hover:text-[#0e1a34] hover:border-[#0e1a34] hover:bg-[#0e1a34]/5 transition-all"
        title="Ver detalles"
      >
        <span className="material-symbols-outlined text-[15px]">visibility</span>
      </button>
    </div>
  );
};

const SkeletonRow: React.FC = () => (
  <tr className="animate-pulse">
    {[1,2,3,4,5,6].map(i => (
      <td key={i} className="px-4 py-4"><div className="h-4 bg-slate-100 rounded w-3/4" /></td>
    ))}
  </tr>
);

const CabinasTable: React.FC<Props> = ({ asignaciones, loading, error, onView }) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(asignaciones.length / PAGE_SIZE));
  const p = Math.min(page, totalPages);
  const paginated = asignaciones.slice((p - 1) * PAGE_SIZE, p * PAGE_SIZE);

  const body = () => {
    if (loading) return [0,1,2,3].map(i => <SkeletonRow key={i} />);
    if (error) return (
      <tr><td colSpan={6} className="px-6 py-16 text-center">
        <span className="material-symbols-outlined text-[40px] block mb-3 text-red-300">error</span>
        <p className="text-sm text-red-500 font-medium">{error}</p>
      </td></tr>
    );
    if (paginated.length === 0) return (
      <tr><td colSpan={6} className="px-6 py-16 text-center text-slate-400 text-sm">
        <span className="material-symbols-outlined text-[40px] block mb-3 text-slate-300">bed</span>
        No hay asignaciones registradas
      </td></tr>
    );
    return paginated.map((a) => (
      <tr key={`${a.id_habitacion}`} className="hover:bg-[#0e1a34]/[0.02] transition-colors text-sm text-[#0e1a34]/80">
        <td className="px-4 py-4">
          <p className="font-bold text-[#0e1a34]">Hab. {a.numero_cabina ?? '—'}</p>
          {a.cubierta != null && <p className="text-[11px] text-slate-400">Cubierta {a.cubierta}</p>}
        </td>
        <td className="px-4 py-4">
          <p className="font-medium">{a.tipo_habitacion ?? '—'}</p>
          {a.crucero && <p className="text-[11px] text-slate-400">{a.crucero}</p>}
        </td>
        <td className="px-4 py-4">
          {a.huesped ? (
            <>
              <p className="font-medium">{a.huesped}</p>
              {a.email && <p className="text-[11px] text-slate-400 truncate max-w-[160px]">{a.email}</p>}
            </>
          ) : (
            <p className="text-slate-400 italic text-[12px]">Sin asignación</p>
          )}
        </td>
        <td className="px-4 py-4">
          {a.fecha_entrada ? (
            <>
              <p className="text-[11px] font-medium text-slate-600">{formatDate(a.fecha_entrada)}</p>
              <p className="text-[11px] text-slate-400">→ {formatDate(a.fecha_salida)}</p>
            </>
          ) : (
            <p className="text-slate-400">—</p>
          )}
        </td>
        <td className="px-4 py-4 font-bold text-[#0e1a34]">{formatCurrency(a.precio_final)}</td>
        <td className="px-4 py-4">
          <EstadoCell
            ocupacion={a.estado_ocupacion}
            fisico={a.estado_fisico}
            onView={() => onView(a)}
          />
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
              <th className="px-4 py-4">Habitación</th>
              <th className="px-4 py-4">Tipo / Crucero</th>
              <th className="px-4 py-4">Huésped</th>
              <th className="px-4 py-4">Entrada → Salida</th>
              <th className="px-4 py-4">Precio</th>
              <th className="px-4 py-4">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#0e1a34]/5">{body()}</tbody>
        </table>
      </div>

      <div className="bg-[#0e1a34]/5 px-6 py-4 border-t border-[#0e1a34]/10 flex items-center justify-between">
        <p className="text-xs text-[#0e1a34]/60 font-medium">
          {loading ? '…' : `${asignaciones.length} habitación${asignaciones.length !== 1 ? 'es' : ''}`}
        </p>
        <div className="flex gap-2">
          <button onClick={() => setPage(q => Math.max(1, q - 1))} disabled={p === 1}
            className="px-4 py-1.5 bg-white border border-[#0e1a34]/10 rounded-lg text-xs font-bold text-[#0e1a34]/40 disabled:opacity-50 hover:bg-[#0e1a34]/5 transition-colors">
            Anterior
          </button>
          <button className="px-4 py-1.5 bg-[#eacea9] text-[#0e1a34] rounded-lg text-xs font-bold shadow-md">{p}</button>
          <button onClick={() => setPage(q => Math.min(totalPages, q + 1))} disabled={p === totalPages}
            className="px-4 py-1.5 bg-white border border-[#0e1a34]/10 rounded-lg text-xs font-bold text-[#0e1a34] hover:bg-[#0e1a34]/5 transition-colors disabled:opacity-50">
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default CabinasTable;
