import React from 'react';

const ConciergeCard: React.FC = () => {
  return (
    <div className="rounded-xl p-6 bg-gradient-to-br from-[#785d32]/15 to-transparent border border-[#785d32]/20">
      <h5 className="font-bold mb-2 text-[#eacea9]">Sin concierge asignado</h5>
      <p className="text-xs text-slate-300 mb-4 italic leading-relaxed">
        El concierge se habilitara cuando exista una reserva activa.
      </p>
    </div>
  );
};

export default ConciergeCard;
