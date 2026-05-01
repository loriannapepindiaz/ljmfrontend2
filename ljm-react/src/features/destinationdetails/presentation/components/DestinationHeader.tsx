interface DestinationHeaderProps {
  titulo?: string;
  pais?: string;
  ubicacion?: string;
  duracion?: string;
  puertoSalida?: string;
  duracionTipica?: string;
  puertoPrincipal?: string;
  precioDesde?: number | string;
  moneda?: string;
  rating?: number | string;
  clima?: string;
  idioma?: string;
}

export const DestinationHeader = ({
  titulo,
  pais,
  ubicacion,
  duracion,
  puertoSalida,
  duracionTipica,
  puertoPrincipal,
  precioDesde,
  moneda = 'USD',
  rating,
  clima,
  idioma,
}: DestinationHeaderProps) => {
  const duracionFinal = duracion ?? duracionTipica;
  const puertoFinal = puertoSalida ?? puertoPrincipal;
  const precioNum = precioDesde
    ? Number(String(precioDesde).replace(/[^0-9.]/g, ''))
    : null;
  const ratingNum = rating ? Number(rating) : null;

  return (
    <div className="space-y-8">
      {/* Eyebrow */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-primary text-[11px] font-bold tracking-[0.4em] uppercase">
          <span className="w-10 h-[1.5px] bg-primary" />
          {pais || ubicacion || 'Destino'}
        </div>
        <h1 className="text-5xl md:text-6xl font-display leading-[1.1] text-white">
          {titulo ? (
            <>
              {titulo.split(' ')[0]} <br />
              <span className="italic text-pearl-beige font-medium">
                {titulo.split(' ').slice(1).join(' ')}
              </span>
            </>
          ) : (
            <>Destino <br /><span className="italic text-pearl-beige font-medium">pendiente</span></>
          )}
        </h1>

        {/* Rating + Precio */}
        <div className="flex items-center gap-4 pt-1">
          {ratingNum && (
            <div className="flex items-center gap-1.5">
              {[1,2,3,4,5].map(i => (
                <span
                  key={i}
                  className="material-symbols-outlined text-sm"
                  style={{ color: i <= Math.round(ratingNum) ? '#C5A059' : 'rgba(255,255,255,0.2)', fontSize: '16px' }}
                >
                  star
                </span>
              ))}
              <span className="text-xs text-pearl-beige/70 font-bold ml-1">{ratingNum.toFixed(1)}</span>
            </div>
          )}
          {precioNum && (
            <div className="flex items-center gap-1 ml-auto">
              <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Desde</span>
              <span className="text-xl font-bold text-primary">
                {moneda === 'USD' ? '$' : moneda}{precioNum.toLocaleString()}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-6 py-6 border-y border-white/10">
        <div>
          <p className="text-[10px] font-bold text-primary tracking-widest uppercase mb-1.5">Duración</p>
          <p className="text-base font-medium text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-pearl-beige text-lg">schedule</span>
            {duracionFinal || 'Sin datos'}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-primary tracking-widest uppercase mb-1.5">Puerto de Salida</p>
          <p className="text-base font-medium text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-pearl-beige text-lg">anchor</span>
            {puertoFinal || 'Sin datos'}
          </p>
        </div>
        {clima && (
          <div>
            <p className="text-[10px] font-bold text-primary tracking-widest uppercase mb-1.5">Clima</p>
            <p className="text-base font-medium text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-pearl-beige text-lg">wb_sunny</span>
              {clima}
            </p>
          </div>
        )}
        {idioma && (
          <div>
            <p className="text-[10px] font-bold text-primary tracking-widest uppercase mb-1.5">Idioma</p>
            <p className="text-base font-medium text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-pearl-beige text-lg">language</span>
              {idioma}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
