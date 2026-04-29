// LoginPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Lock } from 'lucide-react';
import { authApi, persistAuthSession } from '../../../../lib/api';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    setError('');

    if (!username.trim() || !password) {
      setError('Ingrese su usuario y contraseña.');
      return;
    }

    setIsLoading(true);

    try {
      const session = await authApi.login({ username, password });
      persistAuthSession(session);
      navigate('/home');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo iniciar sesión.');
    } finally {
      setIsLoading(false);
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#030712] p-6 text-white">

      {/* FONDO */}
      <div className="absolute inset-0 z-0">
        <div className="h-full w-full bg-[radial-gradient(circle_at_center,#1a2b4b_0%,#0a1224_60%,#030712_100%)]" />
      </div>

      {/* CONTENEDOR */}
      <div className="relative z-10 flex w-full max-w-112.5 flex-col items-center">

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
          <h1 className="login-user-title whitespace-nowrap mb-2">
            Bienvenido a Bordo
          </h1>

          <h2 className="text-xs md:text-sm tracking-[0.35em] text-[#eacea9]/70 italic font-subtitle">
            Excelencia en todos los horizontes
          </h2>
        </div>

        {/* FORM */}
        <div className="w-full rounded-3xl bg-[#0a1224]/80 p-10 backdrop-blur-xl border border-white/5 shadow-2xl shadow-black/60">
          <div className="flex flex-col gap-6">
            {error && (
              <div className="rounded-xl bg-red-500/20 p-3 text-center text-xs text-red-300 tracking-wide font-subtitle">
                {error}
              </div>
            )}

            {/* USERNAME */}
            <div>
              <label className="pb-2 block text-[11px] tracking-[0.2em] text-[#eacea9]/80 font-subtitle">
                Usuario
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#eacea9]/50 w-5 h-5" />
                <input
                  className="h-14 w-full rounded-xl border border-white/10 bg-black/30 p-4 pl-12 text-white placeholder:text-white/20 focus:border-[#eacea9]/40 focus:outline-none"
                  placeholder="Ingrese su usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="pb-2 block text-[11px] tracking-[0.2em] text-[#eacea9]/80 font-subtitle">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#eacea9]/50 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="h-14 w-full rounded-xl border border-white/10 bg-black/30 p-4 pl-12 pr-12 text-white placeholder:text-white/20 focus:border-[#eacea9]/40 focus:outline-none"
                  placeholder="Ingrese su contraseña"
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

            {/* BOTÓN SIGN IN */}
            <button
              onClick={handleSignIn}
              disabled={isLoading}
              className="mt-4 h-14 rounded-xl
                         bg-[#cbb07a]
                         text-[#0a1224]
                         text-sm uppercase
                         tracking-[0.4em]
                         font-action
                         transition-transform duration-150 ease-in-out
                         hover:-translate-y-px
                         active:translate-y-px
                         active:scale-[0.99]
                         disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? 'PROCESANDO...' : 'INICIAR SESIÓN'}
            </button>

          </div>
        </div>

        {/* LINKS INFERIORES */}
        <div className="mt-8 flex flex-col items-center gap-3 text-[11px] tracking-[0.3em] font-subtitle">

          {/* Nuevo: ¿No tienes cuenta? Regístrate */}
          <button 
            onClick={goToRegister}
            className="text-[#eacea9]/60 hover:text-[#eacea9] transition-colors flex items-center gap-1"
          >
            ¿No tienes cuenta? 
            <span className="text-[#cbb07a] font-medium underline underline-offset-4 hover:no-underline">
              Regístrate
            </span>
          </button>

        </div>

      </div>
    </div>
  );
}
