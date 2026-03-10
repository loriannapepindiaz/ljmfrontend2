import { useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../home/presentation/components/Navbar"; 
import Footer from "../../../home/presentation/components/Footer"; 
import AccommodationCard from "../components/AccommodationCard";
import ExperienceRow from "../components/ExperienceRow";
import SummaryBar from "../components/SummaryBar";

const PersonalizationPage: FC = () => {
  const navigate = useNavigate();

  // Estados para selección
  const [selectedSuiteId, setSelectedSuiteId] = useState<number | null>(null);
  const [selectedExps, setSelectedExps] = useState<string[]>([]);

  // Datos de Suites (He actualizado los IDs y las fotos para asegurar que carguen)
  const suites = [
    { 
      id: 0, 
      title: "Grand Horizon Penthouse", 
      price: 0, 
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80", 
      features: ["Terraza privada con Jacuzzi infinito", "Servicio de Mayordomo Real 24/7"] 
    },
    { 
      id: 1, 
      title: "Royal Ocean Suite", 
      price: 0, 
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80", 
      features: ["Vistas panorámicas 180° del horizonte", "Cena privada en suite 'Chef's Table'"] 
    },
    { 
      id: 2, 
      title: "Celestial Terrace Suite", 
      price: 0, 
      image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80", 
      features: ["Techo retráctil 'Sky-View'", "Baño de mármol Carrara y Oro"] 
    },
  ];

  const toggleExperience = (title: string) => {
    setSelectedExps(prev => 
      prev.includes(title) ? prev.filter(item => item !== title) : [...prev, title]
    );
  };

  const selectedSuite = suites.find(s => s.id === selectedSuiteId);

  const handleNextStep = () => {
    navigate("/proxima-pagina"); 
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans antialiased text-[#0e1a34]">
      {/* Navbar fija */}
      <div className="fixed top-0 w-full z-[100] bg-[#0e1a34]">
        <Navbar />
      </div>

      <main className="flex-1 bg-white pt-24 md:pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          
          {/* Cabecera con Botón Omitir Rediseñado (Más pequeño) */}
          <section className="mb-14">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#0e1a34] mb-4 leading-tight tracking-tight uppercase tracking-[0.2em]">
                  Personalice su Experiencia
                </h1>
                <p className="text-lg text-[#0e1a34]/50 font-light leading-relaxed max-w-2xl">
                  Diseñe cada detalle de su odisea por el Mediterráneo. Seleccione su refugio privado y añada experiencias exclusivas.
                </p>
              </div>

              {/* Botón Omitir: Estilizado y compacto */}
              <div className="pb-2">
                <button 
                  onClick={handleNextStep}
                  className="flex items-center gap-2 px-8 py-2.5 bg-[#0e1a34] text-white text-[9px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-[#c5a059] transition-all shadow-md active:scale-95 whitespace-nowrap"
                >
                  Omitir
                  <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Separador Alojamiento */}
            <div className="flex items-center gap-4 py-8 border-t border-[#0e1a34]/10 mt-12 mb-10">
              <span className="material-symbols-outlined text-[#0e1a34] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>king_bed</span>
              <h3 className="text-[10px] font-bold text-[#0e1a34] uppercase tracking-[0.4em] font-serif">
                Selección de Alojamiento Premium
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {suites.map((s) => (
                <AccommodationCard 
                  key={s.id}
                  {...s}
                  isSelected={selectedSuiteId === s.id}
                  onSelect={() => setSelectedSuiteId(selectedSuiteId === s.id ? null : s.id)}
                />
              ))}
            </div>
          </section>

          {/* Barra de Resumen */}
          <div className="my-20">
            <SummaryBar 
              selectedSuiteName={selectedSuite ? selectedSuite.title : null} 
              totalPrice={0} 
            />
          </div>

          {/* Sección de Experiencias (Fotos Arregladas) */}
          <section className="mb-24">
            <div className="flex items-center gap-4 mb-10 border-b border-[#0e1a34]/10 pb-6">
              <span className="material-symbols-outlined text-[#0e1a34] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>diamond</span>
              <h3 className="text-[10px] font-bold text-[#0e1a34] uppercase tracking-[0.5em] font-serif leading-tight">
                Experiencias & Actividades Exclusivas
              </h3>
            </div>
            
            <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-[0_25px_60px_rgba(14,26,52,0.12)] border border-[#0e1a34]/5 divide-y divide-gray-100">
                <ExperienceRow 
                  title="Safari en Jet Ski: Calas Ocultas" 
                  price={0} 
                  unit="Invitado" 
                  image="https://images.unsplash.com/photo-1551009175-15bdf9dcb580?auto=format&fit=crop&q=80" 
                  description="Exploración guiada por las grutas vírgenes de la Costa Esmeralda con equipamiento de alta gama."
                  isSelected={selectedExps.includes("Safari en Jet Ski: Calas Ocultas")}
                  onSelect={() => toggleExperience("Safari en Jet Ski: Calas Ocultas")}
                />
                <ExperienceRow 
                  title="Cena Privada bajo las Estrellas" 
                  price={0} 
                  unit="Pareja" 
                  image="https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&q=80" 
                  description="Menú degustación de 7 tiempos diseñado por nuestro Chef Estrella Michelin, servido en proa."
                  isSelected={selectedExps.includes("Cena Privada bajo las Estrellas")}
                  onSelect={() => toggleExperience("Cena Privada bajo las Estrellas")}
                />
                <ExperienceRow 
                  title="Ritual de Bienestar 'Sea Serenity'" 
                  price={0} 
                  unit="Sesión" 
                  image="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80" 
                  description="Tratamiento holístico con extractos marinos y masaje de piedras volcánicas."
                  isSelected={selectedExps.includes("Ritual de Bienestar 'Sea Serenity'")}
                  onSelect={() => toggleExperience("Ritual de Bienestar 'Sea Serenity'")}
                />
            </div>
          </section>

          {/* Botón de Confirmación Final */}
          <div className="mb-20">
            <button 
              onClick={handleNextStep}
              className="group w-full bg-[#785d32] hover:bg-[#5a4626] text-white font-bold py-7 px-12 rounded-[2.5rem] text-[10px] tracking-[0.4em] uppercase transition-all shadow-2xl flex items-center justify-center gap-4 active:scale-[0.99]"
            >
              03 CONFIRMAR RESERVA
              <span className="material-symbols-outlined text-xl group-hover:translate-x-3 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PersonalizationPage;