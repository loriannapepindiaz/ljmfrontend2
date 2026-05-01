import React from 'react';

const metrics = [
  { label: 'Profesionalismo', pct: '92%', value: '92%' },
  { label: 'Eficiencia',      pct: '98%', value: '98%' },
  { label: 'Tiempo de Respuesta', pct: '74%', value: '74%' },
];

const StatsPanel: React.FC = () => {
  return (
    <div
      className="p-8 rounded-lg shadow-[0px_20px_40px_rgba(2,13,39,0.4)] relative"
      style={{ background: 'rgba(30,41,68,0.8)', backdropFilter: 'blur(24px)' }}
    >
      <div className="mb-10 text-center">
        <span className="font-serif text-8xl font-bold text-[#DEC29E] block mb-2">3.75</span>
        <div className="flex justify-center text-[#DEC29E] mb-4 scale-125">
          {['star', 'star', 'star', 'star_half', 'star'].map((icon, i) => (
            <span
              key={i}
              className="material-symbols-outlined"
              style={{
                fontVariationSettings: icon === 'star_half' || icon === 'star' && i >= 3
                  ? "'FILL' 0"
                  : "'FILL' 1",
              }}
            >
              {icon}
            </span>
          ))}
        </div>
        <p className="text-xs uppercase tracking-[0.15em] text-[#D9E2FF]/50">Puntuación Promedio de la Flota</p>
      </div>

      <div className="space-y-8">
        <h4 className="font-serif text-lg italic text-[#D9E2FF] border-b border-[#DEC29E]/10 pb-2">
          Estadísticas del Trimestre Náutico
        </h4>
        {metrics.map(({ label, pct, value }) => (
          <div key={label} className="space-y-2">
            <div className="flex justify-between text-[11px] uppercase tracking-wider text-[#D9E2FF]">
              <span>{label}</span>
              <span className="text-[#DEC29E] font-bold">{value}</span>
            </div>
            <div className="h-[3px] w-full bg-[#131F39] rounded-full">
              <div
                className="h-full rounded-full shadow-[0_0_8px_rgba(222,194,158,0.4)]"
                style={{
                  width: pct,
                  background: 'linear-gradient(to right, rgba(222,194,158,0.4), #DEC29E)',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsPanel;
