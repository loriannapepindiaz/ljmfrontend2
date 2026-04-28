interface BookingActionsProps {
  onViewInvoice: () => void;
  onManageBooking: () => void;
  onGoHome: () => void;
}

const BookingActions = ({ onViewInvoice, onManageBooking, onGoHome }: BookingActionsProps) => (
  <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
    <button
      onClick={onViewInvoice}
      className="w-full px-8 h-12 bg-[#c8a96e] text-[#0a1628] font-body font-bold text-sm rounded-lg hover:brightness-110 transition-all flex items-center justify-center"
    >
      <span>Visualizar Factura</span>
    </button>
    <button
      onClick={onManageBooking}
      className="w-full px-8 h-12 bg-transparent border border-white/20 text-white font-body font-medium text-sm rounded-lg hover:bg-white/5 transition-all flex items-center justify-center"
    >
      Ajustes de reserva
    </button>
    <button
      onClick={onGoHome}
      className="w-full px-8 h-12 bg-[#c8a96e] text-[#0a1628] font-body font-bold text-sm rounded-lg hover:brightness-110 transition-all flex items-center justify-center"
    >
      Volver al Inicio
    </button>
  </div>
);

export default BookingActions;
