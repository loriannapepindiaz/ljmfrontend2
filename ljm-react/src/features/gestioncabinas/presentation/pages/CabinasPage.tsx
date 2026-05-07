import React, { useEffect, useMemo, useState } from 'react';
import AdminSidebar from '../../../gestionreserva/presentation/components/AdminSidebar';
import CabinasHeader from '../components/CabinasHeader';
import CabinasMetrics from '../components/CabinasMetrics';
import CabinasFilters from '../components/CabinasFilters';
import CabinasTable from '../components/CabinasTable';
import CabinaModal from '../components/CabinaModal';
import { habitacionService } from '../../data/habitacionService';
import type { AsignacionCabina, TipoHabitacion, HabitacionMetrics } from '../../data/types';

const CabinasPage: React.FC = () => {
  const [asignaciones, setAsignaciones] = useState<AsignacionCabina[]>([]);
  const [tipos, setTipos]               = useState<TipoHabitacion[]>([]);
  const [metrics, setMetrics]           = useState<HabitacionMetrics | null>(null);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState<string | null>(null);
  const [selectedTipoId, setSelectedTipoId]     = useState('');
  const [selectedEstado, setSelectedEstado]     = useState('');
  const [selected, setSelected]                 = useState<AsignacionCabina | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    Promise.all([
      habitacionService.getAsignaciones(),
      habitacionService.getTipos(),
      habitacionService.getMetricas(),
    ])
      .then(([asig, tip, met]) => {
        if (cancelled) return;
        setAsignaciones(asig);
        setTipos(tip);
        setMetrics(met);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Error al cargar datos.');
      })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, []);

  const filtered = useMemo(() => {
    return asignaciones.filter((a) => {
      if (selectedTipoId && a.id_tipo_habitacion !== selectedTipoId) return false;
      if (selectedEstado && a.estado_ocupacion !== selectedEstado) return false;
      return true;
    });
  }, [asignaciones, selectedTipoId, selectedEstado]);

  const displayMetrics = metrics ?? {
    total:        asignaciones.length,
    ocupadas:     asignaciones.filter(a => a.estado_ocupacion === 'Ocupada').length,
    disponibles:  asignaciones.filter(a => a.estado_ocupacion === 'Disponible').length,
    mantenimiento: 0,
  };

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar activeItem="Habitaciones" />
        <main className="flex-1 flex flex-col overflow-hidden bg-white relative">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-[#0e1a34]/5 to-transparent pointer-events-none" />
          <CabinasHeader />
          <div className="no-scrollbar flex-1 overflow-y-auto p-8 relative z-0">
            <CabinasMetrics
              total={displayMetrics.total}
              occupied={displayMetrics.ocupadas}
              available={displayMetrics.disponibles}
              maintenance={displayMetrics.mantenimiento}
              loading={loading}
            />
            <CabinasFilters
              tipos={tipos}
              selectedTipoId={selectedTipoId}
              selectedEstado={selectedEstado}
              onTipoChange={setSelectedTipoId}
              onEstadoChange={setSelectedEstado}
              onClear={() => { setSelectedTipoId(''); setSelectedEstado(''); }}
            />
            <CabinasTable
              asignaciones={filtered}
              loading={loading}
              error={error}
              onView={setSelected}
            />
          </div>
        </main>
      </div>

      {selected && (
        <CabinaModal asignacion={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
};

export default CabinasPage;
