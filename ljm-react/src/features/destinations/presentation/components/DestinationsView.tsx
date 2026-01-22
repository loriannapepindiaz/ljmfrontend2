import React from 'react';
import Navbar from '../../../home/presentation/components/Navbar';
import DestinationsHeader from '../components/DestinationsHeader';
import Carousel from '../components/carousel';
import IntroSection from './IntroSection';
import DestinationsGrid from '../components/DestinationsGrid';
import Footer from '../../../home/presentation/components/Footer';

const DestinationsView = () => {
  return (
    <div className="bg-background-luxury text-night min-h-screen">
      <style>{`
        body {
          font-family: 'Montserrat', sans-serif;
          scroll-behavior: smooth;
        }
        .magiona-style {
          font-family: 'Playfair Display', serif;
          letter-spacing: 0.05em;
        }
        .carousel-container {
          perspective: 1000px;
        }
        .carousel-card {
          transition: all 0.5s ease-in-out;
        }
        .carousel-card.active {
          transform: scale(1.05);
          z-index: 20;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .glass-dark {
          background: rgba(14, 26, 52, 0.9);
          backdrop-filter: blur(10px);
        }
      `}</style>

      <Navbar />
      <DestinationsHeader />
      <Carousel />
      <IntroSection />
      <DestinationsGrid />
      <Footer />
    </div>
  );
};

export default DestinationsView;
