import React from 'react';
import type { ManageBookingData } from '../manageBookingData';

type Props = {
  booking?: ManageBookingData | null;
};

const ConciergeCard: React.FC<Props> = ({ booking }) => {
  const included = Boolean(booking?.butler?.included);
  const name = booking?.butler?.name?.trim();

  return (
    <div className="rounded-xl p-6 bg-gradient-to-br from-[#785d32]/15 to-transparent border border-[#785d32]/20">
      <h5 className="font-bold mb-2 text-[#eacea9]">
        {included ? (name ? `Mayordomo asignado: ${name}` : 'Mayordomo incluido') : 'Sin mayordomo asignado'}
      </h5>
      <p className="text-xs text-slate-300 mb-4 italic leading-relaxed">
        {included
          ? `El servicio de mayordomo está incluido para ${booking?.suiteName ?? 'esta habitación'}.`
          : 'El mayordomo aparecerá aquí cuando la habitación o el destino seleccionado lo incluya.'}
      </p>
    </div>
  );
};

export default ConciergeCard;

