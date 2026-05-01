const RoomHeader = () => {
  return (
    <header className="flex items-center justify-between px-8 py-6 border-b border-accent/10">
      <div className="flex items-center gap-3">
        <div className="text-accent">
          <span className="material-symbols-outlined text-3xl">sailing</span>
        </div>
        <h1 className="text-accent font-display text-xl font-bold tracking-widest uppercase">
          LJM Sealine
        </h1>
      </div>
    </header>
  );
};

export default RoomHeader;