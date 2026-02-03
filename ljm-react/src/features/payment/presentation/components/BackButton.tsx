// features/payment/presentation/components/BackButton.tsx
import React from 'react';

const BackButton: React.FC = () => {
  return (
    <button className="w-full flex items-center justify-center gap-3 py-5 rounded-2xl border border-maroon-gold/40 text-night-blue bg-transparent hover:bg-maroon-gold/5 transition-all duration-300 group">
      <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform text-maroon-gold">west</span>
      <span className="text-xs font-bold uppercase tracking-[0.3em]">Volver a configurar itinerario</span>
    </button>
  );
};

export default BackButton;