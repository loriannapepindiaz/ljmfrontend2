import React from 'react';
// Componentes locales (en la misma carpeta o subcarpeta)
import CruceroHero from '../components/CruceroHero';
import CruceroVision from '../components/CruceroVision';
import CruceroEspecificaciones from '../components/CruceroEspecificaciones';
import CruceroAlojamientos from '../components/CruceroAlojamientos';
import CruceroEstiloVida from '../components/CruceroEstiloVida';

// Componentes globales (Navbar y Footer)
import Navbar from '../../../home/presentation/components/Navbar';
import Footer from '../../../home/presentation/components/Footer';

const DescripcionCruceroPage: React.FC = () => {
  return (
    <div className="bg-[#f6f7f8] text-[#0e1a34] selection:bg-[#eacea9] selection:text-[#0e1a34]">
      {/* 1. EL NAVBAR DEBE IR AQUÍ */}
      <Navbar />

      <main className="min-h-screen pt-16">
        <CruceroHero />
        <CruceroVision />
        <CruceroEspecificaciones />
        <CruceroAlojamientos />
        <CruceroEstiloVida />
      </main>

      {/* 2. EL FOOTER DEBE IR AQUÍ */}
      <Footer />
    </div>
  );
};

export default DescripcionCruceroPage;