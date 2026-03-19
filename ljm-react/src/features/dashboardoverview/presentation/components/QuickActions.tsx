import React from 'react';

const actions = [
  { icon: 'add_circle',      label: 'Nueva Reserva'      },
  { icon: 'directions_boat', label: 'Añadir Barco'       },
  { icon: 'description',     label: 'Generar Reporte'    },
  { icon: 'mail',            label: 'Contactar Pasajero' },
];

const QuickActions: React.FC = () => {
  return (
    <div className="bg-[#eacea9] text-[#0e1a34] rounded-xl p-6 shadow-sm relative overflow-hidden border border-[#0e1a34]/5">
      <div className="absolute -right-8 -bottom-8 size-32 bg-white/20 rounded-full blur-2xl"></div>
      <h3 className="text-lg font-bold mb-4 relative z-10">Acciones Rápidas</h3>
      <div className="grid grid-cols-2 gap-3 relative z-10">
        {actions.map((action) => (
          <button
            key={action.label}
            className="flex flex-col items-center gap-2 p-4 bg-[#0e1a34]/5 hover:bg-[#0e1a34]/10 rounded-xl transition-all border border-[#0e1a34]/10"
          >
            <span className="material-symbols-outlined">{action.icon}</span>
            <span className="text-xs font-bold text-center">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;