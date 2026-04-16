import { useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../../home/presentation/components/Footer";
import Navbar from "../../../home/presentation/components/Navbar";
import GastronomySection from "../components/GastronomySection";
import PersonalizarEstanciaHero from "../components/PersonalizarEstanciaHero";
import PillowSection from "../components/PillowSection";
import SpecialRequestSection from "../components/SpecialRequestSection";
import StayServicesSection from "../components/StayServicesSection";
import { pillowOptions, stayOptions } from "../components/personalizarEstanciaData";

const PersonalizarEstanciaPage: FC = () => {
  const navigate = useNavigate();
  const [enabledServices, setEnabledServices] = useState<Record<string, boolean>>({
    "pet-care": false,
    "welcome-kit": true,
  });
  const [selectedPillow, setSelectedPillow] = useState("pluma");
  const [selectedDiet, setSelectedDiet] = useState("Omnivoro");
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [additionalRequirements, setAdditionalRequirements] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");

  const selectedSummary = {
    services: stayOptions.filter((option) => enabledServices[option.id]).map((option) => option.label),
    pillow: pillowOptions.find((option) => option.id === selectedPillow)?.label ?? "Pluma",
    diet: selectedDiet,
    allergies: selectedAllergies,
  };

  const toggleService = (serviceId: string) => {
    setEnabledServices((current) => ({
      ...current,
      [serviceId]: !current[serviceId],
    }));
  };

  const toggleAllergy = (allergyId: string) => {
    setSelectedAllergies((current) =>
      current.includes(allergyId)
        ? current.filter((item) => item !== allergyId)
        : [...current, allergyId],
    );
  };

  return (
    <div className="min-h-screen bg-[#0e1a34] text-[#eacea9]">
      <Navbar />

      <main className="overflow-x-hidden pt-20">
        <PersonalizarEstanciaHero summary={selectedSummary} />

        <StayServicesSection enabledServices={enabledServices} onToggleService={toggleService} />

        <PillowSection onSelectPillow={setSelectedPillow} selectedPillow={selectedPillow} />

        <GastronomySection
          additionalRequirements={additionalRequirements}
          selectedAllergies={selectedAllergies}
          selectedDiet={selectedDiet}
          setAdditionalRequirements={setAdditionalRequirements}
          setSelectedDiet={setSelectedDiet}
          toggleAllergy={toggleAllergy}
        />

        <SpecialRequestSection setSpecialRequest={setSpecialRequest} specialRequest={specialRequest} />

        <section className="border-t border-[#eacea9]/5 bg-[#0e1a34] py-24">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 md:px-10 lg:flex-row lg:px-16">
            <div className="text-center lg:text-left">
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#eacea9]/60">
                Tu estancia esta lista
              </p>
              <p className="mt-4 max-w-2xl text-sm font-light leading-relaxed text-[#eacea9]/70">
                Hemos preparado una experiencia a medida con {selectedSummary.pillow}, regimen{" "}
                {selectedSummary.diet.toLowerCase()} y {selectedSummary.services.length} servicio
                {selectedSummary.services.length === 1 ? "" : "s"} activo{selectedSummary.services.length === 1 ? "" : "s"}.
              </p>
            </div>

            <button
              className="rounded-full bg-gradient-to-r from-[#eacea9] to-[#dec29e] px-10 py-5 text-xs font-black uppercase tracking-[0.28em] text-[#0e1a34] shadow-[0_18px_45px_rgba(234,206,169,0.28)] transition hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(234,206,169,0.36)]"
              onClick={() => navigate("/payment")}
              type="button"
            >
              Continuar con la reserva
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PersonalizarEstanciaPage;
