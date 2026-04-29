// features/payment/presentation/components/BookingSummary.tsx
import React from 'react';

const BookingSummary: React.FC = () => {
  return (
    <div className="bg-white rounded-[2rem] premium-shadow border border-gray-100 flex-1 flex flex-col overflow-hidden">
      <div className="p-8 pb-10">
        <div className="flex items-center gap-3 mb-8">
          <span className="material-symbols-outlined text-maroon-gold">auto_awesome</span>
          <h3 className="text-xs font-bold text-night-blue uppercase tracking-[0.2em]">Detalles de su Odisea</h3>
        </div>

        <div className="rounded-2xl border border-dashed border-gray-200 bg-off-white/50 px-6 py-12 text-center">
          <span className="material-symbols-outlined mb-3 text-5xl text-gray-300">event_busy</span>
          <p className="text-sm font-bold uppercase tracking-widest text-night-blue">Sin reserva seleccionada</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
            El crucero, periodo, alojamiento y pasajeros se mostraran cuando el usuario seleccione una reserva real.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
