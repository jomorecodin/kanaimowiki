import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { palabras, categorias } from "../../data/mockData";
import { matchesQuery } from "../../data/search";
import { SearchBar } from "../../ui/SearchBar";
import { WordCard } from "../../ui/WordCard";
import { WordDetail } from "../../ui/WordDetail";
import type { Palabra, Estado } from "../../data/types";

const filters: { label: string; value: Estado | "todas" }[] = [
  { label: "Todas", value: "todas" },
  { label: "Confirmadas", value: "confirmada" },
  { label: "Propuestas", value: "propuesta" },
  { label: "Pendientes", value: "pendiente" },
];

export function DictionaryPage() {
  const [searchParams] = useSearchParams();
  const catFilter = searchParams.get("cat");

  const [query, setQuery] = useState("");
  const [estadoFilter, setEstadoFilter] = useState<Estado | "todas">("todas");
  const [selected, setSelected] = useState<Palabra | null>(null);

  const filtered = useMemo(() => {
    return palabras.filter((p) => {
      if (catFilter && p.categoria !== catFilter) return false;
      if (estadoFilter !== "todas" && p.estado !== estadoFilter) return false;
      if (query && !matchesQuery(p.pemon, query) && !matchesQuery(p.es, query)) return false;
      return true;
    });
  }, [query, estadoFilter, catFilter]);

  // Group by category
  const grouped = useMemo(() => {
    const groups: Record<string, Palabra[]> = {};
    for (const p of filtered) {
      const catName = categorias.find((c) => c.id === p.categoria)?.nombre || "Otra";
      if (!groups[catName]) groups[catName] = [];
      groups[catName].push(p);
    }
    return groups;
  }, [filtered]);

  return (
    <div className="space-y-4">
      <SearchBar value={query} onChange={setQuery} />

      {/* Filter pills */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {filters.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setEstadoFilter(f.value)}
            className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
              estadoFilter === f.value
                ? "bg-oro text-tanino"
                : "bg-tanino-light text-neblina-soft"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Word list grouped by category */}
      {Object.entries(grouped).length === 0 ? (
        <p className="py-8 text-center text-sm text-neblina-soft/50">
          No se encontraron palabras
        </p>
      ) : (
        Object.entries(grouped).map(([catName, words]) => (
          <div key={catName}>
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-neblina-soft">
              {catName} ({words.length})
            </h3>
            <div className="space-y-2">
              {words.map((p) => (
                <WordCard key={p.id} palabra={p} onTap={setSelected} />
              ))}
            </div>
          </div>
        ))
      )}

      {/* Word detail bottom sheet */}
      {selected && (
        <WordDetail palabra={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
