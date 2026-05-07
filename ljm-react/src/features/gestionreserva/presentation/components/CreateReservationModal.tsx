import React, { useEffect, useState } from 'react';
import type { AdminReserva, HabitacionItem, PasajeroItem, ViajeItem } from '../../data/types';
import { reservaService } from '../../data/reservaService';

interface CreateReservationModalProps {
  onClose: () => void;
  onCreated: (reserva: AdminReserva) => void;
}

const inputClass = 'w-full rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#eacea9]/50 focus:border-[#eacea9] p-3 text-slate-900 bg-white outline-none text-sm transition-all';

const CreateReservationModal: React.FC<CreateReservationModalProps> = ({ onClose, onCreated }) => {
  const [pasajeros, setPasajeros] = useState<PasajeroItem[]>([]);
  const [viajes, setViajes] = useState<ViajeItem[]>([]);
  const [cabinas, setCabinas] = useState<HabitacionItem[]>([]);

  const [selectedPasajero, setSelectedPasajero] = useState('');
  const [selectedViaje, setSelectedViaje] = useState('');
  const [selectedCabina, setSelectedCabina] = useState('');
  const [estado, setEstado] = useState('Pendiente');
  const [monto, setMonto] = useState('');
  const [observaciones, setObservaciones] = useState('');

  const [loadingCatalog, setLoadingCatalog] = useState(true);
  const [loadingCabinas, setLoadingCabinas] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      reservaService.getPasajerosCatalogo(),
      reservaService.getViajesCatalogo(),
    ])
      .then(([p, v]) => { setPasajeros(p); setViajes(v); })
      .catch(() => setError('Error al cargar catálogos.'))
      .finally(() => setLoadingCatalog(false));
  }, []);

  const selectedViajeData = viajes.find((v) => v.id === selectedViaje);

  useEffect(() => {
    if (!selectedViajeData?.crucero_id) {
      setCabinas([]);
      setSelectedCabina('');
      return;
    }
    setLoadingCabinas(true);
    setSelectedCabina('');
    reservaService
      .getHabitacionesCatalogo(selectedViajeData.crucero_id)
      .then(setCabinas)
      .catch(() => setCabinas([]))
      .finally(() => setLoadingCabinas(false));
  }, [selectedViaje]);

  const handleSubmit = async () => {
    setError(null);
    if (!selectedPasajero) { setError('Selecciona un pasajero.'); return; }
    if (!selectedViaje) { setError('Selecciona un viaje.'); return; }

    setSaving(true);
    try {
      const created = await reservaService.createReserva({
        id_cliente: selectedPasajero,
        id_viaje: selectedViaje,
        id_habitacion: selectedCabina || undefined,
        estado_reserva: estado,
        monto_total: monto ? Number(monto) : undefined,
        observaciones: observaciones || undefined,
      });
      onCreated(created);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear reserva.');
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
                <span className="material-symbols-outlined text-[20px]">add_circle</span>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Nueva reserva</p>
                <p className="text-sm font-bold text-[#0e1a34]">Completar información</p>
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
            {loadingCatalog ? (
              <div className="flex items-center justify-center py-12">
                <span className="material-symbols-outlined animate-spin text-[#eacea9] text-[36px]">progress_activity</span>
              </div>
            ) : (
              <>
                {/* Pasajero */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Pasajero *</label>
                  <select
                    className={inputClass}
                    value={selectedPasajero}
                    onChange={(e) => setSelectedPasajero(e.target.value)}
                  >
                    <option value="">Seleccionar pasajero...</option>
                    {pasajeros.map((p) => (
                      <option key={p.id} value={p.id}>
                        {[p.nombre, p.apellido].filter(Boolean).join(' ')} {p.email ? `— ${p.email}` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Viaje */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Viaje / Crucero *</label>
                  <select
                    className={inputClass}
                    value={selectedViaje}
                    onChange={(e) => setSelectedViaje(e.target.value)}
                  >
                    <option value="">Seleccionar viaje...</option>
                    {viajes.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.crucero_nombre ? `${v.crucero_nombre} — ` : ''}{v.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Habitación */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Habitación</label>
                  {loadingCabinas ? (
                    <p className="text-xs text-slate-400 py-2">Cargando habitaciones...</p>
                  ) : (
                    <select
                      className={inputClass}
                      value={selectedCabina}
                      onChange={(e) => setSelectedCabina(e.target.value)}
                      disabled={cabinas.length === 0}
                    >
                      <option value="">Sin asignar</option>
                      {cabinas.map((c) => (
                        <option key={c.id} value={c.id}>
                          Habitación {c.numero_cabina} {c.categoria ? `— ${c.categoria}` : ''} {c.estado ? `(${c.estado})` : ''}
                        </option>
                      ))}
                    </select>
                  )}
                  {!selectedViaje && (
                    <p className="text-xs text-slate-400">Selecciona un viaje para filtrar habitaciones.</p>
                  )}
                </div>

                {/* Estado */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Estado</label>
                  <select className={inputClass} value={estado} onChange={(e) => setEstado(e.target.value)}>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Confirmado">Confirmado</option>
                    <option value="Pagado">Pagado</option>
                  </select>
                </div>

                {/* Monto */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Monto total (USD)</label>
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

                {/* Observaciones */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Observaciones</label>
                  <textarea
                    rows={3}
                    className={`${inputClass} resize-none`}
                    value={observaciones}
                    onChange={(e) => setObservaciones(e.target.value)}
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
              disabled={saving || loadingCatalog}
              className="flex items-center gap-2 bg-[#0e1a34] text-white text-sm font-black px-6 py-2.5 rounded-lg hover:bg-[#1a2b4e] transition-colors disabled:opacity-60"
            >
              <span className="material-symbols-outlined text-[16px]">{saving ? 'hourglass_empty' : 'add_circle'}</span>
              {saving ? 'Creando...' : 'Crear reserva'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateReservationModal;
