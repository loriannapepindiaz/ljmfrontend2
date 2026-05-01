import React, { useState } from 'react';

const ReviewForm: React.FC = () => {
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedStar, setSelectedStar] = useState(0);

  return (
    <div className="bg-[#0F1B35] p-10 rounded-lg">
      <h3 className="font-serif text-3xl font-bold text-[#D9E2FF] mb-8">Registra Tu Travesía</h3>

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-2">
          <label className="block text-[11px] uppercase tracking-widest text-[#D9E2FF]/50">
            Nombre del Navegante
          </label>
          <input
            type="text"
            placeholder="ej. Capt. James Sterling"
            className="w-full bg-[#06122C] border-none rounded-lg p-4 text-[#D9E2FF] focus:ring-1 focus:ring-[#DEC29E] transition-all placeholder:text-[#D9E2FF]/30 outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-[11px] uppercase tracking-widest text-[#D9E2FF]/50">
            Correo de Registro
          </label>
          <input
            type="email"
            placeholder="navegante@embarcacion.com"
            className="w-full bg-[#06122C] border-none rounded-lg p-4 text-[#D9E2FF] focus:ring-1 focus:ring-[#DEC29E] transition-all placeholder:text-[#D9E2FF]/30 outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-[11px] uppercase tracking-widest text-[#D9E2FF]/50">
            Mérito del Viaje
          </label>
          <div className="flex gap-2 text-[#DEC29E]">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className="material-symbols-outlined cursor-pointer hover:scale-110 transition-transform"
                style={{
                  fontVariationSettings:
                    i < (hoveredStar || selectedStar) ? "'FILL' 1" : "'FILL' 0",
                }}
                onMouseEnter={() => setHoveredStar(i + 1)}
                onMouseLeave={() => setHoveredStar(0)}
                onClick={() => setSelectedStar(i + 1)}
              >
                star
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-[11px] uppercase tracking-widest text-[#D9E2FF]/50">
            La Experiencia Náutica
          </label>
          <textarea
            rows={4}
            placeholder="Describe tu experiencia con el curador..."
            className="w-full bg-[#06122C] border-none rounded-lg p-4 text-[#D9E2FF] focus:ring-1 focus:ring-[#DEC29E] transition-all placeholder:text-[#D9E2FF]/30 outline-none resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-[#DEC29E] text-[#3E2D14] font-bold uppercase tracking-widest rounded-lg hover:bg-[#FBdEB8] transition-all active:scale-[0.98]"
        >
          Enviar Reseña
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
