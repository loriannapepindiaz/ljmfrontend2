import suiteOceanicaImage from "../../../assets/Suiteoceanica.jpeg";
import camaroteClasicoImage from "../../../assets/Camaroteclasico.jpg";
import penthouseCubiertaImage from "../../../assets/Penthousedecubierta.jpg";
import suiteFamiliarDeluxeImage from "../../../assets/Suite Familiar Deluxe.jpg";
import type { BookingSuiteDraft } from "../../../lib/bookingDraft";

export type SuiteOption = BookingSuiteDraft;

export const SUITES: SuiteOption[] = [
  {
    id: "suite-oceanica",
    title: "Suite Oceánica",
    imageUrl: suiteOceanicaImage,
    description: "Balcón privado con vista panorámica al océano, cama king y baño de mármol con tina.",
    size: "79 m2",
    feature: "Terraza privada",
    capacity: "2 huéspedes",
    pricePerNight: 1250,
    highlights: ["Vista panorámica al océano", "Cama king", "Baño de mármol", "Servicio de habitación 24h"],
    amenities: ["Wi-Fi ultra rápido", "Minibar premium", "Amenidades de lujo", "Concierge digital"],
    gallery: [suiteOceanicaImage, suiteFamiliarDeluxeImage, penthouseCubiertaImage],
  },
  {
    id: "camarote-clasico",
    title: "Camarote Clásico",
    imageUrl: camaroteClasicoImage,
    description: "Comodidad esencial con diseño refinado, ropa de cama premium y todas las amenidades incluidas.",
    size: "38 m2",
    feature: "Diseño refinado",
    capacity: "2 huéspedes",
    pricePerNight: 690,
    highlights: ["Ropa de cama premium", "Ducha tipo lluvia", "Smart TV", "Espacio optimizado"],
    amenities: ["Wi-Fi incluido", "Room service", "Caja de seguridad", "Set de café"],
    gallery: [camaroteClasicoImage, suiteOceanicaImage, suiteFamiliarDeluxeImage],
  },
  {
    id: "penthouse-deck",
    title: "Penthouse de Deck",
    imageUrl: penthouseCubiertaImage,
    description: "Dos plantas de lujo absoluto con terraza privada, jacuzzi y mayordomo personal las 24 horas.",
    size: "145 m2",
    feature: "Jacuzzi privado",
    capacity: "4 huéspedes",
    pricePerNight: 2450,
    highlights: ["Dos plantas privadas", "Jacuzzi en terraza", "Mayordomo 24h", "Salón independiente"],
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
    capacity: "5 huéspedes",
    pricePerNight: 1780,
    highlights: ["Habitaciones conectadas", "Sala de estar", "Vista al mar", "Configuración familiar"],
    amenities: ["Menú infantil", "Lavandería express", "Entretenimiento familiar", "Concierge familiar"],
    gallery: [suiteFamiliarDeluxeImage, suiteOceanicaImage, camaroteClasicoImage],
  },
];

export const getSuiteById = (id?: string) => SUITES.find((suite) => suite.id === id);

const normalizeText = (value: unknown) =>
  String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();

export const normalizeSuiteFromApi = (suite: any): SuiteOption => {
  const id = String(suite.id ?? suite.id_tipo_habitacion ?? suite.nombre ?? suite.title ?? "");
  const suiteTitle = normalizeText(suite.title ?? suite.nombre);
  const fallback =
    getSuiteById(id) ??
    SUITES.find((item) => {
      const itemTitle = normalizeText(item.title);
      return itemTitle === suiteTitle || itemTitle.includes(suiteTitle) || suiteTitle.includes(itemTitle.split(" ")[0]);
    }) ??
    SUITES[0];
  const image = suite.imageUrl ?? suite.imagen_url ?? suite.image ?? fallback.imageUrl;
  const price = Number(suite.pricePerNight || suite.precio_noche || suite.precio_base || fallback.pricePerNight);

  return {
    id,
    idHabitacion: suite.idHabitacion ?? suite.id_habitacion ?? null,
    idTipoHabitacion: suite.idTipoHabitacion ?? suite.id_tipo_habitacion ?? suite.id ?? null,
    id_habitacion: suite.id_habitacion ?? suite.idHabitacion ?? null,
    id_tipo_habitacion: suite.id_tipo_habitacion ?? suite.idTipoHabitacion ?? suite.id ?? null,
    title: suite.title ?? suite.nombre ?? fallback.title,
    description: suite.description ?? suite.descripcion ?? fallback.description,
    imageUrl: image,
    size: suite.size ?? (suite.tamano_m2 ? `${Number(suite.tamano_m2)} m2` : fallback.size),
    feature: suite.feature ?? suite.nombre ?? fallback.feature,
    capacity: suite.capacity ?? (suite.capacidad_max ? `${suite.capacidad_max} huéspedes` : fallback.capacity),
    pricePerNight: Number.isFinite(price) ? price : fallback.pricePerNight,
    highlights: suite.highlights?.length ? suite.highlights : fallback.highlights,
    amenities: suite.amenities?.length ? suite.amenities : fallback.amenities,
    gallery: suite.gallery?.length ? suite.gallery : [image, ...fallback.gallery].filter(Boolean),
  };
};
