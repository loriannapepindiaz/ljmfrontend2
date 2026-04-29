import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  topClass?: string;
}

const BackButton = ({ topClass = 'top-20' }: BackButtonProps) => {
  const navigate = useNavigate();

  return createPortal(
    <button
      onClick={() => navigate(-1)}
      className={`fixed ${topClass} left-6 z-[9999] flex items-center gap-2 bg-[#0e1a34] border border-[#eacea9]/30 rounded-full px-4 py-2 text-[#eacea9] text-[10px] font-bold uppercase tracking-[0.25em] shadow-lg hover:bg-[#132345] transition-all`}
    >
      <span className="material-symbols-outlined text-sm">arrow_back</span>
      Volver
    </button>,
    document.body
  );
};

export default BackButton;
