// src/features/presentation/components/Navbar.tsx
import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass-nav border-b border-primary/10">
      <div className="container mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-3xl">sailing</span>
          <span className="text-2xl font-display font-bold tracking-widest text-primary">
            LJM SEALINE
          </span>
        </div>
        <div className="flex items-center gap-12">
          <div className="hidden lg:flex items-center gap-10">
            <a className="nav-link text-xs" href="#">DESTINATIONS</a>
            <a className="nav-link text-xs" href="#">THE FLEET</a>
            <a className="nav-link text-xs" href="#">EXPERIENCES</a>
            <a className="nav-link text-xs" href="#">OFFERS</a>
          </div>
          <div className="flex items-center gap-6">
            <button className="hidden sm:block text-xs font-medium tracking-widest text-pearl-beige hover:text-primary transition-colors">
              SIGN IN
            </button>
            <button className="bg-primary hover:bg-luxury-gold text-white px-7 py-2.5 rounded-full text-xs font-bold tracking-widest shadow-lg transition-all">
              RESERVE NOW
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;