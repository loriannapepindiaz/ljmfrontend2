// features/details_suit/presentation/components/SuiteHighlights.tsx
import React from 'react';
import type { BookingSuiteDraft } from '../../../../lib/bookingDraft';

interface SuiteHighlightsProps {
  suite?: BookingSuiteDraft;
}

const SuiteHighlights: React.FC<SuiteHighlightsProps> = ({ suite }) => {
  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col h-full">
      <div className="flex justify-between items-start mb-8">
        <h3 className="magiona-title text-2xl text-night-blue font-bold">Detalles de la Suite</h3>
        <span className="text-[10px] font-bold text-maroon-gold uppercase tracking-widest">
          {suite?.title || 'Sin suite seleccionada'}
        </span>
      </div>

      {suite ? (
        <div className="flex flex-1 flex-col gap-4">
          <div className="grid gap-4">
            {suite.highlights.map((highlight) => (
              <div className="flex items-start gap-4 rounded-2xl bg-off-white/70 p-4 border border-gray-100" key={highlight}>
                <span className="material-symbols-outlined text-maroon-gold">stars</span>
                <p className="text-sm font-semibold text-night-blue">{highlight}</p>
              </div>
            ))}
          </div>
          <div className="mt-auto rounded-2xl bg-night-blue p-5 text-white">
            <p className="text-[10px] uppercase tracking-[0.25em] text-pearl-beige/70">Capacidad</p>
            <p className="mt-2 text-xl font-bold">{suite.capacity}</p>
            <p className="mt-4 text-[10px] uppercase tracking-[0.25em] text-pearl-beige/70">Desde</p>
            <p className="mt-2 text-2xl font-bold text-pearl-beige">${suite.pricePerNight.toLocaleString()} / noche</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-off-white/50 px-6 py-12 text-center">
          <div>
            <span className="material-symbols-outlined mb-3 text-5xl text-gray-300">hotel</span>
            <p className="text-sm font-bold uppercase tracking-widest text-night-blue">Sin destacados</p>
            <p className="mt-2 text-sm text-gray-500">Los destacados apareceran cuando se seleccione una suite real.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuiteHighlights;
