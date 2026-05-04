import React from 'react';
import type { BookingDestinationDraft, BookingSuiteDraft } from '../../../../lib/bookingDraft';

type Props = {
  destination?: BookingDestinationDraft;
  suite?: BookingSuiteDraft;
};

const ResidenceSpecs: React.FC<Props> = ({ destination, suite }) => {
  const specs = [
    { label: 'Alojamiento', value: suite?.title },
    { label: 'Tamaño', value: suite?.size },
    { label: 'Capacidad', value: suite?.capacity },
    { label: 'Destino', value: destination?.titulo },
    { label: 'Puerto', value: destination?.puerto_principal },
    { label: 'Duración', value: destination?.duracion_tipica },
  ].filter((spec): spec is { label: string; value: string } => Boolean(spec.value));

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
        <div className="flex aspect-[16/10] items-center justify-center overflow-hidden rounded-xl border border-[#0E1A34]/10 bg-white shadow-lg lg:min-h-[330px]">
          {suite?.imageUrl ? (
            <img alt={suite.title} className="h-full w-full object-cover" src={suite.imageUrl} />
          ) : (
            <div className="text-center">
              <span className="material-symbols-outlined mb-3 text-6xl text-[#0E1A34]/15">hotel</span>
              <p className="text-xs font-bold uppercase tracking-widest text-[#0E1A34]/40">Alojamiento por confirmar</p>
            </div>
          )}
        </div>

        <div className="max-w-xl rounded-2xl bg-[#F6F7F8]/85 p-6 shadow-[0_18px_55px_rgba(30,41,68,0.08)] backdrop-blur-sm">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#0E1A34]/40">
            Residencia Principal
          </span>
          <h2 className="mt-3 text-4xl text-[#0E1A34]" style={{ fontFamily: 'Noto Serif, serif' }}>
            {suite?.title ?? 'Alojamiento en preparación'}
          </h2>
          <p className="mt-4 text-base font-light leading-relaxed text-[#1E2944]/70 lg:text-lg">
            {suite?.description ??
              destination?.descripcion ??
              'Aquí reuniremos el alojamiento elegido y los detalles principales de tu viaje.'}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-[#0E1A34]/5 bg-white/50 p-8">
        <h4 className="mb-6 text-[10px] uppercase tracking-[0.4em] text-[#0E1A34]/40">
          Especificaciones del Viaje
        </h4>
        {specs.length === 0 ? (
          <p className="text-sm text-[#0E1A34]/50">Las especificaciones aparecerán al completar destino y alojamiento.</p>
        ) : (
          <div className="grid grid-cols-2 gap-y-6 md:grid-cols-3">
            {specs.map((s) => (
              <div key={s.label} className="flex flex-col">
                <span className="mb-1 text-[10px] uppercase tracking-widest text-[#0E1A34]/40">
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
  );
};

export default ResidenceSpecs;
