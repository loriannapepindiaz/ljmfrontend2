// features/payment/presentation/components/PriceBreakdown.tsx
import React from 'react';

interface PriceBreakdownProps {
  selectedMethod?: any;
}

const PriceBreakdown: React.FC<PriceBreakdownProps> = () => {
  return (
    <section className="bg-white rounded-[2rem] p-8 premium-shadow border border-gray-100 h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-8">
          <span className="material-symbols-outlined text-maroon-gold">receipt</span>
          <h3 className="text-xs font-bold text-night-blue uppercase tracking-[0.2em]">Desglose de Tarifas</h3>
        </div>

        <div className="rounded-2xl border border-dashed border-gray-200 bg-off-white/50 px-6 py-12 text-center">
          <span className="material-symbols-outlined mb-3 text-5xl text-gray-300">receipt_long</span>
          <p className="text-sm font-bold uppercase tracking-widest text-night-blue">Sin cargos disponibles</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
            Los cargos se calcularan con los datos reales de la reserva, alojamiento, impuestos y servicios elegidos.
          </p>
        </div>
      </div>

      <div className="mt-12">
        <button
          className="w-full py-5 rounded-2xl text-base font-bold uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-4 bg-gray-100 text-gray-400 cursor-not-allowed"
          disabled
        >
          Realizar pago
          <span className="material-symbols-outlined">lock</span>
        </button>
      </div>
    </section>
  );
};

export default PriceBreakdown;
