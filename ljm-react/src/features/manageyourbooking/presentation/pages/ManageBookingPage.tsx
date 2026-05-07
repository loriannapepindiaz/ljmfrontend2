import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../../../home/presentation/components/Navbar';
import Footer from '../../../home/presentation/components/Footer';
import BackButton from '../../../../components/BackButton';
import HeroSection from '../components/HeroSection';
import ShipSummaryCard from '../components/ShipSummaryCard';
import CabinSelection from '../components/CabinSelection';
import GuestList from '../components/GuestList';
import ExcursionsList from '../components/ExcursionsList';
import PaymentDetails from '../components/PaymentDetails';
import ConciergeCard from '../components/ConciergeCard';
import { manageBookingApi, type ManageBookingData } from '../manageBookingData';
import { request } from '../../../../lib/api';
import { voyageHistoryApi, type VoyageHistoryReservation } from '../../../voyayehistory/presentation/voyageHistoryData';
import { allExperiences } from '../../../experiences/data/experiences';

type ManageBookingResponse = { ok: boolean; data: ManageBookingData };

const applyVoyageBase = (
  booking: ManageBookingData,
  vhList: VoyageHistoryReservation[],
  currentId: string | null,
): ManageBookingData => {
  const id = currentId ?? String(booking.reservationId ?? '');
  const match = vhList.find(r => String(r.id) === id);
  if (!match) return booking;
  return {
    ...booking,
    destinationName: match.destination || booking.destinationName,
    destinationImage: match.image ?? booking.destinationImage,
    departureDate: match.departureDate ?? booking.departureDate,
    returnDate: match.returnDate ?? booking.returnDate,
    nights: match.nights ?? booking.nights,
  };
};

type ModalName = 'guest' | 'excursion' | 'confirm-payment' | null;

const emptyGuestForm = () => ({ nombre: '', apellidos: '', fecha: '', pasaporte: '' });
const excursionOptions = allExperiences.slice(0, 8);

const parseCapacity = (value?: string | number | null) => {
  if (typeof value === 'number') return Number.isFinite(value) ? value : 1;
  const match = String(value ?? '').match(/\d+/);
  return match ? Number(match[0]) : 1;
};

const FieldLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <label className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">{children}</label>
);

const fieldClass = [
  'manage-booking-field w-full rounded-md border border-white/10 bg-[#07142f] px-4 py-3 text-sm text-slate-100 outline-none transition',
  'placeholder:text-slate-500 focus:border-[#eacea9]/60 focus:ring-2 focus:ring-[#eacea9]/10',
].join(' ');

const formatUsd = (value: number) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);

const normalizeBirthdate = (value: string) => {
  const trimmedValue = value.trim();
  const spanishDate = trimmedValue.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

  if (!spanishDate) {
    return trimmedValue;
  }

  const [, day, month, year] = spanishDate;
  return `${year}-${month}-${day}`;
};

const EmptyBookingState = () => (
  <section className="rounded-xl border border-dashed border-[#eacea9]/20 bg-white/[0.02] px-6 py-16 text-center">
    <span className="material-symbols-outlined text-6xl text-[#eacea9]/25">event_busy</span>
    <h2 className="mt-5 text-2xl font-bold text-white">No tienes reservas activas</h2>
    <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400">
      Cuando completes una reserva, sus detalles aparecerán aquí para gestionarla.
    </p>
  </section>
);

const ManageBookingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const reservationId = searchParams.get('reservationId');

  const [booking, setBooking] = useState<ManageBookingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<ModalName>(null);
  const [guestForm, setGuestForm] = useState(emptyGuestForm);
  const [selectedExcursionId, setSelectedExcursionId] = useState(excursionOptions[0]?.id ?? '');

  const suiteCapacity = booking?.suiteCapacity ?? 1;
  const currentGuests = booking?.guests.length ?? 0;
  const guestLimitReached = currentGuests >= suiteCapacity;
  const remainingGuestSlots = Math.max(suiteCapacity - currentGuests, 0);
  const capacityMessage = `Capacidad de la habitación: ${currentGuests}/${suiteCapacity} huésped${suiteCapacity === 1 ? '' : 'es'}. Puedes añadir ${remainingGuestSlots} acompañante${remainingGuestSlots === 1 ? '' : 's'} más.`;

  const loadBooking = (id: string | null) => {
    setIsLoading(true);
    setError(null);
    const params = id ? `?reservationId=${id}` : '';

    return Promise.all([
      request<ManageBookingResponse>(`/manage-booking/current${params}`, { method: 'GET' }),
      voyageHistoryApi.current().catch(() => null),
    ])
      .then(([manageRes, historyRes]) => {
        const vhPrimary = historyRes?.data.upcomingReservation ?? null;
        const vhOthers  = historyRes?.data.upcomingReservations ?? [];
        const vhList    = [...(vhPrimary ? [vhPrimary] : []), ...vhOthers];
        setBooking(applyVoyageBase(manageRes.data, vhList, id));
      })
      .catch((requestError) => {
        setBooking(null);
        const message = requestError instanceof Error ? requestError.message : '';
        if (!message.toLowerCase().includes('reserva activa')) {
          setError(message || 'No se pudo cargar la reserva desde el servidor.');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadBooking(reservationId);
  }, [reservationId]);

  const runAction = async (action: () => Promise<{ data: ManageBookingData }>) => {
    setIsSaving(true);
    setError(null);
    try {
      const response = await action();
      setBooking(response.data);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'No se pudo guardar el cambio.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddGuest = () => {
    if (guestLimitReached) {
      setError(`No puedes añadir más huéspedes. La capacidad máxima de esta habitación es de ${suiteCapacity} huésped${suiteCapacity === 1 ? '' : 'es'}.`);
      return;
    }
    setGuestForm(emptyGuestForm());
    setActiveModal('guest');
  };

  const handleEditGuest = (guest: ManageBookingData['guests'][number]) => {
    if (!guest.id) return;
    const fullName = window.prompt('Editar nombre del huésped', guest.name);
    if (!fullName) return;
    const document = window.prompt('Pasaporte o documento', guest.role.replace(/^Pasaporte\s*/i, '')) ?? '';
    runAction(() => manageBookingApi.updateGuest(guest.id!, { reservationId: booking?.reservationId, fullName, document }));
  };

  const handleDeleteGuest = (guest: ManageBookingData['guests'][number]) => {
    if (!guest.id || guest.isElite || !window.confirm(`Eliminar a ${guest.name} de la reserva?`)) return;
    runAction(() => manageBookingApi.deleteGuest(guest.id!, { reservationId: booking?.reservationId }));
  };

  const handleAddExcursion = () => {
    setSelectedExcursionId(excursionOptions[0]?.id ?? '');
    setActiveModal('excursion');
  };

  const submitGuest = () => {
    if (guestLimitReached) {
      setError(`No puedes añadir más huéspedes. La capacidad máxima de esta habitación es de ${suiteCapacity} huésped${suiteCapacity === 1 ? '' : 'es'}.`);
      setActiveModal(null);
      return;
    }

    const fullName = `${guestForm.nombre.trim()} ${guestForm.apellidos.trim()}`.trim();
    const birthdate = normalizeBirthdate(guestForm.fecha);

    if (!fullName || !guestForm.pasaporte.trim() || !birthdate) {
      setError('Completa nombre, fecha de nacimiento y pasaporte del huésped.');
      return;
    }

    runAction(() =>
      manageBookingApi.addGuest({
        reservationId: booking?.reservationId,
        fullName,
        document: guestForm.pasaporte,
        birthdate,
      }),
    );
    setActiveModal(null);
  };

  const submitExcursion = () => {
    const selectedExcursion = excursionOptions.find((option) => option.id === selectedExcursionId);
    if (!selectedExcursion) {
      setError('Selecciona una excursión.');
      return;
    }

    setActiveModal('confirm-payment');
  };

  const confirmExcursionPayment = async () => {
    const selectedExcursion = excursionOptions.find((option) => option.id === selectedExcursionId);
    if (!selectedExcursion) {
      setError('Selecciona una excursión.');
      return;
    }

    await runAction(() =>
      manageBookingApi.addExcursion({
        reservationId: booking?.reservationId,
        name: selectedExcursion.title,
        price: selectedExcursion.price,
      }),
    );
    setActiveModal(null);
  };

  const selectedExcursion = excursionOptions.find((option) => option.id === selectedExcursionId) ?? excursionOptions[0];
  const paymentMethod = booking?.payments.find((item) => item.label.toLowerCase().includes('método') || item.label.toLowerCase().includes('metodo'));
  useEffect(() => {
    return () => {
      setIsSaving(false);
    };
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#0e1a34] text-slate-200" translate="no">
      <Navbar />
      <BackButton />
      <main className="flex-1 px-6 lg:px-20 pt-28 pb-10 max-w-7xl mx-auto w-full">
        <HeroSection booking={booking} isLoading={isLoading} />
        {error ? (
          <div className="mb-8 rounded-xl border border-red-300/20 bg-red-500/10 px-5 py-4 text-sm text-red-100">
            {error}
          </div>
        ) : null}
        {isSaving ? (
          <div className="mb-8 rounded-xl border border-[#eacea9]/20 bg-[#eacea9]/10 px-5 py-4 text-sm text-[#eacea9]">
            Guardando cambios...
          </div>
        ) : null}
        {!isLoading && !booking ? (
          <EmptyBookingState />
        ) : booking ? (
          <>
            <ShipSummaryCard booking={booking} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <CabinSelection booking={booking} />
                <GuestList guests={booking?.guests} onAddGuest={handleAddGuest} onEditGuest={handleEditGuest} onDeleteGuest={handleDeleteGuest} />
              </div>
              <div className="space-y-8">
                <ExcursionsList excursiones={booking?.excursions} onAddExcursion={handleAddExcursion} />
                <PaymentDetails payments={booking?.payments} />
                <ConciergeCard booking={booking} />
              </div>
            </div>
          </>
        ) : null}
      </main>
      {activeModal ? (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-[#020817]/80 px-4 py-8 backdrop-blur-sm">
          <div className="w-full max-w-3xl rounded-xl border border-[#eacea9]/20 bg-[#0e1a34] p-6 shadow-2xl">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#eacea9]">
                  Gestión de reserva
                </p>
                <h3 className="mt-2 text-3xl font-serif text-white">
                  {activeModal === 'guest' ? 'Añadir acompañante' : null}
                  {activeModal === 'excursion' ? 'Añadir excursión' : null}
                  {activeModal === 'confirm-payment' ? 'Confirmar pago adicional' : null}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="rounded-full border border-white/10 p-2 text-slate-300 transition hover:border-[#eacea9]/40 hover:text-[#eacea9]"
                aria-label="Cerrar"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            {activeModal === 'guest' ? (
              <div className="space-y-6">
                <div className="rounded-lg border border-[#eacea9]/15 bg-[#eacea9]/10 px-4 py-3 text-sm text-[#f5e2bd]">
                  {capacityMessage}
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <FieldLabel>Nombre</FieldLabel>
                    <input className={fieldClass} value={guestForm.nombre} onChange={(e) => setGuestForm((form) => ({ ...form, nombre: e.target.value }))} placeholder="Ej. Isabella" />
                  </div>
                  <div className="space-y-2">
                    <FieldLabel>Apellidos</FieldLabel>
                    <input className={fieldClass} value={guestForm.apellidos} onChange={(e) => setGuestForm((form) => ({ ...form, apellidos: e.target.value }))} placeholder="Ej. Valderrama" />
                  </div>
                  <div className="space-y-2">
                    <FieldLabel>Fecha de nacimiento</FieldLabel>
                    <input
                      className={fieldClass}
                      inputMode="numeric"
                      onChange={(e) => setGuestForm((form) => ({ ...form, fecha: e.target.value }))}
                      pattern="\d{2}/\d{2}/\d{4}"
                      placeholder="dd/mm/aaaa"
                      type="text"
                      value={guestForm.fecha}
                    />
                  </div>
                  <div className="space-y-2">
                    <FieldLabel>Documento o pasaporte</FieldLabel>
                    <input className={fieldClass} value={guestForm.pasaporte} onChange={(e) => setGuestForm((form) => ({ ...form, pasaporte: e.target.value }))} placeholder="P-00000000" />
                  </div>
                </div>
                <button type="button" onClick={submitGuest} className="w-full rounded-md bg-[#dec29e] px-6 py-4 text-sm font-bold text-[#3e2d14] transition hover:brightness-110">
                  Guardar acompañante
                </button>
              </div>
            ) : null}

            {activeModal === 'excursion' ? (
              <div className="space-y-5">
                <div className="grid gap-3 md:grid-cols-2">
                  {excursionOptions.map((option) => {
                    const isSelected = selectedExcursionId === option.id;
                    const price = formatUsd(option.price);

                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setSelectedExcursionId(option.id)}
                        className={`rounded-lg border px-4 py-3 text-left transition ${
                          isSelected
                            ? 'border-[#eacea9] bg-[#eacea9]/15 text-white'
                            : 'border-white/10 bg-white/[0.03] text-slate-300 hover:border-[#eacea9]/40'
                        }`}
                      >
                        <span className="flex items-center justify-between gap-3">
                          <span className="text-sm font-bold">{option.title}</span>
                          <span className="shrink-0 text-xs font-bold text-[#eacea9]">{price}</span>
                        </span>
                        <span className="mt-1 block text-[11px] text-slate-400">{option.location}</span>
                      </button>
                    );
                  })}
                </div>
                <button type="button" onClick={submitExcursion} className="w-full rounded-md bg-[#dec29e] px-6 py-4 text-sm font-bold text-[#3e2d14] transition hover:brightness-110">
                  Continuar al pago
                </button>
              </div>
            ) : null}

            {activeModal === 'confirm-payment' && selectedExcursion ? (
              <div className="space-y-5">
                <div className="rounded-lg border border-[#eacea9]/20 bg-white/[0.03] p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">Excursión seleccionada</p>
                      <h4 className="mt-2 text-xl font-bold text-white">{selectedExcursion.title}</h4>
                      <p className="mt-1 text-sm text-slate-400">{selectedExcursion.location}</p>
                    </div>
                    <p className="text-lg font-bold text-[#eacea9]">{formatUsd(selectedExcursion.price)}</p>
                  </div>
                </div>

                <div className="rounded-lg border border-white/10 bg-[#07142f] p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">Método de pago anterior</p>
                  <p className="mt-2 text-lg font-bold text-white">{paymentMethod?.value ?? 'Método registrado'}</p>
                  <p className="mt-1 text-xs text-slate-400">Se cobrará este cargo extra y luego se actualizará el total de la reserva.</p>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <button type="button" onClick={() => setActiveModal('excursion')} className="rounded-md border border-white/10 px-6 py-4 text-sm font-bold text-slate-200 transition hover:border-[#eacea9]/40">
                    Volver
                  </button>
                  <button type="button" onClick={confirmExcursionPayment} className="rounded-md bg-[#dec29e] px-6 py-4 text-sm font-bold text-[#3e2d14] transition hover:brightness-110">
                    Confirmar pago adicional
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
      <Footer />
    </div>
  );
};

export default ManageBookingPage;


