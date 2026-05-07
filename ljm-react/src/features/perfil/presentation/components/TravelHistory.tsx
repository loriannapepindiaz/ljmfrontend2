import React from 'react';
import { Link } from 'react-router-dom';
import type { ProfileData, ProfileHistoryItem, ProfileReservation } from '../profileData';

interface TravelHistoryProps {
  profile: ProfileData | null;
  isLoading: boolean;
}

const formatDate = (value: string | null) => {
  if (!value) return 'Fecha por confirmar';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Fecha por confirmar';

  return new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }).format(date);
};

const formatCurrency = (value: number, currency: string) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency, maximumFractionDigits: 0 }).format(value);

const UpcomingCard = ({ reservation }: { reservation: ProfileReservation }) => (
  <div className="overflow-hidden rounded-xl border border-[#eacea9]/15 bg-[#132345] shadow-2xl">
    {reservation.image ? (
      <img
        src={reservation.image}
        alt={reservation.destination}
        className="h-52 w-full object-cover"
      />
    ) : null}
    <div className="p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#d4af37]">{reservation.status}</p>
          <h3 className="mt-2 text-2xl font-bold text-white font-serif">{reservation.destination}</h3>
          <p className="mt-1 text-sm text-slate-400">{reservation.ship} · {reservation.cabin}</p>
          <Link
            to={`/seguimiento-crucero?reservationId=${reservation.id}`}
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#eacea9] px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.18em] text-[#0e1a34] shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-white"
          >
            Ver seguimiento
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
        <div className="rounded-lg bg-white/[0.04] px-4 py-3 text-left md:text-right">
          <p className="text-xs text-slate-400">Reserva {reservation.code}</p>
          <p className="mt-1 text-sm font-bold text-[#eacea9]">{formatCurrency(reservation.total, reservation.currency)}</p>
        </div>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-[#0e1a34] p-4">
          <p className="text-[9px] uppercase tracking-widest text-slate-500">Salida</p>
          <p className="mt-1 text-sm font-bold text-white">{formatDate(reservation.departureDate)}</p>
        </div>
        <div className="rounded-lg bg-[#0e1a34] p-4">
          <p className="text-[9px] uppercase tracking-widest text-slate-500">Regreso</p>
          <p className="mt-1 text-sm font-bold text-white">{formatDate(reservation.returnDate)}</p>
        </div>
        <div className="rounded-lg bg-[#0e1a34] p-4">
          <p className="text-[9px] uppercase tracking-widest text-slate-500">Noches</p>
          <p className="mt-1 text-sm font-bold text-white">{reservation.nights ?? 'Por confirmar'}</p>
        </div>
        <div className="rounded-lg bg-[#0e1a34] p-4">
          <p className="text-[9px] uppercase tracking-widest text-slate-500">Acompañantes</p>
          <p className="mt-1 text-sm font-bold text-white">
            {reservation.guests} {reservation.guests === 1 ? 'registrado' : 'registrados'}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const HistoryItem = ({ item }: { item: ProfileHistoryItem }) => (
  <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-[#132345] p-5 md:flex-row md:items-center md:justify-between">
    <div>
      <h3 className="font-bold text-white">{item.destination}</h3>
      <p className="mt-1 text-xs text-slate-400">{item.ship} · {item.cabin}</p>
      <p className="mt-2 text-[11px] uppercase tracking-widest text-slate-500">
        {formatDate(item.departureDate)} - {formatDate(item.returnDate)}
      </p>
    </div>
    <div className="flex gap-3 text-right">
      <div className="rounded-lg bg-white/[0.04] px-4 py-3">
        <p className="text-sm font-bold text-white">{item.nights ?? 0}</p>
        <p className="text-[9px] uppercase tracking-widest text-slate-500">Noches</p>
      </div>
      <div className="rounded-lg bg-white/[0.04] px-4 py-3">
        <p className="text-sm font-bold text-[#eacea9]">{item.rating ? `${item.rating}/5` : 'Sin nota'}</p>
        <p className="text-[9px] uppercase tracking-widest text-slate-500">Valoración</p>
      </div>
    </div>
  </div>
);

const TravelHistory: React.FC<TravelHistoryProps> = ({ profile, isLoading }) => {
  const primaryUpcoming = profile?.upcomingReservation ?? null;
  const extraUpcoming = profile?.upcomingReservations ?? [];
  const allUpcoming = [
    ...(primaryUpcoming ? [primaryUpcoming] : []),
    ...extraUpcoming,
  ];
  const visibleUpcoming = allUpcoming.slice(0, 2);
  const history = profile?.travelHistory ?? [];
  const recentHistory = history.slice(0, 2);

  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white font-serif">
            {allUpcoming.length > 1 ? 'Próximos Cruceros' : 'Próximo Crucero'}
          </h2>
          {allUpcoming.length > 2 && (
            <Link
              to="/voyage-history"
              className="inline-flex w-fit items-center justify-center gap-2 rounded-full border border-[#eacea9]/25 bg-[#eacea9] px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.18em] text-[#0e1a34] shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-white"
            >
              Ver todos ({allUpcoming.length})
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          )}
        </div>
        {allUpcoming.length > 0 ? (
          <div className="flex flex-col gap-4">
            {visibleUpcoming.map((r, i) => (
              <UpcomingCard key={String(r.id ?? i)} reservation={r} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-white/10 bg-[#132345] px-6 py-12 text-center shadow-2xl">
            <span className="material-symbols-outlined mb-3 text-5xl text-[#d4af37]/40">directions_boat</span>
            <p className="text-sm font-bold uppercase tracking-widest text-white">
              {isLoading ? 'Cargando reserva...' : 'No hay reserva activa'}
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
              El próximo crucero se mostrará cuando esta cuenta tenga una reserva confirmada.
            </p>
          </div>
        )}
      </section>

      <section>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-bold text-white">Viajes Anteriores</h2>
          <Link
            to="/voyage-history"
            className="inline-flex w-fit items-center justify-center gap-2 rounded-full border border-[#eacea9]/25 bg-[#eacea9] px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.18em] text-[#0e1a34] shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-white"
          >
            Ver historial completo
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
        {recentHistory.length ? (
          <div className="space-y-3">
            {recentHistory.map((item) => (
              <HistoryItem key={`${item.id}-${item.reservationId}`} item={item} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-white/10 bg-[#132345] px-6 py-10 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              {isLoading ? 'Cargando historial...' : 'Sin viajes anteriores'}
            </p>
            <p className="mt-2 text-xs text-slate-500">El historial aparecera cuando existan viajes completados.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default TravelHistory;
