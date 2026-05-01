// features/offers/presentation/pages/OffersPage.tsx
import React, { useState } from 'react';

import HeroSection from '../components/HeroSection';
import OfferFilters from '../components/OfferFilters';
import OfferCard from '../components/OfferCard';
import Navbar from '../../../home/presentation/components/Navbar';
import Footer from '../../../home/presentation/components/Footer';

const OffersPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('TODOS LOS VIAJES');

  const offers = [
    {
      id: 1,
      title: "Odisea por las Islas Griegas",
      category: "MEDITERRANEAN",
      description: "Vive las ruinas antiguas y las aguas zafiro de las Cícladas a bordo de nuestro buque insignia.",
      // ✅ Santorini atardecer — cúpula azul, casas blancas, mar dorado
      image: "https://images.unsplash.com/photo-1586015298373-f885ba285829?auto=format&fit=crop&w=1200&q=80",
      price: "$4,999",
      discount: "15% DESC.",
      tags: ["Wi-Fi", "Acceso al Spa", "Mayordomo Privado"],
      isReversed: false
    },
   {
  id: 2,
  title: "Maravilla Mediterránea",
  category: "MEDITERRANEAN",
  description: "Explora el glamour de Italia y Francia con descuento exclusivo más créditos a bordo.",
  // ✅ photo-1729538453670 — Niza desde el aire, playa y ciudad de la Costa Azul (AH Morgan)
  image: "https://images.unsplash.com/photo-1729538453670-46fdc2a4d2c4?auto=format&fit=crop&w=1200&q=80",
  price: "$6,800",
  discount: "20% DESC.",
  tags: ["Todo Incluido", "Tours en Tierra", "Bar de Champán"],
  isReversed: true
},
    {
  id: 3,
  title: "Sueño en la Costa Amalfitana",
  category: "MEDITERRANEAN",
  description: "Navega frente a los viñedos verticales y los pueblos de colores pastel de Positano y Amalfi.",
  // ✅ photo-1515400276915 — Positano desde el mar, casas coloridas en acantilado (Khachik Simonian)
  image: "https://images.unsplash.com/photo-1515400276915-8aa3a8fd70f4?auto=format&fit=crop&w=1200&q=80",
  price: "$5,200",
  discount: "10% DESC.",
  tags: ["Degustación de Vinos", "Balcón Privado"],
  isReversed: false
},
    {
      id: 4,
      title: "Sol en la Riviera Española",
      category: "MEDITERRANEAN",
      description: "De Barcelona a Ibiza, disfruta de la vibrante vida nocturna y las playas doradas de España.",
      // ✅ photo-1563784462030 — Ibiza costa con mar azul (David Švihovec)
      image: "https://images.unsplash.com/photo-1563784462030-fe92bbdcf857?auto=format&fit=crop&w=1200&q=80",
      price: "$4,500",
      discount: "MEJORA GRATIS",
      tags: ["Beach Club", "Tapas Españolas"],
      isReversed: true
    },
    {
      id: 5,
      title: "Escape al Paraíso Caribeño",
      category: "CARIBBEAN",
      description: "Descubre arenas blancas y horizontes turquesa en los destinos insulares más exclusivos.",
      // ✅ photo-1519046904884 — playa caribeña arena blanca y palmeras
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80",
      price: "$5,400",
      discount: "10% DESC.",
      tags: ["Acceso al Beach Club", "Deportes Acuáticos", "Barra Libre"],
      isReversed: false
    },
    {
      id: 6,
      title: "Laguna Azul de Bahamas",
      category: "CARIBBEAN",
      description: "Nada con delfines en las aguas cristalinas de las Exumas y disfruta del lujo insular.",
      // ✅ photo-1645539988396 — Shroud Cay, Exumas Bahamas desde el aire (Ryan Geller)
      image: "https://images.unsplash.com/photo-1645539988396-1d65a85fbb4e?auto=format&fit=crop&w=1200&q=80",
      price: "$3,900",
      discount: "25% DESC.",
      tags: ["Tour con Delfines", "Apto para Familias"],
      isReversed: true
    },
    {
      id: 7,
      title: "Retiro de Lujo en St. Barts",
      category: "CARIBBEAN",
      description: "La escapada definitiva para quienes buscan privacidad y compras exclusivas en las Antillas Francesas.",
      // ✅ photo-1578143571332 — yate blanco de lujo en Ibiza al atardecer (Sebastian Coman)
      image: "https://images.unsplash.com/photo-1578143571332-8e104b00dc5a?auto=format&fit=crop&w=1200&q=80",
      price: "$9,500",
      discount: "ACCESO VIP",
      tags: ["Enlace Jet Privado", "Helipuerto"],
      isReversed: false
    },
    {
      id: 8,
      title: "Navegación por Islas Vírgenes",
      category: "CARIBBEAN",
      description: "Explora las ensenadas ocultas y cavernas submarinas de las Islas Vírgenes Británicas y de EE.UU.",
      // ✅ photo-1505118380757 — velero en aguas caribeñas turquesa
      image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1200&q=80",
      price: "$4,200",
      discount: "15% DESC.",
      tags: ["Equipo de Esnórquel", "Bar de Ron"],
      isReversed: true
    },
    {
      id: 9,
      title: "Expedición a los Fiordos Nórdicos",
      category: "NORDIC FJORDS",
      description: "Navega por aguas azul profundo y picos nevados en el corazón de Noruega.",
      // ✅ photo-1531366936337 — fiordo noruego con montañas nevadas
      image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=80",
      price: "$7,250",
      discount: "DESCUENTO ESPECIAL",
      tags: ["Equipo de Expedición", "Biblioteca Polar", "Guías Expertos"],
      isReversed: false
    },
    {
      id: 10,
      title: "Búsqueda de la Aurora Islandesa",
      category: "NORDIC FJORDS",
      description: "Presencia la Aurora Boreal desde la cubierta de nuestro lujoso buque rompehielos especializado.",
      // ✅ photo-1526938972776 — Kirkjufell Islandia con aurora boreal (Landon Arnold)
      image: "https://images.unsplash.com/photo-1526938972776-11558ad4de30?auto=format&fit=crop&w=1200&q=80",
      price: "$8,900",
      discount: "ÚLTIMO MINUTO",
      tags: ["Aurora Boreal", "Spa Termal"],
      isReversed: true
    },
    {
      id: 11,
      title: "Patrimonio de Geirangerfjord",
      category: "NORDIC FJORDS",
      description: "Un recorrido Patrimonio de la Humanidad por el fiordo más hermoso del mundo.",
      // ✅ photo-1441861256423 — cascadas en Geirangerfjord Noruega (Cosmic Timetraveler)
      image: "https://images.unsplash.com/photo-1441861256423-eea295e53fe2?auto=format&fit=crop&w=1200&q=80",
      price: "$6,100",
      discount: "10% DESC.",
      tags: ["Sitio UNESCO", "Clase de Fotografía"],
      isReversed: false
    },
    {
      id: 12,
      title: "Aventura del Sol de Medianoche",
      category: "NORDIC FJORDS",
      description: "Experimenta el fenómeno de la luz solar de 24 horas mientras navegamos hacia el Círculo Ártico.",
      // ✅ photo-1594220937195 — sol de medianoche en Nordkapp, Noruega (Nicola Gambetti)
      image: "https://images.unsplash.com/photo-1594220937195-fb2ed1c8d7e5?auto=format&fit=crop&w=1200&q=80",
      price: "$7,500",
      discount: "CRÉDITO GRATIS A BORDO",
      tags: ["Círculo Ártico", "Sauna"],
      isReversed: true
    }
  ];

  const filteredOffers = activeFilter === 'TODOS LOS VIAJES'
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
              <p className="text-xl text-gray-400 font-light italic">
                No hay ofertas disponibles para esta zona por ahora...
              </p>
            </div>
          )}
        </div>
        {filteredOffers.length > 0 && (
          <section className="mt-24 mb-12 flex justify-center">
            <button
              onClick={() => setActiveFilter('TODOS LOS VIAJES')}
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