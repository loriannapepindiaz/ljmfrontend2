import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ExecutiveReportPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set body background to blue like the invoice page
    document.body.style.backgroundColor = '#06122c';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <div className="min-h-screen p-4 md:p-12 font-sans bg-[#06122c] text-naval">
      <style>{`
        @media print {
          body { background: white !important; }
          .no-print { display: none !important; }
          @page { margin: 1cm; }
          .report-page { 
            margin: 0 !important; 
            box-shadow: none !important;
            padding: 20mm 15mm !important;
          }
        }
        .report-page {
          width: 210mm;
          min-height: 297mm;
          margin: 0 auto;
          background: white;
          padding: 30mm 20mm;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          position: relative;
        }
        .serif { font-family: 'Playfair Display', serif; }
      `}</style>

      <article className="report-page">
        {/* Section 1: Header */}
        <header className="border-b-2 border-naval pb-8 mb-12 flex justify-between items-start">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="LJM Logo" className="h-16 object-contain" />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-3xl serif italic font-bold text-naval tracking-tight">LJM Sealine</span>
              </div>
              <p className="text-[0.65rem] uppercase tracking-[0.3em] font-bold text-slate-ink">Executive Maritime Report</p>
            </div>
          </div>
          <div className="text-right">
            <h1 className="text-xs uppercase tracking-widest font-bold text-sand-dark mb-1">Serial #LJM-2026-XXXX</h1>
            <p className="serif text-xl font-bold italic text-naval">{new Date().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}</p>
            <p className="text-[0.6rem] text-slate-ink mt-2">Generado: {new Date().toLocaleDateString('es-ES', { month: 'short', day: '2-digit', year: 'numeric' })}</p>
          </div>
        </header>

        {/* Section 2: Executive Summary */}
        <section className="mb-16">
          <h2 className="text-[0.65rem] uppercase tracking-[0.2em] font-bold text-sand-dark mb-6 border-l-4 border-sand pl-4">Resumen Ejecutivo</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-sand/10 p-5 border-t border-sand/30">
              <p className="text-[0.55rem] uppercase tracking-widest text-slate-ink mb-1">Total Reservas</p>
              <p className="text-2xl serif font-bold text-naval">0</p>
              <p className="text-[0.6rem] text-slate-ink/40 font-bold mt-1">0%</p>
            </div>
            <div className="bg-sand/10 p-5 border-t border-sand/30">
              <p className="text-[0.55rem] uppercase tracking-widest text-slate-ink mb-1">Confirmadas</p>
              <p className="text-2xl serif font-bold text-naval">0</p>
              <p className="text-[0.6rem] text-slate-ink/40 font-bold mt-1">0%</p>
            </div>
            <div className="bg-sand/10 p-5 border-t border-sand/30">
              <p className="text-[0.55rem] uppercase tracking-widest text-slate-ink mb-1">Pendientes</p>
              <p className="text-2xl serif font-bold text-naval">0</p>
              <p className="text-[0.6rem] text-slate-ink/40 font-bold mt-1">0%</p>
            </div>
            <div className="bg-naval p-5 text-white shadow-lg">
              <p className="text-[0.55rem] uppercase tracking-widest text-sand/60 mb-1">Ingresos Totales</p>
              <p className="text-2xl serif font-bold text-sand">$0</p>
              <p className="text-[0.6rem] text-sand/40 font-bold mt-1">0%</p>
            </div>
          </div>
        </section>

        {/* Section 3: Performance Analytics */}
        <section className="mb-16">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-[0.65rem] uppercase tracking-[0.2em] font-bold text-sand-dark border-l-4 border-sand pl-4">Tendencias de Flota</h2>
            <p className="text-[0.6rem] text-slate-ink italic">Sin actividad registrada en este periodo</p>
          </div>
          <div className="h-48 flex items-end justify-between border-b border-naval/10 px-4 gap-2">
            {Array.from({ length: 10 }).map((_, i) => (
               <div key={i} className="flex-1 bg-sand/10 transition-colors h-[2px]"></div>
            ))}
          </div>
          <div className="flex justify-between px-4 mt-2">
            <span className="text-[0.5rem] uppercase tracking-widest text-slate-ink font-bold">Semana 01</span>
            <span className="text-[0.5rem] uppercase tracking-widest text-slate-ink font-bold">Semana 02</span>
            <span className="text-[0.5rem] uppercase tracking-widest text-slate-ink font-bold">Semana 03</span>
            <span className="text-[0.5rem] uppercase tracking-widest text-slate-ink font-bold">Semana 04</span>
          </div>
        </section>

        {/* Section 4: Detailed Activity Ledger */}
        <section className="mb-20">
          <h2 className="text-[0.65rem] uppercase tracking-[0.2em] font-bold text-sand-dark mb-6 border-l-4 border-sand pl-4">Libro de Actividades</h2>
          <div className="overflow-x-auto min-h-[200px] border border-dashed border-naval/10 rounded-lg flex items-center justify-center">
             <p className="text-xs text-slate-ink italic">No hay transacciones disponibles para este reporte.</p>
          </div>
        </section>

        {/* Section 5: Official Verification */}
        <footer className="mt-auto border-t border-naval/10 pt-12">
          <div className="flex justify-between items-end">
            <div className="flex-1">
              <p className="text-[0.55rem] uppercase tracking-widest text-slate-ink mb-8">Autorización de Operaciones</p>
              <div className="relative w-48 mb-2">
                <p className="serif italic text-xl text-naval relative z-10 pl-2">Pendiente</p>
                <div className="absolute bottom-0 left-0 w-full h-px bg-naval opacity-30"></div>
                <span className="absolute -top-4 -left-4 text-emerald-600 opacity-20 material-symbols-outlined text-5xl">verified</span>
              </div>
              <p className="text-[0.6rem] font-bold text-naval">Director de Operaciones</p>
              <p className="text-[0.5rem] text-slate-ink uppercase tracking-widest">LJM Sealine Fleet Management</p>
            </div>
            <div className="flex items-center gap-8">
              <div className="text-right">
                <div className="flex items-center gap-2 justify-end mb-2">
                  <span className="material-symbols-outlined text-naval text-sm">verified_user</span>
                  <span className="text-[0.5rem] font-bold uppercase tracking-[0.2em] text-naval">Sello de Autenticidad</span>
                </div>
                <p className="text-[0.45rem] text-slate-ink leading-relaxed max-w-[150px]">Este documento es un registro electrónico certificado. Escanee el QR para verificación.</p>
              </div>
              {/* QR Code Simulation */}
              <div className="w-16 h-16 bg-naval p-1">
                <div className="w-full h-full border border-sand/40 grid grid-cols-4 grid-rows-4 gap-0.5">
                  <div className="bg-sand"></div><div className="bg-transparent"></div><div className="bg-sand"></div><div className="bg-sand"></div>
                  <div className="bg-transparent"></div><div className="bg-sand"></div><div className="bg-transparent"></div><div className="bg-sand"></div>
                  <div className="bg-sand"></div><div className="bg-transparent"></div><div className="bg-sand"></div><div className="bg-transparent"></div>
                  <div className="bg-sand"></div><div className="bg-sand"></div><div className="bg-transparent"></div><div className="bg-sand"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-4 border-t border-naval/5 flex justify-between items-center text-[0.5rem] uppercase tracking-[0.3em] text-slate-ink">
            <p>© {new Date().getFullYear()} Maritime Meridian Holdings</p>
            <p>Confidencial - Solo para Distribución de la Junta</p>
          </div>
        </footer>
      </article>

      <div className="no-print text-center mt-8 flex flex-col items-center gap-6 pb-12">
        <button 
          onClick={() => navigate('/admin/dashboard')}
          className="group flex items-center gap-4 bg-[#0e1a34] border border-[#eacea9]/30 px-8 py-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#eacea9] shadow-lg transition-all hover:bg-[#16213E] hover:border-[#eacea9]/60"
        >
          <span className="material-symbols-outlined text-[18px]">home</span>
          VOLVER AL PANEL DE CONTROL
        </button>
        
        <button 
          onClick={() => window.print()}
          className="text-white/40 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">print</span>
          Imprimir Reporte
        </button>
      </div>
    </div>
  );
};

export default ExecutiveReportPage;
