// features/details_suit/presentation/components/DetailsFooter.tsx
import React from 'react';

const DetailsFooter: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-32">
          <a className="flex flex-col items-center gap-3 group" href="#">
            <span className="material-symbols-outlined text-maroon-gold text-2xl font-light">anchor</span>
            <span className="text-[9px] font-bold text-maroon-gold uppercase tracking-[0.3em]">
              Nuestra Flota
            </span>
          </a>

          <a className="flex flex-col items-center gap-3 group" href="#">
            <span className="material-symbols-outlined text-maroon-gold text-2xl font-light">tune</span>
            <span className="text-[9px] font-bold text-maroon-gold uppercase tracking-[0.3em]">
              Configurador
            </span>
          </a>

          <a className="flex flex-col items-center gap-3 group" href="#">
            <span className="material-symbols-outlined text-maroon-gold text-2xl font-light">diamond</span>
            <span className="text-[9px] font-bold text-maroon-gold uppercase tracking-[0.3em]">
              Sealine Elite
            </span>
          </a>

          <a className="flex flex-col items-center gap-3 group" href="#">
            <span className="material-symbols-outlined text-maroon-gold text-2xl font-light">headset_mic</span>
            <span className="text-[9px] font-bold text-maroon-gold uppercase tracking-[0.3em]">
              Atención VIP
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default DetailsFooter;