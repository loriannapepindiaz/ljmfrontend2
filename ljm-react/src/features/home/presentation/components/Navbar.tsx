import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Importa tu logo aquí (ajusta la ruta según donde lo guardes)
import SealineLogo from '@/assets/logoljm.jfif';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0B1120]">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo - ahora usa la imagen de la estrella dorada */}
        <Link to="/" className="flex items-center gap-2.5">
          <img 
            src={SealineLogo} 
            alt="LJM Sealine Logo" 
            className="h-9 w-auto object-contain" // ajusta h- (altura) según prefieras: h-8, h-10, h-12...
          />
          {/* Si quieres mantener el texto también, descomenta esto: */}
          {/* <span className="text-xl font-display font-bold tracking-widest text-primary">
            LJM SEALINE
          </span> */}
        </Link>

        {/* Desktop Menu - sin cambios */}
        <div className="hidden md:flex items-center gap-8 ml-auto mr-12">
          <Link to="/destinations" className="text-pearl-beige hover:text-primary transition-colors font-light tracking-wide text-sm">
            DESTINATIONS
          </Link>
          <Link to="/fleet" className="text-pearl-beige hover:text-primary transition-colors font-light tracking-wide text-sm">
            THE FLEET
          </Link>
          <a href="#" className="text-pearl-beige hover:text-primary transition-colors font-light tracking-wide text-sm">
            EXPERIENCES
          </a>
          <a href="#" className="text-pearl-beige hover:text-primary transition-colors font-light tracking-wide text-sm">
            OFFERS
          </a>
        </div>

        {/* Right Section - sin cambios */}
        <div className="hidden md:flex items-center gap-10">
          <button className="hidden sm:block text-xs font-medium tracking-widest text-pearl-beige hover:text-primary transition-colors">
            SIGN IN
          </button>
          <Link to="/details-suit" className="bg-primary hover:bg-luxury-gold text-white px-7 py-2.5 rounded-full text-xs font-bold tracking-widest shadow-lg transition-all">
            RESERVE NOW
          </Link>
        </div>

        {/* Mobile Menu Button - sin cambios */}
        <button 
          className="md:hidden text-pearl-beige"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>

      {/* Mobile Menu - sin cambios */}
      {isOpen && (
        <div className="md:hidden bg-[#0B1120] border-t border-pearl-beige/10 p-4 space-y-4">
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
          <div className="pt-2">
            <button className="w-full text-center text-pearl-beige hover:text-primary transition-colors text-sm font-medium tracking-widest">
              SIGN IN
            </button>
          </div>
          <Link to="/details-suit" className="block w-full bg-primary hover:bg-luxury-gold text-white px-6 py-3 rounded-full text-sm font-bold tracking-widest transition-all text-center">
            RESERVE NOW
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;