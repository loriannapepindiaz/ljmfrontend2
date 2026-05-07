import React from 'react';
import type { AsignacionCabina } from '../../data/types';

interface Props {
  asignacion: AsignacionCabina;
  onClose: () => void;
}

const formatDate = (d: string | null) => {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' });
};

const Row: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</span>
    <span className="text-sm text-[#0e1a34] font-medium">{value ?? '—'}</span>
  </div>
);

const CabinaModal: React.FC<Props> = ({ asignacion: a, onClose }) => {
  const isOcupada = a.estado_ocupacion === 'Ocupada';
  const fisicoLabel = a.estado_fisico
    ? (a.estado_fisico === 'en_mantenimiento' ? 'En mantenimiento' : a.estado_fisico.charAt(0).toUpperCase() + a.estado_fisico.slice(1))
    : null;

  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#0e1a34]/5 flex items-center justify-center">
              <span className="material-symbols-outlined text-[#0e1a34] text-[20px]">bed</span>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Detalle de habitación</p>
              <p className="text-sm font-bold text-[#0e1a34]">Hab. {a.numero_cabina ?? '—'}</p>
            </div>
          </div>
          <button onClick={onClose} className="size-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#0e1a34] transition-colors">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">

          {/* Estado badges */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl flex-1 ${isOcupada ? 'bg-emerald-50' : 'bg-slate-50'}`}>
              <span className={`w-2 h-2 rounded-full ${isOcupada ? 'bg-emerald-500' : 'bg-slate-400'}`} />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Ocupación</p>
                <p className={`text-sm font-bold ${isOcupada ? 'text-emerald-700' : 'text-slate-500'}`}>
                  {a.estado_ocupacion}
                </p>
              </div>
            </div>
            {fisicoLabel && (
              <div className={`flex items-center gap-2 px-4 py-2.5 rounded-xl flex-1 ${
                a.estado_fisico === 'en_mantenimiento' ? 'bg-amber-50' : 'bg-blue-50'
              }`}>
                <span className="material-symbols-outlined text-[16px] text-slate-400">
                  {a.estado_fisico === 'en_mantenimiento' ? 'build' : 'check_circle'}
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Estado físico</p>
                  <p className={`text-sm font-bold ${
                    a.estado_fisico === 'en_mantenimiento' ? 'text-amber-700' : 'text-blue-600'
                  }`}>{fisicoLabel}</p>
                </div>
              </div>
            )}
          </div>

          {/* Habitacion info */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 rounded-xl p-3">
              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-1">Tipo</p>
              <p className="text-sm font-bold text-[#0e1a34]">{a.tipo_habitacion ?? '—'}</p>
            </div>
            {a.cubierta != null && (
              <div className="bg-slate-50 rounded-xl p-3">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Cubierta</p>
                <p className="text-sm font-bold text-[#0e1a34]">Cubierta {a.cubierta}</p>
              </div>
            )}
          </div>

          {a.crucero && <Row label="Crucero" value={a.crucero} />}

          {a.huesped && (
            <div className="border-t border-slate-100 pt-4">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Huésped</p>
              <Row label="Nombre" value={a.huesped} />
              {a.email && <Row label="Email" value={a.email} />}
            </div>
          )}

          {(a.codigo_reserva || a.estado_reserva) && (
            <div className="border-t border-slate-100 pt-4">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Reserva</p>
              {a.codigo_reserva && <Row label="Código" value={a.codigo_reserva} />}
              {a.estado_reserva && <Row label="Estado reserva" value={a.estado_reserva} />}
            </div>
          )}

          {(a.fecha_entrada || a.fecha_salida) && (
            <div className="border-t border-slate-100 pt-4 grid grid-cols-2 gap-3">
              <div className="bg-green-50 rounded-xl p-3">
                <p className="text-[10px] font-bold text-green-500 uppercase tracking-wider mb-1">Check-in</p>
                <p className="text-sm font-bold text-[#0e1a34]">{formatDate(a.fecha_entrada)}</p>
              </div>
              <div className="bg-red-50 rounded-xl p-3">
                <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider mb-1">Check-out</p>
                <p className="text-sm font-bold text-[#0e1a34]">{formatDate(a.fecha_salida)}</p>
              </div>
            </div>
          )}

          {a.precio_final != null && (
            <div className="bg-[#0e1a34]/5 rounded-xl px-4 py-3 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Precio final</span>
              <span className="text-xl font-bold text-[#0e1a34]">${a.precio_final.toLocaleString('en-US')}</span>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button onClick={onClose} className="text-sm text-slate-500 hover:text-[#0e1a34] font-medium transition-colors">
            Cerrar
          </button>
        </div>
      </div>
    </>
  );
};

export default CabinaModal;
