import { API_BASE_URL } from '../../../lib/api';
import type { AdminCabina } from './types';

type HabitacionesResponse = { ok: boolean; data: AdminCabina[]; total: number };

const fetchHabitaciones = async (params?: {
  id_crucero?: string;
  categoria?: string;
  estado?: string;
}): Promise<AdminCabina[]> => {
  const qs = new URLSearchParams();
  if (params?.id_crucero) qs.set('id_crucero', params.id_crucero);
  if (params?.categoria)  qs.set('categoria', params.categoria);
  if (params?.estado)     qs.set('estado', params.estado);

  const url = `${API_BASE_URL}/cabinas/habitaciones${qs.toString() ? `?${qs}` : ''}`;
  const token = localStorage.getItem('ljm_auth_token') ?? localStorage.getItem('ljm_admin_token');

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  const data = (await res.json().catch(() => ({}))) as HabitacionesResponse;

  if (!res.ok || !data.ok) {
    throw new Error(
      'message' in data && (data as Record<string, unknown>).message
        ? String((data as Record<string, unknown>).message)
        : 'Error al cargar las cabinas.'
    );
  }

  return data.data;
};

export const cabinaService = {
  getCabinas: () => fetchHabitaciones(),

  getCabinasPorCrucero: (id: string | number) =>
    fetchHabitaciones({ id_crucero: String(id) }),
};
