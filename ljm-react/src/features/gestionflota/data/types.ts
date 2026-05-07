export interface AdminCruise {
  id: string;
  nombre: string;
  badge: string;
  guests: number | null;
  imageSrc: string | null;
  eslora: string | null;
  decks: number | null;
  activo: boolean;
  ambiente: string | null;
  descripcion: string | null;
}

export type TabKey = 'allShips' | 'active' | 'maintenance' | 'upcoming';
