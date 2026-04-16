import { Bell, CircleUserRound, Sailboat, Map, BookOpenText, UserPlus, UtensilsCrossed } from "lucide-react";

const navLinks = [
  { label: "Flota", icon: Sailboat },
  { label: "Destinos", icon: Map },
  { label: "Reservas", icon: BookOpenText },
];

const mobileActions = [Sailboat, UserPlus, UtensilsCrossed, CircleUserRound];

export default function TopAppBar() {
  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#06122c]/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[1920px] items-center justify-between px-6 py-6 md:px-12 md:py-8">
          <span
            className="text-xl italic text-[#dec29e] md:text-2xl"
            style={{ fontFamily: "'Noto Serif', serif" }}
          >
            The Nautical Curator
          </span>

          <div className="hidden items-center gap-10 md:flex">
            {navLinks.map(({ label, icon: Icon }) => (
              <a
                key={label}
                className="flex items-center gap-2 text-sm tracking-tight text-[#dec29e]/70 transition-colors duration-300 hover:text-[#dec29e]"
                href="#"
              >
                <Icon size={16} />
                <span style={{ fontFamily: "'Noto Serif', serif" }}>{label}</span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-5 md:gap-8">
            <Bell className="cursor-pointer text-[#dec29e] transition-opacity hover:opacity-70" size={22} />
            <CircleUserRound className="cursor-pointer text-[#dec29e] transition-opacity hover:opacity-70" size={24} />
          </div>
        </div>
      </nav>

      <footer className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-around rounded-t-3xl border-t border-white/5 bg-[#1e2944] px-8 py-5 shadow-[0_-20px_40px_rgba(2,13,39,0.45)] md:hidden">
        {mobileActions.map((Icon, index) => (
          <button
            key={index}
            className={index === 1 ? "text-[#dec29e]" : "text-[#8f9098]"}
            type="button"
          >
            <Icon size={22} />
          </button>
        ))}
      </footer>
    </>
  );
}
