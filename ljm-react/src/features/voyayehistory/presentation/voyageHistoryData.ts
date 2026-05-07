import { request, API_BASE_URL } from '../../../lib/api';
import {
  getBookingDraft,
  getBookingDraftPayableTotal,
  type BookingDraft,
} from '../../../lib/bookingDraft';
import { resolveMemberCode } from '../../../lib/memberCode';

export type VoyageHistoryReservation = {
  id: string | number;
  code: string;
  status: string;
  destination: string;
  ship: string;
  cabin: string;
  departureDate: string | null;
  returnDate: string | null;
  nights: number | null;
  guests: number;
  total: number;
  currency: string;
  paymentStatus: string;
  image: string | null;
  experiences: Array<{
    id: string | number;
    name: string;
    price: number;
  }>;
};

export type VoyageHistoryItem = {
  id: string | number;
  reservationId: string | number;
  destination: string;
  ship: string;
  cabin: string;
  departureDate: string | null;
  returnDate: string | null;
  nights: number | null;
  rating: number | null;
};

export type VoyageHistoryData = {
  client: {
    id: number;
    memberCode: string | null;
    fullName: string;
  };
  loyalty: {
    tier: string | null;
    label: string;
    progressPct: number;
    nightsToNextTier: number;
  };
  stats: {
    totalReservations: number;
    completedTrips: number;
    totalNights: number;
  };
  upcomingReservation: VoyageHistoryReservation | null;
  upcomingReservations: VoyageHistoryReservation[];
  travelHistory: VoyageHistoryItem[];
};

type VoyageHistoryResponse = {
  ok: boolean;
  data: VoyageHistoryData;
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
    return JSON.parse(sessionStorage.getItem('ljm_booking_confirmation') ?? '{}') as StoredConfirmation;
  } catch {
    return {};
  }
};

const readStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem('ljm_auth_user') ?? '{}');
  } catch {
    return {};
  }
};

const getLocalDraft = () => {
  const confirmation = readStoredConfirmation();
  const storedDraft = getBookingDraft();
  const confirmationDraft = confirmation.bookingDraft ?? {};

  return {
    ...storedDraft,
    ...confirmationDraft,
    departureDate: confirmationDraft.departureDate ?? storedDraft.departureDate,
    fecha_salida: confirmationDraft.fecha_salida ?? storedDraft.fecha_salida,
    fechaSalida: confirmationDraft.fechaSalida ?? storedDraft.fechaSalida,
    startDate: confirmationDraft.startDate ?? storedDraft.startDate,
    travelDate: confirmationDraft.travelDate ?? storedDraft.travelDate,
    returnDate: confirmationDraft.returnDate ?? storedDraft.returnDate,
    fecha_llegada: confirmationDraft.fecha_llegada ?? storedDraft.fecha_llegada,
    destination: {
      ...storedDraft.destination,
      ...confirmationDraft.destination,
    },
    suite: confirmationDraft.suite ?? storedDraft.suite,
  };
};

const readDraftField = (draft: BookingDraft, keys: string[]) => {
  const source = draft as Record<string, unknown>;
  const destination = draft.destination as Record<string, unknown> | undefined;

  for (const key of keys) {
    const value = source[key] ?? destination?.[key];

    if (typeof value === 'string' && value.trim()) return value;
    if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  }

  return null;
};

const readReservationField = (reservation: VoyageHistoryReservation | null | undefined, keys: string[]) => {
  const source = reservation as Record<string, unknown> | null | undefined;

  if (!source) return null;

  for (const key of keys) {
    const value = source[key];

    if (typeof value === 'string' && value.trim()) return value;
    if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  }

  return null;
};

const getDepartureDate = (draft: BookingDraft, base?: VoyageHistoryReservation | null) =>
  readDraftField(draft, [
    'departureDate',
    'departure_date',
    'fecha_salida',
    'fechaSalida',
    'fecha_inicio',
    'fechaInicio',
    'startDate',
    'start_date',
    'travelDate',
    'travel_date',
    'date',
  ]) ??
  readReservationField(base, [
    'departureDate',
    'departure_date',
    'fecha_salida',
    'fechaSalida',
    'fecha_inicio',
    'fechaInicio',
    'startDate',
    'start_date',
    'travelDate',
    'travel_date',
    'date',
  ]);

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
    const match = String(candidate ?? '').match(/\d+/);
    const days = match ? Number(match[0]) : 0;

    if (Number.isFinite(days) && days > 0) {
      return days;
    }
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

const getReturnDate = (draft: BookingDraft, base: VoyageHistoryReservation | null | undefined, departureDate: string | null, nights: number | null) =>
  readDraftField(draft, [
    'returnDate',
    'return_date',
    'fecha_llegada',
    'fecha_regreso',
    'fechaLlegada',
    'fechaRegreso',
    'endDate',
    'end_date',
  ]) ??
  readReservationField(base, [
    'returnDate',
    'return_date',
    'fecha_llegada',
    'fecha_regreso',
    'fechaLlegada',
    'fechaRegreso',
    'endDate',
    'end_date',
  ]) ??
  addDays(departureDate, nights);

const buildLocalUpcomingReservation = (base?: VoyageHistoryReservation | null): VoyageHistoryReservation | null => {
  const confirmation = readStoredConfirmation();
  const draft = getLocalDraft();

  if (!draft.destination?.titulo) {
    return base ?? null;
  }

  const departureDate = getDepartureDate(draft, base);
  const nights = getDurationDays(draft) ?? base?.nights ?? null;
  const returnDate = getReturnDate(draft, base, departureDate, nights);
  const payment = confirmation.payment;
  const reservationId = payment?.reservationId ?? draft.reservationId ?? base?.id ?? 'local';
  const total = Number(payment?.amount ?? getBookingDraftPayableTotal(draft) ?? base?.total ?? 0);

  return {
    id: reservationId,
    code: payment?.reference ?? base?.code ?? (draft.reservationId ? `LJM-${draft.reservationId}` : 'LJM-PENDIENTE'),
    status: base?.status ?? payment?.status ?? 'CONFIRMADA',
    destination: draft.destination.titulo,
    ship: base?.ship ?? 'LJM Sealine',
    cabin: draft.suite?.title ?? base?.cabin ?? 'Cabina por confirmar',
    departureDate,
    returnDate,
    nights,
    guests: draft.companions?.length ?? 0,
    total: Number.isFinite(total) ? total : 0,
    currency: payment?.currency ?? draft.destination.moneda ?? base?.currency ?? 'USD',
    paymentStatus: base?.paymentStatus ?? 'Pagado',
    image: draft.destination.imagen_url ?? draft.destination.galeria_urls?.[0] ?? base?.image ?? null,
    experiences: (draft.activities ?? []).map((activity) => ({
      id: activity.id,
      name: activity.nombre,
      price: Number(activity.precio_base) || 0,
    })),
  };
};

export const getLocalVoyageHistoryData = (): VoyageHistoryData | null => {
  const upcomingReservation = buildLocalUpcomingReservation();

  if (!upcomingReservation) {
    return null;
  }

  const user = readStoredUser();
  const clientId = Number(user?.cliente?.id ?? user?.id ?? 0);

  return {
    client: {
      id: clientId,
      memberCode: resolveMemberCode(user?.cliente?.memberCode ?? null, clientId),
      fullName: [user?.cliente?.nombre, user?.cliente?.apellido].filter(Boolean).join(' ') || 'Cliente LJM',
    },
    loyalty: {
      tier: null,
      label: 'Miembro LJM',
      progressPct: 0,
      nightsToNextTier: 0,
    },
    stats: {
      totalReservations: 1,
      completedTrips: 0,
      totalNights: upcomingReservation.nights ?? 0,
    },
    upcomingReservation,
    upcomingReservations: [],
    travelHistory: [],
  };
};

export const normalizeVoyageHistoryData = (historyData: VoyageHistoryData): VoyageHistoryData => {
  return {
    ...historyData,
    client: {
      ...historyData.client,
      memberCode: resolveMemberCode(historyData.client.memberCode, historyData.client.id),
    },
    upcomingReservation: historyData.upcomingReservation ?? buildLocalUpcomingReservation(),
    upcomingReservations: historyData.upcomingReservations ?? [],
  };
};

export const cancelReservation = async (id: string | number): Promise<void> => {
  const token = localStorage.getItem('ljm_auth_token') ?? '';
  const res = await fetch(`${API_BASE_URL}/reservas/${id}/cancelar`, {
    method: 'PATCH',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message ?? 'No se pudo cancelar la reserva');
};

export const voyageHistoryApi = {
  current: (signal?: AbortSignal) =>
    request<VoyageHistoryResponse>('/voyage-history/current', {
      method: 'GET',
      signal,
    }).then((response) => ({
      ...response,
      data: normalizeVoyageHistoryData(response.data),
    })),
};
