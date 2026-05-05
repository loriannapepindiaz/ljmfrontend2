import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAdminPreferences } from '../../../../context/AdminPreferencesContext';
import type { IngresoPorMes } from '../../data/reportesService';

type IngresosTendenciaProps = {
  data: IngresoPorMes[];
  loading: boolean;
};

const IngresosTendencia: React.FC<IngresosTendenciaProps> = ({ data, loading }) => {
  const { t } = useTranslation();
  const { timezone } = useAdminPreferences();
  const currentYear = Number(
    new Intl.DateTimeFormat('en-US', { year: 'numeric', timeZone: timezone }).format(new Date()),
  );

  const months: string[] = t('reports.monthsShort', { returnObjects: true }) as string[];
  const displayMonths = months.filter((_, i) => i % 2 === 0);
  const maxTotal = Math.max(...data.map((item) => item.total), 0);
  const hasData = maxTotal > 0;
  const footerMonths = data.length > 0 ? data.filter((_, index) => index % 2 === 0).map((item) => item.mes) : displayMonths;

  return (
    <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-[#0e1a34]">{t('reports.charts.trend.title')}</h3>
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-[#eacea9]"></span>
          <span className="text-xs text-slate-500">{currentYear} ({t('reports.charts.trend.current')})</span>
        </div>
      </div>

      <div className="h-64 relative flex flex-col justify-end">
        {loading || !hasData ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <span className="material-symbols-outlined text-[48px] text-slate-200 block mb-2">show_chart</span>
              <p className="text-sm text-slate-400">
                {loading ? 'Cargando datos...' : 'Sin datos disponibles'}
              </p>
              {!loading && <p className="text-xs text-slate-300 mt-1">Los datos aparecerán al conectar la BD</p>}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-end gap-3 px-1">
            {data.map((item) => {
              const height = Math.max(8, (item.total / maxTotal) * 100);
              return (
                <div key={item.mes} className="flex-1 h-full flex flex-col items-center justify-end gap-2">
                  <span className="text-[10px] font-bold text-[#0e1a34]">
                    ${Math.round(item.total).toLocaleString('en-US')}
                  </span>
                  <div
                    className="w-full max-w-10 rounded-t-lg bg-[#eacea9] border border-[#d8bd7b]/40 transition-all"
                    style={{ height: `${height}%` }}
                  />
                </div>
              );
            })}
          </div>
        )}
        <div className="flex justify-between mt-4 border-t border-slate-100 pt-4">
          {footerMonths.map((m) => (
            <span key={m} className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{m}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IngresosTendencia;
