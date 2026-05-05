// features/payment/presentation/components/PriceBreakdown.tsx
import React from 'react';
import { getBookingDraftCharges, parseCurrencyAmount, type BookingDraft } from '../../../../lib/bookingDraft';
import type { PaymentMethod } from '../../data/paymentApi';

interface PriceBreakdownProps {
  draft: BookingDraft;
  isLoading: boolean;
  isPaying: boolean;
  onPay: () => void;
  paymentError?: string | null;
  selectedMethod?: PaymentMethod | null;
}

const formatCurrency = (value: number, currency = 'USD') =>
  new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value);

const PriceBreakdown: React.FC<PriceBreakdownProps> = ({
  draft,
  isLoading,
  isPaying,
  onPay,
  paymentError,
  selectedMethod,
}) => {
  const currency = draft.destination?.moneda ?? draft.moneda ?? 'USD';
  const { destinationPrice, serviceFee, suitePrice, total } = getBookingDraftCharges(draft);
  const activities = draft.activities ?? [];
  const companionCount = draft.companions?.length ?? 0;
  const activeServices = draft.personalization?.services.filter((service) => service.active) ?? [];
  const lines = [
    draft.destination ? { label: `Destino: ${draft.destination.titulo}`, value: destinationPrice } : null,
    draft.suite ? { label: `Suite: ${draft.suite.title}`, value: suitePrice } : null,
    ...activities.map((activity) => ({ label: activity.nombre, value: parseCurrencyAmount(activity.precio_base) })),
    companionCount ? { label: `Acompanantes registrados (${companionCount})`, value: 0 } : null,
    ...activeServices.map((service) => ({ label: service.label, value: 0 })),
    serviceFee ? { label: 'Gestion y procesamiento', value: serviceFee } : null,
  ].filter((line): line is { label: string; value: number } => Boolean(line));
  const lineTotal = lines.reduce((sum, line) => sum + (Number(line.value) || 0), 0);
  const visibleTotal = lineTotal > 0 ? lineTotal : (total > 0 ? total : parseCurrencyAmount(draft.monto_total));
  const canPay = Boolean(selectedMethod && visibleTotal > 0 && !isLoading && !isPaying);

  return (
    <section className="bg-white rounded-[2rem] p-8 premium-shadow border border-gray-100 flex flex-col">
      <div className="flex items-center gap-3 pb-6">
        <span className="material-symbols-outlined text-maroon-gold">receipt</span>
        <h3 className="text-xs font-bold text-night-blue uppercase tracking-[0.2em]">Desglose de Tarifas</h3>
      </div>

      <div className="min-h-0 flex-1">
        {isLoading ? (
          <div className="flex items-center justify-center rounded-2xl bg-off-white/50 px-6 py-16">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-night-blue/15 border-t-maroon-gold" />
          </div>
        ) : lines.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-off-white/50 px-6 py-12 text-center">
            <span className="material-symbols-outlined mb-3 text-5xl text-gray-300">receipt_long</span>
            <p className="text-sm font-bold uppercase tracking-widest text-night-blue">Sin cargos disponibles</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              Los cargos se calcularan con los datos reales de la reserva, alojamiento y servicios elegidos.
            </p>
          </div>
        ) : (
          <div className="payment-scroll max-h-[520px] space-y-3 overflow-y-auto pr-3">
            {lines.map((line) => (
              <div key={line.label} className="flex items-start justify-between gap-6 border-b border-gray-100 py-4">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-night-blue/55">{line.label}</span>
                <span className="shrink-0 text-sm font-bold text-night-blue">
                  {line.value > 0 ? formatCurrency(line.value, currency) : 'Incluido'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 shrink-0 border-t-2 border-gray-100 pt-7">
        <div className="mb-5 rounded-2xl bg-night-blue px-6 py-5 text-white">
          <div className="flex items-center justify-between gap-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/45">Total</span>
            <span className="min-w-0 break-words text-right text-xl font-bold leading-tight md:text-3xl">
              {formatCurrency(visibleTotal, currency)}
            </span>
          </div>
          {selectedMethod && (
            <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-white/50">
              Metodo: {selectedMethod.name}{selectedMethod.last4 ? ` **** ${selectedMethod.last4}` : ''}
            </p>
          )}
        </div>

        {paymentError && (
          <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
            {paymentError}
          </div>
        )}

        <button
          className={`w-full py-5 rounded-2xl text-base font-bold uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-4 ${
            canPay
              ? 'bg-maroon-gold text-white hover:bg-night-blue active:scale-[0.99]'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
          disabled={!canPay}
          onClick={onPay}
        >
          {isPaying ? 'Guardando pago...' : 'Realizar pago'}
          <span className="material-symbols-outlined">{canPay ? 'lock_open' : 'lock'}</span>
        </button>
      </div>
    </section>
  );
};

export default PriceBreakdown;
