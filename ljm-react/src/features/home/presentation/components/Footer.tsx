import React from 'react';

const Footer: React.FC = () => {
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
              {/* Instagram */}
              <a
                className="w-10 h-10 rounded-full border border-pearl-beige/30 flex items-center justify-center text-pearl-beige hover:bg-primary hover:text-midnight-blue hover:border-primary transition-all"
                href="https://instagram.com/tu_cuenta"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en Instagram"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
                </svg>
              </a>

              {/* X (Twitter) */}
              <a
                className="w-10 h-10 rounded-full border border-pearl-beige/30 flex items-center justify-center text-pearl-beige hover:bg-primary hover:text-midnight-blue hover:border-primary transition-all"
                href="https://x.com/tu_cuenta"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en X (Twitter)"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.6l-5.17-6.763-5.91 6.763h-3.308l7.73-8.835L2.56 2.25h6.772l4.681 6.15L17.595 2.25h.649zm-1.1 17.537h1.833L7.084 4.126H5.117l12.127 15.661z"/>
                </svg>
              </a>

              {/* WhatsApp */}
                <a
                className="w-10 h-10 rounded-full border border-pearl-beige/30 flex items-center justify-center
                text-pearl-beige hover:bg-primary hover:text-midnight-blue hover:border-primary
                transition-colors duration-300"
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contáctanos por WhatsApp"
              >
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 32 32"
                >
                  <path d="M16 2.667C8.64 2.667 2.667 8.64 2.667 16c0 2.56.746 5.04 2.16 7.173L2.667 29.333l6.4-2.107A13.21 13.21 0 0016 29.333c7.36 0 13.333-5.973 13.333-13.333S23.36 2.667 16 2.667zm0 24c-2.32 0-4.587-.627-6.56-1.813l-.467-.28-3.787 1.253 1.28-3.68-.307-.48A10.53 10.53 0 015.333 16c0-5.893 4.773-10.667 10.667-10.667S26.667 10.107 26.667 16 21.893 26.667 16 26.667zm5.867-7.973c-.32-.16-1.893-.933-2.187-1.04-.293-.107-.507-.16-.72.16-.213.32-.827 1.04-1.013 1.253-.187.213-.373.24-.693.08-.32-.16-1.347-.493-2.56-1.573-.947-.84-1.587-1.88-1.773-2.2-.187-.32-.02-.493.14-.653.147-.147.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.733-.987-2.373-.26-.627-.533-.547-.733-.56l-.627-.013c-.213 0-.56.08-.853.4-.293.32-1.12 1.093-1.12 2.667s1.147 3.093 1.307 3.307c.16.213 2.267 3.467 5.493 4.853.767.333 1.367.533 1.833.68.773.247 1.48.213 2.04.133.62-.093 1.893-.773 2.16-1.52.267-.747.267-1.387.187-1.52-.08-.133-.293-.213-.613-.373z"/>
                </svg>
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
          <p>© {new Date().getFullYear()} LJM SEALINE. ALL RIGHTS RESERVED.</p>
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