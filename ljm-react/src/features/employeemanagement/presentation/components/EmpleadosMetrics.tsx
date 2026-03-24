import React from 'react';

const EmpleadosMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-500 text-sm font-medium">Total Empleados</span>
          <span className="p-2 bg-[#0e1a34]/10 rounded-lg text-[#0e1a34]">
            <span className="material-symbols-outlined text-base">groups</span>
          </span>
        </div>
        <div className="flex items-end gap-2">
          <span className="text-2xl font-bold text-[#0e1a34]">0</span>
          <span className="text-green-600 text-xs font-bold mb-1">0%</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-500 text-sm font-medium">Tripulación Activa</span>
          <span className="p-2 bg-green-50 rounded-lg text-green-600">
            <span className="material-symbols-outlined text-base">anchor</span>
          </span>
        </div>
        <div className="flex items-end gap-2">
          <span className="text-2xl font-bold text-[#0e1a34]">0</span>
          <span className="text-green-600 text-xs font-bold mb-1">0%</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-500 text-sm font-medium">Personal de Licencia</span>
          <span className="p-2 bg-orange-50 rounded-lg text-orange-600">
            <span className="material-symbols-outlined text-base">event_busy</span>
          </span>
        </div>
        <div className="flex items-end gap-2">
          <span className="text-2xl font-bold text-[#0e1a34]">0</span>
          <span className="text-red-600 text-xs font-bold mb-1">0%</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-500 text-sm font-medium">Puestos Vacantes</span>
          <span className="p-2 bg-[#0e1a34]/10 rounded-lg text-[#0e1a34]">
            <span className="material-symbols-outlined text-base">work_outline</span>
          </span>
        </div>
        <div className="flex items-end gap-2">
          <span className="text-2xl font-bold text-[#0e1a34]">0</span>
          <span className="text-green-600 text-xs font-bold mb-1">0%</span>
        </div>
      </div>

    </div>
  );
};

export default EmpleadosMetrics;