import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { API_BASE_URL } from '../../../../lib/api';

/* ─── Types ─────────────────────────────────────────── */
interface Semana   { label: string; reservas: number; ingresos: number; pct: number }
interface Transaccion {
  fecha: string; codigo: string; cliente: string; viaje: string;
  estado_pago: string; estado_reserva: string; monto: number;
}
interface Resumen {
  total: number; confirmadas: number; pendientes: number; ingresos_totales: number;
  pct_confirmadas: number; pct_pendientes: number; pct_otros: number;
}
interface ReporteData {
  serial: string; fecha_generado: string;
  resumen: Resumen; semanas: Semana[]; transacciones: Transaccion[];
}

/* ─── Helpers ────────────────────────────────────────── */
const fmt = (n: number) =>
  `$${n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });

const fmtMonth = (iso: string) =>
  new Date(iso).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });

const authHeaders = () => {
  const token = localStorage.getItem('ljm_auth_token') ?? localStorage.getItem('ljm_admin_token');
  return { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) };
};

/* ─── Component ──────────────────────────────────────── */
const ReporteEjecutivoPage: React.FC = () => {
  const navigate   = useNavigate();
  const printRef   = useRef<HTMLDivElement>(null);
  const [data, setData]       = useState<ReporteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/reportes/ejecutivo`, { headers: authHeaders() })
      .then((r) => r.json())
      .then((payload) => {
        if (!payload.ok) throw new Error(payload.message ?? 'Error');
        setData(payload.data as ReporteData);
      })
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Error al cargar reporte'))
      .finally(() => setLoading(false));
  }, []);

  const handlePrint = () => window.print();

  const qrValue = data
    ? `LJM Sealine | Serial: ${data.serial} | Generado: ${new Date(data.fecha_generado).toLocaleDateString('es-ES')} | Ingresos: ${fmt(data.resumen.ingresos_totales)}`
    : 'LJM Sealine Report';

  /* ── Loading / Error ── */
  if (loading) return (
    <div className="min-h-screen bg-[#0e1a34] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[#eacea9]/30 border-t-[#eacea9] rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[#eacea9] font-medium tracking-widest text-sm uppercase">Generando reporte…</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-[#0e1a34] flex items-center justify-center">
      <div className="text-center">
        <p className="text-rose-400 mb-4">{error}</p>
        <button onClick={() => navigate('/admin/reportes')} className="text-[#eacea9] underline text-sm">Volver</button>
      </div>
    </div>
  );

  const r = data!.resumen;

  return (
    <div className="min-h-screen bg-[#0e1a34] flex flex-col items-center py-10 px-4 print:bg-white print:p-0 print:block">

      {/* ── Report Paper ── */}
      <div
        ref={printRef}
        className="bg-white w-full max-w-[760px] shadow-2xl print:shadow-none print:max-w-full"
        style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
      >
        {/* Header */}
        <div className="px-12 pt-10 pb-6 border-b-2 border-[#0e1a34]">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="LJM Sealine" className="h-12 w-auto object-contain" />
              <div>
                <h1 className="text-3xl font-bold text-[#0e1a34] italic tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
                  LJM Sealine
                </h1>
                <p className="text-[10px] tracking-[0.3em] text-[#0e1a34]/50 uppercase mt-0.5">
                  Executive Maritime Report
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] tracking-widest text-[#0e1a34]/50 uppercase">Serial #{data!.serial}</p>
              <p className="text-2xl font-bold italic text-[#0e1a34] mt-1">{fmtMonth(data!.fecha_generado)}</p>
              <p className="text-[10px] text-[#0e1a34]/40 mt-0.5">
                Generado: {fmtDate(data!.fecha_generado)}
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-12 py-6 space-y-7">

          {/* ── Resumen Ejecutivo ── */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-5 bg-[#eacea9]" />
              <h2 className="text-[11px] tracking-[0.25em] font-bold text-[#0e1a34] uppercase">Resumen Ejecutivo</h2>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: 'Total Reservas', value: r.total, pct: null, dark: false },
                { label: 'Confirmadas',    value: r.confirmadas, pct: r.pct_confirmadas, dark: false },
                { label: 'Pendientes',     value: r.pendientes,  pct: r.pct_pendientes,  dark: false },
                { label: 'Ingresos Totales', value: fmt(r.ingresos_totales), pct: null, dark: true },
              ].map((c) => (
                <div
                  key={c.label}
                  className={`rounded p-4 ${c.dark ? 'bg-[#0e1a34] text-white' : 'bg-[#f8f6f1] text-[#0e1a34]'}`}
                >
                  <p className={`text-[9px] tracking-widest uppercase mb-2 ${c.dark ? 'text-[#eacea9]' : 'text-[#0e1a34]/50'}`}>
                    {c.label}
                  </p>
                  <p className={`text-2xl font-bold ${c.dark ? 'text-[#eacea9]' : 'text-[#0e1a34]'}`}>
                    {c.value}
                  </p>
                  <p className={`text-[10px] mt-1 ${c.dark ? 'text-[#eacea9]/60' : 'text-[#0e1a34]/40'}`}>
                    {c.pct !== null ? `${c.pct}%` : ''}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Tendencias de Flota ── */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-1 h-5 bg-[#eacea9]" />
                <h2 className="text-[11px] tracking-[0.25em] font-bold text-[#0e1a34] uppercase">Tendencias de Flota</h2>
              </div>
              {data!.semanas.every((s) => s.ingresos === 0) && (
                <p className="text-[10px] text-[#0e1a34]/40 italic">Sin actividad registrada en este período</p>
              )}
            </div>

            <div className="flex items-end gap-6 border-b border-[#0e1a34]/10 pb-2" style={{ height: '100px' }}>
              {data!.semanas.map((s) => (
                <div key={s.label} className="flex-1 flex flex-col items-center justify-end gap-1" style={{ height: '100%' }}>
                  <span className="text-[9px] text-[#0e1a34]/50 font-bold mb-1">
                    {s.ingresos > 0 ? fmt(s.ingresos) : ''}
                  </span>
                  <div
                    className="w-full rounded-t"
                    style={{
                      height: `${Math.max(s.pct, 3)}%`,
                      background: s.ingresos > 0
                        ? 'linear-gradient(to top, #c9a87a, #eacea9)'
                        : '#f1ede6',
                      minHeight: '6px',
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-1">
              {data!.semanas.map((s) => (
                <div key={s.label} className="flex-1 text-center">
                  <p className="text-[9px] tracking-widest text-[#0e1a34]/40 uppercase">{s.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Libro de Actividades ── */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-5 bg-[#eacea9]" />
              <h2 className="text-[11px] tracking-[0.25em] font-bold text-[#0e1a34] uppercase">Libro de Actividades</h2>
            </div>

            <div className="border border-[#0e1a34]/10 rounded overflow-hidden">
              {data!.transacciones.length === 0 ? (
                <div className="py-10 text-center">
                  <p className="text-[11px] text-[#0e1a34]/40 italic">No hay transacciones disponibles para este reporte.</p>
                </div>
              ) : (
                <table className="w-full text-left" style={{ fontFamily: 'Arial, sans-serif' }}>
                  <thead>
                    <tr className="bg-[#f8f6f1] border-b border-[#0e1a34]/10">
                      {['Fecha', 'Código', 'Cliente', 'Viaje', 'Estado', 'Monto'].map((h) => (
                        <th key={h} className="px-3 py-2.5 text-[9px] tracking-widest text-[#0e1a34]/50 uppercase font-bold">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data!.transacciones.slice(0, 10).map((t, i) => (
                      <tr key={i} className={`border-b border-[#0e1a34]/5 ${i % 2 === 0 ? 'bg-white' : 'bg-[#fafaf8]'}`}>
                        <td className="px-3 py-1.5 text-[10px] text-[#0e1a34]/60 whitespace-nowrap">{fmtDate(t.fecha)}</td>
                        <td className="px-3 py-1.5 text-[10px] font-bold text-[#0e1a34] whitespace-nowrap">{t.codigo}</td>
                        <td className="px-3 py-1.5 text-[10px] text-[#0e1a34]/80 whitespace-nowrap overflow-hidden" style={{ maxWidth: '90px' }}>
                          {t.cliente.length > 14 ? t.cliente.slice(0, 14) + '…' : t.cliente}
                        </td>
                        <td className="px-3 py-1.5 text-[10px] text-[#0e1a34]/60 overflow-hidden" style={{ maxWidth: '110px' }}>
                          {t.viaje.length > 20 ? t.viaje.slice(0, 20) + '…' : t.viaje}
                        </td>
                        <td className="px-3 py-1.5">
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide ${
                            t.estado_pago?.toLowerCase().includes('pagad')
                              ? 'bg-emerald-50 text-emerald-700'
                              : t.estado_pago?.toLowerCase().includes('pend')
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}>
                            {t.estado_pago}
                          </span>
                        </td>
                        <td className="px-3 py-1.5 text-[10px] font-bold text-[#0e1a34] whitespace-nowrap">{fmt(t.monto)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>

          {/* ── Footer / Autorización ── */}
          <section className="border-t border-[#0e1a34]/10 pt-8">
            <p className="text-[9px] tracking-widest text-[#0e1a34]/40 uppercase mb-6">Autorización de Operaciones</p>
            <div className="flex items-end justify-between">
              {/* Firma */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[#eacea9] text-lg">⊙</span>
                  <p className="text-xl italic text-[#0e1a34]" style={{ fontFamily: 'Georgia, serif' }}>Pendiente</p>
                </div>
                <div className="w-48 border-b border-[#0e1a34]/30 mb-1" />
                <p className="text-[9px] font-bold text-[#0e1a34] uppercase tracking-wide">Director de Operaciones</p>
                <p className="text-[9px] text-[#0e1a34]/50 uppercase tracking-wide">LJM SEALINE FLEET MANAGEMENT</p>
              </div>

              {/* Sello */}
              <div className="text-center">
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-[#0e1a34]/40 text-xs">⊛</span>
                  <p className="text-[9px] tracking-widest text-[#0e1a34]/50 uppercase font-bold">Sello de Autenticidad</p>
                </div>
                <p className="text-[8px] text-[#0e1a34]/30 max-w-[140px] text-center leading-tight">
                  Este documento es un récord electrónico<br />certificado. Escanee el QR para verificación.
                </p>
              </div>

              {/* QR */}
              <div className="border border-[#0e1a34]/10 p-2 rounded">
                <QRCodeSVG
                  value={qrValue}
                  size={72}
                  fgColor="#0e1a34"
                  bgColor="#ffffff"
                  level="M"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Document Footer */}
        <div className="px-12 py-4 border-t border-[#0e1a34]/10 flex items-center justify-between">
          <p className="text-[8px] tracking-widest text-[#0e1a34]/30 uppercase">
            ©{new Date().getFullYear()} Maritime Meridian Holdings
          </p>
          <p className="text-[8px] tracking-widest text-[#0e1a34]/30 uppercase">
            Confidencial · Solo para distribución de la junta
          </p>
        </div>
      </div>

      {/* ── Bottom action buttons (hidden on print) ── */}
      <div className="no-print flex items-center gap-4 mt-10">
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="group relative flex items-center gap-2.5 bg-white/5 border border-[#eacea9]/25 text-[#eacea9] px-7 py-3.5 rounded-2xl text-xs font-bold tracking-[0.18em] uppercase overflow-hidden transition-all duration-300 hover:border-[#eacea9]/60 hover:bg-white/10 hover:scale-105 active:scale-95"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-[#eacea9]/8 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          <span className="material-symbols-outlined text-[17px] group-hover:-translate-y-0.5 transition-transform duration-200">home</span>
          Volver al Panel
        </button>

        <button
          onClick={handlePrint}
          className="group relative flex items-center gap-2.5 bg-[#eacea9] text-[#0e1a34] px-7 py-3.5 rounded-2xl text-xs font-bold tracking-[0.18em] uppercase overflow-hidden transition-all duration-300 hover:bg-[#d4b48a] hover:scale-105 active:scale-95 shadow-lg shadow-[#eacea9]/20"
        >
          <span className="absolute inset-0 bg-white/25 -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
          <span className="material-symbols-outlined text-[17px] group-hover:rotate-12 transition-transform duration-200">print</span>
          Imprimir Reporte
        </button>
      </div>

      {/* ── Print styles ── */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { margin: 0; background: white; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          @page { margin: 10mm; size: A4 portrait; }
          * { box-sizing: border-box; }
        }
      `}</style>
    </div>
  );
};

export default ReporteEjecutivoPage;
