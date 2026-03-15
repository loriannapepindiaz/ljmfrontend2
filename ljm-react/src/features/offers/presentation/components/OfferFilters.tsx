// features/offers/presentation/components/OfferFilters.tsx
import React from 'react';

// ✅ Definimos qué datos necesita recibir el componente
interface OfferFiltersProps {
  activeFilter: string;
  onFilterChange: (category: string) => void;
}

const OfferFilters: React.FC<OfferFiltersProps> = ({ activeFilter, onFilterChange }) => {
  // ✅ Los nombres deben coincidir con la 'category' de tus offers
  const categories = [
    { label: "All Voyages", value: "ALL VOYAGES" },
    { label: "Mediterranean", value: "MEDITERRANEAN" },
    { label: "Caribbean", value: "CARIBBEAN" },
    { label: "Nordic Fjords", value: "NORDIC FJORDS" },
    { label: "Expeditions", value: "EXPEDITIONS" }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 mb-12">
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map((cat) => (
          <button
            key={cat.value}
            // ✅ Al hacer clic, avisamos a la página principal
            onClick={() => onFilterChange(cat.value)}
            className={`px-8 py-3 rounded-full text-xs transition-all duration-300 tracking-widest uppercase font-semibold ${
              // ✅ Si el filtro está activo, se pone dorado. Si no, bordeado.
              activeFilter === cat.value 
                ? "bg-[#C5A059] text-white shadow-lg scale-105" 
                : "border border-white/20 text-white/70 hover:bg-white/10 hover:border-white/40"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </section>
  );
};

export default OfferFilters;