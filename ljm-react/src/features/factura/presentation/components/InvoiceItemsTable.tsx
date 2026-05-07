import type { InvoiceViewData } from "../invoiceData";

type InvoiceItemsTableProps = {
  invoice: InvoiceViewData;
};

export default function InvoiceItemsTable({ invoice }: InvoiceItemsTableProps) {
  return (
    <div className="invoice-items-table w-full md:w-3/4">
      <div className="invoice-items-head mb-4 grid grid-cols-12 bg-[#0e1a34] px-4 py-3 text-white">
        <div className="col-span-2 text-[9px] uppercase tracking-widest md:col-span-1">N.</div>
        <div className="col-span-6 text-[9px] uppercase tracking-widest md:col-span-7">Descripción</div>
        <div className="col-span-2 text-center text-[9px] uppercase tracking-widest">Cant.</div>
        <div className="col-span-2 text-right text-[9px] uppercase tracking-widest">Precio</div>
      </div>

      <div className="invoice-items-list">
        {invoice.items.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 px-6 py-12 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Sin cargos facturados</p>
            <p className="mt-2 text-xs text-slate-500">La factura se llenara con los cargos reales de la reserva.</p>
          </div>
        ) : invoice.items.map((item) => (
          <div key={item.code}>
            <div className="grid grid-cols-12 items-center gap-y-2 px-4">
              <div className="col-span-2 text-sm font-bold md:col-span-1" style={{ fontFamily: "'Noto Serif', serif" }}>{item.code}</div>
              <div className="col-span-10 md:col-span-7">
                <h5 className="text-sm font-bold text-[#0e1a34]" style={{ fontFamily: "'Noto Serif', serif" }}>{item.title}</h5>
                <p className="mt-0.5 text-[10px] italic text-slate-400">{item.description}</p>
              </div>
              <div className="col-span-6 text-center text-xs font-bold text-slate-400 md:col-span-2">{item.qty}</div>
              <div className="col-span-6 text-right text-sm font-bold md:col-span-2" style={{ fontFamily: "'Noto Serif', serif" }}>{item.price}</div>
            </div>
            <div className="mx-4 mt-6 h-px bg-slate-100" />
          </div>
        ))}
      </div>

      <div className="invoice-items-total ml-auto mt-10 w-full max-w-xs space-y-3 border-t border-slate-200 pt-5">
        <div className="flex items-center justify-between gap-6 text-xs text-slate-500">
          <span className="font-bold uppercase tracking-[0.2em]">Subtotal</span>
          <span className="font-bold text-[#0e1a34]">{invoice.subtotal}</span>
        </div>
        <div className="flex items-center justify-between gap-6 bg-[#0e1a34] px-5 py-4 text-white">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/55">Total pagado</span>
          <span className="text-xl font-bold" style={{ fontFamily: "'Noto Serif', serif" }}>{invoice.total}</span>
        </div>
      </div>
    </div>
  );
}
