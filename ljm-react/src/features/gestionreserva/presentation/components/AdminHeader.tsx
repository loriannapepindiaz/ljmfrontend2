import React from 'react';

interface AdminHeaderProps {
  title: string;
  onAddClick?: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ title, onAddClick }) => {
  return (
    <header className="flex items-center justify-between px-8 py-5 bg-white border-b border-slate-200">
      <h2 className="font-bold text-2xl text-[#0e1a34]">{title}</h2>

      <div className="flex items-center gap-6">
        <button
          onClick={onAddClick}
          className="bg-[#eacea9] hover:bg-[#d4af37] text-[#0e1a34] font-bold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-all shadow-sm text-sm"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Añadir Reserva
        </button>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-bold text-[#0e1a34]">Usuario Admin</p>
            <p className="text-[10px] text-slate-400 uppercase tracking-tighter">Super Administrador</p>
          </div>
          <div
            className="size-10 rounded-full bg-slate-200 border-2 border-[#eacea9]/40 overflow-hidden"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCZppru5LtfKXUD7p02Kq7BK47dx6wPhWDEOsoLu4Kh3ZpKkqcWDa1zE0qdS5RW4bHQ-gykGxdLQyfwqM5qf78vawXWClL33747BeXhYBH0zUmMbNtR13pGb_9tHW7ycLrh08AFalQPzY6LsCbkc_yUKU9xA42Umn0YP8Zfyvtj_Q-7W5vl0Httnv2mIqLzII5oW2s2_rgN2YT4d0fgzJerkFwZ6GzHzxWQQbXPTdVZRjazNxysQQMmwxqAyoyEWRG-cKLjPs9ld9ql')`,
              backgroundSize: 'cover',
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;