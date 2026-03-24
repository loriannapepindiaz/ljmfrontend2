import React, { useState } from 'react';

const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const ReportesHeader: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [showCalendar, setShowCalendar] = useState(false);
  const [startMonth, setStartMonth] = useState(0);
  const [startYear, setStartYear] = useState(currentYear);
  const [endMonth, setEndMonth] = useState(11);
  const [endYear, setEndYear] = useState(currentYear);
  const [selecting, setSelecting] = useState<'start' | 'end'>('start');
  const [viewYear, setViewYear] = useState(currentYear);

  const formatDate = (month: number, year: number) => {
    return `01 ${MONTHS[month].slice(0, 3)}, ${year}`;
  };

  const handleMonthClick = (month: number) => {
    if (selecting === 'start') {
      setStartMonth(month);
      setStartYear(viewYear);
      setSelecting('end');
    } else {
      setEndMonth(month);
      setEndYear(viewYear);
      setSelecting('start');
      setShowCalendar(false);
    }
  };

  const isSelected = (month: number) => {
    if (viewYear === startYear && month === startMonth) return true;
    if (viewYear === endYear && month === endMonth) return true;
    return false;
  };

  const isInRange = (month: number) => {
    const current = viewYear * 12 + month;
    const start = startYear * 12 + startMonth;
    const end = endYear * 12 + endMonth;
    return current > start && current < end;
  };

  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h2 className="text-3xl font-bold text-[#0e1a34]">Informes y Análisis</h2>
        <p className="text-slate-500 mt-1">Resumen detallado de rendimiento y métricas operativas.</p>
      </div>

      <div className="relative">
        <button
          onClick={() => { setShowCalendar(!showCalendar); setSelecting('start'); }}
          className="flex items-center bg-white border border-slate-200 rounded-lg px-4 py-2.5 shadow-sm hover:border-[#eacea9] transition-all gap-2"
        >
          <span className="material-symbols-outlined text-slate-400 text-sm">calendar_today</span>
          <span className="text-sm font-medium text-[#0e1a34]">
            {formatDate(startMonth, startYear)} — {formatDate(endMonth, endYear)}
          </span>
          <span className="material-symbols-outlined text-slate-400 text-sm">
            {showCalendar ? 'expand_less' : 'expand_more'}
          </span>
        </button>

        {showCalendar && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setShowCalendar(false)} />
            <div className="absolute right-0 top-12 z-50 bg-white rounded-2xl shadow-2xl border border-[#0e1a34]/10 p-5 w-80">

              {/* Header del calendario */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setViewYear(y => Math.max(2025, y - 1))}
                  disabled={viewYear <= 2025}
                  className="size-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-[#0e1a34]/50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                </button>
                <span className="text-base font-bold text-[#0e1a34]">{viewYear}</span>
                <button
                  onClick={() => setViewYear(y => y + 1)}
                  className="size-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-[#0e1a34]/50 transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>

              {/* Indicador de selección */}
              <p className="text-[11px] font-bold text-[#0e1a34]/40 uppercase tracking-wider text-center mb-3">
                {selecting === 'start' ? 'Selecciona mes de inicio' : 'Selecciona mes de fin'}
              </p>

              {/* Grid de meses */}
              <div className="grid grid-cols-3 gap-2">
                {MONTHS.map((m, i) => (
                  <button
                    key={m}
                    onClick={() => handleMonthClick(i)}
                    className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
                      isSelected(i)
                        ? 'bg-[#eacea9] text-[#0e1a34] shadow-sm'
                        : isInRange(i)
                        ? 'bg-[#eacea9]/20 text-[#0e1a34]'
                        : 'bg-slate-50 text-[#0e1a34]/70 hover:bg-[#eacea9]/10'
                    }`}
                  >
                    {m.slice(0, 3)}
                  </button>
                ))}
              </div>

              {/* Rango seleccionado */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-[#0e1a34]/60">
                <span className="font-medium">{formatDate(startMonth, startYear)}</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                <span className="font-medium">{formatDate(endMonth, endYear)}</span>
              </div>

              {/* Botón restablecer */}
              <button
                onClick={() => {
                  setStartMonth(0);
                  setStartYear(currentYear);
                  setEndMonth(11);
                  setEndYear(currentYear);
                  setViewYear(currentYear);
                  setShowCalendar(false);
                }}
                className="mt-3 w-full py-2 rounded-xl border border-slate-200 text-xs font-bold text-[#0e1a34]/50 hover:bg-slate-50 transition-all"
              >
                Restablecer al año actual
              </button>

            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default ReportesHeader;