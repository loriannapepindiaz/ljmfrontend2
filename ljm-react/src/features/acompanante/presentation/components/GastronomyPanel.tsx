import React from 'react';

const items: Array<{ icon: string; titulo: string; desc: string }> = [];

const GastronomyPanel: React.FC = () => {
  return (
    <div className="bg-[#0E1A34] text-white p-12 md:p-16 shadow-2xl rounded-xl">
      <span className="text-[10px] uppercase tracking-[0.4em] text-[#DEC29E]/60">
        Gastronomia Curada
      </span>
      <h2 className="text-4xl mt-4 mb-10" style={{ fontFamily: 'Noto Serif, serif' }}>
        Sin provisiones seleccionadas
      </h2>

      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/10 bg-white/[0.03] px-6 py-12 text-center">
          <span className="material-symbols-outlined mb-4 text-5xl text-[#DEC29E]/30">restaurant</span>
          <p className="text-sm font-bold uppercase tracking-widest text-white/70">Sin datos gastronomicos</p>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/45">
            Las preferencias y servicios gastronomicos apareceran cuando se guarden en la reserva.
          </p>
        </div>
      ) : (
        <div className="space-y-10">
          {items.map((item) => (
            <div key={item.titulo} className="flex gap-6 items-start">
              <span className="material-symbols-outlined text-[#DEC29E] text-2xl">{item.icon}</span>
              <div>
                <h4 className="text-xl mb-2" style={{ fontFamily: 'Noto Serif, serif' }}>
                  {item.titulo}
                </h4>
                <p className="text-sm text-white/60 font-light leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GastronomyPanel;
