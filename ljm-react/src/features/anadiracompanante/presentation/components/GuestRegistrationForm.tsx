import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Guest } from "../types";

/* ─── Calendar ──────────────────────────────────────────────────── */
const MONTHS_ES = [
  "Enero","Febrero","Marzo","Abril","Mayo","Junio",
  "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre",
];
const DAYS_ES = ["Lu","Ma","Mi","Ju","Vi","Sá","Do"];

function CalendarPicker({ value, onChange }: {
  value: Date | null;
  onChange: (d: Date) => void;
}) {
  const [open, setOpen]     = useState(false);
  const [view, setView]     = useState(new Date());
  const [openUp, setOpenUp] = useState(false);
  const wrapRef    = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleOpen = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setOpenUp(rect.bottom + 340 > window.innerHeight);
    }
    setOpen(o => !o);
  };

  const pick = (d: number) => {
    onChange(new Date(view.getFullYear(), view.getMonth(), d));
    setOpen(false);
  };

  const year  = view.getFullYear();
  const month = view.getMonth();
  const firstDow    = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Array.from({ length: firstDow + daysInMonth }, (_, i) =>
    i < firstDow ? null : i - firstDow + 1
  );

  const isSelected = (d: number) =>
    value != null &&
    value.getDate() === d &&
    value.getMonth() === month &&
    value.getFullYear() === year;

  const isToday = (d: number) => {
    const t = new Date();
    return t.getDate() === d && t.getMonth() === month && t.getFullYear() === year;
  };

  const label = value
    ? `${String(value.getDate()).padStart(2,"0")} de ${MONTHS_ES[value.getMonth()]} de ${value.getFullYear()}`
    : "Selecciona una fecha";

  return (
    <div ref={wrapRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={handleOpen}
        className="flex w-full items-center justify-between border-b border-[#45464d]/40 bg-transparent px-4 py-3 text-left transition-colors hover:border-[#dec29e] focus:outline-none"
      >
        <span
          className={value != null ? "text-sm text-[#d9e2ff]" : "text-sm text-[#8f9098]/50"}
          style={{ fontFamily: "'Noto Serif', serif" }}
        >
          {label}
        </span>
        <span className="material-symbols-outlined text-[#dec29e]/70 text-lg select-none">
          calendar_month
        </span>
      </button>

      {open && (
        <div className={`absolute left-0 z-50 w-72 rounded-xl border border-[#dec29e]/20 bg-[#0b1628] shadow-[0_20px_60px_rgba(0,0,0,0.7)] overflow-hidden ${
          openUp ? "bottom-full mb-2" : "top-full mt-2"
        }`}>
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#dec29e]/10">
            <button type="button"
              onClick={() => setView(v => new Date(v.getFullYear(), v.getMonth() - 1, 1))}
              className="text-[#dec29e]/60 hover:text-[#dec29e] transition-colors p-1">
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>
            <span className="text-sm text-[#d9e2ff] tracking-widest uppercase"
              style={{ fontFamily: "'Noto Serif', serif" }}>
              {MONTHS_ES[month]} {year}
            </span>
            <button type="button"
              onClick={() => setView(v => new Date(v.getFullYear(), v.getMonth() + 1, 1))}
              className="text-[#dec29e]/60 hover:text-[#dec29e] transition-colors p-1">
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </div>

          <div className="grid grid-cols-7 px-3 pt-3">
            {DAYS_ES.map(d => (
              <div key={d} className="text-center text-[9px] uppercase tracking-widest text-[#8f9098] pb-2">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 px-3 pb-4">
            {cells.map((d, i) => (
              <div key={i} className="flex items-center justify-center py-[2px]">
                {d === null ? <span className="w-8 h-8" /> : (
                  <button type="button" onClick={() => pick(d)}
                    className={`w-8 h-8 rounded-full text-xs font-medium transition-all duration-150 ${
                      isSelected(d)
                        ? "bg-[#dec29e] text-[#0b1628] font-bold shadow-lg"
                        : isToday(d)
                        ? "border border-[#dec29e]/50 text-[#dec29e]"
                        : "text-[#c6c6ce] hover:bg-[#dec29e]/15 hover:text-[#dec29e]"
                    }`}>
                    {d}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Main form ─────────────────────────────────────────────────── */
const empty = (): Guest => ({ nombre: "", apellidos: "", fecha: null, pasaporte: "" });

interface Props {
  guests: Guest[];
  setGuests: React.Dispatch<React.SetStateAction<Guest[]>>;
}

export default function GuestRegistrationForm({ setGuests }: Props) {
  const navigate = useNavigate();
  const [form, setForm] = useState<Guest>(empty());

  const canAdd = form.nombre.trim() !== "" && form.apellidos.trim() !== "" && form.pasaporte.trim() !== "" && form.fecha != null;

  const agregar = () => {
    if (!canAdd) return;
    setGuests(g => [...g, form]);
    setForm(empty());
  };

  const inputClass = [
    "w-full rounded-none border-x-0 border-b border-t-0 border-[#45464d]/30 bg-transparent",
    "px-4 py-3 text-sm text-[#d9e2ff] transition-colors",
    "placeholder:text-[#8f9098]/60",
    "focus:border-[#dec29e] focus:outline-none focus:ring-0",
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
      `}</style>

      <section className="space-y-10 rounded-xl border border-white/5 bg-[#1e2944]/20 p-8 md:p-12">
        <h3 className="text-3xl text-[#d9e2ff]" style={{ fontFamily: "'Noto Serif', serif" }}>
          Registro de Invitado
        </h3>

        <form
          className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2"
          onSubmit={e => { e.preventDefault(); agregar(); }}
        >
          <div className="space-y-3">
            <label className={labelClass}>Nombre</label>
            <input className={inputClass} placeholder="Ej. Isabella" type="text"
              autoComplete="off" value={form.nombre}
              onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} />
          </div>

          <div className="space-y-3">
            <label className={labelClass}>Apellidos</label>
            <input className={inputClass} placeholder="Ej. Valderrama" type="text"
              autoComplete="off" value={form.apellidos}
              onChange={e => setForm(f => ({ ...f, apellidos: e.target.value }))} />
          </div>

          <div className="space-y-3">
            <label className={labelClass}>Fecha de Nacimiento</label>
            <CalendarPicker
              value={form.fecha}
              onChange={d => setForm(f => ({ ...f, fecha: d }))}
            />
          </div>

          <div className="space-y-3">
            <label className={labelClass}>ID / Pasaporte</label>
            <input className={inputClass} placeholder="P-00000000" type="text"
              autoComplete="off" value={form.pasaporte}
              onChange={e => setForm(f => ({ ...f, pasaporte: e.target.value }))} />
          </div>

          <div className="flex flex-col gap-4 pt-6 md:col-span-2 md:flex-row md:items-center md:justify-between">
            <button
              className={`min-w-[200px] rounded-md px-10 py-4 shadow-lg transition-all ${
                canAdd
                  ? "bg-[#dec29e] text-[#3e2d14] hover:brightness-110 active:scale-95"
                  : "bg-white/5 text-white/25 cursor-not-allowed"
              }`}
              style={{ fontFamily: "'Noto Serif', serif", fontSize: "13px", letterSpacing: "0.15em" }}
              type="submit"
            >
              Añadir a la Lista
            </button>

            <button
              className="min-w-[260px] rounded-md border border-[#dec29e]/35 bg-[#dec29e]/12 px-8 py-4 text-[#f5e2bd] shadow-lg transition-all hover:bg-[#dec29e]/20 active:scale-95"
              onClick={() => navigate("/personalizar-estancia")}
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
