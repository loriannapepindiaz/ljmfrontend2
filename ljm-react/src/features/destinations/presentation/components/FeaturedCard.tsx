import React from 'react';

interface Destino {
  titulo: string;
  subtitulo: string;
  descripcion: string;
  img: string;
  destacado?: boolean;
}

interface FeaturedCardProps {
  destino: Destino;
  isActive: boolean;
  index: number;
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({ destino, isActive, index }) => {
  const isSideCard = index === 0 || index === 4;
  const isMediumCard = index === 1 || index === 3;
  
  return (
    <div className={`
      carousel-card shrink-0 overflow-hidden relative group cursor-pointer transition-all duration-500 shadow-lg
      ${isActive 
        ? 'w-80 md:w-96 h-[550px] rounded-3xl shadow-2xl active z-10 border border-gold/20' 
        : isMediumCard 
        ? 'w-72 h-[450px] rounded-2xl shadow-xl opacity-90' 
        : isSideCard 
        ? 'hidden lg:block w-64 h-96 rounded-2xl opacity-30 grayscale hover:grayscale-0' 
        : ''
      }
    `}>
      <img 
        alt={destino.titulo} 
        className={`w-full h-full object-cover ${isActive ? 'transform group-hover:scale-110 transition-transform duration-700' : ''}`} 
        src={destino.img}
      />
      
      <div className={`absolute inset-0 bg-gradient-to-t ${
        isActive ? 'from-night via-night/30 to-transparent' : 'from-night/90 to-transparent'
      }`}></div>
      
      <div className={`
        absolute ${isActive ? 'bottom-10 left-0 right-0 text-center px-6' : 'bottom-6 left-6'}
      `}>
        {destino.destacado && isActive && (
          <span className="inline-flex items-center gap-1 bg-gold text-white px-3 py-1 rounded-full text-xs font-semibold mb-4">
            <span className="material-symbols-outlined text-xs">star</span> DESTACADO
          </span>
        )}
        {!isActive && (
          <>
            <p className="text-pearl text-sm font-semibold tracking-wider uppercase">{destino.subtitulo}</p>
            <h3 className="magiona-style text-2xl text-white">{destino.titulo}</h3>
          </>
        )}
        {isActive && (
          <>
            <h3 className="magiona-style text-4xl text-white mb-4">{destino.titulo}</h3>
            <p className="text-white/80 text-sm mb-6 line-clamp-2">{destino.descripcion}</p>
            <button className="bg-[#0e1a34] text-[#eacea9] px-8 py-3 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-gold hover:text-white transition-all border border-[#eacea9]/20 shadow-xl shadow-black/20">
              Explorar Ahora
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default FeaturedCard;