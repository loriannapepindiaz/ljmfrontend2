import React, { useState } from 'react';
import { empleadosService, type EmpleadoDashboard, type EmpleadosCatalogos, type CreateEmpleadoPayload } from '../../data/empleadosService';
import { getBackendMediaUrl } from '../../../../lib/api';

type ModalMode = 'view' | 'edit';

interface EmpleadoModalProps {
  empleado: EmpleadoDashboard;
  mode: ModalMode;
  catalogos: EmpleadosCatalogos;
  onClose: () => void;
  onSaved: (updated: EmpleadoDashboard) => void;
}

const statusClassName = (estado: string) => {
  if (estado === 'activo' || estado === 'activa') return 'bg-emerald-50 text-emerald-700 border-emerald-100';
  if (estado === 'licencia' || estado === 'de licencia' || estado === 'permiso') {
    return 'bg-amber-50 text-amber-700 border-amber-100';
  }
  return 'bg-slate-100 text-slate-600 border-slate-200';
};

const ESTADOS = [
  { value: 'activo', label: 'Activo' },
  { value: 'licencia', label: 'De licencia' },
  { value: 'capacitacion', label: 'En capacitación' },
  { value: 'inactivo', label: 'Inactivo' },
];

const inputClass = "w-full bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-lg focus:ring-2 focus:ring-[#eacea9]/50 focus:border-[#eacea9] outline-none text-sm transition-all";
const selectClass = "w-full bg-slate-50 border border-slate-200 px-3 py-2.5 rounded-lg focus:ring-2 focus:ring-[#eacea9]/50 focus:border-[#eacea9] outline-none text-sm appearance-none";

const EmpleadoModal: React.FC<EmpleadoModalProps> = ({ empleado, mode: initialMode, catalogos, onClose, onSaved }) => {
  const [mode, setMode] = useState<ModalMode>(initialMode);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    nombre_completo: empleado.nombre_completo === 'Sin nombre' ? '' : empleado.nombre_completo,
    email: empleado.email ?? '',
    telefono: empleado.telefono ?? '',
    cargo: empleado.cargo ?? '',
    departamento: empleado.departamento ?? '',
    estado_empleado: empleado.estado || 'activo',
  });

  const [avatarError, setAvatarError] = useState(false);
  const avatarSrc = getBackendMediaUrl(empleado.foto_url);
  const initials = empleado.nombre_completo
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    if (!form.nombre_completo.trim()) {
      setError('El nombre es requerido.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const payload: Partial<CreateEmpleadoPayload> = {};

      if (form.nombre_completo.trim() !== empleado.nombre_completo)
        payload.nombre_completo = form.nombre_completo.trim();
      if (form.email.trim() !== (empleado.email ?? ''))
        payload.email = form.email.trim() || undefined;
      if (form.telefono.trim() !== (empleado.telefono ?? ''))
        payload.telefono = form.telefono.trim() || undefined;
      if (form.cargo !== (empleado.cargo ?? ''))
        payload.cargo = form.cargo || undefined;
      if (form.departamento !== (empleado.departamento ?? ''))
        payload.departamento = form.departamento || undefined;
      // Only send estado if the user actually changed it to avoid re-triggering check constraints on existing data
      if (form.estado_empleado !== empleado.estado)
        payload.estado_empleado = form.estado_empleado;

      if (Object.keys(payload).length === 0) {
        onSaved(empleado);
        return;
      }

      const updated = await empleadosService.update(empleado.id, payload);
      onSaved(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo guardar.');
      setSaving(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div
        className="fixed z-50 bg-white rounded-2xl shadow-2xl border border-slate-100 w-full max-w-lg overflow-hidden"
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        {/* Header */}
        <div className="bg-[#0e1a34] px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`size-12 rounded-full overflow-hidden flex items-center justify-center font-bold text-sm ${
              avatarSrc && !avatarError ? '' : 'bg-[#eacea9]/10 border-2 border-[#eacea9]/40 text-[#eacea9]'
            }`}>
              {avatarSrc && !avatarError ? (
                <img src={avatarSrc} alt="" className="size-full object-cover" onError={() => setAvatarError(true)} />
              ) : initials}
            </div>
            <div>
              <p className="text-white font-bold text-sm">{empleado.nombre_completo}</p>
              <p className="text-[#eacea9]/60 text-xs">{empleado.cargo ?? 'Sin cargo'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {mode === 'view' && (
              <button
                onClick={() => setMode('edit')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#eacea9] text-[#0e1a34] text-xs font-bold hover:bg-[#d4b896] transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">edit</span>
                Editar
              </button>
            )}
            <button
              onClick={onClose}
              className="size-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {mode === 'view' ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <InfoField icon="badge" label="Estado">
                  <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-bold ${statusClassName(empleado.estado)}`}>
                    {empleado.estado_label}
                  </span>
                </InfoField>
                <InfoField icon="work" label="Cargo">{empleado.cargo ?? '—'}</InfoField>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <InfoField icon="apartment" label="Departamento">{empleado.departamento ?? '—'}</InfoField>
                <InfoField icon="anchor" label="Barco / Puerto">{empleado.puerto ?? '—'}</InfoField>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <InfoField icon="phone" label="Teléfono">{empleado.telefono ?? '—'}</InfoField>
                <InfoField icon="mail" label="Email">{empleado.email ?? '—'}</InfoField>
              </div>
              {empleado.fecha_contrato && (
                <InfoField icon="calendar_today" label="Fecha de contrato">
                  {new Date(empleado.fecha_contrato).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
                </InfoField>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {error && (
                <p className="text-xs text-rose-600 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">{error}</p>
              )}

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Nombre completo</label>
                <input name="nombre_completo" value={form.nombre_completo} onChange={handleChange} className={inputClass} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Estado</label>
                  <div className="relative">
                    <select name="estado_empleado" value={form.estado_empleado} onChange={handleChange} className={selectClass}>
                      {ESTADOS.map((e) => (
                        <option key={e.value} value={e.value}>{e.label}</option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[16px]">expand_more</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Cargo</label>
                  <div className="relative">
                    <select name="cargo" value={form.cargo} onChange={handleChange} className={selectClass}>
                      <option value="">Sin cargo</option>
                      {catalogos.cargos.map((c) => (
                        <option key={c.id} value={c.nombre}>{c.nombre}</option>
                      ))}
                      {form.cargo && !catalogos.cargos.some((c) => c.nombre === form.cargo) && (
                        <option value={form.cargo}>{form.cargo}</option>
                      )}
                    </select>
                    <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[16px]">expand_more</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Departamento</label>
                <div className="relative">
                  <select name="departamento" value={form.departamento} onChange={handleChange} className={selectClass}>
                    <option value="">Sin departamento</option>
                    {catalogos.departamentos.map((d) => (
                      <option key={d.id} value={d.nombre}>{d.nombre}</option>
                    ))}
                    {form.departamento && !catalogos.departamentos.some((d) => d.nombre === form.departamento) && (
                      <option value={form.departamento}>{form.departamento}</option>
                    )}
                  </select>
                  <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[16px]">expand_more</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Teléfono</label>
                  <input name="telefono" value={form.telefono} onChange={handleChange} className={inputClass} placeholder="+00 000 000" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} className={inputClass} placeholder="email@ejemplo.com" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {mode === 'edit' && (
          <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
            <button
              onClick={() => { setMode('view'); setError(null); }}
              className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-bold text-slate-500 hover:bg-white transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-5 py-2 rounded-lg bg-[#0e1a34] text-[#eacea9] text-sm font-bold hover:bg-[#1a2d54] transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {saving && <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>}
              {saving ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

const InfoField: React.FC<{ icon: string; label: string; children: React.ReactNode }> = ({ icon, label, children }) => (
  <div className="space-y-1">
    <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 flex items-center gap-1">
      <span className="material-symbols-outlined text-[12px]">{icon}</span>
      {label}
    </p>
    <div className="text-sm text-[#0e1a34] font-medium">{children}</div>
  </div>
);

export default EmpleadoModal;
