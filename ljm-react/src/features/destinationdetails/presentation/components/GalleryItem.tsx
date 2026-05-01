// src/features/destinationdetails/presentation/components/GalleryItem.tsx

interface GalleryItemProps {
  src: string;
  label: string;
}

// ✅ IMPORTANTE: El 'export' debe estar aquí para que funcione la importación con { }
export const GalleryItem = ({ src, label }: GalleryItemProps) => {
  return (
    <div className="gallery-card relative h-48 rounded-2xl overflow-hidden shadow-xl border border-white/10 group">
      <img 
        alt={label} 
        className="absolute inset-0 w-full h-full object-cover" 
        src={src} 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
        <span className="text-[10px] font-bold tracking-widest uppercase text-white">
          {label}
        </span>
      </div>
    </div>
  );
};