interface BookingDetails {
  reference: string;
  passengers: string;
  departureDate: string;
  departurePort: string;
  returnDate: string;
  returnPort: string;
  total: string;
}

interface BookingDetailsCardProps {
  details: BookingDetails;
}

const BookingDetailsCard = ({ details }: BookingDetailsCardProps) => (
  <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-8 md:p-10 overflow-hidden relative">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left relative z-10">
      {/* Left */}
      <div className="space-y-6">
        <div>
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#c8a96e]/60 block mb-1">
            Referencia de Reserva
          </span>
          <p className="text-2xl font-headline font-bold text-white mt-1">{details.reference}</p>
        </div>
        <div className="pt-6 border-t border-white/10">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#c8a96e]/60 block mb-2">
            Pasajeros
          </span>
          <div className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-[#c8a96e] text-sm">group</span>
            <p className="text-white text-base">{details.passengers}</p>
          </div>
        </div>
      </div>

      {/* Right: Timeline */}
      <div>
        <div className="flex items-start space-x-4">
          <div className="mt-5 flex flex-col items-center">
            <div className="w-2 h-2 rounded-full bg-[#c8a96e]" />
            <div className="w-px h-10 bg-white/10" />
            <div className="w-2 h-2 rounded-full border border-[#c8a96e]" />
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#c8a96e]/60 block mb-1">
                Salida
              </span>
              <p className="text-white font-medium text-sm">{details.departureDate}</p>
              <p className="text-white/40 text-xs">{details.departurePort}</p>
            </div>
            <div>
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#c8a96e]/60 block mb-1">
                Regreso
              </span>
              <p className="text-white font-medium text-sm">{details.returnDate}</p>
              <p className="text-white/40 text-xs">{details.returnPort}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Footer */}
    <div className="mt-10 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex items-center space-x-3 bg-white/5 px-4 py-2 rounded-lg">
        <span className="material-symbols-outlined text-[#c8a96e]">verified_user</span>
        <span className="text-white/80 text-xs font-medium">Pago procesado y verificado</span>
      </div>
      <div className="text-right">
        <p className="text-white/50 text-[10px] uppercase tracking-widest">Total Reservado</p>
        <p className="text-[#c8a96e] text-xl font-bold font-headline">{details.total}</p>
      </div>
    </div>
  </div>
);

export default BookingDetailsCard;
export type { BookingDetails };