import React from 'react';
import type { IngresoPorServicio } from '../../data/reportesService';

const SERVICES = [
  { key: 'Cruceros',      color: '#0e1a34', dot: 'bg-[#0e1a34]' },
  { key: 'Dining',        color: '#eacea9', dot: 'bg-[#eacea9]' },
  { key: 'Excursiones',   color: '#334155', dot: 'bg-slate-700'  },
  { key: 'Spa & Wellness',color: '#94a3b8', dot: 'bg-slate-400'  },
] as const;

const formatCurrency = (v: number) =>
  `$${v.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

type Props = { data: IngresoPorServicio[]; loading: boolean };

const IngresosPorServicio: React.FC<Props> = ({ data, loading }) => {
  const items = SERVICES.map((s) => {
    const found = data.find((d) => d.servicio === s.key);
    return { ...s, total: found?.total ?? 0, porcentaje: found?.porcentaje ?? 0 };
  });

  const grandTotal = items.reduce((sum, s) => sum + s.total, 0);
  const hasData = grandTotal > 0;
  const topItem = hasData ? items.reduce((a, b) => (a.porcentaje >= b.porcentaje ? a : b)) : null;

  // Build donut segments
  let offset = 25;
  const segments = items
    .filter((s) => s.porcentaje > 0)
    .map((s) => {
      const currentOffset = offset;
      offset -= s.porcentaje;
      return { ...s, offset: currentOffset };
    });

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
      <h3 className="text-lg font-bold text-[#0e1a34] mb-6">Ingresos por Servicio</h3>

      {/* Donut chart */}
      <div className="relative size-48 mx-auto mb-6 flex items-center justify-center">
        <svg className="size-full -rotate-90" viewBox="0 0 36 36">
          {/* track */}
          <circle cx="18" cy="18" fill="none" r="15.915" stroke="#f1f2f4" strokeWidth="3" />
          {loading ? (
            <circle cx="18" cy="18" fill="none" r="15.915" stroke="#e2e8f0" strokeWidth="3"
              strokeDasharray="60 40" strokeDashoffset="25" className="animate-pulse" />
          ) : hasData ? segments.map((s) => (
            <circle
              key={s.key}
              cx="18" cy="18" fill="none" r="15.915"
              stroke={s.color}
              strokeWidth="3"
              strokeDasharray={`${s.porcentaje} ${100 - s.porcentaje}`}
              strokeDashoffset={s.offset}
            />
          )) : (
            <circle cx="18" cy="18" fill="none" r="15.915" stroke="#e2e8f0" strokeWidth="3" />
          )}
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {loading ? (
            <>
              <div className="h-6 w-12 bg-slate-100 rounded animate-pulse mb-1" />
              <div className="h-3 w-8 bg-slate-100 rounded animate-pulse" />
            </>
          ) : hasData && topItem ? (
            <>
              <span className="text-2xl font-bold text-[#0e1a34]">{Math.round(topItem.porcentaje)}%</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest text-center leading-tight">
                {topItem.key === 'Cruceros' ? 'Cruceros' : topItem.key}
              </span>
            </>
          ) : (
            <span className="text-xs text-slate-400 text-center px-2">Sin datos</span>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-2.5">
        {items.map((s) => (
          <div key={s.key} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`size-2.5 rounded-full ${s.dot} shrink-0`} />
              <span className="text-xs font-medium text-[#0e1a34]/80">{s.key}</span>
            </div>
            <div className="flex items-center gap-2">
              {loading ? (
                <div className="h-3 w-10 bg-slate-100 rounded animate-pulse" />
              ) : (
                <>
                  <span className="text-xs text-slate-400">{Math.round(s.porcentaje)}%</span>
                  <span className="text-xs font-bold text-[#0e1a34]">{formatCurrency(s.total)}</span>
                </>
              )}
            </div>
          </div>
        ))}
        {!loading && hasData && (
          <div className="flex items-center justify-between border-t border-slate-100 pt-2 mt-1">
            <span className="text-xs font-bold text-slate-500">Total</span>
            <span className="text-xs font-bold text-[#0e1a34]">{formatCurrency(grandTotal)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default IngresosPorServicio;
