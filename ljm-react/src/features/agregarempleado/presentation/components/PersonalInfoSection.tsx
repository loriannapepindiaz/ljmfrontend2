import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const inputClass = "w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-[#eacea9]/50 focus:border-[#eacea9] outline-none text-sm transition-all";
const inputErrorClass = "w-full bg-slate-50 border border-rose-300 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-rose-200 focus:border-rose-400 outline-none text-sm transition-all";

const paises = [
  'Alemania', 'Argentina', 'Australia', 'Brasil', 'Canadá', 'Chile', 'China',
  'Colombia', 'Croacia', 'Ecuador', 'España', 'Estados Unidos', 'Filipinas',
  'Francia', 'Grecia', 'India', 'Indonesia', 'Italia', 'Jamaica', 'Japón',
  'México', 'Noruega', 'Panamá', 'Perú', 'Polonia', 'Portugal', 'Reino Unido',
  'República Dominicana', 'Rusia', 'Suecia', 'Turquía', 'Uruguay',
];

const isValidPhone = (value: string) => {
  const digits = value.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
};

const isValidId = (value: string) => /^[a-zA-Z0-9\-]{5,20}$/.test(value.trim());

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());

const PersonalInfoSection: React.FC = () => {
  const { t } = useTranslation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [nacionalidad, setNacionalidad] = useState('');
  const [paisSearch, setPaisSearch] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (name: string, value: string) => {
    let msg = '';
    if (name === 'telefono' && value) {
      if (!isValidPhone(value)) msg = 'Ingresa un número válido (7–15 dígitos).';
    }
    if (name === 'contacto_emergencia' && value) {
      const phonePart = value.replace(/^[^+\d]*/, '');
      if (phonePart && !isValidPhone(phonePart)) msg = 'El número de teléfono no es válido.';
    }
    if (name === 'numero_identificacion' && value) {
      if (!isValidId(value)) msg = 'Solo letras, números y guiones (5–20 caracteres).';
    }
    if (name === 'email' && value) {
      if (!isValidEmail(value)) msg = 'Ingresa un correo electrónico válido.';
    }
    setErrors(prev => ({ ...prev, [name]: msg }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    validate(e.target.name, e.target.value);
  };

  return (
    <section className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="bg-slate-50 px-8 py-4 border-b border-slate-100 flex justify-between items-center">
        <h2 className="text-xl font-bold text-[#0e1a34]">{t('employees.add.personal.title')}</h2>
        <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">
          {t('employees.add.personal.section')}
        </span>
      </div>

      <div className="p-8">
        <div className="flex gap-10">

          {/* Foto */}
          <div className="flex-shrink-0 flex flex-col items-center gap-3">
            <div className="relative group cursor-pointer">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-slate-100 border-4 border-white shadow-md ring-2 ring-slate-200 group-hover:ring-[#eacea9] transition-all">
                {photoPreview ? (
                  <img src={photoPreview} alt="Foto del empleado" className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                    <span className="material-symbols-outlined text-5xl text-slate-300">person</span>
                  </div>
                )}
              </div>
              <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-2xl">photo_camera</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#eacea9] border-2 border-white shadow flex items-center justify-center pointer-events-none">
                <span className="material-symbols-outlined text-[#0e1a34] text-[14px]">edit</span>
              </div>
              <input
                name="foto"
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer rounded-full"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  setPhotoPreview(file ? URL.createObjectURL(file) : null);
                }}
              />
            </div>
            <div className="text-center">
              <p className="text-[11px] font-bold text-[#0e1a34]">Foto de perfil</p>
              <p className="text-[10px] text-slate-400">JPG o PNG · máx. 5 MB</p>
            </div>
          </div>

          {/* Campos */}
          <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-6">

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">person</span>
                {t('employees.add.personal.fullName')}
              </label>
              <input name="nombre_completo" type="text" placeholder="Julian Vane" className={inputClass} required />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">cake</span>
                {t('employees.add.personal.birthDate')}
              </label>
              <input
                name="fecha_nac"
                type="date"
                value={birthDate}
                onChange={(event) => setBirthDate(event.target.value)}
                className={inputClass}
              />
            </div>

            {/* Nacionalidad */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">flag</span>
                {t('employees.add.personal.nationality')}
              </label>
              <div className="relative">
                <input type="hidden" name="nacionalidad" value={nacionalidad} />
                <button
                  type="button"
                  onClick={() => setOpenDropdown(openDropdown === 'nac' ? null : 'nac')}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl border text-sm transition-all ${
                    openDropdown === 'nac'
                      ? 'border-[#eacea9] ring-2 ring-[#eacea9]/50 bg-white'
                      : 'border-slate-200 bg-slate-50 hover:border-[#eacea9]'
                  }`}
                >
                  <span className={nacionalidad ? 'text-[#0e1a34] font-medium' : 'text-slate-400'}>
                    {nacionalidad || t('employees.add.personal.selectCountry')}
                  </span>
                  <span className="material-symbols-outlined text-[18px] text-slate-400">
                    {openDropdown === 'nac' ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {openDropdown === 'nac' && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => { setOpenDropdown(null); setPaisSearch(''); }} />
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#0e1a34]/10 rounded-xl shadow-xl z-50 overflow-hidden flex flex-col">
                      <div className="px-3 py-2 border-b border-slate-100">
                        <div className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-1.5">
                          <span className="material-symbols-outlined text-[16px] text-slate-400">search</span>
                          <input
                            type="text"
                            value={paisSearch}
                            onChange={(e) => setPaisSearch(e.target.value)}
                            placeholder="Buscar país..."
                            className="flex-1 bg-transparent text-sm outline-none text-[#0e1a34] placeholder:text-slate-400"
                            autoFocus
                          />
                        </div>
                      </div>
                      <div className="max-h-48 overflow-y-auto">
                        {paises.filter(p => p.toLowerCase().includes(paisSearch.toLowerCase())).length === 0 ? (
                          <p className="px-4 py-3 text-xs text-slate-400 text-center">Sin resultados</p>
                        ) : (
                          paises
                            .filter(p => p.toLowerCase().includes(paisSearch.toLowerCase()))
                            .map((p) => (
                              <button
                                type="button"
                                key={p}
                                onClick={() => { setNacionalidad(p); setOpenDropdown(null); setPaisSearch(''); }}
                                className={`w-full px-4 py-2.5 text-sm text-left transition-colors ${
                                  nacionalidad === p
                                    ? 'bg-[#eacea9] text-[#0e1a34] font-bold'
                                    : 'text-[#0e1a34] hover:bg-[#eacea9]/10'
                                }`}
                              >
                                {p}
                              </button>
                            ))
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">badge</span>
                {t('employees.add.personal.idNumber')}
              </label>
              <input
                name="numero_identificacion"
                type="text"
                autoComplete="off"
                data-form-type="other"
                placeholder={t('employees.add.personal.idPlaceholder')}
                className={errors.numero_identificacion ? inputErrorClass : inputClass}
                onBlur={handleBlur}
                onChange={(e) => errors.numero_identificacion && validate(e.target.name, e.target.value)}
              />
              {errors.numero_identificacion && (
                <p className="flex items-center gap-1 text-[10px] text-rose-500 font-medium">
                  <span className="material-symbols-outlined text-[12px]">error</span>
                  {errors.numero_identificacion}
                </p>
              )}
            </div>

          </div>
        </div>

        {/* Contacto */}
        <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 pt-8 border-t border-slate-100">
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">phone</span>
              {t('employees.add.personal.phone')}
            </label>
            <input
              name="telefono"
              type="tel"
              placeholder="+34 600 000 000"
              className={errors.telefono ? inputErrorClass : inputClass}
              onBlur={handleBlur}
              onChange={(e) => errors.telefono && validate(e.target.name, e.target.value)}
            />
            {errors.telefono && (
              <p className="flex items-center gap-1 text-[10px] text-rose-500 font-medium">
                <span className="material-symbols-outlined text-[12px]">error</span>
                {errors.telefono}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">mail</span>
              Correo electrónico
            </label>
            <input
              name="email"
              type="email"
              autoComplete="off"
              placeholder="empleado@ljmsealine.com"
              className={errors.email ? inputErrorClass : inputClass}
              onBlur={handleBlur}
              onChange={(e) => errors.email && validate(e.target.name, e.target.value)}
            />
            {errors.email && (
              <p className="flex items-center gap-1 text-[10px] text-rose-500 font-medium">
                <span className="material-symbols-outlined text-[12px]">error</span>
                {errors.email}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">emergency</span>
              {t('employees.add.personal.emergency')}
            </label>
            <input
              name="contacto_emergencia"
              type="text"
              placeholder="Nombre - +00 000..."
              className={errors.contacto_emergencia ? inputErrorClass : inputClass}
              onBlur={handleBlur}
              onChange={(e) => errors.contacto_emergencia && validate(e.target.name, e.target.value)}
            />
            {errors.contacto_emergencia && (
              <p className="flex items-center gap-1 text-[10px] text-rose-500 font-medium">
                <span className="material-symbols-outlined text-[12px]">error</span>
                {errors.contacto_emergencia}
              </p>
            )}
          </div>

          <div className="col-span-2 space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">home</span>
              {t('employees.add.personal.address')}
            </label>
            <input name="direccion" type="text" placeholder={t('employees.add.personal.addressPlaceholder')} className={inputClass} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalInfoSection;
