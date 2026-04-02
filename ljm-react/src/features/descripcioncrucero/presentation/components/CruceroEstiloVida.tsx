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
            alt="High end gourmet dinner served on yacht deck at sunset"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGuv_13epn-uEvhMvPHQemBPn5MMoGNtWOvTrsaBvJjd7nG47iHITwbQnjXtBktWD1NBZUd6I2qBcO7UmuDgs9MO00UpOUXpA6UrGpobAIRJ0ri3s3vGW93xwFcyX8w_83nvOUMoMsBF2IYTP2I2TU_AeszO2Rw6PTFTgqvGHmmerc1b4evUxhSVoni_aYQMhFBkJ4uYhtBtxolEhY2D6w84j9z5N1eigA1btfnQHlKWcJZdZawVaQBs0WOie57YUXwjpPfTEg0Vjz"
          />
          <div className="absolute -top-12 -right-12 p-12 bg-[#eacea9] text-[#0e1a34] max-w-xs shadow-xl hidden md:block">
            <span className="material-symbols-outlined text-4xl mb-4">restaurant</span>
            <h4 className="font-['Newsreader'] text-2xl font-bold mb-4">
              The Culinary Horizon
            </h4>
            <p className="text-sm leading-relaxed font-medium">
              Daily-caught seafood and artisanal ingredients prepared by our Michellin-starred resident chefs.
            </p>
          </div>
        </div>
        <div className="order-1 lg:order-2 space-y-10">
          <span className="text-[#eacea9] uppercase tracking-[0.3em] text-xs font-bold">
            Unparalleled Lifestyle
          </span>
          <h2 className="font-['Newsreader'] text-6xl font-bold leading-tight italic">
            Nourishment <br/>for the Soul
          </h2>
          <div className="space-y-6">
            <div className="flex items-start gap-6 border-b border-white/10 pb-8">
              <span className="text-[#eacea9] font-['Newsreader'] text-2xl italic">01</span>
              <div>
                <h4 className="font-bold text-lg mb-2 uppercase tracking-wide">Gastronomy</h4>
                <p className="text-slate-400 text-sm">
                  Three distinct dining venues including an al-fresco teppanyaki grill and a formal white-linen stateroom.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6 border-b border-white/10 pb-8">
              <span className="text-[#eacea9] font-['Newsreader'] text-2xl italic">02</span>
              <div>
                <h4 className="font-bold text-lg mb-2 uppercase tracking-wide">Wellness Center</h4>
                <p className="text-slate-400 text-sm">
                  A full-service spa, Finnish sauna, and a panoramic gym overlooking the stern pool.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <span className="text-[#eacea9] font-['Newsreader'] text-2xl italic">03</span>
              <div>
                <h4 className="font-bold text-lg mb-2 uppercase tracking-wide">The Beach Club</h4>
                <p className="text-slate-400 text-sm">
                  Hydraulic swim platforms and a submerged observation lounge for viewing marine life.
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