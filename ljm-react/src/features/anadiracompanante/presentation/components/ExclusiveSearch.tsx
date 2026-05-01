import { Search } from "lucide-react";

export default function ExclusiveSearch() {
  return (
    <section className="space-y-6">
      <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#dec29e]">Busqueda Exclusiva</h4>

      <div className="flex flex-col gap-3 md:flex-row">
        <div className="group flex flex-1 items-center rounded-lg border border-white/5 bg-[#1e2944]/40 transition-all duration-300 focus-within:bg-[#1e2944]/60">
          <div className="flex items-center justify-center pl-6 pr-3">
            <Search className="text-[#8f9098]" size={20} />
          </div>
          <input
            className="w-full border-none bg-transparent py-4 text-base font-light text-[#d9e2ff] placeholder:text-[#8f9098]/40 focus:ring-0 md:text-lg"
            placeholder="Buscar miembro por nombre o ID de socio..."
            type="text"
          />
        </div>

        <button
          className="flex shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[#29344f] px-8 py-4 text-[11px] uppercase tracking-[0.2em] text-[#d9e2ff] transition-all hover:bg-[#3b4663]"
          type="button"
        >
          Buscar
        </button>
      </div>
    </section>
  );
}
