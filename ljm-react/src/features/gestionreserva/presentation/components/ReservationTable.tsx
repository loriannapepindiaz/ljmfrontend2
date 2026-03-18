// features/gestionreserva/presentation/components/ReservationTable.tsx
import React from 'react';

const ReservationTable: React.FC = () => {
  return (
    <div className="bg-card-white rounded-2xl border border-gray-200 shadow-premium overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-off-white border-b border-gray-200">
            <th className="px-8 py-5 text-[11px] font-bold text-gray-500 uppercase tracking-widest">ID Reserva</th>
            <th className="px-8 py-5 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Hóspede</th>
            <th className="px-8 py-5 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Navio</th>
            <th className="px-8 py-5 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Cabine</th>
            <th className="px-8 py-5 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Status</th>
            <th className="px-8 py-5 text-[11px] font-bold text-gray-500 uppercase tracking-widest">Total</th>
            <th className="px-8 py-5 text-[11px] font-bold text-gray-500 uppercase tracking-widest text-center">Acções</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          <tr className="hover:bg-off-white transition-colors">
            <td className="px-8 py-5 font-bold text-maroon-gold">#BK-7701</td>
            <td className="px-8 py-5 text-gray-700">Marco Aurélio</td>
            <td className="px-8 py-5 text-gray-700">Sealine Majestic</td>
            <td className="px-8 py-5 text-gray-700">Suíte Master</td>
            <td className="px-8 py-5">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-bold bg-green-50 text-green-700 border border-green-200">
                Confirmado
              </span>
            </td>
            <td className="px-8 py-5 font-bold text-night-blue">€12.500,00</td>
            <td className="px-8 py-5 text-center">
              <button className="text-gray-500 hover:text-maroon-gold transition-colors">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </td>
          </tr>
          {/* Agrega más filas */}
        </tbody>
      </table>

      <div className="px-8 py-6 bg-off-white flex items-center justify-between border-t border-gray-200">
        <p className="text-xs text-gray-500 font-medium">Mostrando 1 a 5 de 1.284 reservas</p>
        <div className="flex items-center gap-2">
          <button className="size-8 flex items-center justify-center rounded bg-gray-100 text-gray-600 hover:text-maroon-gold transition-colors">
            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
          </button>
          <button className="size-8 flex items-center justify-center rounded bg-maroon-gold text-off-white text-xs font-bold">1</button>
          <button className="size-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 text-xs font-bold">2</button>
          <button className="size-8 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 text-xs font-bold">3</button>
          <button className="size-8 flex items-center justify-center rounded bg-gray-100 text-gray-600 hover:text-maroon-gold transition-colors">
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationTable;