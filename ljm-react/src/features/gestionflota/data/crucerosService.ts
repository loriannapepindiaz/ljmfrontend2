import { fleetApi } from '../../../lib/api';
import type { AdminCruise, TabKey } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toAdminCruise = (v: any): AdminCruise => ({
  id: String(v.id),
  nombre: v.nombre ?? v.title ?? '',
  badge: v.badge ?? 'Activo',
  guests: v.guests ?? v.specs?.guests ?? null,
  imageSrc: v.imageSrc ?? null,
  eslora: v.specs?.length ?? null,
  decks: v.specs?.decks ?? null,
  activo: v.raw?.activo ?? true,
  ambiente: v.raw?.ambiente ?? null,
  descripcion: v.description ?? null,
});

export const crucerosService = {
  getAll: async (): Promise<AdminCruise[]> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await fleetApi.list() as any;
    return (res.data as unknown[]).map(toAdminCruise);
  },

  update: async (
    id: string,
    data: { nombre?: string; capacidad_max_pasajeros?: number; activo?: boolean }
  ): Promise<AdminCruise> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res = await fleetApi.update(id, data) as any;
    return toAdminCruise(res.data);
  },

  softDelete: async (id: string): Promise<void> => {
    await fleetApi.softDelete(id);
  },
};

// El backend solo devuelve cruceros con activo=true.
// Los filtros active/maintenance/upcoming son aproximaciones client-side.
export const filterByTab = (cruises: AdminCruise[], tab: TabKey): AdminCruise[] => {
  switch (tab) {
    case 'active':
      return cruises.filter(c => c.activo);
    case 'maintenance':
      return cruises.filter(c =>
        c.ambiente?.toLowerCase().includes('mantenimiento') || !c.activo
      );
    case 'upcoming':
      return cruises.filter(c => !c.activo);
    default:
      return cruises;
  }
};
