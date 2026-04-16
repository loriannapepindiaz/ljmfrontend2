const fields = [
  { label: "Nombre", placeholder: "Ej. Isabella", type: "text" },
  { label: "Apellidos", placeholder: "Ej. Valderrama", type: "text" },
  { label: "Fecha de Nacimiento", type: "date" },
  { label: "ID / Pasaporte", placeholder: "P-00000000", type: "text" },
];

export default function GuestRegistrationForm() {
  return (
    <section className="space-y-10 rounded-xl border border-white/5 bg-[#1e2944]/20 p-8 md:p-12">
      <h3 className="text-3xl text-[#d9e2ff]" style={{ fontFamily: "'Noto Serif', serif" }}>
        Registro de Invitado
      </h3>

      <form className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
        {fields.map((field) => (
          <div key={field.label} className="space-y-3">
            <label className="mb-1 block text-[10px] uppercase tracking-[0.25em] text-[#8f9098]">
              {field.label}
            </label>
            <input
              className="w-full rounded-none border-x-0 border-b border-t-0 border-[#45464d]/30 bg-transparent px-4 py-3 text-[#d9e2ff] transition-colors focus:border-[#dec29e] focus:ring-0"
              placeholder={field.placeholder}
              type={field.type}
            />
          </div>
        ))}

        <div className="flex items-center justify-between pt-6 md:col-span-2">
          <button
            className="flex min-w-[200px] items-center justify-center rounded-md bg-[#dec29e] px-10 py-4 text-[11px] uppercase tracking-[0.2em] text-[#3e2d14] shadow-lg transition-all hover:brightness-110"
            style={{ fontFamily: "'Noto Serif', serif" }}
            type="button"
          >
            Agregar a la lista
          </button>
        </div>
      </form>
    </section>
  );
}
