// features/payment/presentation/pages/PaymentPage.tsx
import React from 'react';
import PaymentHeader from '../components/PaymentHeader';
import BookingSummary from '../components/BookingSummary';
import PaymentMethodSelector from '../components/PaymentMethodSelector';
import PriceBreakdown from '../components/PriceBreakdown';
import BackButton from '../components/BackButton';
import PaymentFooter from '../components/PaymentFooter';

const PaymentPage: React.FC = () => {
  return (
    <div className="bg-off-white font-sans text-night-blue antialiased min-h-screen flex flex-col">
      <PaymentHeader />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 -mt-8 pb-10 relative z-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-8">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <BookingSummary />
              <PaymentMethodSelector />
            </div>

            <div className="lg:col-span-5">
              <PriceBreakdown />
            </div>
          </div>

          <BackButton />
        </div>
      </main>

      <PaymentFooter />
    </div>
  );
};

export default PaymentPage;