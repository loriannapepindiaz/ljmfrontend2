// src/features/home/presentation/components/Membership.tsx
import React from 'react';

const Membership = () => {
  return (
    <section className="py-24 bg-luxury-blue text-white relative">
      <div className="container mx-auto px-6 text-center">
        <span className="text-primary font-bold tracking-[0.4em] text-xs uppercase mb-6 block">
          El Privilegio LJM
        </span>

        <h2 className="text-4xl md:text-5xl font-display mb-8">
          Únete a Nuestra Membresía Elite
        </h2>

        <p className="max-w-3xl mx-auto text-gray-300 mb-16 text-lg font-light leading-relaxed">
          Eleva tus viajes con beneficios que se extienden mucho más allá del horizonte. Acceso anticipado a reservas, excursiones privadas en tierra y reconocimiento de clase mundial.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          
          {/* ITEM */}
          <div className="flex flex-col items-center group">
            <div className="w-20 h-20 rounded-full border border-pearl-beige/30 flex items-center justify-center mb-6
              text-pearl-beige
              group-hover:bg-primary group-hover:text-midnight-blue group-hover:border-primary
              transition-colors duration-300">
              <span className="material-symbols-outlined text-3xl">
                workspace_premium
              </span>
            </div>
            <h5 className="font-display text-lg mb-2">Embarque Prioritario</h5>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">
              Acceso inmediato a la serenidad
            </p>
          </div>

          {/* ITEM */}
          <div className="flex flex-col items-center group">
            <div className="w-20 h-20 rounded-full border border-pearl-beige/30 flex items-center justify-center mb-6
              text-pearl-beige
              group-hover:bg-primary group-hover:text-midnight-blue group-hover:border-primary
              transition-colors duration-300">
              <span className="material-symbols-outlined text-3xl">
                wine_bar
              </span>
            </div>
            <h5 className="font-display text-lg mb-2">Bares Gratuitos</h5>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">
              Licores premium en todas partes
            </p>
          </div>

          {/* ITEM */}
          <div className="flex flex-col items-center group">
            <div className="w-20 h-20 rounded-full border border-pearl-beige/30 flex items-center justify-center mb-6
              text-pearl-beige
              group-hover:bg-primary group-hover:text-midnight-blue group-hover:border-primary
              transition-colors duration-300">
              <span className="material-symbols-outlined text-3xl">
                explore
              </span>
            </div>
            <h5 className="font-display text-lg mb-2">Tours Privados</h5>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">
              Experiencias locales a medida
            </p>
          </div>

          {/* ITEM */}
          <div className="flex flex-col items-center group">
            <div className="w-20 h-20 rounded-full border border-pearl-beige/30 flex items-center justify-center mb-6
              text-pearl-beige
              group-hover:bg-primary group-hover:text-midnight-blue group-hover:border-primary
              transition-colors duration-300">
              <span className="material-symbols-outlined text-3xl">
                airport_shuttle
              </span>
            </div>
            <h5 className="font-display text-lg mb-2">Traslados en Limusina</h5>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">
              Servicio de puerta a puerto
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Membership;
