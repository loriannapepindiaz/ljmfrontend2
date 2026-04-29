import React from 'react';
import CruceroHero from '../components/CruceroHero';
import CruceroVision from '../components/CruceroVision';
import CruceroEspecificaciones from '../components/CruceroEspecificaciones';
import CruceroAlojamientos from '../components/CruceroAlojamientos';
import CruceroEstiloVida from '../components/CruceroEstiloVida';
import Navbar from '../../../home/presentation/components/Navbar';
import Footer from '../../../home/presentation/components/Footer';
import BackButton from '../../../../components/BackButton';

const DescripcionCruceroPage: React.FC = () => {
  return (
    <div className="bg-[#f6f7f8] text-[#0e1a34] selection:bg-[#eacea9] selection:text-[#0e1a34]">
      <Navbar />
      <BackButton />

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