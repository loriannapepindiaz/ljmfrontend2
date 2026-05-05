import React from 'react';
import type { AdminCabina } from '../../data/types';

interface CabinaModalProps {
  cabina: AdminCabina;
  onClose: () => void;
}

const estadoStyle = (estado: string | null) => {
  const s = estado?.toLowerCase() ?? '';
  if (s === 'disponible')    return { pill: 'bg-emerald-50 text-emerald-700', dot: 'bg-emerald-500', label: 'Disponible' };
  if (s === 'ocupada')       return { pill: 'bg-blue-50 text-blue-700',       dot: 'bg-blue-500',    label: 'Ocupada' };
  if (s === 'mantenimiento') return { pill: 'bg-amber-50 text-amber-700',     dot: 'bg-amber-400',   label: 'Mantenimiento' };
  return { pill: 'bg-slate-100 text-slate-500', dot: 'bg-slate-400', label: estado ?? '—' };
};

const DetailRow: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</span>
    <span className="text-sm text-[#0e1a34] font-medium">{value ?? '—'}</span>
  </div>
);

const CabinaModal: React.FC<CabinaModalProps> = ({ cabina, onClose }) => {
  const { pill, dot, label } = estadoStyle(cabina.estado);

  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" onClick={onClose} />

      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#0e1a34]">bed</span>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Detalle de cabina</p>
              <p className="text-sm font-bold text-[#0e1a34]">
                {cabina.numero_cabina ? `Cabina ${cabina.numero_cabina}` : 'Sin número'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#0e1a34] hover:border-[#0e1a34] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">

          {/* Icon banner */}
          <div className="h-32 rounded-xl bg-[#0e1a34]/5 flex items-center justify-center">
            <span className="material-symbols-outlined text-[64px] text-[#0e1a34]/20">bed</span>
          </div>

          <DetailRow label="Número de cabina" value={cabina.numero_cabina} />

          <DetailRow
            label="Estado"
            value={
              <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${pill}`}>
                <span className={`w-1.5 h-1.5 rounded-full inline-block ${dot}`} />
                {label}
              </span>
            }
          />

          <DetailRow label="Categoría" value={cabina.categoria} />

          <DetailRow label="Crucero" value={cabina.crucero_nombre} />

          <DetailRow
            label="Cubierta"
            value={cabina.cubierta_numero != null ? `Cubierta ${cabina.cubierta_numero}` : null}
          />

          <DetailRow label="Huésped" value="—" />
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="text-sm text-slate-500 hover:text-[#0e1a34] font-medium transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </>
  );
};

export default CabinaModal;
