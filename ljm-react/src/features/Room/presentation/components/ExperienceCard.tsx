import type { FC } from "react";

interface ExperienceProps {
  title: string;
  description: string;
  image: string;
  isSelected: boolean;
  onSelect: () => void;
}

const ExperienceCard: FC<ExperienceProps> = ({ title, description, image, isSelected, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className={`glass-card rounded-xl p-3 flex flex-col gap-4 group cursor-pointer transition-all duration-300 border ${
        isSelected 
          ? "border-primary ring-1 ring-primary/20 bg-primary/5" 
          : "border-accent/20 hover:border-primary"
      }`}
    >
      <div className="aspect-[3/4] rounded-lg overflow-hidden relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent"></div>

        {/* CHECK DORADO: Solo se muestra si está seleccionado */}
        {isSelected && (
          <div className="absolute top-2 right-2 bg-primary text-white size-6 rounded-full flex items-center justify-center shadow-lg animate-in zoom-in duration-300">
            <span className="material-symbols-outlined text-sm font-bold">check</span>
          </div>
        )}
      </div>

      <div className="px-2 pb-2 flex flex-col gap-3">
        <h3 className="text-accent font-display text-lg">{title}</h3>
        <p className="text-accent/60 text-xs font-light leading-relaxed">{description}</p>
        
        <button
          className={`w-full py-2.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 border ${
            isSelected 
              ? "bg-primary border-primary text-white" 
              : "border-primary text-primary hover:bg-primary hover:text-white"
          }`}
        >
          {isSelected ? "SELECTED" : "SELECT"}
        </button>
      </div>
    </div>
  );
};

export default ExperienceCard;