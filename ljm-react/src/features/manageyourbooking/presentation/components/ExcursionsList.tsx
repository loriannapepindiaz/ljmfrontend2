"use client";

import { Compass } from "lucide-react";
import { ExcursionCard, type Excursion } from "./ExcursionCard";

interface ExcursionsListProps {
  excursions?: Excursion[];
  onAddExcursion?: () => void;
}

const defaultExcursions: Excursion[] = [
  {
    id: "1",
    name: "Cinque Terre Private Yacht",
    date: "Oct 15",
    location: "La Spezia",
    status: "Confirmed",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCTE5sjPeTwikbzNnIUnFLZCn3DpRfconZUQ4EY10TnJEjyPYpm15aWyUfHJ5DTKQrOYTb65phw1c8AisRGbePpIL49mT9P2emeYGzy5BEYPVAWrWULLDtZujUgyofM1cnLDq-VlhOYlbQJVQqb5fjNTBj6QilPQh4d3v3bxyrFmHDNZJgQXtImCWjGrBYBWlteuaAFWn_xv9JqVHsUZXusUI8pbg9-cW1690kOhqjHLgLTBTbB54ooNvMqVzEF-YOO_OLZnp-zdZoy",
  },
  {
    id: "2",
    name: "Eternal Rome: VIP Access",
    date: "Oct 18",
    location: "Civitavecchia",
    status: "Confirmed",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBpq-n1XQ8fh9001PkPc50lh71MLaWhuoxJkKdbT7N6HkMAshGAawvNeoECwZ_J74kVZGxS2wTV-v2981FfM1_YwB8av68hGkGSdOa4Jj9RAMtdNpAoggyX0pha3qF11HFsusiFI0VFqun1y9rEEREhJizE6pzCEu0lagARtibju6j5NWt6ELCQXZLwpXsVaBqOfDZDCfZezl26HYJSsb_ANiV9yMlTflDSk_kNUfJs74e2nCF25bcwydQcixH-uXV9s2F-b9x7OKj4",
  },
];

export function ExcursionsList({
  excursions = defaultExcursions,
  onAddExcursion,
}: ExcursionsListProps) {
  return (
    <div className="glass-card rounded-xl p-6 bg-white/[0.02] backdrop-blur-md border border-[#eacea9]/10">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-xl font-serif font-bold flex items-center gap-3 text-white">
          <Compass className="w-5 h-5 text-[#eacea9]" />
          Excursions
        </h4>
      </div>
      <div className="space-y-4 mb-6">
        {excursions.map((excursion) => (
          <ExcursionCard key={excursion.id} excursion={excursion} />
        ))}
      </div>
      <button
        onClick={onAddExcursion}
        className="w-full py-3 rounded-lg border border-[#eacea9]/30 text-[#eacea9] text-xs font-bold hover:bg-[#eacea9]/10 transition-all uppercase tracking-widest"
      >
        Add More Excursions
      </button>
    </div>
  );
}
