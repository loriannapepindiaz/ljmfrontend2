import { GalleryItem } from "./GalleryItem"; // ✅ Con llaves

export const DestinationGallery = () => {
  const photos = [
    { url: "/fotos/spa.jpg", location: "Oia, Santorini" },
    { url: "/fotos/michelin.jpg", location: "Milos Shores" },
    { url: "/fotos/vista.jpeg", location: "Mykonos Town" },
    { url: "/fotos/Pen.jpg", location: "Private Terrace" },
  ];

  return (
    <div className="pt-8 border-t border-white/10">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-sm font-bold tracking-[0.3em] uppercase text-primary">Destination Gallery</h3>
        <a className="text-[10px] text-pearl-beige/60 hover:text-primary transition-colors tracking-widest uppercase font-bold border-b border-pearl-beige/20 pb-1" href="#">View Full Portfolio</a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {photos.map((photo, index) => (
          <GalleryItem key={index} src={photo.url} label={photo.location} />
        ))}
      </div>
    </div>
  );
};