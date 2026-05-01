import React from 'react';

const sections = [
  { icon: 'restaurant_menu', titulo: 'Gastronomia' },
  { icon: 'spa', titulo: 'Spa y Bienestar' },
  { icon: 'explore', titulo: 'Excursiones' },
];

const HighlightsRow: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {sections.map((item) => (
        <div
          key={item.titulo}
          className="p-6 rounded-2xl flex flex-col gap-4 transition-colors border border-[#eacea9]/5"
          style={{ background: 'rgba(14, 26, 52, 0.7)', backdropFilter: 'blur(12px)' }}
        >
          <div className="size-12 rounded-xl bg-[#eacea9]/10 flex items-center justify-center text-[#eacea9]">
            <span className="material-symbols-outlined text-2xl">{item.icon}</span>
          </div>
          <div>
            <h4 className="text-white font-bold mb-1">{item.titulo}</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Sin datos registrados para esta reserva.
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HighlightsRow;
