// features/payment/presentation/components/PriceBreakdown.tsx
import React, { useState } from 'react';

interface PriceBreakdownProps {
  selectedMethod?: any;
}

type PaymentStatus = 'idle' | 'processing' | 'success';

const PriceBreakdown: React.FC<PriceBreakdownProps> = ({ selectedMethod }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');

  const handleFinalConfirm = () => {
    setPaymentStatus('processing');
    
    // Simulación de la pasarela de pago (3 segundos)
    setTimeout(() => {
      setPaymentStatus('success');
      
      // Aquí podrías guardar en base de datos o redirigir tras un breve delay
      console.log("Pago guardado exitosamente en LJM Sealine");
      
      setTimeout(() => {
        // Opcional: Cerrar modal o redirigir a "Mis Viajes"
        // setShowConfirmModal(false);
      }, 3000);
    }, 3000);
  };

  const closePortal = () => {
    if (paymentStatus !== 'processing') {
      setShowConfirmModal(false);
      setPaymentStatus('idle');
    }
  };

  return (
    <section className="bg-white rounded-[2rem] p-8 premium-shadow border border-gray-100 h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-8">
          <span className="material-symbols-outlined text-maroon-gold">receipt</span>
          <h3 className="text-xs font-bold text-night-blue uppercase tracking-[0.2em]">Desglose de Tarifas</h3>
        </div>

        <div className="space-y-5">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Alojamiento Suite (10 noches)</span>
            <span className="font-semibold text-night-blue">€12,500.00</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Tasas Portuarias & Impuestos</span>
            <span className="font-semibold text-night-blue">€1,875.00</span>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="bg-off-white/50 p-6 rounded-2xl border border-gray-100 mb-8">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[9px] text-gray-400 uppercase font-bold tracking-widest mb-1.5">Inversión Total</p>
              <p className="text-4xl font-magiona font-bold text-night-blue leading-none">€14,375.00</p>
            </div>
            <div className="px-3 py-1 bg-night-blue rounded-full">
               <span className="text-[9px] font-bold text-pearl-beige uppercase tracking-[0.1em]">EUR</span>
            </div>
          </div>
        </div>

        <button 
          onClick={() => selectedMethod && setShowConfirmModal(true)}
          className={`w-full py-5 rounded-2xl text-base font-bold uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-4 ${
            selectedMethod ? 'bg-night-blue text-pearl-beige shadow-xl hover:scale-[1.01]' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {selectedMethod ? 'Pagar Ahora' : 'Falta Método de Pago'}
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>

      {/* MODAL DE PROCESAMIENTO DINÁMICO */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-night-blue/60 backdrop-blur-sm" onClick={closePortal}></div>
          
          <div className="relative bg-white rounded-[2.5rem] p-8 max-w-[340px] w-full shadow-2xl animate-in zoom-in-95 duration-200 min-h-[400px] flex flex-col justify-center">
            
            {/* ESTADO 1: CONFIRMACIÓN */}
            {paymentStatus === 'idle' && (
              <div className="text-center animate-in fade-in duration-300">
                <div className="mx-auto w-10 h-10 bg-pearl-beige/20 rounded-full flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-maroon-gold text-xl">lock</span>
                </div>
                <h4 className="font-display text-xl text-night-blue italic">Confirmar Transacción</h4>
                <p className="text-[8px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">Seguridad LJM Sealine</p>

                <div className="bg-off-white rounded-[1.5rem] p-4 mb-6 border border-gray-100">
                  <div className="flex items-center gap-3 mb-4 bg-white p-2.5 rounded-xl border border-pearl-beige/30">
                    <img src={selectedMethod?.img} className="w-8 h-5 object-contain" alt="icon" />
                    <div className="text-left">
                      <p className="text-[10px] font-bold text-night-blue">
                        {selectedMethod?.last4 ? `Tarj. •••• ${selectedMethod.last4}` : selectedMethod.name}
                      </p>
                      <p className="text-[7px] text-green-600 font-bold uppercase">Listo para procesar</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[9px] font-bold text-gray-400 uppercase">Total</span>
                    <span className="text-xl font-bold text-night-blue">€14,375.00</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button 
                    onClick={handleFinalConfirm}
                    className="w-full bg-night-blue text-pearl-beige py-4 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] hover:brightness-125 transition-all"
                  >
                    Confirmar Pago
                  </button>
                  <button onClick={closePortal} className="text-[9px] font-bold text-gray-400 uppercase">Cancelar</button>
                </div>
              </div>
            )}

            {/* ESTADO 2: PROCESANDO (SPINNER) */}
            {paymentStatus === 'processing' && (
              <div className="text-center animate-in fade-in zoom-in duration-500">
                <div className="relative mx-auto w-20 h-20 mb-6">
                  <div className="absolute inset-0 border-4 border-pearl-beige/30 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-t-maroon-gold rounded-full animate-spin"></div>
                </div>
                <h4 className="font-display text-xl text-night-blue italic mb-2">Procesando Pago</h4>
                <p className="text-[9px] text-gray-400 uppercase tracking-[0.2em] animate-pulse">Estableciendo conexión segura...</p>
              </div>
            )}

            {/* ESTADO 3: ÉXITO (CHECK) */}
            {paymentStatus === 'success' && (
              <div className="text-center animate-in zoom-in duration-500">
                <div className="mx-auto w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
                  <span className="material-symbols-outlined text-green-600 text-5xl animate-in slide-in-from-bottom-2">check_circle</span>
                </div>
                <h4 className="font-display text-2xl text-night-blue italic mb-2">¡Pago Exitoso!</h4>
                <p className="text-[10px] text-gray-500 mb-8 leading-relaxed">Su reserva en LJM Sealine ha sido confirmada. En breve recibirá los detalles en su correo.</p>
                
                <button 
                  onClick={closePortal}
                  className="w-full bg-night-blue text-pearl-beige py-4 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em]"
                >
                  Finalizar
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </section>
  );
};

export default PriceBreakdown;