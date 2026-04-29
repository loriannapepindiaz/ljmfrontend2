import React from 'react';
import { useTranslation } from 'react-i18next';

const DOC_KEYS = [
  { key: 'passport',    pendiente: true  },
  { key: 'maritime',    pendiente: true  },
  { key: 'medical',     pendiente: true  },
  { key: 'logbook',     pendiente: false },
  { key: 'background',  pendiente: false },
] as const;

const DocumentRepository: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="bg-slate-50 px-8 py-4 border-b border-slate-100">
        <h2 className="text-xl font-bold text-[#0e1a34]">{t('employees.add.docs.title')}</h2>
      </div>
      <div className="p-8">
        <div className="grid grid-cols-12 gap-8">

          <div className="col-span-12 md:col-span-5 space-y-4">
            <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider">
              {t('employees.add.docs.required')}
            </h3>
            <ul className="space-y-3">
              {DOC_KEYS.map((doc) => (
                <li key={doc.key} className="flex items-center gap-3 text-xs text-slate-600">
                  <span className={`material-symbols-outlined text-sm ${doc.pendiente ? 'text-amber-500' : 'text-slate-300'}`}>
                    {doc.pendiente ? 'pending_actions' : 'check_circle'}
                  </span>
                  {t(`employees.add.docs.${doc.key}`)}
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 md:col-span-7">
            <label className="border-2 border-dashed border-[#eacea9]/50 rounded-xl p-10 flex flex-col items-center justify-center bg-[#eacea9]/5 hover:bg-[#eacea9]/10 transition-all cursor-pointer group h-full">
              <span className="material-symbols-outlined text-6xl text-[#eacea9] mb-4 group-hover:scale-110 transition-transform">cloud_upload</span>
              <p className="text-sm font-bold text-[#0e1a34] text-center">{t('employees.add.docs.manager')}</p>
              <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-widest text-center">
                {t('employees.add.docs.dragFiles')}<br />(PDF, JPG, PNG hasta 10MB)
              </p>
              <input type="file" multiple className="hidden" />
            </label>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DocumentRepository;
