import {
  getBookingDraft,
  getBookingDraftChargeLines,
  getBookingDraftPayableTotal,
  type BookingDraft,
} from "../../../lib/bookingDraft";
import { request, type AuthUser } from "../../../lib/api";
import type { PaymentRecord } from "../../payment/data/paymentApi";

export type InvoicePayment = PaymentRecord & {
  reference?: string;
  paidAt?: string;
  reservationId?: string | number;
};

export type InvoiceConfirmationState = {
  bookingDraft?: BookingDraft;
  payment?: InvoicePayment;
};

export type InvoiceItem = {
  code: string;
  title: string;
  description: string;
  qty: string;
  price: string;
};

export type InvoiceViewData = {
  documentNumber: string;
  qrValue: string;
  statusLabel: string;
  clientName: string;
  memberId: string;
  issueDate: string;
  boarding: string;
  addressLines: string[];
  companions: string[];
  animalCompanion: string[];
  journeyTitle: string;
  journeyDetails: string;
  paymentMethod: string;
  paymentReference: string;
  paymentDate: string;
  paymentStatus: string;
  items: InvoiceItem[];
  subtotal: string;
  total: string;
  currency: string;
  trace: string;
  signature: string;
  footerReference: string;
};

type BackendInvoiceLine = {
  code: string;
  title: string;
  description?: string;
  qty?: string;
  amount: number;
};

export type BackendInvoicePayload = {
  invoice: {
    id: string | number;
    reservationId: string | number;
    number: string;
    status: string;
    issuedAt?: string;
    total: number;
    currency: string;
  } | null;
  reservation: {
    id: string | number;
    code?: string | null;
    status?: string | null;
    bookedAt?: string | null;
    total: number;
    subtotal: number;
    currency: string;
    destination?: {
      title?: string | null;
      country?: string | null;
      location?: string | null;
      port?: string | null;
      duration?: string | null;
    } | null;
    suite?: {
      title?: string | null;
      cabin?: string | null;
      capacity?: string | number | null;
    } | null;
    passengers?: {
      name: string;
      document?: string | null;
      isPrimary?: boolean;
    }[];
    animalCompanions?: {
      name: string;
      type: string;
      breed?: string | null;
      weightKg?: string | number | null;
      weightUnit?: string | null;
      specialCare?: string | null;
      certificateUrl?: string | null;
    }[];
  };
  client?: {
    id: string | number;
    name?: string | null;
    email?: string | null;
    memberCode?: string | null;
    loyaltyTier?: string | null;
  } | null;
  payment?: InvoicePayment | null;
  items: BackendInvoiceLine[];
};

type BackendInvoiceResponse = {
  ok: boolean;
  data: BackendInvoicePayload;
};

const formatDate = (value?: string) => {
  if (!value) return "Sin fecha";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Sin fecha";

  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

const formatCurrency = (value: number, currency = "USD") =>
  `${Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ${currency.toUpperCase() === "USD" ? "US$" : currency.toUpperCase()}`;

const buildQrValue = (data: {
  documentNumber: string;
  reservationId: string;
  payment?: string | number;
  total: number;
  currency: string;
}) =>
  [
    "LJM SEALINE",
    `Documento: ${data.documentNumber}`,
    `Reserva: ${data.reservationId}`,
    data.payment ? `Pago: ${data.payment}` : null,
    `Total: ${formatCurrency(data.total, data.currency)}`,
  ].filter(Boolean).join("\n");

const translateStatus = (value?: string | null) => {
  const normalized = String(value ?? "").toLowerCase();

  if (["paid", "completed", "confirmed", "success", "succeeded", "pagado", "confirmada"].includes(normalized)) {
    return "Pagado";
  }

  if (["pending", "pendiente"].includes(normalized)) {
    return "Pendiente";
  }

  if (["failed", "rejected", "cancelled", "canceled", "fallido", "cancelado"].includes(normalized)) {
    return "Rechazado";
  }

  return value || "Pendiente";
};

const getStoredUser = (): AuthUser | null => {
  try {
    const rawUser = localStorage.getItem("ljm_auth_user") ?? localStorage.getItem("ljm_admin_user");
    return rawUser ? (JSON.parse(rawUser) as AuthUser) : null;
  } catch {
    return null;
  }
};

const getStoredConfirmation = (): InvoiceConfirmationState => {
  try {
    return JSON.parse(sessionStorage.getItem("ljm_booking_confirmation") ?? "{}") as InvoiceConfirmationState;
  } catch {
    return {};
  }
};

const mergeConfirmationDrafts = (...drafts: Array<BookingDraft | undefined>): BookingDraft => {
  const [firstDraft, ...remainingDrafts] = drafts.filter(Boolean) as BookingDraft[];

  return remainingDrafts.reduce(
    (mergedDraft, nextDraft) => ({
      ...mergedDraft,
      ...nextDraft,
      destination: nextDraft.destination ?? mergedDraft.destination,
      suite: nextDraft.suite ?? mergedDraft.suite,
      companions: nextDraft.companions ?? mergedDraft.companions,
      animalCompanion: nextDraft.animalCompanion !== undefined
        ? nextDraft.animalCompanion
        : mergedDraft.animalCompanion,
      personalization: nextDraft.personalization ?? mergedDraft.personalization,
      activities: nextDraft.activities ?? mergedDraft.activities,
      charges: {
        ...mergedDraft.charges,
        ...nextDraft.charges,
      },
    }),
    firstDraft ?? {},
  );
};

export const loadInvoiceConfirmation = (state: unknown): InvoiceConfirmationState => {
  const routeState = (state as InvoiceConfirmationState | null) ?? {};
  const storedState = getStoredConfirmation();
  const currentDraft = getBookingDraft();

  return {
    bookingDraft: mergeConfirmationDrafts(currentDraft, storedState.bookingDraft, routeState.bookingDraft),
    payment: routeState.payment ?? storedState.payment,
  };
};

export const buildInvoiceData = (confirmation: InvoiceConfirmationState): InvoiceViewData => {
  const draft = confirmation.bookingDraft ?? {};
  const payment = confirmation.payment;
  const user = getStoredUser();
  const client = user?.cliente;
  const currency = payment?.currency ?? draft.destination?.moneda ?? "USD";
  const documentNumber = String(payment?.reference ?? payment?.id ?? "Sin documento");
  const reservationId = String(payment?.reservationId ?? draft.reservationId ?? "Sin reserva");
  const paymentDateSource = payment?.paidAt ?? payment?.createdAt;
  const issueDate = formatDate(paymentDateSource);
  const totalValue = Number(payment?.amount ?? getBookingDraftPayableTotal(draft));
  const lines = getBookingDraftChargeLines(draft);
  const items = lines.map((line, index) => ({
    code: String(index + 1).padStart(2, "0"),
    title: line.label,
    description: line.value > 0 ? "Cargo asociado a la reserva confirmada" : "Servicio incluido en la reserva",
    qty: "1",
    price: line.value > 0 ? formatCurrency(line.value, currency) : "Incluido",
  }));
  const paymentMethod = payment?.method
    ? `${payment.method.name}${payment.method.last4 ? ` **** ${payment.method.last4}` : ""}`
    : "Sin metodo registrado";
  const translatedPaymentStatus = translateStatus(payment?.status);
  const statusLabel = payment?.status ? `Pago ${translatedPaymentStatus}` : "Pendiente de pago";
  const clientName = [client?.nombre, client?.apellido].filter(Boolean).join(" ")
    || user?.username
    || user?.email
    || "Cliente LJM";
  const addressLines = [
    draft.destination?.ubicacion,
    draft.destination?.pais,
    draft.destination?.puerto_principal ? `Puerto: ${draft.destination.puerto_principal}` : null,
  ].filter((line): line is string => Boolean(line));
  const animalCompanion = draft.animalCompanion
    ? [
        draft.animalCompanion.nombre,
        `${draft.animalCompanion.tipoAnimal}${draft.animalCompanion.raza ? ` | ${draft.animalCompanion.raza}` : ""}`,
        draft.animalCompanion.pesoKg ? `${draft.animalCompanion.pesoKg} ${draft.animalCompanion.unidadPeso ?? "kg"}` : "",
        draft.animalCompanion.certificadoNombre ? `Certificado: ${draft.animalCompanion.certificadoNombre}` : "",
        draft.animalCompanion.cuidadosEspeciales,
      ].filter(Boolean)
    : [];

  return {
    documentNumber,
    qrValue: buildQrValue({
      documentNumber,
      reservationId,
      payment: payment?.reference ?? payment?.id,
      total: totalValue,
      currency,
    }),
    statusLabel,
    clientName,
    memberId: client?.memberCode ?? (client?.id ? `LJM-${client.id}` : user?.id ? `USR-${user.id}` : "Sin ID"),
    issueDate,
    boarding: draft.destination?.puerto_principal ?? draft.destination?.ubicacion ?? "Sin embarque",
    addressLines: addressLines.length ? addressLines : ["Sin dirección registrada"],
    companions: (draft.companions ?? []).map((companion) =>
      [companion.nombre, companion.apellidos].filter(Boolean).join(" "),
    ).filter(Boolean),
    animalCompanion,
    journeyTitle: draft.destination?.titulo ?? "Sin travesía",
    journeyDetails: [
      draft.destination?.duracion_tipica,
      draft.suite?.title,
      draft.suite?.capacity,
    ].filter(Boolean).join(" | ") || "Sin noches ni cubierta asignadas",
    paymentMethod,
    paymentReference: documentNumber,
    paymentDate: issueDate,
    paymentStatus: translatedPaymentStatus,
    items,
    subtotal: formatCurrency(lines.reduce((sum, line) => sum + line.value, 0), currency),
    total: formatCurrency(totalValue, currency),
    currency,
    trace: payment?.id ? `PAY-${payment.id}-RSV-${reservationId}` : "Sin traza generada",
    signature: "LJM Sealine",
    footerReference: `Ref: ${reservationId}`,
  };
};

export const fetchInvoiceByReservation = (reservationId: string | number) =>
  request<BackendInvoiceResponse>(`/invoices/reservation/${reservationId}`, {
    method: "GET",
  });

export const fetchCurrentInvoice = () =>
  request<BackendInvoiceResponse>("/invoices/current", {
    method: "GET",
  });

export const buildInvoiceDataFromBackend = (payload: BackendInvoicePayload): InvoiceViewData => {
  const payment = payload.payment;
  const invoice = payload.invoice;
  const reservation = payload.reservation;
  const destination = reservation.destination;
  const suite = reservation.suite;
  const currency = invoice?.currency ?? payment?.currency ?? reservation.currency ?? "USD";
  const documentNumber = String(invoice?.number ?? payment?.reference ?? payment?.id ?? "Sin documento");
  const reservationId = String(reservation.id);
  const totalValue = Number(invoice?.total ?? payment?.amount ?? reservation.total ?? 0);
  const subtotalValue = payload.items.reduce((sum, item) => sum + Number(item.amount ?? 0), 0);
  const companions = (reservation.passengers ?? [])
    .filter((passenger) => !passenger.isPrimary)
    .map((passenger) => passenger.name)
    .filter(Boolean);
  const animalCompanion = (reservation.animalCompanions ?? []).flatMap((animal) => [
    animal.name,
    `${animal.type}${animal.breed ? ` | ${animal.breed}` : ""}`,
    animal.weightKg ? `${animal.weightKg} ${animal.weightUnit ?? "kg"}` : "",
    animal.certificateUrl ? `Certificado: ${animal.certificateUrl}` : "",
    animal.specialCare ?? "",
  ]).filter(Boolean);
  const addressLines = [destination?.location, destination?.country, destination?.port ? `Puerto: ${destination.port}` : null]
    .filter((line): line is string => Boolean(line));

  return {
    documentNumber,
    qrValue: buildQrValue({
      documentNumber,
      reservationId,
      payment: payment?.reference ?? payment?.id,
      total: totalValue,
      currency,
    }),
    statusLabel: invoice?.status ? `Factura ${translateStatus(invoice.status)}` : payment?.status ? `Pago ${translateStatus(payment.status)}` : "Pendiente",
    clientName: payload.client?.name || payload.client?.email || "Cliente LJM",
    memberId: payload.client?.memberCode ?? (payload.client?.id ? `LJM-${payload.client.id}` : "Sin ID"),
    issueDate: formatDate(invoice?.issuedAt ?? payment?.paidAt ?? payment?.createdAt),
    boarding: destination?.port ?? destination?.location ?? "Sin embarque",
    addressLines: addressLines.length ? addressLines : ["Sin dirección registrada"],
    companions,
    animalCompanion,
    journeyTitle: destination?.title ?? "Sin travesía",
    journeyDetails: [
      destination?.duration,
      suite?.title,
      suite?.cabin ? `Habitación ${suite.cabin}` : null,
      suite?.capacity ? `${suite.capacity} huéspedes` : null,
    ].filter(Boolean).join(" | ") || "Sin noches ni cubierta asignadas",
    paymentMethod: payment?.method
      ? `${payment.method.name}${payment.method.last4 ? ` **** ${payment.method.last4}` : ""}`
      : "Sin metodo registrado",
    paymentReference: String(payment?.reference ?? payment?.id ?? documentNumber),
    paymentDate: formatDate(payment?.paidAt ?? payment?.createdAt),
    paymentStatus: translateStatus(payment?.status),
    items: payload.items.map((item, index) => ({
      code: item.code ?? String(index + 1).padStart(2, "0"),
      title: item.title,
      description: item.description ?? "Cargo registrado",
      qty: item.qty ?? "1",
      price: Number(item.amount) > 0 ? formatCurrency(Number(item.amount), currency) : "Incluido",
    })),
    subtotal: formatCurrency(subtotalValue, currency),
    total: formatCurrency(totalValue, currency),
    currency,
    trace: invoice?.id ? `INV-${invoice.id}-RSV-${reservationId}` : payment?.id ? `PAY-${payment.id}-RSV-${reservationId}` : "Sin traza generada",
    signature: "LJM Sealine",
    footerReference: `Ref: ${reservation.code ?? reservationId}`,
  };
};

const hasUsefulText = (value: string, emptyMarkers: string[]) =>
  Boolean(value && !emptyMarkers.some((marker) => value.toLowerCase().includes(marker.toLowerCase())));

const mergeInvoiceItems = (fallbackItems: InvoiceItem[], backendItems: InvoiceItem[]) => {
  if (!backendItems.length) return fallbackItems;

  const hasAnimalItem = backendItems.some((item) => /compa(ñ|n)ero animal/i.test(item.title));
  const fallbackAnimalItem = fallbackItems.find((item) => /compa(ñ|n)ero animal/i.test(item.title));

  return !hasAnimalItem && fallbackAnimalItem
    ? [...backendItems, { ...fallbackAnimalItem, code: String(backendItems.length + 1).padStart(2, "0") }]
    : backendItems;
};

export const mergeInvoiceData = (fallback: InvoiceViewData, backend: InvoiceViewData): InvoiceViewData => ({
  ...backend,
  clientName: hasUsefulText(backend.clientName, ["Cliente LJM"]) ? backend.clientName : fallback.clientName,
  memberId: hasUsefulText(backend.memberId, ["Sin ID"]) ? backend.memberId : fallback.memberId,
  boarding: hasUsefulText(backend.boarding, ["Sin embarque"]) ? backend.boarding : fallback.boarding,
  addressLines: backend.addressLines.some((line) => hasUsefulText(line, ["Sin dirección"]))
    ? backend.addressLines
    : fallback.addressLines,
  companions: backend.companions.length ? backend.companions : fallback.companions,
  animalCompanion: backend.animalCompanion.length ? backend.animalCompanion : fallback.animalCompanion,
  journeyTitle: hasUsefulText(backend.journeyTitle, ["Sin travesía", "Sin travesia"]) ? backend.journeyTitle : fallback.journeyTitle,
  journeyDetails: hasUsefulText(backend.journeyDetails, ["Sin noches"]) ? backend.journeyDetails : fallback.journeyDetails,
  paymentMethod: hasUsefulText(backend.paymentMethod, ["Sin metodo", "Sin método"]) ? backend.paymentMethod : fallback.paymentMethod,
  items: mergeInvoiceItems(fallback.items, backend.items),
  subtotal: backend.subtotal !== "0 US$" ? backend.subtotal : fallback.subtotal,
  total: backend.total !== "0 US$" ? backend.total : fallback.total,
  qrValue: hasUsefulText(backend.qrValue, ["Sin reserva", "Sin documento"]) ? backend.qrValue : fallback.qrValue,
});
