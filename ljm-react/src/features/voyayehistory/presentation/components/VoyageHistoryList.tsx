import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getLocalRatingForHistoryItem } from '../../../reviews/presentation/reviewsData';
import type { VoyageHistoryItem } from '../voyageHistoryData';

type Props = {
  items: VoyageHistoryItem[];
  isLoading: boolean;
};

const formatDate = (value: string | null) =>
  value
    ? new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(value))
    : 'Fecha pendiente';

type FilterValue = 'all' | 'rated' | 'unrated' | 'with-dates' | 'pending-dates';

const VoyageHistoryList: React.FC<Props> = ({ items, isLoading }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<FilterValue>('all');

  const filteredItems = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return items.filter((item) => {
      const searchableText = [
        item.reservationId,
        item.destination,
        item.ship,
        item.cabin,
        item.departureDate,
        item.returnDate,
        item.nights,
        item.rating,
      ]
        .filter((value) => value !== null && value !== undefined)
        .join(' ')
        .toLowerCase();
      const matchesSearch = !normalizedSearch || searchableText.includes(normalizedSearch);
      const matchesFilter =
        filter === 'all' ||
        (filter === 'rated' && Boolean(item.rating)) ||
        (filter === 'unrated' && !item.rating) ||
        (filter === 'with-dates' && Boolean(item.departureDate && item.returnDate)) ||
        (filter === 'pending-dates' && Boolean(!item.departureDate || !item.returnDate));

      return matchesSearch && matchesFilter;
    });
  }, [filter, items, searchTerm]);

  const hasActiveTools = Boolean(searchTerm.trim() || filter !== 'all');

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-[#0e1a34]" style={{ fontFamily: 'Newsreader, serif' }}>
          Reservas Anteriores
        </h3>
        <div className="relative flex items-center gap-2">
          {isSearchOpen ? (
            <input
              autoFocus
              className="h-12 w-56 rounded border border-slate-200 bg-white px-4 text-sm font-semibold text-[#0e1a34] outline-none transition focus:border-[#0e1a34]"
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Buscar reserva..."
              value={searchTerm}
            />
          ) : null}
          <button
            className={`p-2 border rounded transition-colors ${filter !== 'all' ? 'border-[#0e1a34] bg-white' : 'border-slate-200 hover:bg-white'}`}
            onClick={() => setIsFilterOpen((current) => !current)}
            type="button"
          >
            <span className="material-symbols-outlined text-sm">filter_list</span>
          </button>
          <button
            className={`p-2 border rounded transition-colors ${isSearchOpen || searchTerm ? 'border-[#0e1a34] bg-white' : 'border-slate-200 hover:bg-white'}`}
            onClick={() => setIsSearchOpen((current) => !current)}
            type="button"
          >
            <span className="material-symbols-outlined text-sm">search</span>
          </button>
          {isFilterOpen ? (
            <div className="absolute right-14 top-14 z-20 w-56 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl">
              {[
                ['all', 'Todas'],
                ['rated', 'Valoradas'],
                ['unrated', 'Sin valorar'],
                ['with-dates', 'Fechas completas'],
                ['pending-dates', 'Fechas pendientes'],
              ].map(([value, label]) => (
                <button
                  className={`block w-full px-4 py-3 text-left text-xs font-bold uppercase tracking-[0.14em] transition ${
                    filter === value ? 'bg-[#0e1a34] text-white' : 'text-[#0e1a34] hover:bg-slate-50'
                  }`}
                  key={value}
                  onClick={() => {
                    setFilter(value as FilterValue);
                    setIsFilterOpen(false);
                  }}
                  type="button"
                >
                  {label}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
      {hasActiveTools ? (
        <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500">
          <span>{filteredItems.length} de {items.length} reservas</span>
          <button
            className="rounded border border-slate-200 bg-white px-3 py-1 text-[#0e1a34] transition hover:border-[#0e1a34]"
            onClick={() => {
              setSearchTerm('');
              setFilter('all');
            }}
            type="button"
          >
            Limpiar
          </button>
        </div>
      ) : null}

      {filteredItems.length ? (
        <div className="grid gap-4">
          {filteredItems.map((item) => (
            <article key={`${item.id}-${item.reservationId}`} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Reserva {item.reservationId}</p>
                  <h4 className="mt-1 text-2xl font-bold text-[#0e1a34]" style={{ fontFamily: 'Newsreader, serif' }}>
                    {item.destination}
                  </h4>
                  <p className="mt-1 text-sm text-slate-500">{item.ship} · {item.cabin}</p>
                </div>
                <div className="grid grid-cols-2 gap-x-10 gap-y-5 text-sm md:min-w-[420px]">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Salida</p>
                    <p className="font-semibold text-[#0e1a34]">{formatDate(item.departureDate)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Regreso</p>
                    <p className="font-semibold text-[#0e1a34]">{formatDate(item.returnDate)}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Noches</p>
                    <p className="font-semibold text-[#0e1a34]">{item.nights ?? 'Pendiente'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Valoración</p>
                    <div className="mt-1 flex flex-col items-start gap-2">
                      <p className="font-semibold text-[#0e1a34]">
                        {item.rating ?? getLocalRatingForHistoryItem(item.id, item.reservationId)
                          ? `${item.rating ?? getLocalRatingForHistoryItem(item.id, item.reservationId)}/5`
                          : 'Sin valorar'}
                      </p>
                      <Link
                        to={`/reviews?historyId=${encodeURIComponent(String(item.id))}`}
                        className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#0e1a34]/15 bg-[#0e1a34] px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.14em] text-white transition hover:bg-[#1a2f5f]"
                      >
                        {item.rating ?? getLocalRatingForHistoryItem(item.id, item.reservationId) ? 'Editar' : 'Calificar'}
                        <span className="material-symbols-outlined text-[12px]">star</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white/70 px-6 py-12 text-center">
          <span className="material-symbols-outlined mb-3 text-4xl text-slate-300">travel_explore</span>
          <p className="text-sm font-bold uppercase tracking-widest text-[#0e1a34]">
            {isLoading ? 'Cargando historial...' : hasActiveTools ? 'No hay coincidencias' : 'No hay reservas anteriores'}
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
            {hasActiveTools
              ? 'Ajusta la búsqueda o limpia los filtros para ver todas las reservas.'
              : 'El historial se mostrará cuando existan reservas registradas para esta cuenta.'}
          </p>
        </div>
      )}
    </section>
  );
};

export default VoyageHistoryList;
