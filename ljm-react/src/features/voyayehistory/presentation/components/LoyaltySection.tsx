import React from 'react';

const LoyaltySection: React.FC = () => {
  return (
    <section className="mt-16 pt-16 border-t border-slate-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        <div className="p-8 bg-[#eacea9]/10 rounded-xl border border-[#eacea9]/20">
          <span className="material-symbols-outlined text-[#eacea9] mb-4 text-3xl block">star</span>
          <h4 className="text-xl font-bold text-[#0e1a34] mb-2" style={{ fontFamily: 'Newsreader, serif' }}>
            Beneficios Elite
          </h4>
          <p className="text-sm text-slate-500">
            Disfrute de embarque prioritario, acceso exclusivo al salón y excursiones privadas en todos los cruceros futuros.
          </p>
        </div>

        <div className="p-8 bg-[#0e1a34]/5 rounded-xl border border-[#0e1a34]/10">
          <span className="material-symbols-outlined text-[#0e1a34] mb-4 text-3xl block">workspace_premium</span>
          <h4 className="text-xl font-bold text-[#0e1a34] mb-2" style={{ fontFamily: 'Newsreader, serif' }}>
            Sea Miles Acumuladas
          </h4>
          <p className="text-3xl font-bold text-[#0e1a34] mb-1" style={{ fontFamily: 'Newsreader, serif' }}>
            124,500
          </p>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">
            25,500 más para Grand Admiral
          </p>
        </div>

        <div className="p-8 bg-slate-900 rounded-xl text-white relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="text-xl font-bold mb-2" style={{ fontFamily: 'Newsreader, serif' }}>
              Concierge Privado
            </h4>
            <p className="text-sm text-white/70 mb-4">
              Asistencia dedicada para todas sus necesidades marítimas.
            </p>
            <button className="text-[#eacea9] text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
              Contactar Ahora
              <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </button>
          </div>
          <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-white/10 text-9xl">
            support_agent
          </span>
        </div>

      </div>
    </section>
  );
};

export default LoyaltySection;