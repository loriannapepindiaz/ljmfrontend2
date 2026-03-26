import React from 'react';

const FormHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-end mb-8">
      <div>
        <h1 className="text-4xl font-bold text-[#0e1a34] mb-1">Añadir Nuevo Empleado</h1>
        <p className="text-slate-500 text-xs">
          Inicie el proceso de contratación ingresando las credenciales requeridas para la flota élite.
        </p>
      </div>
      <div className="flex gap-4">
        <button className="px-6 py-2.5 text-[10px] uppercase font-bold tracking-widest text-slate-400 hover:text-[#0e1a34] transition-colors">
          Cancelar
        </button>
        <button className="bg-[#0e1a34] text-[#eacea9] px-8 py-2.5 rounded-sm text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 hover:bg-[#1a2b4e] transition-all shadow-sm">
          <span>Registrar Tripulante</span>
          <span className="material-symbols-outlined text-sm">anchor</span>
        </button>
      </div>
    </div>
  );
};

export default FormHeader;