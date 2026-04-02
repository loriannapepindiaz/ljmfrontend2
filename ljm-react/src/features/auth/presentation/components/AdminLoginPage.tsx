import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de acceso al portal de administración de LJM SEALINE
    console.log("Accediendo al panel administrativo de LJM SEALINE...");
    navigate('/dashboard'); 
  };

  return (
    <div className="bg-[#050a14] text-slate-100 min-h-screen relative overflow-hidden flex flex-col font-['Public_Sans']">
      
      {/* Estilos internos para eliminar el ojo nativo de Edge/Chrome */}
      <style>{`
        input[type="password"]::-ms-reveal,
        input[type="password"]::-ms-clear {
          display: none;
          width: 0;
          height: 0;
        }
      `}</style>

      {/* Background Image with Blur & Overlay */}
      <div className="absolute inset-0 z-0 scale-110">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050a14]/60 to-[#050a14]/90 z-10"></div>
        <img 
          alt="Luxury cruise background" 
          className="w-full h-full object-cover filter blur-sm grayscale-[20%] brightness-[0.3]" 
          src="https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=2070&auto=format&fit=crop" 
        />
      </div>

      {/* Header Section con Logo y Texto Dorado */}
      <header className="relative z-30 flex items-center justify-between px-6 py-6 md:px-12 w-full">
        <div className="flex items-center gap-4">
          {/* Logo cargado desde la carpeta public */}
          <img 
            src="/logo.png" 
            alt="LJM Sealine Logo"
            className="w-10 h-10 md:w-12 md:h-12 object-contain" 
          />
          
          {/* Texto de la marca en Dorado (#eacea9) */}
          <span className="font-['Playfair_Display'] text-lg md:text-xl font-bold tracking-tight text-[#eacea9] uppercase">
            LJM SEALINE
          </span>
        </div>
        <div className="hidden md:block">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#eacea9]/70 font-semibold">
            SECURITY PROTOCOL 4.0
          </span>
        </div>
      </header>

      <main className="relative z-20 flex-1 w-full flex flex-col items-center justify-center px-6 pb-12">
        {/* Heading Section */}
        <div className="text-center mb-10">
          <p className="text-[#eacea9]/80 text-[10px] uppercase tracking-[0.4em] font-medium mb-3">LJM SEALINE</p>
          <h1 className="font-['Playfair_Display'] text-5xl md:text-6xl text-white mb-4 font-normal tracking-tight">
            Admin Portal
          </h1>
          <p className="text-slate-400 text-xs md:text-sm font-light uppercase tracking-[0.2em]">
            LUXURY FLEET MANAGEMENT
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#0f1a34]/40 backdrop-blur-[20px] border border-white/10 w-full max-w-lg p-8 md:p-12 rounded-2xl shadow-2xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Username Field */}
            <div className="flex flex-col gap-2">
              <label className="text-[#eacea9]/90 text-xs font-semibold uppercase tracking-wider pl-1">
                ADMIN IDENTITY
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#eacea9]/50">
                  <span className="material-symbols-outlined text-xl">person</span>
                </div>
                <input 
                  type="text"
                  className="w-full bg-slate-900/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#eacea9]/40 focus:border-[#eacea9]/40 transition-all placeholder:text-slate-600" 
                  placeholder="Username or ID" 
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[#eacea9]/90 text-xs font-semibold uppercase tracking-wider">
                  ACCESS KEY
                </label>
                {/* Se eliminó el botón de REQUEST RESET aquí */}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#eacea9]/50">
                  <span className="material-symbols-outlined text-xl">lock</span>
                </div>
                <input 
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-slate-900/40 border border-white/10 rounded-xl py-4 pl-12 pr-12 text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#eacea9]/40 focus:border-[#eacea9]/40 transition-all placeholder:text-slate-600" 
                  placeholder="••••••••" 
                />
                {/* Botón de visibilidad Dorado funcional */}
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#eacea9]/30 hover:text-[#eacea9] transition-colors"
                >
                  <span className="material-symbols-outlined text-xl">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-3 px-1">
              <input 
                id="remember" 
                type="checkbox"
                className="w-4 h-4 rounded bg-slate-900 border-white/10 text-[#eacea9] focus:ring-[#eacea9]/40 focus:ring-offset-0 cursor-pointer" 
              />
              <label htmlFor="remember" className="text-xs text-slate-400 cursor-pointer select-none font-light">
                Secure session for 8 hours
              </label>
            </div>

            {/* Sign In Button */}
            <button 
              type="submit"
              className="w-full bg-[#eacea9] hover:bg-[#f2dfc5] text-[#0e1a34] font-bold py-4 rounded-xl transition-all transform active:scale-[0.99] shadow-lg shadow-black/20 text-sm uppercase tracking-widest mt-4"
            >
              SIGN IN TO CONSOLE
            </button>
          </form>
        </div>

        {/* Footer Links */}
        <div className="mt-12 flex justify-center gap-8 text-[10px] text-slate-500 uppercase tracking-[0.2em] font-medium">
          <button className="hover:text-[#eacea9] transition-colors">SUPPORT</button>
          <button className="hover:text-[#eacea9] transition-colors">DOCUMENTATION</button>
          <button className="hover:text-[#eacea9] transition-colors">STATUS</button>
        </div>
      </main>
    </div>
  );
};

export default AdminLoginPage;