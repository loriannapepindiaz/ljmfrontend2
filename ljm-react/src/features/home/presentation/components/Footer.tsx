import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0e1a34] pt-20 pb-10 border-t border-[#eacea9]/10">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-5 mb-8">
              {/* ✅ Logo con tamaño aumentado para mejor visibilidad */}
              <img 
                src="/logo.png" 
                alt="LJM Sealine Logo" 
                className="w-16 h-16 object-contain" 
              />
              <span className="text-2xl font-display font-bold tracking-widest text-[#eacea9]">
                LJM SEALINE
              </span>
            </div>

            <p className="text-[#f5f5dc] opacity-80 max-w-sm mb-8 leading-relaxed font-light">
              Redefining luxury travel through exceptional craftsmanship,
              personalized service, and a commitment to the world's oceans.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {/* Instagram */}
              <a
                href="https://instagram.com/ljmsealine"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#f5f5dc]/30 flex items-center justify-center text-[#f5f5dc] hover:bg-[#eacea9] hover:text-[#0e1a34] hover:border-[#eacea9] transition-all"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
                </svg>
              </a>

              {/* X */}
              <a
                href="https://x.com/ljmsealine"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#f5f5dc]/30 flex items-center justify-center text-[#f5f5dc] hover:bg-[#eacea9] hover:text-[#0e1a34] hover:border-[#eacea9] transition-all"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.6l-5.17-6.763-5.91 6.763H3.84l7.73-8.835L2.56 2.25h6.772l4.681 6.15L17.595 2.25h.649z" />
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#f5f5dc]/30 flex items-center justify-center text-[#f5f5dc] hover:bg-[#eacea9] hover:text-[#0e1a34] hover:border-[#eacea9] transition-colors"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 32 32">
                  <path d="M16 2.667C8.64 2.667 2.667 8.64 2.667 16c0 2.56.746 5.04 2.16 7.173L2.667 29.333l6.4-2.107A13.21 13.21 0 0016 29.333c7.36 0 13.333-5.973 13.333-13.333S23.36 2.667 16 2.667z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Columns */}
          <FooterColumn title="Our World" items={['Our Fleet', 'Destinations', 'On Board Experiences', 'Shore Excursions']} />
          <FooterColumn title="Service" items={['Manage Booking', 'Gift Cards', 'Help Center', 'Contact Us']} />

          {/* Newsletter Section */}
          <div>
            <h6 className="font-bold text-xs tracking-[0.2em] uppercase mb-8 text-[#f5f5dc]">
              Newsletter
            </h6>
            <p className="text-xs text-[#f5f5dc]/50 mb-6 uppercase tracking-widest">
              Receive curated offers & news
            </p>

            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="bg-white/5 border border-[#f5f5dc]/20 rounded-lg px-4 py-2 text-sm text-[#f5f5dc] placeholder-[#f5f5dc]/30 outline-none focus:ring-[#eacea9] focus:border-[#eacea9] focus:bg-white/10 flex-1 transition-all"
              />
              <button className="bg-[#eacea9] text-[#0e1a34] p-2 rounded-lg hover:bg-[#d4b78f] transition-colors">
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-10 border-t border-[#f5f5dc]/10 flex flex-col md:flex-row justify-between items-center text-[10px] text-[#f5f5dc]/40 tracking-widest uppercase">
          <p>© {new Date().getFullYear()} LJM SEALINE. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-[#eacea9] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#eacea9] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#eacea9] transition-colors">Cookies</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

// Sub-componente para las columnas del footer
const FooterColumn = ({ title, items }: { title: string; items: string[] }) => (
  <div>
    <h6 className="font-bold text-xs tracking-[0.2em] uppercase mb-8 text-[#f5f5dc]">
      {title}
    </h6>
    <ul className="space-y-4 text-sm text-[#f5f5dc]/70">
      {items.map(item => (
        <li key={item}>
          <a href="#" className="hover:text-[#eacea9] transition-colors">
            {item}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;