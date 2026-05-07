import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import MetricsGrid from '../components/MetricsGrid';
import ReservationFilters from '../components/ReservationFilters';
import ReservationTable from '../components/ReservationTable';
import ReservationModal from '../components/ReservationModal';
import CreateReservationModal from '../components/CreateReservationModal';
import { reservaService } from '../../data/reservaService';
import type { AdminReserva, ReservaFilterKey } from '../../data/types';

const ReservationManagementPage: React.FC = () => {
  const { t } = useTranslation();

  const [reservas,  setReservas]  = useState<AdminReserva[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState<string | null>(null);
  const [search,    setSearch]    = useState('');
  const [filterKey, setFilterKey] = useState<ReservaFilterKey>('all');

  const [selectedReserva, setSelectedReserva] = useState<AdminReserva | null>(null);
  const [modalMode,       setModalMode]       = useState<'view' | 'edit'>('view');
  const [showCreate,      setShowCreate]      = useState(false);
  const [deletingId,      setDeletingId]      = useState<string | null>(null);

  const load = (searchQuery?: string) => {
    setLoading(true);
    setError(null);
    reservaService
      .getReservas(searchQuery)
      .then(setReservas)
      .catch((err) => setError(err instanceof Error ? err.message : 'Error al cargar reservas.'))
      .finally(() => setLoading(false));
  };

  const isFirstRender = useRef(true);

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    const timer = setTimeout(() => load(search || undefined), 350);
    return () => clearTimeout(timer);
  }, [search]);

  const filtered = useMemo(() => {
    if (filterKey === 'all') return reservas;
    const map: Record<ReservaFilterKey, string> = {
      all:       '',
      confirmed: 'Confirmado',
      pending:   'Pendiente',
      paid:      'Pagado',
    };
    return reservas.filter((r) => r.status === map[filterKey]);
  }, [reservas, filterKey]);

  const metrics = useMemo(() => {
    const total      = reservas.length;
    const confirmed  = reservas.filter((r) => r.status === 'Confirmado').length;
    const pending    = reservas.filter((r) => r.status === 'Pendiente').length;
    const income     = reservas
      .filter((r) => r.status === 'Confirmado' || r.status === 'Pagado')
      .reduce((sum, r) => sum + Number(r.monto_total), 0);
    return { total, confirmed, pending, income };
  }, [reservas]);

  const handleSaved = (updated: AdminReserva) => {
    setReservas((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
  };

  const handleCreated = (created: AdminReserva) => {
    setReservas((prev) => [created, ...prev]);
  };

  const handleDelete = async (r: AdminReserva) => {
    if (!window.confirm(`¿Cancelar la reserva ${r.codigo ?? r.id}? Esta acción no se puede deshacer.`)) return;
    setDeletingId(r.id);
    try {
      await reservaService.cancelarReserva(r.id);
      setReservas((prev) => prev.filter((x) => x.id !== r.id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Error al cancelar.');
    } finally {
      setDeletingId(null);
    }
  };

  const incomeFormatted = `$${metrics.income.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const METRICS = [
    {
      label: t('reservations.metrics.total'),
      value: String(metrics.total),
      icon: 'calendar_month',
      trend: '',
      trendUp: true,
      trendText: t('reservations.metrics.vsLastMonth'),
    },
    {
      label: t('reservations.metrics.confirmed'),
      value: String(metrics.confirmed),
      icon: 'check_circle',
      trend: '',
      trendUp: true,
      trendText: '',
    },
    {
      label: t('reservations.metrics.pending'),
      value: String(metrics.pending),
      icon: 'hourglass_empty',
      trend: '',
      trendUp: false,
      trendText: '',
    },
    {
      label: t('reservations.metrics.totalIncome'),
      value: incomeFormatted,
      icon: 'attach_money',
      trend: '',
      trendUp: true,
      trendText: '',
    },
  ];

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 flex flex-col overflow-hidden bg-[#f8fafc]">
          <AdminHeader
            title={t('reservations.title')}
            subtitle="Supervise el estado de las reservas, filtre resultados y gestione cada solicitud desde un solo panel."
          />
          <div className="no-scrollbar flex-1 overflow-auto p-8">
            <MetricsGrid metrics={METRICS} loading={loading} />
            <ReservationFilters
              activeFilter={filterKey}
              onFilterChange={setFilterKey}
              onSearch={setSearch}
            />
            <ReservationTable
              reservations={filtered}
              loading={loading}
              error={error}
              onView={(r) => { setSelectedReserva(r); setModalMode('view'); }}
              onDelete={handleDelete}
            />
          </div>
        </main>
      </div>

      {selectedReserva && (
        <ReservationModal
          reserva={selectedReserva}
          mode={modalMode}
          onClose={() => setSelectedReserva(null)}
          onSaved={handleSaved}
        />
      )}

      {showCreate && (
        <CreateReservationModal
          onClose={() => setShowCreate(false)}
          onCreated={handleCreated}
        />
      )}
    </>
  );
};

export default ReservationManagementPage;
