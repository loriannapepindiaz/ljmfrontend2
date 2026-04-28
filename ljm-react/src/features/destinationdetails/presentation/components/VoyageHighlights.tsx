export const VoyageHighlights = () => {
  const highlights = [
    "Cena al atardecer en la terraza privada de una bodega boutique en Santorini.",
    "Acceso VIP a las ruinas minoicas de Akrotiri con un historiador profesional.",
    "Alquiler exclusivo de yate a las cuevas marinas ocultas de Milos."
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-display text-pearl-beige tracking-wide">Actividades Destacadas</h3>
      <ul className="space-y-5">
        {highlights.map((text, index) => (
          <li key={index} className="flex items-start gap-5">
            <span className="material-icons text-primary mt-1 text-base">stars</span>
            <p className="text-base font-medium text-gray-100 leading-snug">{text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};