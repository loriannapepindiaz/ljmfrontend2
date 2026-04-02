import { useState } from 'react';

const allExperiences = [
  {
    title: "Tirolesa sobre el mar",
    location: "CARIBE OCCIDENTAL",
    rating: "4.9",
    image: "https://www.ncl.com/sites/default/files/blog-hero-best-places-zipline.jpg",
    description: "Siente la adrenalina volando sobre aguas turquesas en nuestra tirolesa exclusiva.",
  },
  {
    title: "Tour Privado",
    location: "MÓNACO",
    rating: "5.0",
    image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9",
    description: "Explora los destinos más lujosos con guía privado y transporte VIP.",
  },
  {
    title: "Jet Ski",
    location: "MALDIVAS",
    rating: "4.8",
    image: "https://images.pexels.com/photos/18972198/pexels-photo-18972198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Domina las olas con nuestras motos de agua de última generación.",
  },
  {
    title: "Buceo Premium",
    location: "POLINESIA",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
    description: "Descubre arrecifes vibrantes con instructores certificados.",
  },
  {
    title: "Isla Mombasa",
    location: "KENIA",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=800&q=80",
    description: "Descubre la perla del Índico con playas de arena blanca y una cultura vibrante.",
  },
  {
    title: "Velero Sunset",
    location: "SANTORINI",
    rating: "5.0",
    image: "https://images.unsplash.com/photo-1530053969600-caed2596d242?w=800&q=80",
    description: "Navega al atardecer por las aguas cristalinas del Mediterráneo en velero privado.",
  },
  {
    title: "Safari Marino",
    location: "SEYCHELLES",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?w=800&q=80",
    description: "Explora la vida marina más exótica del océano Índico con guías expertos.",
  },
  {
    title: "Kayak en los Fiordos",
    location: "NORUEGA",
    rating: "4.7",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80",
    description: "Rema entre glaciares y cascadas en uno de los paisajes más impresionantes del mundo.",
  },
];

const MustTryExperiences = () => {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? allExperiences : allExperiences.slice(0, 4);

  return (
    <section className="bg-[#FAF9F6] w-full py-20 px-6">
      <style>{`
        .exp-card {
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
                      box-shadow 0.35s ease;
        }
        .exp-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 48px rgba(0,0,0,0.12);
        }
        .exp-card:hover .exp-img {
          transform: scale(1.06);
        }
        .exp-img {
          transition: transform 0.5s ease;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl font-serif italic mb-3 text-amber-950">Must-Try Experiences</h2>
          <p className="text-amber-900/70 text-sm">Our most popular curated adventures.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visible.map((exp, i) => (
            <div key={i} className="exp-card bg-white rounded-3xl overflow-hidden shadow-md cursor-pointer">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="exp-img w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md">
                  <span className="text-[#c5a267] text-sm">★</span>
                  <span className="text-xs font-bold text-gray-800">{exp.rating}</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-serif text-xl font-semibold text-gray-900 mb-1">{exp.title}</h3>
                <p className="flex items-center gap-1 text-[#c5a267] text-xs tracking-widest uppercase mb-3">
                  <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>location_on</span>
                  {exp.location}
                </p>
                <p className="text-sm text-gray-500 leading-relaxed mb-5 line-clamp-2">{exp.description}</p>
                <button className="w-full bg-[#c5a267] hover:bg-[#b38e53] text-white text-xs font-bold tracking-widest uppercase py-3 rounded-full transition-all hover:scale-105">
                  VER DETALLES
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Botón cargar más / fin */}
        <div className="mt-14 flex flex-col items-center gap-4">
          {!showAll ? (
            <button
              onClick={() => setShowAll(true)}
              className="border border-amber-900/20 hover:border-[#c5a267] text-amber-900/50 hover:text-[#c5a267] px-10 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:scale-105"
            >
              Cargar más experiences
            </button>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-px bg-amber-900/20" />
              <p className="text-amber-900/30 text-xs tracking-widest uppercase">No hay más experiences destacadas</p>
              <div className="w-16 h-px bg-amber-900/20" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MustTryExperiences;