import React from 'react';

const specs: Array<{ label: string; value: string }> = [];

const ResidenceSpecs: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex aspect-[16/10] items-center justify-center overflow-hidden rounded-xl border border-dashed border-[#0E1A34]/15 bg-white shadow-lg">
        <div className="text-center">
          <span className="material-symbols-outlined mb-3 text-6xl text-[#0E1A34]/15">hotel</span>
          <p className="text-xs font-bold uppercase tracking-widest text-[#0E1A34]/40">Sin alojamiento seleccionado</p>
        </div>
      </div>

      <div className="max-w-xl">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#0E1A34]/40">
          Residencia Principal
        </span>
        <h2 className="text-4xl text-[#0E1A34] mt-3 mb-4" style={{ fontFamily: 'Noto Serif, serif' }}>
          Sin suite asignada
        </h2>
        <p className="text-[#1E2944]/70 font-light leading-relaxed text-lg mb-8">
          Esta seccion se completara cuando la reserva tenga una cabina o alojamiento real seleccionado.
        </p>

        <div className="bg-white/50 p-8 rounded-xl border border-[#0E1A34]/5">
          <h4 className="text-[10px] uppercase tracking-[0.4em] text-[#0E1A34]/40 mb-6">
            Especificaciones del Viaje
          </h4>
          {specs.length === 0 ? (
            <p className="text-sm text-[#0E1A34]/50">Sin especificaciones disponibles.</p>
          ) : (
            <div className="grid grid-cols-2 gap-y-6">
              {specs.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-[#0E1A34]/40 mb-1">
                    {s.label}
                  </span>
                  <span className="text-lg text-[#0E1A34]" style={{ fontFamily: 'Noto Serif, serif' }}>
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResidenceSpecs;
