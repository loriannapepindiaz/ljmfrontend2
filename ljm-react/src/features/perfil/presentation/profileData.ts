import { request } from '../../../lib/api';
import { resolveMemberCode } from '../../../lib/memberCode';
import type { VoyageHistoryData } from '../../voyayehistory/presentation/voyageHistoryData';

export type ProfilePreference = {
  id: string | number;
  name: string;
  category: string;
};

export type ProfileReservation = {
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

export type ProfileHistoryItem = {
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

export type ProfileData = {
  user: {
    id: number;
    username: string | null;
    email: string | null;
    role: string | null;
    status: string | null;
    avatarUrl: string | null;
  };
  client: {
    id: number;
    fullName: string;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    phone: string | null;
    nationality: string | null;
    birthdate: string | null;
    memberCode: string | null;
    avatarUrl: string | null;
  };
  loyalty: {
    tier: string | null;
    label: string;
    progressPct: number;
    nightsToNextTier: number;
  };
  preferences: ProfilePreference[];
  availablePreferences: ProfilePreference[];
  stats: {
    totalReservations: number;
    completedTrips: number;
    totalNights: number;
  };
  upcomingReservation: ProfileReservation | null;
  upcomingReservations: ProfileReservation[];
  travelHistory: ProfileHistoryItem[];
  recommendation: {
    title: string;
    description: string;
  } | null;
};

type ProfileResponse = {
  ok: boolean;
  data: ProfileData;
};

const readStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem('ljm_auth_user') ?? '{}');
  } catch {
    return {};
  }
};

const readStoredAuthEmail = () => {
  const email = localStorage.getItem('ljm_auth_email');
  return typeof email === 'string' && /\S+@\S+\.\S+/.test(email.trim()) ? email.trim() : null;
};

const readEmailFromToken = () => {
  const token = localStorage.getItem('ljm_auth_token');
  const payload = token?.split('.')[1];

  if (!payload) return null;

  try {
    const normalizedPayload = payload.replace(/-/g, '+').replace(/_/g, '/');
    const json = JSON.parse(window.atob(normalizedPayload.padEnd(Math.ceil(normalizedPayload.length / 4) * 4, '=')));
    return findEmailDeep(json);
  } catch {
    return null;
  }
};

const pickEmailFromStoredUser = (user: Record<string, any>) => {
  const candidates = [
    user?.cliente?.email,
    user?.cliente?.correo,
    user?.cliente?.correoElectronico,
    user?.email,
    user?.correo,
    user?.correoElectronico,
    user?.username,
  ];

  return candidates.find((value) => typeof value === 'string' && /\S+@\S+\.\S+/.test(value.trim())) ?? null;
};

const findEmailDeep = (value: unknown, seen = new Set<unknown>()): string | null => {
  if (typeof value === 'string') {
    const email = value.match(/\S+@\S+\.\S+/)?.[0];
    return email ?? null;
  }

  if (!value || typeof value !== 'object' || seen.has(value)) return null;
  seen.add(value);

  for (const child of Object.values(value as Record<string, unknown>)) {
    const email = findEmailDeep(child, seen);
    if (email) return email;
  }

  return null;
};

const recommendationDestinations = [
  {
    title: 'Santorini',
    description: 'Una ruta mediterránea de 7 noches entre caldera, puertos blancos y cenas al atardecer.',
  },
  {
    title: 'Tokio',
    description: 'Una travesía urbana hacia Yokohama con cultura japonesa, templos y experiencias gastronómicas.',
  },
  {
    title: 'Giza & El Cairo',
    description: 'Un itinerario histórico por Egipto con salida privada, guías expertos y noches a bordo.',
  },
  {
    title: 'Río de Janeiro',
    description: 'Playas icónicas, Pan de Azúcar y una ruta costera pensada para una próxima escapada.',
  },
  {
    title: 'Table Mountain',
    description: 'Ciudad del Cabo, vinos y costa atlántica en una recomendación distinta a tus reservas actuales.',
  },
  {
    title: 'Isla Mombasa',
    description: 'Playas de Diani, cultura costera y una ruta por Kenia que no aparece en tus viajes registrados.',
  },
  {
    title: 'Garden City',
    description: 'Singapur combina puerto, jardines urbanos y una escala premium para tu próxima salida.',
  },
  {
    title: 'Ciudad de Addu',
    description: 'Lagunas de Maldivas, snorkel y un atolón tranquilo como alternativa a tus reservas actuales.',
  },
];

const normalizeDestinationName = (value: string | null | undefined) =>
  (value ?? '')
    .trim()
    .toLocaleLowerCase('es-ES')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

const buildUnregisteredRecommendation = (
  upcomingReservation: ProfileData['upcomingReservation'],
  travelHistory: ProfileData['travelHistory'],
): ProfileData['recommendation'] => {
  const registeredDestinations = new Set(
    [upcomingReservation?.destination, ...travelHistory.map((item) => item.destination)]
      .map(normalizeDestinationName)
      .filter(Boolean),
  );
  const recommendation = recommendationDestinations.find(
    (destination) => !registeredDestinations.has(normalizeDestinationName(destination.title)),
  );

  const nextRecommendation = recommendation ?? recommendationDestinations[0];

  return {
    title: `Recomendacion: ${nextRecommendation.title}`,
    description: recommendation
      ? nextRecommendation.description
      : `${nextRecommendation.description} Esta sugerencia se muestra como alternativa aunque el historial este completo.`,
  };
};

const buildProfileFromHistory = (historyData: VoyageHistoryData | null): ProfileData => {
  const user = readStoredUser();
  const clientId = Number(historyData?.client.id ?? user?.cliente?.id ?? user?.id ?? 0);
  const firstName = user?.cliente?.nombre ?? null;
  const lastName = user?.cliente?.apellido ?? null;
  const email = pickEmailFromStoredUser(user) ?? readStoredAuthEmail() ?? readEmailFromToken();
  const fullName =
    historyData?.client.fullName ||
    [firstName, lastName].filter(Boolean).join(' ') ||
    user?.username ||
    user?.email ||
    'Cliente LJM';

  return {
    user: {
      id: Number(user?.id ?? clientId),
      username: user?.username ?? null,
      email,
      role: user?.rol ?? null,
      status: user?.estadoCuenta ?? null,
      avatarUrl: null,
    },
    client: {
      id: clientId,
      fullName,
      firstName,
      lastName,
      email,
      phone: null,
      nationality: null,
      birthdate: null,
      memberCode: resolveMemberCode(historyData?.client.memberCode ?? user?.cliente?.memberCode, clientId),
      avatarUrl: null,
    },
    loyalty: historyData?.loyalty ?? {
      tier: null,
      label: user?.cliente?.loyaltyTier ?? 'Explorador',
      progressPct: 0,
      nightsToNextTier: 0,
    },
    preferences: [],
    availablePreferences: [],
    stats: historyData?.stats ?? {
      totalReservations: 0,
      completedTrips: 0,
      totalNights: 0,
    },
    upcomingReservation: historyData?.upcomingReservation ?? null,
    upcomingReservations: historyData?.upcomingReservations ?? [],
    travelHistory: historyData?.travelHistory ?? [],
    recommendation: buildUnregisteredRecommendation(historyData?.upcomingReservation ?? null, historyData?.travelHistory ?? []),
  };
};

const hasText = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0;

const pickText = (primary: string | null | undefined, fallback: string | null | undefined) =>
  hasText(primary) ? primary : hasText(fallback) ? fallback : null;

const pickNumber = (primary: number | null | undefined, fallback: number | null | undefined) =>
  Number.isFinite(primary) && Number(primary) > 0 ? Number(primary) : Number.isFinite(fallback) ? Number(fallback) : null;

const normalizeCompanionCount = (profileGuests: number | null | undefined, historyGuests: number | null | undefined) => {
  if (Number.isFinite(historyGuests)) return Math.max(0, Number(historyGuests));

  return Number.isFinite(profileGuests) ? Math.max(0, Number(profileGuests)) : 0;
};

const mergeUpcomingReservation = (
  profileReservation: ProfileData['upcomingReservation'],
  historyReservation: VoyageHistoryData['upcomingReservation'],
): ProfileData['upcomingReservation'] => {
  if (!profileReservation && !historyReservation) return null;
  if (!profileReservation) return historyReservation;
  if (!historyReservation) {
    return {
      ...profileReservation,
      guests: normalizeCompanionCount(profileReservation.guests, null),
    };
  }

  return {
    ...historyReservation,
    ...profileReservation,
    code: pickText(profileReservation.code, historyReservation.code) ?? historyReservation.code,
    status: pickText(profileReservation.status, historyReservation.status) ?? historyReservation.status,
    destination: pickText(profileReservation.destination, historyReservation.destination) ?? historyReservation.destination,
    ship: pickText(profileReservation.ship, historyReservation.ship) ?? historyReservation.ship,
    cabin: pickText(profileReservation.cabin, historyReservation.cabin) ?? historyReservation.cabin,
    departureDate: pickText(profileReservation.departureDate, historyReservation.departureDate),
    returnDate: pickText(profileReservation.returnDate, historyReservation.returnDate),
    nights: pickNumber(profileReservation.nights, historyReservation.nights),
    guests: normalizeCompanionCount(profileReservation.guests, historyReservation.guests),
    total: pickNumber(profileReservation.total, historyReservation.total) ?? historyReservation.total,
    currency: pickText(profileReservation.currency, historyReservation.currency) ?? historyReservation.currency,
    paymentStatus: pickText(profileReservation.paymentStatus, historyReservation.paymentStatus) ?? historyReservation.paymentStatus,
    image: pickText(profileReservation.image, historyReservation.image),
    experiences: profileReservation.experiences.length ? profileReservation.experiences : historyReservation.experiences,
  };
};

const mergeStats = (profile: ProfileData, historyData: VoyageHistoryData | null) => {
  if (!historyData) return profile.stats;

  const upcomingNights = mergeUpcomingReservation(profile.upcomingReservation, historyData.upcomingReservation)?.nights ?? 0;

  return {
    totalReservations: Math.max(profile.stats.totalReservations ?? 0, historyData.stats.totalReservations ?? 0),
    completedTrips: Math.max(profile.stats.completedTrips ?? 0, historyData.stats.completedTrips ?? 0),
    totalNights: Math.max(profile.stats.totalNights ?? 0, historyData.stats.totalNights ?? 0, upcomingNights),
  };
};

const mergeProfileWithHistory = (profile: ProfileData, historyData: VoyageHistoryData | null): ProfileData => ({
  ...profile,
  user: {
    ...profile.user,
    email: pickText(
      profile.user.email,
      findEmailDeep(profile) ?? pickEmailFromStoredUser(readStoredUser()) ?? readStoredAuthEmail() ?? readEmailFromToken(),
    ),
  },
  client: {
    ...profile.client,
    email: pickText(
      profile.client.email,
      findEmailDeep(profile) ?? pickEmailFromStoredUser(readStoredUser()) ?? readStoredAuthEmail() ?? readEmailFromToken(),
    ),
    memberCode: resolveMemberCode(profile.client.memberCode, profile.client.id),
  },
  loyalty: historyData?.loyalty ?? profile.loyalty,
  stats: mergeStats(profile, historyData),
  upcomingReservation: mergeUpcomingReservation(profile.upcomingReservation, historyData?.upcomingReservation ?? null),
  upcomingReservations: profile.upcomingReservations?.length ? profile.upcomingReservations : historyData?.upcomingReservations ?? [],
  travelHistory: profile.travelHistory.length ? profile.travelHistory : historyData?.travelHistory ?? [],
  recommendation: buildUnregisteredRecommendation(
    mergeUpcomingReservation(profile.upcomingReservation, historyData?.upcomingReservation ?? null),
    profile.travelHistory.length ? profile.travelHistory : historyData?.travelHistory ?? [],
  ),
});

export const normalizeProfileData = (profile: ProfileData, historyData: VoyageHistoryData | null = null): ProfileData =>
  mergeProfileWithHistory(profile, historyData);

export const getLocalProfileData = () => buildProfileFromHistory(null);

export const profileApi = {
  current: () =>
    request<ProfileResponse>('/profile/current', {
      method: 'GET',
    }).then(async (response) => ({
      ...response,
      data: normalizeProfileData(response.data),
    })),

  update: (payload: { email?: string; preferenceIds?: Array<string | number> }) =>
    request<ProfileResponse>('/profile/current', {
      method: 'PUT',
      body: JSON.stringify(payload),
    }).then((response) => ({
      ...response,
      data: normalizeProfileData(response.data),
    })),
};
