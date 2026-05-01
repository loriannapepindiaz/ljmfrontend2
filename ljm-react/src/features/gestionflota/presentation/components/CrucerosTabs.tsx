import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const TAB_KEYS = ['allShips', 'active', 'maintenance', 'upcoming'] as const;
type TabKey = typeof TAB_KEYS[number];

interface CrucerosTabsProps {
  onTabChange?: (tab: TabKey) => void;
}

const CrucerosTabs: React.FC<CrucerosTabsProps> = ({ onTabChange }) => {
  const { t } = useTranslation();
  const [active, setActive] = useState<TabKey>('allShips');

  const handleTab = (tab: TabKey) => {
    setActive(tab);
    onTabChange?.(tab);
  };

  return (
    <div className="flex border-b border-slate-200 mb-8 overflow-x-auto">
      {TAB_KEYS.map((tab) => (
        <button
          key={tab}
          onClick={() => handleTab(tab)}
          className={`px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap relative -mb-[2px] ${
            active === tab
              ? 'border-b-2 border-[#0e1a34] text-[#0e1a34] font-bold'
              : 'text-slate-500 hover:text-[#0e1a34]'
          }`}
        >
          {t(`fleet.tabs.${tab}`)}
        </button>
      ))}
    </div>
  );
};

export default CrucerosTabs;
