import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAdminPreferences } from '../../../../context/AdminPreferencesContext';

const IngresosTendencia: React.FC = () => {
  const { t } = useTranslation();
  const { timezone } = useAdminPreferences();
  const currentYear = Number(
    new Intl.DateTimeFormat('en-US', { year: 'numeric', timeZone: timezone }).format(new Date()),
  );

  const months: string[] = t('reports.monthsShort', { returnObjects: true }) as string[];
  const displayMonths = months.filter((_, i) => i % 2 === 0);

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
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <span className="material-symbols-outlined text-[48px] text-slate-200 block mb-2">show_chart</span>
            <p className="text-sm text-slate-400">{t('reports.charts.trend.noData')}</p>
            <p className="text-xs text-slate-300 mt-1">{t('reports.charts.trend.connectDB')}</p>
          </div>
        </div>
        <div className="flex justify-between mt-4 border-t border-slate-100 pt-4">
          {displayMonths.map((m) => (
            <span key={m} className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{m}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IngresosTendencia;
