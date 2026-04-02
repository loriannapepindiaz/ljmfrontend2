// components/CruceroHero.tsx
import React from 'react';
import { VesselData } from '../../../fleet/data/vessels';

interface CruceroHeroProps {
  vessel?: VesselData;
}

const CruceroHero: React.FC<CruceroHeroProps> = ({ vessel }) => {
  const title = vessel?.title || 'The Serenity';
  const description = vessel?.description || 'A masterpiece of naval architecture, blending architectural stillness with the rhythm of the tides.';
  const heroImage = vessel?.heroImage || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtNJgtd1USMUa5nZZumatCZ05sKe2au3FQlBVMsKD8LOQJyKFPUX0fSRWAeM_KA3pYqStmKmLvcfSyjFSGF-qSOKUKsP0HeN-tVz8t94nZareXttPswLsDJt6QjZmuXPQigHwHOtxnovgIguemQNVdHWHp2RcRa34hYyoF0TBBmrWAXOU9qcRbS275yu6rzIrjHujh73E4dt8vEkVOVc_jv1YJaNWRLk1SGFWzvATmDqDJRWlTR_bUtJ5IYBkYIDj5w7IFg_4SLlpk';

  return (
    <section className="relative h-[90vh] flex justify-center overflow-hidden items-start" id="overview">
      <div className="absolute inset-0 z-0">
        <img 
          className="w-full h-full object-cover" 
          alt={title}
          src={heroImage}
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#0e1a34]/40 via-transparent to-[#0e1a34]/80"></div>
      </div>
      <div className="relative z-10 text-center px-4 max-w-5xl pt-32">
        <span className="text-[#eacea9] uppercase tracking-[0.4em] text-xs mb-6 block font-medium">
          Behold the Horizon
        </span>
        <h1 className="font-['Newsreader'] text-7xl md:text-9xl text-white font-extrabold italic leading-tight drop-shadow-2xl">
          {title}
        </h1>
        <div className="mt-12 h-px w-32 bg-[#eacea9] mx-auto opacity-50"></div>
        <p className="mt-8 text-white/90 font-['Newsreader'] text-xl max-w-2xl mx-auto italic">
          {description}
        </p>
      </div>
    </section>
  );
};

export default CruceroHero;