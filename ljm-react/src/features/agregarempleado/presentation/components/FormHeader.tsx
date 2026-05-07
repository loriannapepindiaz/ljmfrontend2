import React from 'react';
import { useTranslation } from 'react-i18next';

type FormHeaderProps = {
  submitting: boolean;
  onCancel: () => void;
};

const FormHeader: React.FC<FormHeaderProps> = ({ submitting, onCancel }) => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-between items-end mb-8">
      <div>
        <h1 className="text-4xl font-bold text-[#0e1a34] mb-1">{t('employees.add.title')}</h1>
        <p className="text-slate-500 text-xs">{t('employees.add.subtitle')}</p>
      </div>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 text-[10px] uppercase font-bold tracking-widest text-slate-400 hover:text-[#0e1a34] transition-colors"
        >
          {t('employees.add.cancel')}
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="bg-[#0e1a34] text-[#eacea9] px-8 py-2.5 rounded-sm text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 hover:bg-[#1a2b4e] transition-all shadow-sm disabled:opacity-60"
        >
          <span>{submitting ? 'Guardando...' : t('employees.add.register')}</span>
          <span className="material-symbols-outlined text-sm">anchor</span>
        </button>
      </div>
    </div>
  );
};

export default FormHeader;
