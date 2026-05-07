import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../../gestionreserva/presentation/components/AdminSidebar';
import PasajerosHeader from '../components/PasajerosHeader';
import PasajerosMetrics from '../components/PasajerosMetrics';
import PasajerosFilters from '../components/PasajerosFilters';
import PasajerosTable from '../components/PasajerosTable';
import PasajeroModal from '../components/PasajeroModal';
import { pasajeroService } from '../../data/pasajeroService';
import { LOYALTY_FILTER_MAP } from '../../data/types';
import type { AdminPasajero, LoyaltyFilterKey } from '../../data/types';

const RECENT_DAYS = 90;

const PasajerosPage: React.FC = () => {
  const navigate = useNavigate();

  const [pasajeros,  setPasajeros]  = useState<AdminPasajero[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState<string | null>(null);

  const [search,        setSearch]        = useState('');
  const [activeFilter,  setActiveFilter]  = useState<LoyaltyFilterKey>('all');

  const [selectedPasajero, setSelectedPasajero] = useState<AdminPasajero | null>(null);
  const [modalMode,        setModalMode]        = useState<'view' | 'edit'>('view');


  const load = (query?: string) => {
    setLoading(true);
    setError(null);
    pasajeroService.getPasajeros(query)
      .then(data => setPasajeros(data))
      .catch(err  => setError(err instanceof Error ? err.message : 'Error al cargar pasajeros.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => load(search || undefined), 350);
    return () => clearTimeout(timer);
  }, [search]);

  const filtered = useMemo(() => {
    const tierFilter = LOYALTY_FILTER_MAP[activeFilter];
    if (!tierFilter) return pasajeros;
    return pasajeros.filter(p => p.loyalty_tier === tierFilter);
  }, [pasajeros, activeFilter]);

  const metrics = useMemo(() => {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - RECENT_DAYS);
    return {
      total:    pasajeros.length,
      platinum: pasajeros.filter(p => p.loyalty_tier === 'Admiral').length,
      gold:     pasajeros.filter(p => p.loyalty_tier === 'Navegante').length,
      recent:   pasajeros.filter(p => p.ultimo_viaje && new Date(p.ultimo_viaje) >= cutoff).length,
    };
  }, [pasajeros]);

  const handleSaved = (updated: AdminPasajero) => {
    setPasajeros(prev => prev.map(p => p.id === updated.id ? updated : p));
  };


  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar activeItem="Pasajeros" />
        <main className="flex-1 flex flex-col overflow-hidden bg-[#f6f7f8]">
          <PasajerosHeader onAddClick={() => navigate('/anadiracompanante')} />
          <div className="no-scrollbar flex-1 overflow-y-auto p-8 space-y-8">

            <PasajerosMetrics
              total={metrics.total}
              platinum={metrics.platinum}
              gold={metrics.gold}
              recent={metrics.recent}
              loading={loading}
            />

            <PasajerosFilters
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              onSearch={setSearch}
            />

            <PasajerosTable
              pasajeros={filtered}
              loading={loading}
              error={error}
              onView={p => { setSelectedPasajero(p); setModalMode('view'); }}
              onEdit={p => { setSelectedPasajero(p); setModalMode('edit'); }}
            />
          </div>
        </main>
      </div>

      {/* View / Edit modal */}
      {selectedPasajero && (
        <PasajeroModal
          pasajero={selectedPasajero}
          mode={modalMode}
          onClose={() => setSelectedPasajero(null)}
          onSaved={handleSaved}
        />
      )}

    </>
  );
};

export default PasajerosPage;
