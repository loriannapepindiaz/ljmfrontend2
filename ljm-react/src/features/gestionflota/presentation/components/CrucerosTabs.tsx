import React, { useState } from 'react';

const tabs = ['Todos los Barcos', 'Activos', 'En Mantenimiento', 'Próximos Lanzamientos'];

interface CrucerosTabsProps {
  onTabChange?: (tab: string) => void;
}

const CrucerosTabs: React.FC<CrucerosTabsProps> = ({ onTabChange }) => {
  const [active, setActive] = useState('Todos los Barcos');

  const handleTab = (tab: string) => {
    setActive(tab);
    onTabChange?.(tab);
  };

  return (
    <div className="flex border-b border-slate-200 mb-8 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => handleTab(tab)}
          className={`px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap relative -mb-[2px] ${
            active === tab
              ? 'border-b-2 border-[#0e1a34] text-[#0e1a34] font-bold'
              : 'text-slate-500 hover:text-[#0e1a34]'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default CrucerosTabs;