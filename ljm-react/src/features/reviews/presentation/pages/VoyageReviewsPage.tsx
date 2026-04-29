import React from 'react';
import Navbar from '../../../home/presentation/components/Navbar';
import Footer from '../../../home/presentation/components/Footer';
import RatingOverview from '../components/RatingOverview';
import FeedbackList from '../components/FeedbackList';
import StatsPanel from '../components/StatsPanel';
import ReviewForm from '../components/ReviewForm';

const VoyageReviewsPage: React.FC = () => {
  return (
    <div className="bg-[#06122C] text-[#D9E2FF] min-h-screen font-sans">
      <Navbar />

      <main className="pt-36 pb-20 px-8 max-w-screen-2xl mx-auto">
        <header className="mb-20 text-center lg:text-left">
          {/* Título Ajustado: Lindo pero proporcional (de 8xl a 6xl) */}
          <h1 className="font-display text-5xl md:text-6xl font-normal text-[#DEC29E] mb-6 tracking-tight leading-tight">
            Bitácora &amp; Reseñas
          </h1>
          
          {/* Subtítulo refinado */}
          <p className="text-[#D9E2FF]/70 max-w-2xl text-lg md:text-xl font-light leading-relaxed mx-auto lg:mx-0">
            Las crónicas colectivas de quienes han navegado por las aguas curadas 
            de nuestro archivo marítimo.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Columna de Reseñas */}
          <div className="lg:col-span-7 space-y-16">
            <section>
              <RatingOverview />
            </section>
            <section>
              <FeedbackList />
            </section>
          </div>

          {/* Columna Lateral de Estadísticas y Formulario */}
          <div className="lg:col-span-5 space-y-16">
            {/* Margen negativo ajustado para la cabecera más pequeña */}
            <div className="lg:-mt-16">
              <StatsPanel />
            </div>
            <div className="bg-[#0e1a34]/50 p-8 rounded-2xl border border-[#eacea9]/10 backdrop-blur-sm">
              <ReviewForm />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VoyageReviewsPage;