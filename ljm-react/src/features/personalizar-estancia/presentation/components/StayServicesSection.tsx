import { useState } from "react";
import { cardImages, stayOptions } from "./personalizarEstanciaData";

type Props = {
  enabledServices: Record<string, boolean>;
  onToggleService: (serviceId: string) => void;
};

const StayServicesSection = ({ enabledServices, onToggleService }: Props) => (
  <section className="bg-[#0e1a34] py-24">
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 md:px-10 lg:grid-cols-2 lg:px-16">
      {stayOptions.map((option) => (
        <StayServiceCard
          key={option.id}
          active={enabledServices[option.id]}
          onToggleService={onToggleService}
          option={option}
        />
      ))}
    </div>
  </section>
);

type CardProps = {
  active: boolean;
  onToggleService: (serviceId: string) => void;
  option: (typeof stayOptions)[number];
};

const StayServiceCard = ({ active, onToggleService, option }: CardProps) => {
  const initialImage = option.id === "pet-care" ? cardImages.pets : cardImages.welcome;
  const [imageSrc, setImageSrc] = useState(initialImage);

  return (
    <article className="overflow-hidden rounded-[28px] border border-[#eacea9]/15 bg-[#eacea9]/5 backdrop-blur-md transition duration-500 hover:-translate-y-1 hover:bg-[#eacea9]/10">
      <div className="flex h-full flex-col md:flex-row">
        <div className="min-h-[220px] w-full md:w-2/5">
          <img
            alt={option.label}
            className="h-full w-full object-cover"
            onError={() => {
              if (option.id === "pet-care" && imageSrc !== cardImages.petsFallback) {
                setImageSrc(cardImages.petsFallback);
              }
            }}
            src={imageSrc}
          />
        </div>

        <div className="flex w-full flex-col justify-between p-8 md:w-3/5">
          <div>
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl text-white">{option.label}</h2>
                <p className="mt-2 text-xs uppercase tracking-[0.25em] text-[#eacea9]/45">
                  Servicio personalizable
                </p>
              </div>

              <button
                aria-label={`Activar ${option.label}`}
                aria-pressed={active}
                className={`relative h-7 w-14 rounded-full border transition ${
                  active
                    ? "border-[#eacea9]/50 bg-[#eacea9]/30"
                    : "border-[#eacea9]/15 bg-[#eacea9]/10"
                }`}
                onClick={() => onToggleService(option.id)}
                type="button"
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-[#eacea9] transition ${
                    active ? "left-8" : "left-1"
                  }`}
                />
              </button>
            </div>

            <p className="text-sm font-light leading-relaxed text-[#eacea9]/72">{option.description}</p>
          </div>

          <span className="mt-8 text-[10px] font-bold uppercase tracking-[0.32em] text-[#eacea9]/60">
            {option.activeDescription}
          </span>
        </div>
      </div>
    </article>
  );
};

export default StayServicesSection;
