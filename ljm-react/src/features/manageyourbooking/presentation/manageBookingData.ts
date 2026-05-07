import { request } from "../../../lib/api";
import {
  getBookingDraft,
  getBookingDraftPayableTotal,
  type BookingDraft,
} from "../../../lib/bookingDraft";

export type ItineraryStop = {
  port: string;
  country: string;
  arrivalDate: string | null;
  departureDate: string | null;
  status: 'completed' | 'current' | 'upcoming';
  order: number;
};

export type ManageBookingData = {
  reservationId: string | number;
  reference: string;
  status: string;
  destinationName: string;
  destinationImage?: string;
  departureDate?: string | null;
  returnDate?: string | null;
  nights?: number | null;
  route: string;
  suiteName: string;
  suiteCapacity?: number;
  cabinLabel: string;
  cabinNumber?: string | null;
  guestCount?: number;
  cruiseName?: string | null;
  suiteImage?: string | null;
  suiteDescription?: string | null;
  itineraryName?: string | null;
  itineraryStops?: ItineraryStop[] | null;
  butler?: { included: boolean; name?: string };
  animalCompanion?: {
    nombre: string;
    tipoAnimal: string;
    raza?: string;
    pesoKg?: string | number;
    unidadPeso?: "kg" | "lb" | string;
    cuidadosEspeciales?: string;
    certificadoNombre?: string;
  } | null;
  guests: { id?: string | number; initials: string; name: string; role: string; isElite: boolean }[];
  diningRequests: { id?: string | number; label: string; nombre: string; detalle: string }[];
  excursions: { id?: string | number; imagen: string; nombre: string; fecha: string; puerto: string; estado: string; precio?: number }[];
  payments: { label: string; value: string; color: string }[];
  total: string;
  paymentStatus: string;
};

type ManageBookingResponse = {
  ok: boolean;
  data: ManageBookingData;
};

type StoredConfirmation = {
  bookingDraft?: BookingDraft;
  payment?: {
    id?: string | number;
    reservationId?: string | number;
    reference?: string;
    amount?: number;
    currency?: string;
    status?: string;
  };
};

const readStoredConfirmation = (): StoredConfirmation => {
  try {
    return JSON.parse(sessionStorage.getItem("ljm_booking_confirmation") ?? "{}") as StoredConfirmation;
  } catch {
    return {};
  }
};

const mergeLocalDraft = () => {
  const confirmationDraft = readStoredConfirmation().bookingDraft ?? {};
  const storedDraft = getBookingDraft();

  return {
    ...storedDraft,
    ...confirmationDraft,
    destination: {
      ...storedDraft.destination,
      ...confirmationDraft.destination,
    },
    suite: confirmationDraft.suite ?? storedDraft.suite,
    companions: confirmationDraft.companions ?? storedDraft.companions,
    animalCompanion: confirmationDraft.animalCompanion !== undefined
      ? confirmationDraft.animalCompanion
      : storedDraft.animalCompanion,
    activities: confirmationDraft.activities ?? storedDraft.activities,
    personalization: confirmationDraft.personalization ?? storedDraft.personalization,
  };
};

const readDateField = (draft: BookingDraft, keys: string[]) => {
  const source = draft as Record<string, unknown>;
  const destination = draft.destination as Record<string, unknown> | undefined;

  for (const key of keys) {
    const value = source[key] ?? destination?.[key];

    if (typeof value === "string" && value.trim()) return value;
    if (typeof value === "number" && Number.isFinite(value)) return String(value);
  }

  return null;
};

const getDurationDays = (draft: BookingDraft) => {
  const candidates = [
    draft.destination?.duracion_tipica,
    draft.destination?.duracion_dias,
    draft.destination?.duration,
    draft.destination?.noches,
    draft.destination?.nights,
    draft.duracion_tipica,
    draft.duracion_dias,
    draft.duration,
    draft.noches,
    draft.nights,
  ];

  for (const candidate of candidates) {
    const match = String(candidate ?? "").match(/\d+/);
    const days = match ? Number(match[0]) : 0;

    if (Number.isFinite(days) && days > 0) return days;
  }

  return null;
};

const addDays = (value: string | null, days: number | null) => {
  if (!value || !days) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  date.setDate(date.getDate() + days);
  return date.toISOString();
};

const parseSuiteCapacity = (value: string | undefined) => {
  const capacity = Number(String(value ?? "").match(/\d+/)?.[0] ?? 0);
  return Number.isFinite(capacity) && capacity > 0 ? capacity : undefined;
};

const formatTotal = (amount: number, currency: string) =>
  new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);

const hasRealText = (value: unknown): value is string => {
  if (typeof value !== "string") return false;

  const normalized = value.trim().toLowerCase();

  return Boolean(
    normalized &&
      !normalized.startsWith("sin ") &&
      !normalized.includes("por confirmar") &&
      normalized !== "ljm-pendiente",
  );
};

const pickRealText = (primary: string | null | undefined, fallback: string | null | undefined, finalFallback = "") =>
  hasRealText(primary) ? primary : hasRealText(fallback) ? fallback : primary?.trim() || fallback?.trim() || finalFallback;

export const getLocalManageBookingData = (): ManageBookingData | null => {
  const confirmation = readStoredConfirmation();
  const draft = mergeLocalDraft();

  if (!draft.destination?.titulo && !draft.suite) return null;

  const departureDate = readDateField(draft, [
    "departureDate",
    "departure_date",
    "fecha_salida",
    "fechaSalida",
    "fecha_inicio",
    "fechaInicio",
    "startDate",
    "start_date",
    "travelDate",
    "travel_date",
    "date",
  ]);
  const nights = getDurationDays(draft);
  const returnDate =
    readDateField(draft, [
      "returnDate",
      "return_date",
      "fecha_llegada",
      "fecha_regreso",
      "fechaLlegada",
      "fechaRegreso",
      "endDate",
      "end_date",
    ]) ?? addDays(departureDate, nights);
  const payment = confirmation.payment;
  const reservationId = payment?.reservationId ?? draft.reservationId ?? "local";
  const currency = payment?.currency ?? draft.destination?.moneda ?? "USD";
  const totalAmount = Number(payment?.amount ?? getBookingDraftPayableTotal(draft) ?? 0);
  const companions = draft.companions ?? [];
  const animalCompanion = draft.animalCompanion ?? null;

  return {
    reservationId,
    reference: payment?.reference ?? (draft.reservationId ? `LJM-${draft.reservationId}` : "LJM-PENDIENTE"),
    status: payment?.status ?? "CONFIRMADA",
    destinationName: draft.destination?.titulo ?? "Destino por confirmar",
    destinationImage: draft.destination?.imagen_url ?? draft.destination?.galeria_urls?.[0],
    departureDate,
    returnDate,
    nights,
    route: [draft.destination?.puerto_principal, draft.destination?.pais].filter(Boolean).join(" - ") || "Ruta por confirmar",
    suiteName: draft.suite?.title ?? "Suite por confirmar",
    suiteCapacity: parseSuiteCapacity(draft.suite?.capacity),
    cabinLabel: draft.suite?.title ?? "Cabina por confirmar",
    cabinNumber: null,
    guestCount: companions.length,
    butler: { included: Boolean(draft.personalization?.services.some((service) => service.active)), name: "Concierge LJM" },
    animalCompanion,
    guests: companions.map((companion, index) => {
      const name = [companion.nombre, companion.apellidos].filter(Boolean).join(" ").trim() || `Huésped ${index + 1}`;

      return {
        id: index,
        initials: name
          .split(/\s+/)
          .slice(0, 2)
          .map((part) => part[0])
          .join("")
          .toUpperCase(),
        name,
        role: "Acompañante",
        isElite: false,
      };
    }),
    diningRequests: [],
    excursions: (draft.activities ?? []).map((activity) => ({
      id: activity.id,
      imagen: activity.imagen_url ?? "",
      nombre: activity.nombre,
      fecha: departureDate ?? "Por confirmar",
      puerto: draft.destination?.puerto_principal ?? "Puerto por confirmar",
      estado: "Confirmada",
      precio: Number(activity.precio_base) || 0,
    })),
    payments: [
      {
        label: "Estado de pago",
        value: payment?.status ?? "Pagado",
        color: "text-emerald-300",
      },
    ],
    total: Number.isFinite(totalAmount) ? formatTotal(totalAmount, currency) : formatTotal(0, currency),
    paymentStatus: payment?.status ?? "Pagado",
  };
};

const normalizeManageBookingData = (booking: ManageBookingData): ManageBookingData => {
  const localBooking = getLocalManageBookingData();
  const hasRealReservation = booking.reservationId && String(booking.reservationId) !== 'local';
  const listedGuests = booking.guests.length;
  const reportedGuests = booking.guestCount ?? listedGuests;
  // When backend has a real reservation ID, trust its guest count (don't inflate from stale local data)
  const companionCount = hasRealReservation
    ? Math.max(reportedGuests, listedGuests)
    : Math.max(reportedGuests, listedGuests, localBooking?.guestCount ?? 0);
  const localAnimalCompanion = mergeLocalDraft().animalCompanion ?? null;

  return {
    ...booking,
    reference: pickRealText(booking.reference, localBooking?.reference, "Sin referencia"),
    destinationName: pickRealText(booking.destinationName, localBooking?.destinationName, "Destino por confirmar"),
    destinationImage: booking.destinationImage || localBooking?.destinationImage,
    departureDate: pickRealText(booking.departureDate ?? undefined, localBooking?.departureDate ?? undefined) || null,
    returnDate: pickRealText(booking.returnDate ?? undefined, localBooking?.returnDate ?? undefined) || null,
    nights: booking.nights ?? localBooking?.nights,
    route: pickRealText(booking.route, localBooking?.route, "Ruta por confirmar"),
    suiteName: pickRealText(booking.suiteName, localBooking?.suiteName, "Suite por confirmar"),
    cabinLabel: pickRealText(booking.cabinLabel, localBooking?.cabinLabel, "Cabina por confirmar"),
    cabinNumber: pickRealText(booking.cabinNumber ?? undefined, localBooking?.cabinNumber ?? undefined) || null,
    guestCount: Math.max(0, companionCount),
    // When backend has a real reservation, trust its guest list — even empty means companion was deleted
    guests: hasRealReservation ? booking.guests : (booking.guests.length ? booking.guests : localBooking?.guests ?? []),
    excursions: booking.excursions.length ? booking.excursions : localBooking?.excursions ?? [],
    diningRequests: booking.diningRequests.length ? booking.diningRequests : localBooking?.diningRequests ?? [],
    payments: booking.payments.length ? booking.payments : localBooking?.payments ?? [],
    total: pickRealText(booking.total, localBooking?.total, "0 US$"),
    paymentStatus: pickRealText(booking.paymentStatus, localBooking?.paymentStatus, "Por confirmar"),
    animalCompanion: booking.animalCompanion ?? localAnimalCompanion,
  };
};

export const manageBookingApi = {
  current: (reservationId?: string | number | null) => {
    const params = reservationId ? `?reservationId=${reservationId}` : '';
    return request<ManageBookingResponse>(`/manage-booking/current${params}`, {
      method: "GET",
    }).then((response) => ({
      ...response,
      data: normalizeManageBookingData(response.data),
    }));
  },

  latest: () =>
    request<ManageBookingResponse>("/manage-booking/latest", {
      method: "GET",
    }).then((response) => ({
      ...response,
      data: normalizeManageBookingData(response.data),
    })),

  addGuest: (payload: { reservationId?: string | number; fullName: string; document?: string; birthdate?: string }) =>
    request<ManageBookingResponse>("/manage-booking/guests", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  updateGuest: (id: string | number, payload: { reservationId?: string | number; fullName: string; document?: string }) =>
    request<ManageBookingResponse>(`/manage-booking/guests/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),

  deleteGuest: (id: string | number, payload: { reservationId?: string | number }) =>
    request<ManageBookingResponse>(`/manage-booking/guests/${id}`, {
      method: "DELETE",
      body: JSON.stringify(payload),
    }),

  addDiningRequest: (payload: { reservationId?: string | number; nombre: string; detalle?: string; turno?: string }) =>
    request<ManageBookingResponse>("/manage-booking/dining-requests", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  reserveTable: (payload: { reservationId?: string | number; tablePreference?: string; size?: number; occasion?: string; notes?: string }) =>
    request<ManageBookingResponse>("/manage-booking/table-reservations", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  addExcursion: (payload: { reservationId?: string | number; name: string; price?: number }) =>
    request<ManageBookingResponse>("/manage-booking/excursions", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};
