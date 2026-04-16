import React from 'react';
import VoyageHistoryItem from './VoyageHistoryItem';

const voyages = [
  {
    imagen: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRaOgq4rG-lufVDOj5G8mPci0lDWmqdV5iIRJAOwYdmw9xZ_tbntqi5dlhUsTZtRfQTrV3oVb70PBZmjp-lb0aHgR5-PKJSFC31Z7qO8BudTi6sPtuZd4qZAjaodUjbGymbCpLSitq6TtNN9fc6C7ZjVvhRgPopyT6EuSdYU9_-WOy8oAPb4BQ3-JuRNhWqsGvmFJpMF07Spv82-rJNxAYicZZltdIT4cGkpQm863aawVRjquLX46XTN7GgyhnjQyEz1uKHDLbCW9z',
    titulo: 'Grecian Islands Escape',
    barco: 'M.V. Athena Majesty',
    fechas: 'Aug 12 - Aug 26, 2023',
    monto: '$12,450.00',
    estado: 'Completado',
  },
  {
    imagen: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpCBQvFwm-tWZ-sbMqr-JS3ioJfuoJlvKIstEzbEdCG0WQRxQEz9DnDW29099WzaRTtvgdOUoPpzpWaCCpDZlEdc2RqLJOV4xwh9d1E_WUcQL0CsI2u2WAUfaGb49xAsxatK6sRz41fJJiIpdyBMSQ8FiUBDP9WHGjxM5pvRJF_2qpvimjEuDjF8sUQzBAKRlgn0_iTQW4VzANXqxhbWTL8uIJifnQde0x7vaVy5vEgYTy7WTPvg9AISjI4k3ERxNx9OyvLGMzIgQs',
    titulo: 'Caribbean Azure Dreams',
    barco: 'M.S. Azure Wave',
    fechas: 'Jan 05 - Jan 18, 2023',
    monto: '$8,900.00',
    estado: 'Completado',
  },
  {
    imagen: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAH-Xp2a3WdM4dM_5t66cDJr6hjBYhwVH2WxNtAuMaOXtxn-L_B3aSxarJ0vA_bl--LnAYPNM_Vll0SJRW8VBzY3dfwSQxZfIwHmDfcQGQ5mu6yDXpbM-UVZ-VPgVuEO_BsJXUfU1w36S5MbnDeg4OyHXrfENu16OotbSKvgMnABh8qwKIMf9SDitpyRDJBVg0Al-PES5YGuAHnO4K9zTwPERr3t2CEgItQzCPRsQI-KAvo7PLIydd_TAiY5QFbzKTtjJ9WIL3lIuGr',
    titulo: 'Norwegian Fjord Heritage',
    barco: 'M.V. Nordic Spirit',
    fechas: 'Oct 22 - Nov 04, 2022',
    monto: '$15,200.00',
    estado: 'Completado',
  },
];

const VoyageHistoryList: React.FC = () => {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-[#0e1a34]" style={{ fontFamily: 'Newsreader, serif' }}>
          Viajes Completados
        </h3>
        <div className="flex gap-2">
          <button className="p-2 border border-slate-200 rounded hover:bg-white transition-colors">
            <span className="material-symbols-outlined text-sm">filter_list</span>
          </button>
          <button className="p-2 border border-slate-200 rounded hover:bg-white transition-colors">
            <span className="material-symbols-outlined text-sm">search</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {voyages.map((v) => (
          <VoyageHistoryItem key={v.titulo} {...v} />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button className="px-8 py-3 border border-[#0e1a34] text-[#0e1a34] font-bold text-xs uppercase tracking-widest hover:bg-[#0e1a34] hover:text-white transition-all">
          Cargar Más Viajes
        </button>
      </div>
    </section>
  );
};

export default VoyageHistoryList;