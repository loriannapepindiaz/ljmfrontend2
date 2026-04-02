import React, { useState } from 'react';



const inputClass = "w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-[#eacea9]/50 focus:border-[#eacea9] outline-none text-sm transition-all";



const paises = ['España', 'Reino Unido', 'Grecia', 'Italia', 'Francia', 'Portugal', 'Alemania'];



const PersonalInfoSection: React.FC = () => {

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const [nacionalidad, setNacionalidad] = useState('');



  return (

    <section className="bg-white rounded-xl shadow-sm overflow-hidden">

      <div className="bg-slate-50 px-8 py-4 border-b border-slate-100 flex justify-between items-center">

        <h2 className="text-xl font-bold text-[#0e1a34]">Información Personal</h2>

        <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold">Sección 1 de 4</span>

      </div>

      <div className="p-8">

        <div className="flex gap-10">



          {/* Foto */}

          <div className="flex-shrink-0 flex flex-col items-center">

            <div className="relative group">

              <div className="w-36 h-36 rounded-full bg-slate-50 border-2 border-dashed border-[#eacea9] flex flex-col items-center justify-center text-[#a07d5a] overflow-hidden hover:bg-[#eacea9]/5 transition-all cursor-pointer">

                <span className="material-symbols-outlined text-4xl mb-1">add_a_photo</span>

                <span className="text-[9px] uppercase font-bold tracking-widest px-4 text-center leading-tight">Subir Foto</span>

              </div>

              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />

            </div>

          </div>



          {/* Campos */}

          <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-6">



            <div className="space-y-1.5">

              <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 flex items-center gap-1">

                <span className="material-symbols-outlined text-[14px]">person</span>

                Nombre Completo

              </label>

              <input type="text" placeholder="Julian Vane" className={inputClass} />

            </div>



            <div className="space-y-1.5">

              <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 flex items-center gap-1">

                <span className="material-symbols-outlined text-[14px]">cake</span>

                Fecha de Nacimiento

              </label>

              <input

                type="date"

                className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-[#eacea9]/50 focus:border-[#eacea9] outline-none text-sm transition-all text-slate-700"

              />

            </div>



            {/* Nacionalidad dropdown custom */}

            <div className="space-y-1.5">

              <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 flex items-center gap-1">

                <span className="material-symbols-outlined text-[14px]">flag</span>

                Nacionalidad

              </label>

              <div className="relative">

                <button

                  onClick={() => setOpenDropdown(openDropdown === 'nac' ? null : 'nac')}

                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl border text-sm transition-all ${

                    openDropdown === 'nac'

                      ? 'border-[#eacea9] ring-2 ring-[#eacea9]/50 bg-white'

                      : 'border-slate-200 bg-slate-50 hover:border-[#eacea9]'

                  }`}

                >

                  <span className={nacionalidad ? 'text-[#0e1a34] font-medium' : 'text-slate-400'}>

                    {nacionalidad || 'Seleccionar país'}

                  </span>

                  <span className="material-symbols-outlined text-[18px] text-slate-400">

                    {openDropdown === 'nac' ? 'expand_less' : 'expand_more'}

                  </span>

                </button>

                {openDropdown === 'nac' && (

                  <>

                    <div className="fixed inset-0 z-40" onClick={() => setOpenDropdown(null)} />

                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#0e1a34]/10 rounded-xl shadow-xl z-50 overflow-hidden">

                      <button

                        onClick={() => { setNacionalidad(''); setOpenDropdown(null); }}

                        className="w-full px-4 py-2.5 text-sm text-left text-slate-400 hover:bg-[#eacea9]/10 transition-colors"

                      >

                        Seleccionar país

                      </button>

                      {paises.map((p) => (

                        <button

                          key={p}

                          onClick={() => { setNacionalidad(p); setOpenDropdown(null); }}

                          className={`w-full px-4 py-2.5 text-sm text-left transition-colors ${

                            nacionalidad === p

                              ? 'bg-[#eacea9] text-[#0e1a34] font-bold'

                              : 'text-[#0e1a34] hover:bg-[#eacea9]/10'

                          }`}

                        >

                          {p}

                        </button>

                      ))}

                    </div>

                  </>

                )}

              </div>

            </div>



            <div className="space-y-1.5">

              <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 flex items-center gap-1">

                <span className="material-symbols-outlined text-[14px]">badge</span>

                Número de Identificación

              </label>

              <input type="text" placeholder="ID Number / Pasaporte" className={inputClass} />

            </div>

          </div>

        </div>



        {/* Contacto */}

        <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 pt-8 border-t border-slate-100">

          <div className="space-y-1.5">

            <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 flex items-center gap-1">

              <span className="material-symbols-outlined text-[14px]">phone</span>

              Teléfono de Contacto

            </label>

            <input type="tel" placeholder="+34 600 000 000" className={inputClass} />

          </div>

          <div className="space-y-1.5">

            <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 flex items-center gap-1">

              <span className="material-symbols-outlined text-[14px]">emergency</span>

              Contacto de Emergencia

            </label>

            <input type="text" placeholder="Nombre - +00 000..." className={inputClass} />

          </div>

          <div className="col-span-2 space-y-1.5">

            <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 flex items-center gap-1">

              <span className="material-symbols-outlined text-[14px]">home</span>

              Dirección de Residencia

            </label>

            <input type="text" placeholder="Calle, Número, Ciudad, CP" className={inputClass} />

          </div>

        </div>

      </div>

    </section>

  );

};



export default PersonalInfoSection;