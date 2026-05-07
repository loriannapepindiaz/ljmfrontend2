import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

type AssignmentContractSidebarProps = {
  progress: number;
};

const CONTRACT_TYPES = [
  { value: 'fijo', label: 'Fijo' },
  { value: 'indefinido', label: 'Indefinido' },
  { value: 'temporal', label: 'Temporal' },
  { value: 'por_viaje', label: 'Por viaje' },
  { value: 'freelance', label: 'Freelance' },
  { value: 'practicas', label: 'Practicas' },
];

const AssignmentContractSidebar: React.FC<AssignmentContractSidebarProps> = ({ progress }) => {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [contractType, setContractType] = useState('indefinido');
  const pendingText = useMemo(
    () => progress >= 100 ? 'Registro listo para guardar.' : 'Completa los campos principales para finalizar el registro.',
    [progress]
  );

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
              <select name="barco" className="w-full bg-slate-50 border border-slate-100 rounded-lg px-4 py-3 text-sm appearance-none focus:ring-1 focus:ring-[#eacea9] outline-none">
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
            <input type="hidden" name="tipo_contrato" value={contractType} />
            <div className="grid grid-cols-2 gap-2">
              {CONTRACT_TYPES.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setContractType(type.value)}
                  className={`rounded-lg border px-3 py-2.5 text-xs font-bold transition-all ${
                    contractType === type.value
                      ? 'border-[#0e1a34] bg-[#0e1a34] text-[#eacea9] shadow-sm'
                      : 'border-slate-100 bg-white text-slate-500 hover:border-[#eacea9] hover:bg-[#eacea9]/10'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">
                {t('employees.add.contract.startDate')}
              </label>
              <input
                name="fecha_contrato"
                type="date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-lg px-4 py-3 text-sm focus:ring-1 focus:ring-[#eacea9] outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">
                {t('employees.add.contract.endDate')}
              </label>
              <input
                name="fecha_fin"
                type="date"
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-lg px-4 py-3 text-sm focus:ring-1 focus:ring-[#eacea9] outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">
              {t('employees.add.contract.shift')}
            </label>
            <select name="turno_rotacion" className="w-full bg-slate-50 border border-slate-100 rounded-lg px-4 py-3 text-sm appearance-none focus:ring-1 focus:ring-[#eacea9] outline-none">
              <option>3 Meses ON / 1 Mes OFF</option>
              <option>4 Meses ON / 2 Mes OFF</option>
              <option>6 Semanas ON / 6 Semanas OFF</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">
              {t('employees.add.contract.homePort')}
            </label>
            <div className="flex items-center gap-2 w-full bg-slate-50 border border-slate-100 rounded-lg px-4 py-3">
              <span className="material-symbols-outlined text-slate-300 text-sm">location_on</span>
              <input name="puerto" type="text" placeholder="e.g. Puerto Banus" className="bg-slate-50 border-none p-0 w-full text-sm focus:ring-0 outline-none" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block">
              {t('employees.add.contract.insurance')}
            </label>
            <input
              type="text"
              name="seguro_medico"
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
            <span className="text-[#0e1a34]">{progress}%</span>
          </div>
          <div className="w-full bg-white h-1.5 rounded-full overflow-hidden">
            <div className="bg-[#0e1a34] h-full transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-[10px] text-slate-500 italic leading-relaxed">
            {pendingText}
          </p>
        </div>
      </section>
    </div>
  );
};

export default AssignmentContractSidebar;
