import React from 'react';
import Navbar from '../../../home/presentation/components/Navbar';
import Footer from '../../../home/presentation/components/Footer';
import RatingOverview from '../components/RatingOverview';
import FeedbackList from '../components/FeedbackList';
import StatsPanel from '../components/StatsPanel';
import ReviewForm from '../components/ReviewForm';

const VoyageReviewsPage: React.FC = () => {
  return (
    <div className="bg-[#06122C] text-[#D9E2FF] min-h-screen">
      <Navbar />

      <main className="pt-32 pb-20 px-8 max-w-screen-2xl mx-auto">
        <header className="mb-16">
          <h1 className="font-serif text-5xl font-bold text-[#DEC29E] mb-4 tracking-tight">
            Bitácora &amp; Reseñas
          </h1>
          <p className="text-[#D9E2FF]/60 max-w-2xl text-lg italic">
            Las crónicas colectivas de quienes han navegado por las aguas curadas de nuestro archivo marítimo.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-12">
            <RatingOverview />
            <FeedbackList />
          </div>

          <div className="lg:col-span-5 space-y-12">
            <div className="lg:-mt-20">
              <StatsPanel />
            </div>
            <ReviewForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VoyageReviewsPage;
