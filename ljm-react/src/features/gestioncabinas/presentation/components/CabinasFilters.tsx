import React, { useState } from 'react';

const categories = ['Todas', 'Suite', 'Balcón', 'Vista al Mar'];

const CabinasFilters: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [ship, setShip] = useState('');
  const [deck, setDeck] = useState('');
  const [openDropdown, setOpenDropdown] = useState<'ship' | 'deck' | null>(null);

  const handleClear = () => {
    setActiveCategory('Todas');
    setShip('');
    setDeck('');
    setOpenDropdown(null);
  };

  return (
    <div className="bg-white px-4 py-3 rounded-xl border border-[#0e1a34]/10 mb-8 shadow-sm flex items-center gap-2">

      <span className="text-sm font-bold text-[#0e1a34]/50 whitespace-nowrap shrink-0">
        Filtrar por:
      </span>

      {/* Dropdown Barco */}
      <div className="relative shrink-0">
        <button
          onClick={() => setOpenDropdown(openDropdown === 'ship' ? null : 'ship')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-medium transition-all whitespace-nowrap ${
            ship
              ? 'bg-[#eacea9] text-[#0e1a34] border-[#eacea9]'
              : 'bg-white text-[#0e1a34]/60 border-slate-200 hover:border-[#eacea9]'
          }`}
        >
          {ship || 'Todos los Barcos'}
          <span className="material-symbols-outlined text-[16px]">
            {openDropdown === 'ship' ? 'expand_less' : 'expand_more'}
          </span>
        </button>
        {openDropdown === 'ship' && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />
            <div className="absolute top-full left-0 mt-1 bg-white border border-[#0e1a34]/10 rounded-xl shadow-xl z-50 overflow-hidden min-w-[180px]">
              <button
                onClick={() => { setShip(''); setOpenDropdown(null); }}
                className={`w-full px-4 py-2.5 text-sm text-left transition-colors ${
                  !ship ? 'bg-[#eacea9] text-[#0e1a34] font-bold' : 'text-[#0e1a34]/50 hover:bg-[#eacea9]/10'
                }`}
              >
                Todos los Barcos
              </button>
            </div>
          </>
        )}
      </div>

      {/* Dropdown Cubierta */}
      <div className="relative shrink-0">
        <button
          onClick={() => setOpenDropdown(openDropdown === 'deck' ? null : 'deck')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-medium transition-all whitespace-nowrap ${
            deck
              ? 'bg-[#eacea9] text-[#0e1a34] border-[#eacea9]'
              : 'bg-white text-[#0e1a34]/60 border-slate-200 hover:border-[#eacea9]'
          }`}
        >
          {deck || 'Todas las Cubiertas'}
          <span className="material-symbols-outlined text-[16px]">
            {openDropdown === 'deck' ? 'expand_less' : 'expand_more'}
          </span>
        </button>
        {openDropdown === 'deck' && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />
            <div className="absolute top-full left-0 mt-1 bg-white border border-[#0e1a34]/10 rounded-xl shadow-xl z-50 overflow-hidden min-w-[180px]">
              <button
                onClick={() => { setDeck(''); setOpenDropdown(null); }}
                className={`w-full px-4 py-2.5 text-sm text-left transition-colors ${
                  !deck ? 'bg-[#eacea9] text-[#0e1a34] font-bold' : 'text-[#0e1a34]/50 hover:bg-[#eacea9]/10'
                }`}
              >
                Todas las Cubiertas
              </button>
            </div>
          </>
        )}
      </div>

      {/* Categorías */}
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => setActiveCategory(c)}
          className={`text-sm px-3 py-2 rounded-full font-bold transition-all whitespace-nowrap shrink-0 ${
            activeCategory === c
              ? 'bg-[#0e1a34] text-white shadow-md'
              : 'bg-white border border-slate-200 text-[#0e1a34]/60 hover:border-[#eacea9]'
          }`}
        >
          {c}
        </button>
      ))}

      {/* Limpiar */}
      <button
        onClick={handleClear}
        className="ml-auto flex items-center gap-1 text-sm font-bold text-[#0e1a34]/50 hover:text-[#0e1a34] transition-colors whitespace-nowrap shrink-0"
      >
        <span className="material-symbols-outlined text-[16px]">filter_list</span>
        Limpiar
      </button>

    </div>
  );
};

export default CabinasFilters;