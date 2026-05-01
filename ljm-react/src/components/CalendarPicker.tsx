import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const MONTHS_ES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const DAYS_ES = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"];

interface CalendarPickerProps {
  value: Date | null;
  onChange: (d: Date) => void;
  placeholder?: string;
  className?: string;
  variant?: "admin" | "public";
}

const CalendarPicker: React.FC<CalendarPickerProps> = ({
  value,
  onChange,
  placeholder = "Selecciona una fecha",
  className = "",
  variant = "admin",
}) => {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(new Date(value || new Date()));
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const isPublic = variant === "public";

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  useEffect(() => {
    if (value) {
      setView(new Date(value));
    }
  }, [value]);

  useLayoutEffect(() => {
    if (!open || !triggerRef.current) return;

    const updatePosition = () => {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const menuWidth = 280;
      const menuHeight = 320;
      const gap = 8;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let left = rect.left;
      let top = rect.bottom + gap;

      if (left + menuWidth > viewportWidth - 12) {
        left = Math.max(12, viewportWidth - menuWidth - 12);
      }

      if (top + menuHeight > viewportHeight - 12) {
        top = Math.max(12, rect.top - menuHeight - gap);
      }

      setMenuStyle({
        position: "fixed",
        top,
        left,
        width: menuWidth,
        zIndex: 1000,
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open]);

  const pick = (day: number) => {
    onChange(new Date(view.getFullYear(), view.getMonth(), day));
    setOpen(false);
  };

  const year = view.getFullYear();
  const month = view.getMonth();
  const firstDow = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Array.from({ length: firstDow + daysInMonth }, (_, index) =>
    index < firstDow ? null : index - firstDow + 1,
  );

  const isSelected = (day: number) =>
    value != null &&
    value.getDate() === day &&
    value.getMonth() === month &&
    value.getFullYear() === year;

  const isToday = (day: number) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === month &&
      today.getFullYear() === year
    );
  };

  const selectedLabel = value
    ? value.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "";

  const triggerClasses = isPublic
    ? "bg-[#0b1628] border-[#dec29e]/20 text-[#d9e2ff] hover:border-[#dec29e]/50"
    : "bg-white border-slate-200 text-[#0e1a34] hover:border-[#eacea9]";

  const placeholderClasses = isPublic ? "text-[#8f9098]" : "text-slate-400";
  const iconClasses = isPublic ? "text-[#dec29e]" : "text-slate-400";

  const menu = (
    <div
      style={menuStyle}
      className={`rounded-xl border shadow-xl ${
        isPublic
          ? "border-[#dec29e]/20 bg-[#0b1628] text-[#d9e2ff]"
          : "border-slate-200 bg-white text-[#0e1a34]"
      }`}
    >
      <div
        className={`flex items-center justify-between border-b px-4 py-3 ${
          isPublic ? "border-[#dec29e]/20" : "border-slate-100"
        }`}
      >
        <button
          type="button"
          onClick={() => setView((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1))}
          className={`rounded-md p-1 transition ${
            isPublic ? "hover:bg-[#dec29e]/10" : "hover:bg-slate-100"
          }`}
        >
          <span className="material-symbols-outlined text-lg">chevron_left</span>
        </button>
        <span className="text-sm font-semibold">
          {MONTHS_ES[month]} {year}
        </span>
        <button
          type="button"
          onClick={() => setView((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1))}
          className={`rounded-md p-1 transition ${
            isPublic ? "hover:bg-[#dec29e]/10" : "hover:bg-slate-100"
          }`}
        >
          <span className="material-symbols-outlined text-lg">chevron_right</span>
        </button>
      </div>

      <div className="p-4">
        <div className="mb-2 grid grid-cols-7">
          {DAYS_ES.map((day) => (
            <div
              key={day}
              className={`text-center text-[10px] font-bold uppercase ${
                isPublic ? "text-[#8f9098]" : "text-slate-400"
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-1">
          {cells.map((day, index) => (
            <div key={index} className="flex items-center justify-center">
              {day === null ? (
                <span className="h-9 w-9" />
              ) : (
                <button
                  type="button"
                  onClick={() => pick(day)}
                  className={`flex h-9 w-9 items-center justify-center rounded-md text-sm transition ${
                    isSelected(day)
                      ? isPublic
                        ? "bg-[#dec29e] font-semibold text-[#0b1628]"
                        : "bg-[#0e1a34] font-semibold text-white"
                      : isToday(day)
                        ? isPublic
                          ? "border border-[#dec29e]/60 text-[#dec29e]"
                          : "border border-[#eacea9] text-[#0e1a34]"
                        : isPublic
                          ? "hover:bg-[#dec29e]/10"
                          : "hover:bg-slate-100"
                  }`}
                >
                  {day}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition ${triggerClasses} ${
          open ? (isPublic ? "ring-2 ring-[#dec29e]/20" : "ring-2 ring-[#eacea9]/30") : ""
        }`}
      >
        <span className={value ? "" : placeholderClasses}>{selectedLabel || placeholder}</span>
        <span className={`material-symbols-outlined text-[20px] ${iconClasses}`}>calendar_month</span>
      </button>

      {open && typeof document !== "undefined" ? createPortal(menu, document.body) : null}
    </div>
  );
};

export default CalendarPicker;
