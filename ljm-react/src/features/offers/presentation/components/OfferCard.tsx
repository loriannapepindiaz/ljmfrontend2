// features/offers/presentation/components/OfferCard.tsx
import React from 'react';

interface OfferCardProps {
  title: string;
  description: string;
  image: string;
  price: string;
  discount: string;
  tags: string[];
  isReversed?: boolean;
}

const OfferCard: React.FC<OfferCardProps> = ({ 
  title, description, image, price, discount, tags, isReversed 
}) => {
  return (
    <article className="relative group w-full mb-12 overflow-hidden rounded-[1.2rem] bg-[#0A1128] border border-white/10 shadow-xl transition-all duration-500 hover:border-white/20">
      <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-stretch`}>
        
        {/* ✅ Contenedor de Imagen más compacto */}
        <div className="w-full md:w-1/2 relative overflow-hidden h-[250px] md:h-[400px]">
          <img 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110" 
            src={image} 
          />
          {/* Badge de Descuento un poco más pequeño */}
          <div className={`absolute top-6 ${isReversed ? 'right-6' : 'left-6'}`}>
            <span className="bg-[#C5A059] backdrop-blur-md text-[#0A1128] px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-[0.15em] shadow-2xl border border-white/10">
              {discount}
            </span>
          </div>
        </div>

        {/* ✅ Contenido con padding reducido (p-8 a p-12) */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-[#0d1635] to-[#0A1128]">
          <div className="mb-6">
            <h2 className="font-serif text-2xl md:text-3xl mb-3 text-white leading-tight tracking-tight">
              {title}
            </h2>
            <p className="text-white/60 font-light leading-relaxed text-sm max-w-sm italic">
              "{description}"
            </p>
          </div>
          
          {/* Tags más discretos */}
          <div className="flex flex-wrap gap-2 mb-8">
            {tags.map(tag => (
              <span key={tag} className="px-3 py-1 border border-white/10 rounded-full text-[8px] font-bold uppercase tracking-widest text-white/40 bg-white/5">
                {tag}
              </span>
            ))}
          </div>

          {/* Footer de la Card ajustado */}
          <div className="flex items-center justify-between pt-6 border-t border-white/5">
            <div>
              <p className="text-[8px] uppercase tracking-[0.2em] text-white/30 mb-1 font-bold">Desde</p>
              <p className="text-xl md:text-2xl font-serif text-[#C5A059]">{price}</p>
            </div>
            
            <button className="bg-[#C5A059] hover:bg-white hover:text-[#0A1128] px-7 py-3 rounded-full flex items-center gap-2 transition-all duration-500 text-white shadow-lg group">
              <span className="font-bold text-[9px] tracking-[0.15em] uppercase">Reservar</span>
              <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default OfferCard;