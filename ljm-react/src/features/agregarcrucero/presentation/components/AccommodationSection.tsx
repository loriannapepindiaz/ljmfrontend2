import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Suite {
  tipo: string;
  desc: string;
  cantidad: number;
  capacidad: number;
}

const AccommodationSection: React.FC = () => {
  const { t } = useTranslation();
  const [suites, setSuites] = useState<Suite[]>([]);

  const añadirTipo = () => {
    const nuevaSuite: Suite = {
      tipo: 'Nueva Suite / Habitación',
      desc: 'Descripción de la habitación',
      cantidad: 0,
      capacidad: 0
    };
    setSuites([...suites, nuevaSuite]);
  };

  const eliminar = (index: number) => {
    setSuites((prev) => prev.filter((_, i) => i !== index));
  };

  const actualizarSuite = (index: number, campo: keyof Suite, valor: string | number) => {
    const nuevasSuites = [...suites];
    nuevasSuites[index] = { ...nuevasSuites[index], [campo]: valor };
    setSuites(nuevasSuites);
  };

  return (
    <section className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#0e1a34]">bed</span>
          <h3 className="text-xl font-bold text-[#0e1a34]">{t('fleet.add.accommodation.title')}</h3>
        </div>
        <button 
          onClick={añadirTipo}
          className="text-xs font-bold bg-[#0e1a34] text-[#eacea9] border border-[#eacea9]/20 px-4 py-2 rounded-lg hover:bg-[#16213E] transition-all flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          {t('fleet.add.accommodation.addType')}
        </button>
      </div>

      <div className="overflow-x-auto min-h-[100px]">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] uppercase tracking-widest text-slate-400 border-b border-slate-100">
              <th className="pb-3 font-bold">{t('fleet.add.accommodation.colType')}</th>
              <th className="pb-3 font-bold text-center">{t('fleet.add.accommodation.colQty')}</th>
              <th className="pb-3 font-bold text-center">{t('fleet.add.accommodation.colCapacity')}</th>
              <th className="pb-3 font-bold text-right">{t('fleet.add.accommodation.colActions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {suites.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-12 text-center text-slate-400 italic text-sm">
                  No hay tipos de alojamiento configurados. Haga clic en "+ Añadir Tipo" para empezar.
                </td>
              </tr>
            ) : (
              suites.map((s, i) => (
                <tr key={i}>
                  <td className="py-4">
                    <input 
                      type="text" 
                      value={s.tipo} 
                      onChange={(e) => actualizarSuite(i, 'tipo', e.target.value)}
                      className="font-bold text-slate-800 bg-transparent border-none p-0 focus:ring-0 w-full"
                      placeholder="Nombre del tipo"
                    />
                    <input 
                      type="text" 
                      value={s.desc} 
                      onChange={(e) => actualizarSuite(i, 'desc', e.target.value)}
                      className="text-[10px] text-slate-400 bg-transparent border-none p-0 focus:ring-0 w-full"
                      placeholder="Descripción corta"
                    />
                  </td>
                  <td className="py-4 text-center">
                    <input 
                      type="number" 
                      value={s.cantidad} 
                      onChange={(e) => actualizarSuite(i, 'cantidad', parseInt(e.target.value) || 0)}
                      className="font-medium text-slate-700 bg-slate-50 border border-slate-100 rounded px-2 py-1 w-16 text-center text-sm focus:ring-1 focus:ring-[#eacea9] outline-none"
                    />
                  </td>
                  <td className="py-4 text-center">
                    <input 
                      type="number" 
                      value={s.capacidad} 
                      onChange={(e) => actualizarSuite(i, 'capacidad', parseInt(e.target.value) || 0)}
                      className="font-medium text-slate-700 bg-slate-50 border border-slate-100 rounded px-2 py-1 w-16 text-center text-sm focus:ring-1 focus:ring-[#eacea9] outline-none"
                    />
                  </td>
                  <td className="py-4 text-right">
                    <button
                      onClick={() => eliminar(i)}
                      className="text-slate-300 hover:text-red-500 transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AccommodationSection;
