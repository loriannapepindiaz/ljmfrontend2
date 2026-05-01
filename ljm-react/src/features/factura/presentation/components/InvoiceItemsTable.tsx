const items: Array<{ code: string; title: string; description: string; qty: string; price: string }> = [];

export default function InvoiceItemsTable() {
  return (
    <div className="invoice-items-table w-full md:w-3/4">
      <div className="invoice-items-head mb-4 grid grid-cols-12 bg-[#0e1a34] px-4 py-3 text-white">
        <div className="col-span-2 text-[9px] uppercase tracking-widest md:col-span-1">SL.</div>
        <div className="col-span-6 text-[9px] uppercase tracking-widest md:col-span-7">Description</div>
        <div className="col-span-2 text-center text-[9px] uppercase tracking-widest">Qty</div>
        <div className="col-span-2 text-right text-[9px] uppercase tracking-widest">Price</div>
      </div>

      <div className="invoice-items-list">
        {items.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 px-6 py-12 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Sin cargos facturados</p>
            <p className="mt-2 text-xs text-slate-500">La factura se llenara con los cargos reales de la reserva.</p>
          </div>
        ) : items.map((item) => (
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
    </div>
  );
}
