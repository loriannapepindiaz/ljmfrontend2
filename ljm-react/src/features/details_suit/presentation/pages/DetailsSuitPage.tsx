// features/details_suit/presentation/pages/DetailsSuitPage.tsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SuiteGallery from '../components/SuiteGallery';
import SuiteHighlights from '../components/SuiteHighlights';
import SuiteDetails from '../components/SuiteDetails';
import ItineraryMap from '../components/ItineraryMap';
import NextStepButton from '../components/NextStepButton';
import Navbar from '../../../home/presentation/components/Navbar';
import Footer from '../../../home/presentation/components/Footer';
import BackButton from '../../../../components/BackButton';
import { getBookingDraft, loadBookingDraft, type BookingDraft, type BookingSuiteDraft } from '../../../../lib/bookingDraft';

const DetailsSuitPage: React.FC = () => {
  const location = useLocation();
  const stateSuite = (location.state as { suite?: BookingSuiteDraft } | null)?.suite;
  const [draft, setDraft] = useState<BookingDraft>(() => getBookingDraft());
  const suite = stateSuite ?? draft.suite;

  useEffect(() => {
    loadBookingDraft().then((loadedDraft) => {
      setDraft((currentDraft) => ({
        ...loadedDraft,
        suite: stateSuite ?? loadedDraft.suite ?? currentDraft.suite,
      }));
    });
  }, [stateSuite]);

  return (
    <div className="bg-off-white font-sans text-night-blue antialiased">
      <Navbar />
      <BackButton />

      <main className="pt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          {/* Primera fila: Galería + Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
            <SuiteGallery suite={suite} />
            <SuiteHighlights suite={suite} />
          </div>

          {/* Segunda fila: Descripción + Mapa lado a lado */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-10 items-start mb-16 pt-12">
            <SuiteDetails suite={suite} destination={draft.destination} />
            <ItineraryMap destination={draft.destination} />
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
