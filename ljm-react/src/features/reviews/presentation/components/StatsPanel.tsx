import React from 'react';
import type { ReviewHistoryTrip, ReviewsData } from '../reviewsData';

type Props = {
  summary: ReviewsData['summary'] | null;
  history: ReviewHistoryTrip[];
  isLoading: boolean;
};

const StatsPanel: React.FC<Props> = ({ summary, history, isLoading }) => {
  const reviewedTrips = history.filter((trip) => trip.rating).length;
  const reviewPct = history.length ? Math.round((reviewedTrips / history.length) * 100) : 0;
  const metrics = [
    { label: 'Viajes en historial', pct: history.length ? 100 : 0, value: String(history.length) },
    { label: 'Viajes valorados', pct: reviewPct, value: String(reviewedTrips) },
    { label: 'Reseñas publicadas', pct: summary?.total ? 100 : 0, value: String(summary?.total ?? 0) },
  ];

  return (
    <div
      className="p-8 rounded-lg shadow-[0px_20px_40px_rgba(2,13,39,0.4)] relative"
      style={{ background: 'rgba(30,41,68,0.8)', backdropFilter: 'blur(24px)' }}
    >
      <div className="mb-10 text-center">
        <span className="font-serif text-8xl font-bold text-[#DEC29E] block mb-2">
          {!summary && isLoading ? '--' : Number(summary?.average ?? 0).toFixed(1)}
        </span>
        <p className="text-xs uppercase tracking-[0.15em] text-[#D9E2FF]/50">Puntuación promedio real</p>
      </div>

      <div className="space-y-8">
        <h4 className="font-serif text-lg italic text-[#D9E2FF] border-b border-[#DEC29E]/10 pb-2">
          Historial verificado del cliente
        </h4>
        {metrics.map(({ label, pct, value }) => (
          <div key={label} className="space-y-2">
            <div className="flex justify-between text-[11px] uppercase tracking-wider text-[#D9E2FF]">
              <span>{label}</span>
              <span className="text-[#DEC29E] font-bold">{value}</span>
            </div>
            <div className="h-[3px] w-full bg-[#131F39] rounded-full">
              <div
                className="h-full rounded-full shadow-[0_0_8px_rgba(222,194,158,0.4)]"
                style={{
                  width: `${pct}%`,
                  background: 'linear-gradient(to right, rgba(222,194,158,0.4), #DEC29E)',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsPanel;
