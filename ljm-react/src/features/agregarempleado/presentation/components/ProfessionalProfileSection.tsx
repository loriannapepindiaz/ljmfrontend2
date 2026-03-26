import React from 'react';

const inputClass = "w-full bg-slate-100/50 border-none px-4 py-2.5 rounded-lg focus:ring-1 focus:ring-[#eacea9] outline-none text-sm";

const ProfessionalProfileSection: React.FC = () => {
  return (
    <section className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="bg-slate-50 px-8 py-4 border-b border-slate-100">
        <h2 className="text-xl font-bold text-[#0e1a34]">Perfil y Experiencia Profesional</h2>
      </div>
      <div className="p-8 space-y-8">

        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Cargo / Puesto</label>
            <input type="text" placeholder="e.g. First Mate" className={inputClass} />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Departamento</label>
            <select className={inputClass}>
              <option>Cubierta</option>
              <option>Máquinas</option>
              <option>Servicio</option>
            </select>
          </div>
        </div>

        {/* Certificaciones */}
        <div className="space-y-4">
          <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Certificaciones y Títulos</label>
          <div className="overflow-x-auto border border-slate-100 rounded-lg">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-2 text-[10px] uppercase font-bold text-slate-400">Certificado</th>
                  <th className="px-4 py-2 text-[10px] uppercase font-bold text-slate-400">Entidad Emisora</th>
                  <th className="px-4 py-2 text-[10px] uppercase font-bold text-slate-400 w-32">Vencimiento</th>
                  <th className="px-4 py-2 w-16"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <tr>
                  <td className="px-4 py-3"><input type="text" placeholder="STCW II/2" className="w-full bg-transparent border-none p-0 text-xs focus:ring-0 outline-none" /></td>
                  <td className="px-4 py-3"><input type="text" placeholder="Autoridad Marítima" className="w-full bg-transparent border-none p-0 text-xs focus:ring-0 outline-none" /></td>
                  <td className="px-4 py-3"><input type="date" className="w-full bg-transparent border-none p-0 text-xs focus:ring-0 outline-none" /></td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-slate-300 hover:text-red-400 transition-colors">
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </td>
                </tr>
                <tr className="bg-slate-50/20">
                  <td className="px-4 py-3"><input type="text" placeholder="Formación Básica Seguridad" className="w-full bg-transparent border-none p-0 text-xs focus:ring-0 outline-none" /></td>
                  <td className="px-4 py-3"><input type="text" placeholder="Entidad acreditada" className="w-full bg-transparent border-none p-0 text-xs focus:ring-0 outline-none" /></td>
                  <td className="px-4 py-3"><input type="date" className="w-full bg-transparent border-none p-0 text-xs focus:ring-0 outline-none" /></td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-slate-300 hover:text-red-400 transition-colors">
                      <span className="material-symbols-outlined text-sm">delete</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <button className="w-full py-2 bg-slate-50 text-[10px] font-bold uppercase text-slate-400 hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-sm">add</span>
              Añadir Certificación
            </button>
          </div>
        </div>

        {/* Experiencia */}
        <div className="space-y-1">
          <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Experiencia Previa / Notas</label>
          <textarea
            className="w-full bg-slate-100/50 border-none px-4 py-3 rounded-lg focus:ring-1 focus:ring-[#eacea9] outline-none text-sm h-32 resize-none"
            placeholder="Indique brevemente el historial laboral relevante o notas adicionales del reclutamiento..."
          />
        </div>
      </div>
    </section>
  );
};

export default ProfessionalProfileSection;