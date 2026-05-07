import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { ManageBookingData, ItineraryStop } from '../../../manageyourbooking/presentation/manageBookingData';

const Sk: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse rounded-lg bg-white/10 ${className}`} />
);

const fmtDate = (d: string | null | undefined) =>
  d ? new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: 'short' }).format(new Date(d)) : null;

const statusDot = (status: ItineraryStop['status']) => ({
  completed: 'bg-[#c8a96e] shadow-[0_0_10px_#c8a96e55]',
  current:   'bg-emerald-400 shadow-[0_0_12px_#34d39966] animate-pulse',
  upcoming:  'bg-white/20',
}[status]);

const statusLine = (status: ItineraryStop['status']) => ({
  completed: 'bg-gradient-to-b from-[#c8a96e] to-[#c8a96e]/40',
  current:   'bg-gradient-to-b from-[#c8a96e]/40 to-white/10',
  upcoming:  'bg-white/10',
}[status]);

const buildFallbackStops = (booking: ManageBookingData): ItineraryStop[] => {
  const now = Date.now();
  const dep = booking.departureDate ? new Date(booking.departureDate).getTime() : null;
  const ret = booking.returnDate ? new Date(booking.returnDate).getTime() : null;

  const getStatus = (from: number | null, to: number | null): ItineraryStop['status'] => {
    if (!from) return 'upcoming';
    if (now < from) return 'upcoming';
    if (to && now < to) return 'current';
    return 'completed';
  };

  return [
    {
      port: 'Puerto de origen',
      country: '',
      arrivalDate: null,
      departureDate: booking.departureDate ?? null,
      status: dep && now > dep ? 'completed' : 'upcoming',
      order: 0,
    },
    {
      port: booking.destinationName,
      country: booking.route ?? '',
      arrivalDate: null,
      departureDate: null,
      status: getStatus(dep, ret),
      order: 1,
    },
    {
      port: 'Puerto de regreso',
      country: '',
      arrivalDate: booking.returnDate ?? null,
      departureDate: null,
      status: ret && now > ret ? 'completed' : 'upcoming',
      order: 2,
    },
  ];
};

type Props = {
  booking: ManageBookingData | null;
  isLoading?: boolean;
};

const RutaProgreso: React.FC<Props> = ({ booking, isLoading }) => {
  const navigate = useNavigate();

  if (isLoading && !booking) return (
    <div className="rounded-3xl p-7 border border-white/8 bg-white/[0.03] backdrop-blur-sm space-y-6">
      <Sk className="h-5 w-40" />
      <div className="space-y-8 pl-10 relative">
        <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-white/10 rounded-full" />
        {[0, 1, 2].map(i => (
          <div key={i} className="space-y-1.5">
            <Sk className="h-3 w-16" />
            <Sk className="h-5 w-32" />
            <Sk className="h-3 w-24" />
          </div>
        ))}
      </div>
      <Sk className="h-12 w-full rounded-xl" />
    </div>
  );

  const stops: ItineraryStop[] = booking
    ? (booking.itineraryStops?.length ? booking.itineraryStops : buildFallbackStops(booking))
    : [];

  return (
    <div className="rounded-3xl p-7 border border-white/8 bg-white/[0.03] backdrop-blur-sm flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-[#c8a96e]">route</span>
        <h3 className="text-sm font-bold text-white uppercase tracking-widest">Ruta del Viaje</h3>
        {booking?.itineraryName && (
          <span className="ml-auto text-[10px] text-[#c8a96e]/60 font-semibold">{booking.itineraryName}</span>
        )}
      </div>

      {stops.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-5 py-10 text-center">
          <span className="material-symbols-outlined text-4xl text-slate-600">map</span>
          <p className="mt-3 text-xs font-bold uppercase tracking-widest text-slate-500">Sin itinerario disponible</p>
        </div>
      ) : (
        <div className="relative pl-10 space-y-8">
          {stops.map((stop, idx) => {
            const date = fmtDate(stop.arrivalDate ?? stop.departureDate);
            const isLast = idx === stops.length - 1;

            return (
              <div key={`${stop.port}-${idx}`} className="relative">
                {/* Dot */}
                <div className={`absolute -left-10 top-1 size-3 rounded-full border-2 border-[#060f1e] ${statusDot(stop.status)}`} />
                {/* Vertical line */}
                {!isLast && (
                  <div className={`absolute -left-[34px] top-5 bottom-[-26px] w-0.5 ${statusLine(stop.status)}`} />
                )}

                <div className="space-y-0.5">
                  {date && (
                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#c8a96e]/60">{date}</p>
                  )}
                  <h4 className="text-base font-bold text-white leading-tight">{stop.port}</h4>
                  {stop.country && (
                    <p className="text-[11px] text-slate-500 font-medium">{stop.country}</p>
                  )}
                  <span className={`inline-block mt-1 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                    stop.status === 'completed' ? 'bg-[#c8a96e]/10 text-[#c8a96e]' :
                    stop.status === 'current'   ? 'bg-emerald-500/15 text-emerald-400' :
                                                  'bg-white/5 text-slate-500'
                  }`}>
                    {stop.status === 'completed' ? 'Completado' : stop.status === 'current' ? 'Aquí ahora' : 'Próximo'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <button
        onClick={() => navigate('/manage-booking')}
        className="w-full py-3.5 rounded-2xl border border-[#c8a96e]/30 text-[#c8a96e] font-bold text-xs tracking-widest uppercase hover:bg-[#c8a96e]/10 transition-all flex items-center justify-center gap-2 mt-auto"
      >
        Gestionar reserva
        <span className="material-symbols-outlined text-sm">arrow_forward</span>
      </button>
    </div>
  );
};

export default RutaProgreso;
