import React from 'react';

const items = [
  {
    icon: 'restaurant',
    titulo: 'Acceso a Mesa del Chef',
    desc: 'Asiento reservado nightly en la Galería del Capitán con menús personalizados y selección de vinos vintage.',
  },
  {
    icon: 'wine_bar',
    titulo: 'Selección de Bodega',
    desc: 'Acceso a la reserva privada de varietales mediterráneos vintage, curada por nuestro sumiller jefe.',
  },
  {
    icon: 'local_library',
    titulo: 'Protocolo Gastronómico',
    desc: 'Preferencia por mariscos sostenibles y hierbas orgánicas de las Cícladas, preparadas a sus especificaciones.',
  },
];

const GastronomyPanel: React.FC = () => {
  return (
    <div className="bg-[#0E1A34] text-white p-12 md:p-16 shadow-2xl rounded-xl">
      <span className="text-[10px] uppercase tracking-[0.4em] text-[#DEC29E]/60">
        Gastronomía Curada
      </span>
      <h2 className="text-4xl mt-4 mb-10" style={{ fontFamily: 'Noto Serif, serif' }}>
        Provisiones Exclusivas
      </h2>

      <div className="space-y-10">
        {items.map((item) => (
          <div key={item.titulo} className="flex gap-6 items-start">
            <span className="material-symbols-outlined text-[#DEC29E] text-2xl">{item.icon}</span>
            <div>
              <h4 className="text-xl mb-2" style={{ fontFamily: 'Noto Serif, serif' }}>
                {item.titulo}
              </h4>
              <p className="text-sm text-white/60 font-light leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 pt-12 border-t border-white/10">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAz8zD2RxVPsiItor9Kkx-lLq5LxvcXy3r70sumxnc6mgi1WbShhfya6yiJOrtg8LfYUrU61dv8w4zyLgcWFfbL99qZrQzHgMeeeD80ZmiUxc0hVJP514-2YgyjdvyMkfpuUmbfsqGMwMtMUW0GHq2ZEFtEDEyZquXItSnnqsAB5URcueANfqCF3ww0ytENaVw7fDzM-pCI6uyVJ_REPEFSsAtb9Kws0lXUfmTHNXAHjBX-YeaVBsNtnvq_0iXMXX6myaREdcMli-wW"
          alt="Plato gourmet"
          className="w-full h-40 object-cover opacity-50 grayscale hover:opacity-100 transition-all duration-1000 rounded-lg"
        />
      </div>
    </div>
  );
};

export default GastronomyPanel;