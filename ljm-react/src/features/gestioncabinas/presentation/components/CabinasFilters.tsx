import React from 'react';
import type { TipoHabitacion } from '../../data/types';

const ESTADOS = ['Ocupada', 'Disponible'];

interface CabinasFiltersProps {
  tipos: TipoHabitacion[];
  selectedTipoId: string;
  selectedEstado: string;
  onTipoChange: (id: string) => void;
  onEstadoChange: (e: string) => void;
  onClear: () => void;
}

const Pill: React.FC<{
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`text-sm px-3 py-1.5 rounded-full font-bold transition-all whitespace-nowrap ${
      active
        ? 'bg-[#0e1a34] text-white shadow-md'
        : 'bg-white border border-slate-200 text-[#0e1a34]/60 hover:border-[#eacea9]'
    }`}
  >
    {children}
  </button>
);

const CabinasFilters: React.FC<CabinasFiltersProps> = ({
  tipos, selectedTipoId, selectedEstado, onTipoChange, onEstadoChange, onClear,
}) => {
  const hasFilter = selectedTipoId || selectedEstado;

  return (
    <div className="bg-white rounded-xl border border-[#0e1a34]/10 mb-8 shadow-sm overflow-hidden">
      {/* Tipo row */}
      <div className="flex items-center gap-3 px-4 py-3 flex-wrap">
        <span className="text-xs font-bold text-[#0e1a34]/40 uppercase tracking-widest shrink-0 w-12">Tipo</span>
        <Pill active={!selectedTipoId} onClick={() => onTipoChange('')}>Todas</Pill>
        {tipos.map((t) => (
          <Pill key={t.id} active={selectedTipoId === t.id} onClick={() => onTipoChange(t.id)}>
            {t.nombre}
          </Pill>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-[#0e1a34]/5 mx-4" />

      {/* Estado row */}
      <div className="flex items-center gap-3 px-4 py-3">
        <span className="text-xs font-bold text-[#0e1a34]/40 uppercase tracking-widest shrink-0 w-12">Estado</span>
        {ESTADOS.map((e) => (
          <Pill key={e} active={selectedEstado === e} onClick={() => onEstadoChange(selectedEstado === e ? '' : e)}>
            {e}
          </Pill>
        ))}

        {hasFilter && (
          <button
            onClick={onClear}
            className="ml-auto flex items-center gap-1 text-xs font-bold text-[#0e1a34]/40 hover:text-[#0e1a34] transition-colors"
          >
            <span className="material-symbols-outlined text-[14px]">close</span>
            Limpiar
          </button>
        )}
      </div>
    </div>
  );
};

export default CabinasFilters;
