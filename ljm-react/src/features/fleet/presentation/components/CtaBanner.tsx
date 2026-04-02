// src/features/fleet/presentation/components/CtaBanner.tsx
import React from 'react';

const CtaBanner: React.FC = () => {
  return (
    <div className="mt-16 mb-16 relative rounded-[2.5rem] overflow-hidden h-105 md:h-115 flex items-center shadow-2xl">
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1582610116397-edb318620f90?w=1600&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 60%',
        }}
      />

      {/* Overlay oscuro tipo navy */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(15, 25, 50, 0.68)' }}
      />

      {/* Contenido */}
      <div className="relative z-10 w-full px-8 md:px-16 lg:px-20 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
        <div className="flex-1 max-w-2xl text-center md:text-left">
          <h2
            className="text-4xl sm:text-5xl md:text-6xl text-white mb-4 leading-tight"
            style={{ fontFamily: "'Georgia', serif", fontWeight: 400 }}
          >
            Unlock Your Next Adventure
          </h2>
          <p className="text-white/75 text-base sm:text-lg font-light max-w-xl mx-auto md:mx-0">
            Join us for a journey beyond imagination. Your dream luxury cruise
            awaits in the world's most breathtaking horizons.
          </p>
        </div>

        <div className="shrink-0">
          <button
            className="text-white border border-white/40 hover:bg-white hover:text-[#0f1932] px-10 py-4 rounded-full font-semibold uppercase text-sm tracking-[0.2em] transition-all duration-300 whitespace-nowrap"
            style={{ backgroundColor: 'rgba(15, 25, 50, 0.6)' }}
          >
            START YOUR JOURNEY
          </button>
        </div>
      </div>
    </div>
  );
};

export default CtaBanner;