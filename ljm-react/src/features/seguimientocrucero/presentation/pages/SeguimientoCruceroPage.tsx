import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import BackButton from '../../../../components/BackButton';
import SeguimientoHeader from '../components/SeguimientoHeader';
import RutaProgreso from '../components/RutaProgreso';
import BookingSummary from '../components/BookingSummary';
import PaqueteDetalle from '../components/PaqueteDetalle';
import HighlightsRow from '../components/HighlightsRow';
import ItinerarioBanner from '../components/ItinerarioBanner';
import {
  voyageHistoryApi,
  cancelReservation,
  type VoyageHistoryReservation,
  type VoyageHistoryItem,
} from '../../../voyayehistory/presentation/voyageHistoryData';
import { type ManageBookingData } from '../../../manageyourbooking/presentation/manageBookingData';
import { request } from '../../../../lib/api';
import { clearBookingDraft } from '../../../../lib/bookingDraft';

type ManageBookingResponse = { ok: boolean; data: ManageBookingData };

/* ── helpers ─────────────────────────────────────────────── */

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

const withTimeout = async <T,>(p: Promise<T> | null, ms: number): Promise<T | null> => {
  if (!p) return null;
  let tid: number | undefined;
  const timeout = new Promise<null>(res => { tid = window.setTimeout(() => res(null), ms); });
  const result = await Promise.race([p.catch(() => null), timeout]);
  if (tid !== undefined) window.clearTimeout(tid);
  return result;
};

const applyVoyageBase = (
  booking: ManageBookingData,
  vhUpcoming: VoyageHistoryReservation[],
  vhHistory: VoyageHistoryItem[],
  currentId: string | null,
): ManageBookingData => {
  const id = currentId ?? String(booking.reservationId ?? '');

  // Buscar en próximas reservas (tienen imagen y más datos)
  const upcomingMatch = vhUpcoming.find(r => String(r.id) === id);
  if (upcomingMatch) {
    return {
      ...booking,
      destinationName: upcomingMatch.destination || booking.destinationName,
      destinationImage: upcomingMatch.image ?? booking.destinationImage,
      departureDate: upcomingMatch.departureDate ?? booking.departureDate,
      returnDate: upcomingMatch.returnDate ?? booking.returnDate,
      nights: upcomingMatch.nights ?? booking.nights,
    };
  }

  // Buscar en historial (reservas pasadas — id puede ser id_reserva o id_historial)
  const historyMatch = vhHistory.find(
    r => String(r.id) === id || String(r.reservationId) === id,
  );
  if (historyMatch) {
    return {
      ...booking,
      destinationName: historyMatch.destination || booking.destinationName,
      departureDate: historyMatch.departureDate ?? booking.departureDate,
      returnDate: historyMatch.returnDate ?? booking.returnDate,
      nights: historyMatch.nights ?? booking.nights,
    };
  }

  return booking;
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

/* ── Cancel modal ────────────────────────────────────────── */

const CancelModal: React.FC<{
  destination: string;
  onConfirm: () => Promise<void>;
  onClose: () => void;
}> = ({ destination, onConfirm, onClose }) => {
  const [cancelling, setCancelling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    setCancelling(true);
    setError(null);
    try {
      await onConfirm();
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error al cancelar');
      setCancelling(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 z-[90] w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-[#0e1a34] border border-white/10 p-8 shadow-2xl">
        <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'Newsreader, serif' }}>
          ¿Cancelar reserva?
        </h3>
        <p className="mt-2 text-sm text-slate-400">
          Estás a punto de cancelar <span className="font-semibold text-[#c8a96e]">{destination}</span>. Esta acción no se puede deshacer.
        </p>
        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={cancelling}
            className="flex-1 rounded-xl border border-white/20 py-2.5 text-sm font-bold text-slate-300 transition hover:bg-white/5"
          >
            Mantener
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={cancelling}
            className="flex-1 rounded-xl bg-red-600 py-2.5 text-sm font-bold text-white transition hover:bg-red-700 disabled:opacity-50"
          >
            {cancelling ? 'Cancelando...' : 'Sí, cancelar'}
          </button>
        </div>
      </div>
    </>
  );
};

/* ── Additional upcoming card ────────────────────────────── */

const formatDate = (value: string | null | undefined) =>
  value
    ? new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(value))
    : 'Fecha por confirmar';

const CARD_GRADIENTS = [
  'from-[#1a3a5c] to-[#0e2040]',
  'from-[#2d1a4a] to-[#1a0e34]',
  'from-[#1a3a2d] to-[#0e2018]',
  'from-[#3a2d1a] to-[#201a0e]',
];

const AdditionalUpcomingCard: React.FC<{ reservation: VoyageHistoryReservation; index?: number }> = ({ reservation, index = 0 }) => {
  const navigate = useNavigate();
  const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length];

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-br ${gradient}`}>
      {reservation.image ? (
        <img
          src={reservation.image}
          alt={reservation.destination}
          className="absolute inset-0 w-full h-full object-cover opacity-15"
        />
      ) : null}
      <div className="relative p-4 flex flex-col gap-3">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#c8a96e]/70 mb-1">Próxima Reserva</p>
          <h3 className="text-sm font-bold text-white leading-tight">{reservation.destination}</h3>
          <p className="text-[11px] text-slate-400 mt-0.5 truncate">{reservation.ship} · {reservation.cabin}</p>
        </div>
        <div className="flex gap-2 text-xs">
          <div className="rounded-lg bg-black/20 px-3 py-1.5 flex-1">
            <p className="text-[9px] uppercase tracking-widest text-slate-500">Salida</p>
            <p className="font-bold text-white mt-0.5 text-[11px]">{formatDate(reservation.departureDate)}</p>
          </div>
          {reservation.nights ? (
            <div className="rounded-lg bg-black/20 px-3 py-1.5 shrink-0">
              <p className="text-[9px] uppercase tracking-widest text-slate-500">Noches</p>
              <p className="font-bold text-white mt-0.5 text-[11px]">{reservation.nights}</p>
            </div>
          ) : null}
        </div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-[10px] text-slate-500 truncate">Reserva {reservation.code}</p>
          <button
            onClick={() => navigate(`/seguimiento-crucero?reservationId=${reservation.id}`)}
            className="shrink-0 rounded-lg bg-[#c8a96e]/15 border border-[#c8a96e]/25 px-3 py-1 text-[10px] font-bold text-[#c8a96e] transition hover:bg-[#c8a96e]/25"
          >
            Ver detalle
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── Page ────────────────────────────────────────────────── */

const SeguimientoCruceroPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const reservationId = searchParams.get('reservationId');

  const [booking, setBooking] = useState<ManageBookingData | null>(null);
  const [additionalUpcoming, setAdditionalUpcoming] = useState<VoyageHistoryReservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCancel, setShowCancel] = useState(false);
  const [showAllUpcoming, setShowAllUpcoming] = useState(false);

  useEffect(() => {
    let mounted = true;
    setBooking(null);
    setIsLoading(true);
    setShowAllUpcoming(false);
    setAdditionalUpcoming([]);

    const safety = window.setTimeout(() => { if (mounted) setIsLoading(false); }, 5000);

    const params = reservationId ? `?reservationId=${reservationId}` : '';
    Promise.all([
      withTimeout(request<ManageBookingResponse>(`/manage-booking/current${params}`, { method: 'GET' }), 6000),
      withTimeout(voyageHistoryApi.current(), 6000),
    ]).then(([manageRes, historyRes]) => {
      if (!mounted) return;

      const vhPrimary = historyRes?.data.upcomingReservation ?? null;
      const vhOthers  = historyRes?.data.upcomingReservations ?? [];
      const vhAll     = [...(vhPrimary ? [vhPrimary] : []), ...vhOthers];
      const vhHistory = historyRes?.data.travelHistory ?? [];

      if (manageRes?.data) {
        setBooking(applyVoyageBase(manageRes.data, vhAll, vhHistory, reservationId));
      } else {
        const found = reservationId
          ? vhAll.find(r => String(r.id) === String(reservationId))
          : vhPrimary;
        setBooking(found ? fromVoyage(found) : null);
      }

      const currentId = reservationId ?? String(manageRes?.data?.reservationId ?? '');
      const combined  = vhAll.filter(r => !currentId || String(r.id) !== currentId);
      const seen = new Set<string>();
      const deduped = combined.filter(r => { const k = String(r.id); return seen.has(k) ? false : (seen.add(k), true); });
      setAdditionalUpcoming(
        [...deduped].sort((a, b) => {
          const da = a.departureDate ? new Date(a.departureDate).getTime() : Infinity;
          const db = b.departureDate ? new Date(b.departureDate).getTime() : Infinity;
          return da - db;
        }),
      );
    }).finally(() => {
      window.clearTimeout(safety);
      if (mounted) setIsLoading(false);
    });

    return () => { mounted = false; window.clearTimeout(safety); };
  }, [reservationId]);

  const handleCancel = async () => {
    if (!booking?.reservationId) throw new Error('Sin ID de reserva');
    await cancelReservation(booking.reservationId);
    clearBookingDraft();
    sessionStorage.removeItem('ljm_booking_confirmation');
    setBooking(null);
    setAdditionalUpcoming([]);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#060f1e] text-slate-100">
      <BackButton topClass="top-6" />

      <SeguimientoHeader booking={booking} isLoading={isLoading} />

      <main className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-10">

        {/* Empty state — only when done loading and truly nothing */}
        {!isLoading && !booking && <EmptyState />}

        {(isLoading || booking) && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">

            {/* Left column */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <BookingSummary booking={booking} isLoading={isLoading} />
              <RutaProgreso   booking={booking} isLoading={isLoading} />

              {/* Cancel section */}
              {booking && (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.04] p-5">
                  <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-red-400/70 mb-2">Cancelación de reserva</p>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    Cancelar el viaje eliminará tu reserva y liberará la cabina asignada. Esta acción no se puede deshacer y puede estar sujeta a cargos según la política de cancelación de LJM Sealine.
                  </p>
                  <button
                    onClick={() => setShowCancel(true)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm font-bold text-red-400 transition hover:bg-red-500/20"
                  >
                    <span className="material-symbols-outlined text-base">cancel</span>
                    Cancelar viaje
                  </button>
                </div>
              )}

              {/* Additional upcoming reservations — max 2 visible, expand with button */}
              {additionalUpcoming.length > 0 && (
                <div className="flex flex-col gap-3">
                  <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-slate-500">Próximas reservas</p>
                  {(showAllUpcoming ? additionalUpcoming : additionalUpcoming.slice(0, 1)).map((r, i) => (
                    <AdditionalUpcomingCard key={String(r.id)} reservation={r} index={i} />
                  ))}
                  {additionalUpcoming.length > 1 && (
                    <button
                      onClick={() => setShowAllUpcoming(prev => !prev)}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] py-2.5 text-xs font-bold text-slate-400 transition hover:bg-white/6 hover:text-white"
                    >
                      <span className="material-symbols-outlined text-sm">
                        {showAllUpcoming ? 'expand_less' : 'expand_more'}
                      </span>
                      {showAllUpcoming
                        ? 'Ver menos'
                        : `Ver todos los viajes (${additionalUpcoming.length})`}
                    </button>
                  )}
                </div>
              )}
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

      {showCancel && booking && (
        <CancelModal
          destination={booking.destinationName}
          onConfirm={handleCancel}
          onClose={() => setShowCancel(false)}
        />
      )}
    </div>
  );
};

export default SeguimientoCruceroPage;
