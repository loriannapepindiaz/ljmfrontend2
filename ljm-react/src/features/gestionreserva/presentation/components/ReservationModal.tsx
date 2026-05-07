import React, { useEffect, useState } from 'react';
import type { AdminReserva, HabitacionItem, ReservationStatus } from '../../data/types';
import { STATUS_STYLES } from '../../data/types';
import { reservaService } from '../../data/reservaService';

interface ReservationModalProps {
  reserva: AdminReserva;
  mode: 'view' | 'edit';
  onClose: () => void;
  onSaved: (updated: AdminReserva) => void;
}

const STATUS_OPTIONS: ReservationStatus[] = ['Confirmado', 'Pendiente', 'Pagado'];

const DB_ESTADO: Record<ReservationStatus, string> = {
  Confirmado: 'Confirmado',
  Pendiente:  'Pendiente',
  Pagado:     'Pagado',
};

const inputClass = 'w-full rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#eacea9]/50 focus:border-[#eacea9] p-3 text-slate-900 bg-white outline-none text-sm transition-all';

const isJsonString = (s: string | null) => {
  if (!s) return false;
  const t = s.trimStart();
  return t.startsWith('{') || t.startsWith('[');
};

const parseBookingDraft = (s: string | null) => {
  if (!s || !isJsonString(s)) return null;
  try {
    const parsed = JSON.parse(s);
    const draft = parsed?.bookingDraft ?? parsed;
    return {
      destino:    draft?.destination?.titulo ?? null,
      pais:       draft?.destination?.pais ?? null,
      suite:      draft?.suite?.title ?? null,
      precio:     draft?.charges?.destinationPrice ?? null,
      actividades: draft?.charges?.activitiesTotal ?? null,
      serviceFee: draft?.charges?.serviceFee ?? null,
      subtotal:   draft?.charges?.subtotal ?? null,
    };
  } catch {
    return null;
  }
};

const BookingDraftSummary: React.FC<{ raw: string }> = ({ raw }) => {
  const info = parseBookingDraft(raw);
  if (!info) return null;
  const fmt = (n: number | null) =>
    n != null ? `$${Number(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : null;
  const rows = [
    { label: 'Destino',          value: info.destino },
    { label: 'País',             value: info.pais },
    { label: 'Suite',            value: info.suite },
    { label: 'Precio destino',   value: fmt(info.precio) },
    { label: 'Actividades',      value: fmt(info.actividades) },
    { label: 'Cargo de servicio', value: fmt(info.serviceFee) },
    { label: 'Subtotal',         value: fmt(info.subtotal) },
  ].filter((r) => r.value != null);

  if (rows.length === 0) return null;
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Observaciones</span>
      <div className="rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 space-y-2">
        {rows.map((r) => (
          <div key={r.label} className="flex justify-between items-baseline gap-2">
            <span className="text-xs text-slate-500">{r.label}</span>
            <span className="text-xs font-semibold text-[#0e1a34] text-right">{r.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const DetailRow: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</span>
    <span className="text-sm text-[#0e1a34] font-medium">{value ?? '—'}</span>
  </div>
);

const ReservationModal: React.FC<ReservationModalProps> = ({ reserva, mode, onClose, onSaved }) => {
  const [currentMode, setCurrentMode] = useState(mode);
  const [estado, setEstado] = useState<ReservationStatus>(reserva.status);
  const [cabina, setCabina] = useState(reserva.habitacion_id ?? '');
  const [monto, setMonto] = useState(String(reserva.monto_total));
  const [observaciones, setObservaciones] = useState(
    isJsonString(reserva.observaciones) ? '' : (reserva.observaciones ?? '')
  );
  const [cabinas, setCabinas] = useState<HabitacionItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCurrentMode(mode);
    setEstado(reserva.status);
    setCabina(reserva.habitacion_id ?? '');
    setMonto(String(reserva.monto_total));
    setObservaciones(isJsonString(reserva.observaciones) ? '' : (reserva.observaciones ?? ''));
    setError(null);
  }, [reserva, mode]);

  useEffect(() => {
    if (currentMode === 'edit' && reserva.crucero_id) {
      reservaService
        .getHabitacionesCatalogo(reserva.crucero_id)
        .then(setCabinas)
        .catch(() => setCabinas([]));
    }
  }, [currentMode, reserva.crucero_id]);

  const formattedDate = reserva.fecha_reserva
    ? new Date(reserva.fecha_reserva).toLocaleDateString('es-ES', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    : null;

  const handleSave = async () => {
    setError(null);
    setSaving(true);
    try {
      const updated = await reservaService.updateReserva(reserva.id, {
        estado_reserva: DB_ESTADO[estado],
        id_habitacion: cabina || undefined,
        monto_total: monto ? Number(monto) : undefined,
        observaciones: observaciones || undefined,
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
              <span className="material-symbols-outlined text-[20px]">receipt_long</span>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                {currentMode === 'view' ? 'Detalle de reserva' : 'Editar reserva'}
              </p>
              <p className="text-sm font-bold text-[#0e1a34]">
                {reserva.codigo ?? `#${reserva.id}`}
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
              <DetailRow label="Huésped" value={reserva.guest} />
              <DetailRow label="Email" value={reserva.guest_email} />
              <DetailRow label="Barco" value={reserva.ship} />
              {reserva.viaje_nombre && <DetailRow label="Viaje" value={reserva.viaje_nombre} />}
              <DetailRow label="Habitación" value={reserva.cabin} />
              <DetailRow
                label="Estado"
                value={
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${STATUS_STYLES[reserva.status] ?? 'bg-slate-100 text-slate-500'}`}>
                    {reserva.status}
                  </span>
                }
              />
              <DetailRow label="Total" value={reserva.total} />
              <DetailRow label="Fecha de reserva" value={formattedDate} />
              {reserva.observaciones && (
                isJsonString(reserva.observaciones)
                  ? <BookingDraftSummary raw={reserva.observaciones} />
                  : <DetailRow label="Observaciones" value={reserva.observaciones} />
              )}
            </>
          ) : (
            <div className="space-y-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Estado</label>
                <select
                  className={inputClass}
                  value={estado}
                  onChange={(e) => setEstado(e.target.value as ReservationStatus)}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Habitación</label>
                <select
                  className={inputClass}
                  value={cabina}
                  onChange={(e) => setCabina(e.target.value)}
                >
                  <option value="">Sin cambiar</option>
                  {cabinas.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.numero_cabina} {c.categoria ? `— ${c.categoria}` : ''}
                    </option>
                  ))}
                </select>
                {!reserva.crucero_id && (
                  <p className="text-xs text-slate-400">Sin crucero asociado; no se puede filtrar habitaciones.</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Total ({reserva.moneda})</label>
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
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Observaciones</label>
                <textarea
                  rows={3}
                  className={`${inputClass} resize-none`}
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
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
                className="flex items-center gap-2 bg-[#0e1a34] hover:bg-[#162040] text-white text-sm font-black px-5 py-2.5 rounded-lg transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">edit</span>
                Editar reserva
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

export default ReservationModal;
