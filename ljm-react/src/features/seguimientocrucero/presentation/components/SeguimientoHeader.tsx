import React, { useEffect, useState } from 'react';
import type { ManageBookingData } from '../../../manageyourbooking/presentation/manageBookingData';

type CountdownState = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  status: 'upcoming' | 'sailing' | 'completed' | 'unknown';
};

const useCountdown = (depDate: string | null | undefined, retDate: string | null | undefined): CountdownState => {
  const [state, setState] = useState<CountdownState>({ days: 0, hours: 0, minutes: 0, seconds: 0, status: 'unknown' });

  useEffect(() => {
    if (!depDate) { setState(s => ({ ...s, status: 'unknown' })); return; }

    const tick = () => {
      const now = Date.now();
      const dep = new Date(depDate).getTime();
      const ret = retDate ? new Date(retDate).getTime() : null;

      if (Number.isNaN(dep)) { setState(s => ({ ...s, status: 'unknown' })); return; }

      if (now < dep) {
        const diff = dep - now;
        setState({
          days: Math.floor(diff / 86400000),
          hours: Math.floor((diff % 86400000) / 3600000),
          minutes: Math.floor((diff % 3600000) / 60000),
          seconds: Math.floor((diff % 60000) / 1000),
          status: 'upcoming',
        });
      } else if (ret && now < ret) {
        setState({ days: 0, hours: 0, minutes: 0, seconds: 0, status: 'sailing' });
      } else {
        setState({ days: 0, hours: 0, minutes: 0, seconds: 0, status: 'completed' });
      }
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [depDate, retDate]);

  return state;
};

const fmtDate = (d: string | null | undefined) =>
  d ? new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(d)) : null;

const pad = (n: number) => String(n).padStart(2, '0');

const SkeletonHeader: React.FC = () => (
  <section className="relative w-full h-[620px] flex flex-col items-center justify-center overflow-hidden bg-[#060f1e]">
    <div className="absolute inset-0 bg-gradient-to-t from-[#060f1e] via-[#0e1a34]/70 to-[#0e1a34]/40" />
    <div className="z-10 w-full max-w-4xl px-6 flex flex-col items-center gap-6">
      <div className="h-3 w-28 rounded-full bg-white/10 animate-pulse" />
      <div className="h-14 w-2/3 rounded-2xl bg-white/10 animate-pulse" />
      <div className="h-5 w-80 rounded-xl bg-white/10 animate-pulse" />
      <div className="flex gap-4 mt-4">
        {[0, 1, 2, 3].map(i => (
          <div key={i} className="w-20 h-24 rounded-2xl bg-white/10 animate-pulse" />
        ))}
      </div>
    </div>
  </section>
);

type Props = {
  booking: ManageBookingData | null;
  isLoading?: boolean;
};

const SeguimientoHeader: React.FC<Props> = ({ booking, isLoading }) => {
  const { days, hours, minutes, seconds, status } = useCountdown(booking?.departureDate, booking?.returnDate);

  if (isLoading && !booking) return <SkeletonHeader />;

  const depLabel = fmtDate(booking?.departureDate);
  const retLabel = fmtDate(booking?.returnDate);
  const cruiseLabel = [booking?.cruiseName, booking?.suiteName].filter(Boolean).join(' · ');

  const statusBadge = {
    upcoming: { label: 'Próximo', cls: 'bg-blue-500/20 text-blue-200 border-blue-400/30' },
    sailing:  { label: 'En navegación', cls: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/30' },
    completed:{ label: 'Viaje finalizado', cls: 'bg-slate-500/20 text-slate-300 border-slate-400/30' },
    unknown:  { label: 'Confirmado', cls: 'bg-[#eacea9]/15 text-[#eacea9] border-[#eacea9]/30' },
  }[status];

  return (
    <section className="relative w-full min-h-[620px] flex flex-col items-center justify-center overflow-hidden bg-[#060f1e]">
      {booking?.destinationImage && (
        <img
          alt={booking.destinationName}
          className="absolute inset-0 h-full w-full object-cover"
          src={booking.destinationImage}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#060f1e] via-[#0e1a34]/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#060f1e]/30 via-transparent to-transparent" />

      <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center text-center gap-5 py-16">
        <span className="text-[10px] font-bold uppercase tracking-[0.45em] text-[#c8a96e]">
          Seguimiento de Viaje
        </span>

        <h1 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tight drop-shadow-lg">
          {booking?.destinationName || 'Tu Crucero LJM'}
        </h1>

        {cruiseLabel && (
          <p className="text-base md:text-lg text-[#eacea9]/75 font-light tracking-wide">
            {cruiseLabel}
          </p>
        )}

        <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[11px] font-bold uppercase tracking-widest ${statusBadge.cls}`}>
          <span className="size-1.5 rounded-full bg-current animate-pulse" />
          {statusBadge.label}
        </span>

        {/* Countdown */}
        {status === 'upcoming' && (
          <div className="flex gap-3 mt-2">
            {[
              { value: days,    label: 'Días' },
              { value: hours,   label: 'Horas' },
              { value: minutes, label: 'Min' },
              { value: seconds, label: 'Seg' },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center min-w-[72px] bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl px-4 py-3 shadow-xl"
              >
                <span className="text-4xl md:text-5xl font-black text-white tabular-nums leading-none">
                  {pad(value)}
                </span>
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#eacea9]/60 mt-1.5">
                  {label}
                </span>
              </div>
            ))}
          </div>
        )}

        {status === 'sailing' && (
          <div className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-emerald-500/15 border border-emerald-400/20 backdrop-blur-sm">
            <span className="material-symbols-outlined text-2xl text-emerald-300">directions_boat</span>
            <span className="text-base font-bold text-emerald-200 tracking-wide">En navegación ahora mismo</span>
          </div>
        )}

        {status === 'completed' && (
          <div className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <span className="material-symbols-outlined text-2xl text-[#eacea9]/60">check_circle</span>
            <span className="text-base font-bold text-slate-300 tracking-wide">Viaje completado</span>
          </div>
        )}

        {/* Dates strip */}
        {(depLabel || retLabel) && (
          <div className="flex items-center gap-4 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mt-1">
            {depLabel && (
              <span className="flex items-center gap-2 text-xs text-[#eacea9]/80 font-medium">
                <span className="material-symbols-outlined text-sm text-[#c8a96e]">directions_boat</span>
                {depLabel}
              </span>
            )}
            {depLabel && retLabel && (
              <span className="text-white/20 font-light">→</span>
            )}
            {retLabel && (
              <span className="flex items-center gap-2 text-xs text-[#eacea9]/80 font-medium">
                <span className="material-symbols-outlined text-sm text-[#c8a96e]">anchor</span>
                {retLabel}
              </span>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default SeguimientoHeader;
