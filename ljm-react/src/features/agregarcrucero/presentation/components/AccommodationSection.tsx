import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Suite {
  tipo: string;
  desc: string;
  cantidad: number;
  capacidad: number;
}

const initialSuites: Suite[] = [
  { tipo: 'Suite Real del Almirante', desc: 'Balcón Privado & Jacuzzi', cantidad: 12,  capacidad: 2 },
  { tipo: 'Habitación Deluxe Balcón', desc: 'Vistas al Mar',            cantidad: 150, capacidad: 4 },
];

const AccommodationSection: React.FC = () => {
  const { t } = useTranslation();
  const [suites, setSuites] = useState<Suite[]>(initialSuites);

  const eliminar = (index: number) => {
    setSuites((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <section className="bg-[#f6f7f8] p-8 rounded-xl border border-slate-200">
      <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#0e1a34]">bed</span>
          <h3 className="text-xl font-bold text-[#0e1a34]">{t('fleet.add.accommodation.title')}</h3>
        </div>
        <button className="text-xs font-bold bg-[#0e1a34] text-white px-4 py-2 rounded-lg hover:bg-[#1a2b4e] transition-all flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">add</span>
          {t('fleet.add.accommodation.addType')}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] uppercase tracking-widest text-slate-400 border-b border-slate-200">
              <th className="pb-3 font-bold">{t('fleet.add.accommodation.colType')}</th>
              <th className="pb-3 font-bold text-center">{t('fleet.add.accommodation.colQty')}</th>
              <th className="pb-3 font-bold text-center">{t('fleet.add.accommodation.colCapacity')}</th>
              <th className="pb-3 font-bold text-right">{t('fleet.add.accommodation.colActions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {suites.map((s, i) => (
              <tr key={i}>
                <td className="py-4">
                  <div className="font-bold text-slate-800">{s.tipo}</div>
                  <div className="text-[10px] text-slate-400">{s.desc}</div>
                </td>
                <td className="py-4 text-center font-medium text-slate-700">{s.cantidad}</td>
                <td className="py-4 text-center font-medium text-slate-700">{s.capacidad}</td>
                <td className="py-4 text-right">
                  <button
                    onClick={() => eliminar(i)}
                    className="text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AccommodationSection;
