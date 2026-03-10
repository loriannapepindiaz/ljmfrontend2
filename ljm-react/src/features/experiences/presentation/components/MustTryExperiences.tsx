// src/features/experiences/components/MustTryExperiences.tsx

const MustTryExperiences = () => {
  const experiences = [
    {
      title: "Tirolesa sobre el mar",
      location: "Caribe Occidental",
      rating: "4.9",
      image: "https://www.ncl.com/sites/default/files/blog-hero-best-places-zipline.jpg",
      description: "Siente la adrenalina volando sobre aguas turquesas en nuestra tirolesa exclusiva."
    },
    {
      title: "Tour Privado",
      location: "Mónaco",
      rating: "5.0",
      image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9",
      description: "Explora los destinos más lujosos con guía privado y transporte VIP.",
    },
    {
      title: "Jet Ski",
      location: "Maldivas",
      rating: "4.8",
      image: "https://images.pexels.com/photos/18972198/pexels-photo-18972198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      description: "Domina las olas con nuestras motos de agua de última generación."
    },
    {
      title: "Buceo Premium",
      location: "Polinesia",
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
      description: "Descubre arrecifes vibrantes con instructores certificados.",
    },
  ];

  return (
    <section className="bg-[#FAF9F6] w-full py-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Cabecera con tipografía Serif e Italic */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl font-serif italic mb-4 text-amber-950 tracking-tight">
              Must-Try Experiences
            </h2>
            <p className="text-amber-900/60 max-w-xl text-sm tracking-wide">
              Our most popular curated adventures.
            </p>
          </div>

          <button className="mt-6 md:mt-0 bg-[#c5a267] hover:bg-[#b38e53] text-white px-10 py-3 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase transition-all shadow-md">
            Explore More
          </button>
        </div>

        {/* Grid de Experiencias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {experiences.map((exp, i) => (
            <div key={i} className="group bg-transparent">
              
              {/* Imagen con borde fino dorado */}
              <div className="relative h-72 overflow-hidden rounded-2xl border border-amber-200/50 shadow-sm">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-amber-950 shadow-sm">
                  <span className="text-[#c5a267]">★</span> {exp.rating}
                </div>
              </div>

              {/* Texto y Botón "Ver Detalles" */}
              <div className="py-6 flex flex-col h-full">
                <h3 className="font-serif italic text-2xl text-amber-950 mb-1">
                  {exp.title}
                </h3>
                <p className="text-[#c5a267] text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
                  {exp.location}
                </p>
                <p className="text-amber-900/70 text-[14px] leading-relaxed mb-8 line-clamp-3 font-light">
                  {exp.description}
                </p>

                <button className="w-full border border-amber-200/60 hover:border-[#c5a267] text-amber-900/80 hover:text-amber-950 font-bold py-3.5 px-6 rounded-xl transition-all tracking-[0.25em] text-[10px] uppercase bg-white/50 hover:bg-white shadow-sm">
                  Ver Detalles
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MustTryExperiences;