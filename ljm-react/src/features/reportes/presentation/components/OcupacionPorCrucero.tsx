import React, { useState } from 'react';

const options = ['Últimos 6 meses', 'Año completo'];

const OcupacionPorCrucero: React.FC = () => {
  const [selected, setSelected] = useState('Últimos 6 meses');
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-bold text-[#0e1a34]">Ocupación por Crucero</h3>

        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
              open
                ? 'bg-[#eacea9] text-[#0e1a34] border-[#eacea9]'
                : 'bg-white text-[#0e1a34]/60 border-slate-200 hover:border-[#eacea9]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">schedule</span>
            {selected}
            <span className="material-symbols-outlined text-[14px]">
              {open ? 'expand_less' : 'expand_more'}
            </span>
          </button>

          {open && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
              <div className="absolute right-0 top-full mt-1 bg-white border border-[#0e1a34]/10 rounded-xl shadow-lg z-50 overflow-hidden min-w-[160px]">
                {options.map((o) => (
                  <button
                    key={o}
                    onClick={() => { setSelected(o); setOpen(false); }}
                    className={`w-full px-4 py-2.5 text-sm text-left transition-colors ${
                      selected === o
                        ? 'bg-[#eacea9] text-[#0e1a34] font-bold'
                        : 'text-[#0e1a34] hover:bg-[#eacea9]/10'
                    }`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-8 text-center">
        <span className="material-symbols-outlined text-[48px] text-slate-200 block mb-2">directions_boat</span>
        <p className="text-sm text-slate-400">Sin cruceros registrados</p>
        <p className="text-xs text-slate-300 mt-1">Los datos aparecerán aquí al conectar la BD</p>
      </div>
    </div>
  );
};

export default OcupacionPorCrucero;