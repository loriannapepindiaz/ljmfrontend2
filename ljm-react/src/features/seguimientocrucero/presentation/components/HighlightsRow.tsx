import React from 'react';
import type { ManageBookingData } from '../../../manageyourbooking/presentation/manageBookingData';

const Sk: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse rounded-lg bg-white/10 ${className}`} />
);

type StatCard = {
  icon: string;
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
};

const buildStats = (booking: ManageBookingData): StatCard[] => [
  {
    icon: 'calendar_month',
    label: 'Duración',
    value: booking.nights ? `${booking.nights}` : '—',
    sub: booking.nights ? 'noches' : 'Por confirmar',
    accent: Boolean(booking.nights),
  },
  {
    icon: 'group',
    label: 'Pasajeros',
    value: String(booking.guestCount ?? booking.guests.length ?? 1),
    sub: `${(booking.guestCount ?? booking.guests.length ?? 1) === 1 ? 'persona' : 'personas'} a bordo`,
  },
  {
    icon: 'payments',
    label: 'Estado de pago',
    value: booking.paymentStatus,
    sub: booking.total,
    accent: booking.paymentStatus.toLowerCase().includes('pagad'),
  },
  {
    icon: 'explore',
    label: 'Experiencias',
    value: booking.excursions.length > 0 ? String(booking.excursions.length) : '0',
    sub: booking.excursions.length > 0 ? 'confirmadas' : 'Sin registrar',
    accent: booking.excursions.length > 0,
  },
  {
    icon: 'concierge',
    label: 'Mayordomo',
    value: booking.butler?.included ? 'Incluido' : 'No incluido',
    sub: booking.butler?.name || undefined,
    accent: booking.butler?.included,
  },
  {
    icon: 'pets',
    label: 'Compañero animal',
    value: booking.animalCompanion ? booking.animalCompanion.nombre : 'No registrado',
    sub: booking.animalCompanion ? booking.animalCompanion.tipoAnimal : undefined,
    accent: Boolean(booking.animalCompanion),
  },
];

type Props = {
  booking: ManageBookingData | null;
  isLoading?: boolean;
};

const HighlightsRow: React.FC<Props> = ({ booking, isLoading }) => {
  if (isLoading && !booking) return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {[0, 1, 2, 3, 4, 5].map(i => (
        <div key={i} className="rounded-2xl p-5 border border-white/8 bg-white/[0.03] space-y-3">
          <Sk className="size-9 rounded-xl" />
          <Sk className="h-3 w-20" />
          <Sk className="h-6 w-16" />
          <Sk className="h-3 w-24" />
        </div>
      ))}
    </div>
  );

  if (!booking) return null;

  const stats = buildStats(booking);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {stats.map(stat => (
        <div
          key={stat.label}
          className="group rounded-2xl p-5 border border-white/8 bg-white/[0.03] hover:bg-white/[0.06] hover:border-[#c8a96e]/20 transition-all duration-200 flex flex-col gap-3"
        >
          <div className={`size-9 rounded-xl flex items-center justify-center ${stat.accent ? 'bg-[#c8a96e]/15 border border-[#c8a96e]/20' : 'bg-white/5 border border-white/8'}`}>
            <span className={`material-symbols-outlined text-lg ${stat.accent ? 'text-[#c8a96e]' : 'text-slate-400'}`}>
              {stat.icon}
            </span>
          </div>
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-500 mb-1">{stat.label}</p>
            <p className={`text-lg font-black leading-none ${stat.accent ? 'text-[#eacea9]' : 'text-white'}`}>
              {stat.value}
            </p>
            {stat.sub && (
              <p className="text-[10px] text-slate-500 font-medium mt-1 leading-tight">{stat.sub}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HighlightsRow;
