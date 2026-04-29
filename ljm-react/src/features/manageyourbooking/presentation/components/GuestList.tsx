import React from 'react';
import GuestCard from './GuestCard';

const guests: Array<{ initials: string; name: string; role: string; isElite: boolean }> = [];

const GuestList: React.FC = () => {
  return (
    <div
      className="rounded-xl p-6"
      style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(16px)', border: '1px solid rgba(234,230,169,0.1)' }}
    >
      <h4 className="text-xl font-bold mb-6 flex items-center gap-3 text-white">
        <span className="material-symbols-outlined text-[#eacea9]">group</span>
        Huespedes
        <button className="ml-auto text-xs font-bold text-[#eacea9] hover:underline flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">add_circle</span>
          Anadir Huesped
        </button>
      </h4>
      <div className="space-y-4">
        {guests.length === 0 ? (
          <div className="rounded-lg border border-dashed border-white/10 bg-white/[0.03] px-4 py-8 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Sin huespedes registrados</p>
            <p className="mt-2 text-xs text-slate-500">Los huespedes apareceran cuando se agreguen a la reserva.</p>
          </div>
        ) : guests.map((g) => (
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
