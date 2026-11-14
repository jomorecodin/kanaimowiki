import { useState, useMemo } from "react";
import { partesFrase } from "../../data/mockData";
import type { ParteFrase } from "../../data/types";

type Rol = "accion" | "lugar" | "objeto";

const steps: { rol: Rol; label: string }[] = [
  { rol: "accion", label: "Accion" },
  { rol: "lugar", label: "Lugar" },
  { rol: "objeto", label: "Objeto" },
];

export function PhrasesPage() {
  const [selections, setSelections] = useState<Record<Rol, ParteFrase | null>>({
    accion: null,
    lugar: null,
    objeto: null,
  });

  const partsByRole = useMemo(() => {
    const map: Record<Rol, ParteFrase[]> = { accion: [], lugar: [], objeto: [] };
    for (const part of partesFrase) {
      if (part.rol in map) {
        map[part.rol as Rol].push(part);
      }
    }
    return map;
  }, []);

  const handleSelect = (rol: Rol, part: ParteFrase) => {
    setSelections((prev) => ({
      ...prev,
      [rol]: prev[rol]?.id === part.id ? null : part,
    }));
  };

  // Build phrase from selections
  const selectedParts = [selections.accion, selections.lugar, selections.objeto].filter(
    Boolean
  ) as ParteFrase[];

  const phraseEs = selectedParts.map((p) => p.es).join(" + ");
  const phrasePemon = selectedParts.map((p) => p.pemon).join(" ");

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-neblina-soft">
          Arma una frase paso a paso en pemon.
        </p>
        <p className="mt-1 text-xs text-neblina-soft/50">
          Solo se muestran frases con partes confirmadas. Las reglas de
          gramatica se agregaran cuando el profesor Roger las confirme.
        </p>
      </div>

      {/* Steps */}
      {steps.map(({ rol, label }, idx) => (
        <div key={rol}>
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-neblina-soft">
            {idx + 1}. {label}
          </h3>
          <div className="flex flex-wrap gap-2">
            {partsByRole[rol].length === 0 ? (
              <p className="text-xs italic text-neblina-soft/40">Falta</p>
            ) : (
              partsByRole[rol].map((part) => {
                const isSelected = selections[rol]?.id === part.id;
                return (
                  <button
                    key={part.id}
                    type="button"
                    onClick={() => handleSelect(rol, part)}
                    className={`rounded-xl px-4 py-2.5 text-sm font-bold transition-colors ${
                      isSelected
                        ? "bg-oro text-tanino"
                        : "bg-tanino-light text-neblina-soft hover:bg-tanino-light/80"
                    }`}
                  >
                    {part.es}
                  </button>
                );
              })
            )}
          </div>
        </div>
      ))}

      {/* Result */}
      {selectedParts.length > 0 && (
        <div className="rounded-2xl bg-tanino-light p-5">
          <p className="mb-1 text-xs font-bold uppercase tracking-wider text-neblina-soft">
            Tu frase
          </p>
          <p className="text-sm text-roca">{phraseEs}</p>
          <p className="mt-2 font-display text-2xl tracking-wide text-neblina">
            {phrasePemon}
          </p>
          <p className="mt-3 text-xs text-neblina-soft/50">
            Audio pendiente
          </p>
        </div>
      )}
    </div>
  );
}
