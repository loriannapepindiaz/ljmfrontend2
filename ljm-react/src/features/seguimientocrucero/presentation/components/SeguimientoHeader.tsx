import React from 'react';

const SeguimientoHeader: React.FC = () => {
  return (
    <section className="relative w-full h-[550px] flex flex-col items-center justify-center px-4 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          className="w-full h-full object-cover brightness-50"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAO1azZbFavdyBhE3NpJDMu-0xY1vKwa-eIdY7dc8-jC0UVlk3Q1qaqLNdYM1ofR3v8dcUtgMW4D5Bhcz7r9WwWeQKLjvVYDslvV3q4qKDOABJckF7o1PQwf7HJJ1oXV-WryvxEq_dDQKrRCeMPu0pzf8SyjedZ7T0lX_AUj764H3FDONxA1-AApUzo08QkG1v2pIpVWjoBdfPrbF3NlQfpNOZiuFZQgqxtZQ-X-PApkmIrYo2Oe4lPLMXYOKX-bIYKZ3a_39o-9FIa"
          alt="Crucero"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1a34] via-[#0e1a34]/60 to-transparent" />
      </div>

      <div className="z-10 w-full max-w-5xl">
        <div className="p-8 md:p-12 rounded-3xl flex flex-col items-center text-center space-y-6">
          <div className="space-y-2">
            <span className="text-[#785d32] uppercase tracking-[0.4em] text-xs font-bold">LJM Elite Voyage</span>
            <h1 className="text-5xl md:text-8xl font-medium text-white tracking-tight mb-2">The Majestic Pearl</h1>
            <p className="text-lg md:text-xl text-[#eacea9]/80 font-light italic">Mediterranean Odyssey</p>
          </div>

          {/* Countdown */}
          <div className="flex items-center gap-8 py-4 px-10 rounded-full border border-[#eacea9]/10 bg-[#0e1a34]/30 backdrop-blur-sm">
            {[{ val: '65', label: 'Días' }, { val: '12', label: 'Hrs' }, { val: '00', label: 'Min' }].map((item, i) => (
              <React.Fragment key={item.label}>
                {i > 0 && <div className="w-px h-4 bg-[#eacea9]/20" />}
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg font-bold text-white">{item.val}</span>
                  <span className="text-[10px] uppercase tracking-widest text-[#eacea9]/60 font-medium">{item.label}</span>
                </div>
              </React.Fragment>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <div className="px-5 py-2 rounded-full border border-[#785d32]/20 bg-[#785d32]/5 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#785d32] text-base">calendar_month</span>
              <span className="text-xs text-white font-medium">Sept 12 - Sept 24, 2024</span>
            </div>
            <div className="px-5 py-2 rounded-full border border-[#eacea9]/20 bg-[#eacea9]/5 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#eacea9] text-base">nights_stay</span>
              <span className="text-xs text-white font-medium">12 Noches</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeguimientoHeader;