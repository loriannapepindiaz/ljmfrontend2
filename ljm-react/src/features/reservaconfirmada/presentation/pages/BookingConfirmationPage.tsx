import BookingHeader from "../components/BookingHeader";
import BookingActions from "../components/BookingActions";
import { useLocation, useNavigate } from "react-router-dom";
import type { BookingDraft } from "../../../../lib/bookingDraft";
import type { PaymentRecord } from "../../../payment/data/paymentApi";
import ConfirmationHero from "../components/ConfirmationHero";

type ConfirmationState = {
  bookingDraft?: BookingDraft;
  payment?: PaymentRecord & {
    reference?: string;
    paidAt?: string;
    reservationId?: string | number;
  };
};

const formatCurrency = (value: number, currency = "USD") =>
  new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);

const BookingConfirmationPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const storedConfirmation = (() => {
    try {
      return JSON.parse(sessionStorage.getItem("ljm_booking_confirmation") ?? "{}") as ConfirmationState;
    } catch {
      return {};
    }
  })();
  const confirmation = ((state as ConfirmationState | null) ?? storedConfirmation ?? {}) as ConfirmationState;
  const payment = confirmation.payment;
  const draft = confirmation.bookingDraft;
  const hasConfirmation = Boolean(payment?.id || payment?.reference);

  const handleViewInvoice = () => {
    navigate("/factura");
  };

  const handleManageBooking = () => {
    navigate("/manage-booking");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <>
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#0a1628]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#0f2a4a_0%,_#0a1628_60%,_#060e1a_100%)]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-tertiary/5 rounded-full blur-[120px]" />
      </div>

      <main className="min-h-screen relative flex items-center justify-center p-6 md:p-12 nautical-overlay">
        <div className="max-w-3xl w-full flex flex-col items-center text-center space-y-12">
          {hasConfirmation ? <ConfirmationHero /> : <BookingHeader />}

          <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 md:p-10">
            {hasConfirmation ? (
              <div className="space-y-6 text-left">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c8a96e]">Reserva</p>
                    <p className="mt-2 text-2xl font-bold text-white">#{payment?.reservationId ?? draft?.reservationId}</p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c8a96e]">Total pagado</p>
                    <p className="mt-2 text-2xl font-bold text-white">
                      {formatCurrency(Number(payment?.amount ?? 0), payment?.currency ?? draft?.destination?.moneda ?? "USD")}
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#c8a96e]">Destino</p>
                  <p className="mt-2 text-xl text-white">{draft?.destination?.titulo ?? "Viaje confirmado"}</p>
                  <p className="mt-1 text-sm text-white/55">{draft?.suite?.title ?? "Alojamiento registrado"}</p>
                </div>

                <div className="grid gap-4 text-sm text-white/70 md:grid-cols-2">
                  <p><span className="text-white/40">Metodo:</span> {payment?.method?.name ?? "Registrado"}</p>
                  <p><span className="text-white/40">Referencia:</span> {payment?.reference ?? payment?.id}</p>
                </div>
              </div>
            ) : (
              <>
                <span className="material-symbols-outlined mb-5 text-6xl text-[#c8a96e]/50">event_busy</span>
                <h1 className="text-3xl font-headline font-bold text-white">No hay confirmacion disponible</h1>
                <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/50">
                  La confirmacion se generara unicamente despues de completar una reserva real con datos de pago verificados.
                </p>
              </>
            )}
            <div className="mt-8">
              <BookingActions
                onViewInvoice={handleViewInvoice}
                onManageBooking={handleManageBooking}
                onGoHome={handleGoHome}
                showGoHome={!hasConfirmation}
                showPrimaryActions={hasConfirmation}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default BookingConfirmationPage;
