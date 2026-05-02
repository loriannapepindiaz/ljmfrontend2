import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AdminDatePicker from '../../../../components/AdminDatePicker';

const AssignmentContractSidebar: React.FC = () => {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate]     = useState('');

  return (
    <div className="space-y-8">

      <section className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 bg-[#0e1a34]">
          <h2 className="text-sm font-bold text-[#eacea9] uppercase tracking-widest">
            {t('employees.add.contract.title')}
          </h2>
          <p className="text-[10px] text-slate-400 mt-1">{t('employees.add.contract.subtitle')}</p>
        </div>
        <div className="p-8 space-y-6">

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">
              {t('employees.add.contract.ship')}
            </label>
            <div className="relative">
              <select className="w-full bg-slate-50 border border-slate-100 rounded-lg px-4 py-3 text-sm appearance-none focus:ring-1 focus:ring-[#eacea9] outline-none">
                <option>SS Meridian Explorer</option>
                <option>MV Golden Horizon</option>
                <option>The Azure Sovereign</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none">expand_more</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">
              {t('employees.add.contract.contractType')}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center justify-center gap-2 p-3 rounded-lg border border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors">
                <input type="radio" name="contract" defaultChecked className="text-[#0e1a34]" />
                <span className="text-xs font-medium text-slate-600">{t('employees.add.contract.indefinite')}</span>
              </label>
              <label className="flex items-center justify-center gap-2 p-3 rounded-lg border border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors">
                <input type="radio" name="contract" className="text-[#0e1a34]" />
                <span className="text-xs font-medium text-slate-600">{t('employees.add.contract.campaign')}</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">
                {t('employees.add.contract.startDate')}
              </label>
              <AdminDatePicker value={startDate} onChange={setStartDate} />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">
                {t('employees.add.contract.endDate')}
              </label>
              <AdminDatePicker value={endDate} onChange={setEndDate} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">
              {t('employees.add.contract.shift')}
            </label>
            <select className="w-full bg-slate-50 border border-slate-100 rounded-lg px-4 py-3 text-sm appearance-none focus:ring-1 focus:ring-[#eacea9] outline-none">
              <option>3 Meses ON / 1 Mes OFF</option>
              <option>4 Meses ON / 2 Mes OFF</option>
              <option>6 Semanas ON / 6 Semanas OFF</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">
              {t('employees.add.contract.homePort')}
            </label>
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-lg px-4 py-3">
              <span className="material-symbols-outlined text-slate-300 text-sm">location_on</span>
              <input type="text" placeholder="e.g. Puerto Banús" className="bg-transparent border-none p-0 w-full text-sm focus:ring-0 outline-none" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">
              {t('employees.add.contract.insurance')}
            </label>
            <input
              type="text"
              placeholder={t('employees.add.contract.insurancePlaceholder')}
              className="w-full bg-slate-50 border border-slate-100 rounded-lg px-4 py-3 text-sm focus:ring-1 focus:ring-[#eacea9] outline-none"
            />
          </div>
        </div>

        <div className="p-8 bg-slate-50/50 border-t border-slate-100">
          <div className="flex items-start gap-3 text-slate-400">
            <span className="material-symbols-outlined text-lg mt-0.5">verified_user</span>
            <p className="text-[10px] leading-relaxed">{t('employees.add.contract.legalNote')}</p>
          </div>
        </div>
      </section>

      <section className="bg-[#eacea9]/10 rounded-xl border border-[#eacea9]/30 p-8">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#0e1a34] mb-4">
          {t('employees.add.status.title')}
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center text-[10px] font-bold">
            <span className="text-slate-500 uppercase">{t('employees.add.status.completed')}</span>
            <span className="text-[#0e1a34]">45%</span>
          </div>
          <div className="w-full bg-white h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#0e1a34] h-full w-[45%]" />
          </div>
          <p className="text-[10px] text-slate-500 italic leading-relaxed">
            {t('employees.add.status.pending')}
          </p>
        </div>
      </section>

    </div>
  );
};

export default AssignmentContractSidebar;
