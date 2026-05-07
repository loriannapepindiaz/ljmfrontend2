import BookingHeader from "../components/BookingHeader";
import BookingActions from "../components/BookingActions";
import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getBookingDraft, type BookingDraft } from "../../../../lib/bookingDraft";
import type { PaymentRecord } from "../../../payment/data/paymentApi";
import ConfirmationHero from "../components/ConfirmationHero";
import { CheckCircle2, Circle, Home, ShipWheel, Users } from "lucide-react";

type ConfirmationState = {
  bookingDraft?: BookingDraft;
  payment?: PaymentRecord & {
    reference?: string;
    paidAt?: string;
    reservationId?: string | number;
  };
};

const formatCurrency = (value: number, currency = "USD") => {
  const normalizedCurrency = currency.toUpperCase();
  const safeValue = Number.isFinite(value) ? value : 0;
  const amount = Math.round(safeValue)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const currencyLabel = normalizedCurrency === "USD" ? "US$" : normalizedCurrency;

  return `${amount} ${currencyLabel}`;
};

const formatDate = (value?: string | null) => {
  if (!value) return "Por confirmar";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Por confirmar";

  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
};

const readStoredConfirmation = (): ConfirmationState => {
  try {
    return JSON.parse(sessionStorage.getItem("ljm_booking_confirmation") ?? "{}") as ConfirmationState;
  } catch {
    return {};
  }
};

const buildConfirmationState = (state: unknown): ConfirmationState => {
  const routeState = (state as ConfirmationState | null) ?? {};
  const storedState = readStoredConfirmation();
  const currentDraft = getBookingDraft();

  return {
    bookingDraft: routeState.bookingDraft ?? storedState.bookingDraft ?? currentDraft,
    payment: routeState.payment ?? storedState.payment,
  };
};

const getDurationDays = (value?: string | number | null) => {
  if (typeof value === "number") {
    return Number.isFinite(value) && value > 0 ? Math.round(value) : null;
  }

  if (!value) return null;

  const match = String(value).match(/\d+/);
  const days = match ? Number(match[0]) : 0;

  return Number.isFinite(days) && days > 0 ? days : null;
};

const getDraftDurationDays = (draft?: BookingDraft) => {
  const candidates = [
    draft?.destination?.duracion_tipica,
    draft?.destination?.duracion_dias,
    draft?.destination?.duration,
    draft?.destination?.noches,
    draft?.destination?.nights,
    draft?.duracion_tipica,
    draft?.duracion_dias,
    draft?.duration,
    draft?.noches,
    draft?.nights,
  ];

  for (const candidate of candidates) {
    const days = getDurationDays(candidate);
    if (days) return days;
  }

  return null;
};

const getDepartureSource = (draft?: BookingDraft) => {
  return (
    draft?.departureDate ??
    draft?.fecha_salida ??
    draft?.fechaSalida ??
    draft?.startDate ??
    draft?.travelDate
  );
};

const addDays = (value: string | undefined | null, days: number | null) => {
  if (!value || !days) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  date.setDate(date.getDate() + days);
  return date.toISOString();
};

const BookingConfirmationPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const confirmation = useMemo(() => buildConfirmationState(state), [state]);
  const payment = confirmation.payment;
  const draft = confirmation.bookingDraft;
  const hasConfirmation = Boolean(payment?.id || payment?.reference || draft?.reservationId);
  const reservationReference = payment?.reference ?? (payment?.reservationId || draft?.reservationId ? `LJM-${payment?.reservationId ?? draft?.reservationId}` : "LJM-PENDIENTE");
  const guestCount = Math.max(1, (draft?.companions?.length ?? 0) + 1);
  const animalCompanion = draft?.animalCompanion;
  const suiteName = draft?.suite?.title ?? "Suite Principal";
  const destinationName = draft?.destination?.titulo ?? "LJM Sealine";
  const boardingPort = draft?.destination?.puerto_principal ?? draft?.destination?.ubicacion ?? "Puerto por confirmar";
  const departureSource = getDepartureSource(draft);
  const durationDays = getDraftDurationDays(draft);
  const departureDate = formatDate(departureSource);
  const returnDate = formatDate(draft?.returnDate ?? draft?.fecha_llegada ?? addDays(departureSource, durationDays));
  const totalCurrency = payment?.currency ?? draft?.destination?.moneda ?? "USD";
  const totalAmount = Number(payment?.amount ?? draft?.monto_total ?? draft?.total ?? 0);
  useEffect(() => {
    if (hasConfirmation) {
      sessionStorage.setItem("ljm_booking_confirmation", JSON.stringify(confirmation));
    }
  }, [confirmation, hasConfirmation]);

  const handleViewInvoice = () => {
    navigate("/factura", { state: confirmation });
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
          {hasConfirmation ? <ConfirmationHero voyageName={destinationName} /> : <BookingHeader />}

          <div className="w-full rounded-xl border border-white/10 bg-white/5 p-7 text-left shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur-md md:p-10">
            {hasConfirmation ? (
              <div className="space-y-7">
                <div className="grid gap-8 md:grid-cols-[1.2fr_0.9fr]">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-white/35">Referencia de reserva</p>
                    <p className="mt-2 text-2xl font-black tracking-tight text-white">{reservationReference}</p>

                    <div className="mt-7 h-px bg-white/10" />

                    <div className="mt-7">
                      <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-white/35">Pasajeros</p>
                      <div className="mt-3 flex items-center gap-3 text-sm font-semibold text-white">
                        <Users size={17} className="text-[#c8a96e]" />
                        <span>
                          {guestCount} {guestCount === 1 ? "Adulto" : "Adultos"}
                          <span>, </span>
                          {suiteName}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="relative pl-7">
                      <span className="absolute left-0 top-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-[#c8a96e]">
                        <Circle size={5} fill="#071528" strokeWidth={0} />
                      </span>
                      <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-white/35">Salida</p>
                      <p className="mt-1 text-sm font-bold text-white">{departureDate}</p>
                      <p className="text-xs text-white/45">{boardingPort}</p>
                    </div>

                    <div className="ml-[5px] h-6 w-px bg-white/15" />

                    <div className="relative pl-7">
                      <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full border border-[#c8a96e]/70" />
                      <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-white/35">Regreso</p>
                      <p className="mt-1 text-sm font-bold text-white">{returnDate}</p>
                      <p className="text-xs text-white/45">{boardingPort}</p>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-white/10" />

                {animalCompanion ? (
                  <>
                    <div className="rounded-lg border border-[#c8a96e]/20 bg-[#c8a96e]/10 p-5 text-left">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-[#c8a96e]">pets</span>
                        <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#c8a96e]">
                          Compañero animal confirmado
                        </p>
                      </div>
                      <div className="mt-4 grid gap-3 text-xs text-white/65 sm:grid-cols-2">
                        <p><span className="font-bold text-white">Nombre:</span> {animalCompanion.nombre}</p>
                        <p><span className="font-bold text-white">Tipo:</span> {animalCompanion.tipoAnimal}</p>
                        <p><span className="font-bold text-white">Raza:</span> {animalCompanion.raza || "No indicada"}</p>
                        <p><span className="font-bold text-white">Peso:</span> {animalCompanion.pesoKg} {animalCompanion.unidadPeso ?? "kg"}</p>
                      </div>
                      {animalCompanion.cuidadosEspeciales ? (
                        <p className="mt-3 text-xs leading-relaxed text-white/50">{animalCompanion.cuidadosEspeciales}</p>
                      ) : null}
                      {animalCompanion.certificadoNombre ? (
                        <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white/40">
                          Certificado: {animalCompanion.certificadoNombre}
                        </p>
                      ) : null}
                    </div>
                    <div className="h-px bg-white/10" />
                  </>
                ) : null}

                <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                  <div className="inline-flex w-fit items-center gap-3 rounded-md bg-white/[0.04] px-4 py-3 text-xs font-bold text-white/75">
                    <CheckCircle2 size={16} className="text-[#c8a96e]" />
                    Pago procesado y verificado
                  </div>

                  <div className="text-left md:text-right">
                    <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-white/35">Total reservado</p>
                    <p className="mt-1 text-2xl font-black text-[#c8a96e]">{formatCurrency(totalAmount, totalCurrency)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-white/40">
                  <ShipWheel size={14} className="text-[#c8a96e]/70" />
                  <span>{destinationName}</span>
                </div>
              </div>
            ) : (
              <>
                <span className="material-symbols-outlined mb-5 text-6xl text-[#c8a96e]/50">event_busy</span>
                <h1 className="text-3xl font-headline font-bold text-white">No hay confirmación disponible</h1>
                <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/50">
                  La confirmación se generará únicamente después de completar una reserva real con datos de pago verificados.
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

          {hasConfirmation ? (
            <button
              type="button"
              onClick={handleGoHome}
              className="inline-flex h-12 min-w-[220px] items-center justify-center gap-3 rounded-md bg-[#c8a96e] px-8 text-xs font-black uppercase tracking-[0.16em] text-[#071528] shadow-[0_18px_45px_rgba(200,169,110,0.22)] transition-all hover:-translate-y-0.5 hover:bg-[#e4c47f] hover:shadow-[0_22px_60px_rgba(200,169,110,0.3)]"
            >
              <Home size={16} strokeWidth={2.4} />
              Volver a Inicio
            </button>
          ) : null}
        </div>
      </main>
    </>
  );
};

export default BookingConfirmationPage;
