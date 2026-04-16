import React from 'react';
import Navbar from '../../../home/presentation/components/Navbar';
import Footer from '../../../home/presentation/components/Footer';
import ExpeditionHero from '../components/ExpeditionHero';
import ResidenceSpecs from '../components/ResidenceSpecs';
import GastronomyPanel from '../components/GastronomyPanel';
import CompanionManifest from '../components/CompanionManifest';
import FinancialStatement from '../components/FinancialStatement';

const AnadirAcompanantePage: React.FC = () => {
  return (
    <div className="bg-[#F6F7F8] text-[#1E2944] min-h-screen">
      <Navbar />
      <main className="pt-32 pb-40 max-w-7xl mx-auto px-6 md:px-12">
        <ExpeditionHero />

        <section className="mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <ResidenceSpecs />
            <GastronomyPanel />
          </div>
        </section>

        <CompanionManifest />
        <FinancialStatement />
      </main>
      <Footer />
    </div>
  );
};

export default AnadirAcompanantePage;