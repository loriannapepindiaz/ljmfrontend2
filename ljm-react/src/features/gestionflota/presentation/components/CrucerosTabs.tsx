import React from 'react';
import { useTranslation } from 'react-i18next';
import type { TabKey } from '../../data/types';

const TAB_KEYS: TabKey[] = ['allShips', 'active', 'maintenance', 'upcoming'];

interface CrucerosTabsProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  counts?: Record<TabKey, number>;
}

const CrucerosTabs: React.FC<CrucerosTabsProps> = ({ activeTab, onTabChange, counts }) => {
  const { t } = useTranslation();

  return (
    <div className="flex border-b border-slate-200 mb-8 overflow-x-auto">
      {TAB_KEYS.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap relative -mb-[2px] flex items-center gap-2 ${
            activeTab === tab
              ? 'border-b-2 border-[#0e1a34] text-[#0e1a34] font-bold'
              : 'text-slate-500 hover:text-[#0e1a34]'
          }`}
        >
          {t(`fleet.tabs.${tab}`)}
          {counts && counts[tab] > 0 && (
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
              activeTab === tab
                ? 'bg-[#0e1a34] text-white'
                : 'bg-slate-100 text-slate-500'
            }`}>
              {counts[tab]}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default CrucerosTabs;
