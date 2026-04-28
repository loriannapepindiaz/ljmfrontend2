const ExperiencesHero = () => {
  return (
    <header
      className="relative w-full overflow-visible"
      style={{ minHeight: '110vh', paddingTop: '160px', paddingBottom: '200px' }}
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=1600&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 z-0" style={{ background: 'rgba(8,18,40,0.65)' }} />

      <div className="relative text-center px-4 max-w-5xl mx-auto w-full" style={{ zIndex: 2 }}>
        <h1 className="magiona-style text-6xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight">
          Descubre las Experiencias <br />
          <span className="text-pearl">Definitivas de Sealine</span>
        </h1>
        <p className="text-white/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light tracking-wide">
          Disfruta de momentos de lujo cuidadosamente seleccionados, donde cada detalle está diseñado para tu absoluto placer a través de los horizontes más hermosos del mundo.
        </p>
        <button
          onClick={() => window.location.href = '/destinations'}
          className="font-semibold py-4 px-12 rounded-full shadow-xl transition-all duration-500 hover:scale-105 tracking-widest uppercase text-sm"
          style={{ backgroundColor: 'transparent', color: 'white', border: '1.5px solid rgba(255,255,255,0.6)' }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'white';
            (e.currentTarget as HTMLButtonElement).style.color = '#0a1628';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
            (e.currentTarget as HTMLButtonElement).style.color = 'white';
          }}
        >
          Planifica Tu Aventura Ahora
        </button>
      </div>
    </header>
  );
};

export default ExperiencesHero;