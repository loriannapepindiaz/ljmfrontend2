import React from 'react';
import { useTranslation } from 'react-i18next';

const CabinasHeader: React.FC = () => {
  const { t } = useTranslation();
  return (
    <header className="h-16 border-b border-[#0e1a34]/10 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md shrink-0 sticky top-0 z-10">
      <h2 className="text-2xl font-bold text-[#0e1a34]">Gestión de Habitaciones</h2>
    </header>
  );
};

export default CabinasHeader;