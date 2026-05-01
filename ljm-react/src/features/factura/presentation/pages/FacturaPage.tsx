import { Printer, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../../../components/BackButton";
import { InvoiceSheetHeader } from "../components/InvoiceHeader";
import InvoiceMetaGrid from "../components/InvoiceMetaGrid";
import InvoiceSidebar from "../components/InvoiceSidebar";
import InvoiceItemsTable from "../components/InvoiceItemsTable";
import InvoiceSheetFooter from "../components/InvoiceSheetFooter";
import InvoicePageFooter from "../components/InvoicePageFooter";

export default function FacturaPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#06122c] font-sans text-[#0e1a34] selection:bg-[#eacea9] selection:text-[#0e1a34] factura-print-page">
      <style>
        {`
          @page {
            size: A4 portrait;
            margin: 0;
          }

          @media print {
            html, body {
              background: #fdfcf9 !important;
            }

            html, body {
              width: 210mm;
              height: 297mm;
              margin: 0 !important;
              padding: 0 !important;
            }

            body * {
              visibility: hidden;
            }

            .factura-print-page,
            .factura-print-page * {
              visibility: visible;
            }

            .factura-print-page {
              background: #fdfcf9 !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }

            .factura-print-main {
              margin: 0 !important;
              padding: 0 !important;
            }

            .factura-print-sheet {
              width: 210mm !important;
              height: 297mm !important;
              min-height: 297mm !important;
              max-width: 210mm !important;
              margin: 0 auto !important;
              padding: 12mm 12mm 10mm !important;
              box-sizing: border-box !important;
              box-shadow: none !important;
              overflow: hidden !important;
              page-break-after: avoid !important;
              break-inside: avoid !important;
              display: flex !important;
              flex-direction: column !important;
            }

            .invoice-sheet-header {
              margin-bottom: 8mm !important;
              gap: 6mm !important;
              display: flex !important;
              flex-direction: row !important;
              align-items: flex-start !important;
              justify-content: space-between !important;
            }

            .invoice-meta-grid {
              display: grid !important;
              grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
              margin-bottom: 8mm !important;
              padding-top: 4mm !important;
              padding-bottom: 4mm !important;
              gap: 3mm !important;
            }

            .invoice-content-row {
              display: flex !important;
              flex-direction: row !important;
              align-items: flex-start !important;
              gap: 8mm !important;
            }

            .invoice-sidebar {
              width: 24% !important;
              min-width: 24% !important;
              gap: 5mm !important;
              padding-right: 5mm !important;
              padding-bottom: 0 !important;
              border-bottom: 0 !important;
              border-right: 1px solid rgb(241 245 249) !important;
            }

            .invoice-items-table {
              width: 76% !important;
            }

            .invoice-items-head {
              margin-bottom: 3mm !important;
              padding-top: 2.5mm !important;
              padding-bottom: 2.5mm !important;
            }

            .invoice-items-list {
              gap: 3.5mm !important;
            }

            .invoice-items-list .mt-6 {
              margin-top: 3.5mm !important;
            }

            .invoice-items-total {
              margin-top: 6mm !important;
            }

            .invoice-sheet-footer {
              display: grid !important;
              grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
              padding-top: 8mm !important;
              padding-bottom: 0 !important;
              gap: 4mm !important;
            }

            .factura-print-sheet .text-5xl,
            .factura-print-sheet .md\\:text-7xl {
              font-size: 3.8rem !important;
              line-height: 0.82 !important;
            }

            .factura-print-sheet .text-3xl {
              font-size: 2rem !important;
            }

            .factura-print-sheet .text-2xl {
              font-size: 1.55rem !important;
            }

            .factura-print-sheet .text-xl {
              font-size: 1rem !important;
            }

            .factura-print-sheet .text-sm {
              font-size: 0.78rem !important;
            }

            .factura-print-sheet .text-xs {
              font-size: 0.68rem !important;
            }

            .factura-print-sheet .text-\\[10px\\] {
              font-size: 8px !important;
            }

            .factura-print-sheet .text-\\[9px\\] {
              font-size: 7px !important;
            }

            .factura-print-sheet .text-\\[8px\\] {
              font-size: 6px !important;
            }

            .factura-print-sheet .text-\\[7px\\] {
              font-size: 5.5px !important;
            }

            .factura-print-sheet .text-\\[6px\\] {
              font-size: 5px !important;
            }

            .factura-print-hide {
              display: none !important;
            }
          }
        `}
      </style>

      <BackButton topClass="top-6" />
      <main className="factura-print-main px-4 pb-24 pt-10 md:pt-16">
        <div
          className="factura-print-sheet relative mx-auto flex min-h-[297mm] w-full max-w-[210mm] flex-col overflow-hidden bg-[#fdfcf9] p-6 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] md:p-[20mm]"
        >
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 hidden -translate-x-1/2 -translate-y-1/2 -rotate-[35deg] whitespace-nowrap text-[7rem] italic text-[#0e1a34]/[0.02] lg:block"
            style={{ fontFamily: "'Noto Serif', serif" }}
          >
            LJM Sealine
          </div>

          <InvoiceSheetHeader />
          <InvoiceMetaGrid />

          <div className="invoice-content-row relative z-10 flex flex-col gap-8 md:flex-row md:gap-12">
            <InvoiceSidebar />
            <InvoiceItemsTable />
          </div>

          <InvoiceSheetFooter />
        </div>

        <div className="factura-print-hide mt-12 flex justify-center gap-4">
          <button
            className="group flex items-center gap-4 bg-[#0e1a34]/60 border border-[#eacea9]/20 px-8 py-4 text-xs font-bold uppercase tracking-[0.3em] text-[#eacea9]/80 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#0e1a34] hover:text-[#eacea9] hover:shadow-xl md:px-10"
            onClick={() => navigate("/")}
            type="button"
          >
            <Home size={18} />
            Volver al Inicio
          </button>
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

      <div className="factura-print-hide">
        <InvoicePageFooter />
      </div>
    </div>
  );
}
