import { pillowOptions } from "./personalizarEstanciaData";

type Props = {
  selectedPillow: string;
  onSelectPillow: (pillowId: string) => void;
};

const PillowSection = ({ selectedPillow, onSelectPillow }: Props) => (
  <section className="bg-[#e8e9eb] py-24 text-[#0e1a34]">
    <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <span className="mb-6 block text-[10px] font-bold uppercase tracking-[0.35em] text-[#0e1a34]/60">
            01. Descanso sublime
          </span>
          <h2 className="font-display text-4xl leading-tight md:text-5xl">
            Menu de
            <br />
            <span className="font-light italic">Almohadas</span>
          </h2>
          <p className="mt-6 max-w-sm text-base font-light leading-relaxed text-[#0e1a34]/70">
            Personalice su descanso seleccionando la firmeza y textura que mejor se adapte a su fisionomia.
          </p>
        </div>

        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {pillowOptions.map((option) => {
              const active = selectedPillow === option.id;

              return (
                <button
                  key={option.id}
                  className={`rounded-[28px] border p-10 text-center transition ${
                    active
                      ? "border-[#0e1a34] bg-[#0e1a34]/10 shadow-[0_20px_50px_rgba(14,26,52,0.12)]"
                      : "border-[#0e1a34]/10 bg-white/35 hover:-translate-y-1 hover:bg-white/60"
                  }`}
                  onClick={() => onSelectPillow(option.id)}
                  type="button"
                >
                  <span
                    className={`material-symbols-outlined mb-6 block text-4xl ${
                      active ? "text-[#0e1a34]" : "text-[#0e1a34]/40"
                    }`}
                  >
                    {option.icon}
                  </span>
                  <h3 className="text-[11px] font-black uppercase tracking-[0.28em] text-[#0e1a34]">
                    {option.label}
                  </h3>
                  <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-[#0e1a34]/60">
                    {option.description}
                  </p>
                  <span
                    className={`mt-8 inline-block h-4 w-4 rounded-full border-2 ${
                      active ? "border-[#0e1a34] bg-[#0e1a34]" : "border-[#0e1a34]/25"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default PillowSection;
