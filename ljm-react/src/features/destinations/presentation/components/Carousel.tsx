import React, { useState, useEffect } from 'react';

const destinosDestacados = [
  { 
    id: 0, 
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAs8AJnlXBrdROZM-BvFrz9gtoxh2DmZfwv_Bb75xHZYOqCnczsgWoTd1h1xhVC8_ZZxLWJtH2XNSRGKFryl4c58zQxlub0CodBQX69ULPtIopvVTTO6qy0XUDB97av89916F-ZoBGGMSX4YVUcrX5XViMuH6251cXi2ByyW-x-9V2LuevL8fail6Rbfr-s4nQkw560tiiFNNvXmLZU3h-d5GM4tkMg0kahgzVben14bTrLIVs3dxp5yIDLXZLhjANcB4WZpYLO3ro",
    titulo: "Santorini", 
    subtitulo: "Grecia",
    descripcion: "Puestas de sol espectaculares en las islas volcánicas de Grecia.",
    tipo: 'side',
    destacado: false
  },
  { 
    id: 1, 
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkYPP2yj0hgJBnq9KHhhFzrLa8cw2eoJRIKLTTkNeev4mjhGm24fTSUQihf3nbGzq0qWtW6t8aPwZ6eDr0NQmsrq7EiLlOtahySW7KHkDp22sTOQgeuQX_CXktsqoyU2it2REGyS6ytaeZyr_BjBDgB-b0fkFih2azZczPhfBY8IjbuAjuQx_uTKWK07-rKL5uksSo9MSvVvOnHdS-YGnLJ_yl-MUu9SVMVBU_-L8mLd7UgKbFpG9iJheNpwgach44mDQOE9n6tkA",
    titulo: "Costa Amalfitana", 
    subtitulo: "Italia",
    descripcion: "Acantilados dramáticos y pueblos coloridos en la costa italiana.",
    tipo: 'mediano',
    destacado: false
  },
  { 
    id: 2, 
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBblcdXtDz6k0sqnSBdwTK8AlLvUim3ZI1y9MKqz4u_HrT0AR5y1B4Tu-mreo6U8MbeRiUPi2qf6eMdrBsHbYNkbPU6K2Qt7wppJiOXFP332PQkatVIWTFtywGkAH7w3h8DYWTRcsN76eNO_VOm95Zw3XIBlYCKMEEllswbjptcZMQaiyXbeRWETlK4TusldUlLTs4NB9FZcwk8CUk78qrXU98zj6paLPfxt2TFo7klKWrI7YZkIvn-3fSiWD0pjZHJ7ERnebel20M",
    titulo: "Islas Maldivas", 
    subtitulo: "Maldivas", 
    descripcion: "Privacidad absoluta y aguas cristalinas en el corazón del Océano Índico.",
    tipo: 'principal',
    destacado: true
  },
  { 
    id: 3, 
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA_w8KL05KnzVo64Lhd8JqIPwltnM4jk1p_oTIWpZ_Z_E-6NUB-hFWT9Q2WLNw2HjA2bMZEcdwMy7DUdrPR9SSc1WSwSnHm6A5Umj2CCCwnrEOlr64CRPkKw7svflZWaHeIGFQVCZB39Ez0FsnA2KcZAHW9iSgYcnAl-_f0pddwKnzpggVizGXodDZvC4stQ9j4wJKC2XhMxVCuvUJj2MwtvNJ108FXG0_hwt-HCkmFGvUEK3YDo7fHFPKbOnMcnrX1DeSh6MUPelE",
    titulo: "Dubái Marina", 
    subtitulo: "EAU",
    descripcion: "Rascacielos futuristas y lujo moderno en el desierto árabe.",
    tipo: 'mediano',
    destacado: false
  },
  { 
    id: 4, 
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9f2ltuR0r10x_SFdyVGXzZlLoRoVSHewy6wrLVs1g_GJOAju6ujPctF4FsHK0DnSWzLPzI3bqS6iYwZRQnHO7TlDGOvRVyX-hQCNOUoPN6T0RUt7YJLs8gEiiOLyqMGgL-oJvzz_x0TuHlw3aqc-lRixDVYH6bLjyy44L8Z5JdhOEDekSdp4Fx0bhMQPnyFw48ndZN1THMQVLtnWip-O6yyWwawBpYTt9ahwTmOECxBfMnqbcmpwvTuJx5fgn3indbX6L5F4gz8E",
    titulo: "Riviera Francesa", 
    subtitulo: "Francia",
    descripcion: "Playas glamorosas y vida cosmopolita en la costa mediterránea.",
    tipo: 'side',
    destacado: false
  }
];

const Carousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % destinosDestacados.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goPrev = (): void => {
    setActiveIndex((prev) => prev === 0 ? destinosDestacados.length - 1 : prev - 1);
  };

  const goNext = (): void => {
    setActiveIndex((prev) => (prev + 1) % destinosDestacados.length);
  };

  const getDisplayIndex = (offset: number): number => {
    return (activeIndex + offset + destinosDestacados.length) % destinosDestacados.length;
  };

  const currentDestino = destinosDestacados[activeIndex];
  const prevDestino = destinosDestacados[getDisplayIndex(-1)];
  const nextDestino = destinosDestacados[getDisplayIndex(1)];

  const getCardClasses = (destino: any, isActive: boolean, isSide: boolean) => {
    if (isSide) {
      return "hidden lg:block shrink-0 w-64 h-96 rounded-2xl overflow-hidden opacity-30 grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer shadow-lg carousel-card";
    }
    if (isActive) {
      return "shrink-0 w-80 md:w-96 h-[550px] rounded-3xl overflow-hidden shadow-2xl relative group z-10 border border-gold/20 carousel-card active";
    }
    return "shrink-0 w-72 h-[450px] rounded-2xl overflow-hidden shadow-xl relative group cursor-pointer opacity-90 carousel-card";
  };

  return (
    <section className="bg-[#0e1a34] relative overflow-hidden py-16">
      <div className="relative flex items-center justify-center px-4 md:px-8">
        {/* Botón Anterior */}
        <button 
          onClick={goPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:flex w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-gold/30 items-center justify-center text-pearl hover:bg-gold hover:text-white transition-all shadow-md z-20"
          aria-label="Anterior"
        >
          <span className="material-symbols-outlined text-xl">chevron_left</span>
        </button>

        {/* Contenedor de tarjetas */}
        <div className="flex items-center justify-center gap-6 md:gap-8 max-w-7xl carousel-container overflow-x-auto no-scrollbar md:overflow-visible pb-12">
          {/* Tarjeta lado izquierdo (solo lg+) */}
          <div className={getCardClasses(destinosDestacados[getDisplayIndex(-2)], false, true)}>
            <img 
              alt={destinosDestacados[getDisplayIndex(-2)].titulo}
              className="w-full h-full object-cover" 
              src={destinosDestacados[getDisplayIndex(-2)].img}
            />
          </div>

          {/* Tarjeta anterior */}
          <div className={getCardClasses(prevDestino, false, false)}>
            <img 
              alt={prevDestino.titulo} 
              className="w-full h-full object-cover" 
              src={prevDestino.img}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e1a34]/90 to-transparent"></div>
            <div className="absolute bottom-6 left-6">
              <p className="text-pearl text-sm font-semibold tracking-wider uppercase">{prevDestino.subtitulo}</p>
              <h3 className="magiona-style text-2xl text-white">{prevDestino.titulo}</h3>
            </div>
          </div>

          {/* Tarjeta principal activa */}
          <div className={getCardClasses(currentDestino, true, false)}>
            <img 
              alt={currentDestino.titulo}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
              src={currentDestino.img}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e1a34] via-[#0e1a34]/30 to-transparent"></div>
            <div className="absolute bottom-10 left-0 right-0 text-center px-6">
              {currentDestino.destacado && (
                <span className="inline-flex items-center gap-1 bg-gold text-white px-3 py-1 rounded-full text-xs font-semibold mb-4">
                  <span className="material-symbols-outlined text-xs">star</span> 
                  DESTACADO
                </span>
              )}
              <h3 className="magiona-style text-4xl text-white mb-4">{currentDestino.titulo}</h3>
              <p className="text-white/80 text-sm mb-6 line-clamp-2">{currentDestino.descripcion}</p>
              {/* BOTÓN CON LETRA DORADA */}
              <button className="bg-[#0e1a34] text-[#d4af37] px-8 py-3 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-gold hover:text-white transition-all border border-[#d4af37] shadow-xl shadow-black/20">
                Explorar Ahora
              </button>
            </div>
          </div>

          {/* Tarjeta siguiente */}
          <div className={getCardClasses(nextDestino, false, false)}>
            <img 
              alt={nextDestino.titulo} 
              className="w-full h-full object-cover" 
              src={nextDestino.img}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e1a34]/90 to-transparent"></div>
            <div className="absolute bottom-6 left-6">
              <p className="text-pearl text-sm font-semibold tracking-wider uppercase">{nextDestino.subtitulo}</p>
              <h3 className="magiona-style text-2xl text-white">{nextDestino.titulo}</h3>
            </div>
          </div>

          {/* Tarjeta lado derecho (solo lg+) */}
          <div className={getCardClasses(destinosDestacados[getDisplayIndex(2)], false, true)}>
            <img 
              alt={destinosDestacados[getDisplayIndex(2)].titulo}
              className="w-full h-full object-cover" 
              src={destinosDestacados[getDisplayIndex(2)].img}
            />
          </div>
        </div>

        {/* Botón Siguiente */}
        <button 
          onClick={goNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:flex w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-gold/30 items-center justify-center text-pearl hover:bg-gold hover:text-white transition-all shadow-md z-20"
          aria-label="Siguiente"
        >
          <span className="material-symbols-outlined text-xl">chevron_right</span>
        </button>
      </div>

      {/* INDICADORES ORIGINALES - 3 PUNTITOS . _. EXACTOS */}
      <div className="flex justify-center gap-2 mt-12">
        {destinosDestacados.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeIndex ? 'w-8 bg-gold' : 'w-2 bg-gold/40'
            }`}
            aria-label={`Ir al destino ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Carousel;
