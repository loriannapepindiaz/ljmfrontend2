import React, { useState } from 'react';

const ConfigSeguridad: React.FC = () => {
  const [twoFactor, setTwoFactor] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  const handleClose = () => {
    setShowModal(false);
    setShowNewPass(false);
  };

  return (
    <section className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
        <span className="material-symbols-outlined text-[#0e1a34]">shield_person</span>
        <h2 className="text-xl font-bold text-[#0e1a34]">Seguridad</h2>
      </div>
      <div className="p-6 space-y-6">

        <div>
          <h3 className="text-sm font-bold text-slate-800 mb-3">Contraseña</h3>
          <button
            onClick={() => setShowModal(true)}
            className="w-full py-2.5 px-4 border border-[#0e1a34] text-[#0e1a34] font-bold rounded-lg hover:bg-[#0e1a34] hover:text-white transition-all text-sm"
          >
            Cambiar Contraseña
          </button>
          <p className="text-xs text-slate-400 mt-2 italic">Último cambio hace 3 meses</p>
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
          <div>
            <p className="font-bold text-sm text-slate-800">Autenticación de dos factores (2FA)</p>
            <p className="text-xs text-slate-500">Añade una capa extra de seguridad</p>
          </div>
          <button
            onClick={() => setTwoFactor(!twoFactor)}
            className={`relative inline-flex items-center w-11 h-6 rounded-full transition-colors ${
              twoFactor ? 'bg-[#0e1a34]' : 'bg-slate-300'
            }`}
          >
            <span className={`inline-block size-5 bg-white rounded-full shadow transition-transform ${
              twoFactor ? 'translate-x-5' : 'translate-x-1'
            }`} />
          </button>
        </div>
      </div>

      {showModal && (
        <>
          <div className="fixed inset-0 z-40 bg-black/25 backdrop-blur-sm" onClick={handleClose} />
          <div
            className="fixed z-50 bg-white rounded-2xl shadow-2xl border border-[#0e1a34]/10 p-6 w-96"
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-xl bg-[#eacea9]/30 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px] text-[#0e1a34]">lock</span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#0e1a34]">Cambiar Contraseña</h4>
                  <p className="text-[11px] text-[#0e1a34]/40">Ingrese sus credenciales</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="size-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-[#0e1a34]/40 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Trampa autocompletado */}
            <input type="text" style={{ display: 'none' }} readOnly />
            <input type="password" style={{ display: 'none' }} readOnly />

            <div className="flex flex-col gap-4">

              {/* Contraseña actual */}
              <div>
                <label className="text-[11px] font-bold text-[#0e1a34]/50 uppercase tracking-wider block mb-1.5">
                  Contraseña actual
                </label>
                <input
                  type="text"
                  autoComplete="off"
                  data-lpignore="true"
                  data-1p-ignore="true"
                  data-form-type="other"
                  readOnly
                  onFocus={(e) => e.target.removeAttribute('readonly')}
                  placeholder="Ingrese su contraseña actual"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#eacea9]/50 focus:border-[#eacea9] outline-none"
                  style={{ WebkitTextSecurity: 'disc' } as React.CSSProperties}
                />
              </div>

              {/* Nueva contraseña */}
              <div>
                <label className="text-[11px] font-bold text-[#0e1a34]/50 uppercase tracking-wider block mb-1.5">
                  Nueva contraseña
                </label>
                <div className="relative">
                  <input
                    type="text"
                    autoComplete="new-password"
                    data-lpignore="true"
                    data-1p-ignore="true"
                    data-form-type="other"
                    readOnly
                    onFocus={(e) => e.target.removeAttribute('readonly')}
                    placeholder="Ingrese su nueva contraseña"
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 pr-12 text-sm focus:ring-2 focus:ring-[#eacea9]/50 focus:border-[#eacea9] outline-none"
                    style={{
                      WebkitTextSecurity: showNewPass ? 'none' : 'disc',
                    } as React.CSSProperties}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0e1a34] transition-colors z-10"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showNewPass ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Confirmar contraseña */}
              <div>
                <label className="text-[11px] font-bold text-[#0e1a34]/50 uppercase tracking-wider block mb-1.5">
                  Confirmar contraseña
                </label>
                <input
                  type="text"
                  autoComplete="new-password"
                  data-lpignore="true"
                  data-1p-ignore="true"
                  data-form-type="other"
                  readOnly
                  onFocus={(e) => e.target.removeAttribute('readonly')}
                  placeholder="Confirme su nueva contraseña"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#eacea9]/50 focus:border-[#eacea9] outline-none"
                  style={{ WebkitTextSecurity: 'disc' } as React.CSSProperties}
                />
              </div>

            </div>

            <div className="border-t border-slate-100 mt-5 pt-4 flex gap-3">
              <button
                onClick={handleClose}
                className="flex-1 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-500 hover:bg-slate-50 transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={handleClose}
                className="flex-1 py-3 rounded-xl bg-[#0e1a34] text-white text-xs font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[16px]">check</span>
                Confirmar
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default ConfigSeguridad;