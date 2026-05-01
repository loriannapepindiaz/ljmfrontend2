import { useEffect, useRef, useState, type FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../../home/presentation/components/Navbar";
import Footer from "../../../home/presentation/components/Footer";
import BackButton from "../../../../components/BackButton";
import AccommodationCard from "../components/AccommodationCard";
import ExperienceRow from "../components/ExperienceRow";
import SummaryBar from "../components/SummaryBar";
import { allExperiences } from "../../../experiences/data/experiences";

const suites = [
  {
    id: 0,
    title: "Grand Horizon Penthouse",
    price: 0,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80",
    features: ["Terraza privada con Jacuzzi infinito", "Servicio de Mayordomo Real 24/7"],
  },
  {
    id: 1,
    title: "Royal Ocean Suite",
    price: 0,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80",
    features: ["Vistas panoramicas 180 del horizonte", "Cena privada en suite Chef's Table"],
  },
  {
    id: 2,
    title: "Celestial Terrace Suite",
    price: 0,
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80",
    features: ["Techo retractil Sky-View", "Bano de marmol Carrara y Oro"],
  },
];

const PersonalizationPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activitiesRef = useRef<HTMLElement | null>(null);
  const personalizationState = location.state as { selectedActivities?: string[]; focusActivities?: boolean } | null;
  const selectedActivitiesFromState = personalizationState?.selectedActivities ?? [];
  const shouldFocusActivities = Boolean(personalizationState?.focusActivities);

  const [selectedSuiteId, setSelectedSuiteId] = useState<number | null>(null);
  const [selectedExps, setSelectedExps] = useState<string[]>(selectedActivitiesFromState);

  const toggleExperience = (title: string) => {
    setSelectedExps((prev) =>
      prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title],
    );
  };

  const selectedSuite = suites.find((suite) => suite.id === selectedSuiteId);

  useEffect(() => {
    if (!shouldFocusActivities) {
      return;
    }

    activitiesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [shouldFocusActivities]);

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans antialiased text-[#0e1a34]">
      <div className="fixed top-0 w-full z-[100] bg-[#0e1a34]">
        <Navbar />
      </div>

      <BackButton />

      <main className="flex-1 bg-white pt-24 md:pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <section className="mb-14">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#0e1a34] mb-4 leading-tight uppercase tracking-[0.2em]">
                  Enriquezca su travesia
                </h1>
                <p className="text-lg text-[#0e1a34]/50 font-light leading-relaxed max-w-2xl">
                  Disene cada detalle de su odisea por el Mediterraneo. Seleccione su refugio privado y anada experiencias exclusivas.
                </p>
              </div>

              <div className="pb-2">
                <button
                  onClick={() => navigate("/payment")}
                  className="flex items-center gap-2 px-8 py-2.5 bg-[#0e1a34] text-white text-[9px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-[#c5a059] transition-all shadow-md active:scale-95 whitespace-nowrap"
                >
                  Omitir
                  <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4 py-8 border-t border-[#0e1a34]/10 mt-12 mb-10">
              <span className="material-symbols-outlined text-[#0e1a34] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>king_bed</span>
              <h3 className="text-[10px] font-bold text-[#0e1a34] uppercase tracking-[0.4em] font-serif">
                Seleccion de Alojamiento Premium
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {suites.map((suite) => (
                <AccommodationCard
                  key={suite.id}
                  {...suite}
                  isSelected={selectedSuiteId === suite.id}
                  onSelect={() => setSelectedSuiteId(selectedSuiteId === suite.id ? null : suite.id)}
                />
              ))}
            </div>
          </section>

          <div className="my-20">
            <SummaryBar
              selectedSuiteName={selectedSuite ? selectedSuite.title : null}
              totalPrice={0}
            />
          </div>

          <section ref={activitiesRef} className="mb-24 scroll-mt-32">
            <div className="flex items-center gap-4 mb-10 border-b border-[#0e1a34]/10 pb-6">
              <span className="material-symbols-outlined text-[#0e1a34] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>diamond</span>
              <h3 className="text-[10px] font-bold text-[#0e1a34] uppercase tracking-[0.5em] font-serif leading-tight">
                Experiencias & Actividades Exclusivas
              </h3>
            </div>

            <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-[0_25px_60px_rgba(14,26,52,0.12)] border border-[#0e1a34]/5 divide-y divide-gray-100">
              {allExperiences.map((experience) => (
                <ExperienceRow
                  key={experience.id}
                  title={experience.title}
                  price={experience.price}
                  unit={experience.unit}
                  image={experience.image}
                  description={experience.description}
                  isSelected={selectedExps.includes(experience.title)}
                  onSelect={() => toggleExperience(experience.title)}
                />
              ))}
            </div>
          </section>

          <div className="mb-20">
            <button
              onClick={() => navigate("/payment")}
              className="group w-full bg-[#785d32] hover:bg-[#5a4626] text-white font-bold py-7 px-12 rounded-[2.5rem] text-[10px] tracking-[0.4em] uppercase transition-all shadow-2xl flex items-center justify-center gap-4 active:scale-[0.99]"
            >
              Gestionar los detalles de su pago
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
