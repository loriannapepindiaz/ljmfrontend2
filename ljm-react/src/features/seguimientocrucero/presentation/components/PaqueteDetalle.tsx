import React from 'react';
import type { ManageBookingData } from '../../../manageyourbooking/presentation/manageBookingData';

const Sk: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse rounded-lg bg-white/10 ${className}`} />
);

type Props = {
  booking: ManageBookingData | null;
  isLoading?: boolean;
};

const AMENITY_ICONS: Record<string, string> = {
  mayordomo: 'concierge',
  butler:    'concierge',
  bañera:    'bathtub',
  balcón:    'deck',
  vista:     'visibility',
  wifi:      'wifi',
  spa:       'spa',
  piscina:   'pool',
  bar:       'local_bar',
  terraza:   'deck',
  suite:     'king_bed',
};

const amenityIcon = (text: string) => {
  const lower = text.toLowerCase();
  return Object.entries(AMENITY_ICONS).find(([key]) => lower.includes(key))?.[1] ?? 'star';
};

const buildAmenities = (booking: ManageBookingData) => {
  const items: string[] = [];
  if (booking.butler?.included) items.push('Mayordomo dedicado');
  if (booking.suiteDescription) {
    const parts = booking.suiteDescription.split(/[·•,]/);
    items.push(...parts.map(p => p.trim()).filter(p => p.length > 2 && p.length < 60));
  }
  if (booking.suiteCapacity) items.push(`Capacidad ${booking.suiteCapacity} pasajeros`);
  if (booking.nights) items.push(`${booking.nights} noches incluidas`);
  return items.slice(0, 6);
};

const PaqueteDetalle: React.FC<Props> = ({ booking, isLoading }) => {
  if (isLoading && !booking) return (
    <div className="rounded-3xl border border-white/8 bg-white/[0.03] p-8 space-y-5">
      <div className="flex items-center gap-4">
        <Sk className="size-14 rounded-2xl shrink-0" />
        <div className="flex-1 space-y-2">
          <Sk className="h-3 w-20" />
          <Sk className="h-7 w-52" />
          <Sk className="h-3 w-full" />
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
        {[0, 1, 2, 3, 4, 5].map(i => <Sk key={i} className="h-10 rounded-xl" />)}
      </div>
      <div className="border-t border-white/8 pt-5 grid grid-cols-2 gap-4">
        <Sk className="h-10 rounded-xl" />
        <Sk className="h-10 rounded-xl" />
      </div>
    </div>
  );

  if (!booking) return null;

  const amenities = buildAmenities(booking);

  return (
    <div className="rounded-3xl border border-white/8 bg-white/[0.03] overflow-hidden shadow-2xl">

      {/* Header row */}
      <div className="flex items-start gap-5 p-7 pb-6 border-b border-white/8">
        {/* Icon */}
        <div className="shrink-0 size-16 rounded-2xl bg-[#c8a96e]/10 border border-[#c8a96e]/20 flex items-center justify-center">
          <span className="material-symbols-outlined text-3xl text-[#c8a96e]">king_bed</span>
        </div>

        {/* Name + description */}
        <div className="flex-1 min-w-0">
          <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#c8a96e]/60 mb-1">
            Tu Alojamiento
          </p>
          <h3 className="text-xl font-black text-white leading-tight truncate">
            {booking.suiteName || 'Suite Premium'}
          </h3>
          {booking.suiteDescription && (
            <p className="mt-1 text-xs text-slate-400 leading-relaxed line-clamp-2">
              {booking.suiteDescription}
            </p>
          )}
        </div>

        {/* Suite label pill */}
        <span className="shrink-0 hidden sm:inline-flex px-3 py-1 rounded-full bg-[#c8a96e]/10 border border-[#c8a96e]/20 text-[10px] font-bold uppercase tracking-widest text-[#c8a96e]">
          Suite
        </span>
      </div>

      {/* Amenities grid */}
      {amenities.length > 0 && (
        <div className="px-7 py-5 border-b border-white/8">
          <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-slate-500 mb-4">Incluido en tu suite</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {amenities.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/6 px-3 py-2.5"
              >
                <div className="size-7 rounded-lg bg-[#c8a96e]/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[14px] text-[#c8a96e]">
                    {amenityIcon(item)}
                  </span>
                </div>
                <span className="text-[11px] text-slate-300 font-medium leading-tight">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer row — cabin + cruise */}
      <div className="px-7 py-5 grid grid-cols-2 gap-4">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-slate-500 mb-1.5">
            {booking.cabinNumber ? 'Número de Cabina' : 'Cabina'}
          </p>
          <p className="text-lg font-black text-[#eacea9] leading-none">
            {booking.cabinNumber ?? booking.cabinLabel ?? '—'}
          </p>
        </div>
        {booking.cruiseName && (
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-slate-500 mb-1.5">Crucero</p>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-base text-[#c8a96e]/70">sailing</span>
              <p className="text-sm font-bold text-white leading-tight">{booking.cruiseName}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaqueteDetalle;
