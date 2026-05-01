export type ReservationStatus = 'Confirmado' | 'Pendente' | 'Pago';

export interface Reservation {
  id: string;
  guest: string;
  ship: string;
  cabin: string;
  status: ReservationStatus;
  total: string;
}

export const statusStyles: Record<ReservationStatus, string> = {
  Confirmado: 'bg-green-50 text-green-600 border border-green-200',
  Pendente:   'bg-amber-50 text-amber-600 border border-amber-200',
  Pago:       'bg-blue-50 text-blue-600 border border-blue-200',
};