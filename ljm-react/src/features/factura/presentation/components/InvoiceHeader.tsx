import { Anchor, Bell, User, ShipWheel } from "lucide-react";

export default function InvoiceHeader() {
  return (
    <header className="fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-white/5 bg-[#06122c]/95 px-6 py-6 backdrop-blur-md md:px-12">
      <div
        className="text-xl italic tracking-tight text-[#eacea9]"
        style={{ fontFamily: "'Noto Serif', serif" }}
      >
        The Nautical Curator
      </div>

      <nav className="hidden items-center gap-10 md:flex">
        <a className="text-[10px] uppercase tracking-[0.2em] text-slate-400 transition-colors hover:text-[#eacea9]" href="#">
          Voyages
        </a>
        <a className="border-b border-[#eacea9]/30 pb-0.5 text-[10px] uppercase tracking-[0.2em] text-[#eacea9]" href="#">
          Reservations
        </a>
        <a className="text-[10px] uppercase tracking-[0.2em] text-slate-400 transition-colors hover:text-[#eacea9]" href="#">
          Concierge
        </a>
      </nav>

      <div className="flex items-center gap-5 text-[#eacea9] md:gap-6">
        <Bell size={20} />
        <User size={20} />
      </div>
    </header>
  );
}

export function InvoiceSheetHeader() {
  return (
    <div className="relative z-10 mb-12 flex flex-col justify-between gap-10 md:mb-16 md:flex-row md:items-start">
      <div className="space-y-1">
        <h1
          className="text-5xl font-bold leading-[0.85] tracking-tight text-[#0e1a34] md:text-7xl"
          style={{ fontFamily: "'Noto Serif', serif" }}
        >
          FAC
          <br />
          TU
          <br />
          RA
        </h1>

        <div className="flex items-center gap-3 pt-6">
          <Anchor className="text-[#eacea9]" size={24} />
          <span
            className="text-lg font-bold uppercase tracking-widest text-[#0e1a34]"
            style={{ fontFamily: "'Noto Serif', serif" }}
          >
            LJM Sealine
          </span>
        </div>
      </div>

      <div className="space-y-6 text-left md:text-right">
        <div className="inline-block bg-[#eacea9]/10 px-4 py-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#0e1a34]">
            Maritime Meridian Registry
          </p>
        </div>

        <div className="flex items-center gap-4 md:justify-end">
          <div className="text-left md:text-right">
            <span className="mb-1 block text-[9px] uppercase tracking-widest text-slate-400">
              Document No.
            </span>
            <span
              className="text-xl font-bold"
              style={{ fontFamily: "'Noto Serif', serif" }}
            >
              INV-2024-0850
            </span>
          </div>

          <div className="flex h-16 w-16 items-center justify-center border border-slate-200 bg-white p-1">
            <div className="grid h-full w-full grid-cols-3 gap-[2px]">
              {Array.from({ length: 9 }).map((_, index) => (
                <div
                  key={index}
                  className={index % 2 === 0 ? "bg-[#0e1a34]" : "bg-transparent"}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-start md:justify-end">
          <div className="flex items-center gap-2 rounded-full border border-[#0e1a34]/10 px-3 py-2">
            <ShipWheel size={16} className="text-[#0e1a34]" />
            <span className="text-[9px] uppercase tracking-[0.35em] text-slate-500">
              Validated Registry
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
