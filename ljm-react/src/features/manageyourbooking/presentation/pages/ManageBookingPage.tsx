import React from 'react';
import Navbar from '../../../home/presentation/components/Navbar';
import Footer from '../../../home/presentation/components/Footer';
import HeroSection from '../components/HeroSection';
import ShipSummaryCard from '../components/ShipSummaryCard';
import CabinSelection from '../components/CabinSelection';
import GuestList from '../components/GuestList';
import DiningRequests from '../components/DiningRequests';
import ExcursionsList from '../components/ExcursionsList';
import PaymentDetails from '../components/PaymentDetails';
import ConciergeCard from '../components/ConciergeCard';

const ManageBookingPage: React.FC = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#0e1a34] text-slate-200">
      <Navbar />
      <main className="flex-1 px-6 lg:px-20 pt-28 pb-10 max-w-7xl mx-auto w-full">
        <HeroSection />
        <ShipSummaryCard />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <CabinSelection />
            <GuestList />
            <DiningRequests />
          </div>
          <div className="space-y-8">
            <ExcursionsList />
            <PaymentDetails />
            <ConciergeCard />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ManageBookingPage;