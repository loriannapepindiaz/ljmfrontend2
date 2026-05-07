import React, { useEffect, useState } from 'react';
import type { AdminPago } from '../../data/types';
import { pagoService } from '../../data/pagoService';
import { API_BASE_URL } from '../../../../lib/api';

interface ReservaOption {
  id: string;
  codigo: string | null;
  guest: string;
  ship: string;
  monto_total: number;
  status: string;
}

interface CreatePagoModalProps {
  onClose: () => void;
  onCreated: (pago: AdminPago) => void;
}

const inputClass = 'w-full rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#eacea9]/50 focus:border-[#eacea9] p-3 text-slate-900 bg-white outline-none text-sm transition-all';

const CreatePagoModal: React.FC<CreatePagoModalProps> = ({ onClose, onCreated }) => {
  const [reservas, setReservas] = useState<ReservaOption[]>([]);
  const [loadingReservas, setLoadingReservas] = useState(true);

  const [selectedReserva, setSelectedReserva] = useState('');
  const [estado, setEstado] = useState('Pendiente');
  const [monto, setMonto] = useState('');
  const [notas, setNotas] = useState('');

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('ljm_auth_token') ?? localStorage.getItem('ljm_admin_token');
    fetch(`${API_BASE_URL}/reservas`, {
      headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    })
      .then((r) => r.json())
      .then((res) => {
        if (res.ok) {
          setReservas(
            (res.data as ReservaOption[]).map((r: ReservaOption) => ({
              id: r.id,
              codigo: r.codigo,
              guest: r.guest,
              ship: r.ship,
              monto_total: r.monto_total,
              status: r.status,
            }))
          );
        }
      })
      .catch(() => setError('Error al cargar reservas.'))
      .finally(() => setLoadingReservas(false));
  }, []);

  const reservaData = reservas.find((r) => r.id === selectedReserva);

  // Auto-fill monto from reserva
  useEffect(() => {
    if (reservaData?.monto_total) {
      setMonto(String(reservaData.monto_total));
    } else {
      setMonto('');
    }
  }, [selectedReserva]);

  const handleSubmit = async () => {
    setError(null);
    if (!selectedReserva) { setError('Selecciona una reserva.'); return; }
    setSaving(true);
    try {
      const created = await pagoService.createPago({
        id_reserva: selectedReserva,
        estado,
        monto: monto ? Number(monto) : undefined,
        notas: notas || undefined,
      });
      onCreated(created);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear pago.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" onClick={onClose} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col max-h-[90vh]">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-[#0e1a34] flex items-center justify-center text-white shrink-0">
                <span className="material-symbols-outlined text-[20px]">add_card</span>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Nuevo pago</p>
                <p className="text-sm font-bold text-[#0e1a34]">Registrar transacción</p>
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
            {loadingReservas ? (
              <div className="flex items-center justify-center py-12">
                <span className="material-symbols-outlined animate-spin text-[#eacea9] text-[36px]">progress_activity</span>
              </div>
            ) : (
              <>
                {/* Reserva */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Reserva *</label>
                  <select
                    className={inputClass}
                    value={selectedReserva}
                    onChange={(e) => setSelectedReserva(e.target.value)}
                  >
                    <option value="">Seleccionar reserva...</option>
                    {reservas.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.codigo ?? `#${r.id}`} — {r.guest} · {r.ship}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Info autocompletada */}
                {reservaData && (
                  <div className="rounded-lg bg-slate-50 border border-slate-100 px-4 py-3 space-y-1.5">
                    <p className="text-xs text-slate-500">
                      <span className="font-semibold text-slate-700">Pasajero:</span> {reservaData.guest}
                    </p>
                    <p className="text-xs text-slate-500">
                      <span className="font-semibold text-slate-700">Viaje:</span> {reservaData.ship}
                    </p>
                    <p className="text-xs text-slate-500">
                      <span className="font-semibold text-slate-700">Estado reserva:</span>{' '}
                      <span className="font-bold text-[#0e1a34]">{reservaData.status}</span>
                    </p>
                  </div>
                )}

                {/* Estado */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Estado del pago</label>
                  <select className={inputClass} value={estado} onChange={(e) => setEstado(e.target.value)}>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Pagado">Pagado</option>
                    <option value="Reembolsado">Reembolsado</option>
                  </select>
                </div>

                {/* Monto */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Monto (USD)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    className={inputClass}
                    value={monto}
                    onChange={(e) => setMonto(e.target.value)}
                  />
                </div>

                {/* Notas */}
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
              </>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
            <button
              onClick={onClose}
              disabled={saving}
              className="text-sm text-slate-500 hover:text-[#0e1a34] font-medium transition-colors disabled:opacity-40"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              disabled={saving || loadingReservas}
              className="flex items-center gap-2 bg-[#0e1a34] text-white text-sm font-black px-6 py-2.5 rounded-lg hover:bg-[#1a2b4e] transition-colors disabled:opacity-60"
            >
              <span className="material-symbols-outlined text-[16px]">{saving ? 'hourglass_empty' : 'add_card'}</span>
              {saving ? 'Registrando...' : 'Registrar pago'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePagoModal;
