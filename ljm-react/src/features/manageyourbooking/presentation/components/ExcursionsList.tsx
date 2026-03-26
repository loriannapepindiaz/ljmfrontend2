import React from 'react';
import ExcursionCard from './ExcursionCard';

const excursiones = [
  {
    imagen: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTE5sjPeTwikbzNnIUnFLZCn3DpRfconZUQ4EY10TnJEjyPYpm15aWyUfHJ5DTKQrOYTb65phw1c8AisRGbePpIL49mT9P2emeYGzy5BEYPVAWrWULLDtZujUgyofM1cnLDq-VlhOYlbQJVQqb5fjNTBj6QilPQh4d3v3bxyrFmHDNZJgQXtImCWjGrBYBWlteuaAFWn_xv9JqVHsUZXusUI8pbg9-cW1690kOhqjHLgLTBTbB54ooNvMqVzEF-YOO_OLZnp-zdZoy',
    nombre: 'Cinque Terre — Yate Privado',
    fecha: 'Oct 15',
    puerto: 'La Spezia',
    estado: 'Confirmado',
  },
  {
    imagen: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpq-n1XQ8fh9001PkPc50lh71MLaWhuoxJkKdbT7N6HkMAshGAawvNeoECwZ_J74kVZGxS2wTV-v2981FfM1_YwB8av68hGkGSdOa4Jj9RAMtdNpAoggyX0pha3qF11HFsusiFI0VFqun1y9rEEREhJizE6pzCEu0lagARtibju6j5NWt6ELCQXZLwpXsVaBqOfDZDCfZezl26HYJSsb_ANiV9yMlTflDSk_kNUfJs74e2nCF25bcwydQcixH-uXV9s2F-b9x7OKj4',
    nombre: 'Roma Eterna: Acceso VIP',
    fecha: 'Oct 18',
    puerto: 'Civitavecchia',
    estado: 'Confirmado',
  },
];

const ExcursionsList: React.FC = () => {
  return (
    <div
      className="rounded-xl p-6"
      style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(16px)', border: '1px solid rgba(234,230,169,0.1)' }}
    >
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-xl font-bold flex items-center gap-3 text-white">
          <span className="material-symbols-outlined text-[#eacea9]">explore</span>
          Excursiones
        </h4>
      </div>
      <div className="space-y-4 mb-6">
        {excursiones.map((e) => (
          <ExcursionCard key={e.nombre} {...e} />
        ))}
      </div>
      <button className="w-full py-3 rounded-lg border border-[#eacea9]/30 text-[#eacea9] text-xs font-bold hover:bg-[#eacea9]/10 transition-all uppercase tracking-widest">
        Añadir Más Excursiones
      </button>
    </div>
  );
};

export default ExcursionsList;