// src/features/home/presentation/components/Footer.tsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#0e1a34] pt-20 pb-10 border-t border-primary/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <span className="material-symbols-outlined text-primary text-3xl">sailing</span>
              <span className="text-2xl font-display font-bold tracking-widest text-primary">
                LJM SEALINE
              </span>
            </div>
            <p className="text-pearl-beige opacity-80 max-w-sm mb-8 leading-relaxed font-light">
              Redefining luxury travel through exceptional craftsmanship, personalized service, and a commitment to the world's oceans.
            </p>
            <div className="flex gap-4">
              <a
                className="w-10 h-10 rounded-full border border-pearl-beige/30 flex items-center justify-center text-pearl-beige hover:bg-primary hover:text-midnight-blue hover:border-primary transition-all"
                href="#"
              >
                <span className="material-symbols-outlined text-xl">facebook</span>
              </a>
              <a
                className="w-10 h-10 rounded-full border border-pearl-beige/30 flex items-center justify-center text-pearl-beige hover:bg-primary hover:text-midnight-blue hover:border-primary transition-all"
                href="#"
              >
                <span className="material-symbols-outlined text-xl">camera_alt</span>
              </a>
              <a
                className="w-10 h-10 rounded-full border border-pearl-beige/30 flex items-center justify-center text-pearl-beige hover:bg-primary hover:text-midnight-blue hover:border-primary transition-all"
                href="#"
              >
                <span className="material-symbols-outlined text-xl">movie</span>
              </a>
            </div>
          </div>

          <div>
            <h6 className="font-bold text-xs tracking-[0.2em] uppercase mb-8 text-pearl-beige">
              Our World
            </h6>
            <ul className="space-y-4 text-sm text-pearl-beige/70">
              <li><a className="hover:text-primary transition-colors" href="#">Our Fleet</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Destinations</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">On Board Experiences</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Shore Excursions</a></li>
            </ul>
          </div>

          <div>
            <h6 className="font-bold text-xs tracking-[0.2em] uppercase mb-8 text-pearl-beige">
              Service
            </h6>
            <ul className="space-y-4 text-sm text-pearl-beige/70">
              <li><a className="hover:text-primary transition-colors" href="#">Manage Booking</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Gift Cards</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Help Center</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h6 className="font-bold text-xs tracking-[0.2em] uppercase mb-8 text-pearl-beige">
              Newsletter
            </h6>
            <p className="text-xs text-pearl-beige/50 mb-6 uppercase tracking-widest">
              Receive curated offers &amp; news
            </p>
            <div className="flex gap-2">
              <input
                className="bg-white/5 border border-pearl-beige/20 rounded-lg px-4 py-2 text-sm text-pearl-beige placeholder-pearl-beige/30 focus:ring-primary focus:border-primary focus:bg-white/10 flex-1 outline-none transition-all"
                placeholder="Your email"
                type="email"
              />
              <button className="bg-primary text-midnight-blue p-2 rounded-lg flex items-center justify-center hover:bg-luxury-gold transition-colors">
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-pearl-beige/10 flex flex-col md:flex-row justify-between items-center text-[10px] text-pearl-beige/40 tracking-widest uppercase">
          <p>© 2024 LJM SEALINE. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
            <a className="hover:text-primary transition-colors" href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;