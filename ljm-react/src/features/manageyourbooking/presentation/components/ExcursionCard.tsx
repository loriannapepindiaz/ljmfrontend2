import React from 'react';

interface ExcursionCardProps {
  imagen: string;
  nombre: string;
  fecha: string;
  puerto: string;
  estado: string;
}

const ExcursionCard: React.FC<ExcursionCardProps> = ({ imagen, nombre, fecha, puerto, estado }) => {
  return (
    <div className="flex gap-4">
      <div
        className="w-16 h-16 rounded bg-cover bg-center shrink-0 border border-white/5"
        style={{ backgroundImage: `url('${imagen}')` }}
      />
      <div>
        <p className="text-sm font-bold text-white">{nombre}</p>
        <p className="text-[10px] text-slate-400 italic">{fecha} • {puerto}</p>
        <p className="text-xs text-green-400 font-bold">{estado}</p>
      </div>
    </div>
  );
};

export default ExcursionCard;