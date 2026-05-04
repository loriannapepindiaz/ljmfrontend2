import React from 'react';
import type { BookingCompanionDraft } from '../../../../lib/bookingDraft';

type Props = {
  companions: BookingCompanionDraft[];
};

const getInitials = (name: string, lastName: string) =>
  `${name.trim().charAt(0)}${lastName.trim().charAt(0)}`.toUpperCase() || 'PX';

const CompanionManifest: React.FC<Props> = ({ companions }) => {
  return (
    <section className="mb-32">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className="text-5xl text-[#0E1A34]" style={{ fontFamily: 'Noto Serif, serif' }}>
            Acompañantes del Viaje
          </h2>
          <div className="h-px w-24 bg-[#0E1A34] mt-6" />
        </div>
      </div>

      {companions.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#0E1A34]/15 bg-white px-8 py-14 text-center">
          <span className="material-symbols-outlined mb-4 text-5xl text-[#0E1A34]/20">group_off</span>
          <p className="text-sm font-bold uppercase tracking-widest text-[#0E1A34]/60">Sin acompañantes registrados</p>
          <p className="mx-auto mt-3 max-w-xl text-sm text-[#0E1A34]/50">
            El manifiesto se completará con los pasajeros reales asociados a la reserva.
          </p>
        </div>
      ) : (
        <div className="mx-auto grid max-w-5xl grid-cols-1 justify-center gap-6 md:grid-cols-2 xl:grid-cols-3">
          {companions.map((companion) => (
            <div
              key={`${companion.nombre}-${companion.apellidos}-${companion.pasaporte}`}
              className="bg-[#0E1A34] p-8 flex items-center gap-6 rounded-xl border border-white/5 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="h-20 w-20 flex-shrink-0 flex items-center justify-center rounded-full border-2 border-[#DEC29E]/20 bg-[#0E1A34]">
                <span className="text-2xl text-[#DEC29E]" style={{ fontFamily: 'Noto Serif, serif' }}>
                  {getInitials(companion.nombre, companion.apellidos)}
                </span>
              </div>
              <div>
                <h3 className="text-lg text-[#DEC29E]" style={{ fontFamily: 'Noto Serif, serif' }}>
                  {companion.nombre} {companion.apellidos}
                </h3>
                <span className="text-[9px] uppercase tracking-widest text-white/40">
                  {companion.pasaporte || 'Documento pendiente'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CompanionManifest;
