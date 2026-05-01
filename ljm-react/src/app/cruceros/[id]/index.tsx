'use client';
import { useParams } from 'next/navigation';
import { VESSELS } from '../../../features/fleet/data/vessels';

// --- RUTAS CORREGIDAS ---
import Navbar from '../../../features/home/presentation/components/Navbar';
import Footer from '../../../features/home/presentation/components/Footer';
import CruceroHero from '../../../features/descripcioncrucero/presentation/components/CruceroHero';
import CruceroVision from '../../../features/descripcioncrucero/presentation/components/CruceroVision';
import CruceroEspecificaciones from '../../../features/descripcioncrucero/presentation/components/CruceroEspecificaciones';
import CruceroAlojamientos from '../../../features/descripcioncrucero/presentation/components/CruceroAlojamientos';
import CruceroEstiloVida from '../../../features/descripcioncrucero/presentation/components/CruceroEstiloVida';

export default function DescripcionCruceroPage() {
    const params = useParams();
    const vesselId = params.id as string;
    const vessel = VESSELS.find(v => v.id === vesselId);

    if (!vessel) return <div>Crucero no encontrado</div>;

    return (
        <div className="bg-[#f6f7f8] text-[#0e1a34]">
            <Navbar />
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
}