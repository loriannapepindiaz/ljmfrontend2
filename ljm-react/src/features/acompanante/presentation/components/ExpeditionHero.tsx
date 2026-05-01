import React from 'react';

const ExpeditionHero: React.FC = () => {
  return (
    <section className="mb-24">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-[#0E1A34]" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#0E1A34]/60">
              Expedicion Actual
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl text-[#0E1A34] leading-tight mb-8 -tracking-[0.02em]"
            style={{ fontFamily: 'Noto Serif, serif' }}>
            Sin expedicion <br />
            <span className="italic font-normal">seleccionada</span>
          </h1>

          <div className="max-w-xl border-l border-[#0E1A34]/10 pl-8">
            <h3 className="text-lg italic text-[#0E1A34]/80 mb-4"
              style={{ fontFamily: 'Noto Serif, serif' }}>
              No hay reserva activa
            </h3>
            <p className="text-[#1E2944]/80 leading-relaxed font-light text-lg">
              Los detalles de destino, fechas, barco e imagen se mostraran cuando la cuenta tenga una reserva real asociada.
            </p>
          </div>
        </div>

        <div className="md:col-span-5 flex justify-center">
          <div className="flex h-[400px] w-[400px] items-center justify-center rounded-full bg-[#0E1A34]/5 shadow-inner">
            <span className="material-symbols-outlined text-7xl text-[#0E1A34]/15">sailing</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpeditionHero;
