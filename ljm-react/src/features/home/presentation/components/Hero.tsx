// src/features/home/presentation/components/Hero.tsx
import React from 'react';

const Hero = () => {
  const [showDestination, setShowDestination] = React.useState(false);
  const [showDeparture, setShowDeparture] = React.useState(false);
  const [showGuests, setShowGuests] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [adults, setAdults] = React.useState(2);
  const [kids, setKids] = React.useState(0);
  const [rooms, setRooms] = React.useState(1);
  const [pets, setPets] = React.useState(false);

  const getGuestsText = () => `${adults} Adultos, ${kids} Niños, ${rooms} Habitación${rooms > 1 ? 'es' : ''}`;

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setShowDeparture(false);
  };

  const handleCloseGuests = () => {
    setShowGuests(false);
  };

  // Función para renderizar un mes del calendario
  const renderMonth = (year, month, startDay, daysInMonth, monthName) => {
    const days = [];
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = selectedDate && selectedDate.getDate() === day && selectedDate.getMonth() === month - 1 && selectedDate.getFullYear() === year;
      const dayClass = isSelected ? 'bg-navy text-white rounded-full' : 'hover:bg-beige';
      days.push(
        <button
          key={day}
          className={`p-2 text-center font-medium ${dayClass}`}
          onClick={() => handleSelectDate(new Date(year, month - 1, day))}
        >
          {day}
        </button>
      );
    }
    return (
      <div className="w-1/2">
        <h3 className="text-center font-bold text-navy mb-2">{monthName} {year}</h3>
        <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-600">
          <span>Do</span><span>Lu</span><span>Ma</span><span>Mi</span><span>Ju</span><span>Vi</span><span>Sá</span>
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

        <div className="max-w-5xl mx-auto bg-luxury-blue p-2 rounded-2xl shadow-2xl border border-primary/20 flex flex-wrap md:flex-nowrap items-center gap-4 relative">
          <div className="flex-1 min-w-[200px] px-6 py-4 border-r border-gray-700 flex flex-col items-start relative">
            <span className="text-[10px] font-bold text-primary tracking-widest uppercase mb-1">Destino</span>
            <div className="flex items-center gap-2 w-full">
              <span className="material-symbols-outlined text-gray-400 text-sm">location_on</span>
              <input
                className="bg-transparent border-none focus:ring-0 text-sm w-full p-0 font-medium text-white"
                placeholder="¿Adónde?"
                type="text"
                onFocus={() => setShowDestination(true)}
              />
            </div>
            {showDestination && (
              <div className="absolute top-full left-0 bg-white dark:bg-luxury-blue rounded-xl shadow-xl p-4 z-10 w-full mt-2">
                <h4 className="font-bold mb-2 text-navy">Destinos de moda</h4>
                <ul className="text-left text-sm">
                  <li className="flex items-center gap-2 py-1"><span className="material-symbols-outlined text-gray-400">location_on</span>Santo Domingo, República Dominicana</li>
                  <li className="flex items-center gap-2 py-1"><span className="material-symbols-outlined text-gray-400">location_on</span>Punta Cana, República Dominicana</li>
                  <li className="flex items-center gap-2 py-1"><span className="material-symbols-outlined text-gray-400">location_on</span>Las Terrenas, República Dominicana</li>
                  <li className="flex items-center gap-2 py-1"><span className="material-symbols-outlined text-gray-400">location_on</span>San Felipe de Puerto Plata, República Dominicana</li>
                  <li className="flex items-center gap-2 py-1"><span className="material-symbols-outlined text-gray-400">location_on</span>Bayahibe, República Dominicana</li>
                </ul>
              </div>
            )}
          </div>

          <div 
            className="flex-1 min-w-[200px] px-6 py-4 border-r border-gray-700 flex flex-col items-start text-left cursor-pointer relative"
            onClick={() => setShowDeparture(!showDeparture)}
          >
            <span className="text-[10px] font-bold text-primary tracking-widest uppercase mb-1">Salida</span>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-gray-400 text-sm">calendar_today</span>
              <span className="text-sm font-medium text-white">{selectedDate ? selectedDate.toLocaleDateString('es-ES') : 'Seleccione Fecha'}</span>
            </div>
            {showDeparture && (
              <div className="absolute top-full left-0 bg-white dark:bg-luxury-blue rounded-xl shadow-xl p-4 z-10 w-[600px] mt-2">
                <div className="flex justify-between mb-4 text-navy font-bold text-sm">
                  <span>Calendario</span>
                  <span>Fechas flexibles</span>
                </div>
                <div className="flex gap-4">
                  {renderMonth(2026, 1, 3, 31, 'enero')} {/* Enero 2026 empieza en jueves (weekday 3) */}
                  {renderMonth(2026, 2, 6, 28, 'febrero')} {/* Febrero 2026 empieza en domingo (weekday 6) */}
                </div>
              </div>
            )}
          </div>

          <div 
            className="flex-1 min-w-[200px] px-6 py-4 border-r border-gray-700 flex flex-col items-start text-left cursor-pointer relative"
            onClick={() => setShowGuests(!showGuests)}
          >
            <span className="text-[10px] font-bold text-primary tracking-widest uppercase mb-1">Huéspedes</span>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-gray-400 text-sm">person_outline</span>
              <span className="text-sm font-medium text-white">{getGuestsText()}</span>
            </div>
            {showGuests && (
              <div className="absolute top-full left-0 bg-white dark:bg-luxury-blue rounded-xl shadow-xl p-4 z-10 w-80 mt-2">
                <div className="bg-primary text-white p-2 rounded-t-xl font-medium text-sm">
                  {getGuestsText()}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <span>Adultos</span>
                    <div className="flex items-center gap-2">
                      <button className="bg-beige p-1 rounded" onClick={() => setAdults(Math.max(1, adults - 1))}>-</button>
                      <span>{adults}</span>
                      <button className="bg-beige p-1 rounded" onClick={() => setAdults(adults + 1)}>+</button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span>Niños</span>
                    <div className="flex items-center gap-2">
                      <button className="bg-beige p-1 rounded" onClick={() => setKids(Math.max(0, kids - 1))}>-</button>
                      <span>{kids}</span>
                      <button className="bg-beige p-1 rounded" onClick={() => setKids(kids + 1)}>+</button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span>Habitaciones</span>
                    <div className="flex items-center gap-2">
                      <button className="bg-beige p-1 rounded" onClick={() => setRooms(Math.max(1, rooms - 1))}>-</button>
                      <span>{rooms}</span>
                      <button className="bg-beige p-1 rounded" onClick={() => setRooms(rooms + 1)}>+</button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span>¿Viajas con mascotas?</span>
                    <button className={`toggle ${pets ? 'bg-navy' : 'bg-gray-300'}`} onClick={() => setPets(!pets)} />
                  </div>
                  <p className="text-xs text-gray-500 mb-4">Los animales de servicio no se consideran mascotas. Más info sobre viajar con animales de servicio.</p>
                  <button className="w-full bg-primary text-white py-2 rounded font-bold" onClick={handleCloseGuests}>Listo</button>
                </div>
              </div>
            )}
          </div>

          <button className="w-full md:w-auto bg-primary hover:bg-luxury-gold text-white px-10 py-5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
            <span className="material-symbols-outlined">search</span>
            BUSCAR CRUCERO
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;