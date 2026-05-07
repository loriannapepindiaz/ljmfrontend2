import { useEffect, useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import RoomLayout from "../components/RoomLayout";
import BackButton from '../../../../components/BackButton';
import SectionTitle from "../components/SectionTitle";
import ExperienceCard from "../components/ExperienceCard";
import Navbar from "../../../home/presentation/components/Navbar";
import Footer from "../../../home/presentation/components/Footer";
import { normalizeSuiteFromApi, SUITES, type SuiteOption } from "../../data/suites";
import { saveBookingDraftToBackend } from "../../../../lib/bookingDraft";
import { cabinApi } from "../../../../lib/api";

const normalizeRoomText = (value: unknown) =>
  String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const findBackendSuite = (suite: SuiteOption, backendSuites: SuiteOption[]) => {
  const suiteTitle = normalizeRoomText(suite.title);

  if (suite.id === "penthouse-deck") {
    return backendSuites.find((item) => normalizeRoomText(item.title).includes("penthouse"));
  }

  return backendSuites.find((item) => {
    const backendTitle = normalizeRoomText(item.title);
    return backendTitle === suiteTitle || backendTitle.includes(suiteTitle) || suiteTitle.includes(backendTitle);
  });
};

const mergeCuratedWithBackend = (backendSuites: SuiteOption[]) =>
  SUITES.map((suite) => {
    const backendSuite = findBackendSuite(suite, backendSuites);

    if (!backendSuite) return suite;

    return {
      ...suite,
      id: backendSuite.id,
      idHabitacion: backendSuite.idHabitacion,
      idTipoHabitacion: backendSuite.idTipoHabitacion,
      id_habitacion: backendSuite.id_habitacion,
      id_tipo_habitacion: backendSuite.id_tipo_habitacion,
      pricePerNight: backendSuite.pricePerNight || suite.pricePerNight,
    };
  });

const RoomPage: FC = () => {
  const navigate = useNavigate();
  const [suites, setSuites] = useState<SuiteOption[]>(SUITES);
  const [selectedSuiteIndex, setSelectedSuiteIndex] = useState<number | null>(null);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    cabinApi
      .list<SuiteOption>()
      .then((response) => {
        if (response.data?.length) {
          const backendSuites = response.data.map(normalizeSuiteFromApi);
          setSuites(mergeCuratedWithBackend(backendSuites));
        }
      })
      .catch(() => {
        setSuites(SUITES);
      });
  }, []);

  const continueWithSuite = async () => {
    if (selectedSuiteIndex === null) {
      setShowError(true);
      return;
    }

    const selectedSuite = suites[selectedSuiteIndex];
    setShowError(false);
    await saveBookingDraftToBackend({ suite: selectedSuite });
    navigate('/details-suit', { state: { suite: selectedSuite } });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-dark overflow-x-hidden">
      <div className="bg-[#0e1a34] w-full z-50">
        <Navbar />
      </div>

      <BackButton />

      <main className="flex-1 relative">
        <div className="fixed inset-0 z-0">
          <img
            alt="Luxury cruise background"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC452Pu70ahp8xhmTebKdEz4fs6mG964FtpeFL1U5001s3JZbsgQgZJVGyxS1lxnHqyqvGMSl8olisyBSMjccvpKAqRApqM3ocCqvxYXcSRN9dUlQl-Sn4yzlddCpdnFYs1bq3LTCujhiT3oAer_G2-YVueQcf4g4_tYvnNfe0b9ziLSYO_NJgvU6nIMqsoziJcpyekFhl3t4UdTuJWGl5P_ekT8K1XdTkU_2tZ3JDs9IchuSSxccleZeP-qQ2QP4bvoHAjxxVUx80"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 py-12 px-4 md:px-8 max-w-7xl mx-auto w-full flex justify-center">
          <RoomLayout>
            <div className="flex flex-col gap-10 p-6 md:p-12 relative bg-[#0e1a34] rounded-b-xl border-t border-accent/10">
              <SectionTitle
                title="Eleva Tu Travesía"
                subtitle="Selecciona el tipo de habitación para personalizar tu estancia."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {suites.map((suite, index) => (
                  <ExperienceCard
                    key={suite.id}
                    title={suite.title}
                    description={suite.description}
                    image={suite.imageUrl}
                    isSelected={selectedSuiteIndex === index}
                    onSelect={() => {
                      setSelectedSuiteIndex(selectedSuiteIndex === index ? null : index);
                      setShowError(false);
                    }}
                  />
                ))}
              </div>

              <div className="flex flex-col items-end gap-2 pt-6">
                {showError && (
                  <p className="text-xs font-semibold text-red-400 tracking-wide animate-pulse">
                    Por favor selecciona una suite para continuar.
                  </p>
                )}
                <button
                  onClick={continueWithSuite}
                  className={`flex items-center gap-4 px-10 py-4 rounded-full font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-2xl shadow-black/50 text-[10px] group ${
                    selectedSuiteIndex !== null
                      ? 'bg-primary hover:bg-primary/90 text-white active:scale-95'
                      : 'bg-white/10 text-white/30 cursor-not-allowed'
                  }`}
                >
                  <span>Ver detalles de la suite</span>
                  <span className="material-symbols-outlined transition-transform duration-300 group-hover:translate-x-2 text-sm">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </RoomLayout>
        </div>
      </main>

      <div className="bg-[#0e1a34] w-full z-20 border-t border-accent/5">
        <Footer />
      </div>
    </div>
  );
};

export default RoomPage;
