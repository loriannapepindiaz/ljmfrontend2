// src/features/perfil/presentation/components/ProfileCard.tsx
import React from 'react';
import type { AuthUser } from '../../../../lib/api';

const getCachedUser = (): AuthUser | null => {
  try {
    const rawUser = localStorage.getItem('ljm_auth_user');
    return rawUser ? (JSON.parse(rawUser) as AuthUser) : null;
  } catch {
    return null;
  }
};

const getDisplayName = (user: AuthUser | null) => {
  const fullName = [user?.cliente?.nombre, user?.cliente?.apellido].filter(Boolean).join(' ').trim();
  return fullName || user?.username || user?.email || 'Usuario';
};

const ProfileCard: React.FC = () => {
  const user = getCachedUser();
  const displayName = getDisplayName(user);

  return (
    <div className="bg-[#132345] rounded-xl p-8 border border-white/5 relative overflow-hidden group shadow-2xl">
      <div className="flex flex-col items-center text-center space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Bienvenido/a de vuelta,<br/>{displayName}</h1>
          <p className="text-[#d4af37] font-semibold uppercase tracking-widest text-[10px] mt-2">
            {user?.cliente?.loyaltyTier ?? 'Sin nivel asignado'}
          </p>
          <p className="text-slate-500 text-xs mt-1 font-mono">
            {user?.cliente?.memberCode ? `ID: ${user.cliente.memberCode}` : 'Sin ID de miembro'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
