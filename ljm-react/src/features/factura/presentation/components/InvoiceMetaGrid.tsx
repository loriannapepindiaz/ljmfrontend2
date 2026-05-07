import type { InvoiceViewData } from "../invoiceData";

type InvoiceMetaGridProps = {
  invoice: InvoiceViewData;
};

const getMeta = (invoice: InvoiceViewData) => [
  { label: "Cliente", value: invoice.clientName },
  { label: "ID de miembro", value: invoice.memberId },
  { label: "Emision", value: invoice.issueDate },
  { label: "Embarque", value: invoice.boarding },
];

export default function InvoiceMetaGrid({ invoice }: InvoiceMetaGridProps) {
  const meta = getMeta(invoice);

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
