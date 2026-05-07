// features/payment/presentation/components/PriceBreakdown.tsx
import React from 'react';
import {
  getBookingDraftCharges,
  getBookingDraftChargeLines,
  type BookingDraft,
} from '../../../../lib/bookingDraft';
import type { PaymentMethod } from '../../data/paymentApi';

interface CurrencyOption { codigo: string; nombre: string | null; }

interface PriceBreakdownProps {
  draft: BookingDraft;
  isLoading: boolean;
  isPaying: boolean;
  onPay: () => void;
  paymentError?: string | null;
  selectedMethod?: PaymentMethod | null;
  currencies?: CurrencyOption[];
  selectedCurrency?: string;
  conversionRate?: number;
  onCurrencyChange?: (code: string) => void;
}

const formatCurrency = (value: number, currency = 'USD') => {
  const amount = Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const currencyLabel = currency.toUpperCase() === 'USD' ? 'US$' : currency.toUpperCase();
  return `${amount} ${currencyLabel}`;
};

const PriceBreakdown: React.FC<PriceBreakdownProps> = ({
  draft,
  isLoading,
  isPaying,
  onPay,
  paymentError,
  selectedMethod,
  currencies = [],
  selectedCurrency,
  conversionRate = 1,
  onCurrencyChange,
}) => {
  const baseCurrency = draft.destination?.moneda ?? 'USD';
  const activeCurrency = selectedCurrency ?? baseCurrency;
  const lines = getBookingDraftChargeLines(draft);
  const { total: calculatedTotal } = getBookingDraftCharges(draft);
  const total = lines.reduce((sum, line) => sum + line.value, 0);
  const visibleTotal = Math.max(total, calculatedTotal);
  const convertedTotal = Math.round(visibleTotal * conversionRate);
  const canPay = Boolean(selectedMethod && visibleTotal > 0 && !isLoading && !isPaying);

  return (
    <section className="bg-white rounded-[2rem] p-8 premium-shadow border border-gray-100 flex flex-col">
      <div className="flex items-center gap-3 pb-4">
        <span className="material-symbols-outlined text-maroon-gold">receipt</span>
        <h3 className="text-xs font-bold text-night-blue uppercase tracking-[0.2em]">Desglose de Tarifas</h3>
      </div>

      {/* Currency pills */}
      {currencies.length > 0 && onCurrencyChange && (
        <div className="mb-5 flex flex-wrap justify-center gap-2">
          {currencies.map(c => (
            <button
              key={c.codigo}
              type="button"
              onClick={() => onCurrencyChange(c.codigo)}
              title={c.nombre ?? c.codigo}
              className={`rounded-full px-3 py-1 text-[11px] font-bold tracking-widest transition-all border ${
                activeCurrency === c.codigo
                  ? 'bg-night-blue text-white border-night-blue shadow-sm'
                  : 'bg-transparent text-night-blue/50 border-gray-200 hover:border-night-blue/40 hover:text-night-blue'
              }`}
            >
              {c.codigo}
            </button>
          ))}
        </div>
      )}

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
                  {line.value > 0
                    ? formatCurrency(Math.round(line.value * conversionRate), activeCurrency)
                    : 'Incluido'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 shrink-0 pt-4">
        <div className="mb-5 rounded-2xl bg-night-blue px-6 py-5 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/45">Total a pagar</p>
              <p key={convertedTotal} className="mt-2 break-words text-3xl font-bold leading-tight text-white">
                {formatCurrency(convertedTotal, activeCurrency)}
              </p>
              {conversionRate !== 1 && (
                <p className="mt-1 text-[10px] text-white/40">
                  Base: {formatCurrency(visibleTotal, baseCurrency)} × {conversionRate.toFixed(4)}
                </p>
              )}
            </div>
            {activeCurrency !== baseCurrency && (
              <span className="mt-1 rounded-lg bg-white/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white/70">
                {activeCurrency}
              </span>
            )}
          </div>
          {selectedMethod && (
            <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-white/55">
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
