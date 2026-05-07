import React from 'react';
import type { ManageBookingData } from '../manageBookingData';

type Props = {
  booking?: ManageBookingData | null;
};

const CabinSelection: React.FC<Props> = ({ booking }) => {
  return (
    <div
      className="rounded-xl p-6"
      style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(16px)', border: '1px solid rgba(234,230,169,0.1)' }}
    >
      <div className="mb-6 flex items-center justify-between">
        <h4 className="flex items-center gap-3 text-xl font-bold text-white">
          <span className="material-symbols-outlined text-[#eacea9]">king_bed</span>
          Habitación seleccionada
        </h4>
      </div>

      {booking ? (
        <div className="rounded-lg border border-white/10 bg-white/[0.03] px-5 py-5">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Tipo de habitación</p>
          <p className="mt-2 text-xl font-bold text-white">{booking.suiteName}</p>
          <p className="mt-1 text-sm text-slate-400">{booking.destinationName}</p>
          {booking.suiteCapacity ? (
            <p className="mt-3 inline-flex rounded-full border border-[#eacea9]/20 bg-[#eacea9]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[#eacea9]">
              Capacidad {booking.suiteCapacity} huéspedes
            </p>
          ) : null}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-white/10 bg-white/[0.03] px-4 py-10 text-center">
          <span className="material-symbols-outlined mb-3 text-5xl text-[#eacea9]/30">bed</span>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Sin habitación seleccionada</p>
          <p className="mx-auto mt-2 max-w-md text-xs text-slate-500">
            La habitación aparecerá cuando exista una reserva activa.
          </p>
        </div>
      )}
    </div>
  );
};

export default CabinSelection;
