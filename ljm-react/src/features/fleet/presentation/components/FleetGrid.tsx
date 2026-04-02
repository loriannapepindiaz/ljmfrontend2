import React from 'react';
import VesselCard from './VesselCard';
import { VESSELS } from '../../data/vessels'; // Asegúrate de que la ruta sea correcta

const FleetGrid: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Grid de las tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {VESSELS.map((vessel) => (
          <VesselCard 
            key={vessel.id} 
            id={vessel.id}
            title={vessel.title}
            subtitle={vessel.subtitle}
            description={vessel.description}
            length={vessel.length}
            guests={vessel.guests}
            badge={vessel.badge}
            imageSrc={vessel.imageSrc}
          />
        ))}
      </div>
    </div>
  );
};

export default FleetGrid;