import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CalendarPicker from '../../../../components/CalendarPicker';

const inputClass = "w-full bg-slate-100/50 border-none px-4 py-2.5 rounded-lg focus:ring-1 focus:ring-[#eacea9] outline-none text-sm";

const ProfessionalProfileSection: React.FC = () => {
  const { t } = useTranslation();
  const [expiryDates, setExpiryDates] = useState<Array<Date | null>>([null, null]);

  const updateExpiryDate = (index: number, date: Date) => {
    setExpiryDates((current) => current.map((item, itemIndex) => (itemIndex === index ? date : item)));
  };

  return (
    <section className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="bg-slate-50 px-8 py-4 border-b border-slate-100">
        <h2 className="text-xl font-bold text-[#0e1a34]">{t('employees.add.professional.title')}</h2>
      </div>
      <div className="p-8 space-y-8">

        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
              {t('employees.add.professional.role')}
            </label>
            <input type="text" placeholder="ej. Primer Oficial" className={inputClass} />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
              {t('employees.add.professional.department')}
            </label>
            <select className={inputClass}>
              <option>{t('employees.add.professional.deptDeck')}</option>
              <option>{t('employees.add.professional.deptEngine')}</option>
              <option>{t('employees.add.professional.deptService')}</option>
            </select>
          </div>
        </div>

        {/* Certificaciones */}
        <div className="space-y-4">
          <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
            {t('employees.add.professional.certifications')}
          </label>
          <div className="overflow-x-auto border border-slate-100 rounded-lg">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-2 text-[10px] uppercase font-bold text-slate-400">
                    {t('employees.add.professional.colCert')}
                  </th>
                  <th className="px-4 py-2 text-[10px] uppercase font-bold text-slate-400">
                    {t('employees.add.professional.colIssuer')}
                  </th>
                  <th className="px-4 py-2 text-[10px] uppercase font-bold text-slate-400 w-32">
                    {t('employees.add.professional.colExpiry')}
                  </th>
                  <th className="px-4 py-2 w-16"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <tr>
                  <td className="px-4 py-3"><input type="text" placeholder="STCW II/2" className="w-full bg-transparent border-none p-0 text-xs focus:ring-0 outline-none" /></td>
                  <td className="px-4 py-3"><input type="text" placeholder="Autoridad Marítima" className="w-full bg-transparent border-none p-0 text-xs focus:ring-0 outline-none" /></td>
                  <td className="px-4 py-3">
                    <CalendarPicker
                      value={expiryDates[0]}
                      onChange={(date) => updateExpiryDate(0, date)}
                      placeholder="dd/mm/aaaa"
                      className="min-w-[140px]"
                    />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-slate-300 hover:text-red-400 transition-colors">
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3"><input type="text" placeholder="Formación Básica Seguridad" className="w-full bg-transparent border-none p-0 text-xs focus:ring-0 outline-none" /></td>
                  <td className="px-4 py-3"><input type="text" placeholder="Entidad acreditada" className="w-full bg-transparent border-none p-0 text-xs focus:ring-0 outline-none" /></td>
                  <td className="px-4 py-3">
                    <CalendarPicker
                      value={expiryDates[1]}
                      onChange={(date) => updateExpiryDate(1, date)}
                      placeholder="dd/mm/aaaa"
                      className="min-w-[140px]"
                    />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-slate-300 hover:text-red-400 transition-colors">
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <button className="w-full py-2 bg-slate-50 text-[10px] font-bold uppercase text-slate-400 hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-sm">add</span>
              {t('employees.add.professional.addCert')}
            </button>
          </div>
        </div>

        {/* Experiencia */}
        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
            {t('employees.add.professional.experience')}
          </label>
          <textarea
            className="w-full bg-slate-100/50 border-none px-4 py-3 rounded-lg focus:ring-1 focus:ring-[#eacea9] outline-none text-sm h-32 resize-none"
            placeholder={t('employees.add.professional.experiencePlaceholder')}
          />
        </div>
      </div>
    </section>
  );
};

export default ProfessionalProfileSection;
