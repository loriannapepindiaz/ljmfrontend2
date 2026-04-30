import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const ACTION_KEYS = [
  { icon: 'directions_boat', labelKey: 'dashboard.quickActions.addShip', path: '/admin/cruceros/agregar' },
  { icon: 'description',     labelKey: 'dashboard.quickActions.generateReport', path: '/admin/dashboard/report' },
];

const QuickActions: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleAction = (action: typeof ACTION_KEYS[0]) => {
    if (action.path) {
      navigate(action.path);
    }
  };


  return (
    <div className="bg-[#eacea9] text-[#0e1a34] rounded-xl p-6 shadow-sm relative overflow-hidden border border-[#0e1a34]/5">
      <div className="absolute -right-8 -bottom-8 size-32 bg-white/20 rounded-full blur-2xl"></div>
      <h3 className="text-lg font-bold mb-4 relative z-10">{t('dashboard.quickActions.title')}</h3>
      <div className="grid grid-cols-2 gap-3 relative z-10">
        {ACTION_KEYS.map((action) => (
          <button
            key={action.labelKey}
            onClick={() => handleAction(action)}
            className="flex flex-col items-center gap-2 p-4 bg-[#0e1a34]/5 hover:bg-[#0e1a34]/10 rounded-xl transition-all border border-[#0e1a34]/10 w-full"
          >
            <span className="material-symbols-outlined">{action.icon}</span>
            <span className="text-xs font-bold text-center">{t(action.labelKey)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;

