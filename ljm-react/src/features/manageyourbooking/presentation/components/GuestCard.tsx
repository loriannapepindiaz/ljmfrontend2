import React from 'react';

interface Guest {
  initials: string;
  name: string;
  role: string;
  isElite?: boolean;
}

interface GuestCardProps {
  guest: Guest;
  onEdit?: () => void;
  onDelete?: () => void;
}

const GuestCard: React.FC<GuestCardProps> = ({ guest, onEdit, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white/[0.03] rounded-lg border border-white/5">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-[#0e1a34] flex items-center justify-center font-bold text-[#eacea9] border border-[#eacea9]/20">
          {guest.initials}
        </div>
        <div>
          <p className="font-bold text-white">{guest.name}</p>
          <p className={`text-xs font-bold tracking-tighter uppercase ${guest.isElite ? 'text-[#eacea9]' : 'text-slate-400'}`}>
            {guest.role}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={onEdit} className="text-slate-500 hover:text-[#eacea9] transition-colors">
          <span className="material-symbols-outlined">edit</span>
        </button>
        <button onClick={onDelete} className="text-slate-500 hover:text-red-400 transition-colors">
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>
    </div>
  );
};

export default GuestCard;