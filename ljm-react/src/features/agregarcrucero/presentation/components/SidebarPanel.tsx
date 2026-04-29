import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const VIS_KEYS = ['active', 'maintenance', 'inactive'] as const;
type VisKey = typeof VIS_KEYS[number];

const SidebarPanel: React.FC = () => {
  const { t } = useTranslation();
  const [visibilidad, setVisibilidad] = useState<VisKey>('active');
  const [openVis, setOpenVis] = useState(false);

  return (
    <div className="space-y-8">

      <section className="bg-[#0e1a34] text-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#eacea9]">
            {t('fleet.add.sidebar.fleetStatus')}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase text-emerald-400">
              {t('fleet.add.sidebar.online')}
            </span>
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/60">
              {t('fleet.add.sidebar.configVisibility')}
            </label>
            <div className="relative">
              <button
                onClick={() => setOpenVis(!openVis)}
                className="w-full flex items-center justify-between px-3 py-3 rounded-lg border border-white/10 bg-white/10 text-white text-sm font-medium transition-all hover:bg-white/20"
              >
                <span>{t(`fleet.add.sidebar.vis.${visibilidad}`)}</span>
                <span className="material-symbols-outlined text-[18px] text-white/60">
                  {openVis ? 'expand_less' : 'expand_more'}
                </span>
              </button>
              {openVis && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setOpenVis(false)} />
                  <div className="absolute top-full left-0 right-0 mt-1 bg-[#1a2b4e] border border-white/10 rounded-xl shadow-xl z-50 overflow-hidden">
                    {VIS_KEYS.map((key) => (
                      <button
                        key={key}
                        onClick={() => { setVisibilidad(key); setOpenVis(false); }}
                        className={`w-full px-4 py-2.5 text-sm text-left transition-colors ${
                          visibilidad === key
                            ? 'bg-[#eacea9] text-[#0e1a34] font-bold'
                            : 'text-white hover:bg-white/10'
                        }`}
                      >
                        {t(`fleet.add.sidebar.vis.${key}`)}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          <p className="text-[11px] text-white/50 leading-relaxed italic border-l-2 border-[#eacea9]/30 pl-3">
            {t('fleet.add.sidebar.activeNote')}
          </p>
        </div>
      </section>

      <section className="bg-[#f6f7f8] p-6 rounded-xl border border-slate-200">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">collections</span>
          {t('fleet.add.sidebar.multimedia')}
        </h3>

        <div className="mb-6">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-2">
            {t('fleet.add.sidebar.shipImages')}
          </label>
          <label className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center gap-3 bg-white hover:border-[#eacea9] transition-all cursor-pointer group">
            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#eacea9]/10 group-hover:text-[#eacea9] transition-colors">
              <span className="material-symbols-outlined text-2xl">cloud_upload</span>
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-slate-700">{t('fleet.add.sidebar.dragPhotos')}</p>
              <p className="text-[10px] text-slate-400 mt-1">{t('fleet.add.sidebar.clickSelect')}</p>
            </div>
            <input type="file" multiple className="hidden" />
          </label>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            {t('fleet.add.sidebar.promoVideo')}
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
              play_circle
            </span>
            <input
              type="text"
              placeholder="https://youtube.com/v/..."
              className="w-full rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#eacea9]/50 focus:border-[#eacea9] p-3 pl-10 text-xs text-slate-900 bg-white outline-none transition-all"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#f6f7f8] p-6 rounded-xl border border-slate-200">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
          {t('fleet.add.sidebar.catalogDesc')}
        </h3>
        <textarea
          className="w-full rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#eacea9]/50 focus:border-[#eacea9] p-4 text-sm text-slate-900 bg-white outline-none leading-relaxed resize-none transition-all"
          placeholder={t('fleet.add.sidebar.descPlaceholder')}
          rows={6}
        />
      </section>

    </div>
  );
};

export default SidebarPanel;
