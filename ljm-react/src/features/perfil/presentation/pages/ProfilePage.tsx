// src/features/perfil/presentation/pages/ProfilePage.tsx
import React, { useEffect, useState } from 'react';
import Navbar from '../../../home/presentation/components/Navbar';
import Footer from '../../../home/presentation/components/Footer';
import ProfileCard from '../components/ProfileCard';
import LoyaltyStatus from '../components/LoyaltyStatus';
import TravelHistory from '../components/TravelHistory';
import { getLocalProfileData, profileApi, type ProfileData } from '../profileData';

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(() => getLocalProfileData());
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const syncCachedUser = (nextProfile: ProfileData) => {
    try {
      const rawUser = localStorage.getItem('ljm_auth_user');
      if (!rawUser) return;
      const cachedUser = JSON.parse(rawUser);
      const cachedEmail = cachedUser?.cliente?.email ?? cachedUser?.email ?? null;
      const nextEmail = nextProfile.client.email ?? nextProfile.user.email ?? cachedEmail;
      localStorage.setItem(
        'ljm_auth_user',
        JSON.stringify({
          ...cachedUser,
          email: nextEmail,
          username: nextProfile.user.username,
          cliente: {
            ...cachedUser.cliente,
            id: nextProfile.client.id,
            nombre: nextProfile.client.firstName,
            apellido: nextProfile.client.lastName,
            email: nextEmail,
            memberCode: nextProfile.client.memberCode,
            loyaltyTier: nextProfile.loyalty.tier ?? nextProfile.loyalty.label,
          },
        }),
      );
      if (nextEmail) {
        localStorage.setItem('ljm_auth_email', nextEmail);
      }
    } catch {
      // Local cache is best-effort; the backend response remains the source of truth.
    }
  };

  const loadProfile = () => {
    const localProfile = getLocalProfileData();

    setProfile((currentProfile) => currentProfile ?? localProfile);
    setIsLoading(true);
    setError(null);

    profileApi.current()
      .then((response) => {
        setProfile(response.data);
        syncCachedUser(response.data);
      })
      .catch((requestError) => {
        setProfile((currentProfile) => currentProfile ?? localProfile);
        setError(requestError instanceof Error ? requestError.message : 'No se pudo cargar el perfil.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const updateEmail = async (email: string) => {
    setIsSaving(true);
    setError(null);

    try {
      const response = await profileApi.update({ email });
      setProfile(response.data);
      syncCachedUser(response.data);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'No se pudo actualizar el perfil.');
      throw requestError;
    } finally {
      setIsSaving(false);
    }
  };

  const updatePreferences = async (preferenceIds: Array<string | number>) => {
    setIsSaving(true);
    setError(null);

    try {
      const response = await profileApi.update({ preferenceIds });
      setProfile(response.data);
      syncCachedUser(response.data);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'No se pudieron guardar las preferencias.');
      throw requestError;
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-[#0e1a34] min-h-screen text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-16 pt-28 pb-12">
        {error ? (
          <div className="mb-8 rounded-xl border border-red-300/20 bg-red-500/10 px-5 py-4 text-sm text-red-100">
            {error}
          </div>
        ) : null}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <ProfileCard profile={profile} isLoading={isLoading} />
            <LoyaltyStatus
              profile={profile}
              isLoading={isLoading}
              isSaving={isSaving}
              onUpdateEmail={updateEmail}
              onUpdatePreferences={updatePreferences}
            />
          </div>

          <div className="lg:col-span-8">
            <TravelHistory profile={profile} isLoading={isLoading} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;
