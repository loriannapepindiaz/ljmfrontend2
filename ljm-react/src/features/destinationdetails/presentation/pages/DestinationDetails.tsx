import { useNavigate } from "react-router-dom"; // ✅ Importamos el hook de navegación
import { DestinationHeader } from "../components/DestinationHeader";
import { VoyageHighlights } from "../components/VoyageHighlights";
import { VoyageRouteMap } from "../components/VoyageRouteMap";
import { DestinationGallery } from "../components/DestinationGallery";

// ✅ Importaciones de componentes globales
import Navbar from '../../../home/presentation/components/Navbar';
import Footer from '../../../home/presentation/components/Footer';

export const DestinationDetails = () => {
  const navigate = useNavigate(); // ✅ Inicializamos la función navigate

  return (
    <div className="flex flex-col min-h-screen bg-midnight-blue">
      {/* 1. Barra de Navegación */}
      <Navbar />

      <main className="relative flex-grow pt-32 pb-24 flex items-center justify-center overflow-hidden">
        {/* Fondo con la imagen exacta */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 transform scale-105"
            style={{
              backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBsTCN_0ROR0IL7ZRQCA37YYjBPClqFv7aDxL8dLkubqvJp-qAkneDzN3y9fHmSxONDgaSGYKxlmExcnpxUxqqtegGAfzWNPpsCSnztgwd3NnnUgXA4a1kFgooc6qLkXyH-Z7WsIsThMPRFNyyixaMFcoDq0LLK7BMG6LAi1c3FLsFRhoI2wxD_6qFm_6yb8FIXpXcI3CsV6XYtvKAYyxHXarDhVfOOy5K3plW0FY7XBEUQ1yY03UvsMG4JZiUmY9T6XQv4Y0mKIjI')",
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
          <div className="absolute inset-0 bg-midnight-blue/60"></div>
        </div>

        {/* Contenedor principal */}
        <div className="relative z-10 w-full px-6">
          <div className="glass-panel max-w-[95%] xl:max-w-[1440px] mx-auto rounded-[3.5rem] p-8 md:p-14 bg-midnight-blue/65 backdrop-blur-xl border border-white/10 shadow-2xl">
            <div className="flex flex-col lg:flex-row gap-16 items-stretch mb-14">
              
              {/* Columna Izquierda: Información */}
              <div className="lg:w-1/2 space-y-10">
                <DestinationHeader />
                <VoyageHighlights />
                <div className="pt-6">
                  {/* ✅ Añadido el evento onClick para navegar a /room */}
                  <button 
                    onClick={() => navigate('/Room')}
                    className="bg-primary hover:bg-luxury-gold text-midnight-blue px-14 py-5 rounded-full text-sm font-extrabold tracking-[0.3em] transition-all w-full md:w-auto uppercase shadow-lg active:scale-95"
                  >
                    Book This Voyage
                  </button>
                </div>
              </div>

              {/* Columna Derecha: Mapa */}
              <VoyageRouteMap />
            </div>

            {/* Galería Inferior */}
            <DestinationGallery />
          </div>
        </div>
      </main>

      {/* 2. Pie de página */}
      <Footer />
    </div>
  );
};