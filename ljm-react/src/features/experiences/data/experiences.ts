export type ExperienceItem = {
  id: string;
  title: string;
  location: string;
  rating: string;
  image: string;
  description: string;
  price: number;
  unit: string;
};

export const allExperiences: ExperienceItem[] = [
  {
    id: "1",
    title: "Tirolesa sobre el mar",
    location: "CARIBE OCCIDENTAL",
    rating: "4.9",
    image: "https://www.ncl.com/sites/default/files/blog-hero-best-places-zipline.jpg",
    description: "Siente la adrenalina volando sobre aguas turquesas en nuestra tirolesa exclusiva.",
    price: 45,
    unit: "Invitado",
  },
  {
    id: "2",
    title: "Tour Privado",
    location: "MONACO",
    rating: "5.0",
    image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9",
    description: "Explora los destinos mas lujosos con guia privado y transporte VIP.",
    price: 250,
    unit: "Invitado",
  },
  {
    id: "3",
    title: "Jet Ski",
    location: "MALDIVAS",
    rating: "4.8",
    image: "https://images.pexels.com/photos/18972198/pexels-photo-18972198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Domina las olas con nuestras motos de agua de ultima generacion.",
    price: 120,
    unit: "Invitado",
  },
  {
    id: "4",
    title: "Buceo Premium",
    location: "POLINESIA",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
    description: "Descubre arrecifes vibrantes con instructores certificados.",
    price: 180,
    unit: "Invitado",
  },
  {
    id: "5",
    title: "Isla Mombasa",
    location: "KENIA",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=800&q=80",
    description: "Descubre la perla del Indico con playas de arena blanca y una cultura vibrante.",
    price: 0,
    unit: "Invitado",
  },
  {
    id: "6",
    title: "Velero Sunset",
    location: "SANTORINI",
    rating: "5.0",
    image: "https://images.unsplash.com/photo-1530053969600-caed2596d242?w=800&q=80",
    description: "Navega al atardecer por las aguas cristalinas del Mediterraneo en velero privado.",
    price: 95,
    unit: "Invitado",
  },
  {
    id: "7",
    title: "Safari Marino",
    location: "SEYCHELLES",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?w=800&q=80",
    description: "Explora la vida marina mas exotica del oceano Indico con guias expertos.",
    price: 150,
    unit: "Invitado",
  },
  {
    id: "8",
    title: "Kayak en los Fiordos",
    location: "NORUEGA",
    rating: "4.7",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80",
    description: "Rema entre glaciares y cascadas en uno de los paisajes mas impresionantes del mundo.",
    price: 65,
    unit: "Invitado",
  },
];

export const slugifyExperience = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
