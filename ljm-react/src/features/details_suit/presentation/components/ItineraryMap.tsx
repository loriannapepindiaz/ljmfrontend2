// features/details_suit/presentation/components/ItineraryMap.tsx
import React from 'react';
import { MapContainer, TileLayer, Polyline, CircleMarker, Tooltip } from 'react-leaflet';

const stops = [
  { name: 'Barcelona', position: [41.3851, 2.1734] as [number, number] },
  { name: 'Roma',      position: [41.9028, 12.4964] as [number, number] },
  { name: 'Venecia',   position: [45.4408, 12.3155] as [number, number] },
];

const routePositions = stops.map((s) => s.position);

const ItineraryMap: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-12 h-[1px] bg-maroon-gold" />
          <h3 className="text-xs font-bold text-maroon-gold uppercase tracking-[0.3em]">
            Itinerario de Navegación
          </h3>
        </div>
        <span className="text-[10px] text-pearl-beige/60 uppercase tracking-widest font-bold">
          Barcelona — Venecia
        </span>
      </div>

      <div className="rounded-[2rem] overflow-hidden shadow-xl h-[380px] isolate" style={{ pointerEvents: 'none' }}>
        <MapContainer
          center={[43.5, 7.5]}
          zoom={5}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
          scrollWheelZoom={false}
          dragging={false}
          touchZoom={false}
          doubleClickZoom={false}
          keyboard={false}
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          />

          <Polyline
            positions={routePositions}
            pathOptions={{ color: '#C5A059', weight: 2, dashArray: '8 5', opacity: 0.9 }}
          />

          {stops.map((stop, i) => (
            <CircleMarker
              key={stop.name}
              center={stop.position}
              radius={i === 0 || i === stops.length - 1 ? 7 : 5}
              pathOptions={{ color: '#C5A059', fillColor: '#C5A059', fillOpacity: 1, weight: 2 }}
            >
              <Tooltip
                permanent
                direction="top"
                offset={[0, -10]}
                className="leaflet-label-custom"
              >
                {stop.name}
              </Tooltip>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default ItineraryMap;
