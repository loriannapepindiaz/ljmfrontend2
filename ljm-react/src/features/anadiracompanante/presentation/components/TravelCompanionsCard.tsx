import { X } from "lucide-react";

const companions: Array<{ name: string; role: string; id: string; image?: string }> = [];

export default function TravelCompanionsCard() {
  return (
    <div className="h-fit rounded-xl border border-white/5 bg-[#0f1b35] p-8 shadow-[0_40px_80px_rgba(2,13,39,0.5)] md:p-10">
      <div className="mb-12 flex items-start justify-between">
        <div>
          <h4 className="text-2xl text-[#d9e2ff]" style={{ fontFamily: "'Noto Serif', serif" }}>
            Companeros de Viaje
          </h4>
          <p className="mt-1 text-xs text-[#8f9098]">Confirmados para esta expedicion</p>
        </div>
      </div>

      <div className="mb-16 space-y-8">
        {companions.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/10 bg-white/[0.03] px-5 py-10 text-center">
            <p className="text-sm font-semibold text-[#d9e2ff]">No hay acompanantes agregados</p>
            <p className="mt-2 text-xs leading-relaxed text-[#8f9098]">
              Los acompanantes apareceran aqui cuando se registren en esta reserva.
            </p>
          </div>
        ) : companions.map((companion) => (
          <div key={companion.id} className="group flex items-center justify-between">
            <div className="flex items-center gap-5">
              {companion.image ? (
                <img
                  alt={companion.name}
                  className="h-14 w-14 rounded-full object-cover grayscale"
                  src={companion.image}
                />
              ) : null}
              <div>
                <p className="text-base font-semibold text-[#d9e2ff]">{companion.name}</p>
                <p className="mt-0.5 text-[10px] uppercase tracking-widest text-[#8f9098]">
                  {companion.role} - {companion.id}
                </p>
              </div>
            </div>

            <button
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#8f9098]/40 transition-all duration-300 hover:bg-[#ffb4ab]/10 hover:text-[#ffb4ab]"
              type="button"
            >
              <X size={18} />
            </button>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <button
          className="flex w-full items-center justify-center rounded-md bg-gradient-to-r from-[#bfa889] to-[#97805f] py-5 text-center text-[12px] font-bold uppercase tracking-[0.25em] text-[#3e2d14] shadow-xl transition-all duration-500 hover:brightness-105"
          style={{ fontFamily: "'Noto Serif', serif" }}
          type="button"
        >
          Confirmar y Continuar
        </button>
        <p className="text-center text-[9px] uppercase tracking-[0.3em] text-[#8f9098]/60">
          Paso 3 de 5: Configuracion de Tripulacion
        </p>
      </div>
    </div>
  );
}
