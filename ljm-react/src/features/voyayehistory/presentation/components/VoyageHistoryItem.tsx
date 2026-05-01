import React from 'react';

interface VoyageHistoryItemProps {
  imagen: string;
  titulo: string;
  barco: string;
  fechas: string;
  monto: string;
  estado: string;
}

const VoyageHistoryItem: React.FC<VoyageHistoryItemProps> = ({
  imagen, titulo, barco, fechas, monto, estado
}) => {
  return (
    <div className="group bg-white p-6 rounded-lg border border-transparent hover:border-[#eacea9]/30 hover:shadow-sm transition-all flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-6 w-full md:w-auto">
        <div className="h-16 w-16 rounded overflow-hidden flex-shrink-0 bg-slate-100">
          <img
            src={imagen}
            alt={titulo}
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
          />
        </div>
        <div>
          <h4 className="text-lg font-bold text-[#0e1a34]" style={{ fontFamily: 'Newsreader, serif' }}>
            {titulo}
          </h4>
          <p className="text-sm text-slate-500 font-medium">{barco} • {fechas}</p>
        </div>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-12 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Total</p>
          <p className="text-sm font-bold text-[#0e1a34]" style={{ fontFamily: 'Newsreader, serif' }}>
            {monto}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-widest rounded-full">
            {estado}
          </span>
          <button className="text-[#0e1a34] hover:text-[#eacea9] transition-colors">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoyageHistoryItem;