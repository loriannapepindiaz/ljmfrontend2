// features/details_suit/presentation/pages/DetailsSuitPage.tsx
import React from 'react';
import SuiteGallery from '../components/SuiteGallery';
import SuiteHighlights from '../components/SuiteHighlights';
import SuiteDetails from '../components/SuiteDetails';
import ItineraryMap from '../components/ItineraryMap';
import NextStepButton from '../components/NextStepButton';
import Navbar from '../../../home/presentation/components/Navbar';
import Footer from '../../../home/presentation/components/Footer';
import BackButton from '../../../../components/BackButton';

const DetailsSuitPage: React.FC = () => {
  return (
    <div className="bg-off-white font-sans text-night-blue antialiased">
      <Navbar />
      <BackButton />

      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          {/* Primera fila: Galería + Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
            <SuiteGallery />
            <SuiteHighlights />
          </div>

          {/* Segunda fila: Descripción + Mapa lado a lado */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16 pt-20">
            <SuiteDetails />
            <ItineraryMap />
          </div>

          {/* Botón de siguiente paso */}
          <div className="mb-16">
            <NextStepButton />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DetailsSuitPage;
