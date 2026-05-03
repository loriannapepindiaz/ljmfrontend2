import React from 'react';
import { useTranslation } from 'react-i18next';
import { getStoredAdminSession } from '../../../../lib/api';

const PagosHeader: React.FC = () => {
  const { t } = useTranslation();
  const adminUser = getStoredAdminSession()?.user;
  const adminName =
    adminUser?.username?.trim() ||
    [adminUser?.cliente?.nombre, adminUser?.cliente?.apellido].filter(Boolean).join(' ').trim() ||
    'Administrador';

  return (
    <header className="mb-8 flex items-center justify-between">
      <div>
        <h2 className="text-4xl font-bold text-[#0e1a34]">{t('payments.title')}</h2>
        <p className="mt-1 text-slate-500">{t('payments.subtitle')}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
          <div className="text-right">
            <p className="text-sm font-bold text-[#0e1a34]">{adminName}</p>
            <p className="text-xs text-slate-500">{adminUser?.rol ?? 'Admin'}</p>
          </div>
          <div className="flex size-10 items-center justify-center rounded-full border-2 border-[#eacea9] bg-slate-100 text-[#0e1a34]">
            <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PagosHeader;
