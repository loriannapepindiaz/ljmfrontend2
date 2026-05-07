// src/features/perfil/presentation/components/LoyaltyStatus.tsx
import React, { useState } from 'react';
import type { ProfileData } from '../profileData';

interface LoyaltyStatusProps {
  profile: ProfileData | null;
  isLoading: boolean;
  isSaving: boolean;
  onUpdateEmail: (email: string) => Promise<void>;
  onUpdatePreferences: (preferenceIds: Array<string | number>) => Promise<void>;
}

const extractEmail = (value: unknown): string | null => {
  if (typeof value !== 'string') return null;

  return value.match(/\S+@\S+\.\S+/)?.[0] ?? null;
};

const findEmailDeep = (value: unknown, seen = new Set<unknown>()): string | null => {
  const directEmail = extractEmail(value);
  if (directEmail) return directEmail;

  if (!value || typeof value !== 'object' || seen.has(value)) return null;
  seen.add(value);

  for (const child of Object.values(value as Record<string, unknown>)) {
    const email = findEmailDeep(child, seen);
    if (email) return email;
  }

  return null;
};

const getStoredSessionEmail = () => {
  const directEmail = extractEmail(localStorage.getItem('ljm_auth_email'));
  if (directEmail) return directEmail;

  const authUserEmail = findEmailDeep(localStorage.getItem('ljm_auth_user'));
  if (authUserEmail) return authUserEmail;

  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index);
    if (!key) continue;

    const email = findEmailDeep(localStorage.getItem(key));
    if (email) return email;
  }

  return null;
};

const LoyaltyStatus: React.FC<LoyaltyStatusProps> = ({ profile, isLoading, isSaving, onUpdateEmail, onUpdatePreferences }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPreferences, setIsEditingPreferences] = useState(false);
  const [tempEmail, setTempEmail] = useState('');
  const [selectedPreferenceIds, setSelectedPreferenceIds] = useState<Array<string | number>>([]);
  const [showModal, setShowModal] = useState(false);
  const email =
    extractEmail(profile?.client.email) ??
    extractEmail(profile?.user.email) ??
    findEmailDeep(profile) ??
    getStoredSessionEmail() ??
    '';
  const loyalty = profile?.loyalty;
  const progress = Math.max(0, Math.min(Number(loyalty?.progressPct ?? 0), 100));
  const visibleNights = profile?.stats.totalNights ?? 0;
  const shownPreferences = profile?.availablePreferences?.length
    ? profile.availablePreferences
    : profile?.preferences ?? [];

  const handleEditClick = () => {
    setTempEmail(email);
    setIsEditing(true);
  };

  const handlePreferenceEdit = () => {
    setSelectedPreferenceIds((profile?.preferences ?? []).map((preference) => preference.id));
    setIsEditingPreferences(true);
  };

  const togglePreference = (id: string | number) => {
    setSelectedPreferenceIds((current) => {
      const normalizedId = String(id);
      return current.some((item) => String(item) === normalizedId)
        ? current.filter((item) => String(item) !== normalizedId)
        : [...current, id];
    });
  };

  const beginPreferenceToggle = (id: string | number) => {
    const currentIds = (profile?.preferences ?? []).map((preference) => preference.id);
    setSelectedPreferenceIds(currentIds.some((item) => String(item) === String(id))
      ? currentIds.filter((item) => String(item) !== String(id))
      : [...currentIds, id]);
    setIsEditingPreferences(true);
  };

  const savePreferences = () => {
    onUpdatePreferences(selectedPreferenceIds).then(() => {
      setIsEditingPreferences(false);
    }).catch(() => undefined);
  };

  const handleSaveAttempt = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  const confirmSave = () => {
    onUpdateEmail(tempEmail).then(() => {
      setIsEditing(false);
      setShowModal(false);
    }).catch(() => undefined);
  };

  return (
    <div className="space-y-6 relative">
      <div className="bg-[#132345] rounded-xl p-6 border border-white/5 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-bold text-sm flex items-center gap-2 font-serif">
            <span className="material-symbols-outlined text-[#d4af37] text-xl">workspace_premium</span>
            Programa de Lealtad
          </h3>
          <span className="text-[#d4af37] text-[9px] font-bold px-2 py-1 rounded bg-[#d4af37]/10 border border-[#d4af37]/20 uppercase tracking-widest">
            {isLoading ? 'Cargando' : loyalty?.label ?? 'Sin progreso'}
          </span>
        </div>

        {profile ? (
          <div className="space-y-4">
            <div className="h-2 overflow-hidden rounded-full bg-[#0e1a34]">
              <div className="h-full rounded-full bg-[#d4af37] transition-all" style={{ width: `${progress}%` }} />
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-lg bg-white/[0.03] px-3 py-4">
                <p className="text-lg font-bold text-white">{progress}%</p>
                <p className="mt-1 text-[9px] uppercase tracking-widest text-slate-500">Progreso</p>
              </div>
              <div className="rounded-lg bg-white/[0.03] px-3 py-4">
                <p className="text-lg font-bold text-white">{visibleNights}</p>
                <p className="mt-1 text-[9px] uppercase tracking-widest text-slate-500">Noches</p>
              </div>
              <div className="rounded-lg bg-white/[0.03] px-3 py-4">
                <p className="text-lg font-bold text-white">{profile.stats.completedTrips}</p>
                <p className="mt-1 text-[9px] uppercase tracking-widest text-slate-500">Viajes</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-white/10 bg-white/[0.03] p-5 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Sin datos de lealtad</p>
            <p className="mt-2 text-xs text-slate-500">
              El estado, progreso y noches restantes se mostrarán cuando existan datos reales del cliente.
            </p>
          </div>
        )}
      </div>

      <div className="bg-[#132345] rounded-xl p-6 border border-white/5 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-bold text-sm font-serif italic">Datos Personales</h3>
          {!isEditing && (
            <span
              onClick={handleEditClick}
              className="material-symbols-outlined text-slate-500 text-sm cursor-pointer hover:text-[#eacea9] transition-colors"
            >
              edit_square
            </span>
          )}
        </div>

        <form onSubmit={handleSaveAttempt} className="space-y-6">
          <div>
            <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mb-2">Correo Electrónico</p>
            {isEditing ? (
              <input
                type="email"
                value={tempEmail}
                onChange={(e) => setTempEmail(e.target.value)}
                className="w-full bg-[#0e1a34] border border-[#eacea9]/20 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37] transition-all"
              />
            ) : (
              <p className="text-xs text-slate-200 font-medium">{email || 'Sin correo registrado'}</p>
            )}
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Preferencias</p>
              {isEditingPreferences ? (
                <button
                  type="button"
                  onClick={() => setIsEditingPreferences(false)}
                  className="text-[9px] font-bold uppercase tracking-widest text-[#eacea9] hover:text-white"
                >
                  Cancelar
                </button>
              ) : profile?.availablePreferences.length ? (
                <button
                  type="button"
                  onClick={handlePreferenceEdit}
                  className="text-[9px] font-bold uppercase tracking-widest text-[#eacea9] hover:text-white"
                >
                  Modificar
                </button>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-2">
              {shownPreferences.map((preference) => {
                const selectedSource = isEditingPreferences ? selectedPreferenceIds : (profile?.preferences ?? []).map((item) => item.id);
                const isSelected = selectedSource.some((item) => String(item) === String(preference.id));

                return (
                  <button
                    key={preference.id}
                    type="button"
                    onClick={() => {
                      if (isEditingPreferences) {
                        togglePreference(preference.id);
                      } else {
                        beginPreferenceToggle(preference.id);
                      }
                    }}
                    className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                      isSelected
                        ? 'border-[#eacea9]/40 bg-[#eacea9]/15 text-[#eacea9]'
                        : 'border-white/10 bg-[#0e1a34]/70 text-slate-200 hover:border-[#eacea9]/40 hover:text-[#eacea9]'
                    }`}
                  >
                    {preference.name}
                  </button>
                );
              })}
              {!shownPreferences.length ? (
                <p className="text-xs text-slate-500">Sin preferencias disponibles.</p>
              ) : null}
            </div>
            {isEditingPreferences ? (
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={savePreferences}
                  className="rounded-lg bg-[#d4af37] px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-[#0e1a34]"
                >
                  {isSaving ? 'Guardando...' : 'Guardar'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingPreferences(false)}
                  className="rounded-lg border border-white/10 px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-300"
                >
                  Cancelar
                </button>
              </div>
            ) : null}
          </div>

          {isEditing && (
            <div className="flex gap-2 pt-2 animate-in slide-in-from-bottom-2 duration-300">
              <button
                type="submit"
                disabled={isSaving}
                className="flex-1 bg-[#d4af37] text-[#0e1a34] text-[10px] font-bold py-2.5 rounded-lg hover:brightness-110 uppercase tracking-widest transition-all"
              >
                {isSaving ? 'Guardando...' : 'Actualizar Perfil'}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-white/5 text-white text-[10px] font-bold py-2.5 rounded-lg hover:bg-white/10 border border-white/10 uppercase tracking-widest transition-all"
              >
                Cancelar
              </button>
            </div>
          )}
        </form>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0e1a34]/80 backdrop-blur-md animate-in fade-in duration-300"></div>
          <div className="relative bg-[#132345] border border-[#eacea9]/30 rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center animate-in zoom-in-95 duration-300">
            <div className="size-16 bg-[#eacea9]/10 rounded-full flex items-center justify-center mb-6 mx-auto border border-[#eacea9]/20">
              <span className="material-symbols-outlined text-[#eacea9] text-3xl">verified_user</span>
            </div>
            <h4 className="text-xl font-bold text-white mb-2 font-serif uppercase tracking-tight">Confirmar Actualizacion</h4>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
              Confirma que deseas actualizar la informacion local del perfil.
            </p>
            <div className="space-y-3">
              <button
                onClick={confirmSave}
                disabled={isSaving}
                className="w-full bg-[#d4af37] text-[#0e1a34] font-bold py-3 rounded-xl hover:scale-[1.02] transition-transform shadow-lg shadow-[#d4af37]/20 uppercase tracking-widest"
              >
                {isSaving ? 'Guardando...' : 'Confirmar cambios'}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="w-full text-slate-500 font-bold py-2 text-[10px] uppercase tracking-[0.2em] hover:text-white transition-colors"
              >
                Volver atras
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoyaltyStatus;
