// features/payment/presentation/pages/PaymentPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../home/presentation/components/Navbar';
import Footer from '../../../home/presentation/components/Footer';
import BackButton from '../../../../components/BackButton';
import PaymentHeader from '../components/PaymentHeader';
import BookingSummary from '../components/BookingSummary';
import PaymentMethodSelector from '../components/PaymentMethodSelector';
import PriceBreakdown from '../components/PriceBreakdown';
import {
  getBookingDraftCharges,
  getBookingDraftChargeLines,
  loadBookingDraft,
  syncBookingDraftWithBackend,
  type BookingDraft,
} from '../../../../lib/bookingDraft';
import { API_BASE_URL } from '../../../../lib/api';
import { paymentApi, type PaymentMethod } from '../../data/paymentApi';

interface CurrencyOption { codigo: string; nombre: string | null; }

const getPaymentTotal = (draft: BookingDraft) => {
  const lineTotal = getBookingDraftChargeLines(draft).reduce((sum, line) => sum + line.value, 0);
  const { total } = getBookingDraftCharges(draft);
  return Math.max(lineTotal, total);
};

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [draft, setDraft] = useState<BookingDraft>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);
  const [showPaymentConfirm, setShowPaymentConfirm] = useState(false);
  const [showPaymentCheck, setShowPaymentCheck] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  /* ── Currency ── */
  const [currencies, setCurrencies] = useState<CurrencyOption[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [conversionRate, setConversionRate] = useState(1);

  useEffect(() => {
    let mounted = true;

    loadBookingDraft()
      .then((bookingDraft) => {
        console.log('[Pago] Draft cargado en PaymentPage', bookingDraft);
        if (mounted) {
          setDraft(bookingDraft);
        }
      })
      .catch((error) => {
        console.error('[Pago] ERROR cargando draft en PaymentPage', error);
      })
      .finally(() => {
        if (mounted) {
          setIsLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const FALLBACK_CURRENCIES: CurrencyOption[] = [
    { codigo: 'USD', nombre: 'Dólar estadounidense' },
    { codigo: 'EUR', nombre: 'Euro' },
    { codigo: 'GBP', nombre: 'Libra esterlina' },
    { codigo: 'AUD', nombre: 'Dólar australiano' },
    { codigo: 'JPY', nombre: 'Yen japonés' },
    { codigo: 'DOP', nombre: 'Peso Dominicano' },
  ];

  /* ── Fetch currencies from DB ── */
  useEffect(() => {
    const baseCurrency = draft.destination?.moneda ?? 'USD';
    setSelectedCurrency(baseCurrency);
    setConversionRate(1);

    fetch(`${API_BASE_URL}/monedas`)
      .then(r => r.json())
      .then(j => {
        if (j.ok && Array.isArray(j.data) && j.data.length >= 2) {
          setCurrencies(j.data);
        } else {
          // DB has 0 or 1 currencies — use common fallback
          setCurrencies(FALLBACK_CURRENCIES);
        }
      })
      .catch(() => setCurrencies(FALLBACK_CURRENCIES));
  }, [draft.destination?.moneda]);

  const handleCurrencyChange = async (newCode: string) => {
    setSelectedCurrency(newCode);
    const base = draft.destination?.moneda ?? 'USD';
    if (newCode === base) { setConversionRate(1); return; }
    try {
      const res = await fetch(`https://open.er-api.com/v6/latest/${base}`);
      const data = await res.json();
      setConversionRate(Number(data?.rates?.[newCode]) || 1);
    } catch {
      setConversionRate(1);
    }
  };

  const handlePay = async () => {
    if (!selectedMethod || isPaying) return;

    const amount = getPaymentTotal(draft);
    console.log('[Pago] Click en pagar', { selectedMethod, amount, draft });

    if (amount <= 0) {
      console.error('[Pago] ERROR total <= 0 antes de abrir confirmacion', { amount, draft });
      setPaymentError('No se pudo calcular el total de la reserva. Vuelve a seleccionar el destino, suite o experiencias.');
      return;
    }

    setPaymentError(null);
    setShowPaymentConfirm(true);
  };

  const confirmPayment = async () => {
    if (!selectedMethod || isPaying) return;

    setIsPaying(true);
    setPaymentError(null);

    try {
      console.log('[Pago] Confirmando pago: inicio', { selectedMethod, draft });
      const payableDraft = await syncBookingDraftWithBackend(draft);
      console.log('[Pago] Draft listo para pago', payableDraft);
      const amount = getPaymentTotal(payableDraft);
      const currency = payableDraft.destination?.moneda ?? 'USD';
      console.log('[Pago] Datos finales antes de crear pago', { reservationId: payableDraft.reservationId, amount, currency });

      if (!payableDraft.reservationId) {
        console.error('[Pago] ERROR sin reservationId despues de sincronizar', payableDraft);
        throw new Error('No se pudo sincronizar la reserva con el backend. Revisa que tu sesion siga activa y que el servidor este encendido.');
      }

      if (amount <= 0) {
        console.error('[Pago] ERROR total <= 0 despues de sincronizar', { amount, payableDraft });
        throw new Error('No se pudo calcular el total de la reserva. Vuelve a seleccionar el destino, suite o experiencias.');
      }

      setDraft(payableDraft);

      const paymentResponse = await paymentApi.create({
        reservationId: payableDraft.reservationId,
        bookingDraft: payableDraft,
        method: selectedMethod,
        amount: Math.round(amount * conversionRate),
        currency: selectedCurrency,
      });
      console.log('[Pago] Backend respondio pago creado', paymentResponse);
      const payment = {
        ...paymentResponse.data,
        reservationId: paymentResponse.data.reservationId ?? payableDraft.reservationId,
      };
      const confirmationState = {
        bookingDraft: payableDraft,
        payment,
      };

      sessionStorage.setItem('ljm_booking_confirmation', JSON.stringify(confirmationState));
      console.log('[Pago] Confirmacion guardada en sessionStorage', confirmationState);
      setShowPaymentCheck(true);
      window.setTimeout(() => {
        navigate('/booking-confirmation', { state: confirmationState });
      }, 900);
    } catch (error) {
      console.error('[Pago] ERROR confirmando pago', error);
      setShowPaymentConfirm(false);
      setShowPaymentCheck(false);
      setPaymentError(error instanceof Error ? error.message : 'No se pudo procesar el pago.');
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <div className="bg-off-white font-sans text-night-blue antialiased min-h-screen flex flex-col">
      <Navbar />
      <BackButton />

      <PaymentHeader />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 -mt-8 pb-10 relative z-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <BookingSummary draft={draft} isLoading={isLoading} />
              <PaymentMethodSelector onSelect={setSelectedMethod} />
            </div>

            <div className="lg:col-span-5">
              <PriceBreakdown
                draft={draft}
                isLoading={isLoading}
                isPaying={isPaying}
                onPay={handlePay}
                paymentError={paymentError}
                selectedMethod={selectedMethod}
                currencies={currencies}
                selectedCurrency={selectedCurrency}
                conversionRate={conversionRate}
                onCurrencyChange={handleCurrencyChange}
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {showPaymentConfirm && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[#06122c]/70 px-4 backdrop-blur-md">
          <div className="w-full max-w-[440px] rounded-[2rem] bg-[#0e1a34] p-8 text-center text-white shadow-[0_30px_100px_rgba(0,0,0,0.45)]">
            {showPaymentCheck ? (
              <div className="py-8">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-[#c8a96e]/45 bg-[#c8a96e]/15">
                  <span className="material-symbols-outlined text-4xl text-[#c8a96e]">check</span>
                </div>
                <h3 className="text-2xl font-display font-bold">Pago confirmado</h3>
                <p className="mt-3 text-sm text-white/55">Preparando tu confirmación de reserva.</p>
              </div>
            ) : (
              <>
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#c8a96e]">Confirmar pago</p>
                <h3 className="mt-4 text-3xl font-display font-bold">Verifica tu reserva</h3>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-white/55">
                  Metodo: {selectedMethod.name}{selectedMethod.last4 ? ` **** ${selectedMethod.last4}` : ''}
                </p>

                <div className="my-7 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/35">Total a pagar</p>
                  <p className="mt-2 text-4xl font-black text-[#c8a96e]">
                    {new Intl.NumberFormat('es-ES', {
                      style: 'currency',
                      currency: selectedCurrency,
                      maximumFractionDigits: 0,
                    }).format(Math.round(getPaymentTotal(draft) * conversionRate))}
                  </p>
                </div>

                {paymentError && (
                  <div className="mb-4 rounded-xl border border-red-300/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                    {paymentError}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    disabled={isPaying}
                    onClick={() => setShowPaymentConfirm(false)}
                    className="h-12 rounded-xl border border-white/15 bg-white/5 text-xs font-bold uppercase tracking-[0.2em] text-white/70 transition hover:bg-white/10 disabled:opacity-60"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    disabled={isPaying}
                    onClick={confirmPayment}
                    className="h-12 rounded-xl bg-[#c8a96e] text-xs font-bold uppercase tracking-[0.2em] text-[#0e1a34] transition hover:brightness-110 disabled:opacity-70"
                  >
                    {isPaying ? 'Procesando' : 'Confirmar'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
