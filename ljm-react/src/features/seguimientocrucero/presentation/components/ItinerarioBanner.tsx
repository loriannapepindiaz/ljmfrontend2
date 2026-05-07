import React from 'react';
import type { ManageBookingData } from '../../../manageyourbooking/presentation/manageBookingData';
import { getBackendMediaUrl } from '../../../../lib/api';

const Sk: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse rounded-lg bg-white/10 ${className}`} />
);

const fmtDate = (d: string | null | undefined) =>
  d ? new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(d)) : null;

type Props = {
  booking: ManageBookingData | null;
  isLoading?: boolean;
};

const ItinerarioBanner: React.FC<Props> = ({ booking, isLoading }) => {
  if (isLoading && !booking) return (
    <div className="space-y-4">
      {/* Excursions skeleton */}
      <div className="rounded-3xl p-6 border border-white/8 bg-white/[0.03] space-y-4">
        <Sk className="h-4 w-36" />
        {[0, 1].map(i => (
          <div key={i} className="flex items-center gap-4">
            <Sk className="size-12 rounded-xl shrink-0" />
            <div className="flex-1 space-y-1.5">
              <Sk className="h-4 w-40" />
              <Sk className="h-3 w-24" />
            </div>
            <Sk className="h-6 w-16 rounded-full" />
          </div>
        ))}
      </div>
      {/* Guide banner skeleton */}
      <div className="rounded-3xl p-7 border border-white/8 bg-white/[0.03]">
        <Sk className="h-6 w-48" />
        <Sk className="h-4 w-full mt-3" />
        <Sk className="h-4 w-3/4 mt-2" />
      </div>
    </div>
  );

  if (!booking) return null;

  const excursions = booking.excursions ?? [];
  const depLabel = fmtDate(booking.departureDate);
  const retLabel = fmtDate(booking.returnDate);

  return (
    <div className="space-y-4">
      {/* Excursions card */}
      {excursions.length > 0 && (
        <div className="rounded-3xl p-6 border border-white/8 bg-white/[0.03] backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined text-[#c8a96e]">explore</span>
            <h3 className="text-sm font-bold text-white uppercase tracking-widest">
              Experiencias Reservadas
            </h3>
            <span className="ml-auto text-[10px] font-bold text-[#c8a96e]/60 bg-[#c8a96e]/10 px-2 py-0.5 rounded-full">
              {excursions.length}
            </span>
          </div>

          <div className="space-y-3">
            {excursions.map((exc, i) => (
              <div
                key={String(exc.id ?? i)}
                className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors"
              >
                <div className="size-12 rounded-xl overflow-hidden bg-white/5 border border-white/8 shrink-0 flex items-center justify-center">
                  {getBackendMediaUrl(exc.imagen) ? (
                    <img
                      alt={exc.nombre}
                      className="h-full w-full object-cover"
                      src={getBackendMediaUrl(exc.imagen)!}
                      onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                    />
                  ) : (
                    <span className="material-symbols-outlined text-xl text-slate-500">explore</span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">{exc.nombre}</p>
                  <p className="text-[10px] text-slate-500 font-medium mt-0.5">{exc.puerto}</p>
                </div>

                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400">
                    {exc.estado}
                  </span>
                  {exc.precio != null && exc.precio > 0 && (
                    <span className="text-[10px] text-[#c8a96e] font-bold">
                      {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(exc.precio)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trip guide banner */}
      <div className="relative rounded-3xl overflow-hidden border border-[#c8a96e]/15 bg-gradient-to-br from-[#c8a96e]/8 via-transparent to-transparent">
        {booking.destinationImage && (
          <>
            <img
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover opacity-10"
              src={booking.destinationImage}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#060f1e]/90 to-[#060f1e]/60" />
          </>
        )}

        <div className="relative p-7 md:p-8 flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1 space-y-2">
            <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#c8a96e]/60">Guía Digital del Viaje</p>
            <h4 className="text-xl font-black text-white leading-tight">
              {booking.destinationName}
            </h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              {[
                depLabel ? `Salida ${depLabel}` : null,
                retLabel ? `Regreso ${retLabel}` : null,
                booking.nights ? `${booking.nights} noches` : null,
              ].filter(Boolean).join(' · ')}
            </p>
          </div>

          <div className="flex flex-col gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-lg text-[#c8a96e]">directions_boat</span>
              <div>
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Salida</p>
                <p className="text-xs font-bold text-white">{depLabel ?? '—'}</p>
              </div>
            </div>
            <div className="w-px h-4 bg-white/10 ml-3.5" />
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-lg text-[#c8a96e]">anchor</span>
              <div>
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Regreso</p>
                <p className="text-xs font-bold text-white">{retLabel ?? '—'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItinerarioBanner;
