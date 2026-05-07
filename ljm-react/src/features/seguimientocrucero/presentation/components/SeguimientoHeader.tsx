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
  <section className="relative w-full min-h-[480px] flex flex-col items-center justify-center overflow-hidden bg-[#060f1e]">
    <div className="absolute inset-0 bg-gradient-to-br from-[#0e1a34] via-[#060f1e] to-[#06101e]" />
    <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center gap-6">
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
    upcoming:  { label: 'Próximo',           cls: 'bg-blue-500/20 text-blue-200 border-blue-400/30',         dot: 'bg-blue-400' },
    sailing:   { label: 'En navegación',     cls: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/30', dot: 'bg-emerald-400' },
    completed: { label: 'Viaje finalizado',  cls: 'bg-slate-500/20 text-slate-300 border-slate-400/30',       dot: 'bg-slate-400' },
    unknown:   { label: 'Confirmado',        cls: 'bg-[#c8a96e]/15 text-[#eacea9] border-[#c8a96e]/30',       dot: 'bg-[#c8a96e]' },
  }[status];

  return (
    <section className="relative w-full min-h-[480px] flex flex-col items-center justify-center overflow-hidden bg-[#060f1e]">

      {/* Background layers — no image needed */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d1b35] via-[#060f1e] to-[#06101e]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(200,169,110,0.07),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_100%,rgba(6,15,30,0.9),transparent)]" />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'linear-gradient(rgba(234,206,169,1) 1px, transparent 1px), linear-gradient(90deg, rgba(234,206,169,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Gold top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c8a96e]/40 to-transparent" />

      {/* Glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full bg-[#c8a96e]/[0.04] blur-[90px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center text-center gap-5 py-16">

        {/* Eyebrow */}
        <div className="flex items-center gap-3">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#c8a96e]/50" />
          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#c8a96e]">
            Seguimiento de Viaje
          </span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#c8a96e]/50" />
        </div>

        {/* Destination name */}
        <h1 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tight">
          {booking?.destinationName || booking?.cruiseName || 'Tu Crucero LJM'}
        </h1>

        {/* Cruise · Suite subtitle */}
        {cruiseLabel && (
          <p className="text-base md:text-lg text-[#eacea9]/65 font-light tracking-wide">
            {cruiseLabel}
          </p>
        )}

        {/* Status badge */}
        <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[11px] font-bold uppercase tracking-widest ${statusBadge.cls}`}>
          <span className={`size-1.5 rounded-full animate-pulse ${statusBadge.dot}`} />
          {statusBadge.label}
        </span>

        {/* Countdown */}
        {status === 'upcoming' && (
          <div className="flex gap-2 sm:gap-3 mt-1 w-full justify-center overflow-x-auto pb-1 px-2">
            {[
              { value: days,    label: 'Días' },
              { value: hours,   label: 'Horas' },
              { value: minutes, label: 'Min' },
              { value: seconds, label: 'Seg' },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center shrink-0 w-[62px] sm:w-[72px] bg-white/[0.06] border border-white/10 rounded-2xl px-2 sm:px-4 py-3"
              >
                <span className="text-3xl sm:text-4xl md:text-5xl font-black text-white tabular-nums leading-none">
                  {pad(value)}
                </span>
                <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#eacea9]/50 mt-1.5">
                  {label}
                </span>
              </div>
            ))}
          </div>
        )}

        {status === 'sailing' && (
          <div className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-emerald-500/10 border border-emerald-400/20">
            <span className="material-symbols-outlined text-2xl text-emerald-300">directions_boat</span>
            <span className="text-base font-bold text-emerald-200 tracking-wide">En navegación ahora mismo</span>
          </div>
        )}

        {status === 'completed' && (
          <div className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10">
            <span className="material-symbols-outlined text-2xl text-[#eacea9]/60">check_circle</span>
            <span className="text-base font-bold text-slate-300 tracking-wide">Viaje completado</span>
          </div>
        )}

        {/* Dates strip */}
        {(depLabel || retLabel) && (
          <div className="flex flex-wrap justify-center items-center gap-3 px-4 sm:px-6 py-3 rounded-full bg-white/[0.04] border border-white/8 mt-1">
            {depLabel && (
              <span className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[#eacea9]/75 font-medium whitespace-nowrap">
                <span className="material-symbols-outlined text-sm text-[#c8a96e]">directions_boat</span>
                {depLabel}
              </span>
            )}
            {depLabel && retLabel && <span className="text-white/15 font-light">→</span>}
            {retLabel && (
              <span className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[#eacea9]/75 font-medium whitespace-nowrap">
                <span className="material-symbols-outlined text-sm text-[#c8a96e]">anchor</span>
                {retLabel}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#060f1e] to-transparent pointer-events-none" />
    </section>
  );
};

export default SeguimientoHeader;
