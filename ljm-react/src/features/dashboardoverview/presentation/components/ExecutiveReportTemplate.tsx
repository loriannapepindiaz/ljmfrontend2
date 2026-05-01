import React, { forwardRef } from 'react';

const ExecutiveReportTemplate = forwardRef<HTMLDivElement>((_, ref) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: '2-digit',
  });

  return (
    <div 
      ref={ref} 
      className="bg-[#fdfbf7] p-12 w-[800px] min-h-[1132px] text-[#0e1a34] font-sans mx-auto shadow-2xl border border-gray-100"
      style={{ position: 'absolute', left: '-9999px', top: '-9999px' }} // Hide it from view
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-16">
        <div>
          <div className="flex items-center gap-3 mb-2">
             <img src="/logo.png" alt="LJM Sealine Logo" className="size-10 object-contain" />
            <h1 className="text-2xl font-bold tracking-tight">LJM Sealine</h1>
          </div>
          <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#0e1a34]/60">Executive Maritime Report</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-widest font-bold text-[#0e1a34]/40 mb-1">SERIAL #LJM-2024-OX01</p>
          <p className="text-2xl font-serif italic mb-1">October 2024</p>
          <p className="text-[9px] text-[#0e1a34]/40">Generated: {currentDate}</p>
        </div>
      </div>

      <hr className="border-[#0e1a34]/10 mb-12" />

      {/* Executive Summary */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-4 w-1 bg-[#eacea9]"></div>
          <h2 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#0e1a34]/50">Executive Summary</h2>
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Total Reservations', value: '1,284', trend: '+12.4%', trendUp: true },
            { label: 'Confirmed', value: '850', trend: '+5.2%', trendUp: true },
            { label: 'Pending', value: '320', trend: '-2.1%', trendUp: false },
            { label: 'Total Revenue', value: '$45,200', trend: '+18.0%', trendUp: true, dark: true },
          ].map((stat, i) => (
            <div 
              key={i} 
              className={`p-6 rounded-sm ${stat.dark ? 'bg-[#0e1a34] text-white shadow-xl' : 'bg-white border border-[#0e1a34]/5 shadow-sm'}`}
            >
              <p className={`text-[9px] uppercase tracking-wider font-bold mb-3 ${stat.dark ? 'text-white/60' : 'text-[#0e1a34]/40'}`}>
                {stat.label}
              </p>
              <p className="text-2xl font-bold mb-2">{stat.value}</p>
              <p className={`text-[10px] font-bold flex items-center gap-1 ${stat.trendUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                {stat.trend}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Fleet Performance Trends */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="h-4 w-1 bg-[#eacea9]"></div>
            <h2 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#0e1a34]/50">Fleet Performance Trends</h2>
          </div>
          <p className="text-[9px] italic text-[#0e1a34]/40">Aggregated daily bookings - October 2024</p>
        </div>

        <div className="h-48 flex items-end justify-between px-4 gap-2 mb-4">
          {[40, 55, 65, 50, 90, 75, 60, 95, 45, 65, 80, 95].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
              <div 
                className={`w-full rounded-t-sm transition-all duration-500 ${[4, 11].includes(i) ? 'bg-[#0e1a34]' : 'bg-[#eacea9]/40'}`}
                style={{ height: `${h}%` }}
              ></div>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-[8px] uppercase tracking-widest font-bold text-[#0e1a34]/30 px-2">
          <span>Week 01</span>
          <span>Week 02</span>
          <span>Week 03</span>
          <span>Week 04</span>
        </div>
      </section>

      {/* Activity Ledger */}
      <section className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-4 w-1 bg-[#eacea9]"></div>
          <h2 className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#0e1a34]/50">Activity Ledger</h2>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="text-[9px] uppercase tracking-wider font-bold text-[#0e1a34]/40 border-b border-[#0e1a34]/10">
              <th className="py-4">Booking ID</th>
              <th className="py-4">Passenger Name</th>
              <th className="py-4">Cruise Designation</th>
              <th className="py-4">Filing Status</th>
              <th className="py-4 text-right">Invoice Amount</th>
            </tr>
          </thead>
          <tbody className="text-[11px] font-medium divide-y divide-[#0e1a34]/5">
            {[
              { id: '#LJM-9921', name: 'Elena Richardson', cruise: 'Aegean Sunset Expedition', status: 'VERIFIED', amount: '$3,450.00' },
              { id: '#LJM-9922', name: 'Marcus Vane', cruise: 'Nordic Fjords Crossing', status: 'PROCESSING', amount: '$1,820.00' },
              { id: '#LJM-9923', name: 'Sofia Loren', cruise: 'Azure Coastline Premier', status: 'VERIFIED', amount: '$5,200.00' },
              { id: '#LJM-9924', name: 'Julian Thorne', cruise: 'Caribbean Pearl Discovery', status: 'PROCESSING', amount: '$4,100.00' },
            ].map((row, i) => (
              <tr key={i} className="hover:bg-[#0e1a34]/[0.02]">
                <td className="py-4 font-bold">{row.id}</td>
                <td className="py-4">{row.name}</td>
                <td className="py-4 text-[#0e1a34]/60 italic">{row.cruise}</td>
                <td className="py-4">
                  <span className={`px-2 py-0.5 rounded-[2px] text-[8px] font-bold border ${row.status === 'VERIFIED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-orange-50 text-orange-600 border-orange-100'}`}>
                    {row.status}
                  </span>
                </td>
                <td className="py-4 text-right font-bold">{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Footer */}
      <div className="mt-auto pt-12 border-t border-[#0e1a34]/5 flex justify-between items-end">
        <div>
          <p className="text-[8px] uppercase tracking-[0.2em] font-bold text-[#0e1a34]/30 mb-6">Fleet Operations Authorization</p>
          <div className="mb-2">
            <p className="text-xl font-serif italic text-[#0e1a34]/80">C. Montgomery</p>
            <div className="h-[1px] w-48 bg-[#0e1a34]/10 mt-1"></div>
          </div>
          <p className="text-[9px] font-bold text-[#0e1a34]/60">Cyrus Montgomery</p>
          <p className="text-[8px] uppercase tracking-widest text-[#0e1a34]/40 mt-1">Fleet Operations Director</p>
        </div>

        <div className="flex gap-8 items-center">
          <div className="text-right">
             <div className="flex items-center gap-2 justify-end mb-2">
                <span className="material-symbols-outlined text-emerald-500 text-sm">verified_user</span>
                <p className="text-[9px] uppercase tracking-widest font-bold text-[#0e1a34]">Seal of Authenticity</p>
             </div>
             <p className="text-[8px] text-[#0e1a34]/40 leading-relaxed max-w-[180px]">
               This document is a certified electronic record. Scan QR for blockchain verification and full ledger access.
             </p>
          </div>
          <div className="size-12 bg-[#0e1a34] flex items-center justify-center p-1">
             <div className="w-full h-full border border-white/20 grid grid-cols-4 grid-rows-4 opacity-40">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className={`border-[0.5px] border-white/10 ${Math.random() > 0.5 ? 'bg-white' : ''}`}></div>
                ))}
             </div>
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-between text-[8px] uppercase tracking-widest font-bold text-[#0e1a34]/20">
        <p>© 2024 MARITIME MERIDIAN HOLDINGS</p>
        <p>CONFIDENTIAL - FOR BOARD DISTRIBUTION ONLY</p>
      </div>
    </div>
  );
});

ExecutiveReportTemplate.displayName = 'ExecutiveReportTemplate';

export default ExecutiveReportTemplate;
