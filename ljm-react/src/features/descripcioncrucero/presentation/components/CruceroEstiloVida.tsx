// components/CruceroEstiloVida.tsx
import React from 'react';
import { VesselData } from '../../../fleet/data/vessels';

interface CruceroEstiloVidaProps {
  vessel?: VesselData;
}

const defaultItems = [
  {
    title: 'Gastronomia',
    description: 'Tres exclusivos espacios gastronomicos, incluyendo experiencias privadas al aire libre.',
  },
  {
    title: 'Centro de Bienestar',
    description: 'Un spa completo, sauna y gimnasio panoramico con vistas a la piscina de popa.',
  },
  {
    title: 'Beach Club',
    description: 'Plataformas hidraulicas de natacion y salon de observacion para contemplar el mar.',
  },
];

const CruceroEstiloVida: React.FC<CruceroEstiloVidaProps> = ({ vessel }) => {
  const highlight = vessel?.lifestyleHighlight || {
    icon: 'restaurant',
    title: 'El Horizonte Culinario',
    description: 'Mariscos frescos e ingredientes artesanales preparados por chefs residentes.',
  };
  const items = vessel?.lifestyleItems || defaultItems;

  return (
    <section className="py-32 px-8 bg-[#0e1a34] text-white overflow-hidden" id="lifestyle">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="order-2 lg:order-1 relative">
          <img
            className="w-full aspect-square object-cover opacity-80"
            alt={`Estilo de vida a bordo de ${vessel?.title || 'LJM Sealine'}`}
            src={
              vessel?.lifestyleImage ||
              'https://lh3.googleusercontent.com/aida-public/AB6AXuDGuv_13epn-uEvhMvPHQemBPn5MMoGNtWOvTrsaBvJjd7nG47iHITwbQnjXtBktWD1NBZUd6I2qBcO7UmuDgs9MO00UpOUXpA6UrGpobAIRJ0ri3s3vGW93xwFcyX8w_83nvOUMoMsBF2IYTP2I2TU_AeszO2Rw6PTFTgqvGHmmerc1b4evUxhSVoni_aYQMhFBkJ4uYhtBtxolEhY2D6w84j9z5N1eigA1btfnQHlKWcJZdZawVaQBs0WOie57YUXwjpPfTEg0Vjz'
            }
          />
          <div className="absolute -top-12 -right-12 p-12 bg-[#eacea9] text-[#0e1a34] max-w-xs shadow-xl hidden md:block">
            <span className="material-symbols-outlined text-4xl mb-4">{highlight.icon}</span>
            <h4 className="font-['Newsreader'] text-2xl font-bold mb-4">{highlight.title}</h4>
            <p className="text-sm leading-relaxed font-medium">{highlight.description}</p>
          </div>
        </div>
        <div className="order-1 lg:order-2 space-y-10">
          <span className="text-[#eacea9] uppercase tracking-[0.3em] text-xs font-bold">
            Estilo de Vida Sin Igual
          </span>
          <h2 className="font-['Newsreader'] text-6xl font-bold leading-tight italic">
            {vessel?.lifestyleTitle || 'Alimento para el Alma'}
          </h2>
          <div className="space-y-6">
            {items.map((item, index) => (
              <div
                className={`flex items-start gap-6 ${index < items.length - 1 ? 'border-b border-white/10 pb-8' : ''}`}
                key={item.title}
              >
                <span className="text-[#eacea9] font-['Newsreader'] text-2xl italic">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h4 className="font-bold text-lg mb-2 uppercase tracking-wide">{item.title}</h4>
                  <p className="text-slate-400 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CruceroEstiloVida;
