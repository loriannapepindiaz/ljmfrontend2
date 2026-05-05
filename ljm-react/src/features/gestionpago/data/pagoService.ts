import { API_BASE_URL } from '../../../lib/api';
import type { AdminPago, CreatePagoPayload, UpdatePagoPayload } from './types';

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

export const pagoService = {
  getPagos: async (search?: string, estado?: string, last30?: boolean): Promise<AdminPago[]> => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (estado && estado !== 'all') params.set('estado', estado);
    if (last30) params.set('last30', 'true');
    const res = await fetch(`${API_BASE_URL}/pagos?${params.toString()}`, {
      headers: authHeaders(),
    });
    return handleResponse<AdminPago[]>(res);
  },

  createPago: async (data: CreatePagoPayload): Promise<AdminPago> => {
    const res = await fetch(`${API_BASE_URL}/pagos`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse<AdminPago>(res);
  },

  updatePago: async (id: string, data: UpdatePagoPayload): Promise<AdminPago> => {
    const res = await fetch(`${API_BASE_URL}/pagos/${id}`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse<AdminPago>(res);
  },

  deletePago: async (id: string): Promise<void> => {
    const res = await fetch(`${API_BASE_URL}/pagos/${id}/inactivar`, {
      method: 'PATCH',
      headers: authHeaders(),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !(data as { ok?: boolean }).ok) {
      throw new Error((data as { message?: string }).message ?? 'Error al eliminar.');
    }
  },
};
