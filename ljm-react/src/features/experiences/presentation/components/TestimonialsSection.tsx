import { useState } from 'react';

const allTestimonials = [
  {
    name: 'Sarah, USA',
    rating: 5,
    review: "LJM Sealine is a dream experience! The excursions, the crew, and the attention to detail were amazing. Can't wait to return!",
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'David, UK',
    rating: 5,
    review: "The Jet Ski tour in the Maldives was the highlight of my year. Highly recommend visiting the hidden lagoons.",
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'John, Australia',
    rating: 5,
    review: "From the lush greenery to the warm hospitality, LJM Sealine exceeded all my expectations for luxury travel.",
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
  },
  {
    name: 'Maria, Spain',
    rating: 5,
    review: "The combination of culture, adventure, and relaxation in LJM Sealine is unmatched. Truly unforgettable!",
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    name: 'Lucas, France',
    rating: 5,
    review: "Sailing through Monaco was a dream. The crew was attentive, the food was exquisite, and the views were breathtaking.",
    avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
  },
  {
    name: 'Emma, Canada',
    rating: 5,
    review: "The zip-line over the turquoise waters of the Caribbean was the most thrilling experience of my life. Absolutely worth it!",
    avatar: 'https://randomuser.me/api/portraits/women/21.jpg',
  },
  {
    name: 'Carlos, Mexico',
    rating: 5,
    review: "Every detail was perfect. From the private tours to the sunset dinners on deck, LJM Sealine defines luxury.",
    avatar: 'https://randomuser.me/api/portraits/men/54.jpg',
  },
  {
    name: 'Yuki, Japan',
    rating: 5,
    review: "An extraordinary journey across Polynesia. The snorkeling experience was unlike anything I had ever seen before.",
    avatar: 'https://randomuser.me/api/portraits/women/56.jpg',
  },
];

const TestimonialsSection = () => {
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? allTestimonials : allTestimonials.slice(0, 4);

  return (
    <section className="bg-[#0A1428] py-24 px-6">
      <style>{`
        .testimonial-card {
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
                      box-shadow 0.35s ease,
                      border-color 0.35s ease,
                      background-color 0.35s ease;
        }
        .testimonial-card:hover {
          transform: scale(1.04);
          box-shadow: 0 20px 40px rgba(0,0,0,0.35);
          border-color: rgba(197,162,103,0.4) !important;
          background-color: rgba(255,255,255,0.09) !important;
        }
        .testimonial-card:hover img {
          transform: scale(1.08);
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .testimonial-card img {
          transition: transform 0.35s ease;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-16">
          <h2 className="magiona-style text-white text-4xl">Hear from Our Guests</h2>
          <button
            onClick={() => window.location.href = '/destinations'}
            className="bg-[#c5a267] hover:bg-[#b38e53] text-white px-8 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all hover:scale-105"
          >
            See More Voyages
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {visible.map((t, i) => (
            <div
              key={i}
              className="testimonial-card rounded-2xl p-8 cursor-default"
              style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover flex-shrink-0 ring-2 ring-[#c5a267]/30"
                />
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <div className="flex gap-0.5 mt-1">
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <span key={s} className="text-[#c5a267] text-sm">★</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-white/70 text-sm leading-relaxed italic">"{t.review}"</p>
            </div>
          ))}
        </div>

        {/* Botón cargar más / mensaje fin */}
        <div className="mt-14 flex flex-col items-center gap-4">
          {!showAll ? (
            <button
              onClick={() => setShowAll(true)}
              className="border border-white/20 hover:border-[#c5a267] text-white/70 hover:text-[#c5a267] px-10 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:scale-105"
            >
              Cargar más comentarios
            </button>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-px bg-white/20" />
              <p className="text-white/30 text-xs tracking-widest uppercase">No hay más comentarios destacados</p>
              <div className="w-16 h-px bg-white/20" />
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;