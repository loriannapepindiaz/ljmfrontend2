import React from 'react';

const PagosHeader: React.FC = () => {
  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-4xl font-bold text-[#0e1a34]">Gestión de Pagos</h2>
        <p className="text-slate-500 mt-1">Supervise y gestione todas las transacciones financieras de la flota.</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
          <div className="text-right">
            <p className="text-sm font-bold text-[#0e1a34]">Capitán Morales</p>
            <p className="text-xs text-slate-500">Super Admin</p>
          </div>
          <div
            className="size-10 rounded-full bg-slate-200 overflow-hidden border-2 border-[#eacea9]"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCBcoZ-Mkw13nXrT-N0smcVVViF1VxzvbBSA3CBCSdEUMHZ6iVboa-QY4OzqOEf4fauccUoVJbcHNsAgXizBUnea7VPjqOv0h_SNHR0XXTz3fPKcPoxR2D1fK6LM2PuIwN3Kgovgs6605QIMu8ignR93jrCEEPLpXU3zkoQ7f8NzpVVV_uIg77GPxdb7q9sDgn0hx0djWFNbyvAkOnsJjPPNTLuBwqEkDDqoRbQrYYTGsZbFOUzHjEp7SmuLkp2oaWMPY7AraYR3z4M')`,
              backgroundSize: 'cover',
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default PagosHeader;