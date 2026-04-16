import { Printer } from "lucide-react";
import { InvoiceSheetHeader } from "../components/InvoiceHeader";
import InvoiceMetaGrid from "../components/InvoiceMetaGrid";
import InvoiceSidebar from "../components/InvoiceSidebar";
import InvoiceItemsTable from "../components/InvoiceItemsTable";
import InvoiceSheetFooter from "../components/InvoiceSheetFooter";
import InvoicePageFooter from "../components/InvoicePageFooter";

export default function FacturaPage() {
  return (
    <div className="bg-[#06122c] font-sans text-[#0e1a34] selection:bg-[#eacea9] selection:text-[#0e1a34]">
      <main className="px-4 pb-24 pt-10 md:pt-16">
        <div className="relative mx-auto flex min-h-[297mm] w-full max-w-[210mm] flex-col overflow-hidden bg-[#fdfcf9] p-6 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] md:p-[20mm]">
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 hidden -translate-x-1/2 -translate-y-1/2 -rotate-[35deg] whitespace-nowrap text-[7rem] italic text-[#0e1a34]/[0.02] lg:block"
            style={{ fontFamily: "'Noto Serif', serif" }}
          >
            LJM Sealine
          </div>

          <InvoiceSheetHeader />
          <InvoiceMetaGrid />

          <div className="relative z-10 flex flex-col gap-8 md:flex-row md:gap-12">
            <InvoiceSidebar />
            <InvoiceItemsTable />
          </div>

          <InvoiceSheetFooter />
        </div>

        <div className="mt-12 flex justify-center">
          <button
            className="group flex items-center gap-4 bg-[#eacea9] px-8 py-4 text-xs font-bold uppercase tracking-[0.3em] text-[#0e1a34] shadow-2xl transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-xl md:px-12"
            onClick={() => window.print()}
            type="button"
          >
            <Printer className="transition-transform group-hover:rotate-12" size={18} />
            Imprimir Factura
          </button>
        </div>
      </main>

      <InvoicePageFooter />
    </div>
  );
}
