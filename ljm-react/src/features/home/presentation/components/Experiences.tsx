import React from 'react';

// IMPORTAR IMÁGENES LOCALES
import michelinImg from '/public/fotos/michelin.jpg';
import spaImg from '/public/fotos/spa.jpg';
import penImg from '/public/fotos/Pen.jpg';
import vistaImg from '/public/fotos/vista.jpeg';

const Experiences: React.FC = () => {
  return (
    <section className="py-24 bg-[#FDFCF0]">
      <div className="container mx-auto px-6">

        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
              Curated Selection
            </span>
            <h2 className="text-4xl md:text-5xl font-display text-gray-900">
              Elite On-Board Experiences
            </h2>
          </div>
          <p className="max-w-md text-gray-600 mt-4 md:mt-0 font-light italic">
            Every detail is designed to offer you an unparalleled level of comfort and sophistication.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* 1️⃣ MICHELIN – COMIDA */}
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-2xl aspect-[4/5] mb-6">
              <img
                src={michelinImg}
                alt="Michelin Star Dining"
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded text-[10px] font-bold text-white uppercase tracking-widest">
                Premium
              </div>
            </div>
            <h3 className="text-xl font-display mb-2 group-hover:text-primary transition-colors text-gray-900">
              Michelin Star Dining
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Cuisine crafted by world-renowned chefs in intimate settings.
            </p>
          </div>

          {/* 2️⃣ SPA */}
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-2xl aspect-[4/5] mb-6">
              <img
                src={spaImg}
                alt="Zenith Wellness Spa"
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-4 right-4 bg-primary px-3 py-1 rounded text-[10px] font-bold text-white uppercase tracking-widest">
                Included
              </div>
            </div>
            <h3 className="text-xl font-display mb-2 group-hover:text-primary transition-colors text-gray-900">
              Zenith Wellness Spa
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Holistic treatments inspired by the ancient rituals of the sea.
            </p>
          </div>

          {/* 3️⃣ HABITACIÓN – PEN */}
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-2xl aspect-[4/5] mb-6">
              <img
                src={penImg}
                alt="Royal Penthouse Suites"
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <h3 className="text-xl font-display mb-2 group-hover:text-primary transition-colors text-gray-900">
              Royal Penthouse Suites
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Spacious private sanctuaries with panoramic ocean views.
            </p>
          </div>

          {/* 4️⃣ VISTA */}
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-2xl aspect-[4/5] mb-6">
              <img
                src={vistaImg}
                alt="Ocean View Lounge"
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <h3 className="text-xl font-display mb-2 group-hover:text-primary transition-colors text-gray-900">
              Panoramic Ocean Views
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Endless horizons from exclusive vantage points onboard.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Experiences;