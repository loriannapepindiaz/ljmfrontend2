// features/payment/presentation/components/PaymentMethodSelector.tsx
import React from 'react';

const PaymentMethodSelector: React.FC = () => {
  return (
    <div className="bg-white rounded-[2rem] premium-shadow border border-gray-100 flex-1 flex flex-col overflow-hidden">
      <div className="p-8">
        <div className="flex items-center gap-3 mb-8">
          <span className="material-symbols-outlined text-maroon-gold">payments</span>
          <h3 className="text-xs font-bold text-night-blue uppercase tracking-[0.2em]">Forma de Pago</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <label className="relative flex items-center p-4 border-2 border-pearl-beige bg-pearl-beige/5 rounded-2xl cursor-pointer group transition-all">
            <div className="flex items-center gap-4 w-full">
              <input
                checked
                className="w-4 h-4 text-night-blue border-pearl-beige focus:ring-night-blue"
                name="payment"
                type="radio"
              />
              <div className="w-10 h-7 bg-white border border-gray-100 rounded flex items-center justify-center p-1 shadow-sm">
                <img
                  alt="Visa"
                  className="h-full object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBshoCYghOiAuKea9RzgC4WNTTM7ug0pmfN-ga5duGszawzk661wMxLtsOCEDcf52zBPtBHMCHarkZxSp9wvYIbmm5Fr2SgtyZkeyAXFYnBDuhKmjXCEmtU2G4yIrxeRneHHZInY_uGUo1I-8yIGx26w_qhVotxS3kMRyOSKazxHOL6XgLMYbYlPzTOeb8aORIZMmvUDWBM3aaDi00xezUe9w4oyFYNx0aIEUglaSxTBG2poDNxFooWZT-mVGt74_42FHrSciZVu0o"
                />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold">Visa •••• 4321</p>
                <p className="text-[9px] text-gray-400 uppercase tracking-widest">Expira 12/26</p>
              </div>
            </div>
          </label>

          <label className="relative flex items-center p-4 border border-gray-200 hover:border-pearl-beige rounded-2xl cursor-pointer transition-all bg-white">
            <div className="flex items-center gap-4 w-full">
              <input
                className="w-4 h-4 text-night-blue border-gray-300 focus:ring-night-blue"
                name="payment"
                type="radio"
              />
              <div className="w-10 h-7 bg-white border border-gray-100 rounded flex items-center justify-center p-1 shadow-sm">
                <img
                  alt="Apple Pay"
                  className="h-full object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-VnOlkx9kUVK4_h57vHmAKu2BXCQSuKCKxSKZyG4PNME8SXrxQs9HuTQjqtWbfMC1Vss40exXxsSXR4ErK6JA7ezsSv4iHEFEx3QmpPYLHgZ7Zw--SkVs3qfaf4HJJptETqpCnxn-RyouXYTzGNwIMGfQJByyWcUJZ3_RaQhYVOaowi8Jkd1E8rf73eobKJL6hhpw7GiP4FVovC4swDBm2bufm8HuTQe3Z_TFoRissDA0iXYQc8mDAybevYQMBP-llwpfV7ILYhA"
                />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold">Apple Pay</p>
                <p className="text-[9px] text-gray-400 uppercase tracking-widest">Verificación FaceID</p>
              </div>
            </div>
          </label>
        </div>

        <div className="pt-4">
          <button className="w-full py-4 border border-dashed border-gray-200 rounded-xl text-[9px] font-bold uppercase tracking-widest text-gray-400 hover:border-maroon-gold hover:text-maroon-gold transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-base">add</span>
            Gestionar métodos de pago
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;