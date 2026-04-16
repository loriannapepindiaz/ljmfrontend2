import React from 'react';

const specs = [
  { label: 'Duración',       value: '14 Días'    },
  { label: 'Distancia',      value: '450 NM'     },
  { label: 'Vel. Máxima',    value: '22 Nudos'   },
  { label: 'Calado',         value: '4.2 Metros' },
];

const ResidenceSpecs: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="aspect-[16/10] overflow-hidden rounded-xl grayscale hover:grayscale-0 transition-all duration-700 shadow-lg">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzA190uEm4ZBZnIOg2FJ9sZOET4IElMbmmadfQgYufG_V2x5nebL8YVFffK2O2QpNiff4VH7bhU6-ONGFyHqnLyvb4o8hdoujseyMBoQAfunlI0sy-cBiycfxJzQnfp8sJtlOgjEf90w2G2Ox-qN6mraOOkRV5vuv3Y5lury6Qap_S0kaurYVGDgaCnzZFodPBnLQSqK1Zg2291PXGr7LY60ugkrLphpUK97M8QrPjZFpX-oTayhDwV7zqGHoVVGlt3MDFWdnxsJI0"
          alt="Suite Imperial Atlantis"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-xl">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#0E1A34]/40">
          Residencia Principal
        </span>
        <h2 className="text-4xl text-[#0E1A34] mt-3 mb-4"
          style={{ fontFamily: 'Noto Serif, serif' }}>
          Imperial Atlantis Suite
        </h2>
        <p className="text-[#1E2944]/70 font-light leading-relaxed text-lg mb-8">
          Posicionada en la proa del barco, la Imperial Atlantis ofrece un panorama de 270° del horizonte. Incluye acabados de nogal a medida y acceso a terraza privada.
        </p>

        <div className="bg-white/50 p-8 rounded-xl border border-[#0E1A34]/5">
          <h4 className="text-[10px] uppercase tracking-[0.4em] text-[#0E1A34]/40 mb-6">
            Especificaciones del Viaje
          </h4>
          <div className="grid grid-cols-2 gap-y-6">
            {specs.map((s) => (
              <div key={s.label} className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-[#0E1A34]/40 mb-1">
                  {s.label}
                </span>
                <span className="text-lg text-[#0E1A34]"
                  style={{ fontFamily: 'Noto Serif, serif' }}>
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidenceSpecs;