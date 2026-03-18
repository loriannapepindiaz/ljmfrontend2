// features/gestionreserva/presentation/components/MetricsGrid.tsx
import React from 'react';

const MetricsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {[
        { title: 'TOTAL RESERVAS', value: '1,284' },
        { title: 'CONFIRMADAS', value: '856' },
        { title: 'PENDIENTES', value: '142' },
        { title: 'RECEITA TOTAL', value: 'R$ 4.2M' },
      ].map((item, i) => (
        <div 
          key={i} 
          className="bg-card-white p-6 rounded-2xl border border-gray-200 shadow-premium text-center"
        >
          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">{item.title}</p>
          <p className="text-3xl font-bold text-night-blue">{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default MetricsGrid;