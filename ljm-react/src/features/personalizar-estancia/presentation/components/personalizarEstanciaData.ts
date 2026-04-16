import type { Option } from "./types";

export const pillowOptions: Option[] = [
  {
    id: "pluma",
    label: "Pluma",
    icon: "bed",
    description: "Suavidad envolvente de ganso blanco",
  },
  {
    id: "sintetica",
    label: "Sintetica",
    icon: "cloud",
    description: "Hipoalergenica de fibra hueca premium",
  },
  {
    id: "memory-foam",
    label: "Memory Foam",
    icon: "memory",
    description: "Soporte ergonomico de alta densidad",
  },
];

export const dietaryOptions = ["Omnivoro", "Vegetariano", "Vegano", "Keto", "Paleo"];

export const allergyOptions: Option[] = [
  { id: "rinitis", label: "Rinitis (Polen/Acaros)", icon: "potted_plant" },
  { id: "lacteos", label: "Lacteos (Leche)", icon: "water_drop" },
  { id: "huevo", label: "Huevo", icon: "egg_alt" },
  { id: "cacahuates", label: "Cacahuates", icon: "eco" },
  { id: "mariscos", label: "Mariscos", icon: "set_meal" },
  { id: "picaduras", label: "Picaduras (Insectos)", icon: "pest_control" },
  { id: "latex", label: "Cutaneas (Latex)", icon: "medical_services" },
];

export const stayOptions: Option[] = [
  {
    id: "pet-care",
    label: "Viaje con Mascotas",
    icon: "pets",
    description:
      "Acondicionamos su suite con amenidades premium para su companero: cama ergonomica, menu gourmet pet-friendly y kit de cuidado.",
    activeDescription: "Servicio Elite Pet-Care",
  },
  {
    id: "welcome-kit",
    label: "Kit de Bienvenida",
    icon: "redeem",
    description:
      "Un set curado de productos de cuidado personal organicos, fragancias exclusivas de la casa y seleccion de textileria fina.",
    activeDescription: "Complementario Premier",
  },
];

export const cardImages = {
  hero: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrwxxCsENEJyhmwmeZc6kF5z5L9icIM1ZyctBwGkk3mZK2m4DueO1lKx47Apm8tM8gfAf-H2vEWmRc_f5gq6UnF1whZUfGsSaZCV-j88-s5HqxV_Xtqu_-vMamjhdAuq5BAuQFJ-OT75BRM7PTNU12Fj24Be3PgokBqZ87UlGAZ2t92VdABCp4e_H3C71kRMRpiv7UC6QtOPGBtXj4nmPlp0OhWbnALWs0k-bp-7k6tPLnttks-pW3jE1q_pNghzNIfWvlyv_663Nw",
  pets:
    "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80",
  petsFallback:
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=80",
  welcome:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAnTXA-CMwsgP1oCKBn2E7rG-Yq-erFCPI1fAY38uGp-sN-2wWGshv3u3I-tS-NxngRpah6G81T9yIj27ZE49F_g9O9_PRjNU-ntRoWwUQSrIc9BuCZp-aTo8v5nenDPJycOcVyZyFROa9rUU-6vpDnpX3KWdBs8nPgvOPzBS5A2F7ZTUNWylUkDpq-MZ-CILa3vnfD0vcEskJWVDuZayAlY2TwAMjaeXvy7cM1CCB1Mc4H86zlQr7MJX6efOmxJirTiDCnE43-RMeH",
};
