// src/features/perfil/presentation/components/LoyaltyStatus.tsx
import React, { useState } from 'react';
import type { AuthUser } from '../../../../lib/api';

const getCachedUser = (): AuthUser | null => {
  try {
    const rawUser = localStorage.getItem('ljm_auth_user');
    return rawUser ? (JSON.parse(rawUser) as AuthUser) : null;
  } catch {
    return null;
  }
};

const LoyaltyStatus: React.FC = () => {
  const user = getCachedUser();
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState(user?.email ?? user?.cliente?.email ?? '');
  const [tempEmail, setTempEmail] = useState(email);
  const [showModal, setShowModal] = useState(false);

  const handleEditClick = () => {
    setTempEmail(email);
    setIsEditing(true);
  };

  const handleSaveAttempt = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  const confirmSave = () => {
    setEmail(tempEmail);
    setIsEditing(false);
    setShowModal(false);
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
            Sin progreso
          </span>
        </div>

        <div className="rounded-lg border border-dashed border-white/10 bg-white/[0.03] p-5 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Sin datos de lealtad</p>
          <p className="mt-2 text-xs text-slate-500">
            El estado, progreso y noches restantes se mostraran cuando existan datos reales del cliente.
          </p>
        </div>
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
            <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mb-2">Correo Electronico</p>
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
            <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mb-3">Mis Preferencias</p>
            <div className="rounded-lg border border-dashed border-white/10 bg-white/[0.03] px-4 py-6 text-center">
              <p className="text-xs text-slate-500">Sin preferencias registradas.</p>
            </div>
          </div>

          {isEditing && (
            <div className="flex gap-2 pt-2 animate-in slide-in-from-bottom-2 duration-300">
              <button
                type="submit"
                className="flex-1 bg-[#d4af37] text-[#0e1a34] text-[10px] font-bold py-2.5 rounded-lg hover:brightness-110 uppercase tracking-widest transition-all"
              >
                Actualizar Perfil
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
                className="w-full bg-[#d4af37] text-[#0e1a34] font-bold py-3 rounded-xl hover:scale-[1.02] transition-transform shadow-lg shadow-[#d4af37]/20 uppercase tracking-widest"
              >
                Confirmar cambios
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
