import { useState, useMemo } from "react";
import { ArrowDownUp } from "lucide-react";
import { palabras } from "../../data/mockData";
import { matchesQuery } from "../../data/search";
import { StatusBadge } from "../../ui/StatusBadge";

type Direction = "es-pemon" | "pemon-es";

export function TranslatePage() {
  const [direction, setDirection] = useState<Direction>("es-pemon");
  const [input, setInput] = useState("");

  const result = useMemo(() => {
    if (!input.trim()) return null;
    const q = input.trim();
    return palabras.find((p) =>
      direction === "es-pemon"
        ? matchesQuery(p.es, q)
        : matchesQuery(p.pemon, q)
    ) ?? null;
  }, [input, direction]);

  const quickWords = ["agua", "sol", "madre", "grande", "ir", "rio"];

  return (
    <div className="space-y-5">
      {/* Direction toggle */}
      <button
        type="button"
        onClick={() => setDirection(direction === "es-pemon" ? "pemon-es" : "es-pemon")}
        className="flex w-full items-center justify-center gap-3 rounded-xl bg-tanino-light py-3 font-bold text-neblina transition-colors hover:bg-tanino-light/80"
      >
        <span className={direction === "es-pemon" ? "text-oro" : "text-neblina-soft"}>
          Espanol
        </span>
        <ArrowDownUp className="h-4 w-4 text-neblina-soft" />
        <span className={direction === "pemon-es" ? "text-oro" : "text-neblina-soft"}>
          Pemon
        </span>
      </button>

      {/* Input */}
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={
          direction === "es-pemon"
            ? "Escribe en espanol..."
            : "Escribe en pemon..."
        }
        maxLength={200}
        rows={3}
        className="w-full resize-none rounded-xl bg-tanino-light p-4 text-neblina placeholder:text-neblina-soft/40 outline-none focus:ring-2 focus:ring-oro/50"
      />

      {/* Result */}
      {input.trim() && (
        <div className="rounded-2xl bg-tanino-light p-5">
          {result ? (
            <>
              <p className="font-display text-2xl tracking-wide text-neblina">
                {direction === "es-pemon" ? result.pemon : result.es}
              </p>
              <p className="mt-1 text-sm text-roca">
                {direction === "es-pemon" ? result.es : result.pemon}
              </p>
              <div className="mt-3">
                <StatusBadge estado={result.estado} />
              </div>
              <p className="mt-2 text-xs text-neblina-soft/50">Audio pendiente</p>
            </>
          ) : (
            <div className="text-center">
              <p className="text-sm text-neblina-soft">
                Esta palabra no esta lista todavia.
              </p>
              <p className="mt-1 text-xs text-neblina-soft/50">
                Puedes proponerla para que sea revisada.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Quick chips */}
      <div>
        <p className="mb-2 text-xs text-neblina-soft/60">Prueba con:</p>
        <div className="flex flex-wrap gap-2">
          {quickWords.map((w) => (
            <button
              key={w}
              type="button"
              onClick={() => {
                setInput(w);
                setDirection("es-pemon");
              }}
              className="rounded-full bg-tanino-light px-3 py-1.5 text-xs font-bold text-neblina-soft transition-colors hover:bg-oro/20 hover:text-oro"
            >
              {w}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
