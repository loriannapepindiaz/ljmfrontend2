// src/features/room/RoomPage.tsx  o donde lo tengas
import type { FC } from 'react';

import ProgressSteps from './components/presentation/ProgressSteps';
import ExperienceCard from './components/presentation/ExperienceCard';

// Importas Navbar y Footer desde donde los tengas
import Navbar from '@/components/layout/Navbar';     // o el path que uses
import Footer from '@/components/layout/Footer';     // o el path que uses

const experiences = [
  {
    title: 'Michelin Star Dining',
    description: 'Indulge in a multi-course gastronomic journey crafted by world-renowned chefs.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHRzZZLttTDzbN8x7apTbTY8-v8mIKkZPOm59BQ3TX9DA5px6hyzPQi_EqUghJGviWHIcj7rSg5cdPGRKexS_z1C7MaM4Z4HG7r7__gs1kCF5JANFhFGsGxMS8v6ZA3ZLZ3uMOmQ8FBQFVzghPzf8mFlm5AWILGn1m4pBdU5ZgEH1DqMP8h8ONOMQ_Ni_x5NvAhdYHu-Q7vJXH0cKlzGofuqW3vBLPuPGqk23rgOJTP7Zx3wVy3YrBBIsjQAcw0HSZ5F7CnzlZR4o',
    selected: false,
  },
  {
    title: 'Zenith Wellness Spa',
    description: 'Rejuvenate your senses with holistic treatments in a sanctuary of absolute tranquility.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCihe7PXjPihW2CUU99x5sUnl1JKk2rs39qF6NSgHZHG6p1XKOliSCfKgo_K8U_qyVfq8e_AnKvB4oaCqBBpzJZ1ZaxsviK7NRaHGJ6C73dkgPLAT2OjKepZL8cE10iwkZbHp8E0T8uWQp3CV-iTCcfrpvln-3H4nNVuwX8GvVh8Hgu9m_ltP98OJXbS6Ez5Gc9Bzoou7PxkpuAPwBiLN44fsPXjhHgbTuUIaMt-WWgTeGHmpepNADQAQVoy_jGQRb6PA3nAl5BWw0',
    selected: false,
  },
  {
    title: 'Royal Penthouse',
    description: 'Experience unparalleled luxury with expansive private terraces and 24/7 butler service.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTo30vnylXxusSwJ0ej11UodSso9-5WhAjGKW7NlFfJwETHlLYlcDMMrHCpE1tAVCaG7a5-u4CY5qsOF1LA5SUX4LmOWTZUVfw0vxekw1n6ApJj7ADK3Sv39ZK8ReS0ouo8Vbd7vTIumA3_CJo8kXuAty_9kE6mRtzNypy5ofBfp_6OEZQXy13ZwJCHhdJtpF9ub3AkPsjnwreYDKvwQvAUF30hEMkD3BXzOxEC1Fo_9b0JtNDQ_GV09dxqk_qCHpN0kMvGChOtOU',
    selected: true,
  },
  {
    title: 'Starlight Observatory',
    description: 'Unlock the mysteries of the cosmos with expert-led stargazing sessions on the open sea.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAoFI75_GHTxRtAmEqjGVXFxF-CfrLUUx1SfFYIwnkE3EprPQ_sKUCzm1pWxvhMX0v7Bwrl6WfM5ZES79hPDa2x0F94SXisJ8vMMXOd1BngvXuB5Az02K9cv3Gx09pY1pTPtwvnLHg-lu0xi5UQdo005WL4JObjCv_kMN7h7RwNJUpbA_Yj8-qtkWZT7R8fU28vnSK2ogkYbLhpnEdg3rG0DxKZdcYBcgpqbK2sv4wJS4q0Eu1Bbs9Z-iFgxa0JFAAsFxDHyUED87o',
    selected: false,
  },
];

const RoomPage: FC = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 lg:p-12 overflow-hidden">
      {/* Fondo fijo */}
      <div className="fixed inset-0 z-0">
        <img
          alt="Luxury cruise deck at sunset"
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC452Pu70ahp8xhmTebKdEz4fs6mG964FtpeFL1U5001s3JZbsgQgZJVGyxS1lxnHqyqvGMSl8olisyBSMjccvpKAqRApqM3ocCqvxYXcSRN9dUlQl-Sn4yzlddCpdnFYs1bq3LTCujhiT3oAer_G2-YVueQcf4g4_tYvnNfe0b9ziLSYO_NJgvU6nIMqsoziJcpyekFhl3t4UdTuJWGl5P_ekT8K1XdTkU_2tZ3JDs9IchuSSxccleZeP-qQ2QP4bvoHAjxxVUx80"
        />
        <div className="absolute inset-0 bg-navy/40" />
      </div>

      {/* Panel glass principal */}
      <div className="relative z-10 w-full max-w-6xl glass-panel rounded-xl shadow-2xl overflow-hidden flex flex-col min-h-[85vh]">
        <Navbar />           {/* ← importado de otro lado */}
        <RoomHeader />       {/* o Header si lo tienes en layout */}

        <main className="flex-1 p-8 md:p-12 flex flex-col gap-10">
          <div className="w-full max-w-3xl mx-auto flex flex-col gap-4">
            <ProgressSteps currentStep={3} totalSteps={4} />
          </div>

          <div className="text-center space-y-3">
            <h2 className="text-accent font-display text-4xl md:text-5xl font-light tracking-tight">
              Elevate Your Voyage
            </h2>
            <p className="text-accent/70 text-lg font-light max-w-xl mx-auto">
              Select elite on-board experiences to personalize your stay.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {experiences.map((exp, idx) => (
              <ExperienceCard key={idx} {...exp} />
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <button className="flex items-center gap-4 bg-primary px-8 py-4 rounded-full text-white font-bold tracking-widest uppercase group hover:bg-primary/90 transition-all duration-300 shadow-xl shadow-black/20">
              <span>Proceed to Payment</span>
              <span className="material-symbols-outlined transition-transform duration-300 group-hover:translate-x-2">
                arrow_forward
              </span>
            </button>
          </div>
        </main>

        <Footer />           {/* ← importado de otro lado */}
      </div>
    </div>
  );
};

export default RoomPage;