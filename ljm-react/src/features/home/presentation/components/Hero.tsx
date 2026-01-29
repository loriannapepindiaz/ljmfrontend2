import React, { useState } from 'react';

interface MonthProps {
  year: number;
  month: number;          // 1 = enero, 2 = febrero, etc.
  startDay: number;       // 0 = domingo, 1 = lunes, ..., 6 = sábado
  daysInMonth: number;
  monthName: string;
}

const Hero = () => {
  const [showDestination, setShowDestination] = useState(false);
  const [showDeparture, setShowDeparture] = useState(false);
  const [showGuests, setShowGuests] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [adults, setAdults] = useState(2);
  const [kids, setKids] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [pets, setPets] = useState(false);

  const getGuestsText = () => {
    return `${adults} Adulto${adults !== 1 ? 's' : ''}, ${kids} Niño${kids !== 1 ? 's' : ''}, ${rooms} Habitación${rooms !== 1 ? 'es' : ''}`;
  };

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    setShowDeparture(false);
  };

  const handleCloseGuests = () => {
    setShowGuests(false);
  };

  const renderMonth = ({ year, month, startDay, daysInMonth, monthName }: MonthProps) => {
    const days = [];

    // Días vacíos antes del 1ero del mes
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2" />);
    }

    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected =
        selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === month - 1 &&
        selectedDate.getFullYear() === year;

      const dayClass = isSelected
        ? 'bg-[#C5A059] text-white rounded-full'
        : 'hover:bg-[#F5E6D3] hover:text-[#C5A059]';

      days.push(
        <button
          key={day}
          type="button"
          className={`p-2 text-center font-medium transition-colors ${dayClass}`}
          onClick={() => handleSelectDate(new Date(year, month - 1, day))}
        >
          {day}
        </button>
      );
    }

    return (
      <div className="w-1/2 min-w-[220px]">
        <h3 className="text-center font-bold text-[#C5A059] mb-3 text-sm">
          {monthName.charAt(0).toUpperCase() + monthName.slice(1)} {year}
        </h3>
        <div className="grid grid-cols-7 gap-1 text-center text-xs text-[#333333]">
          <span>Do</span>
          <span>Lu</span>
          <span>Ma</span>
          <span>Mi</span>
          <span>Ju</span>
          <span>Vi</span>
          <span>Sá</span>
          {days}
        </div>
      </div>
    );
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 hero-gradient">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-display text-white mb-6 leading-tight">
          Explora el Horizonte en <br />
          <span className="italic text-primary">Absoluta Elegancia</span>
        </h1>

        <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light">
          Descubre los destinos más exclusivos a bordo de nuestros liners boutique. Un viaje donde el lujo se encuentra con la vastedad del océano.
        </p>

        <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm p-2 md:p-2.5 rounded-2xl shadow-2xl border border-[#C5A059]/20 flex flex-wrap md:flex-nowrap items-stretch gap-2 md:gap-0 relative">
          {/* Destino */}
          <div className="flex-1 min-w-[160px] px-4 md:px-5 py-3 border-r border-[#C5A059]/30 flex flex-col items-start relative">
            <span className="text-[9px] md:text-xs font-bold text-[#C5A059] tracking-widest uppercase mb-0.5">
              Destino
            </span>
            <div className="flex items-center gap-2 w-full">
              <span className="material-symbols-outlined text-[#9CA3AF] text-sm">location_on</span>
              <input
                className="bg-transparent border-none focus:ring-0 text-xs md:text-sm w-full p-0 font-medium text-[#333333] placeholder:text-[#999999]"
                placeholder="¿Adónde?"
                type="text"
                onFocus={() => setShowDestination(true)}
                onBlur={() => setTimeout(() => setShowDestination(false), 150)}
              />
            </div>

            {showDestination && (
              <div className="absolute top-full left-0 bg-white rounded-xl shadow-xl p-3 z-20 w-full mt-2 text-left">
                <h4 className="font-bold mb-2 text-[#C5A059] text-xs">Destinos de moda</h4>
                <ul className="text-xs space-y-1.5">
                  {[
                    'Santo Domingo, Rep. Dom.',
                    'Punta Cana, Rep. Dom.',
                    'Las Terrenas, Rep. Dom.',
                    'Puerto Plata, Rep. Dom.',
                    'Bayahibe, Rep. Dom.',
                  ].map((dest) => (
                    <li key={dest} className="flex items-center gap-2 py-1 cursor-pointer text-[#333333] hover:text-[#C5A059]">
                      <span className="material-symbols-outlined text-[#9CA3AF] text-sm">location_on</span>
                      {dest}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Salida */}
          <div
            className="flex-1 min-w-[160px] px-4 md:px-5 py-3 border-r border-[#C5A059]/30 flex flex-col items-start cursor-pointer relative"
            onClick={() => setShowDeparture(!showDeparture)}
          >
            <span className="text-[9px] md:text-xs font-bold text-[#C5A059] tracking-widest uppercase mb-0.5">
              Salida
            </span>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#9CA3AF] text-sm">calendar_today</span>
              <span className="text-xs md:text-sm font-medium text-[#333333]">
                {selectedDate
                  ? selectedDate.toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'short',
                      year: '2-digit',
                    })
                  : 'Seleccionar'}
              </span>
            </div>

            {showDeparture && (
              <div className="absolute top-full left-0 bg-white rounded-xl shadow-2xl p-4 z-20 w-auto mt-2 max-h-96 overflow-y-auto">
                <div className="flex justify-between mb-3 text-[#C5A059] font-semibold text-xs">
                  <span>Calendario</span>
                  <span className="text-[#C5A059] cursor-pointer text-[11px]">Flexible</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  {renderMonth({ year: 2026, month: 1, startDay: 3, daysInMonth: 31, monthName: 'enero' })}
                  {renderMonth({ year: 2026, month: 2, startDay: 6, daysInMonth: 28, monthName: 'febrero' })}
                </div>
              </div>
            )}
          </div>

          {/* Huéspedes */}
          <div
            className="flex-1 min-w-[160px] px-4 md:px-5 py-3 flex flex-col items-start cursor-pointer relative"
            onClick={() => setShowGuests(!showGuests)}
          >
            <span className="text-[9px] md:text-xs font-bold text-[#C5A059] tracking-widest uppercase mb-0.5">
              Huéspedes
            </span>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#9CA3AF] text-sm">person_outline</span>
              <span className="text-xs md:text-sm font-medium text-[#333333] line-clamp-1">{getGuestsText()}</span>
            </div>

            {showGuests && (
              <div className="absolute top-full right-0 bg-white rounded-xl shadow-2xl p-4 z-20 w-80 md:w-96 mt-2 max-h-96 overflow-y-auto">
                <div className="bg-[#C5A059] text-white p-2.5 rounded-lg font-medium text-center mb-3 text-sm">
                  {getGuestsText()}
                </div>

                <div className="space-y-4">
                  {[
                    { label: 'Adultos', value: adults, setValue: setAdults, min: 1 },
                    { label: 'Niños', value: kids, setValue: setKids, min: 0 },
                    { label: 'Habitaciones', value: rooms, setValue: setRooms, min: 1 },
                  ].map(({ label, value, setValue, min }) => (
                    <div key={label} className="flex justify-between items-center">
                      <span className="text-sm text-[#333333]">{label}</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="w-7 h-7 bg-[#F5E6D3] rounded-full flex items-center justify-center hover:bg-[#E8D4BC] transition text-[#C5A059] text-sm"
                          onClick={() => setValue(Math.max(min, value - 1))}
                        >
                          −
                        </button>
                        <span className="w-6 text-center font-medium text-[#333333] text-sm">{value}</span>
                        <button
                          type="button"
                          className="w-7 h-7 bg-[#F5E6D3] rounded-full flex items-center justify-center hover:bg-[#E8D4BC] transition text-[#C5A059] text-sm"
                          onClick={() => setValue(value + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-between items-center pt-2 border-t border-[#E0E0E0]">
                    <span className="text-sm text-[#333333]">¿Con mascotas?</span>
                    <input
                      type="checkbox"
                      checked={pets}
                      onChange={() => setPets(!pets)}
                      className="w-4 h-4 accent-[#C5A059] cursor-pointer"
                    />
                  </div>

                  <p className="text-[11px] text-[#666666]">
                    Animales de servicio no son mascotas.
                  </p>

                  <button
                    type="button"
                    className="w-full bg-[#C5A059] hover:bg-[#D4AF37] text-white py-2 rounded-lg font-semibold transition text-sm"
                    onClick={handleCloseGuests}
                  >
                    Listo
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Botón Buscar */}
          <button
            type="button"
            className="w-full md:w-auto bg-[#C5A059] hover:bg-[#D4AF37] text-white px-6 md:px-10 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl text-xs md:text-sm flex-shrink-0"
          >
            <span className="material-symbols-outlined text-sm">search</span>
            BUSCAR
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;