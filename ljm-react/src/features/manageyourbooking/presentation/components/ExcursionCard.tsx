"use client";

export interface Excursion {
  id: string;
  name: string;
  date: string;
  location: string;
  status: "Confirmed" | "Pending" | "Cancelled";
  imageUrl: string;
}

interface ExcursionCardProps {
  excursion: Excursion;
}

export function ExcursionCard({ excursion }: ExcursionCardProps) {
  const statusColors = {
    Confirmed: "text-green-400",
    Pending: "text-yellow-400",
    Cancelled: "text-red-400",
  };

  return (
    <div className="flex gap-4">
      <div
        className="w-16 h-16 rounded bg-cover bg-center shrink-0 border border-white/5"
        style={{ backgroundImage: `url('${excursion.imageUrl}')` }}
        title={excursion.name}
      />
      <div>
        <p className="text-sm font-bold text-white">{excursion.name}</p>
        <p className="text-[10px] text-slate-400 italic">
          {excursion.date} • {excursion.location}
        </p>
        <p className={`text-xs font-bold ${statusColors[excursion.status]}`}>
          {excursion.status}
        </p>
      </div>
    </div>
  );
}
