// src/features/Room/presentation/components/ExperienceCard.tsx
import React from 'react';

interface ExperienceCardProps {
  title: string;
  description: string;
  image: string;
  isSelected?: boolean;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ title, description, image, isSelected }) => {
  return (
    <div className={`glass-card rounded-xl p-3 flex flex-col gap-4 group cursor-pointer transition-all duration-300 ${
      isSelected ? 'border-primary/60 ring-1 ring-primary/20 bg-primary/5' : 'hover:border-primary/40'
    }`}>
      <div className="aspect-[3/4] rounded-lg overflow-hidden relative">
        <img alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={image} />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent"></div>
        {isSelected && (
          <div className="absolute top-2 right-2 bg-primary text-white size-6 rounded-full flex items-center justify-center">
            <span className="material-symbols-outlined text-sm">check</span>
          </div>
        )}
      </div>
      <div className="px-2 pb-2 flex flex-col gap-3">
        <h3 className="text-accent font-display text-lg">{title}</h3>
        <p className="text-accent/60 text-xs font-light leading-relaxed">{description}</p>
        <button className={`w-full py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
          isSelected 
            ? 'bg-primary text-white shadow-lg shadow-primary/20' 
            : 'border border-primary text-primary hover:bg-primary hover:text-white'
        }`}>
          {isSelected ? 'SELECTED' : 'SELECT'}
        </button>
      </div>
    </div>
  );
};