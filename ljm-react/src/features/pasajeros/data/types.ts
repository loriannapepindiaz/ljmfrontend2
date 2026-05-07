export interface AdminPasajero {
  id: string;
  nombre: string | null;
  apellido: string | null;
  email: string | null;
  member_code: string | null;
  documento_id: string | null;
  documento_tipo: string | null;
  loyalty_tier: string;
  loyalty_tier_raw: string;
  ultimo_viaje: string | null;
  activo: boolean;
}

export type LoyaltyFilterKey = 'all' | 'elite' | 'gold' | 'silver' | 'diamond';

export const LOYALTY_FILTER_MAP: Record<LoyaltyFilterKey, string | null> = {
  all:     null,
  elite:   'Admiral',
  gold:    'Navegante',
  silver:  'Explorer',
  diamond: 'Commodore',
};
