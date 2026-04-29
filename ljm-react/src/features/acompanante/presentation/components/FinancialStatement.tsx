import React from 'react';

const FinancialStatement: React.FC = () => {
  return (
    <section className="max-w-4xl mx-auto">
      <div className="bg-white p-12 md:p-20 shadow-xl border-t-8 border-[#0E1A34] rounded-b-xl">
        <div className="flex justify-between items-start mb-16">
          <div>
            <h2 className="text-4xl text-[#0E1A34] mb-3" style={{ fontFamily: 'Noto Serif, serif' }}>
              Inversion Total de la Expedicion
            </h2>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#0E1A34]/40">
              Estado Financiero
            </span>
          </div>
          <span className="material-symbols-outlined text-4xl text-[#0E1A34]/10">payments</span>
        </div>

        <div className="rounded-xl border border-dashed border-[#0E1A34]/15 bg-[#0E1A34]/[0.02] px-6 py-12 text-center">
          <span className="material-symbols-outlined mb-4 text-4xl text-[#0E1A34]/20">receipt_long</span>
          <p className="text-sm uppercase tracking-[0.3em] text-[#0E1A34]/45">Sin datos financieros</p>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#0E1A34]/55">
            El desglose aparecera cuando exista una reserva, alojamiento o servicio real asociado a esta expedicion.
          </p>
        </div>

        <div className="mt-20 pt-10 border-t border-[#0E1A34]/5">
          <p className="max-w-xs text-[9px] uppercase tracking-[0.2em] text-[#0E1A34]/50 leading-loose">
            Este documento se genera con los cargos reales de la reserva activa.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinancialStatement;
