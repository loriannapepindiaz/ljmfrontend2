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
                className="w-10 h-10 rounded-full border border-pearl-beige/30 flex items-center justify-center text-pearl-beige hover:bg-primary hover:text-midnight-blue hover:border-primary transition-all"
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contáctanos por WhatsApp"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.006a9.87 9.87 0 00-4.255.949c-1.238.503-2.335 1.236-3.356 2.194C3.75 10.645 3 12.116 3 13.585c0 1.31.326 2.591.94 3.77l.53 1.026-.56 2.035 2.11-.555 1.026.54C8.358 21.67 9.916 22 11.5 22c1.469 0 2.94-.75 3.98-1.888 1.04-1.138 1.773-2.235 2.194-3.356.422-1.12.949-2.255.949-4.255 0-1.469-.75-2.94-1.888-3.98-1.137-1.04-2.235-1.773-3.356-2.194-1.12-.422-2.255-.949-4.255-.949z"/>
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