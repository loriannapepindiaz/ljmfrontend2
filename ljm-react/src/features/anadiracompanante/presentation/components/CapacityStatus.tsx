const MAX = 8;

export default function CapacityStatus({ count = 0 }: { count?: number }) {
  const pct = Math.min((count / MAX) * 100, 100);

  return (
    <div className="rounded-xl border border-white/5 bg-[#1e2944]/20 p-8">
      <div className="mb-6 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-widest text-[#8f9098]">Capacidad del Navío</span>
        <span className="text-xl italic leading-none text-[#dec29e]" style={{ fontFamily: "'Noto Serif', serif" }}>
          {count} / {MAX}
        </span>
      </div>

      <div className="h-[2px] w-full overflow-hidden rounded-full bg-[#29344f]">
        <div
          className="h-full bg-[#dec29e] transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
