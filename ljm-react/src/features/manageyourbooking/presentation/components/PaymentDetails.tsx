"use client";

import { Wallet } from "lucide-react";

interface PaymentItem {
  label: string;
  amount: string;
  isCredit?: boolean;
}

interface PaymentDetailsProps {
  items?: PaymentItem[];
  totalDue?: string;
  isPaid?: boolean;
}

const defaultItems: PaymentItem[] = [
  { label: "Total Voyage Cost", amount: "$12,450.00" },
  { label: "Excursions & Dining", amount: "$1,280.00" },
  { label: "Balance Paid", amount: "-$13,730.00", isCredit: true },
];

export function PaymentDetails({
  items = defaultItems,
  totalDue = "$0.00",
  isPaid = true,
}: PaymentDetailsProps) {
  return (
    <div className="glass-card rounded-xl p-6 border-[#785d32]/30 shadow-[0_0_30px_rgba(120,93,50,0.05)] bg-white/[0.02] backdrop-blur-md border border-[#eacea9]/10">
      <h4 className="text-xl font-serif font-bold mb-6 flex items-center gap-3 text-white">
        <Wallet className="w-5 h-5 text-[#eacea9]" />
        Payment Details
      </h4>
      <div className="space-y-3 mb-6">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between text-sm">
            <span className="text-slate-400">{item.label}</span>
            <span
              className={`font-bold ${
                item.isCredit ? "text-green-400" : "text-white"
              }`}
            >
              {item.amount}
            </span>
          </div>
        ))}
        <div className="h-px bg-white/5 my-2" />
        <div className="flex justify-between items-center">
          <span className="font-serif font-bold text-slate-300">
            Total Balance Due
          </span>
          <span className="text-2xl font-bold text-[#eacea9]">{totalDue}</span>
        </div>
      </div>
      {isPaid && (
        <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20 text-center">
          <p className="text-xs text-green-400 font-bold uppercase tracking-widest">
            Booking Fully Paid
          </p>
        </div>
      )}
    </div>
  );
}
