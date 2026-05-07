import React from 'react';
import type { ReviewsData } from '../reviewsData';

type Props = {
  summary: ReviewsData['summary'] | null;
  isLoading: boolean;
};

const RatingOverview: React.FC<Props> = ({ summary, isLoading }) => {
  const average = summary?.average ?? 0;
  const total = summary?.total ?? 0;
  const distribution = summary?.distribution ?? [5, 4, 3, 2, 1].map((stars) => ({ stars, count: 0, pct: 0 }));

  return (
    <div className="bg-[#0F1B35] p-8 rounded-lg shadow-sm">
      <div className="flex items-end gap-6 mb-8">
        <div>
          <div className="font-label text-xs uppercase tracking-[0.2em] text-[#DEC29E] mb-2">
            Mérito agregado
          </div>
          <div className="flex items-center gap-2">
            <span className="font-serif text-6xl font-bold text-[#D9E2FF]">{isLoading ? '--' : average.toFixed(1)}</span>
            <span className="text-[#D9E2FF]/60 text-xl">/ 5</span>
          </div>
        </div>
        <div className="flex flex-col mb-1">
          <div className="flex text-[#DEC29E] mb-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className="material-symbols-outlined"
                style={{ fontVariationSettings: i < Math.round(average) ? "'FILL' 1" : "'FILL' 0" }}
              >
                star
              </span>
            ))}
          </div>
          <span className="text-[10px] uppercase tracking-widest text-[#D9E2FF]/50">
            {total} reseñas verificadas
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {distribution.map(({ stars, pct, count }) => (
          <div key={stars} className="flex items-center gap-4">
            <span className="text-[10px] w-12 text-[#D9E2FF]/50 uppercase">{stars} star</span>
            <div className="flex-1 h-1.5 bg-[#06122C] rounded-full overflow-hidden">
              <div className="h-full bg-[#DEC29E]" style={{ width: `${pct}%` }} />
            </div>
            <span className="text-[10px] w-8 text-right text-[#D9E2FF]/50">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingOverview;
