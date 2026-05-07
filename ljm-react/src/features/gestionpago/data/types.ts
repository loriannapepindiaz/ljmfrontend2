export type PagoEstado = 'Pagado' | 'Pendiente' | 'Reembolsado';

export interface AdminPago {
  id: string;
  reserva_id: string;
  reserva_codigo: string | null;
  pasajero: string;
  pasajero_email: string | null;
  ruta: string;
  viaje_nombre: string | null;
  fecha_pago: string | null;
  monto: number;
  monto_formatted: string;
  estado: PagoEstado | string;
  moneda: string;
  metodo_pago: string | null;
  referencia: string | null;
  notas: string | null;
  reserva_estado: string | null;
  reserva_monto: number | null;
}

export type PagoFilterKey = 'all' | 'paid' | 'pending' | 'refunded';

export const PAGO_FILTER_LABELS: Record<PagoFilterKey, string> = {
  all:      'Todos',
  paid:     'Pagados',
  pending:  'Pendientes',
  refunded: 'Reembolsados',
};

export const PAGO_STATUS_STYLES: Record<string, string> = {
  Pagado:      'bg-green-50 text-green-600 border border-green-200',
  Pendiente:   'bg-amber-50 text-amber-600 border border-amber-200',
  Reembolsado: 'bg-red-50 text-red-600 border border-red-200',
};

export interface CreatePagoPayload {
  id_reserva: string;
  estado?: string;
  monto?: number;
  notas?: string;
}

export interface UpdatePagoPayload {
  estado?: string;
  monto?: number;
  notas?: string;
}
