import React from 'react';

const EmpleadosHeader: React.FC = () => {
  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-3xl font-bold text-[#0e1a34]">Gestión de Empleados</h2>
        <p className="text-slate-500 mt-1">Monitoree y gestione su fuerza laboral marítima en todos los buques.</p>
      </div>
      <button className="bg-[#eacea9] text-[#0e1a34] px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity">
        <span className="material-symbols-outlined text-base">person_add</span>
        Añadir Empleado
      </button>
    </header>
  );
};

export default EmpleadosHeader;