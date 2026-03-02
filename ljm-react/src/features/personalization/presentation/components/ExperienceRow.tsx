import type { FC } from "react";

interface ExperienceRowProps {
  title: string;
  description: string;
  image: string;
  price?: number;
  unit?: string;
  isIncluded?: boolean;
}

const ExperienceRow: FC<ExperienceRowProps> = ({
  title,
  description,
  image,
  price = 0,
  unit = "Invitado",
  isIncluded = false,
}) => {
  return (
    <div className="group flex flex-col lg:flex-row items-center gap-8 p-6 lg:p-8 hover:bg-[#0e1a34]/[0.02] transition-colors border-b border-gray-100 last:border-0">
      {/* Contenedor de Imagen: Cuadrado premium */}
      <div className="w-full lg:w-32 h-32 rounded-2xl overflow-hidden shrink-0 shadow-md">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Textos: Tipografía Serif y Mayúsculas */}
      <div className="flex-1 text-center lg:text-left">
        <h5 className="text-lg font-serif font-bold text-[#0e1a34] mb-1 leading-tight uppercase tracking-wider">
          {title}
        </h5>
        <p className="text-xs text-[#0e1a34]/50 font-light leading-relaxed max-w-2xl">
          {description}
        </p>
      </div>

      {/* Precio y Acción: Botones Ovalados */}
      <div className="flex flex-col items-center lg:items-end gap-4 min-w-[180px]">
        <div className="text-center lg:text-right">
          <p className="text-xl font-bold text-[#0e1a34]">
            {isIncluded ? "INCLUIDO" : `€${price}`}
          </p>
          <p className="text-[9px] text-[#0e1a34]/40 uppercase tracking-widest font-semibold">
            {isIncluded ? "Servicio Premium" : `Por ${unit}`}
          </p>
        </div>

        {isIncluded ? (
          <button className="flex items-center gap-2 px-8 py-2.5 bg-[#fdfaf3] text-[#c5a059] text-[9px] font-bold uppercase tracking-widest rounded-full border border-[#c5a059]/10 shadow-sm cursor-default">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            Añadido
          </button>
        ) : (
          <button className="flex items-center gap-2 px-10 py-2.5 bg-[#0e1a34] text-white text-[9px] font-bold uppercase tracking-widest rounded-full hover:bg-[#c5a059] transition-all shadow-md active:scale-95">
            <span className="material-symbols-outlined text-sm">add_circle</span>
            Añadir
          </button>
        )}
      </div>
    </div>
  );
};

export default ExperienceRow;