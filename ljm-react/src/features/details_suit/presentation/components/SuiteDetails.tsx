// features/details_suit/presentation/components/SuiteDetails.tsx
import React from 'react';
import type { BookingDestinationDraft, BookingSuiteDraft } from '../../../../lib/bookingDraft';

interface SuiteDetailsProps {
  suite?: BookingSuiteDraft;
  destination?: BookingDestinationDraft;
}

const SuiteDetails: React.FC<SuiteDetailsProps> = ({ suite, destination }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <span className="w-12 h-[1px] bg-maroon-gold" />
        <span className="text-xs font-bold text-maroon-gold uppercase tracking-[0.3em]">Resumen y descripción</span>
      </div>

      <h2 className="text-4xl magiona-title text-night-blue mb-4 leading-tight">
        {suite?.title || 'Sin suite seleccionada'}
      </h2>

      <p className="text-gray-600 leading-relaxed text-lg mb-8 italic font-light">
        {suite?.description || 'Selecciona una cabina real para ver el barco, tamaño, capacidad, descripción y servicios disponibles.'}
      </p>

      {suite && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-white border border-gray-100 p-5 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-maroon-gold">Tamano</p>
            <p className="mt-2 text-xl font-bold text-night-blue">{suite.size}</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-5 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-maroon-gold">Capacidad</p>
            <p className="mt-2 text-xl font-bold text-night-blue">{suite.capacity}</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-5 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-maroon-gold">Destino</p>
            <p className="mt-2 text-xl font-bold text-night-blue">{destination?.titulo || 'Destino pendiente'}</p>
          </div>
          <div className="rounded-2xl bg-white border border-gray-100 p-5 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-maroon-gold">Precio</p>
            <p className="mt-2 text-xl font-bold text-night-blue">${suite.pricePerNight.toLocaleString()} / noche</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuiteDetails;
