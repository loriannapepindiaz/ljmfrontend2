// src/features/fleet/presentation/components/VesselCard.tsx
import React from 'react';

interface VesselCardProps {
  title: string;
  subtitle: string;
  description: string;
  length: string;
  guests: string;
  badge: string;
  imageSrc: string;
  isFlagship?: boolean; // para diferenciar estilos si quieres
}

const VesselCard: React.FC<VesselCardProps> = ({
  title,
  subtitle,
  description,
  length,
  guests,
  badge,
  imageSrc,
}) => {
  return (
    <div className="group bg-[#f8f9fa] rounded-5xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 p-4">
      <div className="aspect-[16/10] overflow-hidden relative rounded-[3rem]">
        <img
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          src={imageSrc}
        />
        <div className="absolute top-8 right-8 bg-navy/80 backdrop-blur-md text-pearl px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
          {badge}
        </div>
      </div>
      <div className="px-8 pb-10 pt-8">
        <span className="text-primary text-xs font-bold tracking-widest uppercase mb-2 block">{subtitle}</span>
        <h3 className="font-magiona text-4xl text-navy mb-4">{title}</h3>
        <p className="text-gray-500 mb-8 text-lg leading-relaxed">{description}</p>
        <div className="flex items-center justify-between border-t border-gray-200 pt-8">
          <div className="flex space-x-8">
            <div className="flex items-center space-x-3">
              <span className="material-symbols-outlined text-primary text-2xl">straighten</span>
              <span className="text-base font-semibold text-navy uppercase tracking-tighter">{length}</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="material-symbols-outlined text-primary text-2xl">group</span>
              <span className="text-base font-semibold text-navy uppercase tracking-tighter">{guests} GUESTS</span>
            </div>
          </div>
          <a
            className="text-navy font-bold text-sm underline underline-offset-8 hover:text-primary transition-colors uppercase tracking-widest"
            href="#"
          >
            Explore Vessel
          </a>
        </div>
      </div>
    </div>
  );
};

export default VesselCard;