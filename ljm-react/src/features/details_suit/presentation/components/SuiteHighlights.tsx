// features/details_suit/presentation/components/SuiteHighlights.tsx
import React from 'react';

const SuiteHighlights: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col h-full">
      <div className="flex justify-between items-start mb-8">
        <h3 className="magiona-title text-2xl text-night-blue font-bold">Detalles de la Suite</h3>
        <span className="text-[10px] font-bold text-maroon-gold uppercase tracking-widest">Royal Owner's Suite</span>
      </div>

      <div className="space-y-6 flex-1">
        {[
          { icon: 'bed', label: 'Cama', value: 'King Size Premium' },
          { icon: 'bathtub', label: 'Baño', value: 'Mármol & Hidromasaje' },
          { icon: 'smart_display', label: 'Tecnología', value: 'Domótica Integral 4K' },
          { icon: 'accessibility_new', label: 'Accesibilidad', value: 'Diseño Universal' },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between group cursor-pointer hover:bg-off-white p-3 -mx-3 rounded-xl transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-pearl-beige/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-maroon-gold">{item.icon}</span>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{item.label}</p>
                <p className="text-sm font-medium text-night-blue">{item.value}</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-gray-300">chevron_right</span>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-8 border-t border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Estado</span>
          <span className="text-[10px] bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold uppercase">Disponible</span>
        </div>
        <p className="text-2xl font-display text-night-blue">
          $2,450 <span className="text-sm font-sans text-gray-400">/ noche</span>
        </p>
      </div>
    </div>
  );
};

export default SuiteHighlights;