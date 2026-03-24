import React, { useState } from 'react';
import DestinationCard from './DestinationCard';

const todosLosDestinos = [
  { 
    id: 1, 
    img: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=800&q=80",
    titulo: "Isla Mombasa", 
    pais: "Kenia", 
    rating: 4.8, 
    descripcion: "Descubre la perla del Índico con playas de arena blanca y una cultura vibrante que te cautivará desde el primer momento."
  },
  { 
    id: 2, 
    img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    titulo: "Ciudad de Addu", 
    pais: "Maldivas", 
    rating: 4.6, 
    descripcion: "Un atolón en forma de corazón que ofrece algunos de los mejores lugares de buceo y snorkel del archipiélago, con aguas cristalinas e inigualables vistas aéreas cinematográficas."
  },
  { 
    id: 3, 
    img: "https://images.unsplash.com/photo-1508964942454-1a56651d54ac?w=800&q=80",
    titulo: "Garden City", 
    pais: "Singapur", 
    rating: 4.4, 
    descripcion: "La modernidad se encuentra con la naturaleza en una de las ciudades portuarias más impresionantes del mundo."
  },
  { 
id: 4,
    img: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=800&q=80",
    titulo: "Giza & El Cairo", 
    pais: "Egipto", 
    rating: 4.9, 
    descripcion: "Un viaje en el tiempo a través de las maravillas de la antigüedad con el confort de la modernidad."
  },
  { 
    id: 5,
    // Burj Al Arab desde la playa al amanecer
    img: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80",
    titulo: "Burj Al Arab Area", 
    pais: "Dubái", 
    rating: 4.9, 
    descripcion: "El epítome del lujo mundial. Experimente la extravagancia árabe en su máximo esplendor desde su suite privada."
  },
  { 
    id: 6, 
    img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
    titulo: "Table Mountain", 
    pais: "Sudáfrica", 
    rating: 4.7, 
    descripcion: "Combine la majestuosidad de la icónica montaña con la elegancia costera de Ciudad del Cabo en una parada inolvidable frente al océano."
  },
  { 
    id: 7, 
    img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
    titulo: "Santorini", 
    pais: "Grecia", 
    rating: 4.9, 
    descripcion: "Casas blancas, cúpulas azules y atardeceres que detienen el tiempo. La joya del Mediterráneo te espera."
  },
  { 
    id: 8, 
    img: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80",
    titulo: "Tokio", 
    pais: "Japón", 
    rating: 4.8, 
    descripcion: "La megalópolis donde la tradición milenaria convive con el futuro más avanzado del planeta."
  },
  { 
    id: 9, 
    img: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&q=80",
    titulo: "Río de Janeiro", 
    pais: "Brasil", 
    rating: 4.7, 
    descripcion: "Playas legendarias, el Cristo Redentor y el ritmo inconfundible del carnaval en la ciudad maravillosa."
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
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div className="max-w-xl">
          <h2 className="magiona-style text-4xl mb-4 text-night">Todos los Destinos</h2>
          <p className="text-night/60">Explore nuestro catálogo completo de puertos y experiencias seleccionadas para los viajeros más exigentes.</p>
        </div>
        <div className="flex gap-4">
          <select className="bg-white border border-gold/20 rounded-full px-6 py-2 text-sm focus:ring-gold focus:border-gold text-night shadow-sm">
            <option>Filtrar por Región</option>
            <option>Mediterráneo</option>
            <option>Caribe</option>
            <option>Asia Pacífico</option>
          </select>
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
            Cargar más destinos
            <span className="material-symbols-outlined">expand_more</span>
          </button>
        ) : (
          <p className="text-[#0e1a34]/40 text-sm uppercase tracking-widest font-medium">
            — No hay más destinos por el momento —
          </p>
        )}
      </div>
    </section>
  );
};

export default DestinationsGrid;