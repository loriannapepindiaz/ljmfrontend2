import React, { useMemo, useState } from 'react';
import type { ReviewHistoryTrip, ReviewsData } from '../reviewsData';

type Props = {
  client: ReviewsData['client'] | null;
  history: ReviewHistoryTrip[];
  isSaving: boolean;
  initialHistoryId?: string | null;
  onSubmit: (payload: { historyId: string | number; voyageId: string | number; rating: number; text: string }) => Promise<void>;
};

const ReviewForm: React.FC<Props> = ({ client, history, isSaving, initialHistoryId, onSubmit }) => {
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedStar, setSelectedStar] = useState(0);
  const [selectedHistoryId, setSelectedHistoryId] = useState(initialHistoryId ?? '');
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const selectedTrip = useMemo(
    () => history.find((trip) => String(trip.historyId) === selectedHistoryId),
    [history, selectedHistoryId],
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (!selectedTrip) {
      setError('Selecciona un viaje de tu historial.');
      return;
    }

    if (!selectedStar) {
      setError('Selecciona una calificación.');
      return;
    }

    if (text.trim().length < 10) {
      setError('Escribe al menos 10 caracteres.');
      return;
    }

    await onSubmit({
      historyId: selectedTrip.historyId,
      voyageId: selectedTrip.voyageId,
      rating: selectedStar,
      text: text.trim(),
    });
    setText('');
    setSelectedStar(0);
  };

  return (
    <div className="bg-[#0F1B35] p-10 rounded-lg">
      <h3 className="font-serif text-3xl font-bold text-[#D9E2FF] mb-8">Registra tu travesía</h3>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="block text-[11px] uppercase tracking-widest text-[#D9E2FF]/50">
            Navegante
          </label>
          <input
            type="text"
            value={client?.fullName || client?.memberCode || ''}
            readOnly
            className="w-full bg-[#06122C] border-none rounded-lg p-4 text-[#D9E2FF] outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-[11px] uppercase tracking-widest text-[#D9E2FF]/50">
            Viaje de tu historial
          </label>
          <select
            value={selectedHistoryId}
            onChange={(event) => setSelectedHistoryId(event.target.value)}
            className="w-full bg-[#06122C] border-none rounded-lg p-4 text-[#D9E2FF] focus:ring-1 focus:ring-[#DEC29E] outline-none"
          >
            <option value="">{history.length ? 'Selecciona un viaje' : 'Sin historial disponible'}</option>
            {history.map((trip) => (
              <option key={`${trip.historyId}-${trip.reservationId}`} value={trip.historyId}>
                {trip.title} - {trip.ship} - Reserva {trip.reservationId}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-[11px] uppercase tracking-widest text-[#D9E2FF]/50">
            Mérito del viaje
          </label>
          <div className="flex gap-2 text-[#DEC29E]">
            {Array.from({ length: 5 }).map((_, i) => (
              <button
                type="button"
                key={i}
                className="material-symbols-outlined cursor-pointer transition-transform hover:scale-110"
                style={{
                  fontVariationSettings:
                    i < (hoveredStar || selectedStar) ? "'FILL' 1" : "'FILL' 0",
                }}
                onMouseEnter={() => setHoveredStar(i + 1)}
                onMouseLeave={() => setHoveredStar(0)}
                onClick={() => setSelectedStar(i + 1)}
              >
                star
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-[11px] uppercase tracking-widest text-[#D9E2FF]/50">
            La experiencia náutica
          </label>
          <textarea
            rows={4}
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Describe tu experiencia real..."
            className="w-full bg-[#06122C] border-none rounded-lg p-4 text-[#D9E2FF] focus:ring-1 focus:ring-[#DEC29E] transition-all placeholder:text-[#D9E2FF]/30 outline-none resize-none"
          />
        </div>

        {error ? <p className="text-sm text-red-200">{error}</p> : null}

        <button
          type="submit"
          disabled={isSaving || !history.length}
          className="w-full py-4 bg-[#DEC29E] text-[#3E2D14] font-bold uppercase tracking-widest rounded-lg transition-all hover:bg-[#FBdEB8] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSaving ? 'Guardando...' : 'Enviar reseña'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
