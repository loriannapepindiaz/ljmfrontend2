import { API_BASE_URL } from '../../../lib/api';
import type { AsignacionCabina, TipoHabitacion, HabitacionMetrics } from './types';

const authHeaders = () => {
  const token = localStorage.getItem('ljm_auth_token') ?? localStorage.getItem('ljm_admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const fetchJson = async <T>(url: string): Promise<T> => {
  const res = await fetch(url, { headers: authHeaders() });
  const json = await res.json().catch(() => ({})) as { ok?: boolean; data?: T; message?: string };
  if (!res.ok || !json.ok) throw new Error(json.message ?? 'Error en la solicitud.');
  return json.data as T;
};

export const habitacionService = {
  getAsignaciones: () => fetchJson<AsignacionCabina[]>(`${API_BASE_URL}/cabinas/asignaciones`),
  getMetricas:     () => fetchJson<HabitacionMetrics>(`${API_BASE_URL}/cabinas/metricas`),
  getTipos:        () => fetchJson<TipoHabitacion[]>(`${API_BASE_URL}/cabinas/tipos`),
};
