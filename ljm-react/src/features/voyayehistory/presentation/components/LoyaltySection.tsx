import React from 'react';
import type { VoyageHistoryData } from '../voyageHistoryData';

type Props = {
  data: VoyageHistoryData | null;
  isLoading: boolean;
};

const LoyaltySection: React.FC<Props> = ({ data, isLoading }) => {
  const loyaltyLabel = isLoading ? 'Cargando beneficios...' : data?.loyalty.label ?? 'Sin beneficios asignados';
  const totalNights = data?.stats.totalNights ?? 0;
  const nightsToNextTier = data?.loyalty.nightsToNextTier ?? 0;

  return (
    <section className="mt-16 pt-16 border-t border-slate-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 bg-[#eacea9]/10 rounded-xl border border-[#eacea9]/20">
          <span className="material-symbols-outlined text-[#eacea9] mb-4 text-3xl block">star</span>
          <h4 className="text-xl font-bold text-[#0e1a34] mb-2" style={{ fontFamily: 'Newsreader, serif' }}>
            {loyaltyLabel}
          </h4>
          <p className="text-sm text-slate-500">
            {nightsToNextTier ? `Faltan ${nightsToNextTier} noches para el siguiente nivel.` : 'Los beneficios se mantienen sincronizados con el perfil del miembro.'}
          </p>
        </div>

        <div className="p-8 bg-[#0e1a34]/5 rounded-xl border border-[#0e1a34]/10">
          <span className="material-symbols-outlined text-[#0e1a34] mb-4 text-3xl block">workspace_premium</span>
          <h4 className="text-xl font-bold text-[#0e1a34] mb-2" style={{ fontFamily: 'Newsreader, serif' }}>
            Noches acumuladas
          </h4>
          <p className="text-3xl font-bold text-[#0e1a34] mb-1" style={{ fontFamily: 'Newsreader, serif' }}>
            {totalNights}
          </p>
          <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">
            Noches navegadas registradas
          </p>
        </div>

        <div className="p-8 bg-slate-900 rounded-xl text-white relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="text-xl font-bold mb-2" style={{ fontFamily: 'Newsreader, serif' }}>
              {data?.upcomingReservation ? 'Concierge disponible' : 'Sin concierge asignado'}
            </h4>
            <p className="text-sm text-white/70 mb-4">
              {data?.upcomingReservation ? `Asistencia dedicada para ${data.upcomingReservation.destination}.` : 'La asistencia dedicada se habilitara cuando exista una reserva activa.'}
            </p>
          </div>
          <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-white/10 text-9xl">
            support_agent
          </span>
        </div>
      </div>
    </section>
  );
};

export default LoyaltySection;
