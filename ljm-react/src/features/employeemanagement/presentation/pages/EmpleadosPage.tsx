import React, { useEffect, useState } from 'react';
import AdminSidebar from '../../../gestionreserva/presentation/components/AdminSidebar';
import EmpleadosHeader from '../components/EmpleadosHeader';
import EmpleadosMetrics from '../components/EmpleadosMetrics';
import EmpleadosTable from '../components/EmpleadosTable';
import EmpleadoModal from '../components/EmpleadoModal';
import {
  empleadosService,
  type EmpleadoDashboard,
  type EmpleadosMetricsData,
  type EmpleadosCatalogos,
} from '../../data/empleadosService';

type ModalMode = 'view' | 'edit';

const EMPTY_METRICS: EmpleadosMetricsData = { total: 0, activos: 0, licencia: 0, vacantes: 0 };
const EMPTY_CATALOGOS: EmpleadosCatalogos = { cargos: [], departamentos: [], puertos: [] };

const EmpleadosPage: React.FC = () => {
  const [empleados, setEmpleados] = useState<EmpleadoDashboard[]>([]);
  const [metrics, setMetrics] = useState<EmpleadosMetricsData>(EMPTY_METRICS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [catalogos, setCatalogos] = useState<EmpleadosCatalogos>(EMPTY_CATALOGOS);
  const [selectedEmpleado, setSelectedEmpleado] = useState<EmpleadoDashboard | null>(null);
  const [modalMode, setModalMode] = useState<ModalMode>('view');

  const loadDashboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const dashboard = await empleadosService.getDashboard();
      setEmpleados(dashboard.empleados);
      setMetrics(dashboard.metrics);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudieron cargar los empleados.');
      setEmpleados([]);
      setMetrics(EMPTY_METRICS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadDashboard();
    empleadosService.getCatalogos().then(setCatalogos).catch(() => {});
  }, []);

  const handleView = (empleado: EmpleadoDashboard) => {
    setSelectedEmpleado(empleado);
    setModalMode('view');
  };

  const handleEdit = (empleado: EmpleadoDashboard) => {
    setSelectedEmpleado(empleado);
    setModalMode('edit');
  };

  const handleSaved = (updated: EmpleadoDashboard) => {
    setEmpleados((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
    setSelectedEmpleado(null);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar activeItem="Empleados" />
      <main className="no-scrollbar flex-1 overflow-y-auto bg-[#f6f7f8]">
        <div className="p-8">
          <EmpleadosHeader />
          {error && (
            <div className="mb-6 rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
              {error}
            </div>
          )}
          <EmpleadosMetrics metrics={metrics} loading={loading} />
          <EmpleadosTable
            empleados={empleados}
            loading={loading}
            onRefresh={loadDashboard}
            onView={handleView}
            onEdit={handleEdit}
          />
        </div>
      </main>

      {selectedEmpleado && (
        <EmpleadoModal
          empleado={selectedEmpleado}
          mode={modalMode}
          catalogos={catalogos}
          onClose={() => setSelectedEmpleado(null)}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
};

export default EmpleadosPage;
