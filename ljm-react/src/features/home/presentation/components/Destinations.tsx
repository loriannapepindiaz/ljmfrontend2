// components/Destinations.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Destination {
  destinoId: number;
  title: string;
  location: string;
  price: string;
  description: string;
  image: string;
  rating: string;
  alt: string;
  duracion_tipica: string;
  puerto_principal: string;
  clima: string;
  idioma: string;
  highlights: string[];
  incluye: string[];
  galeria_urls: string[];
}

const destinationsData: Record<string, Destination[]> = {
  MEDITERRANEAN: [
    {
      destinoId: 1,
      title: 'Odisea de las Islas Griegas',
      location: 'Santorini, Grecia',
      price: '$4,850',
      description: '7 noches de aguas zafiro, pueblos encalados y antigua historia.',
      image: 'https://www.costacruises.com/content/dam/costa/inventory-assets/ports/JTR/jtr-santorini-port-1.jpg',
      rating: '4.9',
      alt: 'Santorini',
      duracion_tipica: '7 noches',
      puerto_principal: 'Puerto de Santorini',
      clima: 'Mediterráneo',
      idioma: 'Griego',
      highlights: ['Oia', 'Puestas de sol', 'Cúpulas azules'],
      incluye: ['Wi-Fi', 'Acceso al spa', 'Mayordomo privado'],
      galeria_urls: [
        'https://images.unsplash.com/photo-1533105079780-92b9be482077',
        'https://images.unsplash.com/photo-1469796466635-455ede028ace',
        'https://www.costacruises.com/content/dam/costa/inventory-assets/ports/JTR/jtr-santorini-port-1.jpg',
      ],
    },
    {
      destinoId: 2,
      title: 'Serenidad Tropical',
      location: 'Archipiélago de Maldivas',
      price: '$6,200',
      description: 'Escapa a un mundo de lagunas cristalinas y bungalows de lujo sobre el agua.',
      image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80',
      rating: '5.0',
      alt: 'Maldivas',
      duracion_tipica: '10 noches',
      puerto_principal: 'Malé',
      clima: 'Ecuatorial',
      idioma: 'Dhivehi',
      highlights: ['Bungalows sobre el agua', 'Snorkel', 'Vida marina'],
      incluye: ['Pensión completa', 'Deportes acuáticos', 'Vuelos internos'],
      galeria_urls: [
        'https://images.unsplash.com/photo-1439066615861-d1af74d74000',
        'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992',
        'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80',
      ],
    },
    {
      destinoId: 3,
      title: 'Sendero de la Aurora Ártica',
      location: 'Fiordos Noruegos',
      price: '$5,100',
      description: 'Presencia la danza de las Luces del Norte desde nuestra cubierta de observación.',
      image: 'https://www.muchbetteradventures.com/magazine/content/images/size/w2000/2021/07/download-11.jpeg',
      rating: '4.8',
      alt: 'Luces del Norte',
      duracion_tipica: '8 noches',
      puerto_principal: 'Bergen',
      clima: 'Ártico',
      idioma: 'Noruego',
      highlights: ['Auroras boreales', 'Fiordos profundos', 'Cascadas'],
      incluye: ['Equipo de expedición', 'Guías expertos', 'Sauna nórdica'],
      galeria_urls: [
        'https://images.unsplash.com/photo-1529963183134-61a90db47eaf',
        'https://images.unsplash.com/photo-1472791108553-c9405341e398',
        'https://www.muchbetteradventures.com/magazine/content/images/size/w2000/2021/07/download-11.jpeg',
      ],
    },
  ],
  CARIBBEAN: [
    {
      destinoId: 4,
      title: 'Escape de Aguas Cristalinas',
      location: 'St. Lucia, Caribe',
      price: '$3,950',
      description: '7 noches de playas pristinas, picos volcánicos y vibrante cultura.',
      image: 'https://virginvoyages.imgix.net/dam/jcr:6a050b05-d71e-4b4b-98a3-28516ab5c08a/IMG-DEST-SaintLucia-466203284-600x400.jpg',
      rating: '4.8',
      alt: 'St. Lucia',
      duracion_tipica: '7 noches',
      puerto_principal: 'Castries',
      clima: 'Tropical',
      idioma: 'Inglés',
      highlights: ['The Pitons', 'Baños de lodo', 'Playas de arena negra'],
      incluye: ['Tours guiados', 'Barra libre', 'Cena romántica'],
      galeria_urls: [
        'https://images.unsplash.com/photo-1548574505-5e239809ee19',
        'https://images.unsplash.com/photo-1563214532-6a6ca7f3b890',
        'https://virginvoyages.imgix.net/dam/jcr:6a050b05-d71e-4b4b-98a3-28516ab5c08a/IMG-DEST-SaintLucia-466203284-600x400.jpg',
      ],
    },
    {
      destinoId: 5,
      title: 'Aventura Islas Saltadoras',
      location: 'Barbados',
      price: '$4,200',
      description: 'Explora múltiples islas con arenas blancas y destilerías de ron.',
      image: 'https://images.squarespace-cdn.com/content/v1/5a3be8234c326dac28c79f25/1678327553646-L3GS6GA0XW3N9IJOZ0FS/Writer%27sCorner_BB_21_V1_CraneBeach.jpg',
      rating: '4.9',
      alt: 'Barbados',
      duracion_tipica: '7 noches',
      puerto_principal: 'Bridgetown',
      clima: 'Tropical',
      idioma: 'Inglés',
      highlights: ['Cata de ron', 'Nado con tortugas', 'Cuevas de Harrison'],
      incluye: ['Catamarán sunset', 'Equipo de snorkel', 'Traslados'],
      galeria_urls: [
        'https://images.unsplash.com/photo-1519046904884-53103b34b206',
        'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57',
        'https://images.squarespace-cdn.com/content/v1/5a3be8234c326dac28c79f25/1678327553646-L3GS6GA0XW3N9IJOZ0FS/Writer%27sCorner_BB_21_V1_CraneBeach.jpg',
      ],
    },
    {
      destinoId: 6,
      title: 'Viaje Riviera Maya',
      location: 'Cozumel, México',
      price: '$4,500',
      description: 'Sumérgete en ruinas antiguas y aguas turquesas.',
      image: 'https://www.celebritycruises.com/content/dam/celebrity/new-images/port-pages/cozumel/white-beach-of-cozumel-mexico-3840x2160.jpg',
      rating: '5.0',
      alt: 'Cozumel',
      duracion_tipica: '6 noches',
      puerto_principal: 'Cozumel',
      clima: 'Subtropical',
      idioma: 'Español',
      highlights: ['Ruinas Mayas', 'Arrecifes', 'Jungla'],
      incluye: ['All inclusive', 'Acceso a parques', 'Tours arqueológicos'],
      galeria_urls: [
        'https://images.unsplash.com/photo-1533719071182-182827365e8a',
        'https://images.unsplash.com/photo-1504512485720-7d83a16ee930',
        'https://www.celebritycruises.com/content/dam/celebrity/new-images/port-pages/cozumel/white-beach-of-cozumel-mexico-3840x2160.jpg',
      ],
    },
  ],
  ALASKA: [
    {
      destinoId: 7,
      title: 'Búsqueda de Glaciares',
      location: 'Glacier Bay, Alaska',
      price: '$5,000',
      description: '7 noches explorando glaciares majestuosos y vida silvestre.',
      image: 'https://www.hollandamerica.com/blog/wp-content/uploads/2023/05/alaska-cruise-glacier-viewing.webp',
      rating: '4.8',
      alt: 'Glacier Bay',
      duracion_tipica: '12 noches',
      puerto_principal: 'Juneau',
      clima: 'Frío alpino',
      idioma: 'Inglés',
      highlights: ['Avistamiento de ballenas', 'Trekking en glaciar', 'Safari fotográfico'],
      incluye: ['Chaquetas térmicas', 'Binoculares', 'Charlas de naturalistas'],
      galeria_urls: [
        'https://images.unsplash.com/photo-1534447677768-be436bb09401',
        'https://images.unsplash.com/photo-1544411047-c4915837c737',
        'https://www.hollandamerica.com/blog/wp-content/uploads/2023/05/alaska-cruise-glacier-viewing.webp',
      ],
    },
    {
      destinoId: 16,
      title: 'Maravilla de Vida Silvestre',
      location: 'Sitka, Alaska',
      price: '$5,300',
      description: 'Encuentra osos, ballenas y águilas en la naturaleza pristina.',
      image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2f/cb/39/5a/a-mother-sitka-brown.jpg?w=1200&h=-1&s=1',
      rating: '4.9',
      alt: 'Sitka',
      duracion_tipica: '8 noches',
      puerto_principal: 'Puerto de Sitka',
      clima: 'Frío templado, mejor época: may–sep',
      idioma: 'Inglés',
      highlights: ['Avistamiento de osos', 'Ballenas jorobadas', 'Águilas calvas'],
      incluye: ['Chaquetas impermeables', 'Binoculares', 'Guías naturalistas'],
      galeria_urls: [
        'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800',
        'https://images.unsplash.com/photo-1544411047-c4915837c737?w=800',
        'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2f/cb/39/5a/a-mother-sitka-brown.jpg?w=1200&h=-1&s=1',
      ],
    },
    {
      destinoId: 17,
      title: 'Frontera del Norte',
      location: 'Skagway, Alaska',
      price: '$4,700',
      description: 'Revive la era de la Fiebre del Oro con paseos en tren escénicos.',
      image: 'https://www.royalcaribbean.com/media-assets/pmc/content/dam/shore-x/skagway-sgy/ska6-white-pass-legacy-club-luxury-railway-experience/stock-photo-skagway-alaska-the-scenic-white-pass-yukon-route-railroad-342932285.jpg?w=1440',
      rating: '4.7',
      alt: 'Skagway',
      duracion_tipica: '7 noches',
      puerto_principal: 'Puerto de Skagway',
      clima: 'Frío subártico, mejor época: jun–ago',
      idioma: 'Inglés',
      highlights: ['Tren White Pass', 'Sendero Chilkoot', 'Historia de la Fiebre del Oro'],
      incluye: ['Paseo en tren panorámico', 'Visita a museos', 'Almuerzo tradicional'],
      galeria_urls: [
        'https://images.unsplash.com/photo-1503435980610-a51f3ddfee50?w=800',
        'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800',
        'https://www.royalcaribbean.com/media-assets/pmc/content/dam/shore-x/skagway-sgy/ska6-white-pass-legacy-club-luxury-railway-experience/stock-photo-skagway-alaska-the-scenic-white-pass-yukon-route-railroad-342932285.jpg?w=1440',
      ],
    },
  ],
  'SOUTH PACIFIC': [
    {
      destinoId: 8,
      title: 'Islas del Paraíso',
      location: 'Bora Bora, Polinesia Francesa',
      price: '$6,500',
      description: 'Bungalows sobre el agua y aventuras en laguna.',
      image: 'https://www.tahititourisme.com/app/uploads/iris-images/4122/p2-bora-bora-00242-borabora-a-gregoire-le-bacon-lionailes-2736x1824-1-1920x1080-f50_50.webp',
      rating: '5.0',
      alt: 'Bora Bora',
      duracion_tipica: '9 noches',
      puerto_principal: 'Vaitape',
      clima: 'Tropical',
      idioma: 'Francés',
      highlights: ['Laguna Azul', 'Monte Otemanu', 'Motu picnic'],
      incluye: ['Masajes polinesios', 'Desayuno en canoa', 'Champán'],
      galeria_urls: [
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
        'https://images.unsplash.com/photo-1506929197914-5936936a4023',
        'https://www.tahititourisme.com/app/uploads/iris-images/4122/p2-bora-bora-00242-borabora-a-gregoire-le-bacon-lionailes-2736x1824-1-1920x1080-f50_50.webp',
      ],
    },
    {
      destinoId: 9,
      title: 'Aventura de Arrecife de Coral',
      location: 'Gran Barrera de Coral, Australia',
      price: '$5,800',
      description: 'Bucea en el sistema de arrecifes de coral más grande del mundo.',
      image: 'https://passions.com.au/wp-content/uploads/2016/12/ChristianMiller_reefsnorkel_passions-1-of-1.jpg',
      rating: '4.9',
      alt: 'Gran Barrera de Coral',
      duracion_tipica: '11 noches',
      puerto_principal: 'Cairns',
      clima: 'Húmedo tropical',
      idioma: 'Inglés',
      highlights: ['Buceo', 'Vuelo en helicóptero', 'Snorkel'],
      incluye: ['Equipo de buceo', 'Almuerzo buffet', 'Instructor'],
      galeria_urls: [
        'https://images.unsplash.com/photo-1544550581-5f7ceaf7f992',
        'https://images.unsplash.com/photo-1560707303-4e9a4cc2697d',
        'https://passions.com.au/wp-content/uploads/2016/12/ChristianMiller_reefsnorkel_passions-1-of-1.jpg',
      ],
    },
    {
      destinoId: 12,
      title: 'Inmersión Cultural Maorí',
      location: 'Auckland, Nueva Zelanda',
      price: '$5,200',
      description: 'Experimenta la cultura indígena y paisajes impresionantes.',
      image: 'https://www.adventourbegins.com/wp-content/uploads/2021/10/Auckland-cruise-port-min.webp',
      rating: '4.8',
      alt: 'Auckland',
      duracion_tipica: '12 noches',
      puerto_principal: 'Auckland',
      clima: 'Oceánico',
      idioma: 'Maorí/Inglés',
      highlights: ['Cultura Maorí', 'Hobbiton', 'Waitomo Caves'],
      incluye: ['Cena Hangi', 'Entradas museos', 'Hotel 5*'],
      galeria_urls: [
        'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57',
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800',
        'https://www.adventourbegins.com/wp-content/uploads/2021/10/Auckland-cruise-port-min.webp',
      ],
    },
  ],
  'ASIA & ARABIA': [
    {
      destinoId: 13,
      title: 'Maravillas Orientales',
      location: 'Singapur',
      price: '$4,600',
      description: 'Paisajes urbanos futuristas y cocina diversa.',
      image: 'https://cdn-imgix.headout.com/media/images/1b506af365b4cb66e47e109cda9fe6e8-31203-singapore-singapore-river-cruise-by-waterb-02.jpg?auto=format&w=900&h=562.5&q=90&ar=16%3A10&crop=faces%2Ccenter&fit=crop',
      rating: '4.9',
      alt: 'Singapur',
      duracion_tipica: '5 noches',
      puerto_principal: 'Marina Bay',
      clima: 'Ecuatorial',
      idioma: 'Inglés',
      highlights: ['Gardens by the Bay', 'Marina Bay Sands', 'Street Food'],
      incluye: ['Paseo en bote', 'City tour', 'Vuelo en Singapore Flyer'],
      galeria_urls: [
        'https://images.unsplash.com/photo-1525625293386-3fb0ad7c1fe2',
        'https://images.unsplash.com/photo-1563214532-6a6ca7f3b890',
        'https://cdn-imgix.headout.com/media/images/1b506af365b4cb66e47e109cda9fe6e8-31203-singapore-singapore-river-cruise-by-waterb-02.jpg?auto=format&w=900&h=562.5&q=90&ar=16%3A10&crop=faces%2Ccenter&fit=crop',
      ],
    },
    {
      destinoId: 10,
      title: 'Majestad del Desierto',
      location: 'Abu Dhabi, EAU',
      price: '$5,500',
      description: 'Grandes mezquitas y safaris en el desierto.',
      image: 'https://media.cnn.com/api/v1/images/stellar/prod/181122125456-sheikh-zayed-grand-mosque-stock.jpg?q=w_3000,h_2002,x_0,y_0,c_fill',
      rating: '5.0',
      alt: 'Abu Dhabi',
      duracion_tipica: '7 noches',
      puerto_principal: 'Mina Zayed',
      clima: 'Árido',
      idioma: 'Árabe',
      highlights: ['Mezquita Sheikh Zayed', 'Ferrari World', 'Dunas'],
      incluye: ['Safari 4x4', 'Té de la tarde', 'Habitación de lujo'],
      galeria_urls: [
        'https://images.unsplash.com/photo-1493246318656-5bbd4cfb294d',
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
        'https://media.cnn.com/api/v1/images/stellar/prod/181122125456-sheikh-zayed-grand-mosque-stock.jpg?q=w_3000,h_2002,x_0,y_0,c_fill',
      ],
    },
    {
      destinoId: 11,
      title: 'Crucero Cerezos en Flor',
      location: 'Tokio, Japón',
      price: '$5,900',
      description: 'Belleza estacional con templos antiguos y vibras modernas.',
      image: 'https://byfood.b-cdn.net/api/public/assets/9558/content?optimizer=image',
      rating: '4.9',
      alt: 'Tokio',
      duracion_tipica: '10 noches',
      puerto_principal: 'Puerto de Yokohama',
      clima: 'Templado',
      idioma: 'Japonés',
      highlights: ['Sakura', 'Monte Fuji', 'Distrito Shibuya'],
      incluye: ['Ceremonia del té', 'Guía local', 'Transporte JR'],
      galeria_urls: [
        'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d',
        'https://images.unsplash.com/photo-1528164344705-47542687000d',
        'https://byfood.b-cdn.net/api/public/assets/9558/content?optimizer=image',
      ],
    },
  ],
};

const Destinations: React.FC = () => {
  const [activeTab, setActiveTab] = useState('MEDITERRANEAN');
  const navigate = useNavigate();
  const tabs = ['MEDITERRANEAN', 'CARIBBEAN', 'ALASKA', 'SOUTH PACIFIC', 'ASIA & ARABIA'];
  const currentDestinations = destinationsData[activeTab] || [];

  const handleViewDetails = (dest: Destination) => {
    navigate('/destination-details', {
      state: {
        destination: {
          id: dest.destinoId,
          titulo: dest.title,
          pais: dest.location,
          descripcion: dest.description,
          imagen_url: dest.image,
          rating_promedio: dest.rating,
          precio_desde: dest.price,
          duracion_tipica: dest.duracion_tipica,
          puerto_principal: dest.puerto_principal,
          clima: dest.clima,
          idioma: dest.idioma,
          highlights: dest.highlights,
          incluye: dest.incluye,
          galeria_urls: dest.galeria_urls,
        },
      },
    });
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <section className="py-24 bg-[#FDFCF0]">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
      `}</style>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display mb-4 text-gray-900">
            Descubre Tu Próximo Destino
          </h2>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-bold tracking-widest text-gray-500">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`${activeTab === tab ? 'text-[#C5A059] border-b-2 border-[#C5A059]' : 'hover:text-[#C5A059] transition-colors'} pb-1`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'MEDITERRANEAN' ? 'MEDITERRÁNEO' :
                 tab === 'CARIBBEAN' ? 'CARIBE' :
                 tab === 'ALASKA' ? 'ALASKA' :
                 tab === 'SOUTH PACIFIC' ? 'PACÍFICO SUR' : 'ASIA & ARABIA'}
              </button>
            ))}
          </div>
        </div>
        <div key={activeTab} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-fade-in">
          {currentDestinations.map((dest, index) => (
            <div key={index} className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-xl transition-all hover:shadow-2xl">
              <div className="relative h-64 overflow-hidden">
                <img
                  alt={dest.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={dest.image}
                />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-[#C5A059] flex items-center gap-1 shadow-lg">
                  <span className="material-symbols-outlined text-sm">star</span> {dest.rating}
                </div>
              </div>
              <div className="flex flex-1 flex-col p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-2xl font-bold mb-1 text-gray-900 leading-tight">
                      {dest.title}
                    </h4>
                    <p className="text-xs text-gray-500 flex items-center gap-1 uppercase tracking-wider font-medium">
                      <span className="material-symbols-outlined text-sm">location_on</span> {dest.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#C5A059]">{dest.price}</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">por persona</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  {dest.description}
                </p>
                <button
                  className="mt-auto w-full border-2 border-[#C5A059]/50 py-3 rounded-xl text-xs font-bold tracking-wide hover:bg-[#C5A059] hover:text-white transition-all duration-300 text-[#C5A059]"
                  onClick={() => handleViewDetails(dest)}
                >
                  VER DETALLES
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <button
            className="bg-[#C5A059]/10 hover:bg-[#C5A059] hover:text-white px-10 py-4 rounded-full text-xs font-bold tracking-wide transition-all duration-300 text-[#C5A059] border-2 border-[#C5A059]/20 hover:border-[#C5A059]"
            onClick={() => {
              navigate('/destinations');
              window.scrollTo({ top: 0, behavior: 'instant' });
            }}
          >
            MOSTRAR MÁS VIAJES
          </button>
        </div>
      </div>
    </section>
  );
};

export default Destinations;
