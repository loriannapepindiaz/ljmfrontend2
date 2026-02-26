// src/features/Room/presentation/components/RoomHeader.tsx
import React from 'react';

export const RoomHeader = () => {
  return (
    <>
      <div className="w-full max-w-3xl mx-auto flex flex-col gap-4">
        <div className="flex justify-between items-center px-2">
          <span className="text-accent/60 text-[10px] font-bold tracking-[0.2em]">DESTINATION</span>
          <span className="text-accent/60 text-[10px] font-bold tracking-[0.2em]">SUITE</span>
          <span className="text-primary text-[10px] font-bold tracking-[0.2em]">CUSTOMIZATION</span>
          <span className="text-accent/30 text-[10px] font-bold tracking-[0.2em]">PAYMENT</span>
        </div>
        <div className="relative h-[2px] w-full bg-accent/10 rounded-full overflow-hidden">
          <div className="absolute top-0 left-0 h-full bg-primary w-[75%]"></div>
          <div className="absolute top-0 left-0 h-full flex w-full justify-between items-center -translate-y-1/2 mt-[1px]">
            <div className="size-2 rounded-full bg-primary shadow-[0_0_10px_rgba(120,93,50,0.8)]"></div>
            <div className="size-2 rounded-full bg-primary shadow-[0_0_10px_rgba(120,93,50,0.8)]"></div>
            <div className="size-2 rounded-full bg-primary shadow-[0_0_10px_rgba(120,93,50,0.8)]"></div>
            <div className="size-2 rounded-full bg-accent/20"></div>
          </div>
        </div>
      </div>

      <div className="text-center space-y-3">
        <h2 className="text-accent font-display text-4xl md:text-5xl font-light tracking-tight italic">Elevate Your Voyage</h2>
        <p className="text-accent/70 text-lg font-light max-w-xl mx-auto">Select elite on-board experiences to personalize your stay.</p>
      </div>
    </>
  );
};