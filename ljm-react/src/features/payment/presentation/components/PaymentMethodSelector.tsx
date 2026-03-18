// features/payment/presentation/components/PaymentMethodSelector.tsx
import React, { useState } from 'react';

interface PaymentMethodSelectorProps {
  onSelect: (data: any) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({ onSelect }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [showManageModal, setShowManageModal] = useState(false);
  const [step, setStep] = useState<'list' | 'form'>('list');
  const [isProcessing, setIsProcessing] = useState(false);

  const [cardData, setCardData] = useState({ name: '', number: '', exp: '', cvv: '' });

  const methods = [
    { 
      id: 'visa', 
      name: 'Visa / Mastercard', 
      img: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Visa_Inc._logo_%282021%E2%80%93present%29.svg',
      type: 'card'
    },
    { 
      id: 'amex', 
      name: 'American Express', 
      img: 'https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg',
      type: 'card'
    },
    { 
      id: 'apple', 
      name: 'Apple Pay', 
      img: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg',
      type: 'wallet'
    },
    { 
      id: 'paypal', 
      name: 'PayPal', 
      img: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg',
      type: 'wallet'
    },
    { 
      id: 'google', 
      name: 'Google Pay', 
      img: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg',
      type: 'wallet'
    }
  ];

  const formatCardNumber = (value: string) => {
    return value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').trim();
  };

  const formatExpiry = (value: string) => {
    return value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').substring(0, 5);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'number') {
      formattedValue = formatCardNumber(value).substring(0, 19);
    }
    if (name === 'exp') {
      formattedValue = formatExpiry(value);
    }
    if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').substring(0, 3);
    }
    if (name === 'name') {
      formattedValue = value.toUpperCase();
    }

    setCardData(prev => ({ ...prev, [name]: formattedValue }));
  };

  const currentMethod = methods.find(m => m.id === selected);
  const isCardMethod = currentMethod?.type === 'card';

  const handleSelectMethod = (methodId: string) => {
    setSelected(methodId);
    setStep('form');
  };

  const handleEdit = () => {
    setStep('form');
    setShowManageModal(true);
  };

  const handleConfirm = () => {
    if (isCardMethod) {
      // Enviamos los datos al componente padre para PriceBreakdown
      onSelect({
        id: selected,
        name: currentMethod?.name,
        img: currentMethod?.img,
        last4: cardData.number.slice(-4),
        type: 'card'
      });
      setShowManageModal(false);
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      onSelect({
        id: selected,
        name: currentMethod?.name,
        img: currentMethod?.img,
        type: 'wallet'
      });
      setIsProcessing(false);
      setShowManageModal(false);
    }, 2500);
  };

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 flex-1 flex flex-col overflow-hidden relative min-h-[300px] shadow-sm">
      <div className="p-8 h-full flex flex-col justify-between">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-maroon-gold">payments</span>
          <h3 className="text-[11px] font-bold text-night-blue uppercase tracking-[0.3em]">Forma de Pago</h3>
        </div>

        <div className="flex items-center h-[85px] my-6"> 
          {selected ? (
            <div 
              onClick={handleEdit}
              className="w-full h-full flex items-center justify-between p-6 border-2 border-pearl-beige bg-pearl-beige/5 rounded-2xl cursor-pointer hover:bg-pearl-beige/10 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-9 flex items-center justify-center bg-white rounded-lg border border-gray-100 p-1.5 shadow-sm">
                  <img 
                    src={currentMethod?.img} 
                    className="h-full w-full object-contain" 
                    alt={`${currentMethod?.name} logo`} 
                    loading="lazy"
                    onError={(e) => { 
                      e.currentTarget.src = `https://via.placeholder.com/56x36?text=${currentMethod?.name.slice(0,4)}`; 
                    }}
                  />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-night-blue uppercase tracking-widest opacity-60 italic">Método Seleccionado</p>
                  <p className="text-xs font-display italic text-maroon-gold">
                    {isCardMethod && cardData.number ? `•••• •••• •••• ${cardData.number.slice(-4)}` : currentMethod?.name}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-maroon-gold uppercase underline">Editar</span>
            </div>
          ) : (
            <button 
              onClick={() => { setStep('list'); setShowManageModal(true); }}
              className="w-full h-full border-2 border-dashed border-pearl-beige/60 rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] text-maroon-gold hover:border-maroon-gold hover:bg-pearl-beige/5 transition-all flex items-center justify-center gap-4"
            >
              <span className="material-symbols-outlined text-xl">add_circle</span>
              Gestionar método de pago
            </button>
          )}
        </div>
        
        <p className="text-[9px] text-gray-400 text-center italic">Pagos procesados de forma segura por LJM Sealine.</p>
      </div>

      {showManageModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-night-blue/80 backdrop-blur-md" onClick={() => setShowManageModal(false)}></div>
          
          <div className="relative bg-white border border-pearl-beige/20 rounded-[2.5rem] p-6 sm:p-8 max-w-xs sm:max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-display text-2xl sm:text-3xl text-night-blue italic tracking-tight">
                {step === 'list' ? 'Métodos de Pago' : (isCardMethod ? 'Datos de Tarjeta' : `Confirmar con ${currentMethod?.name}`)}
              </h4>
              <button onClick={() => setShowManageModal(false)} className="text-gray-400 hover:text-night-blue transition-colors">
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {step === 'list' ? (
              <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                {methods.map((m) => (
                  <button 
                    key={m.id} 
                    onClick={() => handleSelectMethod(m.id)}
                    className="w-full flex items-center gap-4 sm:gap-5 p-4 sm:p-5 rounded-[1.5rem] border border-gray-100 hover:border-pearl-beige hover:bg-pearl-beige/5 transition-all text-left group"
                  >
                    <div className="w-12 h-8 sm:w-14 sm:h-9 flex items-center justify-center bg-white rounded-lg border border-gray-100 p-1.5 shrink-0">
                      <img 
                        src={m.img} 
                        alt={`${m.name} logo`} 
                        className="h-full w-full object-contain"
                        loading="lazy"
                        onError={(e) => { 
                          e.currentTarget.src = `https://via.placeholder.com/56x36?text=${m.name.slice(0,4)}`; 
                        }}
                      />
                    </div>
                    <p className="text-xs sm:text-sm font-bold text-night-blue uppercase tracking-widest">{m.name}</p>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-5 animate-in slide-in-from-right-8 duration-300">
                {isCardMethod ? (
                  <>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Titular</label>
                      <input name="name" value={cardData.name} onChange={handleInputChange} type="text" placeholder="NOMBRE COMPLETO" className="w-full bg-off-white border-none rounded-xl p-3.5 sm:p-4 text-sm focus:ring-1 focus:ring-pearl-beige uppercase outline-none" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Número de Tarjeta</label>
                      <input name="number" value={cardData.number} onChange={handleInputChange} type="text" placeholder="0000 0000 0000 0000" className="w-full bg-off-white border-none rounded-xl p-3.5 sm:p-4 text-sm focus:ring-1 focus:ring-pearl-beige outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Vencimiento</label>
                        <input name="exp" value={cardData.exp} onChange={handleInputChange} type="text" placeholder="MM/YY" className="w-full bg-off-white border-none rounded-xl p-3.5 sm:p-4 text-sm focus:ring-1 focus:ring-pearl-beige text-center outline-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">CVV</label>
                        <input 
                          name="cvv" 
                          value={cardData.cvv} 
                          onChange={handleInputChange} 
                          type="password" 
                          placeholder="***" 
                          className="w-full bg-off-white border-none rounded-xl p-3.5 sm:p-4 text-sm focus:ring-1 focus:ring-pearl-beige text-center outline-none" 
                          maxLength={3}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="py-4 text-center">
                    {isProcessing ? (
                      <div className="animate-pulse">
                        <p className="text-sm text-night-blue font-semibold mb-4">
                          Abriendo hoja de pago segura de {currentMethod?.name}...
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm text-night-blue italic mb-6 leading-relaxed">
                        Al confirmar, se abrirá la hoja de pago segura de {currentMethod?.name} para completar la transacción.
                      </p>
                    )}
                  </div>
                )}

                <button 
                  onClick={handleConfirm}
                  disabled={isProcessing}
                  className={`w-full bg-night-blue text-pearl-beige py-4 sm:py-5 rounded-2xl text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] shadow-xl hover:brightness-125 transition-all mt-4 ${isProcessing ? 'opacity-70' : ''}`}
                >
                  {isProcessing ? 'Procesando...' : (isCardMethod ? 'Confirmar Tarjeta' : `Proceder con ${currentMethod?.name}`)}
                </button>

                <button 
                  onClick={() => setStep('list')} 
                  className="w-full text-[9px] font-bold text-gray-400 uppercase text-center tracking-widest mt-3 hover:text-night-blue transition-colors"
                  disabled={isProcessing}
                >
                  Elegir otro método
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodSelector;