"use client";

import { HelpCircle } from "lucide-react";

interface HeroSectionProps {
  bookingId: string;
  status: string;
  dateRange: string;
  onSupport?: () => void;
}

export function HeroSection({
  bookingId = "#SV-8831",
  status = "Confirmed",
  dateRange = "Oct 12 - Oct 26, 2024",
  onSupport,
}: HeroSectionProps) {
  return (
    <div className="mb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-[#eacea9] uppercase tracking-[0.2em] text-xs font-bold mb-2">
            Booking Management
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3">
            Manage Your Booking
          </h1>
          <div className="flex items-center gap-3 text-slate-400">
            <span className="bg-[#eacea9]/10 text-[#eacea9] border border-[#eacea9]/20 px-3 py-1 rounded-full text-xs font-bold">
              {bookingId}
            </span>
            <span className="text-sm">
              {status} • {dateRange}
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onSupport}
            className="px-6 py-2.5 rounded-lg bg-[#eacea9] text-[#0e1a34] font-bold text-sm hover:brightness-110 transition-all flex items-center gap-2"
          >
            <HelpCircle className="w-4 h-4" />
            Support
          </button>
        </div>
      </div>
    </div>
  );
}
