type Props = {
  specialRequest: string;
  setSpecialRequest: (value: string) => void;
};

const SpecialRequestSection = ({ specialRequest, setSpecialRequest }: Props) => (
  <section className="bg-[#e8e9eb] py-24 text-center text-[#0e1a34]">
    <div className="mx-auto max-w-3xl px-6 md:px-10">
      <h2 className="font-display text-4xl md:text-5xl">Desea algo mas?</h2>
      <p className="mx-auto mt-6 max-w-2xl text-base font-light text-[#0e1a34]/70">
        Nuestro equipo esta dedicado a satisfacer hasta el mas minimo capricho. No dude en detallar cualquier
        peticion especial.
      </p>
      <textarea
        className="mt-10 min-h-[170px] w-full rounded-[28px] border border-[#0e1a34]/10 bg-white/55 p-8 text-lg font-light text-[#0e1a34] outline-none transition placeholder:text-[#0e1a34]/35 focus:border-[#0e1a34]/35 focus:bg-white/85"
        onChange={(event) => setSpecialRequest(event.target.value)}
        placeholder="Escriba aqui sus peticiones especiales..."
        value={specialRequest}
      />
    </div>
  </section>
);

export default SpecialRequestSection;
