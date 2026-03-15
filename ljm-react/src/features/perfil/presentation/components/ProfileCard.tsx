// src/features/perfil/presentation/components/ProfileCard.tsx
import React from 'react';

const ProfileCard: React.FC = () => {
  return (
    <div className="bg-[#132345] rounded-xl p-8 border border-white/5 relative overflow-hidden group shadow-2xl">
      {/* 1. SE ELIMINÓ EL SELLO DE VERIFICADO QUE ESTABA AQUÍ */}
      
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="relative">
          <div className="size-28 rounded-full border-4 border-[#d4af37]/30 p-1">
            <div 
              className="w-full h-full rounded-full bg-[#0e1a34] flex items-center justify-center text-4xl font-bold text-[#eacea9] shadow-inner bg-cover bg-center"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200')` }}
            >
            </div>
          </div>
          {/* 2. SE ELIMINÓ EL CÍRCULO DORADO CON LA ESTRELLA QUE ESTABA AQUÍ */}
        </div>
        
        <div>
          <h1 className="text-2xl font-bold text-white">Welcome back,<br/>Antonia Robles</h1>
          <p className="text-[#d4af37] font-semibold uppercase tracking-widest text-[10px] mt-2">Elite Member Status</p>
          <p className="text-slate-500 text-xs mt-1 font-mono">ID: #LJM-882910</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;