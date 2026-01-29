// features/details_suit/presentation/components/SuiteGallery.tsx
import React from 'react';

const SuiteGallery: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* Galería principal */}
      <div className="gallery-main w-full rounded-3xl overflow-hidden shadow-2xl relative">
        <img
          alt="Dormitorio elegante de crucero de lujo con grandes ventanales al océano"
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHxylJt4f5vQ_N2r1_fFbVqVfp903rT47e-taf9PAFX89GnlkgkVtQmZdEIahrL8zHniqRlBbP0KBk3xZ72kP6RgUH8_vkLs_KAAyNxx-zrDRDqbn7ClL-WqlPuuytkp8vC-cTTAPQMwBs11BPaNRqwhCG2UcR3V44jZ96p_XDNASsE6f9UeCzN3E0A-mJk_dUQcCw8nV7bLV47vf5vNcEQldhk0JBkze9lwmutS_Y8yvSvpjqZcIVWB565kI-Tbdo3EmK0dk7wJo"
        />
        <div className="absolute top-6 left-6 flex flex-row gap-3">
          <div className="pill-tag flex items-center gap-2 px-5 py-2.5 rounded-full shadow-lg bg-night-blue border border-pearl-beige/20">
            <span className="material-symbols-outlined text-sm text-pearl-beige">square_foot</span>
            <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-pearl-beige">850 SQ FT</span>
          </div>
          <div className="pill-tag flex items-center gap-2 px-5 py-2.5 rounded-full shadow-lg bg-night-blue border border-pearl-beige/20">
            <span className="material-symbols-outlined text-sm text-pearl-beige">deck</span>
            <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-pearl-beige">TERRAZA PRIVADA</span>
          </div>
        </div>
      </div>

      {/* Miniaturas */}
      <div className="grid grid-cols-3 gap-4">
        <div className="aspect-video rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <img
            alt="Baño de mármol de alta gama"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwcwNyknzFc3ngICs4utBYQd-G0h94DEjQ-3fVvYOJKiaR-37qufg_KxTAy6i48wYtwXbHVmYUIkOjnf_bd-WqSgcHFZzVicZNf_sK3Vddtj__uajUQSAGatCdxYpEQwMEMdI_Y-t3bM02BS-4x7PJR2bdrFU910x-k4xS1RymSxFZap2bLVdE-ypPZVp2DbEKy6EAPatfMePd1TLT8yjQvKxcXdt8c31nLeKvsZBPbmqrviqM94pIzkiE6FFMhiEinLuh4LS7unQ"
          />
        </div>
        <div className="aspect-video rounded-2xl overflow-hidden opacity-90 hover:opacity-100 transition-opacity cursor-pointer shadow-sm border border-gray-100">
          <img
            alt="Terraza privada de crucero de lujo"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSGpCpOKFRa5Go6s9cNjv_JYB1Z5ERvRJX_16ULaEOAu-xqvLXPmnlmKGpuBt1ZZGWoVO2zygIsSvmPlQ1ZdNfYhPEQ5JBB_PotRbj2_-nhDjATPBbaOeLf1Z_qVzj3-a6FhN7yQXE1mT_kjNy8kcSMOzkDpuCBBx6GotALfy2QzPXFJ70Byjc-mRX63X8Z-jHOPhL9dBXWcsZr2LWerEHG4Hm4PjC0vycK6c-PbgWJQu5ZG3lyEsEGw6ODj_zHpH11MdjTT46ydc"
          />
        </div>
        <div className="aspect-video rounded-2xl overflow-hidden opacity-90 hover:opacity-100 transition-opacity cursor-pointer shadow-sm border border-gray-100">
          <img
            alt="Detalle del salón de la suite real"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWiliVfYoSDZrXBTqRBg4yzSnCH0sy5aCNBBTyuKVwpoF4S-FiOpjDXedUxHtotRPfHm0k4DcLO-iS620n4ia3SS_H1YwnBOh6vOi5wySUwv5QUbPqiAWq4YMq0zeq9Ih1F-oZZUZr6RJGwBG9TrzqW6PRyl-5x3eMlP3F46GZqVkek7FlEYMjonNKXLEbtjqDyCOfjQjUlM-JBlX-QMba0UtNrV9K_1btFsJAffUBCDBzWT0OyvbXwy-weFUTMtucs_oZIk4umLE"
          />
        </div>
      </div>

      {/* Botones de highlights */}
      <div className="flex gap-4 pt-4">
        <button className="flex-1 flex items-center justify-center gap-4 bg-night-blue text-white py-5 rounded-full shadow-xl hover:bg-night-blue/90 transition-all border border-pearl-beige/20 group">
          <span className="material-symbols-outlined text-pearl-beige group-hover:scale-110 transition-transform">wifi_password</span>
          <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-pearl-beige">Wi-Fi Ultra Rápido</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-4 bg-night-blue text-white py-5 rounded-full shadow-xl hover:bg-night-blue/90 transition-all border border-pearl-beige/20 group">
          <span className="material-symbols-outlined text-pearl-beige group-hover:scale-110 transition-transform">wine_bar</span>
          <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-pearl-beige">Minibar Premium</span>
        </button>
      </div>
    </div>
  );
};

export default SuiteGallery;