import type { FC } from "react";
import type { Experience } from "../../../../lib/api";

interface ExperienceSelectCardProps {
  experience: Experience;
  isSelected: boolean;
  onSelect: () => void;
}

const ExperienceSelectCard: FC<ExperienceSelectCardProps> = ({ experience, isSelected, onSelect }) => {
  const precio = Number(experience.precio_base);

  return (
    <div
      className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 flex flex-col cursor-pointer
        ${isSelected ? "border-[#c5a059] shadow-[0_0_0_4px_rgba(197,160,89,0.15)]" : "border-transparent hover:-translate-y-1"}`}
      onClick={onSelect}
    >
      {/* Imagen */}
      <div className="relative h-52 overflow-hidden shrink-0">
        <img
          src={experience.imagen_url ?? "https://images.unsplash.com/photo-1544551763-46a013bb70d5"}
          alt={experience.nombre}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Badge precio */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1.5 shadow-md">
          <span className="text-[#c5a059] text-xs">€</span>
          <span className="text-[10px] font-bold text-[#0e1a34]">
            {precio > 0 ? precio : "Gratis"}
          </span>
        </div>

        {/* Badge seleccionado */}
        {isSelected && (
          <div className="absolute top-3 left-3 bg-[#c5a059] text-white rounded-full px-2.5 py-1 flex items-center gap-1 shadow-md">
            <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
            <span className="text-[9px] font-bold uppercase tracking-wider">Añadido</span>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <h5 className="text-sm font-serif font-bold text-[#0e1a34] uppercase tracking-wider leading-tight">
          {experience.nombre}
        </h5>

        {experience.descripcion && (
          <p className="text-xs text-[#0e1a34]/50 font-light leading-relaxed line-clamp-2">
            {experience.descripcion}
          </p>
        )}

        {/* Precio/unidad */}
        <p className="text-[9px] text-[#0e1a34]/40 uppercase tracking-widest font-semibold mt-auto">
          Por {experience.unidad_cobro.replace("por_", "")}
        </p>

        {/* Botón */}
        <button
          onClick={(e) => { e.stopPropagation(); onSelect(); }}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-[9px] font-bold uppercase tracking-[0.15em] transition-all duration-300 shadow-md active:scale-95
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

export default ExperienceSelectCard;
