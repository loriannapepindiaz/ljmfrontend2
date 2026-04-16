interface BookingActionsProps {
  onDownload: () => void;
  onGoHome: () => void;
}

const BookingActions = ({ onDownload, onGoHome }: BookingActionsProps) => (
  <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
    <button
      onClick={onDownload}
      className="w-full sm:w-auto min-w-[200px] px-8 h-12 bg-[#c8a96e] text-[#0a1628] font-body font-bold text-sm rounded-lg hover:brightness-110 transition-all flex items-center justify-center space-x-2"
    >
      <span className="material-symbols-outlined text-lg">download</span>
      <span>Descargar Itinerario</span>
    </button>
    <button
      onClick={onGoHome}
      className="w-full sm:w-auto min-w-[200px] px-8 h-12 bg-transparent border border-white/20 text-white font-body font-medium text-sm rounded-lg hover:bg-white/5 transition-all flex items-center justify-center"
    >
      Volver al Inicio
    </button>
  </div>
);

export default BookingActions;