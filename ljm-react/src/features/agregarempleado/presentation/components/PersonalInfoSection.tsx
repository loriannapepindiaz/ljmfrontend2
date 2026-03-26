import React from 'react';

const PersonalInfoSection: React.FC = () => {
  return (
    <section className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
      <div className="bg-slate-50 px-8 py-4 border-b border-slate-100 flex justify-between items-center">
        <h2 className="text-xl font-headline font-semibold text-[#0e1a34]">Información Personal</h2>
        <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Sección 1 de 4</span>
      </div>
      <div className="p-8">
        <div className="flex gap-10">
          <div className="flex-shrink-0 flex flex-col items-center">
            <div className="relative group">
              <div className="w-36 h-36 rounded-full bg-slate-50 border-2 border-dashed border-[#eacea9] flex flex-col items-center justify-center text-[#a07d5a] overflow-hidden transition-all hover:bg-[#eacea9]/5">
                <span className="material-symbols-outlined text-4xl mb-1">add_a_photo</span>
                <span className="text-[9px] uppercase font-bold tracking-widest px-4 text-center leading-tight">Subir Foto</span>
              </div>
              <input className="absolute inset-0 opacity-0 cursor-pointer" type="file" />
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Nombre Completo</label>
              <input className="w-full bg-slate-50 border-none px-4 py-2.5 rounded-lg focus:ring-1 focus:ring-[#eacea9] outline-none text-sm" placeholder="Julian Vane" type="text" />
            </div>
            {/* Otros inputs similares... */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Nacionalidad</label>
              <select className="w-full bg-slate-50 border-none px-4 py-2.5 rounded-lg focus:ring-1 focus:ring-[#eacea9] outline-none text-sm appearance-none">
                <option>España</option>
                <option>Reino Unido</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalInfoSection;