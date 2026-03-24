import React from 'react';

const PagosMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-green-50 text-green-600 rounded-lg">
            <span className="material-symbols-outlined">payments</span>
          </div>
          <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">0%</span>
        </div>
        <p className="text-slate-500 text-sm font-medium">Ingresos Totales</p>
        <h3 className="text-2xl font-bold text-[#0e1a34] mt-1">$0.00</h3>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
            <span className="material-symbols-outlined">pending_actions</span>
          </div>
          <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">0%</span>
        </div>
        <p className="text-slate-500 text-sm font-medium">Pagos Pendientes</p>
        <h3 className="text-2xl font-bold text-[#0e1a34] mt-1">$0.00</h3>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-red-50 text-red-600 rounded-lg">
            <span className="material-symbols-outlined">undo</span>
          </div>
          <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full">0%</span>
        </div>
        <p className="text-slate-500 text-sm font-medium">Reembolsos</p>
        <h3 className="text-2xl font-bold text-[#0e1a34] mt-1">$0.00</h3>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 bg-[#0e1a34]/5 text-[#0e1a34] rounded-lg">
            <span className="material-symbols-outlined">trending_up</span>
          </div>
          <div className="w-12 h-6 overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 100 40">
              <path d="M0 35 Q 25 35, 40 20 T 80 5 T 100 10" fill="none" stroke="#0e1a34" strokeWidth="3" />
            </svg>
          </div>
        </div>
        <p className="text-slate-500 text-sm font-medium">Crecimiento Mensual</p>
        <h3 className="text-2xl font-bold text-[#0e1a34] mt-1">0%</h3>
      </div>

    </div>
  );
};

export default PagosMetrics;