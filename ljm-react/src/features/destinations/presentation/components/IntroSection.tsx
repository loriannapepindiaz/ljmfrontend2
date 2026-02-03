// src/pages/destinations/components/IntroSection.jsx
import React from 'react';

const IntroSection = () => {
  return (
    <section className="bg-background-luxury pt-32 pb-16 text-center">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-center mb-6">
          <span className="text-[#785d32] font-semibold uppercase tracking-[0.2em] text-[10px] md:text-xs">Top Destination</span>
        </div>
        <h2 className="magiona-style text-3xl md:text-5xl lg:text-6xl text-[#0e1a34] mb-8 leading-tight">
          Let&apos;s Explore Your Dream Destination Here!
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          We have recommended popular destinations every week so you don&apos;t have to worry about your dream destination with LJM Sealine.
        </p>
      </div>
    </section>
  );
};

export default IntroSection;
