import { request } from '../../../lib/api';
import { resolveMemberCode } from '../../../lib/memberCode';
import { voyageHistoryApi, type VoyageHistoryData } from '../../voyayehistory/presentation/voyageHistoryData';

export type ReviewHistoryTrip = {
  historyId: string | number;
  reservationId: string | number;
  voyageId: string | number;
  title: string;
  ship: string;
  departureDate: string | null;
  returnDate: string | null;
  rating: number | null;
};

export type ReviewItem = {
  id: string | number;
  initials: string;
  name: string;
  registryId: string;
  voyageId: string | number | null;
  voyageName: string;
  stars: number;
  text: string;
  timeAgo: string;
  createdAt: string;
  mine: boolean;
};

export type ReviewsData = {
  client: {
    id: number;
    fullName: string;
    email: string | null;
    memberCode: string;
  };
  history: ReviewHistoryTrip[];
  reviews: ReviewItem[];
  summary: {
    average: number;
    total: number;
    distribution: Array<{
      stars: number;
      count: number;
      pct: number;
    }>;
  };
};

type ReviewsResponse = {
  ok: boolean;
  data: ReviewsData;
};

const emptySummary = {
  average: 0,
  total: 0,
  distribution: [5, 4, 3, 2, 1].map((stars) => ({ stars, count: 0, pct: 0 })),
};

const readStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem('ljm_auth_user') ?? '{}');
  } catch {
    return {};
  }
};

const LOCAL_REVIEWS_KEY = 'ljm_local_reviews';

type LocalReview = {
  id: string;
  clientId: number;
  historyId: string | number;
  reservationId: string | number;
  voyageId: string | number;
  rating: number;
  text: string;
  createdAt: string;
};

const getClientId = () => {
  const user = readStoredUser();
  return Number(user?.cliente?.id ?? user?.id ?? 0);
};

const readLocalReviews = (): LocalReview[] => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_REVIEWS_KEY) ?? '[]') as LocalReview[];
  } catch {
    return [];
  }
};

const saveLocalReviews = (reviews: LocalReview[]) => {
  localStorage.setItem(LOCAL_REVIEWS_KEY, JSON.stringify(reviews));
};

export const getLocalRatingForHistoryItem = (historyId: string | number, reservationId: string | number) => {
  const clientId = getClientId();
  const review = readLocalReviews().find(
    (item) =>
      item.clientId === clientId &&
      (String(item.historyId) === String(historyId) || String(item.reservationId) === String(reservationId)),
  );

  return review?.rating ?? null;
};

const buildLocalReviewItem = (review: LocalReview, trip?: ReviewHistoryTrip): ReviewItem => {
  const user = readStoredUser();
  const name =
    [user?.cliente?.nombre, user?.cliente?.apellido].filter(Boolean).join(' ') ||
    user?.username ||
    'Cliente LJM';
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase() || 'LJ';

  return {
    id: review.id,
    initials,
    name,
    registryId: resolveMemberCode(user?.cliente?.memberCode, review.clientId) ?? 'LJM-PENDIENTE',
    voyageId: review.voyageId,
    voyageName: trip?.title ?? 'Viaje registrado',
    stars: review.rating,
    text: review.text,
    timeAgo: 'tu reseña local',
    createdAt: review.createdAt,
    mine: true,
  };
};

const mergeLocalReviews = (data: ReviewsData): ReviewsData => {
  const clientId = data.client.id || getClientId();
  const localReviews = readLocalReviews().filter((review) => review.clientId === clientId);
  const localReviewItems = localReviews.map((review) =>
    buildLocalReviewItem(
      review,
      data.history.find(
        (trip) =>
          String(trip.historyId) === String(review.historyId) ||
          String(trip.reservationId) === String(review.reservationId) ||
          String(trip.voyageId) === String(review.voyageId),
      ),
    ),
  );
  const backendReviewIds = new Set(data.reviews.map((review) => String(review.id)));
  const reviews = [
    ...data.reviews,
    ...localReviewItems.filter((review) => !backendReviewIds.has(String(review.id))),
  ];
  const history = data.history.map((trip) => {
    const localReview = localReviews.find(
      (review) =>
        String(review.historyId) === String(trip.historyId) ||
        String(review.reservationId) === String(trip.reservationId) ||
        String(review.voyageId) === String(trip.voyageId),
    );

    return localReview ? { ...trip, rating: localReview.rating } : trip;
  });
  const ratings = reviews.map((review) => review.stars).filter((rating) => rating > 0);
  const total = ratings.length;
  const average = total ? ratings.reduce((sum, rating) => sum + rating, 0) / total : 0;
  const distribution = [5, 4, 3, 2, 1].map((stars) => {
    const count = ratings.filter((rating) => rating === stars).length;

    return {
      stars,
      count,
      pct: total ? Math.round((count / total) * 100) : 0,
    };
  });

  return {
    ...data,
    history,
    reviews,
    summary: {
      average,
      total,
      distribution,
    },
  };
};

const getClientFromVoyageHistory = (historyData?: VoyageHistoryData | null): ReviewsData['client'] => {
  const user = readStoredUser();
  const clientId = Number(historyData?.client.id ?? user?.cliente?.id ?? user?.id ?? 0);
  const fullName =
    historyData?.client.fullName ||
    [user?.cliente?.nombre, user?.cliente?.apellido].filter(Boolean).join(' ') ||
    user?.username ||
    'Cliente LJM';

  return {
    id: clientId,
    fullName,
    email: user?.cliente?.email ?? user?.email ?? null,
    memberCode: resolveMemberCode(historyData?.client.memberCode, clientId) ?? 'LJM-PENDIENTE',
  };
};

const mapVoyageHistoryTrips = (historyData: VoyageHistoryData): ReviewHistoryTrip[] =>
  historyData.travelHistory.map((item) => ({
    historyId: item.id,
    reservationId: item.reservationId,
    voyageId: item.reservationId,
    title: item.destination,
    ship: item.ship,
    departureDate: item.departureDate,
    returnDate: item.returnDate,
    rating: item.rating,
  }));

const withVoyageHistoryFallback = async (data?: ReviewsData | null): Promise<ReviewsData> => {
  if (data?.history.length) {
    return mergeLocalReviews(data);
  }

  try {
    const historyResponse = await voyageHistoryApi.current();
    const history = mapVoyageHistoryTrips(historyResponse.data);

    return mergeLocalReviews({
      client: data?.client ?? getClientFromVoyageHistory(historyResponse.data),
      history,
      reviews: data?.reviews ?? [],
      summary: data?.summary ?? emptySummary,
    });
  } catch {
    return mergeLocalReviews({
      client: data?.client ?? getClientFromVoyageHistory(null),
      history: data?.history ?? [],
      reviews: data?.reviews ?? [],
      summary: data?.summary ?? emptySummary,
    });
  }
};

const saveLocalReview = async (payload: { historyId?: string | number; voyageId: string | number; rating: number; text: string }) => {
  const data = await withVoyageHistoryFallback(null);
  const trip = data.history.find(
    (item) =>
      String(item.historyId) === String(payload.historyId) ||
      String(item.voyageId) === String(payload.voyageId) ||
      String(item.reservationId) === String(payload.voyageId),
  );

  if (!trip) {
    throw new Error('Selecciona un viaje de tu historial.');
  }

  const clientId = data.client.id || getClientId();
  const current = readLocalReviews();
  const nextReview: LocalReview = {
    id: `local-${clientId}-${trip.historyId}`,
    clientId,
    historyId: trip.historyId,
    reservationId: trip.reservationId,
    voyageId: trip.voyageId,
    rating: payload.rating,
    text: payload.text,
    createdAt: new Date().toISOString(),
  };
  const next = [
    ...current.filter(
      (review) =>
        !(
          review.clientId === clientId &&
          (String(review.historyId) === String(trip.historyId) ||
            String(review.reservationId) === String(trip.reservationId))
        ),
    ),
    nextReview,
  ];

  saveLocalReviews(next);

  return {
    ok: true,
    data: mergeLocalReviews(data),
  };
};

export const reviewsApi = {
  current: () =>
    request<ReviewsResponse>('/reviews/current', {
      method: 'GET',
    }).then(async (response) => ({
      ...response,
      data: await withVoyageHistoryFallback(response.data),
    })).catch(async () => ({
      ok: true,
      data: await withVoyageHistoryFallback(null),
    })),

  save: (payload: { historyId?: string | number; voyageId: string | number; rating: number; text: string }) =>
    request<ReviewsResponse>('/reviews/current', {
      method: 'POST',
      body: JSON.stringify({
        ...payload,
        historyId: payload.historyId,
        voyageId: payload.historyId ?? payload.voyageId,
        reservationId: payload.voyageId,
      }),
    }).then(async (response) => ({
      ...response,
      data: await withVoyageHistoryFallback(response.data),
    })).catch(() => saveLocalReview(payload)),
};
