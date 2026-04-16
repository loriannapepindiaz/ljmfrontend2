export default function InvoicePageFooter() {
  return (
    <footer className="border-t border-white/5 bg-[#06122c] px-6 py-16 text-[#eacea9] md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 md:flex-row">
        <div className="text-center md:text-left">
          <p
            className="mb-4 text-xl italic opacity-90"
            style={{ fontFamily: "'Noto Serif', serif" }}
          >
            "The sea, once it casts its spell, holds one in its net of wonder forever."
          </p>
          <p className="text-[9px] uppercase tracking-[0.3em] text-slate-500">
            © 2024 The Nautical Curator | Maritime Excellence Worldwide
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
          <a className="transition-colors hover:text-[#eacea9]" href="#">
            Legal Terms
          </a>
          <a className="transition-colors hover:text-[#eacea9]" href="#">
            Privacy Policy
          </a>
          <a className="transition-colors hover:text-[#eacea9]" href="#">
            Global Concierge
          </a>
        </div>
      </div>
    </footer>
  );
}
