import { X } from "lucide-react";

const companions = [
  {
    name: "Adriana L.",
    role: "Socia Elite",
    id: "ID 9821",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDPSbIQnesEqaGKUzjwuxu1c-tCku-cvrxKkw0h3m93y0eu5HM-GXf0Dxrof66zBqk5hQUKwlwxBmWMCg1AMsNfdZpIKbGS2ux7s3egyQOBiS17SQj_oVmAK8KP9p_8ZBI95yWNhbzelVURRx8uolParyAElcW0pRlNljukLfaI2j4GaAzWqfCsXpveOO6CLse6jp__Gs5JTwfpa2U5n61Qaaea5beWng-IZh_K8TKNpBwVeTJgyy7oa8N5MSFfFTlre3xJO7q7CxEY",
  },
  {
    name: "Marco Castelli",
    role: "Invitado",
    id: "ID 5520",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD6V4tp49tia7qEE9-uCRSjnDJGkIWGL00B-2bG5i0RiT93HWO75eEUBet4U-eYJf_fYhd1LYSQruY66MW4Zm9Nz5r5STNn1lQFrv4reTYJhItkeElksbGuRoo5wbY6wtWPEkJ-nRY30YQCCaL3mqQYod2ZJtoN0xa6XFCKnk63dL9NzIvX4QI6z4KzbBnIeA9pqPwlPLI8YVKWFZa5uuWDJRFWdUhbxezbm5VNpisMp9VjyYNq-uLX6lZ6uD3Q9H0Fx5dKpQ58Y-kL",
  },
  {
    name: "Sofia Rossi",
    role: "Socia",
    id: "ID 2211",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDWRu5-G3aG9Rn1XPnuzIcWhLtX9tuT0Pk3dj-YC1dx9IToHhsOGzC4oqaMN8MWoZNQd3deFBlFQDq9qe2CCt9Re0KNDjVW-4YBS8oFDCCIhJy4afgJZpfJmwWRYmjU2X2DlbHBmqTUCF0KsREUe6Do-kRGSLYnJGpH67z062T_rqI4gE4CN12y9cBVBv7VI13cKSDf1fOXc3v9MRgE1pYQfxmK0J7_8CjnXqhHN259TuaWU_BJq1Cp3pveEPhdubJDZxyai8IE59ff",
  },
];

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
        {companions.map((companion) => (
          <div key={companion.id} className="group flex items-center justify-between">
            <div className="flex items-center gap-5">
              <img
                alt={companion.name}
                className="h-14 w-14 rounded-full object-cover grayscale"
                src={companion.image}
              />
              <div>
                <p className="text-base font-semibold text-[#d9e2ff]">{companion.name}</p>
                <p className="mt-0.5 text-[10px] uppercase tracking-widest text-[#8f9098]">
                  {companion.role} • {companion.id}
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
