import React, { useState } from 'react';
import DestinationCard from './DestinationCard';

const todosLosDestinos = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=800&q=80",
    titulo: "Isla Mombasa",
    pais: "Kenia",
    rating: 4.8,
    descripcion: "Descubre la perla del Indico con playas de arena blanca y una cultura vibrante que te cautivara desde el primer momento.",
    precio: 4800,
    duracion_tipica: "7 noches",
    puerto_principal: "Puerto de Mombasa",
    clima: "Tropical costero",
    idioma: "Suajili / Ingles",
    highlights: ["Casco antiguo", "Playas de Diani", "Fuerte Jesus"],
    incluye: ["Tour cultural", "Snorkel guiado", "Traslados"],
    galeria_urls: ["https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=800&q=80"]
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    titulo: "Ciudad de Addu",
    pais: "Maldivas",
    rating: 4.6,
    descripcion: "Un atolon en forma de corazon que ofrece lugares de buceo y snorkel con aguas cristalinas.",
    precio: 6200,
    duracion_tipica: "8 noches",
    puerto_principal: "Male",
    clima: "Ecuatorial",
    idioma: "Dhivehi",
    highlights: ["Addu Atoll", "Buceo", "Lagunas cristalinas"],
    incluye: ["Equipo de snorkel", "Excursion marina", "Traslados"],
    galeria_urls: ["https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80"]
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1508964942454-1a56651d54ac?w=800&q=80",
    titulo: "Garden City",
    pais: "Singapur",
    rating: 4.4,
    descripcion: "La modernidad se encuentra con la naturaleza en una de las ciudades portuarias mas impresionantes del mundo.",
    precio: 4300,
    duracion_tipica: "5 noches",
    puerto_principal: "Marina Bay",
    clima: "Ecuatorial",
    idioma: "Ingles",
    highlights: ["Gardens by the Bay", "Marina Bay", "Sentosa"],
    incluye: ["City tour", "Paseo nocturno", "Cena panoramica"],
    galeria_urls: ["https://images.unsplash.com/photo-1508964942454-1a56651d54ac?w=800&q=80"]
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=800&q=80",
    titulo: "Giza & El Cairo",
    pais: "Egipto",
    rating: 4.9,
    descripcion: "Un viaje en el tiempo a traves de las maravillas de la antiguedad con el confort de la modernidad.",
    precio: 5100,
    duracion_tipica: "6 noches",
    puerto_principal: "Puerto Said",
    clima: "Desertico",
    idioma: "Arabe",
    highlights: ["Piramides de Giza", "Museo Egipcio", "Nilo"],
    incluye: ["Guia historico", "Entradas", "Traslados privados"],
    galeria_urls: ["https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=800&q=80"]
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80",
    titulo: "Burj Al Arab Area",
    pais: "Dubai",
    rating: 4.9,
    descripcion: "El epitome del lujo mundial. Experimente la extravagancia arabe en su maximo esplendor.",
    precio: 5500,
    duracion_tipica: "7 noches",
    puerto_principal: "Port Rashid",
    clima: "Arido",
    idioma: "Arabe / Ingles",
    highlights: ["Burj Al Arab", "Marina", "Safari en dunas"],
    incluye: ["Safari 4x4", "Cena premium", "Traslados VIP"],
    galeria_urls: ["https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80"]
  },
  {
    id: 6,
    img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
    titulo: "Table Mountain",
    pais: "Sudafrica",
    rating: 4.7,
    descripcion: "Combine la majestuosidad de la montana con la elegancia costera de Ciudad del Cabo.",
    precio: 4700,
    duracion_tipica: "7 noches",
    puerto_principal: "Cape Town",
    clima: "Mediterraneo",
    idioma: "Ingles / Afrikaans",
    highlights: ["Table Mountain", "Waterfront", "Cabo de Buena Esperanza"],
    incluye: ["Teleferico", "Tour de vinos", "Guia local"],
    galeria_urls: ["https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80"]
  },
  {
    id: 7,
    img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
    titulo: "Santorini",
    pais: "Grecia",
    rating: 4.9,
    descripcion: "Casas blancas, cupulas azules y atardeceres que detienen el tiempo.",
    precio: 4850,
    duracion_tipica: "7 noches",
    puerto_principal: "Puerto de Santorini",
    clima: "Mediterraneo",
    idioma: "Griego",
    highlights: ["Oia", "Caldera", "Atardeceres"],
    incluye: ["Tour fotografico", "Cena sunset", "Traslados"],
    galeria_urls: ["https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80"]
  },
  {
    id: 8,
    img: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
    titulo: "Tokio",
    pais: "Japon",
    rating: 4.8,
    descripcion: "La metropolis donde la tradicion milenaria convive con el futuro mas avanzado del planeta.",
    precio: 5900,
    duracion_tipica: "10 noches",
    puerto_principal: "Puerto de Yokohama",
    clima: "Templado",
    idioma: "Japones",
    highlights: ["Shibuya", "Templos", "Monte Fuji"],
    incluye: ["Guia local", "Ceremonia del te", "Transporte"],
    galeria_urls: ["https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80"]
  },
  {
    id: 9,
    img: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&q=80",
    titulo: "Rio de Janeiro",
    pais: "Brasil",
    rating: 4.7,
    descripcion: "Playas legendarias, el Cristo Redentor y el ritmo inconfundible del carnaval.",
    precio: 4400,
    duracion_tipica: "6 noches",
    puerto_principal: "Puerto de Rio",
    clima: "Tropical",
    idioma: "Portugues",
    highlights: ["Copacabana", "Cristo Redentor", "Pan de Azucar"],
    incluye: ["City tour", "Teleferico", "Cena carioca"],
    galeria_urls: ["https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&q=80"]
  },
];

const ITEMS_POR_PAGINA = 6;

const DestinationsGrid = () => {
  const [visibles, setVisibles] = useState(ITEMS_POR_PAGINA);

  const destinosMostrados = todosLosDestinos.slice(0, visibles);
  const hayMas = visibles < todosLosDestinos.length;

  const cargarMas = () => {
    setVisibles(prev => Math.min(prev + ITEMS_POR_PAGINA, todosLosDestinos.length));
  };

  return (
    <section className="max-w-[1200px] mx-auto px-8 lg:px-20 pb-24 pt-8">
      <div className="mb-12">
        <div className="max-w-xl">
          <h2 className="magiona-style text-4xl mb-4 text-night">Todos los Destinos</h2>
          <p className="text-night/60">
            Explore nuestro catalogo completo de puertos y experiencias seleccionadas para los viajeros mas exigentes.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinosMostrados.map(destino => (
          <DestinationCard key={destino.id} destino={destino} />
        ))}
      </div>

      <div className="mt-20 text-center">
        {hayMas ? (
          <button
            onClick={cargarMas}
            className="border-2 border-[#0e1a34] text-[#0e1a34] px-12 py-4 rounded-full font-bold uppercase text-sm tracking-widest hover:bg-[#0e1a34] hover:text-[#eacea9] transition-all duration-300 flex items-center gap-3 mx-auto"
          >
            Cargar mas destinos
            <span className="material-symbols-outlined">expand_more</span>
          </button>
        ) : (
          <p className="text-[#0e1a34]/40 text-sm uppercase tracking-widest font-medium">
            No hay mas destinos por el momento
          </p>
        )}
      </div>
    </section>
  );
};

export default DestinationsGrid;
