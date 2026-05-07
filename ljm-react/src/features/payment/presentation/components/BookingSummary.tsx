// features/payment/presentation/components/BookingSummary.tsx
import React from 'react';
import type { BookingDraft } from '../../../../lib/bookingDraft';

type Props = {
  draft: BookingDraft;
  isLoading: boolean;
};

const BookingSummary: React.FC<Props> = ({ draft, isLoading }) => {
  const destination = draft.destination;
  const suite = draft.suite;
  const companions = draft.companions ?? [];
  const animalCompanion = draft.animalCompanion;
  const activities = draft.activities ?? [];
  const activeServices = draft.personalization?.services.filter((service) => service.active) ?? [];
  const hasBookingData = Boolean(destination || suite || companions.length || animalCompanion || activities.length || activeServices.length);

  return (
    <div className="bg-white rounded-[2rem] premium-shadow border border-gray-100">
      <div className="p-8 pb-10">
        <div className="flex items-center gap-3 mb-8">
          <span className="material-symbols-outlined text-maroon-gold">auto_awesome</span>
          <h3 className="text-xs font-bold text-night-blue uppercase tracking-[0.2em]">Detalles de su Odisea</h3>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center rounded-2xl bg-off-white/50 px-6 py-16">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-night-blue/15 border-t-maroon-gold" />
          </div>
        ) : !hasBookingData ? (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-off-white/50 px-6 py-12 text-center">
            <span className="material-symbols-outlined mb-3 text-5xl text-gray-300">event_busy</span>
            <p className="text-sm font-bold uppercase tracking-widest text-night-blue">Sin reserva seleccionada</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              El crucero, alojamiento, pasajeros y experiencias se mostrarán cuando exista una reserva activa.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {destination && (
              <div className="rounded-2xl border border-gray-100 bg-off-white/60 p-5">
                <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-maroon-gold">Destino</p>
                <h4 className="mt-2 text-2xl font-display text-night-blue">{destination.titulo}</h4>
                <p className="mt-1 text-sm text-night-blue/55">
                  {[destination.pais, destination.puerto_principal].filter(Boolean).join(' | ') || destination.ubicacion}
                </p>
              </div>
            )}

            {suite && (
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-gray-400">Alojamiento</p>
                <div className="mt-3 flex gap-4">
                  <img src={suite.imageUrl} alt={suite.title} className="h-20 w-24 rounded-xl object-cover" />
                  <div>
                    <h4 className="text-lg font-display text-night-blue">{suite.title}</h4>
                    <p className="mt-1 text-xs text-night-blue/50">{suite.capacity} | {suite.size}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-night-blue px-5 py-4 text-white">
                <p className="text-[9px] uppercase tracking-[0.2em] text-white/50">Acompañantes</p>
                <p className="mt-2 text-2xl font-display">{companions.length}</p>
              </div>
              <div className="rounded-2xl bg-[#f7f2ea] px-5 py-4 text-night-blue">
                <p className="text-[9px] uppercase tracking-[0.2em] text-night-blue/45">Servicios</p>
                <p className="mt-2 text-2xl font-display">{activeServices.length}</p>
              </div>
              <div className="rounded-2xl bg-[#f0f3f8] px-5 py-4 text-night-blue">
                <p className="text-[9px] uppercase tracking-[0.2em] text-night-blue/45">Actividades</p>
                <p className="mt-2 text-2xl font-display">{activities.length}</p>
              </div>
            </div>

            {animalCompanion && (
              <div className="rounded-2xl border border-[#c8a96e]/20 bg-[#f7f2ea] p-5">
                <div className="mb-4 flex items-center gap-3">
                  <span className="material-symbols-outlined text-maroon-gold">pets</span>
                  <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-maroon-gold">
                    Compañero animal registrado
                  </p>
                </div>
                <div className="grid gap-3 text-xs text-night-blue/65 sm:grid-cols-2">
                  <p><span className="font-bold text-night-blue">Nombre:</span> {animalCompanion.nombre}</p>
                  <p><span className="font-bold text-night-blue">Tipo:</span> {animalCompanion.tipoAnimal}</p>
                  <p><span className="font-bold text-night-blue">Raza:</span> {animalCompanion.raza || "No indicada"}</p>
                  <p><span className="font-bold text-night-blue">Peso:</span> {animalCompanion.pesoKg} {animalCompanion.unidadPeso ?? "kg"}</p>
                </div>
                {animalCompanion.cuidadosEspeciales ? (
                  <p className="mt-3 text-xs leading-relaxed text-night-blue/55">
                    {animalCompanion.cuidadosEspeciales}
                  </p>
                ) : null}
                {animalCompanion.certificadoNombre ? (
                  <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-night-blue/45">
                    Certificado: {animalCompanion.certificadoNombre}
                  </p>
                ) : null}
              </div>
            )}

            {activities.length > 0 && (
              <div className="rounded-2xl border border-gray-100 p-5">
                <div className="mb-3 flex items-center justify-between gap-4">
                  <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-gray-400">Experiencias</p>
                  <span className="rounded-full bg-night-blue/5 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-night-blue/45">
                    {activities.length} seleccionadas
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
                  {activities.map((activity) => (
                    <span key={activity.id} className="min-w-0 rounded-full bg-off-white px-4 py-2 text-center text-[10px] font-bold uppercase tracking-widest text-night-blue/65">
                      {activity.nombre}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingSummary;
