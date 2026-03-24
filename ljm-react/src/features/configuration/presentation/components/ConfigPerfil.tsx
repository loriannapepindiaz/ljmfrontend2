import React, { useState } from 'react';

const ConfigPerfil: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');

  return (
    <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-xl font-bold text-[#0e1a34]">Perfil de Usuario</h2>
      </div>
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-8 items-start">

          {/* Avatar */}
          <div className="relative group shrink-0">
            <div className="size-32 rounded-full overflow-hidden border-4 border-[#eacea9] shadow-md bg-slate-200 flex items-center justify-center">
              <span className="material-symbols-outlined text-[48px] text-slate-400">person</span>
            </div>
            <button className="absolute bottom-0 right-0 bg-[#0e1a34] text-white p-2 rounded-full border-2 border-white shadow-lg hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined text-base">photo_camera</span>
            </button>
          </div>

          {/* Campos */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Nombre Completo</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ingrese su nombre"
                className="w-full rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#eacea9]/50 focus:border-[#eacea9] outline-none px-4 py-2.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Correo Electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="correo@ljmsealine.com"
                className="w-full rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#eacea9]/50 focus:border-[#eacea9] outline-none px-4 py-2.5 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Rol del Sistema</label>
              <input
                type="text"
                value="Super Administrador"
                disabled
                className="w-full rounded-lg border border-slate-200 bg-slate-50 text-slate-400 px-4 py-2.5 text-sm cursor-not-allowed"
              />
            </div>
            <div className="flex items-end">
              <button className="bg-[#0e1a34] text-white px-6 py-2.5 rounded-lg font-bold hover:bg-slate-800 transition-all shadow-md text-sm">
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConfigPerfil;