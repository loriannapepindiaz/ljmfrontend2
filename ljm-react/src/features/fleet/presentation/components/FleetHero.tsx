// src/features/fleet/presentation/components/FleetHero.tsx
import React from 'react';

const FleetHero: React.FC = () => {
  return (
    <section className="relative min-h-[calc(85vh+80px)] overflow-hidden bg-navy flex items-center pt-20 md:pt-24 lg:pt-28">
      {/* Fondo con imagen grande de crucero */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Colossal luxury cruise ship fleet at sea"
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3Cm8Vp0BIDOeE9LPnNUOX5uAv4NSFUIRepWGM_nwiFdcKcs-11vOlYw9AyiCU_OWP-aUClbHS0ZsWSs7G4yAH_AfRVqEqAzCwVCJ2iQYCX4tYu4mMQ0QfodvK2XDfaKYVLxbg05n45e3aJg0aIjLCskHdNiWR8Ea235_VZxZEiveOtZ0j8UxSjqFE9QtwTGs44Sk6JOw8CKmM_deQ_lxKRz-be27MIhJOfpNlu_Db9H2udvLmYq_WSHmVJa8nMhczMr1LHbdRRyQ"
        />
        {/* Overlay gradient - degradado que se desvanece hacia abajo */}
        <div className="absolute inset-0" style={{background: 'linear-gradient(to bottom, rgba(15, 50, 80, 0.85) 0%, rgba(30, 70, 110, 0.70) 40%, rgba(50, 90, 130, 0.40) 70%, rgba(255, 255, 255, 0) 100%)'}} />
      </div>

      {/* Contenido principal - ya con espacio arriba */}
      <div className="container mx-auto px-6 lg:px-20 relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16 pb-16 md:pb-24">
        {/* Columna izquierda: Título + descripción + botones */}
        <div className="w-full md:w-3/5 lg:w-2/3 text-center md:text-left">
          <h1 className="font-magiona text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white mb-6 md:mb-8 leading-none tracking-tight drop-shadow-lg">
            OUR ELITE
            <br />
            <span className="text-pearl block mt-2 md:mt-4">FLEET</span>
          </h1>

          <p className="text-pearl/90 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto md:mx-0 mb-10 md:mb-12 leading-relaxed font-light drop-shadow-md">
            Experience the pinnacle of maritime luxury. Our exclusive fleet is designed to provide an unparalleled journey across the world's most breathtaking horizons.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
            <button className="bg-primary text-white px-10 sm:px-12 py-5 rounded-full font-bold uppercase text-base sm:text-lg tracking-widest hover:bg-[#d4af37] hover:scale-105 transition-all duration-300 shadow-xl">
              EXPLORE NOW
            </button>
            <button className="border-2 border-pearl text-pearl px-10 sm:px-12 py-5 rounded-full font-bold uppercase text-base sm:text-lg tracking-widest hover:bg-pearl hover:text-navy transition-all duration-300 shadow-lg">
              WATCH FILM
            </button>
          </div>
        </div>

        {/* Card de reviews - clara y bien posicionada */}
        <div className="w-full md:w-80 lg:w-96 bg-white/20 backdrop-blur-2xl p-8 rounded-3xl border border-white/30 shadow-2xl">
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex -space-x-4">
              <img
                alt="Guest 1"
                className="h-12 w-12 rounded-full border-4 border-navy/80 object-cover shadow-md"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150"
              />
              <img
                alt="Guest 2"
                className="h-12 w-12 rounded-full border-4 border-navy/80 object-cover shadow-md"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150"
              />
              <img
                alt="Guest 3"
                className="h-12 w-12 rounded-full border-4 border-navy/80 object-cover shadow-md"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150"
              />
            </div>
            <span className="text-white text-sm uppercase tracking-widest font-medium">Guest Reviews</span>
          </div>

          <div className="flex items-baseline space-x-3 mb-3">
            <span className="text-6xl md:text-7xl font-magiona text-white font-bold">5.0</span>
            <span className="material-symbols-outlined text-primary fill-1 text-5xl md:text-6xl drop-shadow-md">star</span>
          </div>

          <p className="text-pearl text-base font-medium mb-2">Excellence Award 2024</p>
          <p className="text-white/80 text-sm leading-relaxed">
            Trusted by world travelers for exceptional maritime experiences.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FleetHero;