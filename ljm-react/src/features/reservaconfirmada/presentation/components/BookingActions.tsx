import { FileText, Settings2 } from "lucide-react";

interface BookingActionsProps {
  onViewInvoice: () => void;
  onManageBooking: () => void;
  onGoHome?: () => void;
  showGoHome?: boolean;
  showPrimaryActions?: boolean;
}

const BookingActions = ({
  onViewInvoice,
  onManageBooking,
  onGoHome,
  showGoHome = true,
  showPrimaryActions = true,
}: BookingActionsProps) => (
  <div className="flex w-full flex-col items-center gap-3">
    {showPrimaryActions ? (
      <div className="mx-auto grid w-full max-w-[440px] grid-cols-1 gap-2.5 sm:grid-cols-2">
        <button
          onClick={onViewInvoice}
          className="flex h-10 w-full items-center justify-center gap-2 rounded-md border border-[#c8a96e]/60 bg-[#12233d] px-4 text-[11px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-all hover:border-[#c8a96e] hover:bg-[#162a47]"
        >
          <FileText size={14} strokeWidth={2.2} className="text-[#c8a96e]" />
          <span>Visualizar Factura</span>
        </button>
        <button
          onClick={onManageBooking}
          className="flex h-10 w-full items-center justify-center gap-2 rounded-md border border-[#c8a96e]/60 bg-[#12233d] px-4 text-[11px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-all hover:border-[#c8a96e] hover:bg-[#162a47]"
        >
          <Settings2 size={14} strokeWidth={2.1} className="text-[#c8a96e]" />
          Ajustes de reserva
        </button>
      </div>
    ) : null}

    {showGoHome && onGoHome ? (
      <button
        onClick={onGoHome}
        className="flex h-10 min-w-[180px] items-center justify-center rounded-md bg-[#c8a96e] px-8 text-xs font-bold text-[#0a1628] transition-all hover:brightness-110"
      >
        Volver al Inicio
      </button>
    ) : null}
  </div>
);

export default BookingActions;
