// src/features/perfil/presentation/components/ProfileCard.tsx
import React from 'react';
import type { ProfileData } from '../profileData';
import { resolveMemberCode } from '../../../../lib/memberCode';

interface ProfileCardProps {
  profile: ProfileData | null;
  isLoading: boolean;
}

const getCachedMemberCode = () => {
  try {
    const cachedUser = JSON.parse(localStorage.getItem('ljm_auth_user') ?? '{}');
    return resolveMemberCode(cachedUser?.cliente?.memberCode, cachedUser?.cliente?.id ?? cachedUser?.id);
  } catch {
    return null;
  }
};

const getCachedUser = () => {
  try {
    return JSON.parse(localStorage.getItem('ljm_auth_user') ?? '{}');
  } catch {
    return {};
  }
};

const isUsefulText = (value: unknown): value is string => {
  if (typeof value !== 'string') return false;

  const normalized = value.trim().toLowerCase();

  return Boolean(
    normalized &&
      !(normalized.includes('cargando') && normalized.includes('perfil')) &&
      normalized !== 'cargando perfil...' &&
      normalized !== 'cargando perfil' &&
      normalized !== 'sin nivel asignado' &&
      normalized !== 'sin progreso' &&
      normalized !== 'usuario',
  );
};

const pickUsefulText = (...values: unknown[]) => values.find(isUsefulText) as string | undefined;

const formatFullName = (...parts: unknown[]) =>
  pickUsefulText(parts.filter(isUsefulText).join(' ').trim());

const tierLabels: Record<string, string> = {
  Explorer: 'Explorador',
  Voyager: 'Miembro Oro',
  Navigator: 'Navegante',
  Admiral: 'Almirante',
  Explorador: 'Explorador',
  'Miembro Oro': 'Miembro Oro',
  Navegante: 'Navegante',
  Almirante: 'Almirante',
};

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, isLoading }) => {
  const cachedUser = getCachedUser();
  const cachedFullName = formatFullName(cachedUser?.cliente?.nombre, cachedUser?.cliente?.apellido);
  const profileFullName = formatFullName(profile?.client.firstName, profile?.client.lastName);
  const displayName =
    pickUsefulText(
      profileFullName,
      profile?.client.fullName,
      cachedFullName,
      cachedUser?.username,
      profile?.user.username,
      profile?.client.email,
      profile?.user.email,
    ) ?? 'Cliente LJM';
  const memberCode = resolveMemberCode(profile?.client.memberCode, profile?.client.id) ?? getCachedMemberCode();
  const cachedLoyalty = cachedUser?.cliente?.loyaltyTier;
  const rawLoyaltyLabel = pickUsefulText(profile?.loyalty.label, profile?.loyalty.tier, cachedLoyalty);
  const loyaltyLabel = rawLoyaltyLabel ? tierLabels[rawLoyaltyLabel] ?? rawLoyaltyLabel : 'Explorador';
  return (
    <div className="bg-[#132345] rounded-xl p-8 border border-white/5 relative overflow-hidden group shadow-2xl">
      <div className="flex flex-col items-center text-center space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Bienvenido/a de vuelta,<br />
            {displayName}
          </h1>
          <p className="text-[#d4af37] font-semibold uppercase tracking-widest text-[10px] mt-2">
            {loyaltyLabel}
          </p>
          <div className="mt-4 rounded-lg border border-[#d4af37]/20 bg-[#0e1a34]/70 px-4 py-3">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">ID de miembro</p>
            <p className="mt-1 font-mono text-sm font-bold text-[#eacea9]">
              {memberCode ?? 'Pendiente'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
