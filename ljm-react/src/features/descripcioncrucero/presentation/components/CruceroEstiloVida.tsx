// components/CruceroEstiloVida.tsx
import React from 'react';
import { VesselData } from '../../../fleet/data/vessels';

interface CruceroEstiloVidaProps {
  vessel?: VesselData;
}

const CruceroEstiloVida: React.FC<CruceroEstiloVidaProps> = ({ vessel }) => {
  return (
    <section className="py-32 px-8 bg-[#0e1a34] text-white overflow-hidden" id="lifestyle">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="order-2 lg:order-1 relative">
          <img 
            className="w-full aspect-square object-cover opacity-80" 
            alt="Cena gourmet de alto nivel servida en cubierta de yate al atardecer"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGuv_13epn-uEvhMvPHQemBPn5MMoGNtWOvTrsaBvJjd7nG47iHITwbQnjXtBktWD1NBZUd6I2qBcO7UmuDgs9MO00UpOUXpA6UrGpobAIRJ0ri3s3vGW93xwFcyX8w_83nvOUMoMsBF2IYTP2I2TU_AeszO2Rw6PTFTgqvGHmmerc1b4evUxhSVoni_aYQMhFBkJ4uYhtBtxolEhY2D6w84j9z5N1eigA1btfnQHlKWcJZdZawVaQBs0WOie57YUXwjpPfTEg0Vjz"
          />
          <div className="absolute -top-12 -right-12 p-12 bg-[#eacea9] text-[#0e1a34] max-w-xs shadow-xl hidden md:block">
            <span className="material-symbols-outlined text-4xl mb-4">restaurant</span>
            <h4 className="font-['Newsreader'] text-2xl font-bold mb-4">
              El Horizonte Culinario
            </h4>
            <p className="text-sm leading-relaxed font-medium">
              Mariscos recién pescados e ingredientes artesanales preparados por nuestros chefs residentes con estrella Michelin.
            </p>
          </div>
        </div>
        <div className="order-1 lg:order-2 space-y-10">
          <span className="text-[#eacea9] uppercase tracking-[0.3em] text-xs font-bold">
            Estilo de Vida Sin Igual
          </span>
          <h2 className="font-['Newsreader'] text-6xl font-bold leading-tight italic">
            Alimento <br/>para el Alma
          </h2>
          <div className="space-y-6">
            <div className="flex items-start gap-6 border-b border-white/10 pb-8">
              <span className="text-[#eacea9] font-['Newsreader'] text-2xl italic">01</span>
              <div>
                <h4 className="font-bold text-lg mb-2 uppercase tracking-wide">Gastronomía</h4>
                <p className="text-slate-400 text-sm">
                  Tres exclusivos espacios gastronómicos, incluyendo una parrilla teppanyaki al aire libre y un comedor formal de mantel blanco.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6 border-b border-white/10 pb-8">
              <span className="text-[#eacea9] font-['Newsreader'] text-2xl italic">02</span>
              <div>
                <h4 className="font-bold text-lg mb-2 uppercase tracking-wide">Centro de Bienestar</h4>
                <p className="text-slate-400 text-sm">
                  Un spa completo, sauna finlandesa y un gimnasio panorámico con vistas a la piscina de popa.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <span className="text-[#eacea9] font-['Newsreader'] text-2xl italic">03</span>
              <div>
                <h4 className="font-bold text-lg mb-2 uppercase tracking-wide">El Beach Club</h4>
                <p className="text-slate-400 text-sm">
                  Plataformas hidráulicas de natación y un salón de observación subacuático para contemplar la vida marina.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CruceroEstiloVida;