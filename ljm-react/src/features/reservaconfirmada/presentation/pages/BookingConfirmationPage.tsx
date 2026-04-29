import BookingHeader from "../components/BookingHeader";
import BookingActions from "../components/BookingActions";
import { useNavigate } from "react-router-dom";

const BookingConfirmationPage = () => {
  const navigate = useNavigate();

  const handleViewInvoice = () => {
    navigate("/factura");
  };

  const handleManageBooking = () => {
    navigate("/manage-booking");
  };

  const handleGoHome = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#0a1628]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#0f2a4a_0%,_#0a1628_60%,_#060e1a_100%)]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-tertiary/5 rounded-full blur-[120px]" />
      </div>

      <main className="min-h-screen relative flex items-center justify-center p-6 md:p-12 nautical-overlay">
        <div className="max-w-3xl w-full flex flex-col items-center text-center space-y-12">
          <BookingHeader />

          <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 md:p-10">
            <span className="material-symbols-outlined mb-5 text-6xl text-[#c8a96e]/50">event_busy</span>
            <h1 className="text-3xl font-headline font-bold text-white">No hay confirmacion disponible</h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/50">
              La confirmacion se generara unicamente despues de completar una reserva real con datos de pago verificados.
            </p>
            <div className="mt-8">
              <BookingActions
                onViewInvoice={handleViewInvoice}
                onManageBooking={handleManageBooking}
                onGoHome={handleGoHome}
                showGoHome
                showPrimaryActions={false}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default BookingConfirmationPage;
