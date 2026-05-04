import { useEffect, useRef, useState, type FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../../home/presentation/components/Navbar";
import Footer from "../../../home/presentation/components/Footer";
import BackButton from "../../../../components/BackButton";
import ExperienceSelectCard from "../components/ExperienceSelectCard";
import { experienceApi, type Experience } from "../../../../lib/api";
import { allExperiences } from "../../../experiences/data/experiences";
import { saveBookingDraftToBackend } from "../../../../lib/bookingDraft";

const staticFallback: Experience[] = allExperiences.map((e) => ({
  id: e.id,
  nombre: e.title,
  descripcion: e.description,
  unidad_cobro: "por_persona",
  precio_base: e.price,
  categoria: e.location,
  imagen_url: e.image,
  activa: true,
}));

const PersonalizationPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activitiesRef = useRef<HTMLElement | null>(null);
  const personalizationState = location.state as { selectedActivities?: string[]; focusActivities?: boolean } | null;
  const selectedActivitiesFromState = personalizationState?.selectedActivities ?? [];
  const shouldFocusActivities = Boolean(personalizationState?.focusActivities);

  const [selectedExps, setSelectedExps] = useState<string[]>(selectedActivitiesFromState);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loadingExps, setLoadingExps] = useState(true);
  const [savingDraft, setSavingDraft] = useState(false);

  useEffect(() => {
    const staticById = Object.fromEntries(allExperiences.map((e) => [e.id, { image: e.image, title: e.title, description: e.description }]));

    experienceApi.list()
      .then((res) => {
        const data = res.data.length > 0
          ? res.data.map((e) => ({
              ...e,
              imagen_url: staticById[e.id]?.image ?? e.imagen_url,
              nombre: staticById[e.id]?.title ?? e.nombre,
              descripcion: staticById[e.id]?.description ?? e.descripcion,
            }))
          : staticFallback;
        setExperiences(data);
      })
      .catch(() => setExperiences(staticFallback))
      .finally(() => setLoadingExps(false));
  }, []);

  const toggleExperience = (id: string) => {
    setSelectedExps((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const continueToPayment = async () => {
    if (savingDraft) return;

    const activities = experiences
      .filter((experience) => selectedExps.includes(String(experience.id)))
      .map((experience) => ({
        id: String(experience.id),
        nombre: experience.nombre,
        descripcion: experience.descripcion,
        categoria: experience.categoria,
        imagen_url: experience.imagen_url,
        unidad_cobro: experience.unidad_cobro,
        precio_base: Number(experience.precio_base ?? 0),
      }));

    setSavingDraft(true);
    await saveBookingDraftToBackend({ activities });
    setSavingDraft(false);
    navigate("/payment");
  };

  useEffect(() => {
    if (!shouldFocusActivities) return;
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
                  Disene cada detalle de su odisea por el Mediterraneo. Anada experiencias exclusivas a bordo.
                </p>
              </div>

              <div className="pb-2">
                <button
                  disabled={savingDraft}
                  onClick={continueToPayment}
                  className="flex items-center gap-2 px-8 py-2.5 bg-[#0e1a34] text-white text-[9px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-[#c5a059] transition-all shadow-md active:scale-95 whitespace-nowrap"
                >
                  {savingDraft ? "Guardando" : "Omitir"}
                  <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </button>
              </div>
            </div>
          </section>

          <section ref={activitiesRef} className="mb-24 scroll-mt-32">
            <div className="flex items-center gap-4 mb-10 border-b border-[#0e1a34]/10 pb-6">
              <span className="material-symbols-outlined text-[#0e1a34] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>diamond</span>
              <h3 className="text-[10px] font-bold text-[#0e1a34] uppercase tracking-[0.5em] font-serif leading-tight">
                Experiencias & Actividades Exclusivas
              </h3>
            </div>

            {loadingExps ? (
              <div className="flex items-center justify-center py-20">
                <div className="w-10 h-10 border-4 border-[#0e1a34]/20 border-t-[#c5a059] rounded-full animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {experiences.map((exp) => (
                  <ExperienceSelectCard
                    key={exp.id}
                    experience={exp}
                    isSelected={selectedExps.includes(exp.id)}
                    onSelect={() => toggleExperience(exp.id)}
                  />
                ))}
              </div>
            )}
          </section>

          <div className="mb-20">
            <button
              disabled={savingDraft}
              onClick={continueToPayment}
              className="group w-full bg-[#785d32] hover:bg-[#5a4626] text-white font-bold py-7 px-12 rounded-[2.5rem] text-[10px] tracking-[0.4em] uppercase transition-all shadow-2xl flex items-center justify-center gap-4 active:scale-[0.99]"
            >
              {savingDraft ? "Guardando experiencias..." : "Gestionar los detalles de su pago"}
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
