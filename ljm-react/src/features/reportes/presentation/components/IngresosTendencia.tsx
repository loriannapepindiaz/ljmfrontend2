import React from 'react';

const months = ['Ene', 'Mar', 'May', 'Jul', 'Sep', 'Nov'];

const IngresosTendencia: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-[#0e1a34]">Tendencia de Ingresos Anual</h3>
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-[#eacea9]"></span>
          <span className="text-xs text-slate-500">{currentYear} (Actual)</span>
        </div>
      </div>

      <div className="h-64 relative flex flex-col justify-end">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <span className="material-symbols-outlined text-[48px] text-slate-200 block mb-2">show_chart</span>
            <p className="text-sm text-slate-400">Sin datos disponibles</p>
            <p className="text-xs text-slate-300 mt-1">Los ingresos aparecerán aquí al conectar la BD</p>
          </div>
        </div>
        <div className="flex justify-between mt-4 border-t border-slate-100 pt-4">
          {months.map((m) => (
            <span key={m} className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{m}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IngresosTendencia;