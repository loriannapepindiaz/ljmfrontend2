export interface AdminCabina {
  id: string;
  numero_cabina: string | null;
  categoria: string | null;
  estado: string | null;
  crucero_id: string | null;
  crucero_nombre: string | null;
  cubierta_numero: number | null;
}

export type CategoryKey = 'all' | 'suite' | 'balcony' | 'seaView';
