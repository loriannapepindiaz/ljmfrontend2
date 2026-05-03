import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DestinationHeader } from "../components/DestinationHeader";
import { VoyageHighlights } from "../components/VoyageHighlights";
import { VoyageRouteMap } from "../components/VoyageRouteMap";
import { DestinationGallery } from "../components/DestinationGallery";
import Navbar from '../../../home/presentation/components/Navbar';
import Footer from '../../../home/presentation/components/Footer';
import BackButton from '../../../../components/BackButton';

interface DestinationData {
  id?: string | number;
  titulo?: string;
  pais?: string;
  ubicacion?: string;
  descripcion?: string;
  rating_promedio?: number | string;
  imagen_url?: string;
  precio_desde?: number | string;
  moneda?: string;
  galeria_urls?: string[];
  tags?: string[];
  highlights?: string[];
  incluye?: string[];
  clima?: string;
  idioma?: string;
  duracion_tipica?: string;
  puerto_principal?: string;
  // campos normalizados desde distintas fuentes
  title?: string;
  location?: string;
  description?: string;
  image?: string;
  rating?: number | string;
  price?: string;
  localOnly?: boolean;
}

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export const DestinationDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const stateDestination: DestinationData | undefined = (location.state as any)?.destination;

  const [extraData, setExtraData] = useState<any>(null);

  // Normaliza datos de distintas fuentes (home, grid, offers, experiences)
  const titulo      = stateDestination?.titulo      ?? stateDestination?.title       ?? extraData?.titulo;
  const pais        = stateDestination?.pais        ?? stateDestination?.location    ?? extraData?.pais;
  const ubicacion   = stateDestination?.ubicacion   ?? extraData?.ubicacion;
  const descripcion = stateDestination?.descripcion ?? stateDestination?.description ?? extraData?.descripcion;
  const imagenUrl   = stateDestination?.imagen_url  ?? stateDestination?.image       ?? extraData?.imagen_url;
  const moneda      = stateDestination?.moneda      ?? extraData?.moneda ?? 'USD';

  // Precio — desde state o BD
  const precioDesde = extraData?.precio_desde ?? stateDestination?.precio_desde ?? stateDestination?.price;
  const rating      = extraData?.rating_promedio ?? stateDestination?.rating_promedio ?? stateDestination?.rating;

  // Campos nuevos — solo disponibles desde BD
  const clima           = extraData?.clima            ?? stateDestination?.clima;
  const idioma          = extraData?.idioma           ?? stateDestination?.idioma;
  const duracionTipica  = extraData?.duracion_tipica  ?? stateDestination?.duracion_tipica;
  const puertoPrincipal = extraData?.puerto_principal ?? stateDestination?.puerto_principal;

  // Highlights: orden de preferencia — BD > state > tags de destino_tags
  const highlights: string[] = extraData?.highlights?.length
    ? extraData.highlights
    : stateDestination?.highlights?.length
      ? stateDestination.highlights
      : extraData?.destino_tags?.map((dt: any) => dt.tags?.nombre).filter(Boolean)
        ?? stateDestination?.tags ?? [];

  const incluye: string[] = extraData?.incluye?.length
    ? extraData.incluye
    : stateDestination?.incluye ?? [];

  // Duración desde VIAJE asociado (si existe en BD)
  const primerViaje   = extraData?.VIAJE?.[0];
  const duracionViaje = primerViaje ? `${primerViaje.duracion_dias} noches` : undefined;
  const puertoViaje   = primerViaje?.ITINERARIO?.[0]?.escala?.[0]?.PUERTO?.nombre_puerto;

  // Galería — API es fuente autoritativa; state solo como fallback si API no tiene fotos
  const stateGaleria: string[] = stateDestination?.galeria_urls ?? [];
  const apiGaleria: string[]   = extraData?.galeria_urls ?? [];
  const galeriaUrls: string[]  = (apiGaleria.length > 0 ? apiGaleria : stateGaleria).filter(Boolean);
  const galleryPhotos = galeriaUrls.map((url: string) => ({ url, location: pais ?? '' }));

  // Fetch desde backend: por ID si existe, o busca por título
  useEffect(() => {
    if (stateDestination?.localOnly) {
      setExtraData(null);
      return;
    }

    const id = stateDestination?.id;
    const tituloState = stateDestination?.titulo ?? stateDestination?.title;

    if (id) {
      fetch(`${API_URL}/api/destinations/${id}`)
        .then((r) => r.json())
        .then((json) => { if (json.ok) setExtraData(json.data); })
        .catch(() => {});
    } else if (tituloState) {
      fetch(`${API_URL}/api/destinations?titulo=${encodeURIComponent(tituloState)}`)
        .then((r) => r.json())
        .then((json) => {
          if (json.ok && json.data?.length > 0) setExtraData(json.data[0]);
        })
        .catch(() => {});
    }
  }, [stateDestination?.id, stateDestination?.localOnly, stateDestination?.titulo, stateDestination?.title]);

  return (
    <div className="flex flex-col min-h-screen bg-midnight-blue">
      <BackButton topClass="top-24" />
      <Navbar />

      <main className="relative flex-grow pt-32 pb-24 flex items-center justify-center overflow-hidden">
        {/* Fondo con imagen del destino */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 transform scale-105"
            style={{
              backgroundImage: `url('${imagenUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuBsTCN_0ROR0IL7ZRQCA37YYjBPClqFv7aDxL8dLkubqvJp-qAkneDzN3y9fHmSxONDgaSGYKxlmExcnpxUxqqtegGAfzWNPpsCSnztgwd3NnnUgXA4a1kFgooc6qLkXyH-Z7WsIsThMPRFNyyixaMFcoDq0LLK7BMG6LAi1c3FLsFRhoI2wxD_6qFm_6yb8FIXpXcI3CsV6XYtvKAYyxHXarDhVfOOy5K3plW0FY7XBEUQ1yY03UvsMG4JZiUmY9T6XQv4Y0mKIjI"}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-midnight-blue/60" />
        </div>

        <div className="relative z-10 w-full px-6">
          <div className="glass-panel max-w-[95%] xl:max-w-[1440px] mx-auto rounded-[3.5rem] p-8 md:p-14 bg-midnight-blue/65 backdrop-blur-xl border border-white/10 shadow-2xl">
            <div className="flex flex-col lg:flex-row gap-16 items-stretch mb-14">

              {/* Columna Izquierda */}
              <div className="lg:w-1/2 space-y-8">
                <DestinationHeader
                  titulo={titulo}
                  pais={pais}
                  ubicacion={ubicacion}
                  duracion={duracionViaje}
                  puertoSalida={puertoViaje}
                  duracionTipica={duracionTipica}
                  puertoPrincipal={puertoPrincipal}
                  precioDesde={precioDesde}
                  moneda={moneda}
                  rating={rating}
                  clima={clima}
                  idioma={idioma}
                />
                <VoyageHighlights
                  highlights={highlights}
                  incluye={incluye}
                  descripcion={descripcion}
                />
                <div className="pt-2">
                  <button
                    onClick={() => navigate('/Room')}
                    className="bg-primary hover:bg-luxury-gold text-midnight-blue px-14 py-5 rounded-full text-sm font-extrabold tracking-[0.3em] transition-all w-full md:w-auto uppercase shadow-lg active:scale-95"
                  >
                    Reservar Este Viaje
                  </button>
                </div>
              </div>

              {/* Columna Derecha: Mapa */}
              <VoyageRouteMap titulo={titulo} pais={pais} ubicacion={ubicacion} />
            </div>

            <DestinationGallery photos={galleryPhotos} titulo={titulo} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
