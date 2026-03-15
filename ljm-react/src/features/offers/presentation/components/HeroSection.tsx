// features/offers/presentation/components/HeroSection.tsx
import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <header className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* imagen de fondo */}
      <img
        alt="Luxury Cruise Ship"
        className="absolute inset-0 w-full h-full object-cover"
        src="https://images.unsplash.com/photo-1599640842225-85d111c60e6b?auto=format&fit=crop&q=80&w=2000"
      />

      {/* overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1128]/80 via-transparent to-[#0A1128]"></div>

      {/* texto */}
      <div className="relative z-10 text-center px-6 mt-16">
        <h1 className="font-serif text-5xl md:text-8xl mb-6 tracking-tight text-white leading-tight">
          Exclusive Seasonal <span className="italic text-[#C5A059]">Offers</span>
        </h1>

        <p className="max-w-2xl mx-auto text-white/90 text-xl font-light tracking-wide leading-relaxed">
          Indulge in the extraordinary with our curated selection of limited-time seasonal privileges.
        </p>
      </div>
    </header>
  );
};

export default HeroSection;