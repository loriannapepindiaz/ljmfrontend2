// features/payment/presentation/components/PriceBreakdown.tsx
import React from 'react';

const PriceBreakdown: React.FC = () => {
  return (
    <section className="bg-white rounded-[2rem] p-8 premium-shadow border border-gray-100 h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-8">
          <span className="material-symbols-outlined text-maroon-gold">receipt</span>
          <h3 className="text-xs font-bold text-night-blue uppercase tracking-[0.2em]">Desglose de Tarifas</h3>
        </div>

        <div className="space-y-5">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Alojamiento Suite (10 noches)</span>
            <span className="font-semibold text-night-blue">€12,500.00</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Tasas Portuarias & Impuestos</span>
            <span className="font-semibold text-night-blue">€1,875.00</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Concierge Privado 24/7</span>
            <span className="font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-md text-[10px] uppercase">Incluido</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Servicio de Mayordomo</span>
            <span className="font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-md text-[10px] uppercase tracking-tighter">Bonificado</span>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="bg-off-white/50 p-6 rounded-2xl border border-gray-100 mb-8">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[9px] text-gray-400 uppercase font-bold tracking-widest mb-1.5">Inversión Total</p>
              <p className="text-4xl font-magiona font-bold text-night-blue leading-none">€14,375.00</p>
            </div>
            <div className="px-4 py-1.5 bg-night-blue rounded-full">
              <span className="text-[10px] font-bold text-pearl-beige uppercase tracking-[0.2em]">EUR</span>
            </div>
          </div>
        </div>

        <button className="w-full bg-night-blue text-pearl-beige font-bold py-5 px-6 rounded-2xl text-base tracking-[0.15em] uppercase hover:bg-night-blue/90 hover:scale-[1.01] active:scale-100 transition-all shadow-xl shadow-night-blue/20 flex items-center justify-center gap-4 group">
          Pagar Ahora
          <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </button>

        <p className="text-[9px] text-gray-400 text-center mt-6 leading-relaxed italic max-w-[280px] mx-auto">
          Al proceder, usted confirma su conformidad con nuestras políticas exclusivas de cancelación y términos de privacidad.
        </p>
      </div>
    </section>
  );
};

export default PriceBreakdown;