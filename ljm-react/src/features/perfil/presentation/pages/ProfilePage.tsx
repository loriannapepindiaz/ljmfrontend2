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
      {/* El Navbar suele ser 'fixed' o 'sticky', por eso tapa el contenido */}
      <Navbar />
      
      {/* ✅ Agregamos 'pt-24' o 'pt-28' para empujar todo hacia abajo del Navbar */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-16 pt-28 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Columna Izquierda */}
          <div className="lg:col-span-4 space-y-6">
            <ProfileCard />
            <LoyaltyStatus />
          </div>

          {/* Columna Derecha */}
          <div className="lg:col-span-8">
            <TravelHistory />

            {/* Curated Recommendation */}
            <div className="mt-8 bg-[#132345] rounded-xl p-8 border border-[#eacea9]/10 flex flex-col md:flex-row items-center gap-8 shadow-inner">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#eacea9] mb-2 font-serif">Curated for Your Next Adventure</h3>
                <p className="text-slate-400 text-sm">Based on your love for Mediterranean culture, we recommend the 'Adriatic Gems' voyage.</p>
                <button className="mt-6 text-[#d4af37] border-b border-[#d4af37]/40 pb-1 text-sm font-bold hover:border-[#d4af37] transition-all">
                  Explore Recommendation
                </button>
              </div>
              <div className="size-32 rounded-lg rotate-3 overflow-hidden shadow-2xl border-4 border-white/10 shrink-0">
                <img src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=200" className="w-full h-full object-cover" alt="Venice" />
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfilePage;