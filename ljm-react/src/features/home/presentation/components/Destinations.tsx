import React, { useState } from 'react';

interface Destination {
  title: string;
  location: string;
  price: string;
  description: string;
  image: string;
  rating: string;
  alt: string;
}

const destinationsData: Record<string, Destination[]> = {
  MEDITERRANEAN: [
    {
      title: 'Grecian Isles Odyssey',
      location: 'Santorini, Greece',
      price: '$4,850',
      description: '7 nights of sapphire waters, white-washed villages, and ancient history.',
      image: 'https://www.costacruises.com/content/dam/costa/inventory-assets/ports/JTR/jtr-santorini-port-1.jpg',
      rating: '4.9',
      alt: 'Santorini',
    },
    {
      title: 'Tropical Serenity',
      location: 'Maldives Archipelago',
      price: '$6,200',
      description: 'Escape to a world of crystal lagoons and overwater bungalow luxury.',
      image: 'https://cdn-jgkgd.nitrocdn.com/FkCBcvOtYAksFDuGfettYyANMlqvXhPX/assets/images/optimized/rev-f1405ab/honeymoons.com/wp-content/uploads/2023/09/Meeru1.jpg',
      rating: '5.0',
      alt: 'Maldives',
    },
    {
      title: 'Arctic Aurora Path',
      location: 'Norwegian Fjords',
      price: '$5,100',
      description: 'Witness the dance of the Northern Lights from the comfort of our observation deck.',
      image: 'https://www.muchbetteradventures.com/magazine/content/images/size/w2000/2021/07/download-11.jpeg',
      rating: '4.8',
      alt: 'Northern Lights',
    },
  ],
  CARIBBEAN: [
    {
      title: 'Crystal Waters Escape',
      location: 'St. Lucia, Caribbean',
      price: '$3,950',
      description: '7 nights of pristine beaches, volcanic peaks, and vibrant culture.',
      image: 'https://virginvoyages.imgix.net/dam/jcr:6a050b05-d71e-4b4b-98a3-28516ab5c08a/IMG-DEST-SaintLucia-466203284-600x400.jpg',
      rating: '4.8',
      alt: 'St. Lucia',
    },
    {
      title: 'Island Hopper Adventure',
      location: 'Barbados',
      price: '$4,200',
      description: 'Explore multiple islands with white sands and rum distilleries.',
      image: 'https://images.squarespace-cdn.com/content/v1/5a3be8234c326dac28c79f25/1678327553646-L3GS6GA0XW3N9IJOZ0FS/Writer%27sCorner_BB_21_V1_CraneBeach.jpg',
      rating: '4.9',
      alt: 'Barbados',
    },
   {
      title: 'Mayan Riviera Journey',
      location: 'Cozumel, Mexico',
      price: '$4,500',
      description: 'Dive into ancient ruins and turquoise waters bhdbh ibdfhbh.',
      image: 'https://www.celebritycruises.com/content/dam/celebrity/new-images/port-pages/cozumel/white-beach-of-cozumel-mexico-3840x2160.jpg',
      rating: '5.0',
      alt: 'Cozumel',
    },
  ],
  ALASKA: [
    {
      title: 'Glacier Quest',
      location: 'Glacier Bay, Alaska',
      price: '$5,000',
      description: '7 nights exploring majestic glaciers and wildlife.',
      image: 'https://www.hollandamerica.com/blog/wp-content/uploads/2023/05/alaska-cruise-glacier-viewing.webp',
      rating: '4.8',
      alt: 'Glacier Bay',
    },
    {
      title: 'Wildlife Wonderland',
      location: 'Sitka, Alaska',
      price: '$5,300',
      description: 'Encounter bears, whales, and eagles in pristine nature.',
      image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2f/cb/39/5a/a-mother-sitka-brown.jpg?w=1200&h=-1&s=1',
      rating: '4.9',
      alt: 'Sitka',
    },
    {
      title: 'Northern Frontier',
      location: 'Skagway, Alaska',
      price: '$4,700',
      description: 'Relive the Gold Rush era with scenic train rides bhdbh ibdfhbh.',
      image: 'https://www.royalcaribbean.com/media-assets/pmc/content/dam/shore-x/skagway-sgy/ska6-white-pass-legacy-club-luxury-railway-experience/stock-photo-skagway-alaska-the-scenic-white-pass-yukon-route-railroad-342932285.jpg?w=1440',
      rating: '4.7',
      alt: 'Skagway',
    },
  ],
  'SOUTH PACIFIC': [
    {
      title: 'Paradise Isles',
      location: 'Bora Bora, French Polynesia',
      price: '$6,500',
      description: 'Overwater bungalows and lagoon adventures bhdbh ibdfhbh.',
      image: 'https://www.tahititourisme.com/app/uploads/iris-images/4122/p2-bora-bora-00242-borabora-a-gregoire-le-bacon-lionailes-2736x1824-1-1920x1080-f50_50.webp',
      rating: '5.0',
      alt: 'Bora Bora',
    },
    {
      title: 'Coral Reef Adventure',
      location: 'Great Barrier Reef, Australia',
      price: '$5,800',
      description: "Snorkel the world's largest coral reef system bhdbh ibdfhbh.",
      image: 'https://passions.com.au/wp-content/uploads/2016/12/ChristianMiller_reefsnorkel_passions-1-of-1.jpg',
      rating: '4.9',
      alt: 'Great Barrier Reef',
    },
    {
      title: 'Maori Culture Immersion',
      location: 'Auckland, New Zealand',
      price: '$5,200',
      description: 'Experience indigenous culture and stunning landscapes.',
      image: 'https://www.adventourbegins.com/wp-content/uploads/2021/10/Auckland-cruise-port-min.webp',
      rating: '4.8',
      alt: 'Auckland',
    },
  ],
  'ASIA & ARABIA': [
    {
      title: 'Oriental Wonders',
      location: 'Singapore',
      price: '$4,600',
      description: 'Futuristic cityscapes and diverse cuisine bhdbh ibdfhbh.',
      image: 'https://cdn-imgix.headout.com/media/images/1b506af365b4cb66e47e109cda9fe6e8-31203-singapore-singapore-river-cruise-by-waterb-02.jpg?auto=format&w=900&h=562.5&q=90&ar=16%3A10&crop=faces%2Ccenter&fit=crop',
      rating: '4.9',
      alt: 'Singapore',
    },
    {
      title: 'Desert Majesty',
      location: 'Abu Dhabi, UAE',
      price: '$5,500',
      description: 'Grand mosques and desert safaris bhdbh ibdfhbh hsadh as.',
      image: 'https://media.cnn.com/api/v1/images/stellar/prod/181122125456-sheikh-zayed-grand-mosque-stock.jpg?q=w_3000,h_2002,x_0,y_0,c_fill',
      rating: '5.0',
      alt: 'Abu Dhabi',
    },
    {
      title: 'Cherry Blossom Cruise',
      location: 'Tokyo, Japan',
      price: '$5,900',
      description: 'Seasonal beauty with ancient temples and modern vibes.',
      image: 'https://byfood.b-cdn.net/api/public/assets/9558/content?optimizer=image',
      rating: '4.9',
      alt: 'Tokyo',
    },
  ],
};

const Destinations: React.FC = () => {
  const [activeTab, setActiveTab] = useState('MEDITERRANEAN');

  const tabs = ['MEDITERRANEAN', 'CARIBBEAN', 'ALASKA', 'SOUTH PACIFIC', 'ASIA & ARABIA'];

  const currentDestinations = destinationsData[activeTab] || [];

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
            Discover Your Next Destination
          </h2>
          <div className="flex flex-wrap justify-center gap-4 text-xs font-bold tracking-widest text-gray-500">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`${activeTab === tab ? 'text-primary border-b-2 border-primary' : 'hover:text-primary transition-colors'} pb-1`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div key={activeTab} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-fade-in">
          {currentDestinations.map((dest, index) => (
            <div key={index} className="premium-card rounded-2xl overflow-hidden group">
              <div className="relative h-64">
                <img
                  alt={dest.alt}
                  className="w-full h-full object-cover"
                  src={dest.image}
                />
                <div className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">star</span> {dest.rating}
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-2xl font-display mb-1 text-gray-900">
                      {dest.title}
                    </h4>
                    <p className="text-xs text-gray-500 flex items-center gap-1 uppercase tracking-widest">
                      <span className="material-symbols-outlined text-sm">location_on</span> {dest.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-display text-primary">{dest.price}</p>
                    <p className="text-[10px] text-gray-500 uppercase">per person</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  {dest.description}
                </p>
                <button className="w-full border border-primary/50 py-3 rounded-lg text-xs font-bold tracking-[0.2em] group-hover:bg-primary group-hover:text-white transition-all text-gray-900">
                  VIEW DETAILS
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
  <button 
    className="bg-gray-200 hover:bg-primary hover:text-white px-10 py-4 rounded-full text-xs font-bold tracking-[0.2em] transition-all text-gray-900"
    onClick={() => window.location.href = '/destinations'}
  >
    SHOW MORE VOYAGES
  </button>
</div>
      </div>
    </section>
  );
};

export default Destinations;