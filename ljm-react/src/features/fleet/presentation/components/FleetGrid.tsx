// src/features/fleet/presentation/components/FleetGrid.tsx
import React from 'react';
import VesselCard from './VesselCard';
import VesselCardSmall from './VesselCardSmall';

// Opcional: importa las imágenes locales si las tienes en assets
// Si no, puedes dejar las URLs directas como en el HTML original
// Ejemplo:
// import serenityImg from '@/assets/fleet/serenity.jpg';
// import azureImg from '@/assets/fleet/azure.jpg';
// etc.

const FleetGrid: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Grid de las dos tarjetas grandes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <VesselCard
          title="The Serenity"
          subtitle="Premium Experience"
          description="Our premier flagship offering the highest level of space and luxury at sea, featuring revolutionary ocean-view suites and personalized butler service."
          length="362m"
          guests="5,400"
          badge="Flagship"
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuA84W5PQL7IEuB3rynux-aB4RxSx4_zwQ9m58GmsSqacuGq36ZEUswxniN4RsxN5Cnnv8EPYlj0p7RpYq3NyopaM3y1R-hkztTM6xW9Y9zS8mMPDSsZUWuB0GBsbNWHtNk4h2SM2kwF-X6ZLWoCQ6hIwxj1nUciMn6LFjL__5WmIpY9nz9YbHeysjjaYSQoVytkWBQzX_LoqXwSGAsPep1oYZKcXUeJpfQfc6pIT-hD3GP2DXoNlKLMMKAQK55aHITDxsmruYKdDh8"
        />

        <VesselCard
          title="The Azure"
          subtitle="Modern Elegance"
          description="A sleek masterpiece of nautical engineering, designed for intimate journeys to the world's most exclusive ports and hidden gems."
          length="345m"
          guests="4,200"
          badge="Ultra Luxury"
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuARJju3i-CT1ZZ4da9pgQGiAx6Pl66a42pxux47r1Unh3gOayOF61Zx6SSgB550cieWuXc24neUGMdCux6FKL6CHPVRn0oRAlHk3Zzf_1u2XXZxZE9UoARRtO-jFAchCMiNC56wAtVwH13-WCNIQiMb-v_FBRO43ClZwIvYABWTEeimAkTW_j0C6I-VT6XaHEx6CIU4pIyLchwNc0CeDzVDG8SOrESP6ZguGgI5a86tGJ533LGom_AkuC79-CTirt44JzLPy_041Ls"
        />
      </div>

      {/* Grid de las tres tarjetas pequeñas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <VesselCardSmall
          title="The Majestic"
          className="Explorer Class"
          description="Perfectly sized for deep-sea exploration without compromising on luxury."
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuAaRrIP2F5y6bFAzR2X4EdIvDFrd4LaNnLCZRN_mXtvbgzyxJSR3c_CTBm79WRndjuq2m-RsMOfsCBGOKTQ5Na1dwBFeDHy5RsSYTiqIWhqWJ5CEi70PO2ddW_Koe40r12q6VYolJWiNx-OdwaikW9TLBmtrSBW3PrRg-2S8z8bVeibq75oxaknkJIY4f5R9qgHBSCKi7bf-nC-FrdyOXcRYXKt6pkgtBKDtBQizMue7sl7cFRhgRxTXOPqZ8HUvkjbdmQUanNxRMY"
        />

        <VesselCardSmall
          title="The Celestial"
          className="Horizon Class"
          description="Designed for the ultimate stargazing and open-ocean observatory experience."
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuB3Cm8Vp0BIDOeE9LPnNUOX5uAv4NSFUIRepWGM_nwiFdcKcs-11vOlYw9AyiCU_OWP-aUClbHS0ZsWSs7G4yAH_AfRVqEqAzCwVCJ2iQYCX4tYu4mMQ0QfodvK2XDfaKYVLxbg05n45e3aJg0aIjLCskHdNiWR8Ea235_VZxZEiveOtZ0j8UxSjqFE9QtwTGs44Sk6JOw8CKmM_deQ_lxKRz-be27MIhJOfpNlu_Db9H2udvLmYq_WSHmVJa8nMhczMr1LHbdRRyQ"
        />

        <VesselCardSmall
          title="The Oceanic"
          className="Voyager Class"
          description="Redefining boundaries of sustainable maritime travel with hybrid technology."
          imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuA84W5PQL7IEuB3rynux-aB4RxSx4_zwQ9m58GmsSqacuGq36ZEUswxniN4RsxN5Cnnv8EPYlj0p7RpYq3NyopaM3y1R-hkztTM6xW9Y9zS8mMPDSsZUWuB0GBsbNWHtNk4h2SM2kwF-X6ZLWoCQ6hIwxj1nUciMn6LFjL__5WmIpY9nz9YbHeysjjaYSQoVytkWBQzX_LoqXwSGAsPep1oYZKcXUeJpfQfc6pIT-hD3GP2DXoNlKLMMKAQK55aHITDxsmruYKdDh8"
        />
      </div>
    </div>
  );
};

export default FleetGrid;