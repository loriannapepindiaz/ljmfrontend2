import React from 'react';
import GuestCard from './GuestCard';

const guests = [
  { initials: 'AR', name: 'Antonia Robles', role: 'Miembro Elite', isElite: true  },
  { initials: 'JD', name: 'Julian Delgado', role: 'Invitado',       isElite: false },
];

const GuestList: React.FC = () => {
  return (
    <div
      className="rounded-xl p-6"
      style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(16px)', border: '1px solid rgba(234,230,169,0.1)' }}
    >
      <h4 className="text-xl font-bold mb-6 flex items-center gap-3 text-white">
        <span className="material-symbols-outlined text-[#eacea9]">group</span>
        Huéspedes
        <button className="ml-auto text-xs font-bold text-[#eacea9] hover:underline flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">add_circle</span>
          Añadir Huésped
        </button>
      </h4>
      <div className="space-y-4">
        {guests.map((g) => (
          <GuestCard
            key={g.initials}
            guest={g}
            onEdit={() => console.log('Editar', g.name)}
            onDelete={() => console.log('Eliminar', g.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default GuestList;