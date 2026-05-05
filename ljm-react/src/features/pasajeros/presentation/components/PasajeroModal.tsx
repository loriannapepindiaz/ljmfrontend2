import React, { useEffect, useState } from 'react';
import { pasajeroService } from '../../data/pasajeroService';
import type { AdminPasajero } from '../../data/types';

interface PasajeroModalProps {
  pasajero: AdminPasajero;
  mode: 'view' | 'edit';
  onClose: () => void;
  onSaved: (updated: AdminPasajero) => void;
}

const DB_TIERS = [
  { value: 'Explorer',  label: 'Explorer'  },
  { value: 'Navegante', label: 'Navegante' },
  { value: 'Admiral',   label: 'Admiral'   },
  { value: 'Commodore', label: 'Commodore' },
] as const;

const tierStyle = (tier: string) => {
  if (tier === 'Admiral')   return 'bg-slate-100 text-slate-700';
  if (tier === 'Navegante') return 'bg-amber-50 text-amber-700';
  if (tier === 'Explorer')  return 'bg-blue-50 text-blue-700';
  if (tier === 'Commodore') return 'bg-purple-50 text-purple-700';
  return 'bg-slate-100 text-slate-500';
};

const inputClass = 'w-full rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#eacea9]/50 focus:border-[#eacea9] p-3 text-slate-900 bg-white outline-none text-sm transition-all';

const DetailRow: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</span>
    <span className="text-sm text-[#0e1a34] font-medium">{value ?? '—'}</span>
  </div>
);

const PasajeroModal: React.FC<PasajeroModalProps> = ({ pasajero, mode, onClose, onSaved }) => {
  const [currentMode, setCurrentMode] = useState(mode);
  const [nombre,      setNombre]      = useState(pasajero.nombre ?? '');
  const [apellido,    setApellido]    = useState(pasajero.apellido ?? '');
  const [loyaltyTier, setLoyaltyTier] = useState(pasajero.loyalty_tier_raw);
  const [saving,  setSaving]  = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
    setCurrentMode(mode);
    setNombre(pasajero.nombre ?? '');
    setApellido(pasajero.apellido ?? '');
    setLoyaltyTier(pasajero.loyalty_tier_raw);
    setError(null);
  }, [pasajero, mode]);

  const fullName = [pasajero.nombre, pasajero.apellido].filter(Boolean).join(' ') || '—';
  const initials = [pasajero.nombre?.[0], pasajero.apellido?.[0]].filter(Boolean).join('').toUpperCase() || '?';

  const handleSave = async () => {
    setError(null);
    if (!nombre.trim()) { setError('El nombre es requerido.'); return; }
    setSaving(true);
    try {
      const updated = await pasajeroService.updatePasajero(pasajero.id, {
        nombre:       nombre.trim(),
        apellido:     apellido.trim() || undefined,
        loyalty_tier: loyaltyTier,
      });
      onSaved(updated);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar.');
    } finally {
      setSaving(false);
    }
  };

  const formattedDate = pasajero.ultimo_viaje
    ? new Date(pasajero.ultimo_viaje).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
    : null;

  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" onClick={onClose} />

      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-[#0e1a34] flex items-center justify-center text-white text-sm font-bold shrink-0">
              {initials}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                {currentMode === 'view' ? 'Detalle de pasajero' : 'Editar pasajero'}
              </p>
              <p className="text-sm font-bold text-[#0e1a34] truncate max-w-[220px]">{fullName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#0e1a34] hover:border-[#0e1a34] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
          {currentMode === 'view' ? (
            <>
              <DetailRow label="Nombre completo" value={fullName} />
              <DetailRow label="Email" value={pasajero.email} />
              <DetailRow label="Código de miembro" value={pasajero.member_code} />
              <DetailRow label="Documento" value={
                pasajero.documento_id
                  ? `${pasajero.documento_tipo ?? ''} ${pasajero.documento_id}`.trim()
                  : null
              } />
              <DetailRow
                label="Estado de lealtad"
                value={
                  <span className={`inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-full ${tierStyle(pasajero.loyalty_tier)}`}>
                    {pasajero.loyalty_tier}
                  </span>
                }
              />
              <DetailRow label="Último viaje" value={formattedDate} />
              <DetailRow
                label="Estado de cuenta"
                value={
                  <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${pasajero.activo ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full inline-block ${pasajero.activo ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                    {pasajero.activo ? 'Activo' : 'Inactivo'}
                  </span>
                }
              />
            </>
          ) : (
            <div className="space-y-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Nombre</label>
                <input type="text" className={inputClass} value={nombre} onChange={e => setNombre(e.target.value)} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Apellido</label>
                <input type="text" className={inputClass} value={apellido} onChange={e => setApellido(e.target.value)} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Estado de lealtad</label>
                <select className={inputClass} value={loyaltyTier} onChange={e => setLoyaltyTier(e.target.value)}>
                  {DB_TIERS.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
              {error && <p className="text-xs text-red-500 font-semibold">{error}</p>}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
          {currentMode === 'view' ? (
            <>
              <button onClick={onClose} className="text-sm text-slate-500 hover:text-[#0e1a34] font-medium transition-colors">
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
                className="flex items-center gap-2 bg-[#eacea9] hover:bg-[#d4af37] text-[#0e1a34] text-sm font-black px-5 py-2.5 rounded-lg transition-colors disabled:opacity-60"
              >
                <span className="material-symbols-outlined text-[16px]">{saving ? 'hourglass_empty' : 'save'}</span>
                {saving ? 'Guardando...' : 'Guardar cambios'}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PasajeroModal;
