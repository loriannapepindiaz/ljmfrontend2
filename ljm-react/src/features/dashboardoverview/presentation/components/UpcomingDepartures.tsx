import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { dashboardService, type ProximaSalida } from '../../data/dashboardService';

const formatDate = (d: string | null) => {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
};

const formatDateShort = (d: string | null) => {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
};

const monthAbbr = (d: string | null) => {
  if (!d) return '';
  return new Date(d).toLocaleDateString('es-ES', { month: 'short' }).toUpperCase();
};

const dayNum = (d: string | null) => {
  if (!d) return '';
  return new Date(d).getDate();
};

const SkeletonRow: React.FC = () => (
  <div className="flex items-center gap-4 p-3 rounded-xl animate-pulse">
    <div className="w-12 h-14 bg-slate-100 rounded-lg shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-slate-100 rounded w-3/4" />
      <div className="h-3 bg-slate-100 rounded w-1/2" />
    </div>
    <div className="h-6 w-16 bg-slate-100 rounded-full" />
  </div>
);

interface DetailModalProps {
  salida: ProximaSalida;
  onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ salida, onClose }) => (
  <>
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" onClick={onClose} />
    <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-blue-500">sailing</span>
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Próxima Salida</p>
            <p className="text-sm font-bold text-[#0e1a34]">{salida.crucero ?? '—'}</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 transition-colors">
          <span className="material-symbols-outlined text-slate-400">close</span>
        </button>
      </div>

      {/* Trip name */}
      <div className="bg-slate-50 rounded-xl px-4 py-3 mb-4">
        <p className="text-sm font-bold text-[#0e1a34]">{salida.nombre}</p>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-blue-50 rounded-xl p-3">
          <p className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-1">Salida</p>
          <p className="text-sm font-bold text-[#0e1a34]">{formatDate(salida.fecha_salida)}</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-3">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Llegada</p>
          <p className="text-sm font-bold text-[#0e1a34]">{formatDate(salida.fecha_llegada)}</p>
        </div>
        <div className="bg-green-50 rounded-xl p-3 col-span-2">
          <p className="text-[10px] font-bold text-green-500 uppercase tracking-wider mb-1">Duración</p>
          <p className="text-sm font-bold text-[#0e1a34]">
            {salida.duracion_dias != null ? `${salida.duracion_dias} días` : '—'}
          </p>
        </div>
      </div>

      <button
        onClick={onClose}
        className="mt-4 w-full py-2.5 rounded-xl bg-[#0e1a34] hover:bg-[#0e1a34]/90 text-white text-sm font-bold transition-colors"
      >
        Cerrar
      </button>
    </div>
  </>
);

const UpcomingDepartures: React.FC = () => {
  const { t } = useTranslation();
  const [salidas, setSalidas] = useState<ProximaSalida[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ProximaSalida | null>(null);

  useEffect(() => {
    dashboardService.fetchProximasSalidas()
      .then(setSalidas)
      .catch(() => setSalidas([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="bg-white border border-[#0e1a34]/10 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-[#0e1a34] mb-4">{t('dashboard.upcomingDepartures.title')}</h3>

        <div className="flex flex-col gap-2">
          {loading ? (
            <>
              <SkeletonRow />
              <SkeletonRow />
              <SkeletonRow />
            </>
          ) : salidas.length === 0 ? (
            <div className="flex items-center gap-4 p-3 rounded-lg text-center text-slate-400 text-sm">
              <span className="material-symbols-outlined text-[40px] block text-slate-300">directions_boat</span>
              <p>{t('dashboard.upcomingDepartures.empty')}</p>
            </div>
          ) : (
            salidas.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelected(s)}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors w-full text-left"
              >
                {/* Date badge */}
                <div className="w-12 h-14 bg-blue-50 rounded-lg flex flex-col items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-blue-400 uppercase">{monthAbbr(s.fecha_salida)}</span>
                  <span className="text-xl font-bold text-[#0e1a34] leading-none">{dayNum(s.fecha_salida)}</span>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#0e1a34] truncate">{s.nombre}</p>
                  <p className="text-xs text-slate-400 mt-0.5 truncate">
                    {s.crucero && <span>{s.crucero} · </span>}
                    {formatDateShort(s.fecha_salida)}
                    {s.fecha_llegada && ` → ${formatDateShort(s.fecha_llegada)}`}
                  </p>
                </div>

                {/* Duration */}
                {s.duracion_dias != null && (
                  <span className="text-xs font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded-full shrink-0">
                    {s.duracion_dias}d
                  </span>
                )}
              </button>
            ))
          )}
        </div>
      </div>

      {selected && <DetailModal salida={selected} onClose={() => setSelected(null)} />}
    </>
  );
};

export default UpcomingDepartures;
