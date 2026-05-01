import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

const MONTHS_ES = [
  'Enero','Febrero','Marzo','Abril','Mayo','Junio',
  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre',
];
const DAYS_ES = ['Lu','Ma','Mi','Ju','Vi','Sá','Do'];

interface Props {
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  className?: string;
  compact?: boolean;
}

export default function AdminDatePicker({
  value,
  onChange,
  placeholder = 'dd/mm/aaaa',
  className = '',
  compact = false,
}: Props) {
  const parseDate = (v?: string) => (v ? new Date(v + 'T12:00:00') : null);

  const [selected, setSelected]     = useState<Date | null>(parseDate(value));
  const [view, setView]             = useState<Date>(() => parseDate(value) ?? new Date());
  const [open, setOpen]             = useState(false);
  const [popupStyle, setPopupStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Sync when parent resets value to empty / null
  useEffect(() => {
    const d = parseDate(value);
    setSelected(d);
    if (d) setView(d);
  }, [value]);

  const handleOpen = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      if (spaceBelow < 340) {
        setPopupStyle({ position: 'fixed', bottom: window.innerHeight - rect.top + 4, left: rect.left, width: 288 });
      } else {
        setPopupStyle({ position: 'fixed', top: rect.bottom + 4, left: rect.left, width: 288 });
      }
    }
    if (selected) setView(selected);
    setOpen(o => !o);
  };

  const pick = (d: number) => {
    const picked = new Date(view.getFullYear(), view.getMonth(), d);
    setSelected(picked);
    setOpen(false);
    if (onChange) {
      const y  = picked.getFullYear();
      const m  = String(picked.getMonth() + 1).padStart(2, '0');
      const dy = String(picked.getDate()).padStart(2, '0');
      onChange(`${y}-${m}-${dy}`);
    }
  };

  const year        = view.getFullYear();
  const month       = view.getMonth();
  const firstDow    = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells       = Array.from({ length: firstDow + daysInMonth }, (_, i) =>
    i < firstDow ? null : i - firstDow + 1,
  );

  const isSelected = (d: number) =>
    selected != null &&
    selected.getDate() === d &&
    selected.getMonth() === month &&
    selected.getFullYear() === year;

  const isToday = (d: number) => {
    const t = new Date();
    return t.getDate() === d && t.getMonth() === month && t.getFullYear() === year;
  };

  const displayValue = selected
    ? `${String(selected.getDate()).padStart(2, '0')}/${String(selected.getMonth() + 1).padStart(2, '0')}/${selected.getFullYear()}`
    : '';

  const portal = open
    ? createPortal(
        <>
          {/* Transparent overlay — clicking it closes the calendar without firing pick() */}
          <div className="fixed inset-0 z-[9990]" onClick={() => setOpen(false)} />

          {/* Calendar popup — higher z than overlay so date clicks reach pick() */}
          <div style={popupStyle} className="z-[9999] rounded-xl bg-[#0e1a34] border border-[#eacea9]/20 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <button type="button"
                onClick={() => setView(v => new Date(v.getFullYear(), v.getMonth() - 1, 1))}
                className="text-[#eacea9]/60 hover:text-[#eacea9] transition-colors p-1">
                <span className="material-symbols-outlined text-lg">chevron_left</span>
              </button>
              <span className="text-sm text-white tracking-widest uppercase font-semibold">
                {MONTHS_ES[month]} {year}
              </span>
              <button type="button"
                onClick={() => setView(v => new Date(v.getFullYear(), v.getMonth() + 1, 1))}
                className="text-[#eacea9]/60 hover:text-[#eacea9] transition-colors p-1">
                <span className="material-symbols-outlined text-lg">chevron_right</span>
              </button>
            </div>

            <div className="grid grid-cols-7 px-3 pt-3">
              {DAYS_ES.map(d => (
                <div key={d} className="text-center text-[9px] uppercase tracking-widest text-white/30 pb-2">{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 px-3 pb-4">
              {cells.map((d, i) => (
                <div key={i} className="flex items-center justify-center py-[2px]">
                  {d === null ? <span className="w-8 h-8" /> : (
                    <button type="button" onClick={() => pick(d)}
                      className={`w-8 h-8 rounded-full text-xs font-medium transition-all ${
                        isSelected(d)
                          ? 'bg-[#eacea9] text-[#0e1a34] font-bold shadow-lg'
                          : isToday(d)
                          ? 'border border-[#eacea9]/60 text-[#eacea9]'
                          : 'text-white/70 hover:bg-[#eacea9]/15 hover:text-[#eacea9]'
                      }`}>
                      {d}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>,
        document.body,
      )
    : null;

  return (
    <div className={`relative ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        onClick={handleOpen}
        className={`w-full flex items-center justify-between bg-slate-50 border rounded-xl outline-none transition-all hover:border-[#eacea9] ${
          open ? 'border-[#eacea9] ring-2 ring-[#eacea9]/30' : 'border-slate-200'
        } ${compact ? 'px-2 py-1.5 text-xs' : 'px-4 py-2.5 text-sm'}`}
      >
        <span className={displayValue ? 'text-[#0e1a34] font-medium' : 'text-slate-400'}>
          {displayValue || placeholder}
        </span>
        <span className={`material-symbols-outlined text-slate-400 ${compact ? 'text-[16px]' : 'text-[18px]'}`}>
          calendar_month
        </span>
      </button>
      {portal}
    </div>
  );
}
