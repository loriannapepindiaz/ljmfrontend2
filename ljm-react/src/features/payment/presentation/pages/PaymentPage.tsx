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
import { getBookingDraftCharges, loadBookingDraft, syncBookingDraftWithBackend, type BookingDraft } from '../../../../lib/bookingDraft';
import { paymentApi, type PaymentMethod } from '../../data/paymentApi';

const getPaymentTotal = (draft: BookingDraft) => {
  return getBookingDraftCharges(draft).total;
};

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [draft, setDraft] = useState<BookingDraft>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    loadBookingDraft()
      .then((bookingDraft) => {
        if (mounted) {
          setDraft(bookingDraft);
        }
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

  const handlePay = async () => {
    if (!selectedMethod || isPaying) return;

    const amount = getPaymentTotal(draft);
    const currency = draft.destination?.moneda ?? 'USD';

    setIsPaying(true);
    setPaymentError(null);

    try {
      const payableDraft = draft.reservationId ? draft : await syncBookingDraftWithBackend(draft);

      if (!payableDraft.reservationId) {
        throw new Error('No se pudo sincronizar la reserva con el backend. Revisa que tu sesion siga activa y que el servidor este encendido.');
      }

      setDraft(payableDraft);

      const paymentResponse = await paymentApi.create({
        reservationId: payableDraft.reservationId,
        bookingDraft: payableDraft,
        method: selectedMethod,
        amount,
        currency,
      });
      const confirmationState = {
        bookingDraft: payableDraft,
        payment: paymentResponse.data,
      };

      sessionStorage.setItem('ljm_booking_confirmation', JSON.stringify(confirmationState));
      navigate('/booking-confirmation', { state: confirmationState });
    } catch (error) {
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
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentPage;
