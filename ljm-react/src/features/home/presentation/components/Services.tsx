import React from "react";
import { useNavigate } from "react-router-dom"; // Importamos el hook

const Services: React.FC = () => {
  const navigate = useNavigate(); // Inicializamos la navegación

  return (
    <section className="py-24 bg-[#FDFCF0]">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">

        {/* LEFT CONTENT */}
        <div className="lg:w-[45%] space-y-8">
          <div className="space-y-4">
            <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase">
              Unrivaled Service
            </span>
            <h2 className="text-4xl md:text-5xl font-display leading-tight text-gray-900">
              Travel to make sweet <br /> everlasting memories
            </h2>
          </div>

          <div className="space-y-12">
            {[
              {
                id: "01",
                title: "Concierge at your beck and call",
                text: "Personalized service that anticipates your needs before you even realize them.",
              },
              {
                id: "02",
                title: "Immersion in Nature's Beauty",
                text: "Our itineraries are designed to bring you closer to the world's most pristine environments.",
              },
              {
                id: "03",
                title: "Culinary Masterpieces",
                text: "A sensory journey through the world's finest flavors, paired with rare vintages.",
              },
            ].map((item) => (
              <div key={item.id} className="flex gap-6 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary font-display text-xl group-hover:bg-primary group-hover:text-white transition-all">
                  {item.id}
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2 text-gray-900">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Botón con la función de navegación */}
          <button 
            onClick={() => navigate('/fleet')}
            className="bg-primary hover:bg-luxury-gold text-white px-8 py-4 rounded-full font-bold shadow-xl transition-all active:scale-95"
          >
            EXPLORE THE FLEET
          </button>
        </div>

        {/* RIGHT IMAGE + COMMENTS */}
        <div className="lg:w-[55%] relative">
          <div className="relative z-10 w-full h-[520px] lg:h-[580px] lg:translate-x-16">
            <div className="relative w-full h-full overflow-hidden rounded-3xl shadow-2xl">
              <img
                alt="Cruise Ship Detail"
                className="w-full h-full object-cover"
                src="/comentario.jpeg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
            </div>

            {/* Comentarios flotantes */}
            <div className="absolute top-10 -left-10 bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl flex items-center gap-4 animate-float">
              <div className="w-11 h-11 rounded-full overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src="https://ui-avatars.com/api/?name=Amelia+V&background=eacea9&color=0e1a34"
                  alt="Amelia V"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900"> Amelia V. ⭐ 5.0 </p>
                <p className="text-[11px] text-gray-500 uppercase tracking-widest"> Gold Member </p>
              </div>
            </div>

            <div className="absolute bottom-16 -right-10 bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl flex items-center gap-4 animate-float [animation-delay:2.5s]">
              <div className="w-11 h-11 rounded-full overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src="https://ui-avatars.com/api/?name=Julian+R&background=0e1a34&color=eacea9"
                  alt="Julian R"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900"> Julian R. ⭐ 5.0 </p>
                <p className="text-[11px] text-gray-500 uppercase tracking-widest"> Elite Voyager </p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-12 -left-12 w-full h-full bg-primary/10 rounded-3xl -z-10" />
        </div>

      </div>
    </section>
  );
};

export default Services;