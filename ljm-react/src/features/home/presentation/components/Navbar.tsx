import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-background-dark font-sans">
      <div className="container mx-auto px-4 py-4 flex items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <img
            src="/logo.png"
            alt="LJM Sealine Logo"
            className="h-9 w-auto object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-6">
          <Link to="/" className="text-pearl-beige hover:text-primary transition-colors font-medium tracking-wide text-sm">
            INICIO
          </Link>

          <Link to="/destinations" className="text-pearl-beige hover:text-primary transition-colors font-medium tracking-wide text-sm">
            DESTINOS
          </Link>

          <Link to="/fleet" className="text-pearl-beige hover:text-primary transition-colors font-medium tracking-wide text-sm">
            LA FLOTA
          </Link>

          <a href="experiences" className="text-pearl-beige hover:text-primary transition-colors font-medium tracking-wide text-sm">
            EXPERIENCIAS
          </a>

          <a href="offers" className="text-pearl-beige hover:text-primary transition-colors font-medium tracking-wide text-sm">
            OFERTAS
          </a>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-6 ml-auto">
          {/* INICIAR SESIÓN → INICIO */}
          <Link
            to="/home"
            className="text-sm font-medium tracking-widest text-pearl-beige hover:text-primary transition-colors"
          >
            INICIAR SESIÓN
          </Link>

          {/* RESERVAR AHORA */}
          <Link
            to="/details-suit"
            className="bg-primary hover:bg-luxury-gold text-white px-7 py-2.5 rounded-full text-sm font-bold tracking-widest shadow-lg transition-all"
          >
            RESERVAR AHORA
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden ml-auto text-pearl-beige"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background-dark border-t border-pearl-beige/10 p-4 space-y-4">
          <Link to="/" className="block text-pearl-beige hover:text-primary transition-colors">
            INICIO
          </Link>

          <Link to="/destinations" className="block text-pearl-beige hover:text-primary transition-colors">
            DESTINOS
          </Link>

          <Link to="/fleet" className="block text-pearl-beige hover:text-primary transition-colors">
            LA FLOTA
          </Link>

          <a href="#" className="block text-pearl-beige hover:text-primary transition-colors">
            EXPERIENCIAS
          </a>

          <a href="#" className="block text-pearl-beige hover:text-primary transition-colors">
            OFERTAS
          </a>

          {/* INICIAR SESIÓN MOBILE → INICIO */}
          <Link
            to="/home"
            className="block w-full text-center text-pearl-beige hover:text-primary transition-colors text-sm font-medium tracking-widest pt-2"
          >
            INICIAR SESIÓN
          </Link>

          <Link
            to="/details-suit"
            className="block w-full bg-primary hover:bg-luxury-gold text-white px-6 py-3 rounded-full text-sm font-bold tracking-widest transition-all text-center"
          >
            RESERVAR AHORA
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
