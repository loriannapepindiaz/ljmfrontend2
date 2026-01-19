// src/features/home/presentation/components/Destinations.tsx
import React from 'react';

const Destinations = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display mb-4 text-gray-900 dark:text-white">
            Discover Your Next Destination
          </h2>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-bold tracking-widest text-gray-500">
            <button className="text-primary border-b-2 border-primary pb-1">MEDITERRANEAN</button>
            <button className="hover:text-primary transition-colors pb-1">CARIBBEAN</button>
            <button className="hover:text-primary transition-colors pb-1">ALASKA</button>
            <button className="hover:text-primary transition-colors pb-1">SOUTH PACIFIC</button>
            <button className="hover:text-primary transition-colors pb-1">ASIA &amp; ARABIA</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Tarjeta 1 */}
          <div className="premium-card rounded-2xl overflow-hidden group">
            <div className="relative h-64">
              <img
                alt="Santorini"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsTCN_0ROR0IL7ZRQCA37YYjBPClqFv7aDxL8dLkubqvJp-qAkneDzN3y9fHmSxONDgaSGYKxlmExcnpxUxqqtegGAfzWNPpsCSnztgwd3NnnUgXA4a1kFgooc6qLkXyH-Z7WsIsThMPRFNyyixaMFcoDq0LLK7BMG6LAi1c3FLsFRhoI2wxD_6qFm_6yb8FIXpXcI3CsV6XYtvKAYyxHXarDhVfOOy5K3plW0FY7XBEUQ1yY03UvsMG4JZiUmY9T6XQv4Y0mKIjI"
              />
              <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">star</span> 4.9
              </div>
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-2xl font-display mb-1 text-gray-900 dark:text-white">
                    Grecian Isles Odyssey
                  </h4>
                  <p className="text-xs text-gray-400 flex items-center gap-1 uppercase tracking-widest">
                    <span className="material-symbols-outlined text-sm">location_on</span> Santorini, Greece
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-display text-primary">$4,850</p>
                  <p className="text-[10px] text-gray-400 uppercase">per person</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                7 nights of sapphire waters, white-washed villages, and ancient history.
              </p>
              <button className="w-full border border-primary/50 py-3 rounded-lg text-xs font-bold tracking-[0.2em] group-hover:bg-primary group-hover:text-white transition-all text-gray-900 dark:text-white">
                VIEW DETAILS
              </button>
            </div>
          </div>

          {/* Tarjeta 2 - Tropical Serenity */}
          <div className="premium-card rounded-2xl overflow-hidden group">
            <div className="relative h-64">
              <img
                alt="Maldives"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDy24PDfCAFesAXCRFJrb4P19OGwWg09g_4lT7vhta6shK__8E_1Doe51WCYEVKF7hlf9gQIItHUWPSnnGMhWrTpvBlQCF42iwgrERMcdXWeaIgRPuXCJNwJewCzUBsy7wwc4nyw4HZG-R6cL1zVVzFzLZQChOI64fSSYDt8kg5iHBDS2AD39NeLti0R9kqs9KgGG7azy5R-FMjFOD92pVK8glf9Qa1WNi-87NyUhkPuDZX7A_JrdibNrWgUsfdpF_sfB2PBHnuEmQ"
              />
              <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">star</span> 5.0
              </div>
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-2xl font-display mb-1 text-gray-900 dark:text-white">
                    Tropical Serenity
                  </h4>
                  <p className="text-xs text-gray-400 flex items-center gap-1 uppercase tracking-widest">
                    <span className="material-symbols-outlined text-sm">location_on</span> Maldives Archipelago
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-display text-primary">$6,200</p>
                  <p className="text-[10px] text-gray-400 uppercase">per person</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                Escape to a world of crystal lagoons and overwater bungalow luxury.
              </p>
              <button className="w-full border border-primary/50 py-3 rounded-lg text-xs font-bold tracking-[0.2em] group-hover:bg-primary group-hover:text-white transition-all text-gray-900 dark:text-white">
                VIEW DETAILS
              </button>
            </div>
          </div>

          {/* Tarjeta 3 - Arctic Aurora Path */}
          <div className="premium-card rounded-2xl overflow-hidden group">
            <div className="relative h-64">
              <img
                alt="Northern Lights"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDF4uog0vMHZDQDZJRHQ7Y09ippsRgB1II5vuYOp7j9Y8OmhE2sdG7RE6Cf3_NIziZ6vzkZji7zDNgaV_vPUKIf0FBulDzj2gQtnU6VJG1tj047oBQOpn3NWIXCZJH7MH_lJ_dQafj8LT9g3luM8dlnjj92PJdtqUNec3UlU7LeaUhmv52_RUrWl9PBc94sJzQu54UhIlxotghZfaj5ODdjN0D1Ruhpy9Uaw-omKVQa7oiubWjop3Qlp2P2I4va6nocSiL_BK3Nt48"
              />
              <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">star</span> 4.8
              </div>
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-2xl font-display mb-1 text-gray-900 dark:text-white">
                    Arctic Aurora Path
                  </h4>
                  <p className="text-xs text-gray-400 flex items-center gap-1 uppercase tracking-widest">
                    <span className="material-symbols-outlined text-sm">location_on</span> Norwegian Fjords
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-display text-primary">$5,100</p>
                  <p className="text-[10px] text-gray-400 uppercase">per person</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                Witness the dance of the Northern Lights from the comfort of our observation deck.
              </p>
              <button className="w-full border border-primary/50 py-3 rounded-lg text-xs font-bold tracking-[0.2em] group-hover:bg-primary group-hover:text-white transition-all text-gray-900 dark:text-white">
                VIEW DETAILS
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <button className="bg-gray-100 dark:bg-luxury-blue hover:bg-gray-200 dark:hover:bg-luxury-blue/50 px-10 py-4 rounded-full text-xs font-bold tracking-[0.2em] transition-all text-gray-900 dark:text-white">
            SHOW MORE VOYAGES
          </button>
        </div>
      </div>
    </section>
  );
};

export default Destinations;