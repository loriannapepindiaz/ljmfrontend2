import React from 'react';

const inputClass = "w-full rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#eacea9]/50 focus:border-[#eacea9] p-3 text-slate-900 bg-white outline-none text-sm transition-all";

const TechnicalSpecsSection: React.FC = () => {
  return (
    <section className="bg-[#f6f7f8] p-8 rounded-xl border border-slate-200">
      <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-4">
        <span className="material-symbols-outlined text-[#0e1a34]">engineering</span>
        <h3 className="text-xl font-bold text-[#0e1a34]">Especificaciones Técnicas</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
            Año de Fabricación / Refit
          </label>
          <input type="number" placeholder="2023" className={inputClass} />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
            Velocidad de Crucero
          </label>
          <div className="relative">
            <input
              type="number"
              placeholder="22"
              className="w-full rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#eacea9]/50 focus:border-[#eacea9] p-3 pr-16 text-slate-900 bg-white outline-none text-sm transition-all"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs uppercase">
              knots
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700 uppercase tracking-wider">
            Número de Cubiertas
          </label>
          <input type="number" placeholder="12" className={inputClass} />
        </div>
      </div>
    </section>
  );
};

export default TechnicalSpecsSection;