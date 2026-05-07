import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { VoyageHistoryReservation } from '../voyageHistoryData';

type Props = {
  reservation: VoyageHistoryReservation | null;
  isLoading: boolean;
};

const formatDate = (value: string | null) =>
  value
    ? new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(value))
    : 'Fecha por confirmar';

const UpcomingVoyageCard: React.FC<Props> = ({ reservation, isLoading }) => {
  const navigate = useNavigate();
  const title = isLoading ? 'Cargando próxima reserva...' : reservation?.destination ?? 'No hay reserva próxima';
  const details = reservation
    ? `${reservation.ship} · ${reservation.cabin} · ${formatDate(reservation.departureDate)}`
    : 'Cuando exista una reserva activa, aquí se mostrarán el destino, el barco, la cabina y las fechas reales.';

  return (
    <section className="mb-12">
      <div className="relative overflow-hidden rounded-xl bg-[#0e1a34] text-[#eacea9] shadow-2xl">
        {reservation?.image ? (
          <img
            src={reservation.image}
            alt={reservation.destination}
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
        ) : null}
        <div className="absolute inset-0 bg-[#0e1a34]/80" />
        <div className="relative p-10">
          <span className="inline-block px-3 py-1 bg-[#eacea9]/20 text-[#eacea9] border border-[#eacea9]/30 text-[10px] uppercase tracking-[0.2em] font-bold mb-6">
            Próxima expedición
          </span>
          <h2 className="text-4xl font-bold mb-4 text-white" style={{ fontFamily: 'Newsreader, serif' }}>
            {title}
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-white/60">
            {details}
          </p>
          {reservation ? (
            <div className="mt-5 flex flex-wrap gap-3 text-xs font-bold uppercase tracking-widest text-white/70">
              <span>Reserva {reservation.code}</span>
              <span>{reservation.status}</span>
              <span>{reservation.guests} huéspedes</span>
            </div>
          ) : null}
          <div className="mt-8 flex gap-4">
            <button
              onClick={() => navigate(reservation ? '/manage-booking' : '/')}
              className="px-6 py-2 bg-[#eacea9] text-[#0e1a34] font-bold text-sm rounded transition-all hover:bg-white active:scale-95 shadow-lg"
            >
              {reservation ? 'Gestionar reserva' : 'Buscar viaje'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingVoyageCard;
