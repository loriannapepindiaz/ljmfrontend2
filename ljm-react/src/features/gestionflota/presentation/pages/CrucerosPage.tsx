import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../../gestionreserva/presentation/components/AdminSidebar';
import CrucerosHeader from '../components/CrucerosHeader';
import CrucerosTabs from '../components/CrucerosTabs';
import FeaturedShipsGrid from '../components/FeaturedShipsGrid';
import FleetTable from '../components/FleetTable';
import CrucerosModal from '../components/CrucerosModal';
import { crucerosService, filterByTab } from '../../data/crucerosService';
import type { AdminCruise, TabKey } from '../../data/types';

const CrucerosPage: React.FC = () => {
  const navigate = useNavigate();

  const [cruises, setCruises] = useState<AdminCruise[]>([]);
  const [activeTab, setActiveTab] = useState<TabKey>('allShips');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal state
  const [selectedCruise, setSelectedCruise] = useState<AdminCruise | null>(null);
  const [modalMode, setModalMode] = useState<'view' | 'edit'>('view');

  // Soft-delete state
  const [pendingDelete, setPendingDelete] = useState<AdminCruise | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    crucerosService.getAll()
      .then(data  => { if (!cancelled) setCruises(data); })
      .catch(err  => { if (!cancelled) setError(err instanceof Error ? err.message : 'Error al cargar cruceros.'); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, []);

  // After a successful edit: update the cruise in the list in-place
  const handleSaved = (updated: AdminCruise) => {
    setCruises(prev => prev.map(c => c.id === updated.id ? updated : c));
  };

  // Soft-delete confirmed
  const handleDeleteConfirm = async () => {
    if (!pendingDelete) return;
    const id = pendingDelete.id;

    setDeletingId(id);
    setDeleteError(null);
    setPendingDelete(null);

    try {
      await crucerosService.softDelete(id);
      // Remove from list (backend returns activo=true only, so it won't appear on next fetch)
      setCruises(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : 'Error al desactivar el crucero.');
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = filterByTab(cruises, activeTab);

  const counts = {
    allShips:    cruises.length,
    active:      cruises.filter(c => c.activo).length,
    maintenance: cruises.filter(c => !c.activo || c.ambiente?.toLowerCase().includes('mantenimiento')).length,
    upcoming:    0,
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar activeItem="Cruceros" />
      <main className="flex-1 overflow-y-auto bg-white">
        <CrucerosHeader onAddClick={() => navigate('/admin/cruceros/agregar')} />
        <div className="p-8">
          <CrucerosTabs activeTab={activeTab} onTabChange={setActiveTab} counts={counts} />

          {deleteError && (
            <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600 font-medium">
              {deleteError}
            </div>
          )}

          <FeaturedShipsGrid cruises={filtered} loading={loading} />
          <FleetTable
            cruises={filtered}
            loading={loading}
            error={error}
            onView={cruise  => { setSelectedCruise(cruise); setModalMode('view'); }}
            onEdit={cruise  => { setSelectedCruise(cruise); setModalMode('edit'); }}
            onDelete={cruise => setPendingDelete(cruise)}
            deletingId={deletingId}
          />
        </div>
      </main>

      {/* View / Edit modal */}
      {selectedCruise && (
        <CrucerosModal
          cruise={selectedCruise}
          mode={modalMode}
          onClose={() => setSelectedCruise(null)}
          onSaved={handleSaved}
        />
      )}

      {/* Delete confirmation dialog */}
      {pendingDelete && (
        <>
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" onClick={() => setPendingDelete(null)} />
          <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-red-500">warning</span>
              </div>
              <div>
                <p className="text-sm font-bold text-[#0e1a34]">¿Desactivar este crucero?</p>
                <p className="text-xs text-slate-500 mt-0.5">Esta acción cambia el estado a Inactivo.</p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg px-4 py-3 mb-5">
              <p className="text-sm font-bold text-[#0e1a34]">{pendingDelete.nombre}</p>
              <p className="text-xs text-slate-400">{pendingDelete.badge}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setPendingDelete(null)}
                className="flex-1 py-2.5 rounded-lg border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-colors"
              >
                Sí, desactivar
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CrucerosPage;
