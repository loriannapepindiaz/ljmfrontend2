import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = () => {
    if (username && password) {
      navigate('/home');
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#0a1224] p-4 text-white">
      
      {/* Background Stitch */}
      <div className="absolute inset-0 z-0">
        <img 
          alt="Stitch Background" 
          className="h-full w-full object-cover opacity-20 blur-sm"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDl35n_uemv0W05OMTpbB8WXajcMM4EMYRwXsgrJFcPNmd0KXgwj9CHNymPXiKT7A9NWeO_wF7M-AMvjKoD8LKYSDbin9vAmRPSxnX-b4JuJ_59oDvs0zE-O4_bLhD1y4ym_cHqvGrWvEUOUl3NijWTKdUYm24FpTnV3K2TCDvHjWTTHOnxl7Oz2xG8undoNIMxcSccWxmGgP7irw7ZD_Ly2VS_ZmXp-rDT2dcB4cI-MPXQoW2nYw7mC5YeahbKyVMIoKVGOpW0QzE"
        />
        <div className="absolute inset-0 bg-[#0a1224]/60 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 flex w-full max-w-md flex-col items-center justify-center">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-medium tracking-widest text-[#eacea9]/80 uppercase font-sans">
            LJM SEALINE
          </p>

        <h1
  style={{ fontFamily: "'Playfair Display', serif" }}
  className="text-5xl md:text-6xl text-white"
>
  Welcome Aboard
</h1>


          <h2 className="mt-2 text-base font-normal text-white/80 md:text-lg font-sans">
            Access your voyage management system
          </h2>
        </div>

        {/* Form */}
        <div className="w-full rounded-xl bg-white/5 p-8 backdrop-blur-md border border-white/10 shadow-2xl">
          <div className="flex flex-col gap-6">
            
            {/* Username */}
            <div className="relative flex flex-col">
              <label className="pb-2 text-sm font-medium text-white/90 font-sans">
                Username
              </label>

              <div className="relative">
                <span className="material-symbols-outlined pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/50 text-2xl">
                  person
                </span>

                <input
                  className="form-input h-14 w-full rounded-lg border border-[#eacea9]/20 bg-black/20 p-4 pl-12 text-base text-white placeholder:text-white/40 transition-all focus:border-[#eacea9] focus:outline-none"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div className="relative flex flex-col">
              <label className="pb-2 text-sm font-medium text-white/90 font-sans">
                Password
              </label>

              <div className="relative">
                <span className="material-symbols-outlined pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/50 text-2xl">
                  lock
                </span>

                <input
                  type="password"
                  className="form-input h-14 w-full rounded-lg border border-[#eacea9]/20 bg-black/20 p-4 pl-12 text-base text-white placeholder:text-white/40 transition-all focus:border-[#eacea9] focus:outline-none"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Botón */}
            <button 
              onClick={handleSignIn}
              className="h-14 rounded-lg bg-[#eacea9] px-5 text-base font-bold text-black shadow-lg shadow-[#eacea9]/20 transition-all hover:brightness-110 active:scale-95 font-sans"
            >
              Sign In
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-[#eacea9]/70 underline-offset-4 transition hover:text-[#eacea9] hover:underline font-sans">
          Forgot your password?
        </p>
      </div>
    </div>
  );
}
