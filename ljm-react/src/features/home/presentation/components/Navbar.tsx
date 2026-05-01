import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authApi, type AuthUser } from "../../../../lib/api";

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

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  return (
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
          <Link
            to="/"
            className="text-sm font-medium tracking-wide text-pearl-beige transition-colors hover:text-primary"
          >
            INICIO
          </Link>

          <Link
            to="/destinations"
            className="text-sm font-medium tracking-wide text-pearl-beige transition-colors hover:text-primary"
          >
            DESTINOS
          </Link>

          <Link
            to="/fleet"
            className="text-sm font-medium tracking-wide text-pearl-beige transition-colors hover:text-primary"
          >
            LA FLOTA
          </Link>

          <Link
            to="/experiences"
            className="text-sm font-medium tracking-wide text-pearl-beige transition-colors hover:text-primary"
          >
            EXPERIENCIAS
          </Link>

          <Link
            to="/offers"
            className="text-sm font-medium tracking-wide text-pearl-beige transition-colors hover:text-primary"
          >
            OFERTAS
          </Link>
        </div>

        <div className="ml-auto hidden items-center gap-6 md:flex">
          <Link
            to="/destinations"
            className="rounded-full bg-primary px-7 py-2.5 text-sm font-bold tracking-widest text-white shadow-lg transition-all hover:bg-luxury-gold"
          >
            RESERVAR AHORA
          </Link>

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
            <Link
              to="/"
              onClick={closeMenu}
              className="block rounded-lg px-2 py-2 text-pearl-beige transition-colors hover:text-primary"
            >
              INICIO
            </Link>

            <Link
              to="/destinations"
              onClick={closeMenu}
              className="block rounded-lg px-2 py-2 text-pearl-beige transition-colors hover:text-primary"
            >
              DESTINOS
            </Link>

            <Link
              to="/fleet"
              onClick={closeMenu}
              className="block rounded-lg px-2 py-2 text-pearl-beige transition-colors hover:text-primary"
            >
              LA FLOTA
            </Link>

            <Link
              to="/experiences"
              onClick={closeMenu}
              className="block rounded-lg px-2 py-2 text-pearl-beige transition-colors hover:text-primary"
            >
              EXPERIENCIAS
            </Link>

            <Link
              to="/offers"
              onClick={closeMenu}
              className="block rounded-lg px-2 py-2 text-pearl-beige transition-colors hover:text-primary"
            >
              OFERTAS
            </Link>

            <Link
              to="/destinations"
              onClick={closeMenu}
              className="mt-2 block w-full rounded-full bg-primary px-6 py-3 text-center text-sm font-bold tracking-widest text-white transition-all hover:bg-luxury-gold"
            >
              RESERVAR AHORA
            </Link>

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
  );
};

export default Navbar;
