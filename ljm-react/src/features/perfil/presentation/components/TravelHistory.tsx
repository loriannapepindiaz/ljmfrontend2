// src/features/perfil/presentation/components/TravelHistory.tsx
import React from 'react';

const TravelHistory: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Upcoming Cruise */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white font-serif">Upcoming Cruise</h2>
          <span className="text-[#d4af37] text-xs font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">schedule</span> 65 days to go
          </span>
        </div>
        <div className="group relative aspect-[21/9] rounded-xl overflow-hidden border border-white/5 shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80&w=1200" 
            className="w-full h-full object-cover" 
            alt="Cruise"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1a34] via-[#0e1a34]/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <p className="text-[#d4af37] text-[10px] font-bold uppercase tracking-widest">Active Booking • SV-8821</p>
              <h3 className="text-3xl font-bold text-white font-serif leading-none">The Majestic Pearl - Mediterranean Odyssey</h3>
              <div className="flex gap-4 pt-2">
                <span className="text-white/70 text-xs flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full"><span className="material-symbols-outlined text-xs">calendar_today</span> Sept 12, 2024</span>
                <span className="text-white/70 text-xs flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full"><span className="material-symbols-outlined text-xs">location_on</span> Barcelona to Athens</span>
              </div>
            </div>
            <button className="bg-[#eacea9] text-[#0e1a34] px-6 py-3 rounded-lg font-bold hover:bg-[#d4af37] transition-all flex items-center gap-2">
              View Details <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </section>

      {/* Past Voyages */}
      <section>
        <h2 className="text-xl font-bold text-white mb-4">Past Voyages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "Grecian Islands Escape", ship: "LJM Royal Sapphire", date: "June 2023", img: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=400" },
            { title: "Caribbean Azure Dreams", ship: "LJM Emerald Horizon", date: "Feb 2023", img: "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80&w=400" }
          ].map((trip, i) => (
            <div key={i} className="bg-[#132345] rounded-xl p-4 border border-white/5 flex gap-4 hover:border-[#eacea9]/30 transition-all">
              <img src={trip.img} className="size-16 rounded-lg object-cover" alt="" />
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex justify-between items-start">
                  <h4 className="text-white font-bold text-sm leading-tight">{trip.title}</h4>
                  <span className="text-[8px] font-bold text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded border border-green-400/20">COMPLETED</span>
                </div>
                <p className="text-[10px] text-slate-400">{trip.ship}</p>
                <p className="text-[10px] text-slate-500 mt-1">{trip.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TravelHistory;