import React from 'react';

const companions = [
  { initials: 'EV', name: 'Elena Valois',  role: 'Delegada Principal'    },
  { initials: 'MT', name: 'Marcus Thorne', role: 'Acompañante Ejecutivo' },
  { initials: 'ST', name: 'Sofia Thorne',  role: 'Viajera Junior'        },
];

const CompanionManifest: React.FC = () => {
  return (
    <section className="mb-32">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className="text-5xl text-[#0E1A34]" style={{ fontFamily: 'Noto Serif, serif' }}>
            Acompañantes del Viaje
          </h2>
          <div className="h-px w-24 bg-[#0E1A34] mt-6" />
        </div>
        <span className="text-[10px] uppercase tracking-[0.4em] text-[#0E1A34]/40 pb-2">
          Manifiesto 0304-A
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {companions.map((c) => (
          <div
            key={c.initials}
            className="bg-[#0E1A34] p-8 flex items-center gap-6 rounded-xl border border-white/5 transition-all duration-500 hover:-translate-y-1"
          >
            <div className="h-20 w-20 flex-shrink-0 flex items-center justify-center rounded-full border-2 border-[#DEC29E]/20 bg-[#0E1A34]">
              <span className="text-2xl text-[#DEC29E]" style={{ fontFamily: 'Noto Serif, serif' }}>
                {c.initials}
              </span>
            </div>
            <div>
              <h3 className="text-lg text-[#DEC29E]" style={{ fontFamily: 'Noto Serif, serif' }}>
                {c.name}
              </h3>
              <span className="text-[9px] uppercase tracking-widest text-white/40">{c.role}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CompanionManifest;