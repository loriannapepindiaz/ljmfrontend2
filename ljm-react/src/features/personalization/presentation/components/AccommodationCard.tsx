import type { FC } from "react";

interface AccommodationProps {
  title: string;
  price: number;
  image: string;
  features: string[];
  isSelected?: boolean;
  onSelect: () => void;
}

const AccommodationCard: FC<AccommodationProps> = ({
  title,
  price,
  image,
  features,
  isSelected = false,
  onSelect,
}) => {
  return (
    <div
      className={`rounded-3xl overflow-hidden bg-white transition-all duration-500 border
        ${
          isSelected
            ? "border-[#c5a059] ring-1 ring-[#c5a059]/50 shadow-xl"
            : "border-gray-100 shadow-sm hover:shadow-2xl hover:border-gray-200"
        }`}
    >
      {/* Imagen */}
      <div className="h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
        />
      </div>

      {/* Contenido */}
      <div className="p-8 flex flex-col">
        <h4 className="text-2xl font-serif font-bold mb-6 text-[#0e1a34] tracking-tight">
          {title}
        </h4>

        <ul className="space-y-4 mb-10">
          {features.map((f, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-[13px] text-[#0e1a34]/60 leading-tight"
            >
              <span className="material-symbols-outlined text-gray-400 text-lg">
                verified
              </span>
              <span className="pt-0.5">{f}</span>
            </li>
          ))}
        </ul>

        <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-[9px] text-gray-400 uppercase font-bold tracking-[0.15em] mb-1">
              Precio por noche
            </p>
            <p className="text-2xl font-bold text-[#0e1a34]">
              €{price.toLocaleString()}
            </p>
          </div>

          <button
            onClick={onSelect}
            className={`min-w-[140px] px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-[0.18em]
            transition-all duration-300 ease-out flex items-center justify-center gap-2
            shadow-md hover:shadow-lg active:scale-[0.97]
            ${
              isSelected
                ? "bg-[#0e1a34] text-[#c5a059] border-[1.5px] border-[#c5a059]/90"
                : "bg-[#0e1a34] text-white border border-white/10 hover:border-[#c5a059]/50 hover:bg-[#1a284a]/90"
            }`}
          >
            {isSelected ? (
              <>
                <span className="material-symbols-outlined text-[#c5a059] text-xl leading-none font-semibold">
                  verified
                </span>
                <span className="font-semibold">Seleccionado</span>
              </>
            ) : (
              <span>Seleccionar</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccommodationCard;