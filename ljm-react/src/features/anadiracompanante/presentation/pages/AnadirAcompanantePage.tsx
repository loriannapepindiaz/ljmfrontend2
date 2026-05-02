import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../home/presentation/components/Navbar";
import BackButton from "../../../../components/BackButton";
import ExclusiveSearch from "../components/ExclusiveSearch";
import GuestRegistrationForm from "../components/GuestRegistrationForm";
import TravelCompanionsCard from "../components/TravelCompanionsCard";
import CapacityStatus from "../components/CapacityStatus";
import EditorialQuote from "../components/EditorialQuote";
import type { Guest } from "../types";

export default function AnadirAcompanantePage() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#06122c] font-sans text-[#d9e2ff] selection:bg-[#dec29e] selection:text-[#3e2d14]">
      <Navbar />
      <BackButton topClass="top-20" />
      <button
        type="button"
        onClick={() => navigate("/personalizar-estancia")}
        className="fixed right-6 top-20 z-[9999] flex items-center gap-2 rounded-full border border-[#eacea9]/30 bg-[#0e1a34] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#eacea9] shadow-lg transition-all hover:bg-[#132345]"
      >
        Omitir
        <span className="material-symbols-outlined text-sm">arrow_forward</span>
      </button>

      <main className="mx-auto max-w-[1600px] px-6 pb-28 pt-28 md:px-12 md:pb-24 md:pt-32">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-12 lg:col-span-8 lg:space-y-16">
            <header className="max-w-2xl">
              <h1 className="mb-6 text-5xl font-serif font-light leading-tight text-[#d9e2ff] md:text-7xl">
                Añadir Acompañantes
              </h1>
              <p className="text-lg leading-relaxed text-[#c6c6ce] md:text-xl">
                Para hacer más amena tu estadía, compártela con quienes más quieres. La verdadera
                travesía se disfruta mejor en compañía.
              </p>
            </header>

            <ExclusiveSearch />
            <GuestRegistrationForm guests={guests} setGuests={setGuests} />
          </div>

          <div className="space-y-8 lg:col-span-4">
            <TravelCompanionsCard guests={guests} setGuests={setGuests} />
            <CapacityStatus count={guests.length} />
            <EditorialQuote />
          </div>
        </div>
      </main>
    </div>
  );
}
