import { API_BASE_URL } from '../../../lib/api';
import type {
  AdminReserva,
  CabinaItem,
  CreateReservaPayload,
  PasajeroItem,
  UpdateReservaPayload,
  ViajeItem,
} from './types';

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

export const reservaService = {
  getReservas: async (search?: string, estado?: string): Promise<AdminReserva[]> => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (estado && estado !== 'all') params.set('estado', estado);
    const res = await fetch(`${API_BASE_URL}/reservas?${params.toString()}`, {
      headers: authHeaders(),
    });
    return handleResponse<AdminReserva[]>(res);
  },

  createReserva: async (data: CreateReservaPayload): Promise<AdminReserva> => {
    const res = await fetch(`${API_BASE_URL}/reservas`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse<AdminReserva>(res);
  },

  updateReserva: async (id: string, data: UpdateReservaPayload): Promise<AdminReserva> => {
    const res = await fetch(`${API_BASE_URL}/reservas/${id}`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse<AdminReserva>(res);
  },

  cancelarReserva: async (id: string): Promise<void> => {
    const res = await fetch(`${API_BASE_URL}/reservas/${id}/cancelar`, {
      method: 'PATCH',
      headers: authHeaders(),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !(data as { ok?: boolean }).ok) {
      throw new Error((data as { message?: string }).message ?? 'Error al cancelar reserva.');
    }
  },

  getViajesCatalogo: async (): Promise<ViajeItem[]> => {
    const res = await fetch(`${API_BASE_URL}/reservas/catalogo/viajes`, {
      headers: authHeaders(),
    });
    return handleResponse<ViajeItem[]>(res);
  },

  getPasajerosCatalogo: async (): Promise<PasajeroItem[]> => {
    const res = await fetch(`${API_BASE_URL}/pasajeros`, { headers: authHeaders() });
    return handleResponse<PasajeroItem[]>(res);
  },

  getCabinasCatalogo: async (crucero_id?: string): Promise<CabinaItem[]> => {
    const params = new URLSearchParams();
    if (crucero_id) params.set('id_crucero', crucero_id);
    const res = await fetch(`${API_BASE_URL}/cabinas/habitaciones?${params.toString()}`, {
      headers: authHeaders(),
    });
    return handleResponse<CabinaItem[]>(res);
  },
};
