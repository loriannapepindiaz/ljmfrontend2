import { cardImages } from "./personalizarEstanciaData";
import BackButton from "../../../../components/BackButton";

const PersonalizarEstanciaHero = () => {
  return (
    <header className="relative flex min-h-[65vh] flex-col justify-center overflow-hidden">
      <img
        alt="Interior de yate de lujo"
        className="absolute inset-0 h-full w-full object-cover"
        src={cardImages.hero}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0e1a34] via-[#0e1a34]/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0e1a34]" />

      <BackButton />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 md:px-10 lg:px-16">
        <span className="mb-6 block text-[10px] font-bold uppercase tracking-[0.4em] text-[#eacea9]/80">
          Atelier de Experiencias
        </span>
        <h1 className="max-w-4xl font-display text-4xl font-light leading-[1.05] text-white md:text-6xl lg:text-7xl">
          Personaliza <span className="italic font-normal">tu Estancia</span>
        </h1>
        <p className="mt-8 max-w-2xl border-l border-[#eacea9]/20 pl-6 text-lg font-light italic leading-relaxed text-[#eacea9]/75">
          Cada detalle de su travesía es una oportunidad para la perfección.
        </p>
      </div>
    </header>
  );
};

export default PersonalizarEstanciaHero;
