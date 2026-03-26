import React from 'react';

const highlights = [
  {
    icon: 'restaurant_menu',
    color: 'text-[#785d32]',
    bg: 'bg-[#785d32]/10',
    bgHover: 'hover:bg-[#785d32]/20',
    borderHover: 'hover:border-[#785d32]/40',
    titulo: 'Gastronomía',
    desc: "Acceso exclusivo a 'The Pearl Oyster' — mesa del chef privado esta noche.",
  },
  {
    icon: 'spa',
    color: 'text-[#eacea9]',
    bg: 'bg-[#eacea9]/10',
    bgHover: 'hover:bg-[#eacea9]/20',
    borderHover: 'hover:border-[#eacea9]/40',
    titulo: 'Spa y Bienestar',
    desc: 'Programado: Masaje de Piedras Calientes el 16 de sept a las 14:00.',
  },
  {
    icon: 'explore',
    color: 'text-[#785d32]',
    bg: 'bg-[#785d32]/10',
    bgHover: 'hover:bg-[#785d32]/20',
    borderHover: 'hover:border-[#785d32]/40',
    titulo: 'Excursiones',
    desc: '2 excursiones confirmadas para Santorini y Mykonos.',
  },
];

const HighlightsRow: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {highlights.map((h) => (
        <div
          key={h.titulo}
          className={`p-6 rounded-2xl flex flex-col gap-4 group ${h.borderHover} transition-colors border border-[#eacea9]/5`}
          style={{ background: 'rgba(14, 26, 52, 0.7)', backdropFilter: 'blur(12px)' }}
        >
          <div className={`size-12 rounded-xl ${h.bg} flex items-center justify-center ${h.color} ${h.bgHover} transition-all`}>
            <span className="material-symbols-outlined text-2xl">{h.icon}</span>
          </div>
          <div>
            <h4 className="text-white font-bold mb-1">{h.titulo}</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">{h.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HighlightsRow;