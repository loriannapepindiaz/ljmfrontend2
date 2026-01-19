// src/features/home/presentation/components/Hero.tsx
import React from 'react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 hero-gradient">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-display text-white mb-6 leading-tight">
          Explore the Horizon in <br />
          <span className="italic text-primary">Absolute Elegance</span>
        </h1>

        <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light">
          Discover the most exclusive destinations aboard our boutique liners. A journey where luxury meets the vastness of the ocean.
        </p>

        <div className="max-w-5xl mx-auto bg-white dark:bg-luxury-blue p-2 rounded-2xl shadow-2xl border border-primary/20 flex flex-wrap md:flex-nowrap items-center gap-4">
          <div className="flex-1 min-w-[200px] px-6 py-4 border-r border-gray-100 dark:border-gray-700 flex flex-col items-start">
            <span className="text-[10px] font-bold text-primary tracking-widest uppercase mb-1">Destination</span>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-gray-400 text-sm">location_on</span>
              <input
                className="bg-transparent border-none focus:ring-0 text-sm w-full p-0 font-medium"
                placeholder="Where to?"
                type="text"
              />
            </div>
          </div>

          <div className="flex-1 min-w-[200px] px-6 py-4 border-r border-gray-100 dark:border-gray-700 flex flex-col items-start text-left">
            <span className="text-[10px] font-bold text-primary tracking-widest uppercase mb-1">Departure</span>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-gray-400 text-sm">calendar_today</span>
              <span className="text-sm font-medium">Select Date</span>
            </div>
          </div>

          <div className="flex-1 min-w-[200px] px-6 py-4 border-r border-gray-100 dark:border-gray-700 flex flex-col items-start text-left">
            <span className="text-[10px] font-bold text-primary tracking-widest uppercase mb-1">Guests</span>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-gray-400 text-sm">person_outline</span>
              <span className="text-sm font-medium">2 Guests, 1 Suite</span>
            </div>
          </div>

          <button className="w-full md:w-auto bg-primary hover:bg-luxury-gold text-white px-10 py-5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
            <span className="material-symbols-outlined">search</span>
            FIND CRUISE
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;