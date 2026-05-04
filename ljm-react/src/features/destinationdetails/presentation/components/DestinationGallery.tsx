import { GalleryItem } from "./GalleryItem";

interface DestinationGalleryProps {
  photos?: Array<{ url: string; location: string }>;
  titulo?: string;
}

export const DestinationGallery = ({ photos = [], titulo }: DestinationGalleryProps) => {
  return (
    <div className="pt-8 border-t border-white/10">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-sm font-bold tracking-[0.3em] uppercase text-primary">Galeria de Destinos</h3>
        <span className="text-[10px] text-pearl-beige/40 tracking-widest uppercase font-bold border-b border-pearl-beige/10 pb-1">
          {photos.length > 0 ? `${photos.length} fotos` : "Sin portafolio"}
        </span>
      </div>
      {photos.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.03] px-6 py-12 text-center">
          <span className="material-symbols-outlined mb-3 text-5xl text-primary/30">photo_library</span>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-100">Sin fotos del destino</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-gray-300/60">
            La galeria se llenara con imagenes reales del destino seleccionado.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <GalleryItem key={index} src={photo.url} label={photo.location || titulo || ""} />
          ))}
        </div>
      )}
    </div>
  );
};
