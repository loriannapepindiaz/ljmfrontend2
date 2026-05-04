import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setPostAuthRedirect } from '../../../../lib/api';

const VideoSection = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showReservePrompt, setShowReservePrompt] = useState(false);

  const isLoggedIn = Boolean(localStorage.getItem('ljm_auth_token'));

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

  const handleReserveNow = () => {
    if (isLoggedIn) {
      navigate('/destinations');
      return;
    }

    setShowReservePrompt(true);
  };

  const goToAuthRoute = (path: '/login' | '/register') => {
    setPostAuthRedirect('/destinations');
    setShowReservePrompt(false);
    navigate(path);
  };

  return (
    <>
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="mb-12 flex items-center justify-between">
            <h2 className="text-4xl font-display text-gray-900 dark:text-white">
              Contempla la Travesía
            </h2>
            <button
              type="button"
              onClick={handleReserveNow}
              className="rounded-full bg-primary px-8 py-3 text-xs font-bold tracking-widest text-white shadow-lg transition-all hover:bg-luxury-gold"
            >
              RESERVAR AHORA
            </button>
          </div>

          <div className="relative aspect-video overflow-hidden rounded-3xl bg-black shadow-2xl group">
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              preload="auto"
              muted
              playsInline
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src="/video.mp4" type="video/mp4" />
              Tu navegador no soporta videos HTML5
            </video>

            <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-all group-hover:bg-black/20">
              <button
                onClick={handlePlayClick}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/90 text-white shadow-2xl transition-transform active:scale-95 group-hover:scale-110 md:h-24 md:w-24"
              >
                <span className="material-symbols-outlined text-4xl md:text-5xl">
                  {isPlaying ? 'pause' : 'play_arrow'}
                </span>
              </button>
            </div>

            <div className="pointer-events-none absolute bottom-8 left-8 md:bottom-10 md:left-10">
              <p className="font-display text-2xl text-white drop-shadow-lg md:text-3xl">
                Una Sinfonía del Océano y el Cielo
              </p>
            </div>
          </div>
        </div>
      </section>

      {showReservePrompt && (
        <>
          <div className="fixed inset-0 z-[70] bg-[#020817]/70 backdrop-blur-md" onClick={() => setShowReservePrompt(false)} />
          <div className="fixed inset-x-4 top-1/2 z-[80] mx-auto w-full max-w-xl -translate-y-1/2 overflow-hidden rounded-[2rem] border border-[#eacea9]/20 bg-[linear-gradient(145deg,rgba(8,18,36,0.98),rgba(14,26,52,0.96))] shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#eacea91a,transparent_45%)]" />
            <div className="relative p-8 md:p-10">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.35em] text-[#eacea9]/80">
                    LJM SEALINE
                  </p>
                  <h3 className="text-3xl font-display text-white">Accede para continuar tu reserva</h3>
                  <p className="mt-3 max-w-md text-sm leading-6 text-white/70">
                    Inicia sesión o crea tu cuenta para acceder a los destinos disponibles y continuar con la reserva.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowReservePrompt(false)}
                  className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>

              <div className="mb-7 rounded-[1.5rem] border border-[#eacea9]/15 bg-white/5 p-5">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center">
                    <img
                      src="/logo.png"
                      alt="LJM Sealine"
                      className="h-14 w-14 object-contain drop-shadow-[0_0_16px_rgba(234,202,169,0.45)]"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold tracking-wide text-white">Te llevamos directo a destinos después</p>
                    <p className="mt-1 text-xs leading-5 text-white/60">
                      Guardamos este paso para que, cuando entres, no tengas que buscar de nuevo.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => goToAuthRoute('/login')}
                  className="flex-1 rounded-xl bg-[#c5a059] px-6 py-3 text-sm font-bold uppercase tracking-[0.25em] text-[#0e1a34] transition hover:bg-[#d8b26a]"
                >
                  Iniciar sesión
                </button>
                <button
                  type="button"
                  onClick={() => goToAuthRoute('/register')}
                  className="flex-1 rounded-xl border border-[#eacea9]/35 bg-white/5 px-6 py-3 text-sm font-bold uppercase tracking-[0.25em] text-white transition hover:bg-white/10"
                >
                  Crear cuenta
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default VideoSection;
