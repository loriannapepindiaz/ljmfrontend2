import React from 'react';

const ExpeditionHero: React.FC = () => {
  return (
    <section className="mb-24">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

        <div className="md:col-span-7">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-[#0E1A34]" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#0E1A34]/60">
              Expedición Actual
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl text-[#0E1A34] leading-tight mb-8 -tracking-[0.02em]"
            style={{ fontFamily: 'Noto Serif, serif' }}>
            Grecian Islands <br />
            <span className="italic font-normal">Escape</span>
          </h1>

          <div className="max-w-xl border-l border-[#0E1A34]/10 pl-8">
            <h3 className="text-lg italic text-[#0E1A34]/80 mb-4"
              style={{ fontFamily: 'Noto Serif, serif' }}>
              Diario Náutico: Entrada Agosto 2023
            </h3>
            <p className="text-[#1E2944]/80 leading-relaxed font-light text-lg">
              Navegando los corredores azules de las Cícladas, este viaje traza las antiguas rutas marítimas entre Santorini y Mykonos. Un pasaje curado diseñado para la serenidad.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-8">
              {[
                { label: 'Salida',  value: '12 Ago, 2023'         },
                { label: 'Llegada', value: '26 Ago, 2023'         },
                { label: 'Barco',   value: 'The Azure Curator'    },
              ].map((item) => (
                <div key={item.label}>
                  <span className="block text-[9px] uppercase tracking-widest text-[#0E1A34]/40 mb-1">
                    {item.label}
                  </span>
                  <span className="text-base text-[#0E1A34]"
                    style={{ fontFamily: 'Noto Serif, serif' }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-5 flex justify-center">
          <div className="rounded-full overflow-hidden bg-[#0E1A34] shadow-2xl hover:scale-[1.02] transition-transform duration-700 h-[400px] w-[400px]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKULJ1O-hn8RASbQZitJ28BZyFgTdFmVID8RkSwUIwy2p5Qt3gtMD0FzRXFYHSaLoYwV6OLG_s9MgzE2qpukOc9dY2yoIvLZLnR47NsM8Y-oTRM-oRamC4BmCWzKAzGVcyIIQeP2uQQe8kG8A4VsURs-x8sWoE3e9u6hBp8eqcQ7Pbp4fOZZuVD-raJarHWb_hY6_fywMuya-RBYsdR4WnrmmqVOLUj-fEb_NlqiL4WiaX9tvgjrSc4PWx2n0-FBK6BHVLmUAP3sBa"
              alt="Yate de lujo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpeditionHero;