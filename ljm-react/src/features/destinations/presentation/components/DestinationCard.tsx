import React from 'react';

interface Destination {
  titulo: string;
  img: string;
  rating: number;
  pais: string;
  descripcion: string;
}

const DestinationCard = ({ destino }: { destino: Destination }) => {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-lg shadow-night/5 border border-gold/10 transition-transform hover:-translate-y-2 duration-300">
      <div className="relative h-64 overflow-hidden">
        <img 
          alt={destino.titulo} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          src={destino.img} 
        />
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
          <span className="material-symbols-outlined text-gold text-sm fill-current">star</span>
          <span className="text-xs font-bold text-night">{destino.rating}</span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-night mb-1">{destino.titulo}</h3>
            <p className="flex items-center gap-1 text-night/50 text-xs uppercase tracking-wider">
              <span className="material-symbols-outlined text-sm text-gold">place</span> 
              {destino.pais}
            </p>
          </div>
          <button className="bg-[#0e1a34] text-[#eacea9] px-4 py-1.5 rounded-full text-xs font-semibold transition-all hover:bg-gold hover:text-white border border-[#0e1a34]">
            Ver detalles
          </button>
        </div>
        <div className="mt-4 pt-4 border-t border-gold/5">
          <p className="text-sm text-night/60 line-clamp-3">{destino.descripcion}</p>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
