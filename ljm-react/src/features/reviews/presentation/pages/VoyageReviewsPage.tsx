import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import BackButton from '../../../../components/BackButton';
import Navbar from '../../../home/presentation/components/Navbar';
import Footer from '../../../home/presentation/components/Footer';
import RatingOverview from '../components/RatingOverview';
import FeedbackList from '../components/FeedbackList';
import StatsPanel from '../components/StatsPanel';
import ReviewForm from '../components/ReviewForm';
import { reviewsApi, type ReviewsData } from '../reviewsData';

const VoyageReviewsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [reviewsData, setReviewsData] = useState<ReviewsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadReviews = () => {
    setIsLoading(true);
    setError(null);

    reviewsApi.current()
      .then((response) => setReviewsData(response.data))
      .catch((requestError) => {
        setError(requestError instanceof Error ? requestError.message : 'No se pudieron cargar las reseñas.');
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const saveReview = async (payload: { historyId: string | number; voyageId: string | number; rating: number; text: string }) => {
    setIsSaving(true);
    setError(null);

    try {
      const response = await reviewsApi.save(payload);
      setReviewsData(response.data);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'No se pudo guardar la reseña.');
      throw requestError;
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-[#06122C] text-[#D9E2FF] min-h-screen font-sans">
      <Navbar />
      <BackButton topClass="top-24" />

      <main className="pt-36 pb-20 px-8 max-w-screen-2xl mx-auto">
        <header className="mb-20 text-center lg:text-left">
          <h1 className="font-display text-5xl md:text-6xl font-normal text-[#DEC29E] mb-6 tracking-tight leading-tight">
            Bitácora &amp; Reseñas
          </h1>
          <p className="text-[#D9E2FF]/70 max-w-2xl text-lg md:text-xl font-light leading-relaxed mx-auto lg:mx-0">
            Opiniones conectadas al historial real de viajes de cada cliente.
          </p>
        </header>

        {error ? (
          <div className="mb-8 rounded-xl border border-red-300/20 bg-red-500/10 px-5 py-4 text-sm text-red-100">
            {error}
          </div>
        ) : null}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7 space-y-16">
            <section>
              <RatingOverview summary={reviewsData?.summary ?? null} isLoading={isLoading} />
            </section>
            <section>
              <FeedbackList feedbacks={reviewsData?.reviews ?? []} isLoading={isLoading} />
            </section>
          </div>

          <div className="lg:col-span-5 space-y-16">
            <div className="lg:-mt-16">
              <StatsPanel
                summary={reviewsData?.summary ?? null}
                history={reviewsData?.history ?? []}
                isLoading={isLoading}
              />
            </div>
            <div className="bg-[#0e1a34]/50 p-8 rounded-2xl border border-[#eacea9]/10 backdrop-blur-sm">
              <ReviewForm
                client={reviewsData?.client ?? null}
                history={reviewsData?.history ?? []}
                initialHistoryId={searchParams.get('historyId')}
                isSaving={isSaving}
                onSubmit={saveReview}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VoyageReviewsPage;
