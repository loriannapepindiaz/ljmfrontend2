// features/details_suit/presentation/components/DetailsSuitHeader.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const DetailsSuitHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <header className="bg-night-blue pt-6 pb-6 px-6 sm:px-10 lg:px-20 text-pearl-beige relative overflow-hidden">
        {/* Círculos decorativos */}
        <div className="absolute right-0 top-0 w-64 h-64 border border-white/5 rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute left-0 bottom-0 w-48 h-48 border border-white/5 rounded-full -translate-x-1/2 translate-y-1/2" />

        <div className="flex w-full items-center justify-between relative z-10 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-3xl">sailing</span>
            <h2 className="text-xl font-bold leading-tight tracking-widest font-magiona uppercase">LJM Sealine</h2>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-xs font-bold text-pearl-beige uppercase tracking-[0.2em] border-b-2 border-pearl-beige pb-1">
              01 ITINERARIO
            </a>
            <a href="#" className="text-xs font-bold text-gray-300 uppercase tracking-[0.2em] hover:text-pearl-beige transition">
              02 PERSONALIZACIÓN
            </a>
            <a href="#" className="text-xs font-bold text-gray-300 uppercase tracking-[0.2em] hover:text-pearl-beige transition">
              03 CONFIRMACIÓN
            </a>
          </nav>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[10px] uppercase tracking-[0.2em] opacity-60">Seguridad Garantizada</span>
              <span className="text-xs font-semibold">SSL Encriptado</span>
            </div>
            <button 
              onClick={() => navigate('/')}
              className="bg-white/10 p-2 rounded-full border border-white/10 hover:bg-white/20 transition-colors"
              title="Volver al inicio"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default DetailsSuitHeader;
