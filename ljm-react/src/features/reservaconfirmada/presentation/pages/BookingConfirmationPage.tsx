import BookingHeader from "../components/BookingHeader";
import ConfirmationHero from "../components/ConfirmationHero";
import BookingDetailsCard from "../components/BookingDetailsCard";
import BookingActions from "../components/BookingActions";
import type { BookingDetails } from "../components/BookingDetailsCard";

const bookingDetails: BookingDetails = {
  reference: "LJM-7742-XQ",
  passengers: "2 Adultos, 1 Suite Principal",
  departureDate: "12 Octubre, 2024",
  departurePort: "Port de Barcelona, 18:00h",
  returnDate: "19 Octubre, 2024",
  returnPort: "Port de Barcelona, 09:00h",
  total: "€4,850.00",
};

const BookingConfirmationPage = () => {
  const handleDownload = () => {
    console.log("Downloading itinerary...");
  };

  const handleGoHome = () => {
    console.log("Going home...");
  };

  return (
    <>
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#0a1628]">
        {/* Subtle radial glow — no imagen dorada */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#0f2a4a_0%,_#0a1628_60%,_#060e1a_100%)]" />
        {/* Glow accent tenue */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-tertiary/5 rounded-full blur-[120px]" />
      </div>

      {/* Main */}
      <main className="min-h-screen relative flex items-center justify-center p-6 md:p-12 nautical-overlay">
        <div className="max-w-3xl w-full flex flex-col items-center text-center space-y-12">
          <BookingHeader />
          <ConfirmationHero />
          <BookingDetailsCard details={bookingDetails} />
          <BookingActions onDownload={handleDownload} onGoHome={handleGoHome} />

          <div className="pt-8">
            <p className="text-white/30 text-xs max-w-sm font-light leading-relaxed">
              Hemos enviado una copia detallada de tu confirmación y el contrato de viaje a tu
              correo electrónico. Te esperamos en el muelle.
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default BookingConfirmationPage;