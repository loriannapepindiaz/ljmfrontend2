interface VoyageHighlightsProps {
  highlights?: string[];
  incluye?: string[];
  descripcion?: string;
}

export const VoyageHighlights = ({ highlights = [], incluye = [], descripcion }: VoyageHighlightsProps) => {
  return (
    <div className="space-y-6">
      {descripcion && (
        <p className="text-sm text-white/65 leading-relaxed">{descripcion}</p>
      )}

      {highlights.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold tracking-[0.25em] uppercase text-pearl-beige">Actividades Destacadas</h3>
          <ul className="space-y-3">
            {highlights.map((text, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-0.5" style={{ fontSize: '16px' }}>stars</span>
                <p className="text-sm font-medium text-gray-100 leading-snug">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {incluye.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold tracking-[0.25em] uppercase text-pearl-beige">Qué Incluye</h3>
          <div className="flex flex-wrap gap-2">
            {incluye.map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-white/80"
              >
                <span className="material-symbols-outlined text-primary" style={{ fontSize: '13px' }}>check_circle</span>
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {highlights.length === 0 && incluye.length === 0 && !descripcion && (
        <div className="rounded-xl border border-dashed border-white/10 bg-white/[0.03] px-5 py-8">
          <p className="text-sm font-bold uppercase tracking-widest text-gray-100">Sin información adicional</p>
          <p className="mt-2 text-sm text-gray-300/70">
            Los detalles se mostrarán cuando el destino tenga información asociada.
          </p>
        </div>
      )}
    </div>
  );
};
