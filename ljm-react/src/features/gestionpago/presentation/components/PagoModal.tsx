import React, { useEffect, useState } from 'react';
import type { AdminPago } from '../../data/types';
import { PAGO_STATUS_STYLES } from '../../data/types';
import { pagoService } from '../../data/pagoService';

interface PagoModalProps {
  pago: AdminPago;
  mode: 'view' | 'edit';
  onClose: () => void;
  onSaved: (updated: AdminPago) => void;
}

const STATUS_OPTIONS = ['Pagado', 'Pendiente', 'Reembolsado'];

const inputClass = 'w-full rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#eacea9]/50 focus:border-[#eacea9] p-3 text-slate-900 bg-white outline-none text-sm transition-all';

const DetailRow: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</span>
    <span className="text-sm text-[#0e1a34] font-medium">{value ?? '—'}</span>
  </div>
);

const PagoModal: React.FC<PagoModalProps> = ({ pago, mode, onClose, onSaved }) => {
  const [currentMode, setCurrentMode] = useState(mode);
  const [estado, setEstado] = useState(pago.estado);
  const [monto, setMonto] = useState(String(pago.monto));
  const [notas, setNotas] = useState(pago.notas ?? '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCurrentMode(mode);
    setEstado(pago.estado);
    setMonto(String(pago.monto));
    setNotas(pago.notas ?? '');
    setError(null);
  }, [pago, mode]);

  const formattedDate = pago.fecha_pago
    ? new Date(pago.fecha_pago).toLocaleDateString('es-ES', {
        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit',
      })
    : null;

  const handleSave = async () => {
    setError(null);
    setSaving(true);
    try {
      const updated = await pagoService.updatePago(pago.id, {
        estado,
        monto: monto ? Number(monto) : undefined,
        notas: notas || undefined,
      });
      onSaved(updated);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" onClick={onClose} />

      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-[#0e1a34] flex items-center justify-center text-white shrink-0">
              <span className="material-symbols-outlined text-[20px]">payments</span>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                {currentMode === 'view' ? 'Detalle de pago' : 'Editar pago'}
              </p>
              <p className="text-sm font-bold text-[#0e1a34]">
                {pago.referencia ?? `#${pago.id}`}
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
          {currentMode === 'view' ? (
            <>
              <DetailRow label="Pasajero" value={pago.pasajero} />
              {pago.pasajero_email && <DetailRow label="Email" value={pago.pasajero_email} />}
              <DetailRow label="Reserva" value={pago.reserva_codigo ?? pago.reserva_id} />
              <DetailRow label="Viaje / Ruta" value={pago.ruta} />
              <DetailRow label="Monto" value={pago.monto_formatted} />
              <DetailRow label="Moneda" value={pago.moneda} />
              <DetailRow
                label="Estado"
                value={
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${PAGO_STATUS_STYLES[pago.estado] ?? 'bg-slate-100 text-slate-500'}`}>
                    {pago.estado}
                  </span>
                }
              />
              <DetailRow label="Fecha de pago" value={formattedDate} />
              {pago.metodo_pago && <DetailRow label="Método de pago" value={pago.metodo_pago} />}
              {pago.notas && <DetailRow label="Notas" value={pago.notas} />}
            </>
          ) : (
            <div className="space-y-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Estado</label>
                <select
                  className={inputClass}
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Monto ({pago.moneda})</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className={inputClass}
                  value={monto}
                  onChange={(e) => setMonto(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Notas</label>
                <textarea
                  rows={3}
                  className={`${inputClass} resize-none`}
                  value={notas}
                  onChange={(e) => setNotas(e.target.value)}
                  placeholder="Notas adicionales..."
                />
              </div>

              {error && <p className="text-xs text-red-500 font-semibold">{error}</p>}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
          {currentMode === 'view' ? (
            <>
              <button onClick={onClose} className="text-sm text-slate-500 hover:text-[#0e1a34] font-medium transition-colors">
                Cerrar
              </button>
              <button
                onClick={() => setCurrentMode('edit')}
                className="flex items-center gap-2 bg-[#0e1a34] text-white text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-[#1a2b4e] transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">edit</span>
                Editar
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setCurrentMode('view')}
                disabled={saving}
                className="text-sm text-slate-500 hover:text-[#0e1a34] font-medium transition-colors disabled:opacity-40"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-[#eacea9] hover:bg-[#d4af37] text-[#0e1a34] text-sm font-black px-5 py-2.5 rounded-lg transition-colors disabled:opacity-60"
              >
                <span className="material-symbols-outlined text-[16px]">{saving ? 'hourglass_empty' : 'save'}</span>
                {saving ? 'Guardando...' : 'Guardar cambios'}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PagoModal;
