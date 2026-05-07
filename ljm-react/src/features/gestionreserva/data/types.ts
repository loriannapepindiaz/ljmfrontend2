export type ReservationStatus = 'Confirmado' | 'Pendiente' | 'Pagado';

export interface AdminReserva {
  id: string;
  codigo: string | null;
  pasajero_id: string | null;
  viaje_id: string | null;
  guest: string;
  guest_email: string | null;
  ship: string;
  viaje_nombre: string | null;
  crucero_id: string | null;
  cabin: string;
  habitacion_id: string | null;
  status: ReservationStatus;
  total: string;
  monto_total: number;
  fecha_reserva: string | null;
  observaciones: string | null;
  moneda: string;
}

export type ReservaFilterKey = 'all' | 'confirmed' | 'pending' | 'paid';

export const FILTER_LABELS: Record<ReservaFilterKey, string> = {
  all:       'Todos',
  confirmed: 'Confirmado',
  pending:   'Pendiente',
  paid:      'Pagado',
};

export const STATUS_STYLES: Record<ReservationStatus, string> = {
  Confirmado: 'bg-green-50 text-green-600 border border-green-200',
  Pendiente:  'bg-amber-50 text-amber-600 border border-amber-200',
  Pagado:     'bg-blue-50 text-blue-600 border border-blue-200',
};

export interface ViajeItem {
  id: string;
  nombre: string;
  fecha_salida: string | null;
  crucero_id: string | null;
  crucero_nombre: string | null;
}

export interface HabitacionItem {
  id: string;
  numero_cabina: string | null;
  categoria: string | null;
  estado: string | null;
  crucero_id: string | null;
  crucero_nombre: string | null;
}

export interface PasajeroItem {
  id: string;
  nombre: string | null;
  apellido: string | null;
  email: string | null;
}

export interface CreateReservaPayload {
  id_cliente: string;
  id_viaje: string;
  id_habitacion?: string;
  estado_reserva?: string;
  monto_total?: number;
  observaciones?: string;
}

export interface UpdateReservaPayload {
  estado_reserva?: string;
  id_habitacion?: string;
  monto_total?: number;
  observaciones?: string;
}
