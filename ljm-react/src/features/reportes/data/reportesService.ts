import { API_BASE_URL } from '../../../lib/api';

export type IngresoPorMes = {
  mes: string;
  total: number;
};

export type IngresoPorServicio = {
  servicio: 'Cruceros' | 'Dining' | 'Excursiones' | 'Spa & Wellness' | string;
  total: number;
  porcentaje: number;
};

export type OcupacionPorCrucero = {
  crucero: string;
  ocupacion: number;
};

export type ReportesData = {
  ingresos_mensuales: number;
  tasa_ocupacion: number;
  satisfaccion_cliente: number;
  crecimiento_reservas: number;
  ingresos_por_mes: IngresoPorMes[];
  ingresos_por_servicio: IngresoPorServicio[];
  ocupacion_por_crucero: OcupacionPorCrucero[];
};

export type ReportesDateRange = {
  fecha_inicio: string;
  fecha_fin: string;
};

const authHeaders = () => {
  const token = localStorage.getItem('ljm_auth_token') ?? localStorage.getItem('ljm_admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const reportesService = {
  getReportes: async (range: ReportesDateRange): Promise<ReportesData> => {
    const params = new URLSearchParams(range);
    const res = await fetch(`${API_BASE_URL}/reportes?${params.toString()}`, {
      headers: authHeaders(),
    });
    const payload = await res.json().catch(() => ({}));

    if (!res.ok || !(payload as { ok?: boolean }).ok) {
      throw new Error((payload as { message?: string }).message ?? 'No se pudieron cargar los reportes.');
    }

    return ((payload as { data?: ReportesData }).data ?? payload) as ReportesData;
  },
};
