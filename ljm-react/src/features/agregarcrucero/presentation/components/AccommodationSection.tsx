import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Suite {
  tipo: string;
  desc: string;
  cantidad: number;
  capacidad: number;
}

const initialSuites: Suite[] = [
  { tipo: 'Suite Real del Almirante', desc: 'Balcon Privado & Jacuzzi', cantidad: 12, capacidad: 2 },
  { tipo: 'Habitacion Deluxe Balcon', desc: 'Vistas al Mar', cantidad: 150, capacidad: 4 },
];

const emptySuite: Suite = {
  tipo: '',
  desc: '',
  cantidad: 1,
  capacidad: 1,
};

const AccommodationSection: React.FC = () => {
  const { t } = useTranslation();
  const [suites, setSuites] = useState<Suite[]>(initialSuites);
  const [showForm, setShowForm] = useState(false);
  const [draft, setDraft] = useState<Suite>(emptySuite);

  const eliminar = (index: number) => {
    setSuites((prev) => prev.filter((_, i) => i !== index));
  };

  const closeForm = () => {
    setDraft(emptySuite);
    setShowForm(false);
  };

  const addSuite = () => {
    if (draft.tipo.trim() === '' || draft.cantidad < 1 || draft.capacidad < 1) {
      return;
    }

    setSuites((prev) => [
      ...prev,
      {
        tipo: draft.tipo.trim(),
        desc: draft.desc.trim(),
        cantidad: draft.cantidad,
        capacidad: draft.capacidad,
      },
    ]);

    closeForm();
  };

  const inputClass =
    'w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#0e1a34]';

  return (
    <section className="rounded-xl border border-slate-200 bg-[#f6f7f8] p-8">
      <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#0e1a34]">bed</span>
          <h3 className="text-xl font-bold text-[#0e1a34]">{t('fleet.add.accommodation.title')}</h3>
        </div>
        <button
          className="flex items-center gap-2 rounded-lg bg-[#0e1a34] px-4 py-2 text-xs font-bold text-white transition-all hover:bg-[#1a2b4e]"
          type="button"
          onClick={() => setShowForm((prev) => !prev)}
        >
          <span className="material-symbols-outlined text-sm">add</span>
          {t('fleet.add.accommodation.addType')}
        </button>
      </div>

      {showForm && (
        <div className="mb-6 rounded-xl border border-[#0e1a34]/10 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-[#0e1a34]">
                Nuevo tipo de alojamiento
              </h4>
              <p className="mt-1 text-sm text-slate-500">
                Agrega una cabina o suite y se mostrara inmediatamente en la lista.
              </p>
            </div>
            <button
              className="rounded-md border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
              type="button"
              onClick={closeForm}
            >
              Cerrar
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Tipo
              </label>
              <input
                className={inputClass}
                placeholder="Ej. Suite Familiar Terraza"
                type="text"
                value={draft.tipo}
                onChange={(e) => setDraft((prev) => ({ ...prev, tipo: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Descripcion
              </label>
              <input
                className={inputClass}
                placeholder="Ej. Vista panoramica y sala privada"
                type="text"
                value={draft.desc}
                onChange={(e) => setDraft((prev) => ({ ...prev, desc: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Cantidad
              </label>
              <input
                className={inputClass}
                min={1}
                type="number"
                value={draft.cantidad}
                onChange={(e) =>
                  setDraft((prev) => ({
                    ...prev,
                    cantidad: Number(e.target.value) > 0 ? Number(e.target.value) : 1,
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Capacidad maxima
              </label>
              <input
                className={inputClass}
                min={1}
                type="number"
                value={draft.capacidad}
                onChange={(e) =>
                  setDraft((prev) => ({
                    ...prev,
                    capacidad: Number(e.target.value) > 0 ? Number(e.target.value) : 1,
                  }))
                }
              />
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 md:flex-row md:justify-end">
            <button
              className="rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-800"
              type="button"
              onClick={closeForm}
            >
              Cancelar
            </button>
            <button
              className="rounded-lg bg-[#0e1a34] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1a2b4e]"
              type="button"
              onClick={addSuite}
            >
              Guardar tipo
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-200 text-[10px] uppercase tracking-widest text-slate-400">
              <th className="pb-3 font-bold">{t('fleet.add.accommodation.colType')}</th>
              <th className="pb-3 text-center font-bold">{t('fleet.add.accommodation.colQty')}</th>
              <th className="pb-3 text-center font-bold">{t('fleet.add.accommodation.colCapacity')}</th>
              <th className="pb-3 text-right font-bold">{t('fleet.add.accommodation.colActions')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {suites.map((s, i) => (
              <tr key={`${s.tipo}-${i}`}>
                <td className="py-4">
                  <div className="font-bold text-slate-800">{s.tipo}</div>
                  <div className="text-[10px] text-slate-400">{s.desc || 'Sin descripcion adicional'}</div>
                </td>
                <td className="py-4 text-center font-medium text-slate-700">{s.cantidad}</td>
                <td className="py-4 text-center font-medium text-slate-700">{s.capacidad}</td>
                <td className="py-4 text-right">
                  <button
                    className="text-slate-400 transition-colors hover:text-red-500"
                    type="button"
                    onClick={() => eliminar(i)}
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
