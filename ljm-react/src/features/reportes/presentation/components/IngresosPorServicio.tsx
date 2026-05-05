import React from 'react';
import { useTranslation } from 'react-i18next';
import type { IngresoPorServicio } from '../../data/reportesService';

const SERVICE_KEYS = [
  { key: 'cruises', service: 'Cruceros', color: 'bg-[#0e1a34]', stroke: '#0e1a34' },
  { key: 'dining', service: 'Dining', color: 'bg-[#eacea9]', stroke: '#eacea9' },
  { key: 'excursions', service: 'Excursiones', color: 'bg-slate-700', stroke: '#334155' },
  { key: 'spa', service: 'Spa & Wellness', color: 'bg-slate-400', stroke: '#94a3b8' },
] as const;

type IngresosPorServicioProps = {
  data: IngresoPorServicio[];
  loading: boolean;
};

const formatPercent = (value: number) => `${Number.isFinite(value) ? Math.round(value) : 0}%`;

const IngresosPorServicio: React.FC<IngresosPorServicioProps> = ({ data, loading }) => {
  const { t } = useTranslation();
  const items = SERVICE_KEYS.map((service) => ({
    ...service,
    porcentaje: data.find((item) => item.servicio === service.service)?.porcentaje ?? 0,
  }));
  const hasData = items.some((item) => item.porcentaje > 0);
  let offset = 25;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
      <h3 className="text-lg font-bold text-[#0e1a34] mb-6">{t('reports.charts.incomeByService.title')}</h3>

      <div className="relative size-48 mx-auto mb-6 flex items-center justify-center">
        <svg className="size-full" viewBox="0 0 36 36">
          <circle cx="18" cy="18" fill="none" r="15.915" stroke="#f1f2f4" strokeWidth="3" />
          {hasData && items.map((item) => {
            const currentOffset = offset;
            offset -= item.porcentaje;
            return (
              <circle
                key={item.service}
                cx="18"
                cy="18"
                fill="none"
                r="15.915"
                stroke={item.stroke}
                strokeDasharray={`${item.porcentaje} ${100 - item.porcentaje}`}
                strokeDashoffset={currentOffset}
                strokeWidth="3"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-[#0e1a34]">
            {loading ? '...' : hasData ? formatPercent(Math.max(...items.map((item) => item.porcentaje))) : '-'}
          </span>
          <span className="text-[10px] text-slate-400 uppercase tracking-widest">
            {loading ? 'Cargando' : hasData ? 'Top' : t('reports.charts.incomeByService.noData')}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        {items.map((s) => (
          <div key={s.key} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`size-2 rounded-full ${s.color}`}></span>
              <span className="text-xs font-medium">{t(`reports.charts.incomeByService.${s.key}`)}</span>
            </div>
            <span className="text-xs font-bold">{loading ? '...' : formatPercent(s.porcentaje)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IngresosPorServicio;
