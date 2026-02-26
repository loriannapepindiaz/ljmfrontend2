// features/destination/details/presentation/components/VoyageSpecs.tsx
export default function VoyageSpecs() {
  return (
    <div className="grid grid-cols-2 gap-8 py-8 border-y border-white/10">
      <div>
        <p className="text-[11px] font-bold text-primary tracking-widest uppercase mb-2">Duration</p>
        <p className="text-xl font-medium text-white flex items-center gap-3">
          <span className="material-symbols-outlined text-pearl-beige">schedule</span>
          8 Days / 7 Nights
        </p>
      </div>
      <div>
        <p className="text-[11px] font-bold text-primary tracking-widest uppercase mb-2">Departure Port</p>
        <p className="text-xl font-medium text-white flex items-center gap-3">
          <span className="material-symbols-outlined text-pearl-beige">anchor</span>
          Athens (Piraeus)
        </p>
      </div>
    </div>
  );
}