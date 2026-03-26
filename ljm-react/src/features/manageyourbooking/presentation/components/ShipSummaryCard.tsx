import React from 'react';

const ShipSummaryCard: React.FC = () => {
  return (
    <div
      className="rounded-xl overflow-hidden mb-10 flex flex-col md:flex-row shadow-2xl"
      style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(16px)', border: '1px solid rgba(234,230,169,0.1)' }}
    >
      <div
        className="md:w-1/3 h-48 md:h-auto bg-cover bg-center"
        style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCEve-Gj66wSMxndLIsP24trTnHOBzz4uptOmtrCWlYE8aK0VVuFeE4NqNcfpBJoUOqY3q72-XfSBBCkoRblcnjd1XH25rZQV2BuuaKYxak36ArI03UznYm_gHuHueKiEeMbO169J6o1x33jbuG0pef4t3JLXsz9xPxf0o2HWnHm3ROkVZyuF1zu71RzKiXPdcn1GfdH5ILDTVrqKgaDiwZb0XLhHyywDNrW2xIauj3yTF6sWzagzDjvjVgBZLwnpbLVQ-gSbvARUlc')` }}
      />
      <div className="p-8 flex-1 flex flex-col justify-center">
        <h3 className="text-2xl font-bold text-white mb-2">The Majestic Pearl</h3>
        <p className="text-slate-400 mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-[#eacea9]">location_on</span>
          Grandeza Mediterránea • 14 Noches
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Embarque',     value: 'Barcelona, España' },
            { label: 'Fecha',        value: 'Oct 12, 2024'      },
            { label: 'Desembarque', value: 'Venecia, Italia'    },
            { label: 'Estado',       value: 'Listo para Zarpar', green: true },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-[10px] uppercase text-[#eacea9]/60 font-bold tracking-wider">{item.label}</p>
              <p className={`text-sm font-semibold ${item.green ? 'text-green-400 flex items-center gap-1' : 'text-white'}`}>
                {item.green && <span className="material-symbols-outlined text-xs">check_circle</span>}
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShipSummaryCard;