import { Link } from "react-router-dom";
import { allergyOptions, cardImages } from "./personalizarEstanciaData";
import type { SummaryData } from "./types";

type Props = {
  summary: SummaryData;
};

const PersonalizarEstanciaHero = ({ summary }: Props) => {
  const allergyLabels = allergyOptions
    .filter((option) => summary.allergies.includes(option.id))
    .map((option) => option.label);

  return (
    <header className="relative flex min-h-[65vh] flex-col justify-center overflow-hidden">
      <img
        alt="Interior de yate de lujo"
        className="absolute inset-0 h-full w-full object-cover"
        src={cardImages.hero}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0e1a34] via-[#0e1a34]/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0e1a34]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 md:px-10 lg:px-16">
        <Link
          className="mb-10 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.35em] text-[#eacea9]/70 transition hover:text-[#eacea9]"
          to="/details-suit"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Volver a detalles de viaje
        </Link>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <span className="mb-6 block text-[10px] font-bold uppercase tracking-[0.4em] text-[#eacea9]/80">
              Atelier de Experiencias
            </span>
            <h1 className="max-w-4xl font-display text-4xl font-light leading-[1.05] text-white md:text-6xl lg:text-7xl">
              Personaliza <span className="italic font-normal">tu Estancia</span>
            </h1>
            <p className="mt-8 max-w-2xl border-l border-[#eacea9]/20 pl-6 text-lg font-light italic leading-relaxed text-[#eacea9]/75">
              Cada detalle de su travesia es una oportunidad para la perfeccion.
            </p>
          </div>

          <div className="lg:col-span-4 lg:self-end">
            <div className="rounded-[28px] border border-[#eacea9]/15 bg-[#eacea9]/5 p-6 backdrop-blur-md">
              <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#eacea9]/60">
                Resumen actual
              </p>
              <div className="mt-5 space-y-4 text-sm text-[#f4ead8]">
                <p>
                  <span className="font-semibold text-white">Servicios:</span>{" "}
                  {summary.services.length > 0 ? summary.services.join(", ") : "Sin extras seleccionados"}
                </p>
                <p>
                  <span className="font-semibold text-white">Almohada:</span> {summary.pillow}
                </p>
                <p>
                  <span className="font-semibold text-white">Regimen:</span> {summary.diet}
                </p>
                <p>
                  <span className="font-semibold text-white">Alergias:</span>{" "}
                  {allergyLabels.length > 0 ? allergyLabels.join(", ") : "Ninguna indicada"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PersonalizarEstanciaHero;
