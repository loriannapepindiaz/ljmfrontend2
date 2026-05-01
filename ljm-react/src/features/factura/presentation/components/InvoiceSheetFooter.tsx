export default function InvoiceSheetFooter() {
  return (
    <>
      <div className="invoice-sheet-footer relative z-10 mt-auto grid grid-cols-1 items-end gap-8 pb-4 pt-16 md:grid-cols-3">
        <div className="flex items-center gap-4">
          <div className="space-y-0.5">
            <p className="text-[8px] font-bold uppercase tracking-widest text-slate-400">
              Integridad de Traza Digital
            </p>
            <p className="font-mono text-[7px] text-slate-300">Sin traza generada</p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-[8px] uppercase tracking-[0.5em] text-slate-300">
            Embarcaciones Registradas en Mónaco
          </p>
        </div>

        <div className="border-t border-slate-200 pt-4 text-right">
          <p
            className="mb-1 text-2xl italic leading-none text-[#0e1a34]/80"
            style={{ fontFamily: "'Noto Serif', serif" }}
          >
            Sin firma
          </p>
          <div className="mb-2 ml-auto h-px w-32 bg-[#eacea9]/30" />
          <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-slate-500">
            Pendiente de emision
          </p>
          <p className="text-[7px] uppercase tracking-[0.2em] text-slate-400">
            Oficial al Mando, LJM Sealine
          </p>
        </div>
      </div>

      <div className="absolute bottom-4 left-0 right-0 hidden items-center justify-between px-8 text-[7px] uppercase tracking-[0.5em] text-slate-300 opacity-40 md:flex lg:px-20">
        <span>Londres • Mónaco • Dubái • Singapur</span>
        <span>Ref: Sin reserva</span>
      </div>
    </>
  );
}
