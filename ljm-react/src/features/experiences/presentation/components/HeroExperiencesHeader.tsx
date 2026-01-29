// src/features/home/presentation/components/VideoSection.tsx (o como lo llames)
import React from 'react';

const Video: React.FC = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl md:text-5xl font-display text-gray-900 dark:text-white">
            Witness the Journey
          </h2>
          <button className="bg-primary text-white px-8 py-3 rounded-full font-bold text-xs tracking-widest hover:bg-luxury-gold transition-all shadow-lg">
            BOOK NOW
          </button>
        </div>

        <div className="relative group aspect-video rounded-3xl overflow-hidden shadow-2xl">
          {/* Thumbnail del video */}
          <img
            alt="LJM Sealine Experience"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBenHqLPS3KSVBS83nf44uuqk2y_mv3nE9s_tHGEdI1oa45o1LxX43bTqqJAfx06gzqNZbmCMx7oSVgguqA8ClJ_66voUVP_rlkC1kC7AGI0qfqFiM0JuGVDq72vm_wOQb58jdwNqPG6pp7QQMKSEqzc7tXE14aBp_0WC75toBEX4IsHKlj2yOOkn9D7VazcYYO8x9A4YjZjoL0bkxAWGB2px-rzWHV7yb075P32lb4Qf-nGcAeFjXM7Gl6lhrty9kEfUUv4-3pH8g"
          />

          {/* Overlay con botón play */}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all flex items-center justify-center">
            <button className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-110">
              <span className="material-symbols-outlined text-4xl md:text-5xl">play_arrow</span>
            </button>
          </div>

          {/* Texto inferior */}
          <div className="absolute bottom-8 left-8 md:bottom-10 md:left-10">
            <p className="text-white text-2xl md:text-3xl font-display drop-shadow-lg">
              A Symphony of Ocean & Sky
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Video;