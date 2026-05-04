import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CruceroHero from '../components/CruceroHero';
import CruceroVision from '../components/CruceroVision';
import CruceroEspecificaciones from '../components/CruceroEspecificaciones';
import CruceroAlojamientos from '../components/CruceroAlojamientos';
import CruceroEstiloVida from '../components/CruceroEstiloVida';
import Navbar from '../../../home/presentation/components/Navbar';
import Footer from '../../../home/presentation/components/Footer';
import BackButton from '../../../../components/BackButton';
import { getVesselById, normalizeVesselFromApi, type VesselData } from '../../../fleet/data/vessels';
import { fleetApi } from '../../../../lib/api';

const DescripcionCruceroPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [vessel, setVessel] = useState<VesselData | undefined>(() => getVesselById(id));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    fleetApi
      .getById(id)
      .then((response) => setVessel(normalizeVesselFromApi(response.data)))
      .catch(() => setVessel(getVesselById(id)))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (!vessel && !isLoading) {
    return (
      <div className="min-h-screen bg-[#f6f7f8] text-[#0e1a34]">
        <Navbar />
        <main className="min-h-[70vh] px-6 pt-40 text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-[#9a7b42]">Crucero no encontrado</p>
          <h1 className="font-['Newsreader'] text-5xl font-bold">No encontramos esta embarcacion</h1>
          <p className="mx-auto mt-6 max-w-2xl text-[#45464d]">
            Puede que el identificador no exista o que la embarcacion aun no este publicada en la flota.
          </p>
          <Link
            to="/fleet"
            className="mt-10 inline-flex rounded-full border border-[#0e1a34] px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#0e1a34] transition hover:bg-[#0e1a34] hover:text-white"
          >
            Volver a la flota
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#f6f7f8] text-[#0e1a34] selection:bg-[#eacea9] selection:text-[#0e1a34]">
      <Navbar />
      <BackButton />

      <main className="min-h-screen pt-16">
        <CruceroHero vessel={vessel} />
        <CruceroVision vessel={vessel} />
        <CruceroEspecificaciones vessel={vessel} />
        <CruceroAlojamientos vessel={vessel} />
        <CruceroEstiloVida vessel={vessel} />
      </main>

      <Footer />
    </div>
  );
};

export default DescripcionCruceroPage;
