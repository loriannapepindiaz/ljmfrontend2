import React from 'react';

const CabinSelection: React.FC = () => {
  return (
    <div
      className="rounded-xl p-6"
      style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(16px)', border: '1px solid rgba(234,230,169,0.1)' }}
    >
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-xl font-bold flex items-center gap-3 text-white">
          <span className="material-symbols-outlined text-[#eacea9]">king_bed</span>
          Selección de Cabina
        </h4>
        <button className="text-xs font-bold text-[#eacea9] hover:underline">
          Cambiar Cabina
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div
          className="w-full md:w-48 h-32 rounded-lg bg-cover bg-center border border-white/5 shrink-0"
          style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBUFDF6X7qEIm7IH5N99obZDnx39YHSU9BlKDaCwR2WVIY3ge5-v_g4sjDJO0g1JupgSJhVn_7XDA5pRexE6WT_eBn3mvEHkbFo4eTtFZYGXR701Wr2ex8xtSeqe3fh3xNr5efUAbf3YIwbGDniUkkgA7wpJyrcHNvKUJpvjBIn7ih7kdVN1kPl4WmWDTGvO_za95Aul7mBYkrm2P-pAsofpt5TmovcrNui5UrIWtxeamnsSz72I9bx2WsFgjFPrcrNwQKaelTZMzzs')` }}
        />
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <h5 className="text-lg font-bold text-white">Suite Royal Ocean</h5>
            <span className="bg-[#eacea9] text-[#0e1a34] text-[10px] font-black px-2 py-0.5 rounded">CUBIERTA 12</span>
          </div>
          <p className="text-slate-400 text-sm mb-4 leading-relaxed">
            Suite 12402 • Balcón Privado • Servicio de Mayordomo • 850 m² de lujo puro con ventanas panorámicas de piso a techo.
          </p>
          <button className="px-5 py-2 rounded bg-[#eacea9]/5 border border-[#eacea9]/20 text-[#eacea9] text-xs font-bold hover:bg-[#eacea9] hover:text-[#0e1a34] transition-all uppercase tracking-widest">
            Mejorar Suite
          </button>
        </div>
      </div>
    </div>
  );
};

export default CabinSelection;