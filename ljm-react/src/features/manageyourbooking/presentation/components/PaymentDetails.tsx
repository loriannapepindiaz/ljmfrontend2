import React from 'react';

const payments: Array<{ label: string; value: string; color: string }> = [];

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
        {payments.length === 0 ? (
          <div className="rounded-lg border border-dashed border-white/10 bg-white/[0.03] px-4 py-8 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Sin movimientos de pago</p>
            <p className="mt-2 text-xs text-slate-500">Los pagos apareceran cuando exista una reserva activa.</p>
          </div>
        ) : payments.map((item) => (
          <div key={item.label} className="flex justify-between text-sm">
            <span className="text-slate-400">{item.label}</span>
            <span className={`font-bold ${item.color}`}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentDetails;
