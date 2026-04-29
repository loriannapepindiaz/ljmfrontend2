const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';

export type AuthUser = {
  id: number;
  username: string | null;
  email: string | null;
  estadoCuenta: string;
  esCliente: boolean;
  idCliente: number | null;
  rol: string | null;
  cliente: {
    id: number;
    nombre: string | null;
    apellido: string | null;
    email: string | null;
    memberCode: string | null;
    loyaltyTier: string;
  } | null;
};

type AuthResponse = {
  ok: boolean;
  message: string;
  token: string;
  user: AuthUser;
};

type MeResponse = {
  ok: boolean;
  user: AuthUser;
};

type ApiErrorResponse = {
  ok: false;
  message?: string;
};

const request = async <T>(path: string, options: RequestInit): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  const data = (await response.json().catch(() => ({}))) as T | ApiErrorResponse;

  if (!response.ok) {
    throw new Error('message' in data && data.message ? data.message : 'No se pudo completar la solicitud.');
  }

  return data as T;
};

export const authApi = {
  login: (payload: { username: string; password: string }) =>
    request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  register: (payload: { fullName: string; email: string; password: string; confirmPassword: string }) =>
    request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  me: (token: string) =>
    request<MeResponse>('/auth/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export const persistAuthSession = ({ token, user }: AuthResponse) => {
  localStorage.setItem('ljm_auth_token', token);
  localStorage.setItem('ljm_auth_user', JSON.stringify(user));
};
