export default function CapacityStatus() {
  return (
    <div className="rounded-xl border border-white/5 bg-[#1e2944]/20 p-8">
      <div className="mb-6 flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-widest text-[#8f9098]">Capacidad del Navio</span>
        <span className="text-xl italic leading-none text-[#dec29e]" style={{ fontFamily: "'Noto Serif', serif" }}>
          3 / 8
        </span>
      </div>

      <div className="h-[2px] w-full overflow-hidden rounded-full bg-[#29344f]">
        <div className="h-full w-[37.5%] bg-[#dec29e]" />
      </div>
    </div>
  );
}
