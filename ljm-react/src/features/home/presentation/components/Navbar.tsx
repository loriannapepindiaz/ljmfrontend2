import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi, setPostAuthRedirect, type AuthUser } from "../../../../lib/api";

const getCachedUser = (): AuthUser | null => {
  try {
    const rawUser = localStorage.getItem("ljm_auth_user");
    return rawUser ? (JSON.parse(rawUser) as AuthUser) : null;
  } catch {
    return null;
  }
};

const getStoredToken = () => localStorage.getItem("ljm_auth_token");

const getInitials = (user: AuthUser | null) => {
  if (!user) return "";

  const firstName = user.cliente?.nombre?.trim();
  const lastName = user.cliente?.apellido?.trim();

  if (firstName || lastName) {
    return `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();
  }

  const fallback = user.email ?? user.username ?? "";
  return fallback.slice(0, 2).toUpperCase();
};

const ReservePromptModal = ({
  isOpen,
  onClose,
  onLogin,
  onRegister,
}: {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onRegister: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[70] bg-[#020817]/70 backdrop-blur-md" onClick={onClose} />
      <div className="fixed inset-x-4 top-1/2 z-[80] mx-auto w-full max-w-xl -translate-y-1/2 overflow-hidden rounded-[2rem] border border-[#eacea9]/20 bg-[linear-gradient(145deg,rgba(8,18,36,0.98),rgba(14,26,52,0.96))] shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#eacea91a,transparent_45%)]" />
        <div className="relative p-8 md:p-10">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="mb-2 text-[10px] font-bold tracking-[0.35em] text-[#eacea9]/80 uppercase">
                LJM SEALINE
              </p>
              <h3 className="text-3xl font-display text-white">Tu travesía empieza con tu cuenta</h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-white/70">
                Para reservar y enviarte una experiencia personalizada, primero necesitas iniciar sesión o crear tu cuenta.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

              <div className="mb-7 rounded-[1.5rem] border border-[#eacea9]/15 bg-white/5 p-5">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center">
                    <img
                      src="/logo.png"
                      alt="LJM Sealine"
                      className="h-14 w-14 object-contain drop-shadow-[0_0_16px_rgba(234,202,169,0.45)]"
                    />
                  </div>
                  <div>
                <p className="text-sm font-semibold tracking-wide text-white">Después de entrar te llevamos a destinos</p>
                <p className="mt-1 text-xs leading-5 text-white/60">
                  Así podrás seguir directo con tu reserva sin perder el paso que querías hacer.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onLogin}
              className="flex-1 rounded-xl bg-[#c5a059] px-6 py-3 text-sm font-bold uppercase tracking-[0.25em] text-[#0e1a34] transition hover:bg-[#d8b26a]"
            >
              Iniciar sesión
            </button>
            <button
              type="button"
              onClick={onRegister}
              className="flex-1 rounded-xl border border-[#eacea9]/35 bg-white/5 px-6 py-3 text-sm font-bold uppercase tracking-[0.25em] text-white transition hover:bg-white/10"
            >
              Crear cuenta
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showReservePrompt, setShowReservePrompt] = useState(false);
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => getCachedUser());
  const userInitials = getInitials(currentUser);
  const isLoggedIn = Boolean(userInitials);

  useEffect(() => {
    const token = getStoredToken();

    if (!token) {
      setCurrentUser(null);
      return;
    }

    let isMounted = true;

    authApi
      .me(token)
      .then(({ user }) => {
        if (!isMounted) return;
        localStorage.setItem("ljm_auth_user", JSON.stringify(user));
        setCurrentUser(user);
      })
      .catch(() => {
        if (!isMounted) return;
        localStorage.removeItem("ljm_auth_token");
        localStorage.removeItem("ljm_auth_user");
        setCurrentUser(null);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen((current) => !current);

  const handleReserveNow = () => {
    if (isLoggedIn) {
      navigate("/destinations");
      closeMenu();
      return;
    }

    setShowReservePrompt(true);
    closeMenu();
  };

  const goToAuthRoute = (path: "/login" | "/register") => {
    setPostAuthRedirect("/destinations");
    setShowReservePrompt(false);
    navigate(path);
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-background-dark font-sans">
        <div className="container mx-auto flex items-center px-4 py-4">
          <Link to="/" className="flex items-center gap-2.5" onClick={closeMenu}>
            <img
              src="/logo.png"
              alt="LJM Sealine Logo"
              className="h-9 w-auto object-contain"
            />
          </Link>

          <div className="hidden flex-1 items-center justify-center gap-6 md:flex">
            <Link to="/" className="text-sm font-medium tracking-wide text-pearl-beige transition-colors hover:text-primary">
              INICIO
            </Link>
            <Link to="/destinations" className="text-sm font-medium tracking-wide text-pearl-beige transition-colors hover:text-primary">
              DESTINOS
            </Link>
            <Link to="/fleet" className="text-sm font-medium tracking-wide text-pearl-beige transition-colors hover:text-primary">
              LA FLOTA
            </Link>
            <Link to="/experiences" className="text-sm font-medium tracking-wide text-pearl-beige transition-colors hover:text-primary">
              EXPERIENCIAS
            </Link>
            <Link to="/offers" className="text-sm font-medium tracking-wide text-pearl-beige transition-colors hover:text-primary">
              OFERTAS
            </Link>
          </div>

          <div className="ml-auto hidden items-center gap-6 md:flex">
            <button
              type="button"
              onClick={handleReserveNow}
              className="rounded-full bg-primary px-7 py-2.5 text-sm font-bold tracking-widest text-white shadow-lg transition-all hover:bg-luxury-gold"
            >
              RESERVAR AHORA
            </button>

            {isLoggedIn ? (
              <Link
                to="/perfil"
                aria-label="Abrir perfil"
                className="flex size-11 items-center justify-center rounded-full border border-pearl-beige/40 bg-[#0e1a34] text-sm font-bold tracking-widest text-pearl-beige shadow-lg transition-all hover:border-primary hover:text-primary"
              >
                {userInitials}
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-sm font-medium tracking-widest text-pearl-beige transition-colors hover:text-primary"
              >
                INICIAR SESION
              </Link>
            )}
          </div>

          <button
            className="ml-auto text-pearl-beige md:hidden"
            onClick={toggleMenu}
            aria-label={isOpen ? "Cerrar menu" : "Abrir menu"}
            type="button"
          >
            <span className="material-symbols-outlined">{isOpen ? "close" : "menu"}</span>
          </button>
        </div>

        {isOpen && (
          <div className="border-t border-pearl-beige/10 bg-background-dark p-4 md:hidden">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-2">
              <Link to="/" onClick={closeMenu} className="block rounded-lg px-2 py-2 text-pearl-beige transition-colors hover:text-primary">
                INICIO
              </Link>
              <Link to="/destinations" onClick={closeMenu} className="block rounded-lg px-2 py-2 text-pearl-beige transition-colors hover:text-primary">
                DESTINOS
              </Link>
              <Link to="/fleet" onClick={closeMenu} className="block rounded-lg px-2 py-2 text-pearl-beige transition-colors hover:text-primary">
                LA FLOTA
              </Link>
              <Link to="/experiences" onClick={closeMenu} className="block rounded-lg px-2 py-2 text-pearl-beige transition-colors hover:text-primary">
                EXPERIENCIAS
              </Link>
              <Link to="/offers" onClick={closeMenu} className="block rounded-lg px-2 py-2 text-pearl-beige transition-colors hover:text-primary">
                OFERTAS
              </Link>

              <button
                type="button"
                onClick={handleReserveNow}
                className="mt-2 block w-full rounded-full bg-primary px-6 py-3 text-center text-sm font-bold tracking-widest text-white transition-all hover:bg-luxury-gold"
              >
                RESERVAR AHORA
              </button>

              {isLoggedIn ? (
                <Link
                  to="/perfil"
                  onClick={closeMenu}
                  className="mx-auto mt-3 flex size-11 items-center justify-center rounded-full border border-pearl-beige/40 bg-[#0e1a34] text-sm font-bold tracking-widest text-pearl-beige transition-all hover:border-primary hover:text-primary"
                >
                  {userInitials}
                </Link>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="block w-full rounded-lg px-2 pt-4 text-center text-sm font-medium tracking-widest text-pearl-beige transition-colors hover:text-primary"
                >
                  INICIAR SESION
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      <ReservePromptModal
        isOpen={showReservePrompt}
        onClose={() => setShowReservePrompt(false)}
        onLogin={() => goToAuthRoute("/login")}
        onRegister={() => goToAuthRoute("/register")}
      />
    </>
  );
};

export default Navbar;
