import React from 'react';
import { parseCurrencyAmount, type BookingDraft } from '../../../../lib/bookingDraft';

type Props = {
  draft: BookingDraft;
};

const formatCurrency = (value: number, currency = 'USD') =>
  new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value);

const FinancialStatement: React.FC<Props> = ({ draft }) => {
  const suitePrice = parseCurrencyAmount(draft.suite?.pricePerNight);
  const companionCount = draft.companions?.length ?? 0;
  const activeServices = draft.personalization?.services?.filter((service) => service.active) ?? [];
  const lines = [
    draft.destination
      ? {
          label: `Destino: ${draft.destination.titulo}`,
          value: parseCurrencyAmount(draft.destination.precio_desde),
        }
      : null,
    draft.suite
      ? {
          label: `Alojamiento: ${draft.suite.title}`,
          value: suitePrice,
        }
      : null,
    companionCount
      ? {
          label: `Acompañantes registrados (${companionCount})`,
          value: 0,
        }
      : null,
    ...activeServices.map((service) => ({
      label: service.label,
      value: 0,
    })),
  ].filter((line): line is { label: string; value: number } => Boolean(line));

  const total = lines.reduce((sum, line) => sum + line.value, 0);
  const currency = draft.destination?.moneda ?? 'USD';

  return (
    <section className="max-w-4xl mx-auto">
      <div className="bg-white p-12 md:p-20 shadow-xl border-t-8 border-[#0E1A34] rounded-b-xl">
        <div className="flex justify-between items-start mb-16">
          <div>
            <h2 className="text-4xl text-[#0E1A34] mb-3" style={{ fontFamily: 'Noto Serif, serif' }}>
              Inversión Total de la Expedición
            </h2>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#0E1A34]/40">
              Estado Financiero
            </span>
          </div>
          <span className="material-symbols-outlined text-4xl text-[#0E1A34]/10">payments</span>
        </div>

        {lines.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#0E1A34]/15 bg-[#0E1A34]/[0.02] px-6 py-12 text-center">
            <span className="material-symbols-outlined mb-4 text-4xl text-[#0E1A34]/20">receipt_long</span>
            <p className="text-sm uppercase tracking-[0.3em] text-[#0E1A34]/45">Sin datos financieros</p>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#0E1A34]/55">
              El desglose aparecerá cuando exista una reserva, alojamiento o servicio real asociado a esta expedición.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {lines.map((line) => (
              <div key={line.label} className="flex items-center justify-between border-b border-[#0E1A34]/10 py-4">
                <span className="text-sm uppercase tracking-[0.18em] text-[#0E1A34]/55">{line.label}</span>
                <span className="text-lg text-[#0E1A34]" style={{ fontFamily: 'Noto Serif, serif' }}>
                  {line.value > 0 ? formatCurrency(line.value, currency) : 'Incluido'}
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between pt-8">
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#0E1A34]/45">Total estimado</span>
              <span className="text-4xl text-[#0E1A34]" style={{ fontFamily: 'Noto Serif, serif' }}>
                {formatCurrency(total, currency)}
              </span>
            </div>
          </div>
        )}

        <div className="mt-20 pt-10 border-t border-[#0E1A34]/5">
          <p className="max-w-xs text-[9px] uppercase tracking-[0.2em] text-[#0E1A34]/50 leading-loose">
            Este documento se genera con los cargos reales de la reserva activa.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinancialStatement;
