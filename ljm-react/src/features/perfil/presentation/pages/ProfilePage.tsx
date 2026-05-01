// src/features/perfil/presentation/pages/ProfilePage.tsx
import React from 'react';
import Navbar from '../../../home/presentation/components/Navbar';
import Footer from '../../../home/presentation/components/Footer';
import ProfileCard from '../components/ProfileCard';
import LoyaltyStatus from '../components/LoyaltyStatus';
import TravelHistory from '../components/TravelHistory';

const ProfilePage: React.FC = () => {
  return (
    <div className="bg-[#0e1a34] min-h-screen text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-16 pt-28 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <ProfileCard />
            <LoyaltyStatus />
          </div>

          <div className="lg:col-span-8">
            <TravelHistory />

            <div className="mt-8 bg-[#132345] rounded-xl p-8 border border-[#eacea9]/10 shadow-inner">
              <h3 className="text-xl font-bold text-[#eacea9] mb-2 font-serif">Sin recomendacion disponible</h3>
              <p className="text-slate-400 text-sm">
                Las recomendaciones apareceran cuando existan preferencias o historial real del cliente.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;
