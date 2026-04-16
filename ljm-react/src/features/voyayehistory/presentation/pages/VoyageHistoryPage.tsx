import React from 'react';
import Navbar from '../../../home/presentation/components/Navbar';
import Footer from '../../../home/presentation/components/Footer';
import UpcomingVoyageCard from '../components/UpcomingVoyageCard';
import VoyageHistoryList from '../components/VoyageHistoryList';
import LoyaltySection from '../components/LoyaltySection';

const VoyageHistoryPage: React.FC = () => {
  return (
    <div className="bg-[#f6f7f8] text-[#0e1a34] min-h-screen">
      <Navbar />
      <main className="pt-24 px-8 pb-12">
        <div className="max-w-6xl mx-auto">

          <header className="mb-10">
            <h1 className="text-4xl font-bold text-[#0e1a34] mb-2" style={{ fontFamily: 'Newsreader, serif' }}>
              Historial de Viajes
            </h1>
            <p className="text-slate-500 max-w-2xl">
              Reviva sus travesías por alta mar y prepárese para su próxima expedición con la flota LJM Sealine.
            </p>
          </header>

          <UpcomingVoyageCard />
          <VoyageHistoryList />
          <LoyaltySection />

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VoyageHistoryPage;