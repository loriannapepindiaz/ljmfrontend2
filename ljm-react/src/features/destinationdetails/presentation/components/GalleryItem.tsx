// src/features/destinationdetails/presentation/components/GalleryItem.tsx
import { useState } from "react";

interface GalleryItemProps {
  src: string;
  label: string;
}

export const GalleryItem = ({ src, label }: GalleryItemProps) => {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <div className="gallery-card relative h-48 rounded-2xl overflow-hidden shadow-xl border border-white/10 group">
      <img
        alt={label}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        src={src}
        onError={() => setFailed(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
        <span className="text-[10px] font-bold tracking-widest uppercase text-white">
          {label}
        </span>
      </div>
    </div>
  );
};