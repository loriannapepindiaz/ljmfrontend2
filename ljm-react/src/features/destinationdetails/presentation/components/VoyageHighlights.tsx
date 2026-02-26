export const VoyageHighlights = () => {
  const highlights = [
    "Sunset dinner at the private terrace of a Santorini boutique winery.",
    "VIP access to the Minoan ruins of Akrotiri with a professional historian.",
    "Exclusive yacht charter to the hidden sea caves of Milos."
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