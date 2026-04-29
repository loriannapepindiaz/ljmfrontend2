import React from 'react';
import { useNavigate } from 'react-router-dom';

const UpcomingVoyageCard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="mb-12">
      <div className="relative overflow-hidden rounded-xl bg-[#0e1a34] text-[#eacea9] shadow-2xl">
        <div className="p-10">
          <span className="inline-block px-3 py-1 bg-[#eacea9]/20 text-[#eacea9] border border-[#eacea9]/30 text-[10px] uppercase tracking-[0.2em] font-bold mb-6">
            Proxima Expedicion
          </span>
          <h2 className="text-4xl font-bold mb-4 text-white" style={{ fontFamily: 'Newsreader, serif' }}>
            No hay reserva proxima
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-white/60">
            Cuando exista una reserva activa, aqui se mostraran el destino, el barco, la cabina y las fechas reales.
          </p>
          <div className="mt-8 flex gap-4">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-[#eacea9] text-[#0e1a34] font-bold text-sm rounded transition-all hover:bg-white active:scale-95 shadow-lg"
            >
              Buscar Viaje
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingVoyageCard;
