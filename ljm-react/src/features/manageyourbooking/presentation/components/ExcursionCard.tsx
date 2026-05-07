import React from 'react';

interface ExcursionCardProps {
  imagen: string;
  nombre: string;
  fecha: string;
  puerto: string;
  estado: string;
  precio?: number;
}

const ExcursionCard: React.FC<ExcursionCardProps> = ({ imagen, nombre, fecha, puerto, estado, precio }) => {
  const formattedPrice = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(precio ?? 0));

  return (
    <div className="flex gap-4">
      <div
        className="w-16 h-16 rounded bg-cover bg-center shrink-0 border border-white/5 bg-white/[0.04] flex items-center justify-center"
        style={imagen ? { backgroundImage: `url('${imagen}')` } : undefined}
      >
        {!imagen ? <span className="material-symbols-outlined text-[#eacea9]/40">explore</span> : null}
      </div>
      <div>
        <p className="text-sm font-bold text-white">{nombre} <span className="text-[#eacea9]">{formattedPrice}</span></p>
        <p className="text-[10px] text-slate-400 italic">{fecha} | {puerto}</p>
        <p className="text-xs text-green-400 font-bold">{estado}</p>
      </div>
    </div>
  );
};

export default ExcursionCard;
