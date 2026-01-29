// features/payment/presentation/components/PaymentFooter.tsx
import React from 'react';

const PaymentFooter: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 px-8 py-5 flex justify-center mt-auto">
      <div className="flex gap-16 text-gray-400">
        <div className="flex flex-col items-center gap-1 cursor-pointer hover:text-night-blue transition-colors group">
          <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">anchor</span>
          <span className="text-[9px] font-bold uppercase tracking-widest">Nuestra Flota</span>
        </div>

        <div className="flex flex-col items-center gap-1 text-maroon-gold cursor-pointer">
          <span className="material-symbols-outlined text-xl">shopping_cart_checkout</span>
          <span className="text-[9px] font-bold uppercase tracking-widest">Reserva Activa</span>
        </div>

        <div className="flex flex-col items-center gap-1 cursor-pointer hover:text-night-blue transition-colors group">
          <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">diamond</span>
          <span className="text-[9px] font-bold uppercase tracking-widest">Sealine Elite</span>
        </div>

        <div className="flex flex-col items-center gap-1 cursor-pointer hover:text-night-blue transition-colors group">
          <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">headset_mic</span>
          <span className="text-[9px] font-bold uppercase tracking-widest">Atención VIP</span>
        </div>
      </div>
    </footer>
  );
};

export default PaymentFooter;