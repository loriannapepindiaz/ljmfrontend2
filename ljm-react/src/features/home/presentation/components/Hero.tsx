import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../../../lib/api';

const MONTHS_ES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

interface BackendDestination {
  id: string | number;
  titulo: string;
  pais: string;
  ubicacion?: string;
  imagen_url?: string;
  precio_desde?: number | null;
  moneda?: string;
  duracion_tipica?: string;
  descripcion?: string;
  rating_promedio?: number | null;
  galeria_urls?: string[];
  highlights?: string[];
  incluye?: string[];
  clima?: string;
  idioma?: string;
  puerto_principal?: string;
}

type Panel = 'dest' | 'cal' | 'guests' | null;

/* ── Stepper defined outside Hero so React never remounts it ── */
interface StepperProps { label: string; value: number; onDec: () => void; onInc: () => void; }
const Stepper = ({ label, value, onDec, onInc }: StepperProps) => (
  <div className="flex items-center justify-between">
    <span className="text-sm font-medium text-[#333]">{label}</span>
    <div className="flex items-center gap-4">
      <button
        type="button"
        onMouseDown={e => e.stopPropagation()}
        onClick={onDec}
        className="w-9 h-9 rounded-full bg-[#C5A059] hover:bg-[#b8904a] active:scale-95 flex items-center justify-center text-white text-lg font-bold transition-all select-none shadow-sm"
      >−</button>
      <span className="w-6 text-center text-base font-bold text-[#333] tabular-nums">{value}</span>
      <button
        type="button"
        onMouseDown={e => e.stopPropagation()}
        onClick={onInc}
        className="w-9 h-9 rounded-full bg-[#C5A059] hover:bg-[#b8904a] active:scale-95 flex items-center justify-center text-white text-lg font-bold transition-all select-none shadow-sm"
      >+</button>
    </div>
  </div>
);

const Hero = () => {
  const navigate = useNavigate();
  const barRef = useRef<HTMLDivElement>(null);

  /* ── Panel state ── */
  const [open, setOpen] = useState<Panel>(null);

  /* ── Destination ── */
  const [destSearch, setDestSearch] = useState('');
  const [selectedDest, setSelectedDest] = useState<BackendDestination | null>(null);
  const [destinations, setDestinations] = useState<BackendDestination[]>([]);

  /* ── Calendar ── */
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [calOffset, setCalOffset] = useState(0);

  /* ── Guests — draft (panel) vs committed (trigger label) ── */
  const [draftPersons, setDraftPersons] = useState(0);
  const [draftRooms,   setDraftRooms]   = useState(0);
  const [draftPets,    setDraftPets]    = useState(false);
  const [persons, setPersons] = useState(0);
  const [rooms,   setRooms]   = useState(0);
  const [pets,    setPets]    = useState(false);

  /* ── Fetch destinations ── */
  useEffect(() => {
    fetch(`${API_BASE_URL}/destinations`)
      .then(r => r.json())
      .then(j => { if (j.ok && Array.isArray(j.data)) setDestinations(j.data); })
      .catch(() => {});
  }, []);

  /* ── Close on outside click ── */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* ── Derived ── */
  const filteredDests = destSearch.trim()
    ? destinations.filter(d =>
        d.titulo.toLowerCase().includes(destSearch.toLowerCase()) ||
        d.pais.toLowerCase().includes(destSearch.toLowerCase()))
    : destinations.slice(0, 5);

  const guestsLabel = (() => {
    if (persons === 0 && !pets) return 'Añadir huéspedes';
    const parts: string[] = [];
    if (persons > 0) parts.push(`${persons} Persona${persons !== 1 ? 's' : ''}`);
    if (pets) parts.push('Con mascotas');
    return parts.join(' · ') || 'Añadir huéspedes';
  })();

  const dateText = selectedDate
    ? selectedDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: '2-digit' })
    : 'Seleccionar';

  /* ── Handlers ── */
  const togglePanel = (panel: Panel) => {
    setOpen(p => {
      const next = p === panel ? null : panel;
      if (next === 'guests') {
        setDraftPersons(persons);
        setDraftRooms(rooms);
        setDraftPets(pets);
      }
      return next;
    });
  };

  const commitGuests = () => {
    setPersons(draftPersons);
    setRooms(draftRooms);
    setPets(draftPets);
    setOpen(null);
  };

  const selectDest = (dest: BackendDestination) => {
    setSelectedDest(dest);
    setDestSearch(dest.titulo);
    setOpen(null);
  };

  const selectDate = (date: Date) => {
    setSelectedDate(date);
    setOpen(null);
  };

  const handleSearch = () => {
    if (selectedDest) navigate('/destination-details', { state: { destination: selectedDest } });
    else navigate('/destinations', { state: { query: destSearch } });
  };

  /* ── Calendar month renderer ── */
  const monthData = (offset: number) => {
    const base = new Date(); base.setDate(1); base.setMonth(base.getMonth() + offset);
    return { year: base.getFullYear(), month: base.getMonth() + 1 };
  };

  const renderMonth = (year: number, month: number) => {
    const startDay = new Date(year, month - 1, 1).getDay();
    const daysInMonth = new Date(year, month, 0).getDate();
    const cells = [];
    for (let i = 0; i < startDay; i++) cells.push(<div key={`e${i}`} />);
    for (let d = 1; d <= daysInMonth; d++) {
      const isSel = selectedDate &&
        selectedDate.getDate() === d &&
        selectedDate.getMonth() === month - 1 &&
        selectedDate.getFullYear() === year;
      cells.push(
        <button key={d} type="button"
          onMouseDown={e => e.stopPropagation()}
          className={`aspect-square rounded-full text-xs font-medium transition-colors flex items-center justify-center ${isSel ? 'bg-[#C5A059] text-white' : 'hover:bg-[#F5E6D3] text-[#333]'}`}
          onClick={() => selectDate(new Date(year, month - 1, d))}>
          {d}
        </button>
      );
    }
    return (
      <div className="flex-1 min-w-0">
        <p className="text-center text-sm font-bold text-[#C5A059] mb-3">{MONTHS_ES[month - 1]} {year}</p>
        <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-[#999] font-semibold mb-1">
          {['Do','Lu','Ma','Mi','Ju','Vi','Sá'].map(d => <span key={d}>{d}</span>)}
        </div>
        <div className="grid grid-cols-7 gap-1">{cells}</div>
      </div>
    );
  };

  return (
    <section className="relative z-10 flex min-h-screen w-full max-w-full items-center justify-center [overflow-x:clip] pt-28 pb-40 md:pt-24 md:pb-44 hero-gradient">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-display text-white mb-6 leading-tight">
          Explora el Horizonte en <br />
          <span className="italic text-primary">Absoluta Elegancia</span>
        </h1>
        <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light">
          Descubre los destinos más exclusivos a bordo de nuestros liners boutique. Un viaje donde el lujo se encuentra con la vastedad del océano.
        </p>

        {/* ── Search bar ── */}
        <div ref={barRef} className="relative max-w-4xl mx-auto" style={{ zIndex: 40 }}>
          <div className="bg-white/95 backdrop-blur-sm p-2 md:p-2.5 rounded-2xl shadow-2xl border border-[#C5A059]/20 flex flex-wrap md:flex-nowrap items-stretch gap-2 md:gap-0">

            {/* Destino */}
            <div className="flex-1 min-w-[190px] px-4 md:px-5 py-3 border-r border-[#C5A059]/30 flex flex-col items-start">
              <span className="text-[9px] md:text-xs font-bold text-[#C5A059] tracking-widest uppercase mb-1">Destino</span>
              <div className="flex w-full items-center gap-2">
                <span className="material-symbols-outlined text-[#9CA3AF] text-sm shrink-0">location_on</span>
                <input
                  type="text"
                  className="min-w-0 flex-1 bg-transparent text-xs md:text-sm font-medium text-[#333] placeholder-[#999] outline-none"
                  placeholder="Buscar destino..."
                  value={destSearch}
                  onChange={e => { setDestSearch(e.target.value); setSelectedDest(null); setOpen('dest'); }}
                  onFocus={() => setOpen('dest')}
                />
                {destSearch && (
                  <button type="button" className="text-[#bbb] hover:text-[#C5A059] transition"
                    onMouseDown={e => e.preventDefault()}
                    onClick={() => { setDestSearch(''); setSelectedDest(null); }}>
                    <span className="material-symbols-outlined text-base">close</span>
                  </button>
                )}
              </div>
            </div>

            {/* Salida */}
            <div className="flex-1 min-w-[150px] px-4 md:px-5 py-3 border-r border-[#C5A059]/30 flex flex-col items-start">
              <span className="text-[9px] md:text-xs font-bold text-[#C5A059] tracking-widest uppercase mb-0.5">Salida</span>
              <button type="button" className="flex items-center gap-2 w-full text-left"
                onClick={() => togglePanel('cal')}>
                <span className="material-symbols-outlined text-[#9CA3AF] text-sm">calendar_today</span>
                <span className="text-xs md:text-sm font-medium text-[#333]">{dateText}</span>
              </button>
            </div>

            {/* Huéspedes */}
            <div className="flex-1 min-w-[150px] px-4 md:px-5 py-3 flex flex-col items-start">
              <span className="text-[9px] md:text-xs font-bold text-[#C5A059] tracking-widest uppercase mb-0.5">Huéspedes</span>
              <button type="button" className="flex items-center gap-2 w-full text-left"
                onClick={() => togglePanel('guests')}>
                <span className="material-symbols-outlined text-[#9CA3AF] text-sm">person_outline</span>
                <span className="text-xs md:text-sm font-medium text-[#333] truncate">{guestsLabel}</span>
              </button>
            </div>

            {/* Buscar */}
            <button type="button" onClick={handleSearch}
              className="w-full md:w-auto bg-[#C5A059] hover:bg-[#D4AF37] text-white px-6 md:px-10 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg text-xs md:text-sm flex-shrink-0">
              <span className="material-symbols-outlined text-sm">search</span>
              BUSCAR
            </button>
          </div>

          {/* ── Destination dropdown ── */}
          {open === 'dest' && (
            <div
              onMouseDown={e => e.stopPropagation()}
              className="absolute top-[calc(100%+0.6rem)] left-0 w-72 rounded-2xl border border-[#C5A059]/15 bg-white p-3 shadow-[0_24px_60px_rgba(14,26,52,0.22)]"
              style={{ zIndex: 9999 }}
            >
              {filteredDests.length === 0 ? (
                <p className="py-4 text-center text-sm text-[#999]">
                  {destinations.length === 0 ? 'Cargando destinos...' : 'Sin resultados'}
                </p>
              ) : (
                <>
                  <h4 className="mb-2 px-2 text-xs font-bold uppercase tracking-wider text-[#C5A059]">
                    {destSearch.trim() ? 'Resultados' : 'Destinos de moda'}
                  </h4>
                  <ul className="space-y-0.5">
                    {filteredDests.map((dest, i) => (
                      <li key={String(dest.id)}>
                        <button type="button"
                          onMouseDown={e => e.preventDefault()}
                          onClick={() => selectDest(dest)}
                          className="flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-left transition hover:bg-[#F5E6D3]">
                          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#F5E6D3] text-[11px] font-bold text-[#C5A059]">{i + 1}</span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-semibold text-[#333]">{dest.titulo}</span>
                            <span className="block text-[10px] text-[#6B7280]">
                              {dest.pais}{dest.duracion_tipica ? ` · ${dest.duracion_tipica}` : ''}
                            </span>
                          </span>
                          {dest.precio_desde != null && Number(dest.precio_desde) > 0 && (
                            <span className="shrink-0 text-[11px] font-bold text-[#C5A059] whitespace-nowrap">
                              desde {Number(dest.precio_desde).toLocaleString('es-ES')}
                            </span>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}

          {/* ── Calendar — centered under search bar ── */}
          {open === 'cal' && (
            <div
              onMouseDown={e => e.stopPropagation()}
              className="absolute top-[calc(100%+0.6rem)] left-1/2 -translate-x-1/2 w-[min(580px,calc(100vw-2rem))] rounded-2xl bg-white p-5 shadow-[0_24px_60px_rgba(14,26,52,0.22)] border border-gray-100"
              style={{ zIndex: 9999 }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-[#C5A059]">Fecha de salida</span>
                <div className="flex items-center gap-1">
                  <button type="button" disabled={calOffset === 0}
                    onMouseDown={e => e.stopPropagation()}
                    onClick={() => setCalOffset(o => o - 1)}
                    className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-[#F5E6D3] text-[#C5A059] text-lg disabled:opacity-30 transition">‹</button>
                  <button type="button"
                    onMouseDown={e => e.stopPropagation()}
                    onClick={() => setCalOffset(o => o + 1)}
                    className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-[#F5E6D3] text-[#C5A059] text-lg transition">›</button>
                  <span className="ml-2 text-[11px] font-semibold text-[#C5A059] cursor-pointer">Flexible</span>
                </div>
              </div>
              <div className="flex gap-6">
                {(() => { const {year, month} = monthData(calOffset);     return renderMonth(year, month); })()}
                {(() => { const {year, month} = monthData(calOffset + 1); return renderMonth(year, month); })()}
              </div>
            </div>
          )}

          {/* ── Guests panel — right-aligned to search bar ── */}
          {open === 'guests' && (
            <div
              onMouseDown={e => e.stopPropagation()}
              className="absolute top-[calc(100%+0.6rem)] right-0 w-72 rounded-2xl bg-white p-5 shadow-[0_24px_60px_rgba(14,26,52,0.22)] border border-gray-100"
              style={{ zIndex: 9999 }}
            >
              <p className="text-center text-xs font-semibold text-[#C5A059] bg-[#FDF6EC] rounded-xl py-2 mb-4">
                {draftPersons === 0 && !draftPets
                  ? 'Selecciona los huéspedes'
                  : [draftPersons > 0 ? `${draftPersons} Persona${draftPersons !== 1 ? 's' : ''}` : '', draftPets ? 'Con mascotas' : ''].filter(Boolean).join(' · ')}
              </p>
              <div className="space-y-4">
                <Stepper
                  label="Personas"
                  value={draftPersons}
                  onDec={() => setDraftPersons(v => Math.max(0, v - 1))}
                  onInc={() => setDraftPersons(v => v + 1)}
                />
                <Stepper
                  label="Habitaciones"
                  value={draftRooms}
                  onDec={() => setDraftRooms(v => Math.max(0, v - 1))}
                  onInc={() => setDraftRooms(v => v + 1)}
                />

                <div className="flex items-center justify-between pt-3 border-t border-[#F0F0F0]">
                  <div>
                    <p className="text-sm font-medium text-[#333]">¿Con mascotas?</p>
                    <p className="text-[10px] text-[#999]">Animales de servicio no son mascotas.</p>
                  </div>
                  <button
                    type="button"
                    onMouseDown={e => e.stopPropagation()}
                    onClick={() => setDraftPets(v => !v)}
                    className={`relative w-11 h-6 rounded-full transition-colors ${draftPets ? 'bg-[#C5A059]' : 'bg-[#E5E7EB]'}`}
                  >
                    <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${draftPets ? 'left-[calc(100%-1.375rem)]' : 'left-0.5'}`} />
                  </button>
                </div>

                <button
                  type="button"
                  onMouseDown={e => e.stopPropagation()}
                  onClick={commitGuests}
                  className="w-full bg-[#C5A059] hover:bg-[#D4AF37] text-white py-2.5 rounded-xl font-bold transition text-sm"
                >
                  Listo
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
