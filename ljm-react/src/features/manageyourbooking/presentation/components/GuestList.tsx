import React from 'react';
import GuestCard from './GuestCard';
import type { ManageBookingData } from '../manageBookingData';

type Props = {
  guests?: ManageBookingData['guests'];
  onAddGuest?: () => void;
  onEditGuest?: (guest: ManageBookingData['guests'][number]) => void;
  onDeleteGuest?: (guest: ManageBookingData['guests'][number]) => void;
};

const GuestList: React.FC<Props> = ({ guests = [], onAddGuest, onEditGuest, onDeleteGuest }) => {
  return (
    <div
      className="rounded-xl p-6"
      style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(16px)', border: '1px solid rgba(234,230,169,0.1)' }}
    >
      <h4 className="mb-6 flex items-center gap-3 text-xl font-bold text-white">
        <span className="material-symbols-outlined text-[#eacea9]">group</span>
        Huéspedes
        <button
          onClick={onAddGuest}
          className="ml-auto inline-flex items-center gap-2 rounded-md border border-[#eacea9]/25 px-3 py-2 text-xs font-bold text-[#eacea9] transition hover:bg-[#eacea9]/10"
          type="button"
        >
          <span aria-hidden="true" className="text-base leading-none">+</span>
          Añadir huésped
        </button>
      </h4>

      <div className="space-y-4">
        {guests.length === 0 ? (
          <div className="rounded-lg border border-dashed border-white/10 bg-white/[0.03] px-4 py-8 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Sin huéspedes registrados</p>
            <p className="mt-2 text-xs text-slate-500">Los huéspedes aparecerán cuando se agreguen a la reserva.</p>
          </div>
        ) : guests.map((guest) => (
          <GuestCard
            key={guest.id ?? guest.initials}
            guest={guest}
            onEdit={() => onEditGuest?.(guest)}
            onDelete={() => onDeleteGuest?.(guest)}
          />
        ))}
      </div>
    </div>
  );
};

export default GuestList;
