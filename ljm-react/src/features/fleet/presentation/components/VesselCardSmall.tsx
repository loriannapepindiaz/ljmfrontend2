// src/features/fleet/presentation/components/VesselCardSmall.tsx
import React from 'react';

interface VesselCardSmallProps {
  title: string;
  className: string;
  description: string;
  imageSrc: string;
}

const VesselCardSmall: React.FC<VesselCardSmallProps> = ({ title, className, description, imageSrc }) => {
  return (
    <div className="group bg-[#f8f9fa] rounded-5xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 p-3">
      <div className="aspect-[4/3] overflow-hidden relative rounded-[2.5rem]">
        <img
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
          src={imageSrc}
        />
      </div>
      <div className="px-6 pb-8 pt-6">
        <span className="text-primary text-[10px] font-bold tracking-widest uppercase mb-2 block">{className}</span>
        <h3 className="font-magiona text-2xl text-navy mb-3">{title}</h3>
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">{description}</p>
        <a
          className="text-navy font-bold text-xs underline underline-offset-4 hover:text-primary transition-colors uppercase tracking-widest"
          href="#"
        >
          View Specs
        </a>
      </div>
    </div>
  );
};

export default VesselCardSmall;