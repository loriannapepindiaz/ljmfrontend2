"use client";

import { Pencil, Trash2 } from "lucide-react";

export interface Guest {
  id: string;
  initials: string;
  name: string;
  membershipType: string;
  isElite?: boolean;
}

interface GuestCardProps {
  guest: Guest;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function GuestCard({ guest, onEdit, onDelete }: GuestCardProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-white/[0.03] rounded-lg border border-white/5">
      <div className={`flex items-center gap-4 ${!guest.isElite ? "opacity-80" : ""}`}>
        <div
          className={`h-12 w-12 rounded-full bg-[#0e1a34] flex items-center justify-center font-bold border ${
            guest.isElite
              ? "text-[#eacea9] border-[#eacea9]/20"
              : "text-slate-400 border-white/10"
          }`}
        >
          {guest.initials}
        </div>
        <div>
          <p className="font-bold text-white">{guest.name}</p>
          <p
            className={`text-xs font-bold tracking-tighter uppercase ${
              guest.isElite ? "text-[#eacea9]" : "text-slate-400"
            }`}
          >
            {guest.membershipType}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <button
          onClick={() => onEdit?.(guest.id)}
          className="text-slate-500 cursor-pointer hover:text-[#eacea9] transition-colors p-1"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete?.(guest.id)}
          className="text-slate-500 cursor-pointer hover:text-red-400 transition-colors ml-3 p-1"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
