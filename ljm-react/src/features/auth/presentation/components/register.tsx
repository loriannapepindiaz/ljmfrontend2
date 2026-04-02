// src/pages/Register.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Lock, Shield } from 'lucide-react';

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
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      await new Promise(resolve => setTimeout(resolve, 1800));
      setShowToast(true);
      setTimeout(() => navigate('/'), 2800);
    } catch {
      setErrors({ general: 'Something went wrong. Please try again.' });
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
            Registration Successful!
          </p>
          <p style={{
            fontSize: '0.72rem',
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.05em',
          }}>
            Welcome aboard. Redirecting...
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
            <h1 className="welcome-cursive italic whitespace-nowrap text-4xl md:text-5xl mb-2">
              Create Your Account
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
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#eacea9]/50 w-5 h-5" />
                  <input
                    name="fullName"
                    type="text"
                    placeholder="Enter your full name"
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
                  Email
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
                    Password
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
                    Confirm Password
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
                    PROCESSING...
                  </>
                ) : (
                  'COMPLETE REGISTRATION'
                )}
              </button>

            </form>
          </div>

          {/* FOOTER */}
          <div className="mt-8 flex flex-col items-center gap-2 text-[11px] tracking-[0.3em] text-[#eacea9]/60 font-subtitle">
            <span>Already have an account?</span>
            <Link
              to="/home"
              className="text-[#eacea9]/60 hover:text-[#eacea9] transition-colors relative pb-1
                         after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2
                         after:w-0 after:h-[1px] after:bg-[#eacea9]
                         after:transition-all after:duration-300 after:ease-out
                         hover:after:w-full"
            >
              SIGN IN
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}