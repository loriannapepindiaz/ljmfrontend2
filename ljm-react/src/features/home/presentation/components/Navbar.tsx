import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0B1120] font-sans">
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
            HOME
          </Link>

          <Link to="/destinations" className="text-pearl-beige hover:text-primary transition-colors font-medium tracking-wide text-sm">
            DESTINATIONS
          </Link>

          <Link to="/fleet" className="text-pearl-beige hover:text-primary transition-colors font-medium tracking-wide text-sm">
            THE FLEET
          </Link>

          <a href="#" className="text-pearl-beige hover:text-primary transition-colors font-medium tracking-wide text-sm">
            EXPERIENCES
          </a>

          <a href="#" className="text-pearl-beige hover:text-primary transition-colors font-medium tracking-wide text-sm">
            OFFERS
          </a>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-6 ml-auto">
          {/* SIGN IN → HOME */}
          <Link
            to="/home"
            className="text-sm font-medium tracking-widest text-pearl-beige hover:text-primary transition-colors"
          >
            SIGN IN
          </Link>

          {/* RESERVE NOW */}
          <Link
            to="/details-suit"
            className="bg-primary hover:bg-luxury-gold text-white px-7 py-2.5 rounded-full text-sm font-bold tracking-widest shadow-lg transition-all"
          >
            RESERVE NOW
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
        <div className="md:hidden bg-[#0B1120] border-t border-pearl-beige/10 p-4 space-y-4">
          <Link to="/" className="block text-pearl-beige hover:text-primary transition-colors">
            HOME
          </Link>

          <Link to="/destinations" className="block text-pearl-beige hover:text-primary transition-colors">
            DESTINATIONS
          </Link>

          <Link to="/fleet" className="block text-pearl-beige hover:text-primary transition-colors">
            THE FLEET
          </Link>

          <a href="#" className="block text-pearl-beige hover:text-primary transition-colors">
            EXPERIENCES
          </a>

          <a href="#" className="block text-pearl-beige hover:text-primary transition-colors">
            OFFERS
          </a>

          {/* SIGN IN MOBILE → HOME */}
          <Link
            to="/home"
            className="block w-full text-center text-pearl-beige hover:text-primary transition-colors text-sm font-medium tracking-widest pt-2"
          >
            SIGN IN
          </Link>

          <Link
            to="/details-suit"
            className="block w-full bg-primary hover:bg-luxury-gold text-white px-6 py-3 rounded-full text-sm font-bold tracking-widest transition-all text-center"
          >
            RESERVE NOW
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
