// features/details_suit/presentation/components/ItineraryMap.tsx
import React from 'react';
import { VoyageRouteMap } from '../../../destinationdetails/presentation/components/VoyageRouteMap';
import type { BookingDestinationDraft } from '../../../../lib/bookingDraft';

interface ItineraryMapProps {
  destination?: BookingDestinationDraft;
}

const ItineraryMap: React.FC<ItineraryMapProps> = ({ destination }) => {
  return (
    <div className="suite-itinerary-map space-y-4">
      <style>{`
        .suite-itinerary-map .route-map-container,
        .suite-itinerary-map .route-map-container .leaflet-container {
          min-height: 260px !important;
          height: 260px !important;
        }

        @media (min-width: 1024px) {
          .suite-itinerary-map .route-map-container,
          .suite-itinerary-map .route-map-container .leaflet-container {
            min-height: 300px !important;
            height: 300px !important;
          }
        }
      `}</style>
      <VoyageRouteMap
        titulo={destination?.titulo}
        pais={destination?.pais}
        ubicacion={destination?.ubicacion}
        className="w-full flex flex-col bg-midnight-blue rounded-[1.5rem] border border-night-blue/10 p-5 relative overflow-hidden shadow-xl"
      />
    </div>
  );
};

export default ItineraryMap;
