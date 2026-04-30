import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, CircleMarker, Tooltip, ZoomControl, useMap } from 'react-leaflet';

function MapResizer() {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => map.invalidateSize(), 100);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
}

interface Stop { name: string; position: [number, number] }
interface RouteConfig { center: [number, number]; zoom: number; stops: Stop[]; label: string }

const ROUTES: { keywords: string[]; config: RouteConfig }[] = [
  {
    keywords: ['grecia', 'santorini', 'mykonos', 'greek', 'islas griegas', 'cícladas', 'cycladas', 'athens', 'odisea'],
    config: {
      center: [37.2, 24.5], zoom: 7, label: 'Ruta Islas Griegas',
      stops: [
        { name: 'Athens',    position: [37.9838, 23.7275] },
        { name: 'Mykonos',   position: [37.4467, 25.3289] },
        { name: 'Santorini', position: [36.3932, 25.4615] },
      ],
    },
  },
  {
    keywords: ['maldivas', 'maldives', 'addu', 'serenidad tropical', 'archipiélago de maldivas'],
    config: {
      center: [3.5, 73.0], zoom: 7, label: 'Archipiélago de Maldivas',
      stops: [
        { name: 'Malé',         position: [4.1755, 73.5093] },
        { name: 'Addu Atoll',   position: [0.6297, 73.1578] },
        { name: 'Baa Atoll',    position: [5.1167, 73.0333] },
      ],
    },
  },
  {
    keywords: ['noruega', 'norway', 'fiordos', 'fjords', 'aurora', 'nórdico', 'nordic', 'geiranger', 'islandia', 'iceland', 'ártico', 'arctic', 'círculo ártico'],
    config: {
      center: [63.0, 8.0], zoom: 5, label: 'Fiordos Nórdicos',
      stops: [
        { name: 'Bergen',      position: [60.3913, 5.3221] },
        { name: 'Geiranger',   position: [62.1040, 7.2064] },
        { name: 'Tromsø',      position: [69.6496, 18.9560] },
      ],
    },
  },
  {
    keywords: ['caribe', 'caribbean', 'st. lucia', 'barbados', 'bahamas', 'cozumel', 'méxico', 'mexico', 'riviera maya', 'islas vírgenes', 'st. barts', 'jamaica'],
    config: {
      center: [15.0, -68.0], zoom: 5, label: 'Ruta Caribeña',
      stops: [
        { name: 'Cozumel',   position: [20.4229, -86.9223] },
        { name: 'Barbados',  position: [13.1939, -59.5432] },
        { name: 'St. Lucia', position: [13.9094, -60.9789] },
      ],
    },
  },
  {
    keywords: ['alaska', 'glacier bay', 'sitka', 'skagway', 'glaciar'],
    config: {
      center: [58.5, -136.0], zoom: 6, label: 'Ruta Alaska',
      stops: [
        { name: 'Skagway',     position: [59.4583, -135.3139] },
        { name: 'Glacier Bay', position: [58.6658, -136.0016] },
        { name: 'Sitka',       position: [57.0531, -135.3300] },
      ],
    },
  },
  {
    keywords: ['bora bora', 'polinesia', 'polynesia', 'tahití', 'tahiti', 'pacífico sur', 'south pacific'],
    config: {
      center: [-16.5, -151.7], zoom: 7, label: 'Polinesia Francesa',
      stops: [
        { name: 'Bora Bora', position: [-16.5004, -151.7415] },
        { name: 'Moorea',    position: [-17.5335, -149.8317] },
        { name: 'Papeete',   position: [-17.5334, -149.5667] },
      ],
    },
  },
  {
    keywords: ['australia', 'gran barrera', 'great barrier', 'reef'],
    config: {
      center: [-18.0, 147.5], zoom: 6, label: 'Gran Barrera de Coral',
      stops: [
        { name: 'Cairns',     position: [-16.9186, 145.7781] },
        { name: 'Whitsundays', position: [-20.2772, 148.9530] },
        { name: 'Townsville', position: [-19.2590, 146.8169] },
      ],
    },
  },
  {
    keywords: ['nueva zelanda', 'new zealand', 'auckland', 'maorí'],
    config: {
      center: [-36.8, 174.7], zoom: 7, label: 'Nueva Zelanda',
      stops: [
        { name: 'Auckland',      position: [-36.8485, 174.7633] },
        { name: 'Bay of Islands', position: [-35.2605, 174.0780] },
        { name: 'Tauranga',      position: [-37.6870, 176.1654] },
      ],
    },
  },
  {
    keywords: ['singapur', 'singapore', 'garden city'],
    config: {
      center: [1.35, 103.82], zoom: 10, label: 'Singapur',
      stops: [
        { name: 'Marina Bay',   position: [1.2819, 103.8636] },
        { name: 'Sentosa',      position: [1.2494, 103.8303] },
        { name: 'Clarke Quay',  position: [1.2906, 103.8465] },
      ],
    },
  },
  {
    keywords: ['dubai', 'abu dhabi', 'eau', 'uae', 'arabia', 'desierto', 'burj'],
    config: {
      center: [24.5, 54.5], zoom: 8, label: 'Emiratos Árabes',
      stops: [
        { name: 'Dubai',     position: [25.2048, 55.2708] },
        { name: 'Abu Dhabi', position: [24.4539, 54.3773] },
        { name: 'Sharjah',   position: [25.3462, 55.4272] },
      ],
    },
  },
  {
    keywords: ['tokio', 'tokyo', 'japón', 'japan', 'cerezos'],
    config: {
      center: [35.65, 139.75], zoom: 9, label: 'Japón',
      stops: [
        { name: 'Tokyo',    position: [35.6762, 139.6503] },
        { name: 'Yokohama', position: [35.4437, 139.6380] },
        { name: 'Osaka',    position: [34.6937, 135.5023] },
      ],
    },
  },
  {
    keywords: ['kenia', 'kenya', 'mombasa'],
    config: {
      center: [-2.5, 38.5], zoom: 7, label: 'Costa de Kenia',
      stops: [
        { name: 'Mombasa',  position: [-4.0435, 39.6682] },
        { name: 'Malindi',  position: [-3.2138, 40.1169] },
        { name: 'Zanzibar', position: [-6.1630, 39.2010] },
      ],
    },
  },
  {
    keywords: ['egipto', 'egypt', 'cairo', 'el cairo', 'giza'],
    config: {
      center: [27.5, 30.5], zoom: 7, label: 'Egipto',
      stops: [
        { name: 'El Cairo', position: [30.0444, 31.2357] },
        { name: 'Giza',     position: [29.9792, 31.1342] },
        { name: 'Luxor',    position: [25.6872, 32.6396] },
      ],
    },
  },
  {
    keywords: ['sudafrica', 'south africa', 'cape town', 'ciudad del cabo', 'table mountain'],
    config: {
      center: [-33.5, 18.5], zoom: 8, label: 'Ciudad del Cabo',
      stops: [
        { name: 'Cape Town',    position: [-33.9249, 18.4241] },
        { name: 'Table Mountain', position: [-33.9628, 18.4098] },
        { name: 'Waterfront',   position: [-33.9022, 18.4231] },
      ],
    },
  },
  {
    keywords: ['brasil', 'brazil', 'rio de janeiro', 'río de janeiro'],
    config: {
      center: [-22.9, -43.2], zoom: 9, label: 'Río de Janeiro',
      stops: [
        { name: 'Copacabana',  position: [-22.9711, -43.1822] },
        { name: 'Ipanema',     position: [-22.9838, -43.2096] },
        { name: 'Cristo',      position: [-22.9519, -43.2105] },
      ],
    },
  },
  {
    keywords: ['mónaco', 'monaco', 'tour privado'],
    config: {
      center: [43.7, 7.4], zoom: 10, label: 'Mónaco & Costa Azul',
      stops: [
        { name: 'Mónaco',  position: [43.7384, 7.4246] },
        { name: 'Niza',    position: [43.7102, 7.2620] },
        { name: 'Cannes',  position: [43.5528, 7.0174] },
      ],
    },
  },
  {
    keywords: ['seychelles'],
    config: {
      center: [-4.5, 55.5], zoom: 9, label: 'Seychelles',
      stops: [
        { name: 'Mahé',       position: [-4.6796, 55.4920] },
        { name: 'Praslin',    position: [-4.3191, 55.7433] },
        { name: 'La Digue',   position: [-4.3494, 55.8375] },
      ],
    },
  },
  {
    keywords: ['costa amalfitana', 'amalfi', 'positano', 'italia', 'italy'],
    config: {
      center: [40.6, 14.6], zoom: 9, label: 'Costa Amalfitana',
      stops: [
        { name: 'Nápoles',  position: [40.8518, 14.2681] },
        { name: 'Positano', position: [40.6283, 14.4843] },
        { name: 'Amalfi',   position: [40.6340, 14.6027] },
      ],
    },
  },
  {
    keywords: ['españa', 'spain', 'barcelona', 'ibiza', 'riviera española'],
    config: {
      center: [39.5, 2.5], zoom: 7, label: 'Riviera Española',
      stops: [
        { name: 'Barcelona', position: [41.3851, 2.1734] },
        { name: 'Ibiza',     position: [38.9067, 1.4206] },
        { name: 'Palma',     position: [39.5696, 2.6502] },
      ],
    },
  },
  {
    keywords: ['mediterráneo', 'mediterranean', 'maravilla mediterránea', 'niza', 'france', 'francia'],
    config: {
      center: [43.5, 7.5], zoom: 6, label: 'Mediterráneo',
      stops: [
        { name: 'Mónaco',    position: [43.7384, 7.4246] },
        { name: 'Niza',      position: [43.7102, 7.2620] },
        { name: 'Marsella',  position: [43.2965, 5.3698] },
      ],
    },
  },
];

const DEFAULT_CONFIG: RouteConfig = {
  center: [20.0, 10.0], zoom: 2, label: 'Ruta del Viaje',
  stops: [{ name: 'Destino', position: [20.0, 10.0] }],
};

function findRoute(titulo?: string, pais?: string, ubicacion?: string): RouteConfig {
  const haystack = [titulo, pais, ubicacion].filter(Boolean).join(' ').toLowerCase();
  for (const { keywords, config } of ROUTES) {
    if (keywords.some((kw) => haystack.includes(kw))) return config;
  }
  return DEFAULT_CONFIG;
}

interface VoyageRouteMapProps {
  titulo?: string;
  pais?: string;
  ubicacion?: string;
}

export const VoyageRouteMap = ({ titulo, pais, ubicacion }: VoyageRouteMapProps) => {
  const route = findRoute(titulo, pais, ubicacion);

  return (
    <div className="lg:w-1/2 flex flex-col bg-midnight-blue/40 rounded-[2.5rem] border border-white/10 p-10 relative overflow-hidden">
      <div className="flex flex-col flex-1 relative z-10">

        <div className="flex items-center mb-6 flex-shrink-0">
          <h4 className="text-xs font-bold tracking-widest uppercase text-pearl-beige">Ruta del Viaje</h4>
        </div>

        <style>{`
          .route-map-container .leaflet-top.leaflet-right {
            top: 12px;
            right: 12px;
          }
          .route-map-container .leaflet-control-zoom {
            border: none !important;
            border-radius: 6px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            box-shadow: 0 4px 16px rgba(0,0,0,0.5);
          }
          .route-map-container .leaflet-control-zoom a {
            background: #0e1a34 !important;
            color: #C5A059 !important;
            border: none !important;
            width: 32px !important;
            height: 32px !important;
            line-height: 32px !important;
            font-size: 16px !important;
            font-weight: bold !important;
          }
          .route-map-container .leaflet-control-zoom a:hover {
            background: #162240 !important;
            color: #C5A059 !important;
          }
          .route-map-container .leaflet-control-zoom-in {
            border-bottom: 1px solid rgba(197,160,89,0.2) !important;
          }
        `}</style>
        <div className="route-map-container flex-1 rounded-2xl overflow-hidden isolate" style={{ minHeight: '360px' }}>
          <MapContainer
            key={route.label}
            center={route.center}
            zoom={route.zoom}
            style={{ height: '100%', width: '100%', minHeight: '360px' }}
            zoomControl={false}
            scrollWheelZoom={true}
            dragging={true}
            touchZoom={true}
            doubleClickZoom={true}
            keyboard={true}
            attributionControl={false}
          >
            <MapResizer />
            <ZoomControl position="topright" />
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            />

            {route.stops.length > 1 && (
              <Polyline
                positions={route.stops.map((s) => s.position)}
                pathOptions={{ color: '#C5A059', weight: 2, dashArray: '8 5', opacity: 0.9 }}
              />
            )}

            {route.stops.map((stop, i) => (
              <CircleMarker
                key={stop.name}
                center={stop.position}
                radius={i === 0 || i === route.stops.length - 1 ? 7 : 5}
                pathOptions={{ color: '#C5A059', fillColor: '#C5A059', fillOpacity: 1, weight: 2 }}
              >
                <Tooltip permanent direction="top" offset={[0, -10]} className="leaflet-label-custom">
                  {stop.name.toUpperCase()}
                </Tooltip>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>{/* route-map-container */}

        <div className="mt-6 space-y-4 flex-shrink-0">
          <div className="flex justify-between text-[11px] text-pearl-beige/80 font-bold uppercase tracking-widest">
            <span>{route.label}</span>
            <span className="text-primary">En Tránsito</span>
          </div>
          <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden">
            <div className="bg-primary w-2/3 h-full shadow-[0_0_10px_rgba(197,160,89,0.5)]" />
          </div>
        </div>

      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/10 rounded-full blur-[100px]" />
    </div>
  );
};
