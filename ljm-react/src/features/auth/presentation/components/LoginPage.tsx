import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Lock } from 'lucide-react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = () => {
    if (username && password) {
      navigate('/home');
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#030712] p-6 text-white">

      {/* FONDO */}
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full bg-[radial-gradient(circle_at_center,_#1a2b4b_0%,#0a1224_60%,#030712_100%)]" />
      </div>

      {/* CONTENEDOR */}
      <div className="relative z-10 flex w-full max-w-[450px] flex-col items-center">

        {/* CABECERA */}
        <div className="mb-6 text-center flex flex-col items-center">
          <img
            src="/logo.png"
            alt="LJM Sealine"
            className="w-32 h-32 mb-2 object-contain drop-shadow-[0_0_15px_rgba(234,202,169,0.5)]"
          />

          <p className="mb-1 text-[10px] tracking-[0.4em] text-[#eacea9]/80 font-subtitle">
            LJM SEALINE
          </p>
          <h1 className="welcome-cursive italic whitespace-nowrap text-4xl md:text-5xl mb-2">
            Welcome Aboard
          </h1>

          <h2 className="text-xs md:text-sm tracking-[0.35em] text-[#eacea9]/70 italic font-subtitle">
  Excelencia en todos los horizontes
</h2>

        </div>

        {/* FORM */}
        <div className="w-full rounded-3xl bg-[#0a1224]/80 p-10 backdrop-blur-xl border border-white/5 shadow-2xl shadow-black/60">
          <div className="flex flex-col gap-6">

            {/* USERNAME */}
            <div>
              <label className="pb-2 block text-[11px] tracking-[0.2em] text-[#eacea9]/80 font-subtitle">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#eacea9]/50 w-5 h-5" />
                <input
                  className="h-14 w-full rounded-xl border border-white/10 bg-black/30 p-4 pl-12 text-white placeholder:text-white/20 focus:border-[#eacea9]/40 focus:outline-none"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="pb-2 block text-[11px] tracking-[0.2em] text-[#eacea9]/80 font-subtitle">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#eacea9]/50 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="h-14 w-full rounded-xl border border-white/10 bg-black/30 p-4 pl-12 pr-12 text-white placeholder:text-white/20 focus:border-[#eacea9]/40 focus:outline-none"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
  type="button"
  onClick={() => setShowPassword(!showPassword)}
  className="absolute right-4 top-1/2 -translate-y-1/2
             text-[#eacea9]/50 hover:text-[#eacea9]
             transition-transform duration-150
             active:scale-95"
>
  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
</button>


              </div>
            </div>

            {/* BOTÓN */}
        <button
  onClick={handleSignIn}
  className="mt-4 h-14 rounded-xl
             bg-[#cbb07a]
             text-[#0a1224]
             text-sm uppercase
             tracking-[0.4em]
             font-action
             transition-transform duration-150 ease-in-out
             hover:-translate-y-[1px]
             active:translate-y-[1px]
             active:scale-[0.99]"
>
  SIGN IN
</button>

          </div>
        </div>

        {/* FORGOT */}
        <button className="mt-8 text-[11px] tracking-[0.3em] text-[#eacea9]/60 font-subtitle relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[1px] after:bg-[#eacea9] after:transition-all after:duration-300 after:ease-out hover:text-[#eacea9] hover:after:w-full">
          Olvidaste tu contraseña?
        </button>

      </div>
    </div>
  );
} 