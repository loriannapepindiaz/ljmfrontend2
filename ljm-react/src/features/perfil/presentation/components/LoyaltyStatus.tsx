// src/features/perfil/presentation/components/LoyaltyStatus.tsx
import React, { useState } from 'react';

const LoyaltyStatus: React.FC = () => {
  // 1. Opciones de preferencias premium
  const availablePreferences = [
    "Ocean View", "Gourmet Dining", "Spa Lover", "Suite Butler", 
    "Wine Tasting", "Private Balcony", "Shore Excursions", 
    "Midnight Buffet", "Fitness Center", "Live Jazz"
  ];

  // 2. Estados para la edición y persistencia
  const [isEditing, setIsEditing] = useState(false);
  const [email, setEmail] = useState("a.robles@elite-travel.com");
  const [tempEmail, setTempEmail] = useState(email);
  
  const [selectedPrefs, setSelectedPrefs] = useState(["Ocean View", "Gourmet Dining", "Spa Lover"]);
  const [tempPrefs, setTempPrefs] = useState([...selectedPrefs]);
  
  const [showModal, setShowModal] = useState(false);

  // 3. Handlers de lógica
  const handleEditClick = () => {
    setTempEmail(email);
    setTempPrefs([...selectedPrefs]);
    setIsEditing(true);
  };

  const togglePreference = (pref: string) => {
    if (tempPrefs.includes(pref)) {
      setTempPrefs(tempPrefs.filter(p => p !== pref));
    } else {
      setTempPrefs([...tempPrefs, pref]);
    }
  };

  const handleSaveAttempt = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  const confirmSave = () => {
    setEmail(tempEmail);
    setSelectedPrefs(tempPrefs);
    setIsEditing(false);
    setShowModal(false);
  };

  return (
    <div className="space-y-6 relative">
      
      {/* --- SECCIÓN LOYALTY PROGRAM --- */}
      <div className="bg-[#132345] rounded-xl p-6 border border-white/5 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-bold text-sm flex items-center gap-2 font-serif">
            <span className="material-symbols-outlined text-[#d4af37] text-xl">workspace_premium</span>
            Loyalty Program
          </h3>
          <span className="text-[#d4af37] text-[9px] font-bold px-2 py-1 rounded bg-[#d4af37]/10 border border-[#d4af37]/20 uppercase tracking-widest">
            Diamond Progress
          </span>
        </div>

        <div className="space-y-4">
          {/* Barra de Progreso */}
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] uppercase tracking-tighter">
              <span className="text-slate-400 font-medium">Status: Platinum Elite</span>
              <span className="text-[#eacea9] font-bold">75%</span>
            </div>
            <div className="h-1.5 w-full bg-[#0e1a34] rounded-full overflow-hidden border border-white/5">
              <div 
                className="h-full bg-gradient-to-r from-[#eacea9] to-[#d4af37] shadow-[0_0_10px_rgba(212,175,55,0.3)]" 
                style={{ width: '75%' }}
              ></div>
            </div>
          </div>

          {/* Mensaje de la Luna (Noches restantes) */}
          <div className="flex items-start gap-3 bg-white/5 p-3 rounded-lg border border-white/5">
            <div className="bg-[#eacea9]/10 p-1.5 rounded-md">
              <span className="material-symbols-outlined text-[#eacea9] text-lg">bedtime</span>
            </div>
            <p className="text-[10px] text-slate-300 leading-relaxed italic">
              Solo te faltan <span className="text-[#eacea9] font-bold">6 noches más</span> para alcanzar el nivel <span className="text-white font-bold uppercase tracking-tighter">Diamond</span> y desbloquear el servicio de mayordomo privado.
            </p>
          </div>
        </div>
      </div>

      {/* --- SECCIÓN PERSONAL DETAILS --- */}
      <div className="bg-[#132345] rounded-xl p-6 border border-white/5 shadow-xl">
        <div className="flex items-center justify-between mb-6">
           <h3 className="text-white font-bold text-sm font-serif italic">Personal Details</h3>
           {!isEditing && (
             <span 
              onClick={handleEditClick}
              className="material-symbols-outlined text-slate-500 text-sm cursor-pointer hover:text-[#eacea9] transition-colors"
             >edit_square</span>
           )}
        </div>

        <form onSubmit={handleSaveAttempt} className="space-y-6">
          {/* Email */}
          <div>
            <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mb-2">Email Address</p>
            {isEditing ? (
              <input 
                type="email"
                value={tempEmail}
                onChange={(e) => setTempEmail(e.target.value)}
                className="w-full bg-[#0e1a34] border border-[#eacea9]/20 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37] transition-all"
              />
            ) : (
              <p className="text-xs text-slate-200 font-medium">{email}</p>
            )}
          </div>

          {/* My Preferences */}
          <div>
            <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mb-3">My Preferences</p>
            
            {isEditing ? (
              <div className="bg-[#0e1a34] p-4 rounded-xl border border-[#eacea9]/10 grid grid-cols-2 gap-2 animate-in fade-in zoom-in-95 duration-300">
                {availablePreferences.map(pref => (
                  <div 
                    key={pref}
                    onClick={() => togglePreference(pref)}
                    className={`cursor-pointer px-3 py-2 rounded-lg text-[10px] font-medium transition-all border flex items-center justify-between
                      ${tempPrefs.includes(pref) 
                        ? 'bg-[#eacea9]/10 border-[#eacea9]/40 text-[#eacea9]' 
                        : 'bg-transparent border-white/5 text-slate-500 hover:border-white/20'}`}
                  >
                    {pref}
                    {tempPrefs.includes(pref) && <span className="material-symbols-outlined text-[12px]">check_circle</span>}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {selectedPrefs.map(tag => (
                  <span key={tag} className="text-[10px] bg-[#0e1a34] text-[#eacea9] px-3 py-1 rounded-full border border-[#eacea9]/10 font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Botones de acción al editar */}
          {isEditing && (
            <div className="flex gap-2 pt-2 animate-in slide-in-from-bottom-2 duration-300">
              <button 
                type="submit" 
                className="flex-1 bg-[#d4af37] text-[#0e1a34] text-[10px] font-bold py-2.5 rounded-lg hover:brightness-110 uppercase tracking-widest transition-all"
              >
                Update Profile
              </button>
              <button 
                type="button" 
                onClick={() => setIsEditing(false)} 
                className="flex-1 bg-white/5 text-white text-[10px] font-bold py-2.5 rounded-lg hover:bg-white/10 border border-white/10 uppercase tracking-widest transition-all"
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>

      {/* --- MODAL DE CONFIRMACIÓN --- */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#0e1a34]/80 backdrop-blur-md animate-in fade-in duration-300"></div>
          <div className="relative bg-[#132345] border border-[#eacea9]/30 rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center animate-in zoom-in-95 duration-300">
            <div className="size-16 bg-[#eacea9]/10 rounded-full flex items-center justify-center mb-6 mx-auto border border-[#eacea9]/20">
              <span className="material-symbols-outlined text-[#eacea9] text-3xl">verified_user</span>
            </div>
            <h4 className="text-xl font-bold text-white mb-2 font-serif uppercase tracking-tight">Confirm Update</h4>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
              ¿Estás seguro de que deseas actualizar la información de tu perfil de miembro Elite?
            </p>
            <div className="space-y-3">
              <button 
                onClick={confirmSave} 
                className="w-full bg-[#d4af37] text-[#0e1a34] font-bold py-3 rounded-xl hover:scale-[1.02] transition-transform shadow-lg shadow-[#d4af37]/20 uppercase tracking-widest"
              >
                CONFIRMAR CAMBIOS
              </button>
              <button 
                onClick={() => setShowModal(false)} 
                className="w-full text-slate-500 font-bold py-2 text-[10px] uppercase tracking-[0.2em] hover:text-white transition-colors"
              >
                Volver atrás
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoyaltyStatus;