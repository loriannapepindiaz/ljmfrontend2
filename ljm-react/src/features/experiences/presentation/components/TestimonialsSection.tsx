import { useState } from 'react';

const allTestimonials = [
  { name: 'Sarah, USA',    initials: 'SA', rating: 5, review: "¡LJM Sealine es una experiencia de ensueño! Las excursiones, la tripulación y la atención al detalle fueron increíbles. ¡No puedo esperar para volver!" },
  { name: 'David, UK',    initials: 'DU', rating: 5, review: "El tour en moto acuática en las Maldivas fue el punto culminante de mi año. Muy recomendable visitar las lagunas escondidas." },
  { name: 'John, AU',     initials: 'JA', rating: 5, review: "Desde la exuberante naturaleza hasta la cálida hospitalidad, LJM Sealine superó todas mis expectativas de viaje de lujo." },
  { name: 'Maria, Spain', initials: 'MS', rating: 5, review: "La combinación de cultura, aventura y relajación en LJM Sealine no tiene igual. ¡Verdaderamente inolvidable!" },
  { name: 'Lucas, FR',    initials: 'LF', rating: 5, review: "Navegar por Mónaco fue un sueño. La tripulación fue atenta, la comida exquisita y las vistas impresionantes." },
  { name: 'Emma, CA',     initials: 'EC', rating: 5, review: "El tirolesa sobre las aguas turquesas del Caribe fue la experiencia más emocionante de mi vida. ¡Absolutamente vale la pena!" },
  { name: 'Carlos, MX',   initials: 'CM', rating: 5, review: "Cada detalle fue perfecto. Desde los tours privados hasta las cenas al atardecer en cubierta, LJM Sealine define el lujo." },
  { name: 'Yuki, JP',     initials: 'YJ', rating: 5, review: "Un viaje extraordinario por la Polinesia. La experiencia de esnórquel fue como nada que hubiera visto antes." },
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
          <h2 className="magiona-style text-white text-4xl">Lo que dicen nuestros huéspedes</h2>
          <button
            onClick={() => window.location.href = '/reviews'}
            className="bg-[#c5a267] hover:bg-[#b38e53] text-white px-8 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all hover:scale-105"
          >
            Ver más comentarios
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
                <div className="w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center bg-[#06122C] border border-[#c5a267]/30 text-[#c5a267] font-semibold text-sm tracking-wider">
                  {t.initials}
                </div>
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