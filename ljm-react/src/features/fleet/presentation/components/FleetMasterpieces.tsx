// src/features/fleet/presentation/components/FleetMasterpieces.tsx
import React from 'react';
import VesselCard from './VesselCard';
import VesselCardSmall from './VesselCardSmall';

const FleetMasterpieces: React.FC = () => {
  return (
    <section className="py-24 relative" style={{ backgroundColor: '#f8f7f4' }}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="font-magiona text-4xl md:text-6xl mb-4" style={{ color: '#001D4F' }}>
            Obras Maestras de la Ingeniería
          </h2>
          <p className="max-w-2xl mx-auto text-lg" style={{ color: '#6b7280' }}>
            Cada embarcación de la flota LJM Sealine es un testimonio del diseño sofisticado y la innovación tecnológica.
          </p>
        </div>

        <div className="space-y-12">
          {/* Tarjetas grandes (grid de 2) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="rounded-xl overflow-hidden">
              <VesselCard
                id="serenity"
                title="The Serenity"
                subtitle="Experiencia Premium"
                description="Nuestro buque insignia premier que ofrece el más alto nivel de espacio y lujo en el mar, con suites revolucionarias con vista al océano y servicio de mayordomo personalizado."
                length="362m"
                guests="5,400"
                badge="Buque Insignia"
                imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuA84W5PQL7IEuB3rynux-aB4RxSx4_zwQ9m58GmsSqacuGq36ZEUswxniN4RsxN5Cnnv8EPYlj0p7RpYq3NyopaM3y1R-hkztTM6xW9Y9zS8mMPDSsZUWuB0GBsbNWHtNk4h2SM2kwF-X6ZLWoCQ6hIwxj1nUciMn6LFjL__5WmIpY9nz9YbHeysjjaYSQoVytkWBQzX_LoqXwSGAsPep1oYZKcXUeJpfQfc6pIT-hD3GP2DXoNlKLMMKAQK55aHITDxsmruYKdDh8"
              />
            </div>

            <div className="rounded-xl overflow-hidden">
              <VesselCard
                id="azure"
                title="The Azure"
                subtitle="Elegancia Moderna"
                description="Una obra maestra de la ingeniería náutica, diseñada para viajes íntimos hacia los puertos más exclusivos y joyas ocultas del mundo."
                length="345m"
                guests="4,200"
                badge="Ultra Lujo"
                imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuARJju3i-CT1ZZ4da9pgQGiAx6Pl66a42pxux47r1Unh3gOayOF61Zx6SSgB550cieWuXc24neUGMdCux6FKL6CHPVRn0oRAlHk3Zzf_1u2XXZxZE9UoARRtO-jFAchCMiNC56wAtVwH13-WCNIQiMb-v_FBRO43ClZwIvYABWTEeimAkTW_j0C6I-VT6XaHEx6CIU4pIyLchwNc0CeDzVDG8SOrESP6ZguGgI5a86tGJ533LGom_AkuC79-CTirt44JzLPy_041Ls"
              />
            </div>
          </div>

          {/* Tarjetas pequeñas (grid de 3) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="rounded-xl overflow-hidden">
              <VesselCardSmall
                title="The Majestic"
                className="Clase Explorador"
                description="Perfectamente dimensionado para la exploración en alta mar sin comprometer el lujo."
                imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuAaRrIP2F5y6bFAzR2X4EdIvDFrd4LaNnLCZRN_mXtvbgzyxJSR3c_CTBm79WRndjuq2m-RsMOfsCBGOKTQ5Na1dwBFeDHy5RsSYTiqIWhqWJ5CEi70PO2ddW_Koe40r12q6VYolJWiNx-OdwaikW9TLBmtrSBW3PrRg-2S8z8bVeibq75oxaknkJIY4f5R9qgHBSCKi7bf-nC-FrdyOXcRYXKt6pkgtBKDtBQizMue7sl7cFRhgRxTXOPqZ8HUvkjbdmQUanNxRMY"
              />
            </div>

            <div className="rounded-xl overflow-hidden">
              <VesselCardSmall
                title="The Celestial"
                className="Clase Horizonte"
                description="Diseñado para la experiencia definitiva de observación estelar y observatorio en mar abierto."
                imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuB3Cm8Vp0BIDOeE9LPnNUOX5uAv4NSFUIRepWGM_nwiFdcKcs-11vOlYw9AyiCU_OWP-aUClbHS0ZsWSs7G4yAH_AfRVqEqAzCwVCJ2iQYCX4tYu4mMQ0QfodvK2XDfaKYVLxbg05n45e3aJg0aIjLCskHdNiWR8Ea235_VZxZEiveOtZ0j8UxSjqFE9QtwTGs44Sk6JOw8CKmM_deQ_lxKRz-be27MIhJOfpNlu_Db9H2udvLmYq_WSHmVJa8nMhczMr1LHbdRRyQ"
              />
            </div>

            <div className="rounded-xl overflow-hidden">
              <VesselCardSmall
                title="The Oceanic"
                className="Clase Viajero"
                description="Redefiniendo los límites del viaje marítimo sostenible con tecnología híbrida."
                imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuA84W5PQL7IEuB3rynux-aB4RxSx4_zwQ9m58GmsSqacuGq36ZEUswxniN4RsxN5Cnnv8EPYlj0p7RpYq3NyopaM3y1R-hkztTM6xW9Y9zS8mMPDSsZUWuB0GBsbNWHtNk4h2SM2kwF-X6ZLWoCQ6hIwxj1nUciMn6LFjL__5WmIpY9nz9YbHeysjjaYSQoVytkWBQzX_LoqXwSGAsPep1oYZKcXUeJpfQfc6pIT-hD3GP2DXoNlKLMMKAQK55aHITDxsmruYKdDh8"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FleetMasterpieces;