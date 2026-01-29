// src/features/fleet/presentation/components/CtaBanner.tsx
import React from 'react';

const CtaBanner: React.FC = () => {
  return (
    <div className="mt-24 relative rounded-5xl overflow-hidden h-[500px] md:h-[600px] flex items-center shadow-2xl border border-pearl/20">
      {/* Fondo con la imagen del stitch / HTML original */}
      <div className="absolute inset-0 cta-banner"></div>

      {/* Contenido centrado y responsivo */}
      <div className="relative z-10 container mx-auto px-8 md:px-16 lg:px-24 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-10 md:gap-16">
        <div className="flex-1 max-w-3xl">
          <h2 className="font-magiona text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 md:mb-8 leading-tight drop-shadow-2xl">
            Unlock Your Next Adventure
          </h2>
          <p className="text-pearl text-lg sm:text-xl md:text-2xl font-light opacity-95 drop-shadow-lg max-w-2xl mx-auto md:mx-0">
            Join us for a journey beyond imagination. Your dream luxury cruise awaits in the world's most breathtaking horizons.
          </p>
        </div>

        <div className="flex-shrink-0">
          <button className="bg-navy text-pearl border-2 border-pearl/40 hover:bg-white hover:text-navy px-10 md:px-14 py-5 md:py-6 rounded-full font-bold uppercase text-base md:text-lg tracking-[0.2em] transition-all duration-300 transform hover:scale-105 shadow-2xl whitespace-nowrap">
            START YOUR JOURNEY
          </button>
        </div>
      </div>
    </div>
  );
};

export default CtaBanner;
