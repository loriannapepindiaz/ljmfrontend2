import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import type { ActivityRow } from '../../data/dashboardService';

interface RecentActivityTableProps {
  activity: ActivityRow[];
  loading: boolean;
}

const STATUS_STYLES: Record<string, string> = {
  Confirmado: 'bg-green-50 text-green-600 border border-green-200',
  Pendiente:  'bg-amber-50 text-amber-600 border border-amber-200',
  Pagado:     'bg-blue-50 text-blue-600 border border-blue-200',
};

const RecentActivityTable: React.FC<RecentActivityTableProps> = ({ activity, loading }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="xl:col-span-2 bg-white border border-[#0e1a34]/10 rounded-xl shadow-sm flex flex-col">

      <div className="p-6 border-b border-[#0e1a34]/10">
        <h3 className="text-lg font-bold text-[#0e1a34]">{t('dashboard.recentActivity.title')}</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#0e1a34]/5 text-[#0e1a34]/60 text-xs uppercase tracking-wider font-semibold">
              <th className="px-6 py-4">{t('dashboard.recentActivity.colId')}</th>
              <th className="px-6 py-4">{t('dashboard.recentActivity.colPassenger')}</th>
              <th className="px-6 py-4">{t('dashboard.recentActivity.colCruise')}</th>
              <th className="px-6 py-4">{t('dashboard.recentActivity.colStatus')}</th>
              <th className="px-6 py-4">{t('dashboard.recentActivity.colAmount')}</th>
            </tr>
          </thead>
          <tbody className="text-sm text-[#0e1a34]/80 divide-y divide-[#0e1a34]/5">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-16 text-center text-slate-400 text-sm">
                  <span className="material-symbols-outlined text-[40px] block mb-3 text-slate-300 animate-pulse">hourglass_empty</span>
                  Cargando actividad...
                </td>
              </tr>
            ) : activity.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-16 text-center text-slate-400 text-sm">
                  <span className="material-symbols-outlined text-[40px] block mb-3 text-slate-300">inbox</span>
                  {t('dashboard.recentActivity.empty')}
                </td>
              </tr>
            ) : (
              activity.map((row) => (
                <tr key={row.id} className="hover:bg-[#0e1a34]/[0.02] transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-[#0e1a34]/50">#{row.id}</td>
                  <td className="px-6 py-4 font-medium">{row.guest}</td>
                  <td className="px-6 py-4 text-[#0e1a34]/60">{row.ship}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${STATUS_STYLES[row.status] ?? 'bg-slate-100 text-slate-600'}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold">{row.total}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="p-6 bg-white border-t border-[#0e1a34]/10 flex justify-center">
        <button
          onClick={() => navigate('/admin/reservas')}
          className="bg-[#0e1a34] text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-[#1a2a4a] transition-all shadow-md flex items-center gap-2"
        >
          {t('dashboard.recentActivity.viewAll')}
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default RecentActivityTable;
