// src/features/auth/presentation/pages/RegisterPage.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Lock, Shield } from 'lucide-react';
import { authApi, consumePostAuthRedirect, persistAuthSession } from '../../../../lib/api';

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'El nombre completo es requerido';
    if (!formData.email) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Por favor ingrese un correo válido';
    }
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Por favor confirme su contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const session = await authApi.register(formData);
      persistAuthSession(session, formData.email);
      setShowToast(true);
      setTimeout(() => navigate(consumePostAuthRedirect() ?? '/home'), 1400);
    } catch (err) {
      setErrors({
        general: err instanceof Error ? err.message : 'Algo salió mal. Por favor inténtelo de nuevo.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* ── TOAST DE ÉXITO ── */}
      <div
        style={{
          position: 'fixed',
          top: '1.5rem',
          left: '50%',
          transform: showToast ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(-120%)',
          opacity: showToast ? 1 : 0,
          transition: 'transform 0.45s cubic-bezier(0.34,1.56,0.64,1), opacity 0.35s ease',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '0.85rem',
          background: 'linear-gradient(135deg, #0f1e3a 0%, #0a1224 100%)',
          border: '1px solid rgba(203,176,122,0.35)',
          borderRadius: '1rem',
          padding: '0.85rem 1.5rem',
          boxShadow: '0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(203,176,122,0.1)',
          backdropFilter: 'blur(16px)',
          minWidth: '280px',
          maxWidth: '90vw',
          pointerEvents: 'none',
        }}
      >
        <img
          src="/logo.png"
          alt="LJM Sealine"
          style={{
            width: '36px',
            height: '36px',
            objectFit: 'contain',
            filter: 'drop-shadow(0 0 8px rgba(203,176,122,0.5))',
            flexShrink: 0,
          }}
        />
        <div>
          <p style={{
            fontFamily: 'var(--font-subtitle, inherit)',
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#cbb07a',
            marginBottom: '0.1rem',
          }}>
            ¡Registro Exitoso!
          </p>
          <p style={{
            fontSize: '0.72rem',
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.05em',
          }}>
            Bienvenido a bordo. Redirigiendo...
          </p>
        </div>
        {/* Barra de progreso */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '2px',
          borderRadius: '0 0 1rem 1rem',
          background: 'linear-gradient(90deg, #cbb07a, #eacea9)',
          width: showToast ? '100%' : '0%',
          transition: showToast ? 'width 2.8s linear' : 'none',
        }} />
      </div>

      {/* ── PÁGINA ── */}
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#030712] p-6 text-white">

        {/* FONDO */}
        <div className="absolute inset-0 z-0">
          <div className="h-full w-full bg-[radial-gradient(circle_at_center,_#1a2b4b_0%,#0a1224_60%,#030712_100%)]" />
        </div>

        {/* CONTENEDOR */}
        <div className="relative z-10 flex w-full max-w-[480px] flex-col items-center">

          {/* CABECERA */}
          <div className="mb-6 text-center flex flex-col items-center">
            <img
              src="/logo.png"
              alt="LJM Sealine"
              className="w-24 h-24 mb-2 object-contain drop-shadow-[0_0_15px_rgba(234,202,169,0.5)]"
            />
            <p className="mb-1 text-[10px] tracking-[0.4em] text-[#eacea9]/80 font-subtitle">
              LJM SEALINE
            </p>
            <h1 className="login-user-title whitespace-nowrap mb-2">
              Crea Tu Cuenta
            </h1>
            <h2 className="text-xs md:text-sm tracking-[0.35em] text-[#eacea9]/70 italic font-subtitle">
              Inicia tu travesía exclusiva
            </h2>
          </div>

          {/* FORM CARD */}
          <div className="w-full rounded-3xl bg-[#0a1224]/80 p-8 md:p-10 backdrop-blur-xl border border-white/5 shadow-2xl shadow-black/60">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {errors.general && (
                <div className="rounded-xl bg-red-500/20 p-3 text-center text-xs text-red-300 tracking-wide font-subtitle">
                  {errors.general}
                </div>
              )}

              {/* FULL NAME */}
              <div>
                <label className="pb-2 block text-[11px] tracking-[0.2em] text-[#eacea9]/80 font-subtitle">
                  Nombre Completo
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#eacea9]/50 w-5 h-5" />
                  <input
                    name="fullName"
                    type="text"
                    placeholder="Ingrese su nombre completo"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`h-14 w-full rounded-xl border ${
                      errors.fullName ? 'border-red-400/50' : 'border-white/10'
                    } bg-black/30 p-4 pl-12 text-white placeholder:text-white/20 focus:border-[#eacea9]/40 focus:outline-none transition-colors`}
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-1.5 text-[11px] text-red-400 tracking-wide font-subtitle">{errors.fullName}</p>
                )}
              </div>

              {/* EMAIL */}
              <div>
                <label className="pb-2 block text-[11px] tracking-[0.2em] text-[#eacea9]/80 font-subtitle">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#eacea9]/50 w-5 h-5" />
                  <input
                    name="email"
                    type="email"
                    placeholder="example@luxury.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={`h-14 w-full rounded-xl border ${
                      errors.email ? 'border-red-400/50' : 'border-white/10'
                    } bg-black/30 p-4 pl-12 text-white placeholder:text-white/20 focus:border-[#eacea9]/40 focus:outline-none transition-colors`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-[11px] text-red-400 tracking-wide font-subtitle">{errors.email}</p>
                )}
              </div>

              {/* PASSWORD + CONFIRM */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="pb-2 block text-[11px] tracking-[0.2em] text-[#eacea9]/80 font-subtitle">
                    Contraseña
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#eacea9]/50 w-5 h-5" />
                    <input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      className={`h-14 w-full rounded-xl border ${
                        errors.password ? 'border-red-400/50' : 'border-white/10'
                      } bg-black/30 p-4 pl-12 pr-12 text-white placeholder:text-white/20 focus:border-[#eacea9]/40 focus:outline-none transition-colors`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#eacea9]/50 hover:text-[#eacea9] transition-transform duration-150 active:scale-95"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1.5 text-[11px] text-red-400 tracking-wide font-subtitle">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label className="pb-2 block text-[11px] tracking-[0.2em] text-[#eacea9]/80 font-subtitle">
                    Confirmar Contraseña
                  </label>
                  <div className="relative">
                    <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-[#eacea9]/50 w-5 h-5" />
                    <input
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`h-14 w-full rounded-xl border ${
                        errors.confirmPassword ? 'border-red-400/50' : 'border-white/10'
                      } bg-black/30 p-4 pl-12 pr-12 text-white placeholder:text-white/20 focus:border-[#eacea9]/40 focus:outline-none transition-colors`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#eacea9]/50 hover:text-[#eacea9] transition-transform duration-150 active:scale-95"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1.5 text-[11px] text-red-400 tracking-wide font-subtitle">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>

              {/* BOTÓN */}
              <button
                type="submit"
                disabled={isLoading}
                className={`mt-4 h-14 rounded-xl bg-[#cbb07a] text-[#0a1224] text-sm uppercase tracking-[0.4em] font-action flex items-center justify-center gap-3 transition-transform duration-150 ease-in-out ${
                  isLoading
                    ? 'opacity-70 cursor-not-allowed'
                    : 'hover:-translate-y-[1px] active:translate-y-[1px] active:scale-[0.99]'
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    PROCESANDO...
                  </>
                ) : (
                  'COMPLETAR REGISTRO'
                )}
              </button>

            </form>
          </div>

          {/* FOOTER */}
          <div className="mt-8 flex flex-col items-center gap-2 text-[11px] tracking-[0.3em] text-[#eacea9]/60 font-subtitle">
            <span>¿Ya tienes una cuenta?</span>
            <Link
              to="/login"
              className="text-[#eacea9]/60 hover:text-[#eacea9] transition-colors relative pb-1
                         after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2
                         after:w-0 after:h-[1px] after:bg-[#eacea9]
                         after:transition-all after:duration-300 after:ease-out
                         hover:after:w-full"
            >
              INICIAR SESIÓN
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
