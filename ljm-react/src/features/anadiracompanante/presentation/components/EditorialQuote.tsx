export default function EditorialQuote() {
  return (
    <div className="group relative h-72 overflow-hidden rounded-xl border border-white/5 shadow-[0_40px_80px_rgba(2,13,39,0.5)]">
      <img
        alt="Vista al mar desde un ojo de buey"
        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[3000ms] group-hover:scale-105"
        src="/fotos/imagenfrase.png"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#030c1d]/70 via-black/25 to-[#06122c]/15" />
      <div className="absolute inset-0 flex items-center justify-center p-12">
        <p
          className="text-center text-2xl italic leading-relaxed text-[#dec29e] drop-shadow-2xl"
          style={{ fontFamily: "'Noto Serif', serif" }}
        >
          <>
            "La felicidad
            <br />
            solo es real
            <br />
            cuando se comparte"
          </>
        </p>
      </div>
    </div>
  );
}
