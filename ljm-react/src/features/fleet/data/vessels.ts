// Central source for fleet data. This mirrors the structure a backend response should expose.
export interface VesselAccommodation {
  mainImage: string;
  mainTitle: string;
  mainDesc: string;
  mainDeck: string;
  thumbs: { src: string; label: string }[];
}

export interface VesselLifestyleItem {
  title: string;
  description: string;
}

export interface VesselData {
  id: string;
  title: string;
  subtitle: string;
  className: string;
  description: string;
  length: string;
  guests: string;
  badge: string;
  imageSrc: string;
  heroImage: string;
  specs: { length: string; tonnage: string; guests: string; decks: string };
  visionTitle: string;
  visionDescription: string;
  visionQuote: string;
  galleryImages: { src: string; alt: string }[];
  accommodations: VesselAccommodation[];
  lifestyleImage: string;
  lifestyleHighlight: {
    icon: string;
    title: string;
    description: string;
  };
  lifestyleTitle: string;
  lifestyleItems: VesselLifestyleItem[];
}

const serenityImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA84W5PQL7IEuB3rynux-aB4RxSx4_zwQ9m58GmsSqacuGq36ZEUswxniN4RsxN5Cnnv8EPYlj0p7RpYq3NyopaM3y1R-hkztTM6xW9Y9zS8mMPDSsZUWuB0GBsbNWHtNk4h2SM2kwF-X6ZLWoCQ6hIwxj1nUciMn6LFjL__5WmIpY9nz9YbHeysjjaYSQoVytkWBQzX_LoqXwSGAsPep1oYZKcXUeJpfQfc6pIT-hD3GP2DXoNlKLMMKAQK55aHITDxsmruYKdDh8";
const azureImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuARJju3i-CT1ZZ4da9pgQGiAx6Pl66a42pxux47r1Unh3gOayOF61Zx6SSgB550cieWuXc24neUGMdCux6FKL6CHPVRn0oRAlHk3Zzf_1u2XXZxZE9UoARRtO-jFAchCMiNC56wAtVwH13-WCNIQiMb-v_FBRO43ClZwIvYABWTEeimAkTW_j0C6I-VT6XaHEx6CIU4pIyLchwNc0CeDzVDG8SOrESP6ZguGgI5a86tGJ533LGom_AkuC79-CTirt44JzLPy_041Ls";
const majesticImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAaRrIP2F5y6bFAzR2X4EdIvDFrd4LaNnLCZRN_mXtvbgzyxJSR3c_CTBm79WRndjuq2m-RsMOfsCBGOKTQ5Na1dwBFeDHy5RsSYTiqIWhqWJ5CEi70PO2ddW_Koe40r12q6VYolJWiNx-OdwaikW9TLBmtrSBW3PrRg-2S8z8bVeibq75oxaknkJIY4f5R9qgHBSCKi7bf-nC-FrdyOXcRYXKt6pkgtBKDtBQizMue7sl7cFRhgRxTXOPqZ8HUvkjbdmQUanNxRMY";
const celestialImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB3Cm8Vp0BIDOeE9LPnNUOX5uAv4NSFUIRepWGM_nwiFdcKcs-11vOlYw9AyiCU_OWP-aUClbHS0ZsWSs7G4yAH_AfRVqEqAzCwVCJ2iQYCX4tYu4mMQ0QfodvK2XDfaKYVLxbg05n45e3aJg0aIjLCskHdNiWR8Ea235_VZxZEiveOtZ0j8UxSjqFE9QtwTGs44Sk6JOw8CKmM_deQ_lxKRz-be27MIhJOfpNlu_Db9H2udvLmYq_WSHmVJa8nMhczMr1LHbdRRyQ";
const oceanicImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDtNJgtd1USMUa5nZZumatCZ05sKe2au3FQlBVMsKD8LOQJyKFPUX0fSRWAeM_KA3pYqStmKmLvcfSyjFSGF-qSOKUKsP0HeN-tVz8t94nZareXttPswLsDJt6QjZmuXPQigHwHOtxnovgIguemQNVdHWHp2RcRa34hYyoF0TBBmrWAXOU9qcRbS275yu6rzIrjHujh73E4dt8vEkVOVc_jv1YJaNWRLk1SGFWzvATmDqDJRWlTR_bUtJ5IYBkYIDj5w7IFg_4SLlpk";

const accommodationImages = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBVdjZIuZySJPAAaI3_ZWHfkmdVw1BufcSoU_uXkQ3PojJS85ZLs1iER7zTAhTqyQlsKzs3z9bzBckPKszRQS7r1VpL0HZAfwsgY3P8p5oIJF4KTYhIc0f3Lkog9-NfS7uwpujOZRs5GazNrFZ_4zwoCcEXENljtiAb8SyJUlxLWN6zvVRjHBAeCBkYZfjq5mvw5XX1bt6r56btKWGvxcqsiyfjfFaKmL0Hp_wPMQ6FyFw57LS7W43iU4wuggdz2vL6OkCDyn734tKx",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBvqiAbboDG2M7vX2qwTcokADV4DKNfpyxMy8ExNHCxGvZsG-Dr62U-_MM_L6jSoF02OY_278FRfTpwhS-L9VgXhsvhcIVEIChwgEa0ykMQ_i5kS2IpXFXgiOKjJyHxkrruNtTz3U8LVr6J2ian41gR3tGm_0Tai45xrZIObDVEJzilc1QXee9YdacESnJsR8e0Uoo3eKG0tDrBn2DflJjpz5-pL5YtiGrYc06m73_9U_sI5NEE1_YCVmrS34uC4k5zLjnobAxWIfYs",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD1gnTu4RFZ9ku7uxrFMeyXboUvpk1Xb6FS7gRFdd5plxxS9LD-njs6DBZiP9BQfOR8yU9NVXODGAEKe9livJfvz2G_LUZHJ2tAYFJv5bKcGmqnFpHsNnwm7A_E4kym8-ATXwgFIrhTDfVmjqR-eIRG_nMfAAOoOhFmLj2BegwJXdwAi7kmgykBN3t0OZJTzAGbjra3Pk2WORErAtUPHZNBTbET08yEWhBi6G1-YS1Qc-VYTDKa5couJc_xD3jzdRnmc6WSfBMtbTlz",
];

const buildAccommodations = (prefix: string): VesselAccommodation[] => [
  {
    mainImage: accommodationImages[0],
    mainTitle: `${prefix} Owner Pavilion`,
    mainDesc: "Terraza privada, salón panorámico y acceso reservado a servicios de concierge.",
    mainDeck: "01 - Cubierta Cuatro",
    thumbs: [
      { src: accommodationImages[1], label: `${prefix} Suite VIP` },
      { src: accommodationImages[2], label: `${prefix} Camarote Azure` },
    ],
  },
  {
    mainImage: accommodationImages[1],
    mainTitle: `${prefix} Suite VIP`,
    mainDesc: "Balcón privado, cama king-size y baño revestido con mármol de alto brillo.",
    mainDeck: "02 - Cubierta Tres",
    thumbs: [
      { src: accommodationImages[2], label: `${prefix} Camarote Azure` },
      { src: accommodationImages[0], label: `${prefix} Owner Pavilion` },
    ],
  },
  {
    mainImage: accommodationImages[2],
    mainTitle: `${prefix} Camarote Azure`,
    mainDesc: "Configuración flexible, terraza privada y sistema de entretenimiento a medida.",
    mainDeck: "03 - Cubierta Dos",
    thumbs: [
      { src: accommodationImages[0], label: `${prefix} Owner Pavilion` },
      { src: accommodationImages[1], label: `${prefix} Suite VIP` },
    ],
  },
];

export const VESSELS: VesselData[] = [
  {
    id: "serenity",
    title: "The Serenity",
    subtitle: "Experiencia Premium",
    className: "Clase Insignia",
    description:
      "Nuestro buque insignia ofrece el más alto nivel de espacio y lujo en el mar, con suites panorámicas y servicio de mayordomo personalizado.",
    length: "362m",
    guests: "5,400",
    badge: "Buque Insignia",
    imageSrc: serenityImage,
    heroImage: serenityImage,
    specs: { length: "362m", tonnage: "168,000t", guests: "5,400", decks: "18" },
    visionTitle: "La visión: Serenidad en Movimiento",
    visionDescription:
      "The Serenity combina arquitectura naval monumental con interiores silenciosos, pensados para viajeros que quieren amplitud, calma y una experiencia premium sin fricción.",
    visionQuote: "Diseñada para convertir cada travesía larga en una residencia flotante.",
    galleryImages: [
      { src: accommodationImages[0], alt: "Suite principal de The Serenity" },
      { src: accommodationImages[1], alt: "Salón privado de The Serenity" },
    ],
    accommodations: buildAccommodations("Serenity"),
    lifestyleImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDGuv_13epn-uEvhMvPHQemBPn5MMoGNtWOvTrsaBvJjd7nG47iHITwbQnjXtBktWD1NBZUd6I2qBcO7UmuDgs9MO00UpOUXpA6UrGpobAIRJ0ri3s3vGW93xwFcyX8w_83nvOUMoMsBF2IYTP2I2TU_AeszO2Rw6PTFTgqvGHmmerc1b4evUxhSVoni_aYQMhFBkJ4uYhtBtxolEhY2D6w84j9z5N1eigA1btfnQHlKWcJZdZawVaQBs0WOie57YUXwjpPfTEg0Vjz",
    lifestyleHighlight: {
      icon: "restaurant",
      title: "El Horizonte Culinario",
      description: "Mariscos frescos e ingredientes artesanales preparados por chefs residentes.",
    },
    lifestyleTitle: "Alimento para el Alma",
    lifestyleItems: [
      { title: "Gastronomía", description: "Tres restaurantes exclusivos y experiencias privadas al atardecer." },
      { title: "Bienestar", description: "Spa completo, sauna finlandesa y gimnasio panorámico." },
      { title: "Beach Club", description: "Plataformas hidráulicas y salón de observación subacuática." },
    ],
  },
  {
    id: "azure",
    title: "The Azure",
    subtitle: "Elegancia Moderna",
    className: "Clase Ultra Lujo",
    description:
      "Una obra de ingeniería náutica diseñada para viajes íntimos hacia puertos exclusivos y joyas ocultas del mundo.",
    length: "345m",
    guests: "4,200",
    badge: "Ultra Lujo",
    imageSrc: azureImage,
    heroImage: azureImage,
    specs: { length: "345m", tonnage: "142,000t", guests: "4,200", decks: "16" },
    visionTitle: "La visión: Elegancia Azul",
    visionDescription:
      "The Azure prioriza rutas exclusivas, espacios más íntimos y tecnología silenciosa para que el viaje se sienta privado incluso en mar abierto.",
    visionQuote: "Un crucero pensado para llegar donde el lujo masivo no suele entrar.",
    galleryImages: [
      { src: accommodationImages[1], alt: "Suite VIP de The Azure" },
      { src: accommodationImages[2], alt: "Camarote premium de The Azure" },
    ],
    accommodations: buildAccommodations("Azure"),
    lifestyleImage: accommodationImages[1],
    lifestyleHighlight: {
      icon: "local_bar",
      title: "Salon Azure",
      description: "Coctelería de autor, música en vivo y terrazas reservadas para noches privadas.",
    },
    lifestyleTitle: "Elegancia sin Esfuerzo",
    lifestyleItems: [
      { title: "Dining Privado", description: "Menús de temporada con maridajes curados por el sommelier." },
      { title: "Rutas Boutique", description: "Escalas seleccionadas para puertos menos concurridos." },
      { title: "Suites Silenciosas", description: "Aislamiento acústico y terrazas profundas para descanso total." },
    ],
  },
  {
    id: "majestic",
    title: "The Majestic",
    subtitle: "Clase Explorador",
    className: "Clase Explorador",
    description: "Dimensionado para exploración en alta mar sin comprometer el confort ni la presencia escénica.",
    length: "298m",
    guests: "2,800",
    badge: "Explorador",
    imageSrc: majesticImage,
    heroImage: majesticImage,
    specs: { length: "298m", tonnage: "92,000t", guests: "2,800", decks: "13" },
    visionTitle: "La visión: Exploración con Carisma",
    visionDescription:
      "The Majestic está creado para itinerarios activos, desembarcos rápidos y viajeros que quieren lujo con espíritu de expedición.",
    visionQuote: "La aventura también puede llevar lino impecable y café perfecto.",
    galleryImages: [
      { src: accommodationImages[0], alt: "Suite de The Majestic" },
      { src: accommodationImages[2], alt: "Cubierta de The Majestic" },
    ],
    accommodations: buildAccommodations("Majestic"),
    lifestyleImage: majesticImage,
    lifestyleHighlight: {
      icon: "explore",
      title: "Expedition Lounge",
      description: "Briefings diarios, mapas náuticos y especialistas invitados para cada ruta.",
    },
    lifestyleTitle: "Aventura Curada",
    lifestyleItems: [
      { title: "Excursiones", description: "Zodiacs, guías expertos y rutas de naturaleza en grupos reducidos." },
      { title: "Observatorio", description: "Cubiertas abiertas para fotografía, fauna marina y navegación escénica." },
      { title: "Confort", description: "Camarotes cálidos diseñados para descansar después de cada exploración." },
    ],
  },
  {
    id: "celestial",
    title: "The Celestial",
    subtitle: "Clase Horizonte",
    className: "Clase Horizonte",
    description: "Diseñado para observación estelar, travesías contemplativas y noches memorables en mar abierto.",
    length: "310m",
    guests: "3,100",
    badge: "Observatorio",
    imageSrc: celestialImage,
    heroImage: celestialImage,
    specs: { length: "310m", tonnage: "105,000t", guests: "3,100", decks: "14" },
    visionTitle: "La visión: Navegar Bajo las Estrellas",
    visionDescription:
      "The Celestial convierte la noche en protagonista con espacios de observación, iluminación tenue y experiencias astronómicas guiadas.",
    visionQuote: "Un barco para recordar que el cielo también forma parte del itinerario.",
    galleryImages: [
      { src: accommodationImages[2], alt: "Suite de The Celestial" },
      { src: accommodationImages[1], alt: "Salón observatorio de The Celestial" },
    ],
    accommodations: buildAccommodations("Celestial"),
    lifestyleImage: celestialImage,
    lifestyleHighlight: {
      icon: "star",
      title: "Observatorio Marino",
      description: "Sesiones nocturnas de astronomía y cócteles bajo constelaciones.",
    },
    lifestyleTitle: "Noches que Respiran",
    lifestyleItems: [
      { title: "Astronomía", description: "Observatorio con telescopios y charlas guiadas por expertos." },
      { title: "Rituales Nocturnos", description: "Cenas tardías, jazz suave y cubiertas con baja contaminación lumínica." },
      { title: "Wellness Lunar", description: "Spa nocturno y meditaciones al ritmo del mar." },
    ],
  },
  {
    id: "oceanic",
    title: "The Oceanic",
    subtitle: "Clase Viajero",
    className: "Clase Viajero",
    description: "Redefine el viaje marítimo sostenible con tecnología híbrida y una relación más consciente con el océano.",
    length: "330m",
    guests: "3,600",
    badge: "Híbrido",
    imageSrc: oceanicImage,
    heroImage: oceanicImage,
    specs: { length: "330m", tonnage: "118,000t", guests: "3,600", decks: "15" },
    visionTitle: "La visión: Lujo Responsable",
    visionDescription:
      "The Oceanic apuesta por eficiencia energética, materiales responsables y experiencias que ponen el océano en el centro.",
    visionQuote: "Viajar mejor también significa dejar una estela más ligera.",
    galleryImages: [
      { src: accommodationImages[0], alt: "Suite de The Oceanic" },
      { src: accommodationImages[1], alt: "Interior sostenible de The Oceanic" },
    ],
    accommodations: buildAccommodations("Oceanic"),
    lifestyleImage: oceanicImage,
    lifestyleHighlight: {
      icon: "eco",
      title: "Blue Lab",
      description: "Programas de educación marina y experiencias sostenibles durante la travesía.",
    },
    lifestyleTitle: "Consciencia en Alta Mar",
    lifestyleItems: [
      { title: "Tecnología híbrida", description: "Operación optimizada para reducir consumo en rutas seleccionadas." },
      { title: "Cocina Local", description: "Menús con proveedores regionales y pesca responsable." },
      { title: "Ocean Lab", description: "Actividades educativas sobre biodiversidad y conservación marina." },
    ],
  },
];

export const getVesselById = (id?: string) => VESSELS.find((vessel) => vessel.id === id);

export const getFeaturedVessels = () => VESSELS.slice(0, 2);

export const getSecondaryVessels = () => VESSELS.slice(2);

export const normalizeVesselFromApi = (vessel: any): VesselData => {
  const dbId = String(vessel.id ?? vessel.crucero_id ?? '');
  const name = vessel.title ?? vessel.nombre ?? vessel.nombre_crucero ?? '';

  // Match by slug first, then by name, then fall back to first static vessel
  const fallback =
    getVesselById(dbId) ??
    VESSELS.find(v => v.title.toLowerCase() === name.toLowerCase()) ??
    VESSELS[0];

  // Always use the static slug as the id so navigation (/crucero/serenity) keeps working
  const image = vessel.imagen_url ?? vessel.imageSrc ?? vessel.hero_image ?? vessel.heroImage ?? fallback.imageSrc;

  return {
    ...fallback,
    id: fallback.id,
    title: name || fallback.title,
    subtitle: vessel.subtitle ?? vessel.categoria ?? vessel.clase ?? fallback.subtitle,
    className: vessel.className ?? vessel.clase ?? vessel.categoria ?? fallback.className,
    description: vessel.description ?? vessel.descripcion ?? fallback.description,
    length: vessel.length ?? vessel.eslora ?? vessel.longitud ?? fallback.length,
    guests: String(vessel.guests ?? vessel.capacidad_huespedes ?? vessel.capacidad ?? fallback.guests),
    badge: vessel.badge ?? vessel.estado ?? vessel.categoria ?? fallback.badge,
    imageSrc: image,
    heroImage: vessel.hero_image ?? vessel.heroImage ?? image,
    specs: {
      length: vessel.specs?.length ?? vessel.eslora ?? vessel.longitud ?? fallback.specs.length,
      tonnage: vessel.specs?.tonnage ?? vessel.tonelaje ?? vessel.arqueo_bruto ?? fallback.specs.tonnage,
      guests: String(vessel.specs?.guests ?? vessel.capacidad_huespedes ?? vessel.capacidad ?? fallback.specs.guests),
      decks: String(vessel.specs?.decks ?? vessel.cubiertas ?? vessel.numero_cubiertas ?? fallback.specs.decks),
    },
  };
};
