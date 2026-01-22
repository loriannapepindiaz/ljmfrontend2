// src/features/fleet/presentation/pages/FleetPage.tsx
import React from 'react';

import Navbar from '../../../home/presentation/components/Navbar';        // global
import Footer from '../../../home/presentation/components/Footer';          // global

import FleetHero from '../components/FleetHero';           // relativo: sube un nivel a presentation/
import FleetGrid from '../components/FleetGrid';

const FleetPage = () => {
  return (
    <div className="bg-background-light font-sans text-gray-900">
      <Navbar active="fleet" />  {/* si tienes prop para resaltar el link */}
      
      <FleetHero />
      
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-magiona text-4xl md:text-6xl text-navy mb-4">
              Masterpieces of Engineering
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              Each vessel in the LJM Sealine fleet is a testament to sophisticated design...
            </p>
          </div>
          
          <FleetGrid />
          
          {/* CTA banner inline o como componente */}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default FleetPage;