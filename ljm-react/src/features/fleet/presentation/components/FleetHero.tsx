// src/features/fleet/presentation/components/FleetHero.tsx
import React from 'react';

const FleetHero: React.FC = () => {
  return (
    <section className="relative min-h-[calc(85vh+80px)] overflow-hidden flex items-center pt-20 md:pt-24 lg:pt-28"
      style={{ backgroundColor: '#001D4F' }}>

      {/* Fondo con imagen de crucero */}
      <div className="absolute inset-0 z-0">
        <img
          alt="Colossal luxury cruise ship fleet at sea"
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3Cm8Vp0BIDOeE9LPnNUOX5uAv4NSFUIRepWGM_nwiFdcKcs-11vOlYw9AyiCU_OWP-aUClbHS0ZsWSs7G4yAH_AfRVqEqAzCwVCJ2iQYCX4tYu4mMQ0QfodvK2XDfaKYVLxbg05n45e3aJg0aIjLCskHdNiWR8Ea235_VZxZEiveOtZ0j8UxSjqFE9QtwTGs44Sk6JOw8CKmM_deQ_lxKRz-be27MIhJOfpNlu_Db9H2udvLmYq_WSHmVJa8nMhczMr1LHbdRRyQ"
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgba(15,50,80,0.85) 0%, rgba(30,70,110,0.70) 40%, rgba(50,90,130,0.40) 70%, rgba(255,255,255,0) 100%)'
        }} />
      </div>

      {/* Contenido */}
      <div className="container mx-auto px-6 lg:px-20 relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16 pb-16 md:pb-24">

        {/* Columna izquierda */}
        <div className="w-full md:w-3/5 lg:w-2/3 text-center md:text-left">
          <h1 className="font-magiona text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-white mb-6 md:mb-8 leading-none tracking-tight drop-shadow-lg">
            OUR ELITE
            <br />
            <span className="block mt-2 md:mt-4" style={{ color: '#F5F1E8' }}>FLEET</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto md:mx-0 mb-10 md:mb-12 leading-relaxed font-light drop-shadow-md"
            style={{ color: 'rgba(245,241,232,0.9)' }}>
            Experience the pinnacle of maritime luxury. Our exclusive fleet is designed to provide an unparalleled journey across the world's most breathtaking horizons.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
            {/* Botón primario — dorado sólido */}
            <button
              className="font-bold uppercase text-base sm:text-lg tracking-widest shadow-xl transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: '#a07840',
                color: '#ffffff',
                padding: '1.25rem 3rem',
                borderRadius: '9999px',
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#b8894e')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#a07840')}
            >
              EXPLORE NOW
            </button>

            {/* Botón secundario — borde blanco perla */}
            <a
              href="https://www.youtube.com/watch?v=V0fCRpLEe_I"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 font-bold uppercase text-base sm:text-lg tracking-widest shadow-lg transition-all duration-300"
              style={{
                border: '2px solid #F5F1E8',
                color: '#F5F1E8',
                padding: '1.25rem 3rem',
                borderRadius: '9999px',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.backgroundColor = '#F5F1E8';
                el.style.color = '#001D4F';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.backgroundColor = 'transparent';
                el.style.color = '#F5F1E8';
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
                <path d="M8 5v14l11-7z" />
              </svg>
              WATCH FILM
            </a>
          </div>
        </div>

        {/* Card de reviews */}
        <div className="w-full md:w-80 lg:w-96 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl"
          style={{
            backgroundColor: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.25)',
          }}>
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex -space-x-4">
              <img alt="Guest 1" className="h-12 w-12 rounded-full object-cover shadow-md"
                style={{ border: '4px solid rgba(0,29,79,0.8)' }}
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150" />
              <img alt="Guest 2" className="h-12 w-12 rounded-full object-cover shadow-md"
                style={{ border: '4px solid rgba(0,29,79,0.8)' }}
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150" />
              <img alt="Guest 3" className="h-12 w-12 rounded-full object-cover shadow-md"
                style={{ border: '4px solid rgba(0,29,79,0.8)' }}
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150" />
            </div>
            <span className="text-white text-sm uppercase tracking-widest font-medium">Guest Reviews</span>
          </div>

          <div className="flex items-baseline space-x-3 mb-3">
            <span className="font-magiona text-white font-bold" style={{ fontSize: '4.5rem', lineHeight: 1 }}>5.0</span>
            {/* Estrella rellena dorada con fontVariationSettings */}
            <span
              className="material-symbols-outlined drop-shadow-md"
              style={{
                fontSize: '3.5rem',
                color: '#c9a962',
                fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48",
              }}
            >
              star
            </span>
          </div>

          <p className="text-base font-medium mb-2" style={{ color: '#F5F1E8' }}>Excellence Award 2024</p>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Trusted by world travelers for exceptional maritime experiences.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FleetHero;