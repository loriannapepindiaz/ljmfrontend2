import type { FC } from "react";

interface ExperienceRowProps {
  title: string;
  description: string;
  image: string;
  price?: number;
  unit?: string;
  isSelected?: boolean;
  onSelect: () => void;
}

const ExperienceRow: FC<ExperienceRowProps> = ({
  title,
  description,
  image,
  price = 0,
  unit = "Invitado",
  isSelected = false,
  onSelect,
}) => {
  return (
    <div className={`group flex flex-col lg:flex-row items-center gap-8 p-6 lg:p-8 transition-colors border-b border-gray-100 last:border-0 ${isSelected ? "bg-[#c5a059]/5" : "hover:bg-[#0e1a34]/[0.02]"}`}>
      {/* Contenedor de Imagen */}
      <div className="w-full lg:w-32 h-32 rounded-2xl overflow-hidden shrink-0 shadow-md">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Textos */}
      <div className="flex-1 text-center lg:text-left">
        <h5 className="text-lg font-serif font-bold text-[#0e1a34] mb-1 leading-tight uppercase tracking-wider">
          {title}
        </h5>
        <p className="text-xs text-[#0e1a34]/50 font-light leading-relaxed max-w-2xl">
          {description}
        </p>
      </div>

      {/* Precio y Acción */}
      <div className="flex flex-col items-center lg:items-end gap-4 min-w-[200px]">
        <div className="text-center lg:text-right">
          <p className="text-xl font-bold text-[#0e1a34]">
            €{price}
          </p>
          <p className="text-[9px] text-[#0e1a34]/40 uppercase tracking-widest font-semibold">
            Por {unit}
          </p>
        </div>

        <button 
          onClick={onSelect}
          className={`flex items-center justify-center gap-2 min-w-[150px] px-6 py-3 rounded-full text-[9px] font-bold uppercase tracking-[0.15em] transition-all duration-300 shadow-md active:scale-95
          ${isSelected 
            ? "bg-[#0e1a34] text-[#c5a059] border-[1.5px] border-[#c5a059]/90" 
            : "bg-[#0e1a34] text-white hover:bg-[#1a284a]"
          }`}
        >
          <span className={`material-symbols-outlined text-sm ${isSelected ? "text-[#c5a059]" : "text-white"}`}>
            {isSelected ? "verified" : "add_circle"}
          </span>
          {isSelected ? "Seleccionado" : "Añadir"}
        </button>
      </div>
    </div>
  );
};

export default ExperienceRow;