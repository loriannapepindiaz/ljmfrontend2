// src/features/fleet/presentation/components/FleetHero.tsx
import React from 'react';

const FleetHero: React.FC = () => {
  return (
    <section className="relative h-[85vh] overflow-hidden bg-navy flex items-center">
      <div className="absolute inset-0 z-0">
        <img
          alt="Colossal luxury cruise ship"
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3Cm8Vp0BIDOeE9LPnNUOX5uAv4NSFUIRepWGM_nwiFdcKcs-11vOlYw9AyiCU_OWP-aUClbHS0ZsWSs7G4yAH_AfRVqEqAzCwVCJ2iQYCX4tYu4mMQ0QfodvK2XDfaKYVLxbg05n45e3aJg0aIjLCskHdNiWR8Ea235_VZxZEiveOtZ0j8UxSjqFE9QtwTGs44Sk6JOw8CKmM_deQ_lxKRz-be27MIhJOfpNlu_Db9H2udvLmYq_WSHmVJa8nMhczMr1LHbdRRyQ"
        />
        <div className="absolute inset-0 hero-gradient" />
      </div>

      <div className="container mx-auto px-6 lg:px-20 relative z-10 flex flex-col md:flex-row items-center justify-between pb-24">
        <div className="max-w-2xl mb-12 md:mb-0 md:ml-12 lg:ml-20">
          <h1 className="font-magiona text-6xl md:text-8xl text-white mb-6 leading-tight">
            OUR ELITE <br />
            <span className="text-pearl">FLEET</span>
          </h1>
          <p className="text-pearl/80 text-lg max-w-lg mb-8 leading-relaxed">
            Experience the pinnacle of maritime luxury. Our exclusive fleet is designed to provide an unparalleled journey across the world's most breathtaking horizons.
          </p>
          <div className="flex space-x-4">
            <button className="bg-primary text-white px-10 py-4 rounded-full font-bold uppercase text-sm tracking-widest hover:scale-105 transition-transform">
              Explore Now
            </button>
            <button className="border border-pearl text-pearl px-10 py-4 rounded-full font-bold uppercase text-sm tracking-widest hover:bg-pearl hover:text-navy transition-all">
              Watch Film
            </button>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-2xl p-8 rounded-5xl border border-white/20 shadow-2xl max-w-xs">
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex -space-x-3">
              <img
                alt="Guest 1"
                className="h-10 w-10 rounded-full border-2 border-navy object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0UQd7jaEcOYpM7xplfbOVSXbd5-3tNfz6a2DuC3_uHDtcYl2noKh_rAytSWn1mmtm1c93qVatMIsL83l4ImF5UYSRfroijG_bPkc-WOYj3J4SUrtNDdAtv3UMy9DCSe20_ewGqb9Z2eq96EKZNEOUN6yyMcyZmHSYzT2xzRUQ1f-KiKdoAYL2HaIgh3N93tV_JasynqpVZlp6hHjrDuGodS1C_abAR6X_nBvNzMewO76GWZrCqZrBus_DkHY32b2lBaYC2xv-_xw"
              />
              <img
                alt="Guest 2"
                className="h-10 w-10 rounded-full border-2 border-navy object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAC8w9hQX9LaVKxIxVCg8Tjk7b_dQ0YPM2zHWq9WWlT3Cj3mPG2zYwndelWE2Q8FovKY67R4u00CQfHqnanqfKoiSyNrZx7SFTN6tUYeEQrgobCwe1kjZ9DbLYl4Hxy6859qu67t2wsvFFaNjtVmb3vPeXpb-_xjAHvKxlr8cD-YbXQV5Rakbgl4aG0fcIhd8AxRuiEsK4XNDqha9xASh9VS5YDHjiX_wiiFsWq2nhC3hHVwE3L5zQDgwodinjTH_LEzRUiIcssnXU"
              />
              <img
                alt="Guest 3"
                className="h-10 w-10 rounded-full border-2 border-navy object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuApfBEbky_3UFHPut2XTdqVPbUbCQE0oE0i4vFBk_R4QDISy5EknHaTmelzw4n0fBFKv2h94RXRPF7YZFA9zoXPI7XmJz03m1hDujMtN4KLnatJRkkazOF2xlK6H2u_Hhx-IMe4xve4BkCtFI6-q-Pxg4XDX__WC7OrhdeWvwlxIoKHK9TbVyOXlr0fVXo0Cep-Ayqi0fzG9RJk_kVl7L6hLpoVkPon6_PvwFafF2UeRehea2V7FeLiGeKR-4-SrfAERl3B8i9wcmI"
              />
            </div>
            <span className="text-white text-xs uppercase tracking-widest">Guest Reviews</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-5xl font-magiona text-white">5.0</span>
            <span className="material-symbols-outlined text-primary fill-1 text-4xl">star</span>
          </div>
          <p className="text-pearl text-sm mt-2 font-medium">Excellence Award 2024</p>
          <p className="text-white/60 text-xs mt-1">Trusted by world travelers for exceptional maritime experiences.</p>
        </div>
      </div>
    </section>
  );
};

export default FleetHero;