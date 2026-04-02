import { type FC } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Importamos el hook de navegación

interface SummaryProps {
  selectedSuiteName: string | null;
  totalPrice: number;
}

const SummaryBar: FC<SummaryProps> = ({ selectedSuiteName, totalPrice }) => {
  const navigate = useNavigate(); // ✅ Inicializamos el hook
  const hasSelection = !!selectedSuiteName;

  return (
    <div className="bg-[#0e1a34] text-white rounded-[2.5rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between shadow-2xl transition-all duration-500">
      <div className="flex flex-wrap gap-10 md:gap-16 mb-8 md:mb-0">
        
        {/* Sección Alojamiento */}
        <div className="flex flex-col gap-2">
          <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">Alojamiento</p>
          <div className="flex items-center gap-3">
             <span className={`material-symbols-outlined ${hasSelection ? 'text-[#c5a059]' : 'text-gray-600'}`}>
                bed
             </span>
             <p className={`text-lg font-medium ${hasSelection ? 'text-white' : 'text-white/30 italic'}`}>
               {hasSelection ? selectedSuiteName : "Pendiente de selección"}
             </p>
          </div>
        </div>

        {/* Sección Precio Total */}
        <div className="flex flex-col gap-1">
          <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-bold">Total del Itinerario</p>
          <div className="flex items-baseline gap-2">
            <p className={`text-4xl font-bold ${hasSelection ? 'text-white' : 'text-white/20'}`}>
              {hasSelection ? `€${totalPrice.toLocaleString()}` : "€ —"}
            </p>
            {hasSelection && <span className="text-[10px] font-light text-gray-400 uppercase">Tasas incl.</span>}
          </div>
        </div>
      </div>
      
      {/* Botón de Acción Actualizado */}
      <button 
        disabled={!hasSelection}
        onClick={() => navigate('/payment')} // ✅ Ahora te lleva a la página de pago
        className={`group py-5 px-12 rounded-2xl text-[11px] uppercase tracking-[0.2em] font-bold transition-all flex items-center gap-3 shadow-lg ${
          hasSelection 
            ? "bg-[#c5a059] text-[#0e1a34] hover:bg-[#a3844a] active:scale-95" 
            : "bg-gray-800 text-gray-500 cursor-not-allowed opacity-50"
        }`}
      >
        Continuar al Pago {/* ✅ Texto actualizado para ser más claro */}
        <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
          chevron_right
        </span>
      </button>
    </div>
  );
};

export default SummaryBar;