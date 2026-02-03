// src/features/home/presentation/components/VideoSection.tsx
import React, { useRef, useState } from 'react';

const VideoSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-display text-gray-900 dark:text-white">
            Witness the Journey
          </h2>
          <button className="bg-primary text-white px-8 py-3 rounded-full font-bold text-xs tracking-widest hover:bg-luxury-gold transition-all shadow-lg">
            BOOK NOW
          </button>
        </div>

        <div className="relative group aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black">
          {/* Video desde public */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            preload="auto"
            muted
            playsInline
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src="/video.mp4" type="video/mp4" />
            Tu navegador no soporta videos HTML5
          </video>

          {/* Overlay con botón play (se muestra encima del video) */}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
            <button
              onClick={handlePlayClick}
              className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-110 active:scale-95"
            >
              <span className="material-symbols-outlined text-4xl md:text-5xl">
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>
          </div>

          {/* Texto inferior izquierdo */}
          <div className="absolute bottom-8 left-8 md:bottom-10 md:left-10 pointer-events-none">
            <p className="text-white text-2xl md:text-3xl font-display drop-shadow-lg">
              A Symphony of Ocean & Sky
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;