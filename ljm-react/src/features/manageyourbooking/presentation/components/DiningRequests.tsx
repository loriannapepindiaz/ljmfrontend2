"use client";

import { Utensils, Plus, Trash2 } from "lucide-react";

interface DiningReservation {
  id: string;
  type: "dining" | "preference";
  title: string;
  venue?: string;
  dateTime?: string;
  note?: string;
}

interface DiningRequestsProps {
  reservations?: DiningReservation[];
  onAddRequest?: () => void;
  onBookDining?: () => void;
  onDeleteReservation?: (id: string) => void;
}

const defaultReservations: DiningReservation[] = [
  {
    id: "1",
    type: "dining",
    title: "Confirmed Specialty Dining",
    venue: "The Pearl Oyster",
    dateTime: "Oct 14 • 8:30 PM",
  },
  {
    id: "2",
    type: "preference",
    title: "Dietary Preferences",
    venue: "Plant-based / Gluten Free",
    note: "Noted for all venues",
  },
];

export function DiningRequests({
  reservations = defaultReservations,
  onAddRequest,
  onBookDining,
  onDeleteReservation,
}: DiningRequestsProps) {
  return (
    <div className="glass-card rounded-xl p-6 bg-white/[0.02] backdrop-blur-md border border-[#eacea9]/10">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-xl font-serif font-bold flex items-center gap-3 text-white">
          <Utensils className="w-5 h-5 text-[#eacea9]" />
          Dining &amp; Requests
        </h4>
        <div className="flex gap-3">
          <button
            onClick={onAddRequest}
            className="px-3 py-1.5 rounded border border-[#eacea9]/30 text-[#eacea9] text-[10px] font-bold hover:bg-[#eacea9]/10 transition-all uppercase tracking-widest flex items-center gap-1"
          >
            <Plus className="w-3 h-3" /> Add Request
          </button>
          <button
            onClick={onBookDining}
            className="px-3 py-1.5 rounded bg-[#eacea9]/10 border border-[#eacea9]/20 text-[#eacea9] text-[10px] font-bold hover:bg-[#eacea9]/20 transition-all uppercase tracking-widest"
          >
            Book Dining
          </button>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {reservations.map((reservation) => (
          <div
            key={reservation.id}
            className="p-4 rounded-lg border border-white/5 bg-white/[0.03] flex justify-between items-start"
          >
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase mb-1">
                {reservation.title}
              </p>
              <p className="font-bold text-white">{reservation.venue}</p>
              <p className="text-xs text-[#eacea9]">
                {reservation.dateTime || reservation.note}
              </p>
            </div>
            <button
              onClick={() => onDeleteReservation?.(reservation.id)}
              className="text-slate-500 hover:text-red-400 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
