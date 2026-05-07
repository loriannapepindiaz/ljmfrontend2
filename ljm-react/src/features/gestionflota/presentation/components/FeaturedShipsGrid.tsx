import React from 'react';
import { useTranslation } from 'react-i18next';
import type { AdminCruise } from '../../data/types';

interface FeaturedShipsGridProps {
  cruises: AdminCruise[];
  loading: boolean;
}

const ShipCard: React.FC<{ cruise: AdminCruise }> = ({ cruise }) => (
  <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-white group hover:shadow-md transition-shadow">
    <div className="h-40 bg-slate-100 overflow-hidden">
      {cruise.imageSrc ? (
        <img
          src={cruise.imageSrc}
          alt={cruise.nombre}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-slate-300">
          <span className="material-symbols-outlined text-[48px]">directions_boat</span>
        </div>
      )}
    </div>
    <div className="p-4">
      <div className="flex items-start justify-between gap-2 mb-2">
        <p className="font-bold text-[#0e1a34] text-sm leading-tight">{cruise.nombre}</p>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 whitespace-nowrap shrink-0">
          {cruise.badge}
        </span>
      </div>
      <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium">
        {cruise.guests && (
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">group</span>
            {cruise.guests} pax
          </span>
        )}
        {cruise.eslora && (
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">straighten</span>
            {cruise.eslora}
          </span>
        )}
        {cruise.decks && (
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">layers</span>
            {cruise.decks} cubiertas
          </span>
        )}
      </div>
    </div>
  </div>
);

const SkeletonCard: React.FC = () => (
  <div className="rounded-xl border border-slate-200 overflow-hidden animate-pulse">
    <div className="h-40 bg-slate-100" />
    <div className="p-4 space-y-2">
      <div className="h-4 bg-slate-100 rounded w-2/3" />
      <div className="h-3 bg-slate-100 rounded w-1/3" />
    </div>
  </div>
);

const FeaturedShipsGrid: React.FC<FeaturedShipsGridProps> = ({ cruises, loading }) => {
  const { t } = useTranslation();
  const featured = cruises.slice(0, 3);

  return (
    <section className="mb-12">
      <h3 className="text-xl font-bold text-[#0e1a34] mb-6">{t('fleet.featured.title')}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {loading ? (
          [0, 1, 2].map(i => <SkeletonCard key={i} />)
        ) : featured.length > 0 ? (
          featured.map(cruise => <ShipCard key={cruise.id} cruise={cruise} />)
        ) : (
          <div className="flex flex-col items-center justify-center p-12 rounded-xl border-2 border-dashed border-slate-200 text-center">
            <span className="material-symbols-outlined text-[48px] text-slate-300 mb-3">directions_boat</span>
            <p className="text-sm font-bold text-slate-400">{t('fleet.featured.empty')}</p>
            <p className="text-xs text-slate-300 mt-1">{t('fleet.featured.connectDB')}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedShipsGrid;
