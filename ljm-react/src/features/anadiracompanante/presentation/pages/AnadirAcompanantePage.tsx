import ExclusiveSearch from "../components/ExclusiveSearch";
import GuestRegistrationForm from "../components/GuestRegistrationForm";
import TravelCompanionsCard from "../components/TravelCompanionsCard";
import CapacityStatus from "../components/CapacityStatus";
import EditorialQuote from "../components/EditorialQuote";

export default function AnadirAcompanantePage() {
  return (
    <div className="min-h-screen bg-[#06122c] font-sans text-[#d9e2ff] selection:bg-[#dec29e] selection:text-[#3e2d14]">
      <main className="mx-auto max-w-[1600px] px-6 pb-28 pt-12 md:px-12 md:pb-24 md:pt-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-12 lg:col-span-8 lg:space-y-16">
            <header className="max-w-2xl">
              <h1
                className="mb-6 text-5xl leading-tight text-[#d9e2ff] md:text-7xl"
                style={{ fontFamily: "'Noto Serif', serif" }}
              >
                Anadir Acompanantes
              </h1>
              <p className="text-lg leading-relaxed text-[#c6c6ce] md:text-xl">
                Para hacer mas amena tu estadia, compartela con quienes mas quieres. La verdadera
                travesia se disfruta mejor en compania.
              </p>
            </header>

            <ExclusiveSearch />
            <GuestRegistrationForm />
          </div>

          <div className="space-y-8 lg:col-span-4">
            <TravelCompanionsCard />
            <CapacityStatus />
            <EditorialQuote />
          </div>
        </div>
      </main>
    </div>
  );
}
