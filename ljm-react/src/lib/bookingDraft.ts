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
  duracion_dias?: number | string;
  duration?: number | string;
  noches?: number | string;
  nights?: number | string;
  puerto_principal?: string;
  clima?: string;
  idioma?: string;
  highlights?: string[];
  incluye?: string[];
  galeria_urls?: string[];
};

export type BookingSuiteDraft = {
  id: string;
  idHabitacion?: number | string | null;
  idTipoHabitacion?: number | string | null;
  id_habitacion?: number | string | null;
  id_tipo_habitacion?: number | string | null;
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

export type BookingAnimalCompanionDraft = {
  nombre: string;
  tipoAnimal: string;
  raza: string;
  pesoKg: string;
  unidadPeso?: 'kg' | 'lb';
  cuidadosEspeciales: string;
  certificadoNombre: string;
  certificadoTipo?: string;
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
  departureDate?: string;
  fecha_salida?: string;
  returnDate?: string;
  fecha_llegada?: string;
  fechaSalida?: string;
  startDate?: string;
  travelDate?: string;
  duracion_tipica?: string;
  duracion_dias?: number | string;
  duration?: number | string;
  noches?: number | string;
  nights?: number | string;
  destination?: BookingDestinationDraft;
  suite?: BookingSuiteDraft;
  companions?: BookingCompanionDraft[];
  personalization?: BookingPersonalizationDraft;
  animalCompanion?: BookingAnimalCompanionDraft | null;
  activities?: BookingActivityDraft[];
  charges?: {
    activitiesTotal?: number | string;
    destinationPrice?: number | string;
    serviceFee?: number | string;
    subtotal?: number | string;
    suitePrice?: number | string;
    total?: number | string;
  };
  monto_total?: number | string;
  moneda?: string;
  subtotal?: number | string;
  total?: number | string;
  syncStatus?: 'synced' | 'local-fallback';
};

const BOOKING_DRAFT_KEY = 'ljm_booking_draft';
const SERVICE_FEE_RATE = 0.05;
const FARE_LOG_PREFIX = '[Tarifa]';

const logFareStep = (step: string, data?: unknown) => {
  console.log(`${FARE_LOG_PREFIX} ${step}`, data ?? '');
};

const logFareError = (step: string, error: unknown) => {
  console.error(`${FARE_LOG_PREFIX} ERROR ${step}`, error);
};

// Precios de referencia por si el backend no tiene precio_noche configurado en la DB
const SUITE_FALLBACK_PRICES: Record<string, number> = {
  'suite oceanica': 1250,
  'camarote clasico': 690,
  'penthouse de deck': 2450,
  'suite familiar deluxe': 1780,
};

const getSuiteFallbackPrice = (title?: string): number => {
  if (!title) return 0;
  return SUITE_FALLBACK_PRICES[title.toLowerCase().trim()] ?? 0;
};

const hasBookingDraftData = (draft: BookingDraft) =>
  Boolean(
    draft.reservationId ||
      draft.destination ||
      draft.suite ||
      draft.companions?.length ||
      draft.personalization ||
      draft.animalCompanion ||
      draft.activities?.length,
  );

const sanitizeBookingDraft = (draft: BookingDraft): BookingDraft => {
  if (!draft.animalCompanion) {
    return draft;
  }

  const { certificadoDataUrl: _discardedPreview, ...animalCompanion } =
    draft.animalCompanion as BookingAnimalCompanionDraft & { certificadoDataUrl?: string };

  return {
    ...draft,
    animalCompanion,
  };
};

const omitUndefinedDraftFields = (draft: BookingDraft): BookingDraft =>
  Object.fromEntries(
    Object.entries(draft).filter(([, value]) => value !== undefined),
  ) as BookingDraft;

const mergeDraftWithBackend = (localDraft: BookingDraft, serverDraft: BookingDraft): BookingDraft => ({
  ...localDraft,
  ...serverDraft,
  destination: serverDraft.destination ?? localDraft.destination,
  suite: serverDraft.suite ?? localDraft.suite,
  activities: serverDraft.activities?.length ? serverDraft.activities : localDraft.activities,
  companions: serverDraft.companions?.length ? serverDraft.companions : localDraft.companions,
  animalCompanion: serverDraft.animalCompanion !== undefined
    ? serverDraft.animalCompanion
    : localDraft.animalCompanion,
  personalization: serverDraft.personalization ?? localDraft.personalization,
  charges: {
    ...localDraft.charges,
    ...serverDraft.charges,
  },
});

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
  const result = Number.isFinite(parsedValue) ? parsedValue : 0;

  if (value && result === 0) {
    logFareStep('parseCurrencyAmount devolvio 0', { input: value, sanitizedValue, normalizedValue });
  }

  return result;
};

export const getBookingDraftCharges = (draft: BookingDraft) => {
  logFareStep('Calculando cargos base', {
    reservationId: draft.reservationId,
    destination: draft.destination?.titulo,
    destinationPriceRaw: draft.destination?.precio_desde,
    suite: draft.suite?.title,
    suitePriceRaw: draft.suite?.pricePerNight,
    activitiesCount: draft.activities?.length ?? 0,
  });

  const destinationPrice = parseCurrencyAmount(draft.destination?.precio_desde);
  const rawSuitePrice = parseCurrencyAmount(draft.suite?.pricePerNight) || parseCurrencyAmount(draft.charges?.suitePrice);
  const suitePrice = rawSuitePrice > 0 ? rawSuitePrice : getSuiteFallbackPrice(draft.suite?.title);
  const activities = draft.activities ?? [];
  const activitiesTotal = activities.reduce(
    (sum, activity) => sum + parseCurrencyAmount(activity.precio_base),
    0,
  );
  const subtotal = destinationPrice + suitePrice + activitiesTotal;
  const serviceFee = subtotal > 0 ? Math.round(subtotal * SERVICE_FEE_RATE) : 0;
  const calculatedTotal = subtotal + serviceFee;
  const serverTotal = parseCurrencyAmount(draft.monto_total);
  const total = calculatedTotal > 0 ? calculatedTotal : serverTotal;

  const charges = {
    activitiesTotal,
    destinationPrice,
    serviceFee,
    subtotal,
    suitePrice,
    total,
  };

  logFareStep('Cargos calculados', charges);

  return charges;
};

export const getBookingDraftChargeLines = (draft: BookingDraft) => {
  logFareStep('Armando lineas de cargo');
  const charges = getBookingDraftCharges(draft);
  const activities = draft.activities ?? [];
  const companionCount = draft.companions?.length ?? 0;
  const animalCompanion = draft.animalCompanion;
  const activeServices = draft.personalization?.services.filter((service) => service.active) ?? [];

  const lines = [
    draft.destination
      ? { label: `Destino: ${draft.destination.titulo ?? 'Seleccionado'}`, value: charges.destinationPrice }
      : null,
    draft.suite ? { label: `Suite: ${draft.suite.title}`, value: charges.suitePrice } : null,
    ...activities.map((activity) => ({
      label: activity.nombre,
      value: parseCurrencyAmount(activity.precio_base),
    })),
    companionCount ? { label: `Acompañantes registrados (${companionCount})`, value: 0 } : null,
    animalCompanion ? { label: `Compañero animal: ${animalCompanion.nombre}`, value: 0 } : null,
    ...activeServices.map((service) => ({ label: service.label, value: 0 })),
    charges.serviceFee ? { label: 'Gestión y procesamiento', value: charges.serviceFee } : null,
  ].filter((line): line is { label: string; value: number } => Boolean(line));

  logFareStep('Lineas de cargo listas', lines);

  return lines;
};

export const getBookingDraftPayableTotal = (draft: BookingDraft) => {
  logFareStep('Resolviendo total pagable', {
    reservationId: draft.reservationId,
    chargesTotal: draft.charges?.total,
    montoTotal: draft.monto_total,
    total: draft.total,
    subtotal: draft.subtotal,
  });

  const explicitTotal =
    parseCurrencyAmount(draft.charges?.total) ||
    parseCurrencyAmount(draft.monto_total) ||
    parseCurrencyAmount(draft.total) ||
    parseCurrencyAmount(draft.subtotal);

  if (explicitTotal > 0) {
    logFareStep('Total pagable tomado de total explicito', explicitTotal);
    return explicitTotal;
  }

  const { total } = getBookingDraftCharges(draft);

  if (total > 0) {
    logFareStep('Total pagable tomado de cargos calculados', total);
    return total;
  }

  const lineTotal = getBookingDraftChargeLines(draft).reduce((sum, line) => sum + line.value, 0);
  logFareStep('Total pagable tomado de suma de lineas', lineTotal);
  return lineTotal;
};

const withResolvedTotals = (draft: BookingDraft): BookingDraft => {
  logFareStep('Normalizando draft con totales', {
    reservationId: draft.reservationId,
    hasDestination: Boolean(draft.destination),
    hasSuite: Boolean(draft.suite),
    activitiesCount: draft.activities?.length ?? 0,
  });

  const cleanDraft = sanitizeBookingDraft(draft);
  const calculatedCharges = getBookingDraftCharges(cleanDraft);
  const lineTotal = getBookingDraftChargeLines(cleanDraft).reduce((sum, line) => sum + line.value, 0);
  const explicitTotal =
    parseCurrencyAmount(cleanDraft.charges?.total) ||
    parseCurrencyAmount(cleanDraft.monto_total) ||
    parseCurrencyAmount(cleanDraft.total) ||
    parseCurrencyAmount(cleanDraft.subtotal);
  const resolvedTotal = Math.max(explicitTotal, calculatedCharges.total, lineTotal);
  logFareStep('Totales resueltos', { explicitTotal, calculatedTotal: calculatedCharges.total, lineTotal, resolvedTotal });

  if (resolvedTotal <= 0) {
    logFareStep('No se pudo resolver total mayor a 0; se devuelve draft sin total', draft);
    return cleanDraft;
  }

  return {
    ...cleanDraft,
    charges: {
      ...calculatedCharges,
      ...cleanDraft.charges,
      total: resolvedTotal,
      subtotal: Math.max(parseCurrencyAmount(cleanDraft.charges?.subtotal), calculatedCharges.subtotal, lineTotal),
    },
    monto_total: resolvedTotal,
    total: resolvedTotal,
  };
};

export const getBookingDraft = (): BookingDraft => {
  try {
    const rawDraft = sessionStorage.getItem(BOOKING_DRAFT_KEY);
    logFareStep('Leyendo draft local', { exists: Boolean(rawDraft) });
    return rawDraft ? (JSON.parse(rawDraft) as BookingDraft) : {};
  } catch (error) {
    logFareError('leyendo draft local', error);
    sessionStorage.removeItem(BOOKING_DRAFT_KEY);
    return {};
  }
};

export const saveBookingDraft = (patch: BookingDraft) => {
  const cleanPatch = omitUndefinedDraftFields(patch);
  logFareStep('Guardando draft local', cleanPatch);
  const currentDraft = getBookingDraft();
  const nextDraft = withResolvedTotals({
    ...currentDraft,
    ...cleanPatch,
  });

  sessionStorage.setItem(BOOKING_DRAFT_KEY, JSON.stringify(nextDraft));
  logFareStep('Draft local guardado', nextDraft);
  return nextDraft;
};

export const loadBookingDraft = async (): Promise<BookingDraft> => {
  const localDraft = getBookingDraft();
  logFareStep('Cargando draft desde backend');

  try {
    const response = await bookingDraftApi.getCurrent<BookingDraft>();
    const serverDraft = response.data ?? {};
    logFareStep('Draft recibido del backend', serverDraft);
    const nextDraft = hasBookingDraftData(serverDraft)
      ? {
          ...mergeDraftWithBackend(localDraft, serverDraft),
          syncStatus: 'synced' as const,
        }
      : localDraft;
    const resolvedDraft = withResolvedTotals(nextDraft);

    sessionStorage.setItem(BOOKING_DRAFT_KEY, JSON.stringify(resolvedDraft));
    logFareStep('Draft cargado y normalizado', resolvedDraft);
    return resolvedDraft;
  } catch (error) {
    logFareError('cargando draft desde backend; usando local fallback', error);
    return withResolvedTotals(localDraft);
  }
};

export const saveBookingDraftToBackend = async (patch: BookingDraft) => {
  const nextDraft = saveBookingDraft({ ...patch, syncStatus: 'local-fallback' });
  logFareStep('Sincronizando draft con backend', nextDraft);

  try {
    const response = await bookingDraftApi.saveCurrent<BookingDraft>(nextDraft);
    const serverDraft = response.data ?? nextDraft;
    logFareStep('Backend respondio draft guardado', serverDraft);
    const syncedDraft: BookingDraft = withResolvedTotals({
      ...mergeDraftWithBackend(nextDraft, serverDraft),
      syncStatus: 'synced',
    });
    sessionStorage.setItem(BOOKING_DRAFT_KEY, JSON.stringify(syncedDraft));
    logFareStep('Draft sincronizado correctamente', syncedDraft);
    return syncedDraft;
  } catch (error) {
    logFareError('sincronizando draft con backend; queda local fallback', error);
    return nextDraft;
  }
};

export const syncBookingDraftWithBackend = async (patch: BookingDraft) => {
  const nextDraft = saveBookingDraft({ ...patch, syncStatus: 'local-fallback' });
  logFareStep('Forzando sincronizacion de draft antes de pago', nextDraft);
  const response = await bookingDraftApi.saveCurrent<BookingDraft>(nextDraft);
  const serverDraft = response.data ?? nextDraft;
  logFareStep('Backend respondio sincronizacion forzada', serverDraft);
  const syncedDraft: BookingDraft = withResolvedTotals({
    ...mergeDraftWithBackend(nextDraft, serverDraft),
    syncStatus: 'synced',
  });
  sessionStorage.setItem(BOOKING_DRAFT_KEY, JSON.stringify(syncedDraft));
  logFareStep('Sincronizacion forzada completa', syncedDraft);
  return syncedDraft;
};

export const clearBookingDraft = () => {
  sessionStorage.removeItem(BOOKING_DRAFT_KEY);
};
