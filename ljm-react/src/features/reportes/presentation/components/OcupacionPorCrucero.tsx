import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { OcupacionPorCrucero as OcupacionPorCruceroData } from '../../data/reportesService';

const OPTION_KEYS = ['last6months', 'fullYear'] as const;
type OptionKey = typeof OPTION_KEYS[number];

type OcupacionPorCruceroProps = {
  data: OcupacionPorCruceroData[];
  loading: boolean;
};

const OcupacionPorCrucero: React.FC<OcupacionPorCruceroProps> = ({ data, loading }) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<OptionKey>('last6months');
  const [open, setOpen] = useState(false);
  const hasData = data.length > 0;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-bold text-[#0e1a34]">{t('reports.charts.occupancy.title')}</h3>

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
            {t(`reports.charts.occupancy.${selected}`)}
            <span className="material-symbols-outlined text-[14px]">
              {open ? 'expand_less' : 'expand_more'}
            </span>
          </button>

          {open && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
              <div className="absolute right-0 top-full mt-1 bg-white border border-[#0e1a34]/10 rounded-xl shadow-lg z-50 overflow-hidden min-w-[160px]">
                {OPTION_KEYS.map((o) => (
                  <button
                    key={o}
                    onClick={() => { setSelected(o); setOpen(false); }}
                    className={`w-full px-4 py-2.5 text-sm text-left transition-colors ${
                      selected === o
                        ? 'bg-[#eacea9] text-[#0e1a34] font-bold'
                        : 'text-[#0e1a34] hover:bg-[#eacea9]/10'
                    }`}
                  >
                    {t(`reports.charts.occupancy.${o}`)}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {loading || !hasData ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <span className="material-symbols-outlined text-[48px] text-slate-200 block mb-2">directions_boat</span>
          <p className="text-sm text-slate-400">{loading ? 'Cargando datos...' : 'Sin datos disponibles'}</p>
          {!loading && <p className="text-xs text-slate-300 mt-1">Los datos aparecerán al conectar la BD</p>}
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((item) => (
            <div key={item.crucero}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-[#0e1a34]">{item.crucero}</span>
                <span className="text-xs font-bold text-slate-500">{Math.round(item.ocupacion)}%</span>
              </div>
              <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full rounded-full bg-[#eacea9]" style={{ width: `${Math.min(item.ocupacion, 100)}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OcupacionPorCrucero;
