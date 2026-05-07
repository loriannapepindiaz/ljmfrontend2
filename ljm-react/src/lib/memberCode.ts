export const buildMemberCode = (clientId: number | string | null | undefined) => {
  const normalizedId = Number(clientId);

  if (!Number.isInteger(normalizedId) || normalizedId <= 0) {
    return null;
  }

  return `LJM-${String(normalizedId).padStart(6, '0')}`;
};

export const resolveMemberCode = (
  memberCode: string | null | undefined,
  clientId: number | string | null | undefined,
) => {
  const cleanMemberCode = memberCode?.trim();

  return cleanMemberCode || buildMemberCode(clientId);
};
