import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../../../components/BackButton';
import SeguimientoHeader from '../components/SeguimientoHeader';
import RutaProgreso from '../components/RutaProgreso';
import BookingSummary from '../components/BookingSummary';
import PaqueteDetalle from '../components/PaqueteDetalle';
import HighlightsRow from '../components/HighlightsRow';
import ItinerarioBanner from '../components/ItinerarioBanner';
import {
  getLocalVoyageHistoryData,
  voyageHistoryApi,
  type VoyageHistoryReservation,
} from '../../../voyayehistory/presentation/voyageHistoryData';
import {
  getLocalManageBookingData,
  manageBookingApi,
  type ManageBookingData,
} from '../../../manageyourbooking/presentation/manageBookingData';
import { profileApi, type ProfileHistoryItem, type ProfileReservation } from '../../../perfil/presentation/profileData';

/* ── helpers ─────────────────────────────────────────────── */

const hasRealText = (value: unknown): value is string => {
  if (typeof value !== 'string') return false;
  const n = value.trim().toLowerCase();
  return Boolean(n && !n.startsWith('sin ') && !n.includes('por confirmar') && n !== 'ljm-pendiente');
};

const hasUsefulBookingData = (b: ManageBookingData | null) =>
  Boolean(
    b &&
      (hasRealText(b.reference) ||
        hasRealText(b.destinationName) ||
        hasRealText(b.suiteName) ||
        hasRealText(b.cabinLabel) ||
        hasRealText(b.departureDate ?? null)),
  );

const pickRealText = (a: string | null | undefined, b: string | null | undefined, fallback = '') =>
  hasRealText(a) ? a : hasRealText(b) ? b : a?.trim() || b?.trim() || fallback;

const pickNum = (a: number | null | undefined, b: number | null | undefined) =>
  Number.isFinite(a) && Number(a) > 0 ? Number(a) : Number.isFinite(b) && Number(b) > 0 ? Number(b) : a ?? b ?? null;

const keepBetter = (cur: ManageBookingData | null, next: ManageBookingData | null) =>
  hasUsefulBookingData(next) ? next : hasUsefulBookingData(cur) ? cur : next;

const merge = (primary: ManageBookingData | null, fallback: ManageBookingData | null): ManageBookingData | null => {
  if (!primary) return fallback;
  if (!fallback) return primary;
  return {
    ...fallback, ...primary,
    reference:       pickRealText(primary.reference, fallback.reference, 'Sin referencia'),
    status:          pickRealText(primary.status, fallback.status, 'Confirmada'),
    destinationName: pickRealText(primary.destinationName, fallback.destinationName, 'Reserva LJM Sealine'),
    destinationImage: primary.destinationImage || fallback.destinationImage,
    departureDate:   pickRealText(primary.departureDate ?? undefined, fallback.departureDate ?? undefined) || null,
    returnDate:      pickRealText(primary.returnDate ?? undefined, fallback.returnDate ?? undefined) || null,
    nights:          pickNum(primary.nights, fallback.nights),
    route:           pickRealText(primary.route, fallback.route, 'Ruta por confirmar'),
    suiteName:       pickRealText(primary.suiteName, fallback.suiteName, 'Suite por confirmar'),
    cabinLabel:      pickRealText(primary.cabinLabel, fallback.cabinLabel, 'Cabina por confirmar'),
    cabinNumber:     pickRealText(primary.cabinNumber ?? undefined, fallback.cabinNumber ?? undefined) || null,
    suiteCapacity:   primary.suiteCapacity ?? fallback.suiteCapacity,
    cruiseName:      primary.cruiseName ?? fallback.cruiseName,
    suiteImage:      primary.suiteImage ?? fallback.suiteImage,
    suiteDescription:primary.suiteDescription ?? fallback.suiteDescription,
    itineraryName:   primary.itineraryName ?? fallback.itineraryName,
    itineraryStops:  primary.itineraryStops?.length ? primary.itineraryStops : fallback.itineraryStops,
    butler:          primary.butler ?? fallback.butler,
    guestCount:      Math.max(primary.guestCount ?? 0, fallback.guestCount ?? 0),
    guests:          primary.guests.length ? primary.guests : fallback.guests,
    diningRequests:  primary.diningRequests.length ? primary.diningRequests : fallback.diningRequests,
    excursions:      primary.excursions.length ? primary.excursions : fallback.excursions,
    payments:        primary.payments.length ? primary.payments : fallback.payments,
    total:           pickRealText(primary.total, fallback.total, '0 US$'),
    paymentStatus:   pickRealText(primary.paymentStatus, fallback.paymentStatus, 'Por confirmar'),
    animalCompanion: primary.animalCompanion ?? fallback.animalCompanion,
  };
};

const fromVoyage = (r: VoyageHistoryReservation | null): ManageBookingData | null => {
  if (!r) return null;
  return {
    reservationId: r.id,
    reference: r.code,
    status: r.status,
    destinationName: r.destination || 'Reserva LJM Sealine',
    destinationImage: r.image ?? undefined,
    departureDate: r.departureDate,
    returnDate: r.returnDate,
    nights: r.nights,
    route: r.ship,
    suiteName: r.cabin,
    cabinLabel: r.cabin,
    cabinNumber: null,
    guestCount: Math.max(0, r.guests),
    butler: { included: false },
    guests: [],
    diningRequests: [],
    excursions: r.experiences.map(e => ({
      id: e.id, imagen: '', nombre: e.name,
      fecha: r.departureDate ?? 'Por confirmar',
      puerto: r.destination, estado: 'Confirmada', precio: e.price,
    })),
    payments: [{ label: 'Estado de pago', value: r.paymentStatus, color: 'text-emerald-300' }],
    total: new Intl.NumberFormat('es-ES', { style: 'currency', currency: r.currency, maximumFractionDigits: 0 }).format(r.total),
    paymentStatus: r.paymentStatus,
  };
};

const fromProfile = (r: ProfileReservation | ProfileHistoryItem | null): ManageBookingData | null => {
  if (!r) return null;
  const rp = r as ProfileReservation;
  const total = rp.total ?? 0;
  const currency = rp.currency ?? 'USD';
  return {
    reservationId: rp.id ?? r.reservationId,
    reference: rp.code ?? `LJM-${r.reservationId}`,
    status: rp.status ?? 'Confirmada',
    destinationName: r.destination || 'Reserva LJM Sealine',
    destinationImage: rp.image ?? undefined,
    departureDate: r.departureDate,
    returnDate: r.returnDate,
    nights: r.nights,
    route: r.ship,
    suiteName: r.cabin,
    cabinLabel: r.cabin,
    cabinNumber: null,
    guestCount: Math.max(0, Number(rp.guests ?? 0)),
    butler: { included: false },
    guests: [],
    diningRequests: [],
    excursions: (rp.experiences ?? []).map(e => ({
      id: e.id, imagen: '', nombre: e.name,
      fecha: r.departureDate ?? 'Por confirmar',
      puerto: r.destination, estado: 'Confirmada', precio: e.price,
    })),
    payments: [{ label: 'Estado de pago', value: rp.paymentStatus ?? 'Pagado', color: 'text-emerald-300' }],
    total: new Intl.NumberFormat('es-ES', { style: 'currency', currency, maximumFractionDigits: 0 }).format(total),
    paymentStatus: rp.paymentStatus ?? 'Pagado',
  };
};

const withTimeout = async <T,>(p: Promise<T>, ms: number): Promise<T | null> => {
  let tid: number | undefined;
  const timeout = new Promise<null>(res => { tid = window.setTimeout(() => res(null), ms); });
  const result = await Promise.race([p.catch(() => null), timeout]);
  if (tid !== undefined) window.clearTimeout(tid);
  return result;
};

/* ── Empty state ─────────────────────────────────────────── */

const EmptyState: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[55vh] px-6 py-20 text-center gap-8">
      <div className="relative">
        <div className="size-28 rounded-full bg-[#c8a96e]/8 border border-[#c8a96e]/15 flex items-center justify-center">
          <span className="material-symbols-outlined text-6xl text-[#c8a96e]/30">directions_boat</span>
        </div>
        <div className="absolute -top-2 -right-2 size-8 rounded-full bg-[#c8a96e]/15 border border-[#c8a96e]/20 flex items-center justify-center">
          <span className="material-symbols-outlined text-sm text-[#c8a96e]/50">anchor</span>
        </div>
      </div>

      <div className="space-y-3 max-w-sm">
        <h2 className="text-2xl font-black text-white">No tienes viajes activos</h2>
        <p className="text-slate-400 text-sm leading-relaxed">
          Cuando reserves un crucero con LJM Sealine, aquí podrás seguir tu viaje en tiempo real con todos los detalles.
        </p>
      </div>

      <button
        onClick={() => navigate('/booking')}
        className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-[#c8a96e] text-[#060f1e] font-black text-sm tracking-wide hover:brightness-110 transition-all shadow-[0_8px_32px_#c8a96e30]"
      >
        <span className="material-symbols-outlined text-lg">explore</span>
        Explorar cruceros
      </button>
    </div>
  );
};

/* ── Page ────────────────────────────────────────────────── */

const SeguimientoCruceroPage: React.FC = () => {
  const [booking, setBooking] = useState<ManageBookingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const local = getLocalManageBookingData();
    const localHistory = fromVoyage(getLocalVoyageHistoryData()?.upcomingReservation ?? null);
    const immediate = merge(local, localHistory);
    let mounted = true;

    setBooking(hasUsefulBookingData(immediate) ? immediate : null);
    setIsLoading(!hasUsefulBookingData(immediate));

    const safety = window.setTimeout(() => { if (mounted) setIsLoading(false); }, 4500);

    Promise.all([
      withTimeout(manageBookingApi.current(), 5000),
      withTimeout(manageBookingApi.latest(), 5000),
      withTimeout(voyageHistoryApi.current(), 5000),
      withTimeout(profileApi.current(), 5000),
    ]).then(([manageRes, latestRes, historyRes, profileRes]) => {
      if (!mounted) return;

      const backend  = merge(manageRes?.data ?? null, latestRes?.data ?? null);
      const history  = fromVoyage(historyRes?.data.upcomingReservation ?? null);
      const profile  = fromProfile(profileRes?.data.upcomingReservation ?? profileRes?.data.travelHistory?.[0] ?? null);
      const merged   = merge(backend, merge(profile, merge(history, immediate)));

      setBooking(cur => keepBetter(cur, merged));
    }).finally(() => {
      window.clearTimeout(safety);
      if (mounted) setIsLoading(false);
    });

    return () => { mounted = false; window.clearTimeout(safety); };
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#060f1e] text-slate-100">
      <BackButton />

      <SeguimientoHeader booking={booking} isLoading={isLoading} />

      <main className="w-full max-w-7xl mx-auto px-4 md:px-6 py-10">

        {/* Empty state — only when done loading and truly nothing */}
        {!isLoading && !booking && <EmptyState />}

        {(isLoading || booking) && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Left column */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <BookingSummary booking={booking} isLoading={isLoading} />
              <RutaProgreso   booking={booking} isLoading={isLoading} />
            </div>

            {/* Right column */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <PaqueteDetalle  booking={booking} isLoading={isLoading} />
              <HighlightsRow   booking={booking} isLoading={isLoading} />
              <ItinerarioBanner booking={booking} isLoading={isLoading} />
            </div>

          </div>
        )}
      </main>

      <footer className="border-t border-white/5 py-10 px-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">LJM Sealine © 2026</span>
          <div className="flex gap-8">
            {['Privacidad', 'Términos', 'Soporte'].map(item => (
              <a key={item} href="#" className="text-slate-600 hover:text-[#c8a96e] text-[10px] font-bold uppercase tracking-widest transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SeguimientoCruceroPage;
