import React from 'react';

const BookingSummary: React.FC = () => {
  return (
    <div
      className="rounded-3xl p-8 border border-[#785d32]/20 shadow-2xl relative overflow-hidden flex flex-col gap-6"
      style={{ background: 'rgba(14, 26, 52, 0.7)', backdropFilter: 'blur(12px)' }}
    >
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <span className="material-symbols-outlined text-7xl text-[#785d32]">receipt_long</span>
      </div>

      <div className="space-y-1">
        <h3 className="text-[#785d32] uppercase tracking-[0.2em] text-[10px] font-bold">Referencia de Reserva</h3>
        <p className="text-2xl font-bold text-white">#SV-8831</p>
      </div>

      <div className="grid grid-cols-1 gap-4 py-6 border-y border-[#eacea9]/10">
        <div className="flex items-center gap-4">
          <div className="size-10 rounded-lg bg-[#0e1a34] flex items-center justify-center border border-[#eacea9]/5">
            <span className="material-symbols-outlined text-[#785d32] text-xl">meeting_room</span>
          </div>
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold leading-none mb-1">Cabina Seleccionada</p>
            <p className="text-sm font-bold text-white">Cubierta 12 • Suite Royal Ocean</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-xs font-bold text-[#eacea9] uppercase tracking-widest flex items-center gap-2">
          <span className="size-1 bg-[#785d32] rounded-full" />
          Incluido
        </h4>
        <ul className="space-y-3">
          {['Gastronomía Todo Incluido', 'Embarque Prioritario', 'Acceso a Veranda Privada'].map((item) => (
            <li key={item} className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#785d32] text-lg">check_circle</span>
              <span className="text-sm text-slate-300">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookingSummary;