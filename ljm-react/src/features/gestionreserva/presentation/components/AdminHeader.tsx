import React from 'react';
import { useTranslation } from 'react-i18next';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  onAddClick?: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ title, subtitle, onAddClick }) => {
  const { t } = useTranslation();

  return (
    <header className="mb-8 pl-8 pt-4 flex items-start justify-between gap-6">
      <div className="flex-1">
        <h2 className="text-4xl font-bold text-[#0e1a34]">{title}</h2>
        <div className="mt-3 h-px w-full rounded-full bg-[#0e1a34]/10" />
        {subtitle ? <p className="mt-3 max-w-2xl text-sm text-slate-500">{subtitle}</p> : null}
      </div>

      {onAddClick ? (
        <button
          className="flex items-center gap-2 rounded-lg bg-[#eacea9] px-6 py-2.5 text-sm font-bold text-[#0e1a34] shadow-sm transition-all hover:bg-[#d4af37]"
          onClick={onAddClick}
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          {t('adminHeader.addReservation')}
        </button>
      ) : null}
    </header>
  );
};

export default AdminHeader;
