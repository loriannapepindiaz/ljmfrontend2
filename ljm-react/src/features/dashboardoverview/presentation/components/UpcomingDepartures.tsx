import React from 'react';

const UpcomingDepartures: React.FC = () => {
  return (
    <div className="bg-white border border-[#0e1a34]/10 rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-bold text-[#0e1a34] mb-4">Próximas Salidas</h3>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4 p-3 rounded-lg text-center text-slate-400 text-sm">
          <span className="material-symbols-outlined text-[40px] block text-slate-300">directions_boat</span>
          <p>No hay salidas programadas</p>
        </div>
      </div>
    </div>
  );
};

export default UpcomingDepartures;