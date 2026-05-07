import { useState, useRef, useEffect } from "react";
import type { BookingAnimalCompanionDraft } from "../../../../lib/bookingDraft";
import { cardImages, stayOptions } from "./personalizarEstanciaData";

type Props = {
  animalCompanion?: BookingAnimalCompanionDraft;
  enabledServices: Record<string, boolean>;
  onRegisterAnimal: (animal: BookingAnimalCompanionDraft) => void;
  onToggleService: (serviceId: string) => void;
};

const StayServicesSection = ({ animalCompanion, enabledServices, onRegisterAnimal, onToggleService }: Props) => (
  <section className="bg-[#0e1a34] py-24">
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 md:px-10 lg:grid-cols-2 lg:px-16">
      {stayOptions.map((option) => (
        <StayServiceCard
          animalCompanion={animalCompanion}
          key={option.id}
          active={enabledServices[option.id]}
          onRegisterAnimal={onRegisterAnimal}
          onToggleService={onToggleService}
          option={option}
        />
      ))}
    </div>
  </section>
);

type CardProps = {
  active: boolean;
  animalCompanion?: BookingAnimalCompanionDraft;
  onRegisterAnimal: (animal: BookingAnimalCompanionDraft) => void;
  onToggleService: (serviceId: string) => void;
  option: (typeof stayOptions)[number];
};

const emptyAnimalForm: BookingAnimalCompanionDraft = {
  nombre: "",
  tipoAnimal: "Perro",
  raza: "",
  pesoKg: "",
  unidadPeso: "kg",
  cuidadosEspeciales: "",
  certificadoNombre: "",
  certificadoTipo: "",
};

const animalOptions = ["Perro", "Gato"];

const breedOptions: Record<string, string[]> = {
  Perro: [
    "Labrador Retriever",
    "Golden Retriever",
    "Beagle",
    "Poodle",
    "Bulldog Frances",
    "Bulldog Ingles",
    "Shih Tzu",
    "Chihuahua",
    "Yorkshire Terrier",
    "Dachshund",
    "Schnauzer Miniatura",
    "Schnauzer Estandar",
    "Schnauzer Gigante",
    "Pastor Aleman",
    "Husky Siberiano",
    "Alaskan Malamute",
    "Samoyedo",
    "Border Collie",
    "Australian Shepherd",
    "Doberman",
    "Rottweiler",
    "Boxer",
    "Gran Danes",
    "San Bernardo",
    "Terranova",
    "Akita",
    "Shiba Inu",
    "Chow Chow",
    "Shar Pei",
    "Bichon Frise",
    "Maltese",
    "Pomerania",
    "Spitz Aleman",
    "Cocker Spaniel Ingles",
    "Cocker Spaniel Americano",
    "Springer Spaniel",
    "Basenji",
    "Whippet",
    "Galgo",
    "Borzoi",
    "Dalmatian",
    "Weimaraner",
    "Vizsla",
    "Rhodesian Ridgeback",
    "Cane Corso",
    "Dogo Argentino",
    "Pit Bull Terrier",
    "Staffordshire Bull Terrier",
    "Bull Terrier",
    "West Highland White Terrier",
    "Jack Russell Terrier",
    "Fox Terrier",
    "Cairn Terrier",
    "Scottish Terrier",
    "Airedale Terrier",
    "Basset Hound",
    "Bloodhound",
    "Pug",
    "Pekinese",
    "Lhasa Apso",
    "Tibetan Mastiff",
    "Cavalier King Charles Spaniel",
    "Bichon Havanero",
    "Papillon",
    "Affenpinscher",
    "Mestizo",
  ],
  Gato: [
    "Domestico de pelo corto",
    "Domestico de pelo largo",
    "Domestico de pelo medio",
    "Persa",
    "Persa Chinchilla",
    "Maine Coon",
    "Siames",
    "Siames Moderno",
    "Bengali",
    "Ragdoll",
    "Sphynx",
    "British Shorthair",
    "British Longhair",
    "Scottish Fold",
    "Scottish Straight",
    "Abisinio",
    "Somali",
    "Birmano",
    "Burmese",
    "Burmilla",
    "Ragamuffin",
    "Norwegian Forest Cat",
    "Siberian",
    "Turkish Angora",
    "Turkish Van",
    "Russian Blue",
    "Chartreux",
    "Korat",
    "Tonkinese",
    "Oriental Shorthair",
    "Oriental Longhair",
    "Balinese",
    "Javanese",
    "Devon Rex",
    "Cornish Rex",
    "Selkirk Rex",
    "LaPerm",
    "American Curl",
    "American Shorthair",
    "American Bobtail",
    "Japanese Bobtail",
    "Manx",
    "Pixiebob",
    "Egyptian Mau",
    "Ocicat",
    "Savannah",
    "Serengeti",
    "Chausie",
    "Peterbald",
    "Donskoy",
    "Lykoi",
    "Khao Manee",
    "Mestizo",
  ],
};

const RazaCombobox = ({
  breeds,
  value,
  onChange,
}: {
  breeds: string[];
  value: string;
  onChange: (v: string) => void;
}) => {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const filtered = query.trim()
    ? breeds.filter((b) => b.toLowerCase().includes(query.toLowerCase()))
    : breeds.slice(0, 4);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const select = (breed: string) => {
    setQuery(breed);
    onChange(breed);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <input
        className="h-12 w-full rounded-xl border border-white/8 bg-[#060f1e] px-4 text-sm text-white placeholder-white/25 outline-none transition focus:border-[#eacea9]/40"
        placeholder="Buscar raza..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
      />
      {open && filtered.length > 0 && (
        <ul className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 max-h-52 overflow-y-auto rounded-xl border border-white/10 bg-[#0d1b35] shadow-[0_16px_48px_rgba(0,0,0,0.6)] [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
          {filtered.map((breed) => (
            <li
              key={breed}
              onMouseDown={() => select(breed)}
              className={`cursor-pointer px-4 py-2.5 text-sm transition-colors hover:bg-[#eacea9]/10 hover:text-[#eacea9] ${
                breed === value ? "text-[#eacea9] bg-[#eacea9]/8" : "text-white/70"
              }`}
            >
              {breed}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const StayServiceCard = ({ active, animalCompanion, onRegisterAnimal, onToggleService, option }: CardProps) => {
  const initialImage = option.id === "pet-care" ? cardImages.pets : cardImages.welcome;
  const [imageSrc, setImageSrc] = useState(initialImage);
  const [showAnimalModal, setShowAnimalModal] = useState(false);
  const [animalForm, setAnimalForm] = useState<BookingAnimalCompanionDraft>(animalCompanion ?? emptyAnimalForm);
  const [certificatePreview, setCertificatePreview] = useState("");

  const handleToggle = () => {
    if (option.id !== "pet-care") {
      onToggleService(option.id);
      return;
    }

    if (active) {
      onToggleService(option.id);
      return;
    }

    setAnimalForm(animalCompanion ?? emptyAnimalForm);
    setCertificatePreview("");
    setShowAnimalModal(true);
  };

  const updateAnimalForm = (field: keyof BookingAnimalCompanionDraft, value: string) => {
    setAnimalForm((current) => ({
      ...current,
      [field]: value,
      ...(field === "tipoAnimal" ? { raza: "" } : {}),
    }));
  };

  const handleCertificateUpload = (file?: File) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setAnimalForm((current) => ({
        ...current,
        certificadoNombre: file.name,
        certificadoTipo: file.type,
      }));
      setCertificatePreview(typeof reader.result === "string" ? reader.result : "");
    };
    reader.readAsDataURL(file);
  };

  const confirmAnimalRegistration = () => {
    if (!animalForm.nombre.trim() || !animalForm.tipoAnimal.trim() || !animalForm.pesoKg.trim()) {
      return;
    }

    onRegisterAnimal({
      ...animalForm,
      nombre: animalForm.nombre.trim(),
      tipoAnimal: animalForm.tipoAnimal.trim(),
      raza: animalForm.raza.trim(),
      pesoKg: animalForm.pesoKg.trim(),
      unidadPeso: animalForm.unidadPeso ?? "kg",
      cuidadosEspeciales: animalForm.cuidadosEspeciales.trim(),
      certificadoNombre: animalForm.certificadoNombre.trim(),
      certificadoTipo: animalForm.certificadoTipo ?? "",
    });
    setShowAnimalModal(false);
  };

  return (
    <>
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
                className={`relative shrink-0 h-7 w-12 rounded-full transition-all duration-300 ${
                  active
                    ? "bg-[#c8a96e]"
                    : "bg-white/15"
                }`}
                onClick={handleToggle}
                type="button"
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-all duration-300 ${
                    active ? "left-[calc(100%-1.375rem)]" : "left-1"
                  }`}
                />
              </button>
            </div>

            <p className="text-sm font-light leading-relaxed text-[#eacea9]/72">{option.description}</p>
          </div>

          <span className="mt-8 text-[10px] font-bold uppercase tracking-[0.32em] text-[#eacea9]/60">
            {option.id === "pet-care" && animalCompanion
              ? `${option.activeDescription} | ${animalCompanion.nombre}`
              : option.activeDescription}
          </span>
        </div>
      </div>
    </article>
    {showAnimalModal ? (
      <div className="fixed inset-0 z-[140] flex items-center justify-center bg-[#060f1e]/80 px-4 py-8 backdrop-blur-md">
        <div className="max-h-[92vh] w-full max-w-[560px] overflow-y-auto rounded-3xl border border-[#eacea9]/12 bg-[#0d1b35] shadow-[0_40px_120px_rgba(0,0,0,0.7)] [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">

          {/* Header */}
          <div className="relative overflow-hidden rounded-t-3xl bg-gradient-to-br from-[#eacea9]/8 via-transparent to-transparent px-8 pt-8 pb-6 border-b border-white/5">
            <div className="absolute top-0 right-0 opacity-[0.04] pointer-events-none">
              <span className="material-symbols-outlined text-[120px] text-[#eacea9]">pets</span>
            </div>
            <span className="block text-[9px] font-bold uppercase tracking-[0.4em] text-[#eacea9]/50 mb-3">
              Protocolo de registro exclusivo
            </span>
            <h3 className="font-display text-3xl font-bold leading-tight text-[#eacea9]">
              Compañero Animal
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/50">
              Asegure el confort de su mascota en alta mar.
            </p>
          </div>

          <div className="px-8 pt-7 pb-8 space-y-6">
            {/* Row 1 — Nombre + Tipo */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2.5 block text-[9px] font-bold uppercase tracking-[0.22em] text-[#eacea9]/60">
                  Nombre
                </span>
                <input
                  className="h-12 w-full rounded-xl border border-white/8 bg-[#060f1e] px-4 text-sm text-white placeholder-white/25 outline-none transition focus:border-[#eacea9]/40 focus:bg-[#060f1e]"
                  onChange={(event) => updateAnimalForm("nombre", event.target.value)}
                  placeholder="Nombre de la mascota"
                  value={animalForm.nombre}
                />
              </label>
              <label className="block">
                <span className="mb-2.5 block text-[9px] font-bold uppercase tracking-[0.22em] text-[#eacea9]/60">
                  Tipo de animal
                </span>
                <select
                  className="h-12 w-full rounded-xl border border-white/8 bg-[#060f1e] px-4 text-sm text-white outline-none transition focus:border-[#eacea9]/40 appearance-none"
                  onChange={(event) => updateAnimalForm("tipoAnimal", event.target.value)}
                  value={animalForm.tipoAnimal}
                >
                  {animalOptions.map((animal) => (
                    <option key={animal}>{animal}</option>
                  ))}
                </select>
              </label>
            </div>

            {/* Row 2 — Raza + Peso */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="block">
                <span className="mb-2.5 block text-[9px] font-bold uppercase tracking-[0.22em] text-[#eacea9]/60">
                  Raza
                </span>
                <RazaCombobox
                  breeds={breedOptions[animalForm.tipoAnimal] ?? []}
                  value={animalForm.raza}
                  onChange={(v) => updateAnimalForm("raza", v)}
                />
              </div>
              <label className="block">
                <span className="mb-2.5 block text-[9px] font-bold uppercase tracking-[0.22em] text-[#eacea9]/60">
                  Peso
                </span>
                <div className="flex gap-0">
                  <input
                    className="h-12 min-w-0 flex-1 rounded-l-xl border border-r-0 border-white/8 bg-[#060f1e] px-4 text-sm text-white placeholder-white/25 outline-none transition focus:border-[#eacea9]/40"
                    inputMode="decimal"
                    onChange={(event) => updateAnimalForm("pesoKg", event.target.value)}
                    placeholder="0"
                    value={animalForm.pesoKg}
                  />
                  <select
                    className="h-12 w-20 shrink-0 rounded-r-xl border border-white/8 bg-[#060f1e] px-3 text-sm text-white outline-none transition focus:border-[#eacea9]/40 appearance-none"
                    onChange={(event) => updateAnimalForm("unidadPeso", event.target.value)}
                    value={animalForm.unidadPeso ?? "kg"}
                  >
                    <option value="kg">kg</option>
                    <option value="lb">lb</option>
                  </select>
                </div>
              </label>
            </div>

            {/* Cuidados */}
            <label className="block">
              <span className="mb-2.5 block text-[9px] font-bold uppercase tracking-[0.22em] text-[#eacea9]/60">
                Cuidados especiales y necesidades alimentarias
              </span>
              <textarea
                className="min-h-[96px] w-full resize-none rounded-xl border border-white/8 bg-[#060f1e] px-4 py-3.5 text-sm text-white placeholder-white/25 outline-none transition focus:border-[#eacea9]/40"
                onChange={(event) => updateAnimalForm("cuidadosEspeciales", event.target.value)}
                placeholder="Detalle cualquier requerimiento especial o alérgico..."
                value={animalForm.cuidadosEspeciales}
              />
            </label>

            {/* Certificado */}
            <label className="block cursor-pointer">
              <span className="mb-2.5 block text-[9px] font-bold uppercase tracking-[0.22em] text-[#eacea9]/60">
                Certificado médico
              </span>
              <div className="flex min-h-[100px] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[#eacea9]/20 bg-[#060f1e]/60 px-6 py-5 text-center transition hover:border-[#eacea9]/35 hover:bg-[#060f1e]/80">
                <div className="size-10 rounded-xl bg-[#eacea9]/8 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl text-[#eacea9]/60">upload_file</span>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-white/70">
                    {animalForm.certificadoNombre || "Cargar certificado médico oficial"}
                  </p>
                  <p className="mt-0.5 text-[9px] text-white/35">PDF, JPG o PNG · máx. 5 MB</p>
                </div>
                {certificatePreview && animalForm.certificadoTipo?.startsWith("image/") ? (
                  <img
                    alt="Vista previa del certificado"
                    className="mt-1 h-16 w-20 rounded-lg object-cover"
                    src={certificatePreview}
                  />
                ) : certificatePreview ? (
                  <span className="rounded-full bg-[#eacea9]/10 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-[#eacea9]">
                    Documento cargado
                  </span>
                ) : null}
                <input
                  className="hidden"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(event) => handleCertificateUpload(event.target.files?.[0])}
                />
              </div>
            </label>

            {/* Buttons */}
            <div className="flex gap-3 pt-1">
              <button
                className="flex-1 h-13 rounded-xl bg-[#eacea9] py-3.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#060f1e] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={!animalForm.nombre.trim() || !animalForm.tipoAnimal.trim() || !animalForm.pesoKg.trim()}
                onClick={confirmAnimalRegistration}
                type="button"
              >
                Confirmar registro
              </button>
              <button
                className="h-13 rounded-xl border border-white/10 bg-white/4 px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#eacea9]/70 transition hover:bg-white/8"
                onClick={() => setShowAnimalModal(false)}
                type="button"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    ) : null}
    </>
  );
};

export default StayServicesSection;
