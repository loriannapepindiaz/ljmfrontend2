import React from 'react';

const items = [
  { titulo: 'Tarifas de Expedición',  sub: 'Pasaje base y logística marítima',         valor: '$8,200.00'  },
  { titulo: 'Protocolo de Servicio',  sub: 'Administración personalizada y conserjería', valor: '$2,450.00'  },
  { titulo: 'Tasas Gastronómicas',    sub: 'Provisiones premium y acceso a bodega',      valor: '$1,800.00'  },
];

const FinancialStatement: React.FC = () => {
  return (
    <section className="max-w-4xl mx-auto">
      <div className="bg-white p-12 md:p-20 shadow-xl border-t-8 border-[#0E1A34] rounded-b-xl">

        <div className="flex justify-between items-start mb-16">
          <div>
            <h2 className="text-4xl text-[#0E1A34] mb-3" style={{ fontFamily: 'Noto Serif, serif' }}>
              Inversión Total de la Expedición
            </h2>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#0E1A34]/40">
              Estado Financiero — #NC-2023-8812
            </span>
          </div>
          <span className="material-symbols-outlined text-4xl text-[#0E1A34]/10">payments</span>
        </div>

        <div className="space-y-8">
          {items.map((item) => (
            <div key={item.titulo} className="flex justify-between items-end border-b border-[#0E1A34]/5 pb-6">
              <div>
                <span className="text-xl text-[#0E1A34]" style={{ fontFamily: 'Noto Serif, serif' }}>
                  {item.titulo}
                </span>
                <p className="text-[10px] uppercase tracking-widest text-[#0E1A34]/40 mt-1">{item.sub}</p>
              </div>
              <span className="text-2xl text-[#0E1A34]" style={{ fontFamily: 'Noto Serif, serif' }}>
                {item.valor}
              </span>
            </div>
          ))}

          <div className="flex justify-between items-center pt-12">
            <span className="text-xs uppercase tracking-[0.5em] text-[#0E1A34]/60">Total General</span>
            <div className="text-right">
              <span className="text-6xl text-[#0E1A34]" style={{ fontFamily: 'Noto Serif, serif' }}>
                $12,450.00
              </span>
              <p className="text-[10px] text-[#0E1A34]/40 mt-3 uppercase tracking-widest font-medium">
                USD | Todos los cargos liquidados
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-[#0E1A34]/5 flex flex-col md:flex-row justify-between gap-12">
          <div className="max-w-xs">
            <p className="text-[9px] uppercase tracking-[0.2em] text-[#0E1A34]/50 leading-loose">
              Este documento sirve como registro formal de la inversión de la expedición Grecian Islands Escape. Para ajustes o auditorías, contacte la Oficina del Curador.
            </p>
          </div>
          <div className="flex flex-col items-end opacity-60">
            <div className="h-px w-40 bg-[#0E1A34] mb-4" />
            <span className="italic text-sm text-[#0E1A34]" style={{ fontFamily: 'Noto Serif, serif' }}>
              Sello del Curador Náutico
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinancialStatement;