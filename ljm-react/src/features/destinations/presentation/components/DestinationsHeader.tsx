import React from 'react';

const DestinationsHeader = () => {
  return (
    <div className="bg-[#0e1a34]">
      <header className="pt-40 pb-16 text-center px-4">
        <h2 className="text-gold uppercase tracking-[0.3em] text-sm mb-4 font-semibold">Descubre el Mundo</h2>
        <h1 className="magiona-style text-4xl md:text-6xl text-[#eacea9] mb-6">Destinos Exclusivos</h1>
        <p className="max-w-2xl mx-auto text-[#eacea9]/80 font-light leading-relaxed">
          Sumérjase en la elegancia de los mares más hermosos del mundo. Desde las aguas turquesas del Caribe hasta la sofisticación del Mediterráneo.
        </p>
      </header>
    </div>
  );
};

export default DestinationsHeader;
