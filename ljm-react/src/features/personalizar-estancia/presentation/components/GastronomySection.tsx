import { allergyOptions, dietaryOptions } from "./personalizarEstanciaData";

type Props = {
  additionalRequirements: string;
  selectedAllergies: string[];
  selectedDiet: string;
  setAdditionalRequirements: (value: string) => void;
  setSelectedDiet: (value: string) => void;
  toggleAllergy: (allergyId: string) => void;
};

const GastronomySection = ({
  additionalRequirements,
  selectedAllergies,
  selectedDiet,
  setAdditionalRequirements,
  setSelectedDiet,
  toggleAllergy,
}: Props) => (
  <section className="bg-[#06122c] py-24">
    <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-24">
        <aside className="space-y-12 lg:col-span-4">
          <div>
            <span className="mb-6 block text-[10px] font-bold uppercase tracking-[0.35em] text-[#eacea9]/55">
              02. Nutricion y placer
            </span>
            <h2 className="font-display text-4xl leading-tight text-white md:text-5xl">
              Gastronomia
              <br />
              <span className="font-light italic">Personalizada</span>
            </h2>
            <p className="mt-8 text-base font-light leading-relaxed text-[#eacea9]/60">
              Nuestra cocina de autor se adapta a su estilo de vida. Defina sus preferencias para que nuestro
              chef disene un menu exclusivo para usted.
            </p>
          </div>

          <div className="overflow-hidden rounded-[28px] border border-[#eacea9]/15 bg-[#eacea9]/5 p-8 backdrop-blur-md">
            <h3 className="font-display text-2xl italic text-[#eacea9]">Compromiso de Excelencia</h3>
            <p className="mt-4 text-sm font-light leading-relaxed text-[#eacea9]/65">
              Cada detalle de su estancia es curado por nuestro Concierge personal. Desde la seleccion de
              ingredientes hasta la atmosfera de su suite, buscamos convertir su vision en una experiencia sublime.
            </p>
          </div>
        </aside>

        <div className="space-y-20 lg:col-span-8">
          <div>
            <h3 className="mb-8 text-xs font-bold uppercase tracking-[0.28em] text-[#eacea9]/80">
              Regimen alimenticio
            </h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
              {dietaryOptions.map((option) => {
                const active = selectedDiet === option;

                return (
                  <button
                    key={option}
                    className={`rounded-full px-6 py-4 text-center text-[10px] font-bold uppercase tracking-[0.2em] transition ${
                      active
                        ? "bg-gradient-to-r from-[#eacea9] to-[#dec29e] text-[#0e1a34]"
                        : "border border-[#eacea9]/12 text-[#eacea9]/60 hover:border-[#eacea9]/30"
                    }`}
                    onClick={() => setSelectedDiet(option)}
                    type="button"
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="mb-8 text-xs font-bold uppercase tracking-[0.28em] text-[#eacea9]/80">
              Alergias e intolerancias
            </h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {allergyOptions.map((option) => {
                const active = selectedAllergies.includes(option.id);

                return (
                  <button
                    key={option.id}
                    className={`flex h-full min-h-[132px] flex-col items-center justify-center gap-4 rounded-[22px] border p-6 text-center transition ${
                      active
                        ? "border-[#eacea9]/40 bg-[#eacea9]/12"
                        : "border-transparent bg-[#eacea9]/4 hover:bg-[#eacea9]/10"
                    }`}
                    onClick={() => toggleAllergy(option.id)}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-3xl text-[#eacea9]/55">{option.icon}</span>
                    <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#eacea9]/90">
                      {option.label}
                    </span>
                  </button>
                );
              })}

              <button
                className="flex h-full min-h-[132px] flex-col items-center justify-center gap-4 rounded-[22px] border border-dashed border-[#eacea9]/20 bg-transparent p-6 text-center transition hover:bg-[#eacea9]/6"
                onClick={() =>
                  setAdditionalRequirements(
                    additionalRequirements
                      ? `${additionalRequirements}\n- Otra alergia o sensibilidad por especificar`
                      : "- Otra alergia o sensibilidad por especificar",
                  )
                }
                type="button"
              >
                <span className="material-symbols-outlined text-3xl text-[#eacea9]/55">add</span>
                <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#eacea9]/90">
                  Otros
                </span>
              </button>
            </div>
          </div>

          <div>
            <h3 className="mb-8 text-xs font-bold uppercase tracking-[0.28em] text-[#eacea9]/80">
              Requerimientos adicionales
            </h3>
            <textarea
              className="min-h-[200px] w-full rounded-[28px] border border-[#eacea9]/10 bg-[#eacea9]/4 p-8 text-lg font-light text-[#eacea9] outline-none transition placeholder:text-[#eacea9]/25 focus:border-[#eacea9]/35 focus:bg-[#eacea9]/6"
              onChange={(event) => setAdditionalRequirements(event.target.value)}
              placeholder="Indique aqui cualquier detalle especifico o preferencia culinaria..."
              value={additionalRequirements}
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default GastronomySection;
