import React from 'react';
import { useTranslation } from 'react-i18next';

const ReportesKPIs: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-[#eacea9]/20 rounded-lg">
            <span className="material-symbols-outlined text-[#0e1a34]">account_balance_wallet</span>
          </div>
          <span className="text-emerald-500 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-full">0%</span>
        </div>
        <p className="text-slate-500 text-sm font-medium mb-1">{t('reports.kpis.monthlyIncome')}</p>
        <p className="text-2xl font-bold text-[#0e1a34]">$0</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-[#eacea9]/20 rounded-lg">
            <span className="material-symbols-outlined text-[#0e1a34]">meeting_room</span>
          </div>
          <span className="text-emerald-500 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-full">0%</span>
        </div>
        <p className="text-slate-500 text-sm font-medium mb-1">{t('reports.kpis.occupancyRate')}</p>
        <p className="text-2xl font-bold text-[#0e1a34]">0%</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-[#eacea9]/20 rounded-lg">
            <span className="material-symbols-outlined text-[#0e1a34]">sentiment_satisfied</span>
          </div>
          <span className="text-emerald-500 text-xs font-bold bg-emerald-50 px-2 py-1 rounded-full">0%</span>
        </div>
        <p className="text-slate-500 text-sm font-medium mb-1">{t('reports.kpis.satisfaction')}</p>
        <p className="text-2xl font-bold text-[#0e1a34]">0/5</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-[#eacea9]/20 rounded-lg">
            <span className="material-symbols-outlined text-[#0e1a34]">trending_up</span>
          </div>
          <span className="text-rose-500 text-xs font-bold bg-rose-50 px-2 py-1 rounded-full">0%</span>
        </div>
        <p className="text-slate-500 text-sm font-medium mb-1">{t('reports.kpis.reservationGrowth')}</p>
        <p className="text-2xl font-bold text-[#0e1a34]">0%</p>
      </div>

    </div>
  );
};

export default ReportesKPIs;
