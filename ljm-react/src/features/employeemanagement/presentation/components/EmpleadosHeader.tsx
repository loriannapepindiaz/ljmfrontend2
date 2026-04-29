import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const EmpleadosHeader: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-3xl font-bold text-[#0e1a34]">{t('employees.title')}</h2>
        <p className="text-slate-500 mt-1">{t('employees.subtitle')}</p>
      </div>
      <button
        onClick={() => navigate('/admin/empleados/agregar')}
        className="bg-[#eacea9] text-[#0e1a34] px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity"
      >
        <span className="material-symbols-outlined text-base">person_add</span>
        {t('employees.addEmployee')}
      </button>
    </header>
  );
};

export default EmpleadosHeader;