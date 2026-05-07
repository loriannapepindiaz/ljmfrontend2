import React, { useEffect, useMemo, useState } from 'react';
import AdminSidebar from '../../../gestionreserva/presentation/components/AdminSidebar';
import ReportesHeader from '../components/ReportesHeader';
import ReportesKPIs from '../components/ReportesKPIs';
import IngresosTendencia from '../components/IngresosTendencia';
import IngresosPorServicio from '../components/IngresosPorServicio';
import OcupacionPorCrucero from '../components/OcupacionPorCrucero';
import { reportesService, type ReportesData, type ReportesDateRange } from '../../data/reportesService';

const DEFAULT_RANGE: ReportesDateRange = {
  fecha_inicio: '2026-01-01',
  fecha_fin: '2026-12-01',
};

const ReportesPage: React.FC = () => {
  const [range, setRange] = useState<ReportesDateRange>(DEFAULT_RANGE);
  const [data, setData] = useState<ReportesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    reportesService
      .getReportes(range)
      .then((reportes) => {
        if (active) setData(reportes);
      })
      .catch((err: unknown) => {
        if (!active) return;
        setData(null);
        setError(err instanceof Error ? err.message : 'No se pudieron cargar los reportes.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [range]);

  const hasData = useMemo(() => {
    if (!data) return false;
    return (
      data.ingresos_mensuales > 0 ||
      data.tasa_ocupacion > 0 ||
      (data.satisfaccion_cliente > 0 || data.satisfaccion_total > 0) ||
      data.crecimiento_reservas !== 0 ||
      data.ingresos_por_mes.some((item) => item.total > 0) ||
      data.ingresos_por_servicio.some((item) => item.total > 0 || item.porcentaje > 0) ||
      data.ocupacion_por_crucero.some((item) => item.ocupacion > 0)
    );
  }, [data]);

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar activeItem="Reportes" />
      <main className="flex-1 overflow-y-auto bg-[#f6f7f8]">
        <div className="p-8">
          <ReportesHeader onRangeChange={setRange} />
          {error && (
            <div className="mb-6 bg-rose-50 border border-rose-100 text-rose-700 px-4 py-3 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}
          {!loading && !error && !hasData && (
            <div className="mb-6 bg-white border border-slate-100 rounded-xl px-4 py-3 text-sm">
              <p className="font-bold text-[#0e1a34]">Sin datos disponibles</p>
              <p className="text-slate-400 text-xs mt-1">Los datos aparecerán al conectar la BD</p>
            </div>
          )}
          <ReportesKPIs data={data} loading={loading} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <IngresosTendencia data={data?.ingresos_por_mes ?? []} loading={loading} />
            <IngresosPorServicio data={data?.ingresos_por_servicio ?? []} loading={loading} />
          </div>
          <OcupacionPorCrucero data={data?.ocupacion_por_crucero ?? []} loading={loading} />
        </div>
      </main>
    </div>
  );
};

export default ReportesPage;
