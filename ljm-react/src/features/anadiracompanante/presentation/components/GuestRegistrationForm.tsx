import { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import type { Guest } from "../types";

const empty = (): Guest => ({ nombre: "", apellidos: "", fecha: null, pasaporte: "" });

interface Props {
  guests: Guest[];
  setGuests: React.Dispatch<React.SetStateAction<Guest[]>>;
}

interface DateTriggerProps {
  displayValue?: string;
  onClick?: () => void;
}

const DateTrigger = forwardRef<HTMLButtonElement, DateTriggerProps & { value?: string }>(function DateTrigger(
  { displayValue, value, onClick },
  ref,
) {
  const shown = displayValue || value;
  return (
    <button
      ref={ref}
      className={[
        "flex w-full items-center justify-between rounded-none",
        "border-x-0 border-b border-t-0 border-[#45464d]/30 bg-transparent",
        "px-4 py-3 text-left text-sm transition-colors",
        "focus:border-[#C5A059] focus:outline-none focus:ring-0",
      ].join(" ")}
      type="button"
      onClick={onClick}
    >
      <span
        className={
          shown
            ? "font-serif tracking-[0.04em] text-[#f5e2bd]"
            : "text-[#8f9098]/60 italic text-[13px]"
        }
      >
        {shown || "Selecciona una fecha"}
      </span>
      <span className="material-symbols-outlined text-[18px] text-[#C5A059]">calendar_month</span>
    </button>
  );
});

export default function GuestRegistrationForm({ setGuests }: Props) {
  const navigate = useNavigate();
  const [form, setForm] = useState<Guest>(empty());

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

  const inputClass = [
    "w-full rounded-none border-x-0 border-b border-t-0 border-[#45464d]/30 bg-transparent",
    "px-4 py-3 text-sm text-[#d9e2ff] transition-colors",
    "placeholder:text-[#8f9098]/60",
    "focus:border-[#C5A059] focus:outline-none focus:ring-0",
  ].join(" ");

  const labelClass = "block text-[10px] uppercase tracking-[0.25em] text-[#8f9098]";

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

        .guest-datepicker-popper {
          z-index: 40;
        }

        .guest-datepicker {
          overflow: hidden;
          border: 1px solid rgba(197, 160, 89, 0.2);
          border-radius: 16px;
          background: #ffffff;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          font-family: inherit;
        }

        .guest-datepicker .react-datepicker__triangle {
          display: none;
        }

        .guest-datepicker .react-datepicker__header {
          border-bottom: 1px solid rgba(197, 160, 89, 0.1);
          background: transparent;
          padding-top: 14px;
        }

        .guest-datepicker .react-datepicker__current-month,
        .guest-datepicker .react-datepicker-time__header,
        .guest-datepicker .react-datepicker-year-header {
          color: #C5A059;
          font-size: 0.875rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .guest-datepicker .react-datepicker__navigation {
          top: 14px;
        }

        .guest-datepicker .react-datepicker__navigation-icon::before {
          border-color: #C5A059;
        }

        .guest-datepicker .react-datepicker__navigation:hover .react-datepicker__navigation-icon::before {
          border-color: #a07d3a;
        }

        .guest-datepicker .react-datepicker__day-name {
          color: #9CA3AF;
          width: 2.2rem;
          line-height: 2.2rem;
          margin: 0.1rem;
          font-size: 0.7rem;
          text-transform: uppercase;
        }

        .guest-datepicker .react-datepicker__day {
          width: 2.2rem;
          line-height: 2.2rem;
          margin: 0.1rem;
          border-radius: 50%;
          color: #333333;
          font-weight: 500;
          transition: background-color 120ms ease, color 120ms ease;
        }

        .guest-datepicker .react-datepicker__day:hover {
          background: #F5E6D3;
          color: #C5A059;
        }

        .guest-datepicker .react-datepicker__day--keyboard-selected {
          background: #F5E6D3;
          color: #C5A059;
        }

        .guest-datepicker .react-datepicker__day--selected,
        .guest-datepicker .react-datepicker__day--selected:hover {
          background: #C5A059;
          color: #ffffff;
          font-weight: 700;
        }

        .guest-datepicker .react-datepicker__day--outside-month {
          color: #D1D5DB;
        }

        .guest-datepicker .react-datepicker__day--today {
          border: 1px solid rgba(197, 160, 89, 0.5);
          color: #C5A059;
          font-weight: 600;
        }

        .guest-datepicker .react-datepicker__day--today.react-datepicker__day--selected {
          border: none;
          color: #ffffff;
        }

        .guest-datepicker .react-datepicker__month-container {
          background: transparent;
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
            <div className="w-full">
            <DatePicker
              calendarClassName="guest-datepicker"
              customInput={
                <DateTrigger
                  displayValue={
                    form.fecha
                      ? form.fecha.toLocaleDateString("es-ES", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                      : ""
                  }
                />
              }
              dateFormat="dd/MM/yyyy"
              maxDate={new Date()}
              placeholderText="Selecciona una fecha"
              popperClassName="guest-datepicker-popper"
              selected={form.fecha}
              shouldCloseOnSelect
              showPopperArrow={false}
              onChange={(date) => setForm((f) => ({ ...f, fecha: date }))}
            />
            </div>
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
              onClick={() => navigate("/destinations")}
              type="button"
              style={{ fontFamily: "'Noto Serif', serif", fontSize: "13px", letterSpacing: "0.15em" }}
            >
              Personaliza tu Estancia
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
