import React from 'react';

const PaymentDetails: React.FC = () => {
  return (
    <div
      className="rounded-xl p-6 shadow-[0_0_30px_rgba(120,93,50,0.05)]"
      style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(16px)', border: '1px solid rgba(120,93,50,0.3)' }}
    >
      <h4 className="text-xl font-bold mb-6 flex items-center gap-3 text-white">
        <span className="material-symbols-outlined text-[#eacea9]">account_balance_wallet</span>
        Detalles de Pago
      </h4>

      <div className="space-y-3 mb-6">
        {[
          { label: 'Costo Total del Viaje',     value: '$12,450.00',  color: 'text-white'     },
          { label: 'Excursiones y Restauración', value: '$1,280.00',  color: 'text-white'     },
          { label: 'Saldo Pagado',               value: '-$13,730.00', color: 'text-green-400' },
        ].map((item) => (
          <div key={item.label} className="flex justify-between text-sm">
            <span className="text-slate-400">{item.label}</span>
            <span className={`font-bold ${item.color}`}>{item.value}</span>
          </div>
        ))}
        <div className="h-px bg-white/5 my-2" />
        <div className="flex justify-between items-center">
          <span className="font-bold text-slate-300">Saldo Total Pendiente</span>
          <span className="text-2xl font-bold text-[#eacea9]">$0.00</span>
        </div>
      </div>

      <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20 text-center">
        <p className="text-xs text-green-400 font-bold uppercase tracking-widest">Reserva Totalmente Pagada</p>
      </div>
    </div>
  );
};

export default PaymentDetails;