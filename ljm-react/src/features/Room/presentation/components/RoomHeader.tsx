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
      <div className="flex items-center gap-6">
        <button className="text-accent/80 hover:text-accent transition-colors">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <div className="h-10 w-10 rounded-full border border-primary/50 overflow-hidden bg-navy/50">
          <img 
            alt="User profile" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxZ0XDXxMn3EuFMuGti9lTamU2BloXVTZtcF5jzkOj3VxwPPFqMhmFADFKp_8v48aye2D28NsBYPhL4GYgZde_X0fG56Vhlq7MYzKVu0JReNEjqHy3xtDGA0wbjmNq4F3Rsxl6LzfkOskBEdCTCiFL_ERQ-fmu3jBWW8nxyAV8qe2WVej_RxilvASXmRMRIqE857fekQZeG2n3GKmgDlTasxbK7RL8RI8MRmOCMy3nx218-0-xs68__OywySmpZdPM5ojq-zVCR9I" 
          />
        </div>
      </div>
    </header>
  );
};

export default RoomHeader;