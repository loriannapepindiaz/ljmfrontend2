import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cancelReservation, type VoyageHistoryReservation } from '../voyageHistoryData';

type Props = {
  reservation: VoyageHistoryReservation | null;
  isLoading: boolean;
  extraUpcoming?: VoyageHistoryReservation[];
  onCancelled?: (id: string | number) => void;
};

const formatDate = (value: string | null) =>
  value
    ? new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(value))
    : 'Fecha por confirmar';

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
      <div className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 z-[90] w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-8 shadow-2xl">
        <h3 className="text-xl font-bold text-[#0e1a34]" style={{ fontFamily: 'Newsreader, serif' }}>
          ¿Cancelar reserva?
        </h3>
        <p className="mt-2 text-sm text-slate-500">
          Estás a punto de cancelar <span className="font-semibold text-[#0e1a34]">{destination}</span>. Esta acción no se puede deshacer.
        </p>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={cancelling}
            className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
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

const UpcomingCard: React.FC<{
  reservation: VoyageHistoryReservation;
  isPrimary?: boolean;
  onCancelled?: (id: string | number) => void;
}> = ({ reservation, isPrimary = false, onCancelled }) => {
  const navigate = useNavigate();
  const [showCancel, setShowCancel] = useState(false);

  const handleCancel = async () => {
    await cancelReservation(reservation.id);
    onCancelled?.(reservation.id);
  };

  return (
    <>
      <div className={`relative overflow-hidden rounded-xl ${isPrimary ? 'bg-[#0e1a34]' : 'bg-[#162040]'} text-[#eacea9] shadow-xl`}>
        {reservation.image ? (
          <img
            src={reservation.image}
            alt={reservation.destination}
            className="absolute inset-0 h-full w-full object-cover opacity-20"
          />
        ) : null}
        <div className="absolute inset-0 bg-[#0e1a34]/80" />
        <div className="relative p-8">
          <div className="flex items-start justify-between gap-4">
            <span className="inline-block rounded-full border border-[#eacea9]/30 bg-[#eacea9]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#eacea9]">
              {isPrimary ? 'Próxima expedición' : 'Próxima reserva'}
            </span>
            <button
              type="button"
              onClick={() => setShowCancel(true)}
              className="flex items-center gap-1.5 rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-red-400 transition hover:bg-red-500/20"
            >
              <span className="material-symbols-outlined text-sm">cancel</span>
              Cancelar viaje
            </button>
          </div>

          <h2 className="mt-4 text-3xl font-bold text-white" style={{ fontFamily: 'Newsreader, serif' }}>
            {reservation.destination}
          </h2>
          <p className="mt-1 text-sm text-white/60">
            {reservation.ship} · {reservation.cabin} · {formatDate(reservation.departureDate)}
            {reservation.returnDate ? ` → ${formatDate(reservation.returnDate)}` : ''}
          </p>

          <div className="mt-4 flex flex-wrap gap-3 text-xs font-bold uppercase tracking-widest text-white/60">
            <span>Reserva {reservation.code}</span>
            <span>{reservation.status}</span>
            <span>{reservation.guests} huésped{reservation.guests !== 1 ? 'es' : ''}</span>
            {reservation.nights ? <span>{reservation.nights} noches</span> : null}
          </div>

          <div className="mt-6">
            <button
              onClick={() => navigate(`/manage-booking?reservationId=${reservation.id}`)}
              className="rounded-lg bg-[#eacea9] px-6 py-2 text-sm font-bold text-[#0e1a34] transition hover:bg-white active:scale-95"
            >
              Gestionar reserva
            </button>
          </div>
        </div>
      </div>

      {showCancel && (
        <CancelModal
          destination={reservation.destination}
          onConfirm={handleCancel}
          onClose={() => setShowCancel(false)}
        />
      )}
    </>
  );
};

const UpcomingVoyageCard: React.FC<Props> = ({ reservation, isLoading, extraUpcoming = [], onCancelled }) => {
  const navigate = useNavigate();

  if (isLoading && !reservation) {
    return (
      <section className="mb-8">
        <div className="h-52 animate-pulse rounded-xl bg-slate-200" />
      </section>
    );
  }

  if (!reservation && extraUpcoming.length === 0) {
    return (
      <section className="mb-12">
        <div className="rounded-xl bg-[#0e1a34] p-10 text-center text-white/60 shadow-xl">
          <p className="text-sm font-semibold">No hay reservas próximas</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 rounded-lg bg-[#eacea9] px-6 py-2 text-sm font-bold text-[#0e1a34] transition hover:bg-white"
          >
            Buscar viaje
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-12 flex flex-col gap-4">
      {reservation && (
        <UpcomingCard reservation={reservation} isPrimary onCancelled={onCancelled} />
      )}
      {extraUpcoming.map(r => (
        <UpcomingCard key={String(r.id)} reservation={r} onCancelled={onCancelled} />
      ))}
    </section>
  );
};

export default UpcomingVoyageCard;
