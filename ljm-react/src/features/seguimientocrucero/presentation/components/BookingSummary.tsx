import React from 'react';
import type { ManageBookingData } from '../../../manageyourbooking/presentation/manageBookingData';

const Sk: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse rounded-lg bg-white/10 ${className}`} />
);

const statusColor = (status: string) => {
  const s = status.toLowerCase();
  if (s.includes('pagad') || s.includes('confirmad') || s.includes('activ')) return 'text-emerald-400';
  if (s.includes('pend')) return 'text-amber-400';
  return 'text-slate-400';
};

type Props = {
  booking: ManageBookingData | null;
  isLoading?: boolean;
};

const BookingSummary: React.FC<Props> = ({ booking, isLoading }) => {
  if (isLoading && !booking) return (
    <div className="rounded-3xl p-7 border border-white/8 bg-white/4 backdrop-blur-sm space-y-5">
      <Sk className="h-3 w-28" />
      <Sk className="h-8 w-48" />
      <div className="border-t border-white/8 pt-5 space-y-3">
        {[0, 1, 2].map(i => <Sk key={i} className="h-4 w-full" />)}
      </div>
      <div className="space-y-3">
        {[0, 1].map(i => (
          <div key={i} className="flex items-center gap-3">
            <Sk className="size-9 rounded-xl shrink-0" />
            <div className="space-y-1.5 flex-1">
              <Sk className="h-3 w-24" />
              <Sk className="h-4 w-36" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (!booking) return null;

  const companions = (booking.guests ?? []).filter(g => !g.isElite);
  const titular = (booking.guests ?? []).find(g => g.isElite);

  return (
    <div className="rounded-3xl p-7 border border-white/8 bg-white/[0.03] backdrop-blur-sm flex flex-col gap-5 relative overflow-hidden">
      <div className="absolute top-0 right-0 opacity-[0.04] pointer-events-none select-none">
        <span className="material-symbols-outlined text-[120px] text-[#eacea9]">confirmation_number</span>
      </div>

      {/* Reference */}
      <div>
        <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-[#c8a96e]/70 mb-1">Referencia de Reserva</p>
        <p className="text-2xl font-black text-white tracking-tight">{booking.reference}</p>
      </div>

      {/* Status + Payment */}
      <div className="flex items-center gap-3 border-t border-white/8 pt-5">
        <div className="flex-1">
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-500 mb-1">Estado</p>
          <p className={`text-sm font-bold ${statusColor(booking.status)}`}>{booking.status}</p>
        </div>
        <div className="w-px h-8 bg-white/10" />
        <div className="flex-1">
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-500 mb-1">Pago</p>
          <p className={`text-sm font-bold ${statusColor(booking.paymentStatus)}`}>{booking.paymentStatus}</p>
        </div>
        <div className="w-px h-8 bg-white/10" />
        <div className="flex-1">
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-500 mb-1">Total</p>
          <p className="text-sm font-bold text-[#eacea9]">{booking.total}</p>
        </div>
      </div>

      {/* Passengers */}
      {(booking.guests.length > 0 || (booking.guestCount ?? 0) > 0) && (
        <div className="space-y-3 border-t border-white/8 pt-5">
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-500">Pasajeros</p>
          {booking.guests.length > 0 ? (
            <>
              {titular && (
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-xl bg-[#c8a96e]/20 border border-[#c8a96e]/30 flex items-center justify-center shrink-0">
                    <span className="text-[11px] font-black text-[#c8a96e]">{titular.initials}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white leading-none">{titular.name}</p>
                    <p className="text-[10px] text-[#c8a96e] font-semibold mt-0.5">Titular</p>
                  </div>
                </div>
              )}
              {companions.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {companions.map(g => (
                    <div
                      key={String(g.id ?? g.name)}
                      title={g.name}
                      className="size-8 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center"
                    >
                      <span className="text-[10px] font-black text-slate-300">{g.initials}</span>
                    </div>
                  ))}
                  <p className="w-full text-[10px] text-slate-500 mt-0.5">
                    + {companions.length} acompañante{companions.length !== 1 ? 's' : ''}
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: booking.guestCount ?? 1 }).map((_, i) => (
                <div
                  key={i}
                  className="size-8 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-sm text-slate-400">person</span>
                </div>
              ))}
              <p className="w-full text-[10px] text-slate-500 mt-0.5">
                {booking.guestCount ?? 1} pasajero{(booking.guestCount ?? 1) !== 1 ? 's' : ''} registrado{(booking.guestCount ?? 1) !== 1 ? 's' : ''}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Animal companion */}
      {booking.animalCompanion && (
        <div className="flex items-center gap-3 border-t border-white/8 pt-4">
          <div className="size-9 rounded-xl bg-amber-500/10 border border-amber-400/20 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-lg text-amber-400">pets</span>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Compañero animal</p>
            <p className="text-sm font-bold text-white">
              {booking.animalCompanion.nombre} · {booking.animalCompanion.tipoAnimal}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingSummary;
