"use client";

import { BedDouble } from "lucide-react";

interface CabinSelectionProps {
  cabinName: string;
  suiteNumber: string;
  deck: string;
  amenities: string;
  description: string;
  imageUrl?: string;
  onChangeCabin?: () => void;
  onUpgrade?: () => void;
}

export function CabinSelection({
  cabinName = "Royal Ocean Suite",
  suiteNumber = "Suite 12402",
  deck = "DECK 12",
  amenities = "Private Balcony • Butler Service",
  description = "850 sq ft of pure luxury with panoramic floor-to-ceiling windows.",
  imageUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuBUFDF6X7qEIm7IH5N99obZDnx39YHSU9BlKDaCwR2WVIY3ge5-v_g4sjDJO0g1JupgSJhVn_7XDA5pRexE6WT_eBn3mvEHkbFo4eTtFZYGXR701Wr2ex8xtSeqe3fh3xNr5efUAbf3YIwbGDniUkkgA7wpJyrcHNvKUJpvjBIn7ih7kdVN1kPl4WmWDTGvO_za95Aul7mBYkrm2P-pAsofpt5TmovcrNui5UrIWtxeamnsSz72I9bx2WsFgjFPrcrNwQKaelTZMzzs",
  onChangeCabin,
  onUpgrade,
}: CabinSelectionProps) {
  return (
    <div className="glass-card rounded-xl p-6 bg-white/[0.02] backdrop-blur-md border border-[#eacea9]/10">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-xl font-serif font-bold flex items-center gap-3 text-white">
          <BedDouble className="w-5 h-5 text-[#eacea9]" />
          Cabin Selection
        </h4>
        <div className="flex gap-2">
          <button
            onClick={onChangeCabin}
            className="text-xs font-bold text-[#eacea9] hover:underline"
          >
            Change Cabin
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div
          className="w-full md:w-48 h-32 rounded-lg bg-cover bg-center border border-white/5"
          style={{ backgroundImage: `url('${imageUrl}')` }}
          title={`Luxury ${cabinName} cabin interior`}
        />
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <h5 className="text-lg font-bold text-white">{cabinName}</h5>
            <span className="bg-[#eacea9] text-[#0e1a34] text-[10px] font-black px-2 py-0.5 rounded">
              {deck}
            </span>
          </div>
          <p className="text-slate-400 text-sm mb-4 leading-relaxed">
            {suiteNumber} • {amenities} • {description}
          </p>
          <button
            onClick={onUpgrade}
            className="px-5 py-2 rounded bg-[#eacea9]/5 border border-[#eacea9]/20 text-[#eacea9] text-xs font-bold hover:bg-[#eacea9] hover:text-[#0e1a34] transition-all uppercase tracking-widest"
          >
            Upgrade Suite
          </button>
        </div>
      </div>
    </div>
  );
}
