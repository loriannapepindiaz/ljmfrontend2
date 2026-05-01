import { useEffect, useState } from "react";

const ConfirmationHero = () => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setChecked(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="space-y-4 flex flex-col items-center">
      <div
        className={`inline-flex items-center justify-center w-20 h-20 rounded-full border transition-all duration-700 ease-out mb-4 ${
          checked
            ? "border-[#c8a96e]/40 bg-[#c8a96e]/20 scale-100 opacity-100"
            : "border-white/10 bg-transparent scale-75 opacity-0"
        }`}
      >
        <span
          className={`material-symbols-outlined text-[#c8a96e] text-4xl transition-all duration-500 delay-300 ${
            checked ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          check_circle
        </span>
      </div>

      <h1
        className={`text-4xl md:text-5xl font-headline font-bold text-white tracking-tight leading-tight transition-all duration-700 delay-500 ${
          checked ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        ¡Reserva Confirmada!
      </h1>

      <p
        className={`text-lg md:text-xl text-white/70 max-w-xl mx-auto font-body font-light transition-all duration-700 delay-700 ${
          checked ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        Tu viaje a bordo de{" "}
        <span className="text-[#c8a96e] font-medium">The Majestic Pearl</span> comienza pronto.
      </p>
    </section>
  );
};

export default ConfirmationHero;