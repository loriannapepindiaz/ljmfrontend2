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
    <div className="rounded-3xl overflow-hidden border border-white/8 bg-white/[0.03] backdrop-blur-sm">
      <div className="grid md:grid-cols-2">
        <Sk className="h-56 md:h-full rounded-none" />
        <div className="p-8 space-y-5">
          <Sk className="h-3 w-20" />
          <Sk className="h-8 w-56" />
          <Sk className="h-4 w-full" />
          <Sk className="h-4 w-4/5" />
          <div className="grid grid-cols-2 gap-3 pt-2">
            {[0, 1, 2, 3].map(i => <Sk key={i} className="h-8 rounded-xl" />)}
          </div>
          <div className="border-t border-white/8 pt-4">
            <Sk className="h-4 w-24" />
            <Sk className="h-7 w-32 mt-2" />
          </div>
        </div>
      </div>
    </div>
  );

  if (!booking) return null;

  const amenities = buildAmenities(booking);
  const suiteImg = booking.suiteImage ?? booking.destinationImage;

  return (
    <div className="rounded-3xl overflow-hidden border border-white/8 bg-white/[0.03] backdrop-blur-sm shadow-2xl">
      <div className="grid md:grid-cols-2">
        {/* Image side */}
        <div className="relative h-56 md:h-auto min-h-[220px] bg-[#060f1e] overflow-hidden">
          {suiteImg ? (
            <>
              <img
                alt={booking.suiteName}
                className="absolute inset-0 h-full w-full object-cover"
                src={suiteImg}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#060f1e]/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060f1e]/60 via-transparent to-transparent" />
            </>
          ) : (
            <div className="h-full flex items-center justify-center">
              <span className="material-symbols-outlined text-8xl text-[#eacea9]/10">king_bed</span>
            </div>
          )}
          {/* Suite badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1.5 rounded-full bg-[#c8a96e]/20 border border-[#c8a96e]/30 text-[10px] font-bold uppercase tracking-widest text-[#c8a96e] backdrop-blur-sm">
              Suite Premium
            </span>
          </div>
        </div>

        {/* Info side */}
        <div className="p-8 space-y-6">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-[#c8a96e]/60 mb-2">Tu Alojamiento</p>
            <h3 className="text-2xl font-black text-white leading-tight">{booking.suiteName}</h3>
            {booking.suiteDescription && (
              <p className="mt-2 text-sm text-slate-400 leading-relaxed line-clamp-2">{booking.suiteDescription}</p>
            )}
          </div>

          {amenities.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {amenities.map((item, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="size-7 rounded-lg bg-[#c8a96e]/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[14px] text-[#c8a96e]">{amenityIcon(item)}</span>
                  </div>
                  <span className="text-[11px] text-slate-300 font-medium leading-tight">{item}</span>
                </div>
              ))}
            </div>
          )}

          <div className="border-t border-white/8 pt-5 grid grid-cols-2 gap-4">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-500 mb-1">
                {booking.cabinNumber ? 'Número de Cabina' : 'Cabina'}
              </p>
              <p className="text-xl font-black text-[#eacea9]">
                {booking.cabinNumber ?? booking.cabinLabel ?? '—'}
              </p>
            </div>
            {booking.cruiseName && (
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-500 mb-1">Crucero</p>
                <p className="text-sm font-bold text-white leading-tight">{booking.cruiseName}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaqueteDetalle;
