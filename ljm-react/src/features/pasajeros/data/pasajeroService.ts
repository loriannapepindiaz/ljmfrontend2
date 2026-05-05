import { API_BASE_URL } from '../../../lib/api';
import type { AdminPasajero } from './types';

type PasajerosResponse = { ok: boolean; data: AdminPasajero[]; total: number };
type PasajeroResponse  = { ok: boolean; data: AdminPasajero };

const authHeaders = () => {
  const token = localStorage.getItem('ljm_auth_token') ?? localStorage.getItem('ljm_admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const handleResponse = async <T>(res: Response): Promise<T> => {
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !(data as { ok?: boolean }).ok) {
    throw new Error((data as { message?: string }).message ?? 'Error en la solicitud.');
  }
  return (data as { data: T }).data;
};

export const pasajeroService = {
  getPasajeros: async (search?: string): Promise<AdminPasajero[]> => {
    const qs = search ? `?search=${encodeURIComponent(search)}` : '';
    const res = await fetch(`${API_BASE_URL}/pasajeros${qs}`, { headers: authHeaders() });
    return handleResponse<AdminPasajero[]>(res);
  },

  updatePasajero: async (
    id: string,
    data: { nombre?: string; apellido?: string; loyalty_tier?: string }
  ): Promise<AdminPasajero> => {
    const res = await fetch(`${API_BASE_URL}/pasajeros/${id}`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse<AdminPasajero>(res);
  },

  deletePasajero: async (id: string): Promise<void> => {
    const res = await fetch(`${API_BASE_URL}/pasajeros/${id}/inactivar`, {
      method: 'PATCH',
      headers: authHeaders(),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !(data as { ok?: boolean }).ok) {
      throw new Error((data as { message?: string }).message ?? 'Error al desactivar.');
    }
  },
};
