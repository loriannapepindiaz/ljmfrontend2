"use client";

import { Users, PlusCircle } from "lucide-react";
import { GuestCard, type Guest } from "./GuestCard";

interface GuestListProps {
  guests: Guest[];
  onAddGuest?: () => void;
  onEditGuest?: (id: string) => void;
  onDeleteGuest?: (id: string) => void;
}

const defaultGuests: Guest[] = [
  {
    id: "1",
    initials: "AR",
    name: "Antonia Robles",
    membershipType: "Elite Member",
    isElite: true,
  },
  {
    id: "2",
    initials: "JD",
    name: "Julian Delgado",
    membershipType: "Guest",
    isElite: false,
  },
];

export function GuestList({
  guests = defaultGuests,
  onAddGuest,
  onEditGuest,
  onDeleteGuest,
}: GuestListProps) {
  return (
    <div className="glass-card rounded-xl p-6 bg-white/[0.02] backdrop-blur-md border border-[#eacea9]/10">
      <h4 className="text-xl font-serif font-bold mb-6 flex items-center gap-3 text-white">
        <Users className="w-5 h-5 text-[#eacea9]" />
        Guests
        <button
          onClick={onAddGuest}
          className="ml-auto text-xs font-bold text-[#eacea9] hover:underline flex items-center gap-1"
        >
          <PlusCircle className="w-4 h-4" />
          Add Guest
        </button>
      </h4>
      <div className="space-y-4">
        {guests.map((guest) => (
          <GuestCard
            key={guest.id}
            guest={guest}
            onEdit={onEditGuest}
            onDelete={onDeleteGuest}
          />
        ))}
      </div>
    </div>
  );
}
