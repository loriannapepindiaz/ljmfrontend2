// src/features/fleet/presentation/pages/FleetPage.tsx
import React from 'react';

import Navbar from '../../../home/presentation/components/Navbar';     // ajusta la ruta si es necesario
import Footer from '../../../home/presentation/components/Footer';    // ajusta la ruta si es necesario

import FleetHero from '../components/FleetHero';
import FleetMasterpieces from '../components/FleetMasterpieces';
import CtaBanner from '../components/CtaBanner';               // o CtaBanner si lo tienes

const FleetPage: React.FC = () => {
  return (
    <div className="bg-background-light font-sans text-gray-900 transition-colors duration-300">
      {/* Navbar sin prop active */}
      <Navbar />

      {/* Hero principal */}
      <FleetHero />

      {/* Sección Masterpieces of Engineering */}
      <FleetMasterpieces />

      {/* Banner CTA */}
      <div className="container mx-auto px-6">
        <CtaBanner />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FleetPage;