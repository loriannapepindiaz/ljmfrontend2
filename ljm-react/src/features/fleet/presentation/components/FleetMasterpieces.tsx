// src/features/fleet/presentation/components/FleetMasterpieces.tsx
import React, { useEffect, useState } from 'react';
import VesselCard from './VesselCard';
import VesselCardSmall from './VesselCardSmall';
import { getFeaturedVessels, getSecondaryVessels, normalizeVesselFromApi, type VesselData } from '../../data/vessels';
import { fleetApi } from '../../../../lib/api';

const FleetMasterpieces: React.FC = () => {
  const [vessels, setVessels] = useState<VesselData[]>([...getFeaturedVessels(), ...getSecondaryVessels()]);
  const featuredVessels = vessels.slice(0, 2);
  const secondaryVessels = vessels.slice(2);

  useEffect(() => {
    const allStatic = [...getFeaturedVessels(), ...getSecondaryVessels()];
    fleetApi
      .list()
      .then((response) => {
        if (response.data?.length) {
          const apiBySlug = new Map(
            response.data.map(normalizeVesselFromApi).map(v => [v.id, v])
          );
          // Merge: use API data for ships that matched, keep static for the rest
          setVessels(allStatic.map(sv => apiBySlug.get(sv.id) ?? sv));
        }
      })
      .catch(() => {
        setVessels(allStatic);
      });
  }, []);

  return (
    <section className="py-24 relative" style={{ backgroundColor: '#f8f7f4' }}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="font-magiona text-4xl md:text-6xl mb-4" style={{ color: '#001D4F' }}>
            Obras Maestras de la Ingenieria
          </h2>
          <p className="max-w-2xl mx-auto text-lg" style={{ color: '#6b7280' }}>
            Cada embarcación de la flota LJM Sealine es un testimonio del diseño sofisticado y la innovación tecnológica.
          </p>
        </div>

        <div className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {featuredVessels.map((vessel) => (
              <div className="rounded-xl overflow-hidden" key={vessel.id}>
                <VesselCard
                  id={vessel.id}
                  title={vessel.title}
                  subtitle={vessel.subtitle}
                  description={vessel.description}
                  length={vessel.length}
                  guests={vessel.guests}
                  badge={vessel.badge}
                  imageSrc={vessel.imageSrc}
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {secondaryVessels.map((vessel) => (
              <div className="rounded-xl overflow-hidden" key={vessel.id}>
                <VesselCardSmall
                  id={vessel.id}
                  title={vessel.title}
                  className={vessel.className}
                  description={vessel.description}
                  imageSrc={vessel.imageSrc}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FleetMasterpieces;
