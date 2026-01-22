import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0B1120]">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-2xl">sailing</span>
          <span className="text-xl font-display font-bold tracking-widest text-primary">
            LJM SEALINE
          </span>
        </Link>

        {/* Desktop Menu - Opciones exactas del HTML */}
        <div className="hidden md:flex items-center gap-8 ml-auto mr-12">
          <a href="#" className="text-pearl-beige hover:text-primary transition-colors font-light tracking-wide text-sm">
            DESTINATIONS
          </a>
          <a href="#" className="text-pearl-beige hover:text-primary transition-colors font-light tracking-wide text-sm">
            THE FLEET
          </a>
          <a href="#" className="text-pearl-beige hover:text-primary transition-colors font-light tracking-wide text-sm">
            EXPERIENCES
          </a>
          <a href="#" className="text-pearl-beige hover:text-primary transition-colors font-light tracking-wide text-sm">
            OFFERS
          </a>
        </div>

        {/* Right Section - SIGN IN como texto + RESERVE NOW */}
        <div className="hidden md:flex items-center gap-10">
          <button className="hidden sm:block text-xs font-medium tracking-widest text-pearl-beige hover:text-primary transition-colors">
            SIGN IN
          </button>
          <button className="bg-primary hover:bg-luxury-gold text-white px-7 py-2.5 rounded-full text-xs font-bold tracking-widest shadow-lg transition-all">
            RESERVE NOW
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-pearl-beige"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0B1120] border-t border-pearl-beige/10 p-4 space-y-4">
          <a href="#" className="block text-pearl-beige hover:text-primary transition-colors">
            DESTINATIONS
          </a>
          <a href="#" className="block text-pearl-beige hover:text-primary transition-colors">
            THE FLEET
          </a>
          <a href="#" className="block text-pearl-beige hover:text-primary transition-colors">
            EXPERIENCES
          </a>
          <a href="#" className="block text-pearl-beige hover:text-primary transition-colors">
            OFFERS
          </a>
          <div className="pt-2">
            <button className="w-full text-center text-pearl-beige hover:text-primary transition-colors text-sm font-medium tracking-widest">
              SIGN IN
            </button>
          </div>
          <button className="w-full bg-primary hover:bg-luxury-gold text-white px-6 py-3 rounded-full text-sm font-bold tracking-widest transition-all">
            RESERVE NOW
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;