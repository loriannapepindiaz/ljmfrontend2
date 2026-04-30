import type { Guest } from "../types";

const MONTHS_ES = [
  "Ene","Feb","Mar","Abr","May","Jun",
  "Jul","Ago","Sep","Oct","Nov","Dic",
];

function formatDate(d: Date | null) {
  if (!d) return "—";
  return `${String(d.getDate()).padStart(2,"0")} ${MONTHS_ES[d.getMonth()]} ${d.getFullYear()}`;
}

interface Props {
  guests: Guest[];
  setGuests?: React.Dispatch<React.SetStateAction<Guest[]>>;
}

export default function TravelCompanionsCard({ guests, setGuests }: Props) {
  const removeGuest = (index: number) => {
    setGuests?.(current => current.filter((_, i) => i !== index));
  };

  return (
    <div className="h-fit rounded-xl border border-white/5 bg-[#0f1b35] p-8 shadow-[0_40px_80px_rgba(2,13,39,0.5)] md:p-10">
      <style>{`
        .companions-scroll::-webkit-scrollbar { width: 3px; }
        .companions-scroll::-webkit-scrollbar-track { background: transparent; }
        .companions-scroll::-webkit-scrollbar-thumb { background: #dec29e55; border-radius: 99px; }
        .companions-scroll::-webkit-scrollbar-thumb:hover { background: #dec29e99; }
      `}</style>
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h4 className="text-2xl text-[#d9e2ff]" style={{ fontFamily: "'Noto Serif', serif" }}>
            Compañeros de Viaje
          </h4>
          <p className="mt-1 text-xs text-[#8f9098]">Confirmados para esta expedición</p>
        </div>
        {guests.length > 0 && (
          <span className="rounded-full bg-[#dec29e]/15 px-3 py-1 text-[11px] font-bold text-[#dec29e]">
            {guests.length}
          </span>
        )}
      </div>

      <div className="companions-scroll mb-8 space-y-4 max-h-72 overflow-y-auto pr-2">
        {guests.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/10 bg-white/[0.03] px-5 py-10 text-center">
            <p className="text-sm font-semibold text-[#d9e2ff]">No hay acompañantes agregados</p>
            <p className="mt-2 text-xs leading-relaxed text-[#8f9098]">
              Los acompañantes aparecerán aquí cuando se registren en esta reserva.
            </p>
          </div>
        ) : (
          guests.map((g, i) => (
            <div key={i}
              className="relative rounded-lg border border-[#dec29e]/10 bg-[#dec29e]/5 px-4 py-3 pr-11">
              {setGuests && (
                <button
                  type="button"
                  onClick={() => removeGuest(i)}
                  aria-label={`Quitar a ${g.nombre} ${g.apellidos}`}
                  className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full border border-[#dec29e]/20 text-[#dec29e]/75 transition-colors hover:border-[#dec29e]/60 hover:bg-[#dec29e]/10 hover:text-[#f5e2bd] focus:outline-none focus:ring-2 focus:ring-[#dec29e]/40"
                >
                  <span className="material-symbols-outlined text-[14px] leading-none">delete</span>
                </button>
              )}
              <p className="text-sm font-semibold text-[#d9e2ff] truncate"
                style={{ fontFamily: "'Noto Serif', serif" }}>
                {g.nombre} {g.apellidos}
              </p>
              <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5">
                {g.pasaporte && (
                  <span className="text-[10px] uppercase tracking-widest text-[#8f9098]">
                    {g.pasaporte}
                  </span>
                )}
                {g.fecha && (
                  <span className="text-[10px] text-[#8f9098]">
                    {formatDate(g.fecha)}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
