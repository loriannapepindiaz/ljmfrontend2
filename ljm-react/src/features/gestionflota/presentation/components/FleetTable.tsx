import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FleetTable: React.FC = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);

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
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td colSpan={5} className="px-6 py-16 text-center text-slate-400 text-sm">
                <span className="material-symbols-outlined text-[40px] block mb-3 text-slate-300">inbox</span>
                {t('fleet.table.empty')}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="px-6 py-4 bg-slate-50 flex items-center justify-between border-t border-slate-200">
          <p className="text-xs text-slate-400 font-medium">{t('fleet.table.empty')}</p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="size-8 rounded border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-white transition-colors disabled:opacity-40"
            >
              <span className="material-symbols-outlined text-sm">chevron_left</span>
            </button>
            <button className="size-8 rounded border border-slate-200 flex items-center justify-center text-[#0e1a34] bg-white shadow-sm font-bold text-xs">
              {currentPage}
            </button>
            <button
              onClick={() => setCurrentPage(p => p + 1)}
              className="size-8 rounded border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-white transition-colors"
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
