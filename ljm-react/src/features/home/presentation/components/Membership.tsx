// src/features/home/presentation/components/Membership.tsx
import React from 'react';

const Membership = () => {
  return (
    <section className="py-24 bg-luxury-blue text-white overflow-hidden relative">
      <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
        <span className="material-symbols-outlined text-[600px] text-primary">sailing</span>
      </div>
      <div className="container mx-auto px-6 relative z-10 text-center">
        <span className="text-primary font-bold tracking-[0.4em] text-xs uppercase mb-6 block">
          The LJM Privilege
        </span>
        <h2 className="text-4xl md:text-5xl font-display mb-8">
          Join Our Membership Elite
        </h2>
        <p className="max-w-3xl mx-auto text-gray-300 mb-16 text-lg font-light leading-relaxed">
          Elevate your travels with benefits that extend far beyond the horizon. Early booking access, private shore excursions, and world-class recognition.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full border border-primary/30 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary text-3xl">workspace_premium</span>
            </div>
            <h5 className="font-display text-lg mb-2">Priority Boarding</h5>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">
              Instant access to serenity
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full border border-primary/30 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary text-3xl">wine_bar</span>
            </div>
            <h5 className="font-display text-lg mb-2">Complimentary Bars</h5>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">
              Premium spirits everywhere
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full border border-primary/30 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary text-3xl">explore</span>
            </div>
            <h5 className="font-display text-lg mb-2">Private Tours</h5>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">
              Bespoke local experiences
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full border border-primary/30 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary text-3xl">airport_shuttle</span>
            </div>
            <h5 className="font-display text-lg mb-2">Limo Transfers</h5>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">
              Door-to-sea service
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Membership;