// features/offers/presentation/pages/OffersPage.tsx
import React, { useState } from 'react';

// Importación de componentes locales
import HeroSection from '../components/HeroSection';
import OfferFilters from '../components/OfferFilters';
import OfferCard from '../components/OfferCard';

// Importación de componentes compartidos
import Navbar from '../../../home/presentation/components/Navbar';
import Footer from '../../../home/presentation/components/Footer';

const OffersPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('ALL VOYAGES');

const offers = [

  {
    id: 1,
    title: "Grecian Isles Odyssey",
    category: "MEDITERRANEAN",
    description: "Experience the ancient ruins and sapphire waters of the Cyclades aboard our flagship vessel.",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80", // islas griegas
    price: "$4,999",
    discount: "15% OFF",
    tags: ["Wi-Fi", "Spa Access", "Private Butler"],
    isReversed: false
  },

  {
    id: 2,
    title: "Mediterranean Marvel",
    category: "MEDITERRANEAN",
    description: "Explore the glamour of Italy and France with an exclusive discount plus on-board credits.",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80", // costa mediterránea
    price: "$6,800",
    discount: "20% OFF",
    tags: ["All-Inclusive", "Shore Tours", "Champagne Bar"],
    isReversed: true
  },

  {
    id: 3,
    title: "Amalfi Coast Dream",
    category: "MEDITERRANEAN",
    description: "Sail past the vertical vineyards and pastel-colored villages of Positano and Amalfi.",
    image: "https://images.unsplash.com/photo-1526481280691-906b1e6f9f5f?auto=format&fit=crop&w=1200&q=80", // Amalfi
    price: "$5,200",
    discount: "10% OFF",
    tags: ["Wine Tasting", "Private Balcony"],
    isReversed: false
  },

  {
    id: 4,
    title: "Spanish Riviera Sun",
    category: "MEDITERRANEAN",
    description: "From Barcelona to Ibiza, enjoy the vibrant nightlife and golden beaches of Spain.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80", // playa ibiza
    price: "$4,500",
    discount: "FREE UPGRADE",
    tags: ["Beach Club", "Spanish Tapas"],
    isReversed: true
  },

  {
    id: 5,
    title: "Caribbean Paradise Escape",
    category: "CARIBBEAN",
    description: "Discover pristine white sands and turquoise horizons across the most exclusive island destinations.",
    image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80", // caribe turquesa
    price: "$5,400",
    discount: "10% OFF",
    tags: ["Beach Club Access", "Water Sports", "Open Bar"],
    isReversed: false
  },

  {
    id: 6,
    title: "Bahamas Blue Lagoon",
    category: "CARIBBEAN",
    description: "Swim with dolphins in the crystal clear waters of the Exumas and enjoy luxury island living.",
    image: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?auto=format&fit=crop&w=1200&q=80", // delfines
    price: "$3,900",
    discount: "25% OFF",
    tags: ["Dolphin Tour", "Family Friendly"],
    isReversed: true
  },

  {
    id: 7,
    title: "St. Barts Luxury Retreat",
    category: "CARIBBEAN",
    description: "The ultimate getaway for those seeking privacy and high-end shopping in the French West Indies.",
    image: "https://images.unsplash.com/photo-1493558103817-58b2924bce98?auto=format&fit=crop&w=1200&q=80", // resort lujo
    price: "$9,500",
    discount: "VIP ACCESS",
    tags: ["Private Jet Link", "Helipad"],
    isReversed: false
  },

  {
    id: 8,
    title: "Virgin Islands Sailing",
    category: "CARIBBEAN",
    description: "Explore the hidden coves and underwater caves of the British and US Virgin Islands.",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80", // velero caribe
    price: "$4,200",
    discount: "15% OFF",
    tags: ["Snorkeling Gear", "Rum Bar"],
    isReversed: true
  },

  {
    id: 9,
    title: "Nordic Fjords Expedition",
    category: "NORDIC FJORDS",
    description: "Navigate through deep blue waters and towering snow-capped peaks in the heart of Norway.",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80", // fiordos
    price: "$7,250",
    discount: "SPECIAL DISCOUNT",
    tags: ["Expedition Gear", "Polar Library", "Expert Guides"],
    isReversed: false
  },

  {
    id: 10,
    title: "Icelandic Aurora Quest",
    category: "NORDIC FJORDS",
    description: "Witness the Northern Lights from the deck of our specialized ice-breaking luxury vessel.",
    image: "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=1200&q=80", // aurora boreal
    price: "$8,900",
    discount: "LAST MINUTE",
    tags: ["Northern Lights", "Thermal Spa"],
    isReversed: true
  },

  {
    id: 11,
    title: "Geirangerfjord Heritage",
    category: "NORDIC FJORDS",
    description: "A UNESCO World Heritage journey through the most beautiful fjord in the world.",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80", // fiordo famoso
    price: "$6,100",
    discount: "10% OFF",
    tags: ["UNESCO Site", "Photography Class"],
    isReversed: false
  },

  {
    id: 12,
    title: "Midnight Sun Adventure",
    category: "NORDIC FJORDS",
    description: "Experience the phenomenon of 24-hour daylight as we sail toward the Arctic Circle.",
    image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80", // sol ártico
    price: "$7,500",
    discount: "FREE ONBOARD CREDIT",
    tags: ["Arctic Circle", "Sauna"],
    isReversed: true
  }

];

  // Lógica de filtrado
  const filteredOffers = activeFilter === 'ALL VOYAGES' 
    ? offers 
    : offers.filter(offer => offer.category === activeFilter);

  return (
    <div className="bg-[#0A1128] min-h-screen font-sans antialiased text-white overflow-x-hidden">
      <Navbar />

      <div className="h-[85vh]">
        <HeroSection />
      </div>

      <main className="relative z-10 mt-24 pb-20">
        <div className="mb-16">
          <OfferFilters 
            activeFilter={activeFilter} 
            onFilterChange={setActiveFilter} 
          />
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-12 space-y-20">
          {filteredOffers.length > 0 ? (
            filteredOffers.map((offer) => (
              <OfferCard 
                key={offer.id}
                title={offer.title}
                description={offer.description}
                image={offer.image}
                price={offer.price}
                discount={offer.discount}
                tags={offer.tags}
                isReversed={offer.isReversed}
              />
            ))
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-400 font-light italic">No hay ofertas disponibles para esta zona por ahora...</p>
            </div>
          )}
        </div>

        {filteredOffers.length > 0 && (
          <section className="mt-24 mb-12 flex justify-center">
            <button 
              onClick={() => setActiveFilter('ALL VOYAGES')}
              className="bg-[#C5A059] text-[#0A1128] px-12 py-5 rounded-full text-lg font-bold uppercase tracking-widest shadow-xl hover:bg-white hover:scale-105 transition-all duration-300 transform active:scale-95"
            >
              Ver Todos Los Viajes
            </button>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default OffersPage;