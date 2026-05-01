const meta = [
  { label: "Client Name", value: "Sin cliente" },
  { label: "Member ID", value: "Sin ID" },
  { label: "Issue Date", value: "Sin fecha" },
  { label: "Boarding", value: "Sin embarque" },
];

export default function InvoiceMetaGrid() {
  return (
    <div className="invoice-meta-grid relative z-10 mb-12 grid grid-cols-1 gap-4 border-y border-slate-200 py-6 md:grid-cols-4">
      {meta.map((item) => (
        <div key={item.label}>
          <span className="mb-1 block text-[9px] uppercase tracking-widest text-slate-400">
            {item.label}
          </span>
          <span
            className="text-sm font-bold text-[#0e1a34]"
            style={{ fontFamily: "'Noto Serif', serif" }}
          >
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}
