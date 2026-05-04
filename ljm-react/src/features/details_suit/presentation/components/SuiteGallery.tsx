// features/details_suit/presentation/components/SuiteGallery.tsx
import React from 'react';
import type { BookingSuiteDraft } from '../../../../lib/bookingDraft';

interface SuiteGalleryProps {
  suite?: BookingSuiteDraft;
}

const fallbackImage =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAHxylJt4f5vQ_N2r1_fFbVqVfp903rT47e-taf9PAFX89GnlkgkVtQmZdEIahrL8zHniqRlBbP0KBk3xZ72kP6RgUH8_vkLs_KAAyNxx-zrDRDqbn7ClL-WqlPuuytkp8vC-cTTAPQMwBs11BPaNRqwhCG2UcR3V44jZ96p_XDNASsE6f9UeCzN3E0A-mJk_dUQcCw8nV7bLV47vf5vNcEQldhk0JBkze9lwmutS_Y8yvSvpjqZcIVWB565kI-Tbdo3EmK0dk7wJo';

const SuiteGallery: React.FC<SuiteGalleryProps> = ({ suite }) => {
  const gallery = suite?.gallery?.length ? suite.gallery : [fallbackImage];
  const amenities = suite?.amenities?.length ? suite.amenities.slice(0, 2) : ['Wi-Fi Ultra Rapido', 'Minibar Premium'];

  return (
    <div className="space-y-4">
      <div className="gallery-main w-full rounded-3xl overflow-hidden shadow-2xl relative">
        <img
          alt={suite ? suite.title : 'Dormitorio elegante de crucero de lujo'}
          className="w-full h-full object-cover"
          src={gallery[0]}
        />
        <div className="absolute top-6 left-6 flex flex-row gap-3">
          <div className="pill-tag flex items-center gap-2 px-5 py-2.5 rounded-full shadow-lg bg-night-blue border border-pearl-beige/20">
            <span className="material-symbols-outlined text-sm text-pearl-beige">square_foot</span>
            <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-pearl-beige">
              {suite?.size || '79 m2'}
            </span>
          </div>
          <div className="pill-tag flex items-center gap-2 px-5 py-2.5 rounded-full shadow-lg bg-night-blue border border-pearl-beige/20">
            <span className="material-symbols-outlined text-sm text-pearl-beige">deck</span>
            <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-pearl-beige">
              {suite?.feature || 'Terraza privada'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {gallery.slice(0, 3).map((image, index) => (
          <div className="aspect-video rounded-2xl overflow-hidden shadow-sm border border-gray-100" key={`${image}-${index}`}>
            <img
              alt={`${suite?.title || 'Suite'} vista ${index + 1}`}
              className="w-full h-full object-cover"
              src={image}
            />
          </div>
        ))}
      </div>

      <div className="flex gap-4 pt-4">
        {amenities.map((amenity) => (
          <button
            className="flex-1 flex items-center justify-center gap-4 bg-night-blue text-white py-5 rounded-full shadow-xl hover:bg-night-blue/90 transition-all border border-pearl-beige/20 group"
            key={amenity}
          >
            <span className="material-symbols-outlined text-pearl-beige group-hover:scale-110 transition-transform">
              room_service
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-pearl-beige">{amenity}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuiteGallery;
