import React, { useEffect, useMemo, useState } from 'react';
import AdminSidebar from '../../../gestionreserva/presentation/components/AdminSidebar';
import PagosHeader from '../components/PagosHeader';
import PagosMetrics from '../components/PagosMetrics';
import PagosTable from '../components/PagosTable';
import PagoModal from '../components/PagoModal';
import CreatePagoModal from '../components/CreatePagoModal';
import { pagoService } from '../../data/pagoService';
import type { AdminPago, PagoFilterKey } from '../../data/types';

const PagosPage: React.FC = () => {
  const [pagos,       setPagos]       = useState<AdminPago[]>([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState<string | null>(null);
  const [search,      setSearch]      = useState('');
  const [filterKey,   setFilterKey]   = useState<PagoFilterKey>('all');
  const [last30,      setLast30]      = useState(false);
  const [showCreate,  setShowCreate]  = useState(false);
  const [selectedPago, setSelectedPago] = useState<AdminPago | null>(null);
  const [modalMode,   setModalMode]   = useState<'view' | 'edit'>('view');

  const load = () => {
    setLoading(true);
    setError(null);
    pagoService
      .getPagos()
      .then(setPagos)
      .catch((err) => setError(err instanceof Error ? err.message : 'Error al cargar pagos.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  // Client-side filtering
  const filtered = useMemo(() => {
    let result = pagos;

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.pasajero.toLowerCase().includes(q) ||
          p.ruta.toLowerCase().includes(q) ||
          (p.referencia ?? '').toLowerCase().includes(q) ||
          (p.reserva_codigo ?? '').toLowerCase().includes(q)
      );
    }

    if (filterKey !== 'all') {
      const map: Record<PagoFilterKey, string> = {
        all:      '',
        paid:     'Pagado',
        pending:  'Pendiente',
        refunded: 'Reembolsado',
      };
      result = result.filter((p) => p.estado === map[filterKey]);
    }

    if (last30) {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - 30);
      result = result.filter(
        (p) => p.fecha_pago && new Date(p.fecha_pago) >= cutoff
      );
    }

    return result;
  }, [pagos, search, filterKey, last30]);

  // Metrics from full unfiltered list
  const metrics = useMemo(() => {
    const now = new Date();
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd   = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);

    const totalIncome = pagos
      .filter((p) => p.estado === 'Pagado')
      .reduce((s, p) => s + Number(p.monto), 0);

    const pendingAmount = pagos
      .filter((p) => p.estado === 'Pendiente')
      .reduce((s, p) => s + Number(p.monto), 0);

    const refundsAmount = pagos
      .filter((p) => p.estado === 'Reembolsado')
      .reduce((s, p) => s + Number(p.monto), 0);

    const thisMonthIncome = pagos
      .filter((p) => p.estado === 'Pagado' && p.fecha_pago && new Date(p.fecha_pago) >= thisMonthStart)
      .reduce((s, p) => s + Number(p.monto), 0);

    const lastMonthIncome = pagos
      .filter(
        (p) =>
          p.estado === 'Pagado' &&
          p.fecha_pago &&
          new Date(p.fecha_pago) >= lastMonthStart &&
          new Date(p.fecha_pago) <= lastMonthEnd
      )
      .reduce((s, p) => s + Number(p.monto), 0);

    const monthlyGrowth =
      lastMonthIncome === 0
        ? thisMonthIncome > 0 ? 100 : 0
        : ((thisMonthIncome - lastMonthIncome) / lastMonthIncome) * 100;

    return { totalIncome, pendingAmount, refundsAmount, monthlyGrowth };
  }, [pagos]);

  const handleSaved = (updated: AdminPago) => {
    setPagos((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const handleCreated = (created: AdminPago) => {
    setPagos((prev) => [created, ...prev]);
  };

  const handleDelete = async (p: AdminPago) => {
    if (!window.confirm(`¿Eliminar el pago ${p.referencia ?? p.id}? Esta acción no se puede deshacer.`)) return;
    try {
      await pagoService.deletePago(p.id);
      setPagos((prev) => prev.filter((x) => x.id !== p.id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al eliminar.');
    }
  };

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar />
        <main className="no-scrollbar flex-1 overflow-y-auto bg-[#f6f7f8]">
          <div className="p-8">
            <PagosHeader onAddClick={() => setShowCreate(true)} />
            <PagosMetrics
              totalIncome={metrics.totalIncome}
              pendingAmount={metrics.pendingAmount}
              refundsAmount={metrics.refundsAmount}
              monthlyGrowth={metrics.monthlyGrowth}
              loading={loading}
            />
            <PagosTable
              pagos={filtered}
              loading={loading}
              error={error}
              search={search}
              activeFilter={filterKey}
              last30={last30}
              onSearch={setSearch}
              onFilterChange={setFilterKey}
              onLast30Change={setLast30}
              onView={(p) => { setSelectedPago(p); setModalMode('view'); }}
              onEdit={(p) => { setSelectedPago(p); setModalMode('edit'); }}
              onDelete={handleDelete}
            />
          </div>
        </main>
      </div>

      {selectedPago && (
        <PagoModal
          pago={selectedPago}
          mode={modalMode}
          onClose={() => setSelectedPago(null)}
          onSaved={handleSaved}
        />
      )}

      {showCreate && (
        <CreatePagoModal
          onClose={() => setShowCreate(false)}
          onCreated={handleCreated}
        />
      )}
    </>
  );
};

export default PagosPage;
