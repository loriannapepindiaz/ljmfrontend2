// features/payment/presentation/components/PaymentHeader.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-night-blue pt-6 pb-20 px-6 sm:px-10 lg:px-20 text-pearl-beige relative overflow-hidden">
      {/* Círculos decorativos */}
      <div className="absolute right-0 top-0 w-64 h-64 border border-white/5 rounded-full translate-x-1/2 -translate-y-1/2" />
      <div className="absolute left-0 bottom-0 w-48 h-48 border border-white/5 rounded-full -translate-x-1/2 translate-y-1/2" />

      <header className="flex w-full items-center justify-between mb-8 relative z-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-3xl">sailing</span>
          <h2 className="text-xl font-bold leading-tight tracking-widest font-magiona uppercase">LJM Sealine</h2>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-[0.2em] opacity-60">Seguridad Garantizada</span>
            <span className="text-xs font-semibold">SSL Encriptado</span>
          </div>
          <button 
            onClick={() => navigate('/details-suit')}
            className="bg-white/10 p-2 rounded-full border border-white/10 hover:bg-white/20 transition-colors"
            title="Volver atrás"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto relative z-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-magiona mb-8 tracking-tight">Confirmar Reserva</h1>
        <div className="flex items-center justify-center max-w-md mx-auto gap-4">
          <span className="text-[10px] font-bold tracking-[0.3em] text-pearl-beige/80 uppercase">Barcelona</span>
          <div className="flex-1 flex items-center relative h-4">
            <div className="h-[1px] w-full bg-pearl-beige/30" />
            <div className="absolute left-1/2 -translate-x-1/2 bg-night-blue px-2">
              <span className="material-symbols-outlined text-pearl-beige text-xl leading-none" style={{ fontVariationSettings: "'FILL' 1" }}>
                directions_boat
              </span>
            </div>
          </div>
          <span className="text-[10px] font-bold tracking-[0.3em] text-pearl-beige/80 uppercase">Venecia</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentHeader;