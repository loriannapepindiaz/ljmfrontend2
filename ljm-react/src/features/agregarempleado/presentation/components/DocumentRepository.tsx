import React from 'react';

const documentos = [
  { label: 'Pasaporte en vigor',                pendiente: true  },
  { label: 'Licencia Marítima (COC)',            pendiente: true  },
  { label: 'Certificado Médico (ENG1)',          pendiente: true  },
  { label: 'Libreta de Navegación',             pendiente: false },
  { label: 'Certificado Antecedentes Penales',  pendiente: false },
];

const DocumentRepository: React.FC = () => {
  return (
    <section className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="bg-slate-50 px-8 py-4 border-b border-slate-100">
        <h2 className="text-xl font-bold text-[#0e1a34]">Repositorio Documental</h2>
      </div>
      <div className="p-8">
        <div className="grid grid-cols-12 gap-8">

          {/* Lista documentos */}
          <div className="col-span-12 md:col-span-5 space-y-4">
            <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider">Documentos Obligatorios</h3>
            <ul className="space-y-3">
              {documentos.map((doc) => (
                <li key={doc.label} className="flex items-center gap-3 text-xs text-slate-600">
                  <span className={`material-symbols-outlined text-sm ${doc.pendiente ? 'text-amber-500' : 'text-slate-300'}`}>
                    {doc.pendiente ? 'pending_actions' : 'check_circle'}
                  </span>
                  {doc.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Upload */}
          <div className="col-span-12 md:col-span-7">
            <label className="border-2 border-dashed border-[#eacea9]/50 rounded-xl p-10 flex flex-col items-center justify-center bg-[#eacea9]/5 hover:bg-[#eacea9]/10 transition-all cursor-pointer group h-full">
              <span className="material-symbols-outlined text-6xl text-[#eacea9] mb-4 group-hover:scale-110 transition-transform">cloud_upload</span>
              <p className="text-sm font-bold text-[#0e1a34] text-center">Gestor de Carga de Documentos</p>
              <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-widest text-center">
                Arrastre archivos o haga clic para explorar<br />(PDF, JPG, PNG hasta 10MB)
              </p>
              <input type="file" multiple className="hidden" />
            </label>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DocumentRepository;