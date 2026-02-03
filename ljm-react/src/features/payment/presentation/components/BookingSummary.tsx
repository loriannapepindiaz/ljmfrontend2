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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-8">
          <div className="flex gap-4 items-start">
            <div className="mt-1 w-10 h-10 rounded-xl bg-maroon-gold/5 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-maroon-gold text-2xl">sailing</span>
            </div>
            <div>
              <p className="text-[9px] text-gray-400 uppercase font-bold tracking-widest mb-1.5">Crucero Seleccionado</p>
              <p className="text-base font-semibold font-magiona leading-tight">Mediterráneo Imperial: Odisea Clásica</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="mt-1 w-10 h-10 rounded-xl bg-maroon-gold/5 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-maroon-gold text-2xl">calendar_month</span>
            </div>
            <div>
              <p className="text-[9px] text-gray-400 uppercase font-bold tracking-widest mb-1.5">Periodo de Viaje</p>
              <p className="text-base font-semibold leading-tight">15 Oct — 25 Oct, 2024</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="mt-1 w-10 h-10 rounded-xl bg-maroon-gold/5 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-maroon-gold text-2xl">king_bed</span>
            </div>
            <div>
              <p className="text-[9px] text-gray-400 uppercase font-bold tracking-widest mb-1.5">Alojamiento Premium</p>
              <p className="text-base font-semibold leading-tight">Grand Horizon Penthouse Suite</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="mt-1 w-10 h-10 rounded-xl bg-maroon-gold/5 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-maroon-gold text-2xl">group</span>
            </div>
            <div>
              <p className="text-[9px] text-gray-400 uppercase font-bold tracking-widest mb-1.5">Pasajeros</p>
              <p className="text-base font-semibold leading-tight">2 Adultos (Ocupación Suite)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;