import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface DocumentRepositoryProps {
  onFilesChange: (files: File[]) => void;
}

const DocumentRepository: React.FC<DocumentRepositoryProps> = ({ onFilesChange }) => {
  const { t } = useTranslation();
  const [files, setFiles] = useState<File[]>([]);

  const syncInputFiles = (input: HTMLInputElement | null, nextFiles: File[]) => {
    if (!input) return;
    const dataTransfer = new DataTransfer();
    nextFiles.forEach((file) => dataTransfer.items.add(file));
    input.files = dataTransfer.files;
  };

  const updateFiles = (nextFiles: File[]) => {
    setFiles(nextFiles);
    onFilesChange(nextFiles);
    const input = document.querySelector<HTMLInputElement>('input[name="documentos"]');
    syncInputFiles(input, nextFiles);
  };

  const removeFile = (fileToRemove: File) => {
    updateFiles(files.filter((file) => file !== fileToRemove));
  };

  return (
    <section className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="bg-slate-50 px-8 py-4 border-b border-slate-100">
        <h2 className="text-xl font-bold text-[#0e1a34]">{t('employees.add.docs.title')}</h2>
      </div>
      <div className="p-8">
        <div className="grid grid-cols-12 gap-8">

          <div className="col-span-12 md:col-span-5 space-y-4">
            <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider">
              Archivos seleccionados
            </h3>
            {files.length === 0 ? (
              <p className="text-xs text-slate-400">No has cargado documentos.</p>
            ) : (
              <ul className="space-y-3">
                {files.map((file) => (
                  <li key={`${file.name}-${file.size}`} className="flex items-center gap-3 text-xs text-slate-600">
                    <span className="material-symbols-outlined text-sm text-[#0e1a34]">description</span>
                    <span className="min-w-0 flex-1 truncate">{file.name}</span>
                    <span className="text-[10px] text-slate-400">{Math.ceil(file.size / 1024)} KB</span>
                    <button
                      type="button"
                      onClick={() => removeFile(file)}
                      className="rounded-md p-1 text-slate-300 transition-colors hover:bg-rose-50 hover:text-rose-500"
                      title="Quitar documento"
                    >
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="col-span-12 md:col-span-7">
            <label className="border-2 border-dashed border-[#eacea9]/50 rounded-xl p-10 flex flex-col items-center justify-center bg-[#eacea9]/5 hover:bg-[#eacea9]/10 transition-all cursor-pointer group h-full">
              <span className="material-symbols-outlined text-6xl text-[#eacea9] mb-4 group-hover:scale-110 transition-transform">cloud_upload</span>
              <p className="text-sm font-bold text-[#0e1a34] text-center">{t('employees.add.docs.manager')}</p>
              <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-widest text-center">
                {t('employees.add.docs.dragFiles')}<br />(PDF, JPG, PNG hasta 10MB)
              </p>
              <input
                name="documentos"
                type="file"
                multiple
                className="hidden"
                onChange={(event) => {
                  const newFiles = Array.from(event.target.files ?? []);
                  const merged = [
                    ...files,
                    ...newFiles.filter(f => !files.some(p => p.name === f.name && p.size === f.size)),
                  ];
                  updateFiles(merged);
                }}
              />
            </label>
          </div>

        </div>
      </div>
    </section>
  );
};

export default DocumentRepository;
