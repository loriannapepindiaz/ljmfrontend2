import React from 'react';

const bars = [
  { label: '5 STARS', pct: '72%', count: 89 },
  { label: '4 STARS', pct: '18%', count: 22 },
  { label: '3 STARS', pct: '6%',  count: 7  },
  { label: '2 STARS', pct: '3%',  count: 4  },
  { label: '1 STAR',  pct: '1%',  count: 2  },
];

const RatingOverview: React.FC = () => {
  return (
    <div className="bg-[#0F1B35] p-8 rounded-lg shadow-sm">
      <div className="flex items-end gap-6 mb-8">
        <div>
          <div className="font-label text-xs uppercase tracking-[0.2em] text-[#DEC29E] mb-2">
            Mérito Agregado
          </div>
          <div className="flex items-center gap-2">
            <span className="font-serif text-6xl font-bold text-[#D9E2FF]">4.3</span>
            <span className="text-[#D9E2FF]/60 text-xl">/ 5</span>
          </div>
        </div>
        <div className="flex flex-col mb-1">
          <div className="flex text-[#DEC29E] mb-1">
            {['star', 'star', 'star', 'star'].map((_, i) => (
              <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            ))}
            <span className="material-symbols-outlined">star_half</span>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-[#D9E2FF]/50">
            Verificado por 124 Navegantes
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {bars.map(({ label, pct, count }) => (
          <div key={label} className="flex items-center gap-4">
            <span className="text-[10px] w-12 text-[#D9E2FF]/50 uppercase">{label}</span>
            <div className="flex-1 h-1.5 bg-[#06122C] rounded-full overflow-hidden">
              <div className="h-full bg-[#DEC29E]" style={{ width: pct }} />
            </div>
            <span className="text-[10px] w-8 text-right text-[#D9E2FF]/50">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingOverview;
