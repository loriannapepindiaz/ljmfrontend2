// src/features/home/presentation/components/VideoSection.tsx
import React from 'react';

const Video = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-display text-gray-900 dark:text-white">
            Witness the Journey
          </h2>
          <button className="bg-primary text-white px-8 py-3 rounded-full font-bold text-xs tracking-widest">
            BOOK NOW
          </button>
        </div>

        <div className="relative group aspect-video rounded-3xl overflow-hidden shadow-2xl">
          <img
            alt="LJM Sealine Experience"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBenHqLPS3KSVBS83nf44uuqk2y_mv3nE9s_tHGEdI1oa45o1LxX43bTqqJAfx06gzqNZbmCMx7oSVgguqA8ClJ_66voUVP_rlkC1kC7AGI0qfqFiM0JuGVDq72vm_wOQb58jdwNqPG6pp7QQMKSEqzc7tXE14aBp_0WC75toBEX4IsHKlj2yOOkn9D7VazcYYO8x9A4YjZjoL0bkxAWGB2px-rzWHV7yb075P32lb4Qf-nGcAeFjXM7Gl6lhrty9kEfUUv4-3pH8g"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all flex items-center justify-center">
            <button className="w-24 h-24 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-110">
              <span className="material-icons text-5xl">play_arrow</span>
            </button>
          </div>
          <div className="absolute bottom-10 left-10">
            <p className="text-white text-3xl font-display">
              A Symphony of Ocean & Sky
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Video;