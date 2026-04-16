const items = [
  {
    code: "01.",
    title: "Suite Stay",
    description: "Imperial Atlantis Premium Deck Accommodation",
    qty: "01",
    price: "$11,200.00",
  },
  {
    code: "02.",
    title: "Pet-Care Service",
    description: "Viaje con Mascotas - Bespoke kennel & deck exercise",
    qty: "01",
    price: "$850.00",
  },
  {
    code: "03.",
    title: "Welcome Kit",
    description: "Kit de Bienvenida - Signature Essentials & Champagne",
    qty: "01",
    price: "$450.00",
  },
  {
    code: "04.",
    title: "Gourmet Dining",
    description: "Gastronomia Personalizada - Chef's Table Rotation",
    qty: "01",
    price: "$2,000.00",
  },
];

export default function InvoiceItemsTable() {
  return (
    <div className="w-full md:w-3/4">
      <div className="mb-4 grid grid-cols-12 bg-[#0e1a34] px-4 py-3 text-white">
        <div className="col-span-2 text-[9px] uppercase tracking-widest md:col-span-1">SL.</div>
        <div className="col-span-6 text-[9px] uppercase tracking-widest md:col-span-7">Description</div>
        <div className="col-span-2 text-center text-[9px] uppercase tracking-widest">Qty</div>
        <div className="col-span-2 text-right text-[9px] uppercase tracking-widest">Price</div>
      </div>

      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.code}>
            <div className="grid grid-cols-12 items-center gap-y-2 px-4">
              <div
                className="col-span-2 text-sm font-bold md:col-span-1"
                style={{ fontFamily: "'Noto Serif', serif" }}
              >
                {item.code}
              </div>
              <div className="col-span-10 md:col-span-7">
                <h5
                  className="text-sm font-bold text-[#0e1a34]"
                  style={{ fontFamily: "'Noto Serif', serif" }}
                >
                  {item.title}
                </h5>
                <p className="mt-0.5 text-[10px] italic text-slate-400">{item.description}</p>
              </div>
              <div className="col-span-6 text-center text-xs font-bold text-slate-400 md:col-span-2">
                {item.qty}
              </div>
              <div
                className="col-span-6 text-right text-sm font-bold md:col-span-2"
                style={{ fontFamily: "'Noto Serif', serif" }}
              >
                {item.price}
              </div>
            </div>
            <div className="mx-4 mt-6 h-px bg-slate-100" />
          </div>
        ))}
      </div>

      <div className="mt-12 space-y-3">
        <div className="flex justify-end gap-8 px-4 md:gap-12">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Subtotal:
          </span>
          <span
            className="w-24 text-right text-sm font-bold text-[#0e1a34]"
            style={{ fontFamily: "'Noto Serif', serif" }}
          >
            $14,500.00
          </span>
        </div>

        <div className="mt-2 flex items-center justify-end gap-8 bg-[#eacea9]/5 px-4 py-4 md:gap-12">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#0e1a34]">Total:</span>
          <span
            className="w-40 text-right text-3xl font-bold tracking-tighter text-[#0e1a34]"
            style={{ fontFamily: "'Noto Serif', serif" }}
          >
            $14,500.00
          </span>
        </div>

        <div className="flex justify-end px-4">
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#eacea9]">
            • Paid in Full • Dec 01, 2024 •
          </p>
        </div>
      </div>
    </div>
  );
}
