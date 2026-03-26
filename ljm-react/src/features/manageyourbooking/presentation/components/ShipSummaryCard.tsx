"use client";

import { MapPin, CheckCircle } from "lucide-react";

interface ShipSummaryCardProps {
  shipName: string;
  itinerary: string;
  nights: number;
  embarkation: {
    location: string;
    date: string;
  };
  disembarkation: {
    location: string;
  };
  status: string;
  imageUrl?: string;
}

export function ShipSummaryCard({
  shipName = "The Majestic Pearl",
  itinerary = "Mediterranean Grandeur",
  nights = 14,
  embarkation = { location: "Barcelona, Spain", date: "Oct 12, 2024" },
  disembarkation = { location: "Venice, Italy" },
  status = "Ready to Sail",
  imageUrl = "https://lh3.googleusercontent.com/aida-public/AB6AXuCEve-Gj66wSMxndLIsP24trTnHOBzz4uptOmtrCWlYE8aK0VVuFeE4NqNcfpBJoUOqY3q72-XfSBBCkoRblcnjd1XH25rZQV2BuuaKYxak36ArI03UznYm_gHuHueKiEeMbO169J6o1x33jbuG0pef4t3JLXsz9xPxf0o2HWnHm3ROkVZyuF1zu71RzKiXPdcn1GfdH5ILDTVrqKgaDiwZb0XLhHyywDNrW2xIauj3yTF6sWzagzDjvjVgBZLwnpbLVQ-gSbvARUlc",
}: ShipSummaryCardProps) {
  return (
    <div className="glass-card rounded-xl overflow-hidden mb-10 flex flex-col md:flex-row shadow-2xl bg-white/[0.02] backdrop-blur-md border border-[#eacea9]/10">
      <div
        className="md:w-1/3 h-48 md:h-auto bg-cover bg-center"
        style={{ backgroundImage: `url('${imageUrl}')` }}
        title={`Luxury cruise ship ${shipName} at sea`}
      />
      <div className="p-8 flex-1 flex flex-col justify-center">
        <h3 className="text-2xl font-serif font-bold text-white mb-2">
          {shipName}
        </h3>
        <p className="text-slate-400 mb-6 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#eacea9]" />
          {itinerary} • {nights} Nights
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-[10px] uppercase text-[#eacea9]/60 font-bold tracking-wider">
              Embarkation
            </p>
            <p className="text-sm font-semibold text-white">
              {embarkation.location}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-[#eacea9]/60 font-bold tracking-wider">
              Date
            </p>
            <p className="text-sm font-semibold text-white">
              {embarkation.date}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-[#eacea9]/60 font-bold tracking-wider">
              Disembarkation
            </p>
            <p className="text-sm font-semibold text-white">
              {disembarkation.location}
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase text-[#eacea9]/60 font-bold tracking-wider">
              Status
            </p>
            <p className="text-sm font-semibold text-green-400 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              {status}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
