import { API_BASE_URL } from '../../../lib/api';

const authHeaders = () => {
  const token = localStorage.getItem('ljm_auth_token') ?? localStorage.getItem('ljm_admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const fetchJson = async <T>(url: string): Promise<T> => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12_000);
  try {
    const res = await fetch(url, { headers: authHeaders(), signal: controller.signal });
    const json = await res.json().catch(() => ({})) as { ok?: boolean; data?: T; message?: string } & Record<string, unknown>;
    if (!res.ok) throw new Error(json.message ?? 'Error en la solicitud.');
    return (json.data ?? json) as T;
  } finally {
    clearTimeout(timer);
  }
};

// null = still loading for that specific metric
export type DashboardMetrics = {
  totalReservas:   number | null;
  ingresos:        number | null;
  cruceroActivos:  number | null;
  nuevosPasajeros: number | null;
  trends: {
    totalReservas:   number | null;
    ingresos:        number | null;
    cruceroActivos:  number | null;
    nuevosPasajeros: number | null;
  };
};

export const EMPTY_METRICS: DashboardMetrics = {
  totalReservas:   null,
  ingresos:        null,
  cruceroActivos:  null,
  nuevosPasajeros: null,
  trends: { totalReservas: null, ingresos: null, cruceroActivos: null, nuevosPasajeros: null },
};

export type ProximaSalida = {
  id: string;
  nombre: string;
  fecha_salida: string | null;
  fecha_llegada: string | null;
  duracion_dias: number | null;
  crucero: string | null;
};

export type ActivityRow = {
  id: string;
  guest: string;
  ship: string;
  status: string;
  total: string;
  monto_total: number;
  fecha_reserva: string | null;
};

type RawReserva = {
  id: string;
  guest: string;
  ship: string;
  status: string;
  total: string;
  monto_total: number;
  fecha_reserva: string | null;
};

type RawPago = {
  monto: number;
  estado: string;
  fecha_pago: string | null;
};

type RawPasajero = {
  activo: boolean;
  ultimo_viaje: string | null;
};

const pct = (curr: number, prev: number) =>
  prev === 0 ? (curr > 0 ? 100 : 0) : Math.round(((curr - prev) / prev) * 100);

const monthEdges = (offset: number) => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() + offset,     1).getTime();
  const end   = new Date(now.getFullYear(), now.getMonth() + offset + 1, 1).getTime() - 1;
  return { start, end };
};

const inRange = (dateStr: string | null, r: { start: number; end: number }) => {
  if (!dateStr) return false;
  const t = new Date(dateStr).getTime();
  return t >= r.start && t <= r.end;
};

export const dashboardService = {
  // Total reservations + MoM trend
  fetchReservasStats: async () => {
    const reservas = await fetchJson<RawReserva[]>(`${API_BASE_URL}/reservas`);
    const thisM = monthEdges(0);
    const lastM = monthEdges(-1);
    const thisCount = reservas.filter(r => inRange(r.fecha_reserva, thisM)).length;
    const prevCount = reservas.filter(r => inRange(r.fecha_reserva, lastM)).length;
    return { totalReservas: reservas.length, trend: pct(thisCount, prevCount) };
  },

  // Total paid income (same source as Pagos page) + MoM trend
  fetchIngresosTotal: async () => {
    const pagos = await fetchJson<RawPago[]>(`${API_BASE_URL}/pagos`);
    const paid   = pagos.filter(p => p.estado === 'Pagado');
    const thisM  = monthEdges(0);
    const lastM  = monthEdges(-1);
    const thisTotal = paid.filter(p => inRange(p.fecha_pago, thisM)).reduce((s, p) => s + Number(p.monto), 0);
    const prevTotal = paid.filter(p => inRange(p.fecha_pago, lastM)).reduce((s, p) => s + Number(p.monto), 0);
    const ingresos  = paid.reduce((s, p) => s + Number(p.monto), 0);
    return { ingresos, trend: pct(thisTotal, prevTotal) };
  },

  // Active cruise count (no meaningful MoM trend)
  fetchCrucerosCount: async () => {
    const cruceros = await fetchJson<unknown[]>(`${API_BASE_URL}/cruceros`);
    return { cruceroActivos: cruceros.length };
  },

  // New passengers (active, last 30 days) + MoM trend
  fetchNuevosPasajeros: async () => {
    const pasajeros = await fetchJson<RawPasajero[]>(`${API_BASE_URL}/pasajeros`);
    const THIRTY = 30 * 24 * 60 * 60 * 1000;
    const now    = Date.now();
    const lastM  = monthEdges(-1);
    const curr = pasajeros.filter(p => p.activo && p.ultimo_viaje && new Date(p.ultimo_viaje).getTime() >= now - THIRTY).length;
    const prev = pasajeros.filter(p => p.activo && p.ultimo_viaje && inRange(p.ultimo_viaje, lastM)).length;
    return { nuevosPasajeros: curr, trend: pct(curr, prev) };
  },

  fetchProximasSalidas: async (): Promise<ProximaSalida[]> => {
    return fetchJson<ProximaSalida[]>(`${API_BASE_URL}/reservas/viajes/proximas`);
  },

  getRecentActivity: async (): Promise<ActivityRow[]> => {
    const reservas = await fetchJson<RawReserva[]>(`${API_BASE_URL}/reservas`);
    return [...reservas]
      .sort((a, b) => {
        const ta = a.fecha_reserva ? new Date(a.fecha_reserva).getTime() : 0;
        const tb = b.fecha_reserva ? new Date(b.fecha_reserva).getTime() : 0;
        return tb - ta;
      })
      .slice(0, 10)
      .map(r => ({
        id: r.id, guest: r.guest, ship: r.ship, status: r.status,
        total: r.total, monto_total: r.monto_total, fecha_reserva: r.fecha_reserva,
      }));
  },
};
