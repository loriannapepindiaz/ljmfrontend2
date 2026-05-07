export interface AsignacionCabina {
  id_reserva: string | null;
  id_habitacion: number;
  numero_cabina: string | null;
  tipo_habitacion: string | null;
  id_tipo_habitacion: string | null;
  cubierta: number | null;
  crucero: string | null;
  codigo_reserva: string | null;
  estado_reserva: string | null;
  huesped: string | null;
  email: string | null;
  fecha_entrada: string | null;
  fecha_salida: string | null;
  precio_final: number | null;
  estado_ocupacion: 'Ocupada' | 'Disponible';
  estado_fisico: string | null;
}

export interface TipoHabitacion {
  id: string;
  nombre: string;
  total: number;
}

export interface HabitacionMetrics {
  total: number;
  ocupadas: number;
  disponibles: number;
  mantenimiento: number;
}

// kept for getCabinTypes (public booking flow)
export interface AdminHabitacion {
  id: string;
  numero_cabina: string | null;
  categoria: string | null;
  tipo_id: string | null;
  estado: string | null;
  crucero_id: string | null;
  crucero_nombre: string | null;
  cubierta_numero: number | null;
  precio_noche: number | null;
  capacidad_max: number | null;
  tamano_m2: number | null;
}
