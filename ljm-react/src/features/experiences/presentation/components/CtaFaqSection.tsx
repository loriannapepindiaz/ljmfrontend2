import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const faqs = [
  { q: '¿Cuál es el mejor momento para reservar un tour?', a: 'Recomendamos reservar con al menos 3 meses de anticipación para la temporada alta.' },
  { q: '¿Necesito visa para experiencias en alta mar?', a: 'Los requisitos varían según el destino. Nuestro equipo te guiará a través del proceso.' },
  { q: '¿Qué moneda se usa para los pagos?', a: 'Aceptamos USD, EUR y las principales tarjetas de crédito para todas las reservas.' },
];

const CtaFaqSection = () => {
  const [open, setOpen] = useState<number | null>(null);
  const navigate = useNavigate();

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1600&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 z-0" style={{ background: 'rgba(8,18,38,0.80)' }} />

      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* CTA izquierda */}
        <div className="text-white">
          <h2 className="text-5xl md:text-6xl magiona-style mb-10 leading-tight">
            Planifica Tu<br />
            <span className="text-[#c5a267]">Aventura Sealine Hoy</span>
          </h2>
          <div className="space-y-6 mb-10">
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-[#c5a267]" style={{ fontSize: '20px' }}>mail</span>
              <div>
                <p className="text-white font-semibold text-sm mb-0.5">Contáctanos:</p>
                <p className="text-white/60 text-sm">reservas@ljmsealine.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-[#c5a267]" style={{ fontSize: '20px' }}>call</span>
              <div>
                <p className="text-white font-semibold text-sm mb-0.5">Llámanos:</p>
                <p className="text-white/60 text-sm">+1 800-SEA-LINE (732-5463)</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-[#c5a267]" style={{ fontSize: '20px' }}>share</span>
              <div>
                <p className="text-white font-semibold text-sm mb-0.5">Síguenos en redes sociales:</p>
                <p className="text-white/60 text-sm">@ljmsealine</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate('/destinations')}
            className="bg-[#c5a267] hover:bg-[#b38e53] text-white font-bold py-4 px-10 rounded-full text-sm tracking-wide transition-all hover:scale-105"
          >
            ¡Reserva Tu Viaje Ahora!
          </button>
        </div>

        {/* FAQ derecha */}
        <div
          className="rounded-2xl p-10"
          style={{ backgroundColor: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.12)' }}
        >
          <div className="flex items-center justify-between mb-10">
            <h3 className="magiona-style text-white text-4xl">Preguntas Frecuentes</h3>
            <div className="w-10 h-10 rounded-full bg-[#c5a267] flex items-center justify-center flex-shrink-0 ml-4">
              <span className="material-symbols-outlined text-white" style={{ fontSize: '18px' }}>help</span>
            </div>
          </div>
          <div className="space-y-0">
            {faqs.map((faq, i) => (
              <div key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
                <button
                  className="w-full text-left px-0 py-5 text-white/90 text-base flex justify-between items-center transition-colors"
                  style={{ background: 'transparent' }}
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className="text-[#c5a267]">P: {faq.q}</span>
                  <span className="material-symbols-outlined text-white/60 flex-shrink-0 ml-2" style={{ fontSize: '20px' }}>
                    {open === i ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {open === i && (
                  <div className="pb-5 text-white/60 text-sm">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }} />
          </div>
          <div className="mt-8 text-right">
           <a href="https://instagram.com/ljmsealine" target="_blank" rel="noopener noreferrer" className="text-[#00c2cb] text-sm hover:underline">
            Contáctanos para más información →
           </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CtaFaqSection;