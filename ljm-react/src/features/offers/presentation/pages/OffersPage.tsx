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
      image: "https://images.unsplash.com/photo-1586015298373-f885ba285829?auto=format&fit=crop&w=1200&q=80",
      price: "$4,999",
      discount: "15% DESC.",
      tags: ["Wi-Fi", "Acceso al Spa", "Mayordomo Privado"],
      isReversed: false,
      galeria_urls: [
        "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
        "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80",
        "https://images.unsplash.com/photo-1469796466635-455ede028ace?w=800&q=80",
      ],
    },
    {
      id: 2,
      title: "Maravilla Mediterránea",
      category: "MEDITERRANEAN",
      description: "Explora el glamour de Italia y Francia con descuento exclusivo más créditos a bordo.",
      image: "https://images.unsplash.com/photo-1729538453670-46fdc2a4d2c4?auto=format&fit=crop&w=1200&q=80",
      price: "$6,800",
      discount: "20% DESC.",
      tags: ["Todo Incluido", "Tours en Tierra", "Bar de Champán"],
      isReversed: true,
      galeria_urls: [
        "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=800&q=80",
        "https://images.unsplash.com/photo-1491166617655-89c28fe8eae3?w=800&q=80",
        "https://images.unsplash.com/photo-1490750967868-88df5691cc14?w=800&q=80",
      ],
    },
    {
      id: 3,
      title: "Sueño en la Costa Amalfitana",
      category: "MEDITERRANEAN",
      description: "Navega frente a los viñedos verticales y los pueblos de colores pastel de Positano y Amalfi.",
      image: "https://images.unsplash.com/photo-1515400276915-8aa3a8fd70f4?auto=format&fit=crop&w=1200&q=80",
      price: "$5,200",
      discount: "10% DESC.",
      tags: ["Degustación de Vinos", "Balcón Privado"],
      isReversed: false,
      galeria_urls: [
        "https://images.unsplash.com/photo-1633321702518-7feccafb94d5?w=800&q=80",
        "https://images.unsplash.com/photo-1519922639192-e73293ca430e?w=800&q=80",
        "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80",
      ],
    },
    {
      id: 4,
      title: "Sol en la Riviera Española",
      category: "MEDITERRANEAN",
      description: "De Barcelona a Ibiza, disfruta de la vibrante vida nocturna y las playas doradas de España.",
      image: "https://images.unsplash.com/photo-1563784462030-fe92bbdcf857?auto=format&fit=crop&w=1200&q=80",
      price: "$4,500",
      discount: "MEJORA GRATIS",
      tags: ["Beach Club", "Tapas Españolas"],
      isReversed: true,
      galeria_urls: [
        "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80",
        "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80",
        "https://images.unsplash.com/photo-1562883676-8c7feb83f09b?w=800&q=80",
      ],
    },
    {
      id: 5,
      title: "Escape al Paraíso Caribeño",
      category: "CARIBBEAN",
      description: "Descubre arenas blancas y horizontes turquesa en los destinos insulares más exclusivos.",
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80",
      price: "$5,400",
      discount: "10% DESC.",
      tags: ["Acceso al Beach Club", "Deportes Acuáticos", "Barra Libre"],
      isReversed: false,
      galeria_urls: [
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
        "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800&q=80",
        "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=800&q=80",
      ],
    },
    {
      id: 6,
      title: "Laguna Azul de Bahamas",
      category: "CARIBBEAN",
      description: "Nada con delfines en las aguas cristalinas de las Exumas y disfruta del lujo insular.",
      image: "https://images.unsplash.com/photo-1645539988396-1d65a85fbb4e?auto=format&fit=crop&w=1200&q=80",
      price: "$3,900",
      discount: "25% DESC.",
      tags: ["Tour con Delfines", "Apto para Familias"],
      isReversed: true,
      galeria_urls: [
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
        "https://images.unsplash.com/photo-1506929197914-5936936a4023?w=800&q=80",
        "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80",
      ],
    },
    {
      id: 7,
      title: "Retiro de Lujo en St. Barts",
      category: "CARIBBEAN",
      description: "La escapada definitiva para quienes buscan privacidad y compras exclusivas en las Antillas Francesas.",
      image: "https://images.unsplash.com/photo-1578143571332-8e104b00dc5a?auto=format&fit=crop&w=1200&q=80",
      price: "$9,500",
      discount: "ACCESO VIP",
      tags: ["Enlace Jet Privado", "Helipuerto"],
      isReversed: false,
      galeria_urls: [
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
        "https://images.unsplash.com/photo-1502781252888-9143ba7f074e?w=800&q=80",
        "https://images.unsplash.com/photo-1563214532-6a6ca7f3b890?w=800&q=80",
      ],
    },
    {
      id: 8,
      title: "Navegación por Islas Vírgenes",
      category: "CARIBBEAN",
      description: "Explora las ensenadas ocultas y cavernas submarinas de las Islas Vírgenes Británicas y de EE.UU.",
      image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1200&q=80",
      price: "$4,200",
      discount: "15% DESC.",
      tags: ["Equipo de Esnórquel", "Bar de Ron"],
      isReversed: true,
      galeria_urls: [
        "https://images.unsplash.com/photo-1483683804023-6ccbe29e5c71?w=800&q=80",
        "https://images.unsplash.com/photo-1560707303-4e9a4cc2697d?w=800&q=80",
        "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=800&q=80",
      ],
    },
    {
      id: 9,
      title: "Expedición a los Fiordos Nórdicos",
      category: "NORDIC FJORDS",
      description: "Navega por aguas azul profundo y picos nevados en el corazón de Noruega.",
      image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=80",
      price: "$7,250",
      discount: "DESCUENTO ESPECIAL",
      tags: ["Equipo de Expedición", "Biblioteca Polar", "Guías Expertos"],
      isReversed: false,
      galeria_urls: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
        "https://images.unsplash.com/photo-1472791108553-c9405341e398?w=800&q=80",
        "https://images.unsplash.com/photo-1529963183134-61a90db47eaf?w=800&q=80",
      ],
    },
    {
      id: 10,
      title: "Búsqueda de la Aurora Islandesa",
      category: "NORDIC FJORDS",
      description: "Presencia la Aurora Boreal desde la cubierta de nuestro lujoso buque rompehielos especializado.",
      image: "https://images.unsplash.com/photo-1526938972776-11558ad4de30?auto=format&fit=crop&w=1200&q=80",
      price: "$8,900",
      discount: "ÚLTIMO MINUTO",
      tags: ["Aurora Boreal", "Spa Termal"],
      isReversed: true,
      galeria_urls: [
        "https://images.unsplash.com/photo-1551009175-15bda6a7dcd9?w=800&q=80",
        "https://images.unsplash.com/photo-1544411047-c4915837c737?w=800&q=80",
        "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&q=80",
      ],
    },
    {
      id: 11,
      title: "Patrimonio de Geirangerfjord",
      category: "NORDIC FJORDS",
      description: "Un recorrido Patrimonio de la Humanidad por el fiordo más hermoso del mundo.",
      image: "https://images.unsplash.com/photo-1441861256423-eea295e53fe2?auto=format&fit=crop&w=1200&q=80",
      price: "$6,100",
      discount: "10% DESC.",
      tags: ["Sitio UNESCO", "Clase de Fotografía"],
      isReversed: false,
      galeria_urls: [
        "https://images.unsplash.com/photo-1504512485720-7d83a16ee930?w=800&q=80",
        "https://images.unsplash.com/photo-1533719071182-182827365e8a?w=800&q=80",
        "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80",
      ],
    },
    {
      id: 12,
      title: "Aventura del Sol de Medianoche",
      category: "NORDIC FJORDS",
      description: "Experimenta el fenómeno de la luz solar de 24 horas mientras navegamos hacia el Círculo Ártico.",
      image: "https://images.unsplash.com/photo-1594220937195-fb2ed1c8d7e5?auto=format&fit=crop&w=1200&q=80",
      price: "$7,500",
      discount: "CRÉDITO GRATIS A BORDO",
      tags: ["Círculo Ártico", "Sauna"],
      isReversed: true,
      galeria_urls: [
        "https://images.unsplash.com/photo-1475688621402-4257c812d6db?w=800&q=80",
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
        "https://images.unsplash.com/photo-1516026672322-bc52d61a4a3d?w=800&q=80",
      ],
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