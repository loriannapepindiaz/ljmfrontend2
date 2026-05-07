import React from 'react';
import type { ManageBookingData } from '../manageBookingData';

type Props = {
  booking?: ManageBookingData | null;
  isLoading?: boolean;
};

const HeroSection: React.FC<Props> = ({ booking, isLoading }) => {
  const title = booking?.destinationName ?? 'Gestiona tu reserva';
  const subtitle = booking?.route ?? (!isLoading ? 'Sin reserva activa' : '');

  return (
    <div className="mb-10">
      <div className="flex flex-col gap-4">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#eacea9]">
            Gestión de reserva
          </p>
          <h1 className="mb-3 text-4xl font-bold text-white md:text-5xl">
            {title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-slate-400">
            {booking ? (
              <span className="rounded-full border border-[#eacea9]/20 bg-[#eacea9]/10 px-3 py-1 text-xs font-bold text-[#eacea9]">
                Reserva {booking.reference}
              </span>
            ) : null}
            {!isLoading && !booking ? (
              <span className="rounded-full border border-[#eacea9]/20 bg-[#eacea9]/10 px-3 py-1 text-xs font-bold text-[#eacea9]">
                Sin reserva activa
              </span>
            ) : null}
            {subtitle ? <span>{subtitle}</span> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
