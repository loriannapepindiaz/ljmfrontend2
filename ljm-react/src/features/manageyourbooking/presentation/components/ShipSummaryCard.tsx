import React from 'react';
import type { ManageBookingData } from '../manageBookingData';

type Props = {
  booking?: ManageBookingData | null;
};

const ShipSummaryCard: React.FC<Props> = ({ booking }) => {
  return (
    <div
      className="mb-8 flex flex-col overflow-hidden rounded-xl shadow-xl md:flex-row"
      style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(16px)', border: '1px solid rgba(234,230,169,0.1)' }}
    >
      <div className="flex h-40 items-center justify-center bg-white/[0.03] md:h-52 md:w-[34%]">
        {booking?.destinationImage ? (
          <img
            alt={booking.destinationName}
            className="h-full w-full object-cover"
            src={booking.destinationImage}
          />
        ) : (
          <span className="material-symbols-outlined text-5xl text-[#eacea9]/20">travel_explore</span>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-center p-5 md:p-6">
        <h3 className="mb-2 text-xl font-bold text-white md:text-2xl">{booking?.destinationName ?? 'Destino de la reserva'}</h3>
        <p className="mb-4 flex items-center gap-2 text-sm text-slate-400">
          <span className="material-symbols-outlined text-base text-[#eacea9]">info</span>
          {booking?.route ?? 'Los detalles aparecerán cuando exista una reserva activa.'}
        </p>
        {booking ? (
          <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
            <span><strong className="text-[#eacea9]">Estado:</strong> {booking.status}</span>
            <span><strong className="text-[#eacea9]">Habitación:</strong> {booking.suiteName}</span>
            <span><strong className="text-[#eacea9]">Total:</strong> {booking.total}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ShipSummaryCard;
