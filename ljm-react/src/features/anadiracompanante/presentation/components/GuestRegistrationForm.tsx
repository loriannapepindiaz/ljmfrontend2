import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveBookingDraftToBackend } from "../../../../lib/bookingDraft";
import type { Guest } from "../types";

const empty = (): Guest => ({ nombre: "", apellidos: "", fecha: null, pasaporte: "" });

interface Props {
  guests: Guest[];
  setGuests: React.Dispatch<React.SetStateAction<Guest[]>>;
}

export default function GuestRegistrationForm({ guests, setGuests }: Props) {
  const navigate = useNavigate();
  const [form, setForm] = useState<Guest>(empty());
  const [isSaving, setIsSaving] = useState(false);

  const canAdd =
    form.nombre.trim() !== "" &&
    form.apellidos.trim() !== "" &&
    form.pasaporte.trim() !== "" &&
    form.fecha != null;

  const agregar = () => {
    if (!canAdd) return;
    setGuests((g) => [...g, form]);
    setForm(empty());
  };

  const continueToPersonalize = async () => {
    if (isSaving) return;

    const nextGuests = canAdd ? [...guests, form] : guests;
    const companions = nextGuests.map((guest) => ({
      nombre: guest.nombre,
      apellidos: guest.apellidos,
      fecha: guest.fecha ? guest.fecha.toISOString() : null,
      pasaporte: guest.pasaporte,
    }));

    setIsSaving(true);
    if (canAdd) {
      setGuests(nextGuests);
      setForm(empty());
    }

    await saveBookingDraftToBackend({ companions });
    setIsSaving(false);
    navigate("/personalizar-estancia");
  };

  const inputClass = [
    "w-full rounded-none border-x-0 border-b border-t-0 border-[#45464d]/30 bg-transparent",
    "px-4 py-3 text-sm text-[#d9e2ff] transition-colors",
    "placeholder:text-[#8f9098]/60",
    "focus:border-[#C5A059] focus:outline-none focus:ring-0",
  ].join(" ");

  const labelClass = "block text-[10px] uppercase tracking-[0.25em] text-[#8f9098]";
  const nativeDateValue = form.fecha ? form.fecha.toISOString().slice(0, 10) : "";

  return (
    <>
      <style>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px #06122c inset !important;
          -webkit-text-fill-color: #d9e2ff !important;
          caret-color: #d9e2ff;
        }

        .guest-native-date {
          color-scheme: dark;
          color: #d9e2ff !important;
        }

        .guest-native-date::-webkit-calendar-picker-indicator {
          cursor: pointer;
          filter: invert(74%) sepia(28%) saturate(714%) hue-rotate(2deg) brightness(88%) contrast(87%);
        }
      `}</style>

      <section className="space-y-10 rounded-xl border border-white/5 bg-[#1e2944]/20 p-8 md:p-12">
        <h3 className="text-3xl text-[#d9e2ff]" style={{ fontFamily: "'Noto Serif', serif" }}>
          Registro de Invitado
        </h3>

        <form
          className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            agregar();
          }}
        >
          <div className="space-y-3">
            <label className={labelClass}>Nombre</label>
            <input
              className={inputClass}
              placeholder="Ej. Isabella"
              type="text"
              autoComplete="off"
              value={form.nombre}
              onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
            />
          </div>

          <div className="space-y-3">
            <label className={labelClass}>Apellidos</label>
            <input
              className={inputClass}
              placeholder="Ej. Valderrama"
              type="text"
              autoComplete="off"
              value={form.apellidos}
              onChange={(e) => setForm((f) => ({ ...f, apellidos: e.target.value }))}
            />
          </div>

          <div className="space-y-3">
            <label className={labelClass}>Fecha de Nacimiento</label>
            <input
              className={`${inputClass} guest-native-date rounded-md border border-[#45464d]/50 bg-[#07142f]`}
              max={new Date().toISOString().slice(0, 10)}
              type="date"
              value={nativeDateValue}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  fecha: e.target.value ? new Date(`${e.target.value}T00:00:00`) : null,
                }))
              }
            />
          </div>

          <div className="space-y-3">
            <label className={labelClass}>ID / Pasaporte</label>
            <input
              className={inputClass}
              placeholder="P-00000000"
              type="text"
              autoComplete="off"
              value={form.pasaporte}
              onChange={(e) => setForm((f) => ({ ...f, pasaporte: e.target.value }))}
            />
          </div>

          <div className="flex flex-col gap-4 pt-6 md:col-span-2 md:flex-row md:items-center md:justify-between">
            <button
              className={`min-w-[200px] rounded-md px-10 py-4 shadow-lg transition-all ${
                canAdd
                  ? "bg-[#dec29e] text-[#3e2d14] hover:brightness-110 active:scale-95"
                  : "cursor-not-allowed bg-white/5 text-white/25"
              }`}
              style={{ fontFamily: "'Noto Serif', serif", fontSize: "13px", letterSpacing: "0.15em" }}
              type="submit"
            >
              Anadir a la Lista
            </button>

            <button
              className="min-w-[260px] rounded-md border border-[#dec29e]/35 bg-[#dec29e]/12 px-8 py-4 text-[#f5e2bd] shadow-lg transition-all hover:bg-[#dec29e]/20 active:scale-95"
              disabled={isSaving}
              onClick={continueToPersonalize}
              type="button"
              style={{ fontFamily: "'Noto Serif', serif", fontSize: "13px", letterSpacing: "0.15em" }}
            >
              {isSaving ? "Guardando..." : "Personaliza tu Estancia"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
