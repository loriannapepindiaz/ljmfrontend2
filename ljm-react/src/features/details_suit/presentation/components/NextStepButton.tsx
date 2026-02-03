// features/details_suit/presentation/components/NextStepButton.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NextStepButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate('/payment')}
      className="w-full bg-maroon-gold hover:bg-maroon-gold/95 text-white py-6 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-4 group"
    >
      <span className="font-bold text-sm uppercase tracking-[0.4em]">02 Personalización</span>
      <span className="material-symbols-outlined text-white group-hover:translate-x-2 transition-transform">arrow_forward</span>
    </button>
  );
};

export default NextStepButton;