import React from 'react';
import SeguimientoHeader from '../components/SeguimientoHeader';
import RutaProgreso from '../components/RutaProgreso';
import BookingSummary from '../components/BookingSummary';
import PaqueteDetalle from '../components/PaqueteDetalle';
import HighlightsRow from '../components/HighlightsRow';
import ItinerarioBanner from '../components/ItinerarioBanner';

const SeguimientoCruceroPage: React.FC = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#0e1a34] text-slate-100">

      {/* Header con imagen */}
      <SeguimientoHeader />

      {/* Contenido principal */}
      <div className="w-full max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Columna izquierda */}
        <div className="lg:col-span-4 space-y-8">
          <RutaProgreso />
          <BookingSummary />
        </div>

        {/* Columna derecha */}
        <div className="lg:col-span-8 space-y-8">
          <PaqueteDetalle />
          <HighlightsRow />
          <ItinerarioBanner />
        </div>

      </div>

      {/* Footer */}
      <footer className="bg-[#0e1a34] border-t border-[#eacea9]/10 py-12 px-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">LJM Sealine © 2026</span>
          <div className="flex gap-8 text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
            {['Privacidad', 'Términos', 'Soporte', 'Contacto'].map((item) => (
              <a key={item} className="hover:text-[#eacea9] transition-colors" href="#">{item}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SeguimientoCruceroPage;