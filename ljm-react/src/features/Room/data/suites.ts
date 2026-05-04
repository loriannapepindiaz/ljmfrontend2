import suiteOceanicaImage from "../../../assets/Suiteoceanica.jpeg";
import camaroteClasicoImage from "../../../assets/Camaroteclasico.jpg";
import penthouseCubiertaImage from "../../../assets/Penthousedecubierta.jpg";
import suiteFamiliarDeluxeImage from "../../../assets/Suite Familiar Deluxe.jpg";
import type { BookingSuiteDraft } from "../../../lib/bookingDraft";

export type SuiteOption = BookingSuiteDraft;

export const SUITES: SuiteOption[] = [
  {
    id: "suite-oceanica",
    title: "Suite Oceanica",
    imageUrl: suiteOceanicaImage,
    description: "Balcon privado con vista panoramica al oceano, cama king y bano de marmol con tina.",
    size: "79 m2",
    feature: "Terraza privada",
    capacity: "2 huespedes",
    pricePerNight: 1250,
    highlights: ["Vista panoramica al oceano", "Cama king", "Bano de marmol", "Servicio de habitacion 24h"],
    amenities: ["Wi-Fi ultra rapido", "Minibar premium", "Amenidades de lujo", "Concierge digital"],
    gallery: [suiteOceanicaImage, suiteFamiliarDeluxeImage, penthouseCubiertaImage],
  },
  {
    id: "camarote-clasico",
    title: "Camarote Clasico",
    imageUrl: camaroteClasicoImage,
    description: "Comodidad esencial con diseno refinado, ropa de cama premium y todas las amenidades incluidas.",
    size: "38 m2",
    feature: "Diseno refinado",
    capacity: "2 huespedes",
    pricePerNight: 690,
    highlights: ["Ropa de cama premium", "Ducha tipo lluvia", "Smart TV", "Espacio optimizado"],
    amenities: ["Wi-Fi incluido", "Room service", "Caja de seguridad", "Set de cafe"],
    gallery: [camaroteClasicoImage, suiteOceanicaImage, suiteFamiliarDeluxeImage],
  },
  {
    id: "penthouse-deck",
    title: "Penthouse de Deck",
    imageUrl: penthouseCubiertaImage,
    description: "Dos plantas de lujo absoluto con terraza privada, jacuzzi y mayordomo personal las 24 horas.",
    size: "145 m2",
    feature: "Jacuzzi privado",
    capacity: "4 huespedes",
    pricePerNight: 2450,
    highlights: ["Dos plantas privadas", "Jacuzzi en terraza", "Mayordomo 24h", "Salon independiente"],
    amenities: ["Chef bajo solicitud", "Bar premium", "Priority boarding", "Spa in-suite"],
    gallery: [penthouseCubiertaImage, suiteFamiliarDeluxeImage, suiteOceanicaImage],
  },
  {
    id: "suite-familiar-deluxe",
    title: "Suite Familiar Deluxe",
    imageUrl: suiteFamiliarDeluxeImage,
    description: "Dos dormitorios conectados, sala de estar y vista al mar. Perfecta para toda la familia.",
    size: "112 m2",
    feature: "Dos dormitorios",
    capacity: "5 huespedes",
    pricePerNight: 1780,
    highlights: ["Habitaciones conectadas", "Sala de estar", "Vista al mar", "Configuracion familiar"],
    amenities: ["Menu infantil", "Lavanderia express", "Entretenimiento familiar", "Concierge familiar"],
    gallery: [suiteFamiliarDeluxeImage, suiteOceanicaImage, camaroteClasicoImage],
  },
];

export const getSuiteById = (id?: string) => SUITES.find((suite) => suite.id === id);

export const normalizeSuiteFromApi = (suite: any): SuiteOption => {
  const id = String(suite.id ?? suite.id_tipo_habitacion ?? suite.nombre ?? suite.title ?? "");
  const fallback = getSuiteById(id) ?? SUITES.find((item) => item.title.toLowerCase() === String(suite.title ?? suite.nombre ?? "").toLowerCase()) ?? SUITES[0];
  const image = suite.imageUrl ?? suite.imagen_url ?? suite.image ?? fallback.imageUrl;
  const price = Number(suite.pricePerNight ?? suite.precio_noche ?? suite.precio_base ?? fallback.pricePerNight);

  return {
    id,
    title: suite.title ?? suite.nombre ?? fallback.title,
    description: suite.description ?? suite.descripcion ?? fallback.description,
    imageUrl: image,
    size: suite.size ?? (suite.tamano_m2 ? `${Number(suite.tamano_m2)} m2` : fallback.size),
    feature: suite.feature ?? suite.nombre ?? fallback.feature,
    capacity: suite.capacity ?? (suite.capacidad_max ? `${suite.capacidad_max} huespedes` : fallback.capacity),
    pricePerNight: Number.isFinite(price) ? price : fallback.pricePerNight,
    highlights: suite.highlights?.length ? suite.highlights : fallback.highlights,
    amenities: suite.amenities?.length ? suite.amenities : fallback.amenities,
    gallery: suite.gallery?.length ? suite.gallery : [image, ...fallback.gallery].filter(Boolean),
  };
};
