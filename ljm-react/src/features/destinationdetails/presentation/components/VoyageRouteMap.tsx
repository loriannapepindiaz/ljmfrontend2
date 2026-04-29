import React from 'react';
import { MapContainer, TileLayer, Polyline, CircleMarker, Tooltip } from 'react-leaflet';

const stops = [
  { name: 'Athens',    position: [37.9838, 23.7275] as [number, number] },
  { name: 'Santorini', position: [36.3932, 25.4615] as [number, number] },
  { name: 'Mykonos',   position: [37.4467, 25.3289] as [number, number] },
];

const routePositions = stops.map((s) => s.position);

export const VoyageRouteMap = () => {
  return (
    <div className="lg:w-1/2 flex flex-col bg-midnight-blue/40 rounded-[2.5rem] border border-white/10 p-10 relative overflow-hidden">
      <div className="flex flex-col flex-1 relative z-10">

        <div className="flex justify-between items-center mb-6 flex-shrink-0">
          <h4 className="text-xs font-bold tracking-widest uppercase text-pearl-beige">Ruta del Viaje</h4>
          <span className="text-[10px] text-primary bg-primary/10 px-4 py-1.5 rounded-full border border-primary/30 uppercase tracking-[0.2em] font-bold">
            Mapa Interactivo
          </span>
        </div>

        <div className="flex-1 rounded-2xl overflow-hidden isolate" style={{ minHeight: '360px', pointerEvents: 'none' }}>
          <MapContainer
            center={[37.2, 24.5]}
            zoom={7}
            style={{ height: '100%', width: '100%', minHeight: '360px' }}
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

        <div className="mt-6 space-y-4 flex-shrink-0">
          <div className="flex justify-between text-[11px] text-pearl-beige/80 font-bold uppercase tracking-widest">
            <span>Días 1-2: Golfo Sarónico</span>
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
