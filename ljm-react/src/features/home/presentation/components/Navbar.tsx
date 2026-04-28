import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

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
            to="/home"
            className="text-sm font-medium tracking-widest text-pearl-beige transition-colors hover:text-primary"
          >
            INICIAR SESION
          </Link>

          <Link
            to="/details-suit"
            className="rounded-full bg-primary px-7 py-2.5 text-sm font-bold tracking-widest text-white shadow-lg transition-all hover:bg-luxury-gold"
          >
            RESERVAR AHORA
          </Link>
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
              to="/home"
              onClick={closeMenu}
              className="block w-full rounded-lg px-2 pt-4 text-center text-sm font-medium tracking-widest text-pearl-beige transition-colors hover:text-primary"
            >
              INICIAR SESION
            </Link>

            <Link
              to="/details-suit"
              onClick={closeMenu}
              className="mt-2 block w-full rounded-full bg-primary px-6 py-3 text-center text-sm font-bold tracking-widest text-white transition-all hover:bg-luxury-gold"
            >
              RESERVAR AHORA
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
