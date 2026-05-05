import React, { useEffect, useMemo, useState } from 'react';
import AdminSidebar from '../../../gestionreserva/presentation/components/AdminSidebar';
import CabinasHeader from '../components/CabinasHeader';
import CabinasMetrics from '../components/CabinasMetrics';
import CabinasFilters from '../components/CabinasFilters';
import CabinasTable from '../components/CabinasTable';
import { cabinaService } from '../../data/cabinaService';
import { fleetApi } from '../../../../lib/api';
import type { AdminCabina, CategoryKey } from '../../data/types';
import CabinaModal from '../components/CabinaModal';

type CruceroOption = { id: string; nombre: string };

const matchCategoria = (cabina: AdminCabina, key: CategoryKey): boolean => {
  if (key === 'all') return true;
  const nombre = cabina.categoria?.toLowerCase() ?? '';
  if (key === 'suite')   return nombre.includes('suite');
  if (key === 'balcony') return nombre.includes('balc');
  if (key === 'seaView') return nombre.includes('mar') || nombre.includes('vista') || nombre.includes('sea');
  return true;
};

const CabinasPage: React.FC = () => {
  const [cabinas, setCabinas] = useState<AdminCabina[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [cruceros, setCruceros] = useState<CruceroOption[]>([]);
  const [selectedCruceroId, setSelectedCruceroId] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState<CategoryKey>('all');
  const [selectedCabina, setSelectedCabina] = useState<AdminCabina | null>(null);

  // Load cruceros for the filter dropdown
  useEffect(() => {
    fleetApi.list().then(res => {
      setCruceros(res.data.map(v => ({ id: String(v.id), nombre: v.nombre ?? v.title ?? '' })));
    }).catch(() => {});
  }, []);

  // Load all cabinas once on mount
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    cabinaService.getCabinas()
      .then(data => { if (!cancelled) setCabinas(data); })
      .catch(err  => { if (!cancelled) setError(err instanceof Error ? err.message : 'Error al cargar cabinas.'); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, []);

  const filtered = useMemo(() => {
    return cabinas
      .filter(c => !selectedCruceroId || c.crucero_id === selectedCruceroId)
      .filter(c => matchCategoria(c, selectedCategoria));
  }, [cabinas, selectedCruceroId, selectedCategoria]);

  const metrics = useMemo(() => {
    const lower = (s: string | null) => s?.toLowerCase() ?? '';
    return {
      total:       filtered.length,
      occupied:    filtered.filter(c => lower(c.estado) === 'ocupada').length,
      available:   filtered.filter(c => lower(c.estado) === 'disponible').length,
      maintenance: filtered.filter(c => lower(c.estado) === 'mantenimiento').length,
    };
  }, [filtered]);

  const handleClear = () => {
    setSelectedCruceroId('');
    setSelectedCategoria('all');
  };

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar activeItem="Cabinas" />
        <main className="flex-1 flex flex-col overflow-hidden bg-white relative">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-[#0e1a34]/5 to-transparent pointer-events-none" />
          <CabinasHeader />
          <div className="flex-1 overflow-y-auto p-8 relative z-0">
            <CabinasMetrics
              total={metrics.total}
              occupied={metrics.occupied}
              available={metrics.available}
              maintenance={metrics.maintenance}
            />
            <CabinasFilters
              cruceros={cruceros}
              selectedCruceroId={selectedCruceroId}
              selectedCategoria={selectedCategoria}
              onCruceroChange={setSelectedCruceroId}
              onCategoriaChange={setSelectedCategoria}
              onClear={handleClear}
            />
            <CabinasTable
              cabinas={filtered}
              loading={loading}
              error={error}
              onView={setSelectedCabina}
            />
          </div>
        </main>
      </div>

      {selectedCabina && (
        <CabinaModal cabina={selectedCabina} onClose={() => setSelectedCabina(null)} />
      )}
    </>
  );
};

export default CabinasPage;
