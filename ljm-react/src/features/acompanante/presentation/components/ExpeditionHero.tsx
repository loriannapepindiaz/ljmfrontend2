import React from 'react';
import type { BookingDraft } from '../../../../lib/bookingDraft';

type Props = {
  draft: BookingDraft;
  isLoading: boolean;
};

const ExpeditionHero: React.FC<Props> = ({ draft }) => {
  const destination = draft.destination;
  const suite = draft.suite;
  const hasDraft = Boolean(destination || suite || draft.companions?.length || draft.personalization);
  const title =
    destination?.titulo ??
    destination?.ubicacion ??
    destination?.pais ??
    suite?.title ??
    'Expedición en preparación';
  const subtitle = destination?.pais ?? destination?.ubicacion ?? '';
  const description =
    destination?.descripcion ??
    suite?.description ??
    (hasDraft
        ? 'Tu selección ya está reunida en este resumen. Puedes revisarla antes de continuar con actividades y pago.'
        : 'Empieza seleccionando destino, alojamiento y preferencias para preparar tu expedición.');

  return (
    <section className="mb-24">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-[#0E1A34]" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#0E1A34]/60">
              Expedición actual
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl text-[#0E1A34] leading-tight mb-8 -tracking-[0.02em]"
            style={{ fontFamily: 'Noto Serif, serif' }}>
            {title}
            {subtitle && (
              <>
                <br />
                <span className="mt-3 inline-block text-4xl italic font-normal text-[#9a7a42] md:text-5xl">
                  {subtitle}
                </span>
              </>
            )}
          </h1>

          <div className="max-w-xl border-l border-[#0E1A34]/10 pl-8">
            <h3 className="text-lg italic text-[#0E1A34]/80 mb-4"
              style={{ fontFamily: 'Noto Serif, serif' }}>
              {suite?.title ?? (destination ? 'Reserva en preparación' : 'Resumen de reserva')}
            </h3>
            <p className="text-[#1E2944]/80 leading-relaxed font-light text-lg">
              {description}
            </p>
          </div>
        </div>

        <div className="md:col-span-5 flex justify-center">
          <div className="flex h-[400px] w-[400px] items-center justify-center overflow-hidden rounded-full bg-[#0E1A34]/5 shadow-inner">
            {destination?.imagen_url || suite?.imageUrl ? (
              <img
                alt={destination?.titulo ?? suite?.title ?? 'Expedición seleccionada'}
                className="h-full w-full object-cover"
                src={destination?.imagen_url ?? suite?.imageUrl}
              />
            ) : (
              <span className="material-symbols-outlined text-7xl text-[#0E1A34]/15">sailing</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpeditionHero;
