// components/Hero.tsx (ya corregido y en español)
import Hero from '../components/Hero';

const DestinationDetailsPage = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fondo con overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 hero-bg-santorini transform scale-105"></div>
        <div className="absolute inset-0 bg-midnight-blue/60"></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="glass-panel max-w-6xl mx-auto rounded-[3.5rem] p-8 md:p-14">
          <div className="flex flex-col lg:flex-row gap-16 items-stretch mb-14">
            {/* Izquierda: Info del viaje */}
            <div className="lg:w-1/2 space-y-10">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-primary text-[11px] font-bold tracking-[0.4em] uppercase">
                  <span className="w-10 h-[1.5px] bg-primary"></span>
                  Crucero Mediterráneo 7 Noches
                </div>
                <h1 className="text-5xl md:text-7xl font-display leading-[1.1] text-white">
                  Islas Griegas <br />
                  <span className="italic text-pearl-beige font-medium">Odisea</span>
                </h1>
              </div>

              <div className="grid grid-cols-2 gap-8 py-8 border-y border-white/10">
                <div>
                  <p className="text-[11px] font-bold text-primary tracking-widest uppercase mb-2">
                    Duración
                  </p>
                  <p className="text-xl font-medium text-white flex items-center gap-3">
                    <span className="material-symbols-outlined text-pearl-beige">schedule</span>
                    8 Días / 7 Noches
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-primary tracking-widest uppercase mb-2">
                    Puerto de Salida
                  </p>
                  <p className="text-xl font-medium text-white flex items-center gap-3">
                    <span className="material-symbols-outlined text-pearl-beige">anchor</span>
                    Atenas (Pireo)
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-display text-pearl-beige tracking-wide">
                  Actividades Destacadas
                </h3>
                <ul className="space-y-5">
                  <li className="flex items-start gap-5">
                    <span className="material-icons text-primary mt-1 text-base">stars</span>
                    <p className="text-base font-medium text-gray-100 leading-snug">
                      Cena al atardecer en terraza privada de bodega boutique en Santorini.
                    </p>
                  </li>
                  <li className="flex items-start gap-5">
                    <span className="material-icons text-primary mt-1 text-base">stars</span>
                    <p className="text-base font-medium text-gray-100 leading-snug">
                      Acceso VIP a ruinas minoicas de Akrotiri con historiador profesional.
                    </p>
                  </li>
                  <li className="flex items-start gap-5">
                    <span className="material-icons text-primary mt-1 text-base">stars</span>
                    <p className="text-base font-medium text-gray-100 leading-snug">
                      Charter exclusivo de yate a cuevas marinas ocultas de Milos.
                    </p>
                  </li>
                </ul>
              </div>

              <div className="pt-6">
                <button className="bg-primary hover:bg-luxury-gold text-midnight-blue px-14 py-5 rounded-full text-sm font-extrabold tracking-[0.3em] shadow-[0_15px_30px_rgba(197,160,89,0.3)] hover:shadow-[0_20px_40px_rgba(197,160,89,0.4)] transition-all w-full md:w-auto uppercase">
                  Reservar Este Viaje
                </button>
              </div>
            </div>

            {/* Derecha: Mapa de ruta */}
            <div className="lg:w-1/2 flex flex-col h-full bg-midnight-blue/40 rounded-[2.5rem] border border-white/10 p-10 relative overflow-hidden">
              <div className="relative z-10 h-full flex flex-col">
                <div className="flex justify-between items-center mb-10">
                  <h4 className="text-xs font-bold tracking-widest uppercase text-pearl-beige">
                    Ruta del Viaje
                  </h4>
                  <span className="text-[10px] text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/30 uppercase tracking-[0.2em] font-bold">
                    Mapa Interactivo
                  </span>
                </div>

                <div className="flex-grow relative min-h-[340px] flex items-center justify-center">
                  <svg
                    className="w-full h-full drop-shadow-2xl"
                    fill="none"
                    viewBox="0 0 500 400"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="map-line"
                      d="M50 350C100 300 200 320 250 200C300 80 400 120 450 50"
                      stroke="#C5A059"
                      strokeWidth="2.5"
                    />
                    <circle cx="50" cy="350" fill="#C5A059" r="7" />
                    <circle cx="160" cy="310" fill="#C5A059" r="6" />
                    <circle
                      className="animate-ping opacity-50"
                      cx="250"
                      cy="200"
                      fill="#C5A059"
                      r="10"
                    />
                    <circle cx="250" cy="200" fill="#C5A059" r="8" />
                    <circle cx="360" cy="110" fill="#C5A059" r="6" />
                    <circle cx="450" cy="50" fill="#C5A059" r="7" />

                    <text fill="white" fontFamily="Montserrat" fontSize="12" fontWeight="700" letterSpacing="0.1em" x="68" y="355">
                      ATENAS
                    </text>
                    <text fill="#eacea9" fontFamily="Montserrat" fontSize="12" fontWeight="700" letterSpacing="0.1em" x="268" y="205">
                      SANTORINI
                    </text>
                    <text fill="white" fontFamily="Montserrat" fontSize="12" fontWeight="700" letterSpacing="0.1em" x="350" y="35">
                      MYKONOS
                    </text>
                  </svg>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="flex justify-between text-[11px] text-pearl-beige/80 font-bold uppercase tracking-widest">
                    <span>Día 1-2: Golfo Sarónico</span>
                    <span className="text-primary">En Tránsito</span>
                  </div>
                  <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden">
                    <div className="bg-primary w-2/3 h-full shadow-[0_0_10px_rgba(197,160,89,0.5)]"></div>
                  </div>
                  <div className="flex justify-between text-[11px] text-pearl-beige/60 font-medium italic tracking-wide">
                    <span>Posición actual: Acercándose a la caldera de Santorini</span>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/10 rounded-full blur-[100px]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
