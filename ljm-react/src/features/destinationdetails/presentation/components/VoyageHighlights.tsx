export const VoyageHighlights = () => {
  const highlights: string[] = [];

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-display text-pearl-beige tracking-wide">Actividades Destacadas</h3>
      {highlights.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/10 bg-white/[0.03] px-5 py-8">
          <p className="text-sm font-bold uppercase tracking-widest text-gray-100">Sin actividades registradas</p>
          <p className="mt-2 text-sm text-gray-300/70">
            Las actividades se mostraran cuando el viaje seleccionado tenga experiencias asociadas.
          </p>
        </div>
      ) : (
        <ul className="space-y-5">
          {highlights.map((text, index) => (
            <li key={index} className="flex items-start gap-5">
              <span className="material-icons text-primary mt-1 text-base">stars</span>
              <p className="text-base font-medium text-gray-100 leading-snug">{text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
