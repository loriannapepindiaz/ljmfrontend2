// features/payment/presentation/components/BackButton.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Importamos el hook

const BackButton: React.FC = () => {
  const navigate = useNavigate(); // ✅ Inicializamos la navegación

  const handleBack = () => {
    navigate('/personalization'); // ✅ Redirige a la página de personalización
  };

  return (
    <button 
      onClick={handleBack} // ✅ Agregamos el evento click
      className="w-full flex items-center justify-center gap-3 py-5 rounded-2xl border border-maroon-gold/40 text-night-blue bg-transparent hover:bg-maroon-gold/5 transition-all duration-300 group"
    >
      <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform text-maroon-gold">
        west
      </span>
      <span className="text-xs font-bold uppercase tracking-[0.3em]">
        Volver a personalization
      </span>
    </button>
  );
};

export default BackButton;
