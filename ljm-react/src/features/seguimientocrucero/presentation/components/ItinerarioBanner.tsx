import React from 'react';

const ItinerarioBanner: React.FC = () => {
  return (
    <div className="relative rounded-3xl overflow-hidden h-44 group cursor-pointer border border-[#eacea9]/10">
      <img
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s]"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZOffDGU4-pRcSRi7KJBoqI4u7NZGF4T1gk8t3yI13hyedOO8gak5TJGjtWA8RuwkAqVvTrt58DhFIwSy5vGtOoxgAL5-j8lYJjUQxzyJn-eck3CSfY2nTfJ5AmfLF8M0Qtn_Zgk4x9W5Fp3TyBGya59vqw2JB7ddGDL0FdVHB0EPoodeQaLEic2N18qMGiBEUzgsjJGMrUs2k0u0y2MdNhJ-jOM3XNekQZ5nVVWS3XU56d4YWGPshZGRDB1NvU4sGsHT7s8PXGBfr"
        alt="Greek Isles"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0e1a34] via-[#0e1a34]/40 to-transparent flex items-center p-8 md:p-12">
        <div className="space-y-2 max-w-md">
          <h4 className="text-2xl font-extrabold text-white">Descubre las Costas Antiguas</h4>
          <p className="text-slate-300 text-sm font-light">
            Descarga tu guía de viaje digital personalizada para las Islas Griegas.
          </p>
        </div>
        <div className="ml-auto">
          <div className="size-14 rounded-full bg-[#0e1a34]/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#785d32] hover:border-[#785d32] transition-all shadow-xl">
            <span className="material-symbols-outlined">download</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItinerarioBanner;