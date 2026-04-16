import { ShieldCheck } from "lucide-react";

const companions = ["Maria Vascotto", "Lucia Vascotto"];

export default function InvoiceSidebar() {
  return (
    <aside className="w-full space-y-8 border-b border-slate-100 pb-8 md:w-1/4 md:border-b-0 md:border-r md:pb-0 md:pr-8">
      <div>
        <h3 className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[#eacea9]">
          Address
        </h3>
        <div className="space-y-0.5 text-[11px] leading-relaxed text-slate-600">
          <p>Residence 402, Quai Jean-Charles Rey</p>
          <p>Monaco, Monte Carlo 98000</p>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[#eacea9]">
          Acompanantes
        </h3>
        <div className="space-y-1 text-[11px] leading-relaxed text-slate-600">
          {companions.map((name) => (
            <div key={name} className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-[#eacea9]" />
              <p>{name}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[#eacea9]">
          Voyage
        </h3>
        <div className="text-[11px] leading-relaxed text-slate-600">
          <p className="text-[10px] font-bold uppercase text-[#0e1a34]">Suite Imperial Atlantis</p>
          <p>07 Nights • Premium Deck</p>
        </div>
      </div>

      <div className="pt-4">
        <div className="relative mx-auto h-28 w-28 opacity-60">
          <div className="absolute inset-0 rounded-full border border-[#0e1a34]/20" />
          <div className="absolute inset-2 rounded-full border border-dashed border-[#0e1a34]/30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <ShieldCheck className="text-[#eacea9]" size={34} />
          </div>
          <div
            className="absolute inset-0 flex items-start justify-center text-center text-[6px] font-bold uppercase tracking-[0.35em] text-[#0e1a34]"
            style={{ fontFamily: "'Public Sans', sans-serif" }}
          >
            <span className="mt-3 block w-20">LJM Sealine Official Registry</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
