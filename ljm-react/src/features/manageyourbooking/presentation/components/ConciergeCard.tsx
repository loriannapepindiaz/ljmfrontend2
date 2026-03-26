import React from 'react';

const ConciergeCard: React.FC = () => {
  return (
    <div className="rounded-xl p-6 bg-gradient-to-br from-[#785d32]/15 to-transparent border border-[#785d32]/20">
      <h5 className="font-bold mb-2 text-[#eacea9]">Concierge Sealine</h5>
      <p className="text-xs text-slate-300 mb-4 italic leading-relaxed">
        "Haz tu viaje inolvidable. Nuestros conserjes personales están disponibles 24/7 para crear tu escapada mediterránea perfecta."
      </p>
      <a href="#" className="text-xs font-bold text-[#eacea9] flex items-center gap-1 group">
        Contactar Concierge
        <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
      </a>
    </div>
  );
};

export default ConciergeCard;