import { useState } from "react";
import { Search } from "lucide-react";
import { API_BASE_URL } from "../../../../lib/api";
import type { Guest } from "../types";

interface SearchResult {
  id: string;
  nombre: string | null;
  apellido: string | null;
  email: string | null;
  member_code: string | null;
  documento_id: string | null;
}

interface ExclusiveSearchProps {
  onSelectMember: (guest: Guest) => void;
}

export default function ExclusiveSearch({ onSelectMember }: ExclusiveSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [added, setAdded] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    setAdded(null);
    try {
      const token = localStorage.getItem("ljm_auth_token") ?? "";
      const res = await fetch(
        `${API_BASE_URL}/pasajeros?search=${encodeURIComponent(query.trim())}`,
        { headers: token ? { Authorization: `Bearer ${token}` } : {} },
      );
      const json = await res.json();
      setResults(json.ok ? json.data : []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const selectMember = (member: SearchResult) => {
    onSelectMember({
      nombre: member.nombre ?? "",
      apellidos: member.apellido ?? "",
      fecha: null,
      pasaporte: member.documento_id ?? "",
    });
    setAdded(member.id);
    setResults(prev => prev.filter(r => r.id !== member.id));
  };

  return (
    <section className="space-y-4">
      <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#dec29e]">Búsqueda exclusiva</h4>

      <div className="flex flex-col gap-3 md:flex-row">
        <div className="group flex flex-1 items-center rounded-lg border border-white/5 bg-[#1e2944]/40 transition-all duration-300 focus-within:bg-[#1e2944]/60">
          <div className="flex items-center justify-center pl-6 pr-3">
            <Search className="text-[#8f9098]" size={20} />
          </div>
          <input
            className="w-full border-none bg-transparent py-4 text-base font-light text-[#d9e2ff] placeholder:text-[#8f9098]/40 focus:ring-0 md:text-lg"
            placeholder="Buscar miembro por nombre..."
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setSearched(false); setAdded(null); }}
            onKeyDown={handleKeyDown}
          />
        </div>

        <button
          type="button"
          onClick={handleSearch}
          disabled={loading || !query.trim()}
          className="flex shrink-0 items-center justify-center gap-2 rounded-lg border border-white/10 bg-[#29344f] px-8 py-4 text-[11px] uppercase tracking-[0.2em] text-[#d9e2ff] transition-all hover:bg-[#3b4663] disabled:opacity-40"
        >
          {loading
            ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            : "Buscar"}
        </button>
      </div>

      {added && (
        <p className="flex items-center gap-2 text-sm text-emerald-400">
          <span className="material-symbols-outlined text-base">check_circle</span>
          Acompañante añadido correctamente.
        </p>
      )}

      {searched && !loading && (
        <div className="overflow-hidden rounded-lg border border-white/10 bg-[#1e2944]/60">
          {results.length === 0 ? (
            <p className="px-5 py-4 text-sm text-[#8f9098]">
              No se encontraron miembros con ese nombre.
            </p>
          ) : (
            <ul className="divide-y divide-white/5">
              {results.map(member => (
                <li key={member.id}>
                  <button
                    type="button"
                    onClick={() => selectMember(member)}
                    className="flex w-full items-center justify-between px-5 py-3.5 text-left transition-colors hover:bg-[#29344f]"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-[#d9e2ff]">
                        {[member.nombre, member.apellido].filter(Boolean).join(" ")}
                      </p>
                      {member.email && (
                        <p className="truncate text-xs text-[#8f9098]">{member.email}</p>
                      )}
                    </div>
                    <div className="ml-4 flex shrink-0 items-center gap-3">
                      {member.member_code && (
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#dec29e]">
                          {member.member_code}
                        </span>
                      )}
                      <span className="rounded-md bg-[#dec29e]/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#dec29e]">
                        Añadir
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}
