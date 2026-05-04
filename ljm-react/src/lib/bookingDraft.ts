import { bookingDraftApi } from './api';

export type BookingDestinationDraft = {
  id?: string | number;
  titulo?: string;
  pais?: string;
  ubicacion?: string;
  descripcion?: string;
  imagen_url?: string;
  precio_desde?: number | string;
  moneda?: string;
  rating_promedio?: number | string;
  duracion_tipica?: string;
  puerto_principal?: string;
  clima?: string;
  idioma?: string;
  highlights?: string[];
  incluye?: string[];
  galeria_urls?: string[];
};

export type BookingSuiteDraft = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  size: string;
  feature: string;
  capacity: string;
  pricePerNight: number | string;
  highlights: string[];
  amenities: string[];
  gallery: string[];
};

export type BookingCompanionDraft = {
  nombre: string;
  apellidos: string;
  fecha: string | null;
  pasaporte: string;
};

export type BookingPersonalizationDraft = {
  services: {
    id: string;
    label: string;
    active: boolean;
  }[];
  pillow: {
    id: string;
    label: string;
  };
  diet: string;
  allergies: {
    id: string;
    label: string;
  }[];
  additionalRequirements: string;
  specialRequest: string;
};

export type BookingActivityDraft = {
  id: string;
  nombre: string;
  descripcion?: string | null;
  categoria?: string;
  imagen_url?: string | null;
  unidad_cobro?: string;
  precio_base: number | string;
};

export type BookingDraft = {
  reservationId?: string;
  destination?: BookingDestinationDraft;
  suite?: BookingSuiteDraft;
  companions?: BookingCompanionDraft[];
  personalization?: BookingPersonalizationDraft;
  activities?: BookingActivityDraft[];
  syncStatus?: 'synced' | 'local-fallback';
};

const BOOKING_DRAFT_KEY = 'ljm_booking_draft';

const hasBookingDraftData = (draft: BookingDraft) =>
  Boolean(
    draft.reservationId ||
      draft.destination ||
      draft.suite ||
      draft.companions?.length ||
      draft.personalization ||
      draft.activities?.length,
  );

export const parseCurrencyAmount = (value: unknown): number => {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : 0;
  }

  if (typeof value !== 'string') {
    return 0;
  }

  const sanitizedValue = value
    .replace(/\s/g, '')
    .replace(/[^\d,.-]/g, '');
  const lastComma = sanitizedValue.lastIndexOf(',');
  const lastDot = sanitizedValue.lastIndexOf('.');
  const decimalSeparator = lastComma > lastDot ? ',' : '.';
  const normalizedValue = sanitizedValue
    .replace(/[,.]/g, (separator, index) => {
      if (separator === decimalSeparator && sanitizedValue.length - index <= 3) {
        return '.';
      }

      return '';
    });
  const parsedValue = Number(normalizedValue);

  return Number.isFinite(parsedValue) ? parsedValue : 0;
};

export const getBookingDraftCharges = (draft: BookingDraft) => {
  const destinationPrice = parseCurrencyAmount(draft.destination?.precio_desde);
  const suitePrice = parseCurrencyAmount(draft.suite?.pricePerNight);
  const activities = draft.activities ?? [];
  const activitiesTotal = activities.reduce(
    (sum, activity) => sum + parseCurrencyAmount(activity.precio_base),
    0,
  );
  const subtotal = destinationPrice + suitePrice + activitiesTotal;
  const serviceFee = subtotal > 0 ? Math.round(subtotal * 0.05) : 0;

  return {
    activitiesTotal,
    destinationPrice,
    serviceFee,
    subtotal,
    suitePrice,
    total: subtotal + serviceFee,
  };
};

export const getBookingDraft = (): BookingDraft => {
  try {
    const rawDraft = sessionStorage.getItem(BOOKING_DRAFT_KEY);
    return rawDraft ? (JSON.parse(rawDraft) as BookingDraft) : {};
  } catch {
    sessionStorage.removeItem(BOOKING_DRAFT_KEY);
    return {};
  }
};

export const saveBookingDraft = (patch: BookingDraft) => {
  const currentDraft = getBookingDraft();
  const nextDraft = {
    ...currentDraft,
    ...patch,
  };

  sessionStorage.setItem(BOOKING_DRAFT_KEY, JSON.stringify(nextDraft));
  return nextDraft;
};

export const loadBookingDraft = async (): Promise<BookingDraft> => {
  const localDraft = getBookingDraft();

  try {
    const response = await bookingDraftApi.getCurrent<BookingDraft>();
    const serverDraft = response.data ?? {};
    const nextDraft = hasBookingDraftData(serverDraft)
      ? { ...localDraft, ...serverDraft, syncStatus: 'synced' as const }
      : localDraft;

    sessionStorage.setItem(BOOKING_DRAFT_KEY, JSON.stringify(nextDraft));
    return nextDraft;
  } catch {
    return localDraft;
  }
};

export const saveBookingDraftToBackend = async (patch: BookingDraft) => {
  const nextDraft = saveBookingDraft({ ...patch, syncStatus: 'local-fallback' });

  try {
    const response = await bookingDraftApi.saveCurrent<BookingDraft>(nextDraft);
    const serverDraft = response.data ?? nextDraft;
    const syncedDraft: BookingDraft = { ...serverDraft, syncStatus: 'synced' };
    sessionStorage.setItem(BOOKING_DRAFT_KEY, JSON.stringify(syncedDraft));
    return syncedDraft;
  } catch {
    return nextDraft;
  }
};

export const syncBookingDraftWithBackend = async (patch: BookingDraft) => {
  const nextDraft = saveBookingDraft({ ...patch, syncStatus: 'local-fallback' });
  const response = await bookingDraftApi.saveCurrent<BookingDraft>(nextDraft);
  const serverDraft = response.data ?? nextDraft;
  const syncedDraft: BookingDraft = { ...serverDraft, syncStatus: 'synced' };
  sessionStorage.setItem(BOOKING_DRAFT_KEY, JSON.stringify(syncedDraft));
  return syncedDraft;
};

export const clearBookingDraft = () => {
  sessionStorage.removeItem(BOOKING_DRAFT_KEY);
};
