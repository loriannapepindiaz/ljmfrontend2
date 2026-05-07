import axios from 'axios';
import { API_BASE_URL } from '../../../lib/api';

export type EmpleadoDashboard = {
  id: string;
  nombre: string | null;
  apellido: string | null;
  nombre_completo: string;
  email: string | null;
  telefono: string | null;
  foto_url: string | null;
  cargo: string | null;
  departamento: string | null;
  puerto: string | null;
  departamento_barco: string;
  estado: string;
  estado_label: string;
  fecha_contrato: string | null;
  rendimiento_valor: number;
  rendimiento: {
    id: string;
    periodo: string;
    puntuacion: number | null;
    asistencia_pct: number | null;
    evaluaciones_count: number;
    notas: string | null;
  } | null;
};

export type EmpleadosMetricsData = {
  total: number;
  activos: number;
  licencia: number;
  vacantes: number;
};

export type CreateEmpleadoPayload = {
  nombre_completo: string;
  telefono?: string;
  nacionalidad?: string;
  numero_identificacion?: string;
  fecha_nac?: string;
  contacto_emergencia_nombre?: string;
  cargo?: string;
  departamento?: string;
  puerto?: string;
  estado_empleado?: string;
  fecha_contrato?: string;
  turno_rotacion?: string;
  seguro_medico?: string;
};

export type EmpleadosCatalogos = {
  cargos: { id: string; nombre: string }[];
  departamentos: { id: string; nombre: string }[];
  puertos: { id: string; nombre: string }[];
};

type EmpleadosDashboardResponse = {
  ok: boolean;
  data?: {
    empleados: EmpleadoDashboard[];
    metrics: EmpleadosMetricsData;
  };
  empleados?: EmpleadoDashboard[];
  metrics?: EmpleadosMetricsData;
  message?: string;
};

const EMPTY_METRICS: EmpleadosMetricsData = {
  total: 0,
  activos: 0,
  licencia: 0,
  vacantes: 0,
};

const authHeaders = () => {
  const token = localStorage.getItem('ljm_admin_token') ?? localStorage.getItem('ljm_auth_token');
  return token ? { Authorization: `Bearer ${token}` } : undefined;
};

export const empleadosService = {
  getDashboard: async () => {
    const { data } = await axios.get<EmpleadosDashboardResponse>(`${API_BASE_URL}/empleados/dashboard`, {
      headers: authHeaders(),
    });

    if (!data.ok) {
      throw new Error(data.message ?? 'No se pudieron cargar los empleados.');
    }

    return {
      empleados: data.data?.empleados ?? data.empleados ?? [],
      metrics: data.data?.metrics ?? data.metrics ?? EMPTY_METRICS,
    };
  },

  create: async (payload: CreateEmpleadoPayload | FormData) => {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/empleados`, payload, {
        headers: authHeaders(),
      });

      if (!data.ok) {
        throw new Error(data.message ?? 'No se pudo crear el empleado.');
      }

      return data.data as EmpleadoDashboard;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        throw new Error(err.response.data.message);
      }
      throw err;
    }
  },

  update: async (id: string, payload: Partial<CreateEmpleadoPayload>) => {
    try {
      const { data } = await axios.patch(`${API_BASE_URL}/empleados/${id}`, payload, {
        headers: authHeaders(),
      });

      if (!data.ok) {
        throw new Error(data.message ?? 'No se pudo actualizar el empleado.');
      }

      return data.data as EmpleadoDashboard;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        throw new Error(err.response.data.message);
      }
      throw err;
    }
  },

  getCatalogos: async () => {
    const { data } = await axios.get<{ ok: boolean; data: EmpleadosCatalogos; message?: string }>(
      `${API_BASE_URL}/empleados/catalogos`,
      { headers: authHeaders() }
    );

    if (!data.ok) {
      throw new Error(data.message ?? 'No se pudieron cargar los catalogos.');
    }

    return data.data;
  },
};
