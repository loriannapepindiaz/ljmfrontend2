import React from 'react';
import { useNavigate } from 'react-router-dom';

const UpcomingVoyageCard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="mb-12">
      <div className="relative overflow-hidden rounded-xl bg-[#0e1a34] text-[#eacea9] shadow-2xl flex flex-col lg:flex-row">
        <div className="lg:w-2/3 p-10 z-10 relative">
          <span className="inline-block px-3 py-1 bg-[#eacea9]/20 text-[#eacea9] border border-[#eacea9]/30 text-[10px] uppercase tracking-[0.2em] font-bold mb-6">
            Próxima Expedición
          </span>
          <h2 className="text-4xl font-bold mb-4 text-white" style={{ fontFamily: 'Newsreader, serif' }}>
            Northern Lights Expedition
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-8">
            {[
              { label: 'Salida',   value: 'Dec 14, 2024'          },
              { label: 'Barco',    value: 'M.S. Empress Polaris'  },
              { label: 'Cabina',   value: 'Grand Admiral Suite'   },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-[#eacea9]/60 text-[10px] uppercase tracking-widest font-bold mb-1">{item.label}</p>
                <p className="text-white font-medium">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-4">
            {/* Botón Ver Detalles -> seguimiento-crucero */}
            <button 
              onClick={() => navigate('/seguimiento-crucero')}
              className="px-6 py-2 bg-[#eacea9] text-[#0e1a34] font-bold text-sm rounded transition-all hover:bg-white active:scale-95 shadow-lg"
            >
              Ver Detalles
            </button>
            
            {/* Botón Gestionar Reserva -> manage-booking */}
            <button 
              onClick={() => navigate('/manage-booking')}
              className="px-6 py-2 border border-[#eacea9]/40 text-[#eacea9] font-bold text-sm rounded transition-all hover:bg-white/10 active:scale-95 active:bg-[#eacea9]/20"
            >
              Gestionar Reserva
            </button>
          </div>
        </div>
        <div className="lg:w-1/3 min-h-[300px] relative">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbsZmV9c_Jr8d7BFeAtUwNMTXjA8TWDSl9ZuG_JBDRoiLqzu8rxi--Al9FIE7NFn8FLFXMfchL6_JM9AGjpcXzWZ0fXT2-S1yepUW7SiUM3JSbynsrfzhoDgUglt1NaD9jQXDC343E_hsO6P9zW-dwK3RgG34kocifFjydAlfXFag6T54U2Mbcl8yNO0Hz-hOg0rqldFfX3Xk8drb6bJ0CJ9zHMkv2dCuItaZHWrMoYSjCGG0tREheBYBcoVg9ZePX1sNZOwQWcTyy"
            alt="Northern Lights"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e1a34] via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default UpcomingVoyageCard;