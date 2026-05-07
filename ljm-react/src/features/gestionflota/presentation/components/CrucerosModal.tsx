import React, { useEffect, useState } from 'react';
import { crucerosService } from '../../data/crucerosService';
import type { AdminCruise } from '../../data/types';

interface CrucerosModalProps {
  cruise: AdminCruise;
  mode: 'view' | 'edit';
  onClose: () => void;
  onSaved: (updated: AdminCruise) => void;
}

const inputClass =
  'w-full rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#eacea9]/50 focus:border-[#eacea9] p-3 text-slate-900 bg-white outline-none text-sm transition-all';

const DetailRow: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</span>
    <span className="text-sm text-[#0e1a34] font-medium">{value ?? '—'}</span>
  </div>
);

type EstadoKey = 'activo' | 'mantenimiento' | 'proximo';

const ESTADO_LABELS: Record<EstadoKey, string> = {
  activo: 'Activo',
  mantenimiento: 'En Mantenimiento',
  proximo: 'Próximos Lanzamientos',
};

const ESTADO_STYLES: Record<EstadoKey, { pill: string; dot: string }> = {
  activo:       { pill: 'bg-emerald-50 text-emerald-700',  dot: 'bg-emerald-500' },
  mantenimiento:{ pill: 'bg-amber-50 text-amber-700',      dot: 'bg-amber-400' },
  proximo:      { pill: 'bg-blue-50 text-blue-700',        dot: 'bg-blue-400' },
};

const deriveEstado = (c: AdminCruise): EstadoKey => {
  if (c.activo) return 'activo';
  if (c.ambiente?.toLowerCase().includes('mantenimiento')) return 'mantenimiento';
  return 'proximo';
};

const estadoToPayload = (estado: EstadoKey): { activo: boolean } => ({
  activo: estado === 'activo',
});

const CrucerosModal: React.FC<CrucerosModalProps> = ({ cruise, mode, onClose, onSaved }) => {
  const [currentMode, setCurrentMode] = useState(mode);
  const [nombre, setNombre] = useState(cruise.nombre);
  const [capacidad, setCapacidad] = useState(String(cruise.guests ?? ''));
  const [estado, setEstado] = useState<EstadoKey>(deriveEstado(cruise));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync if a different cruise is opened
  useEffect(() => {
    setCurrentMode(mode);
    setNombre(cruise.nombre);
    setCapacidad(String(cruise.guests ?? ''));
    setEstado(deriveEstado(cruise));
    setError(null);
  }, [cruise, mode]);

  const handleSave = async () => {
    setError(null);
    if (!nombre.trim()) { setError('El nombre es requerido.'); return; }
    if (!capacidad || Number(capacidad) <= 0) { setError('La capacidad debe ser un número positivo.'); return; }

    setSaving(true);
    try {
      const updated = await crucerosService.update(cruise.id, {
        nombre: nombre.trim(),
        capacidad_max_pasajeros: Number(capacidad),
        ...estadoToPayload(estado),
      });
      onSaved(updated);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#0e1a34]">directions_boat</span>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                {currentMode === 'view' ? 'Detalle' : 'Editar crucero'}
              </p>
              <p className="text-sm font-bold text-[#0e1a34] truncate max-w-[220px]">{cruise.nombre}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#0e1a34] hover:border-[#0e1a34] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Body — scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">

          {/* Image */}
          <div className="h-44 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center">
            {cruise.imageSrc ? (
              <img src={cruise.imageSrc} alt={cruise.nombre} className="w-full h-full object-cover" />
            ) : (
              <span className="material-symbols-outlined text-[56px] text-slate-300">directions_boat</span>
            )}
          </div>

          {currentMode === 'view' ? (
            <div className="space-y-4">
              <DetailRow label="Nombre" value={cruise.nombre} />
              <DetailRow
                label="Estado"
                value={(() => {
                  const key = deriveEstado(cruise);
                  const { pill, dot } = ESTADO_STYLES[key];
                  return (
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${pill}`}>
                      <span className={`w-1.5 h-1.5 rounded-full inline-block ${dot}`} />
                      {ESTADO_LABELS[key]}
                    </span>
                  );
                })()}
              />
              <DetailRow label="Tipo / Clase" value={cruise.badge} />
              <DetailRow label="Capacidad" value={cruise.guests != null ? `${cruise.guests} pasajeros` : null} />
              <DetailRow label="Eslora" value={cruise.eslora} />
              <DetailRow label="Cubiertas" value={cruise.decks != null ? `${cruise.decks} cubiertas` : null} />
              {cruise.descripcion && (
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Descripción</span>
                  <p className="text-sm text-slate-600 leading-relaxed">{cruise.descripcion}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Nombre del crucero
                </label>
                <input
                  type="text"
                  className={inputClass}
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Capacidad de pasajeros
                </label>
                <input
                  type="number"
                  className={inputClass}
                  value={capacidad}
                  onChange={e => setCapacidad(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Estado
                </label>
                <select
                  className={inputClass}
                  value={estado}
                  onChange={e => setEstado(e.target.value as EstadoKey)}
                >
                  <option value="activo">Activo</option>
                  <option value="mantenimiento">En Mantenimiento</option>
                  <option value="proximo">Próximos Lanzamientos</option>
                </select>
              </div>

              {error && (
                <p className="text-xs text-red-500 font-semibold">{error}</p>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
          {currentMode === 'view' ? (
            <>
              <button
                onClick={onClose}
                className="text-sm text-slate-500 hover:text-[#0e1a34] font-medium transition-colors"
              >
                Cerrar
              </button>
              <button
                onClick={() => setCurrentMode('edit')}
                className="flex items-center gap-2 bg-[#0e1a34] text-white text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-[#1a2b4e] transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">edit</span>
                Editar
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setCurrentMode('view')}
                disabled={saving}
                className="text-sm text-slate-500 hover:text-[#0e1a34] font-medium transition-colors disabled:opacity-40"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-[#eacea9] hover:bg-[#d4af37] text-[#0e1a34] text-sm font-black px-5 py-2.5 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {saving ? 'hourglass_empty' : 'save'}
                </span>
                {saving ? 'Guardando...' : 'Guardar cambios'}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CrucerosModal;
