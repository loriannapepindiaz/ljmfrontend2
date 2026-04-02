// components/CruceroVision.tsx
import React from 'react';
import { VesselData } from '../../../fleet/data/vessels';

interface CruceroVisionProps {
  vessel?: VesselData;
}

const CruceroVision: React.FC<CruceroVisionProps> = ({ vessel }) => {
  const title = vessel?.title || 'The Vision: Design in Motion';
  const text = vessel?.description || 'Inspired by the minimalist lines of Japanese modernism and the expansive openness of the Aegean Sea.';

  return (
    <section className="py-32 px-8 max-w-7xl mx-auto bg-[#f6f7f8] grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
      <div className="lg:col-span-5 space-y-8">
        <div className="w-12 h-1 bg-[#0e1a34]"></div>
        <h2 className="font-['Newsreader'] text-5xl font-bold text-[#0e1a34] leading-tight">
          {title}
        </h2>
        <p className="text-[#45464d] leading-relaxed text-lg">
          {text}
        </p>
        <p className="text-[#45464d]/80 italic font-['Newsreader'] text-xl border-l-4 border-[#eacea9] pl-6">
          "We didn't build a ship. We sculpted a sanctuary that happens to move at 24 knots."
        </p>
        <div className="pt-4">
          <button className="px-8 py-3 border border-[#0e1a34] text-[#0e1a34] text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#0e1a34] hover:text-white transition-all">
            Discover the Heritage
          </button>
        </div>
      </div>
      <div className="lg:col-span-7 relative">
        <div className="grid grid-cols-2 gap-4">
          <div className="pt-12">
            <img 
              className="w-full aspect-3/4 object-cover shadow-sm" 
              alt="Minimalist interior architectural detail with sunlight shadow"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNjaQczAc8lH4px7FX8W57KbG-eOP0taWxMhoD_aejBVQ6m4YU_u-u_WV7X9fpcmxVispVlwSVOQqcvOCbK2qLOWaf9H53PxrDNuH7OV-0zt464gg7DRj9DfB8zejvA8s7wg3zc1lmQgXahboVsBX9-hdtSM8kFZaYA44g7xE9eKGbfHO1_ylBdai61gYtXVeyH27S0Wxzww1shSJhfAGsdSwjZ1sG277qdTNPxdigq5IkiG-im3ukXmLVBJ5vnjI427P4rmHT1KLA"
            />
          </div>
          <div>
            <img 
              className="w-full aspect-3/4 object-cover shadow-sm" 
              alt="Top view of yacht deck with teak wood and blue water"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUk5hMgHTf-sph7R9XJ6LoHG4wPDhIPhJOaPlE97IIBOwAaNAXh_y1LwSL1v5QnfJ_j8pNFqgweMTf7BHj33h-WPI5Ca1yb1nWg1MvJ76ok5-QMOmiLhf-84cNew4bl7J-JFqIYAmqEjZnygSdKTgn46sJyhKR9IhVMLtzGqlRi_wG1TZfGCy_w7d2Neb-rW6e0RuBY5buH6l_pePzLV4iP3p-g36jwAVcUHss7Ce-6tpRgGfpAhmZnImGkXhhmaXzhwzznId5mica"
            />
          </div>
        </div>
        <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-[#eacea9]/10 -z-10"></div>
      </div>
    </section>
  );
};

export default CruceroVision;