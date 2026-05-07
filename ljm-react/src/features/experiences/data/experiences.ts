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
    location: "Aventura",
    rating: "4.9",
    image: "https://www.ncl.com/sites/default/files/blog-hero-best-places-zipline.jpg",
    description: "Adrenalina pura sobrevolando aguas cristalinas en nuestra tirolesa exclusiva.",
    price: 45,
    unit: "Invitado",
  },
  {
    id: "2",
    title: "Tour privado",
    location: "Exclusivo",
    rating: "5.0",
    image: "https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    description: "Explora cada puerto con guía privado y transporte VIP personalizado.",
    price: 250,
    unit: "Invitado",
  },
  {
    id: "3",
    title: "Jet ski",
    location: "Acuático",
    rating: "4.8",
    image: "https://images.pexels.com/photos/18972198/pexels-photo-18972198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Domina las olas con nuestras motos de agua de última generación.",
    price: 120,
    unit: "Invitado",
  },
  {
    id: "4",
    title: "Buceo premium",
    location: "Acuático",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5",
    description: "Descubre arrecifes vibrantes con instructores certificados a tu lado.",
    price: 180,
    unit: "Invitado",
  },
  {
    id: "5",
    title: "Spa y bienestar",
    location: "Bienestar",
    rating: "4.8",
    image: "https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    description: "Relájate con tratamientos premium en nuestro spa de lujo a bordo.",
    price: 0,
    unit: "Invitado",
  },
  {
    id: "6",
    title: "Velero al atardecer",
    location: "Romántico",
    rating: "5.0",
    image: "https://images.unsplash.com/photo-1500514966906-fe245eea9344?auto=format&fit=crop&w=800&q=80",
    description: "Navega al atardecer en velero privado con champán y vistas al horizonte.",
    price: 95,
    unit: "Invitado",
  },
  {
    id: "7",
    title: "Snorkel guiado",
    location: "Acuático",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?w=800&q=80",
    description: "Explora la vida marina con guías expertos en cada puerto de escala.",
    price: 150,
    unit: "Invitado",
  },
  {
    id: "8",
    title: "Kayak",
    location: "Aventura",
    rating: "4.7",
    image: "https://images.pexels.com/photos/1497584/pexels-photo-1497584.jpeg?auto=compress&cs=tinysrgb&w=800&q=80",
    description: "Aventura de kayak entre paisajes costeros únicos en cada destino.",
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
