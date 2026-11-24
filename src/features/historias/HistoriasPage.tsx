import { useState } from "react";
import { Sun, CloudLightning, Heart, Flame, Mountain, X, BookOpen } from "lucide-react";
import { historias } from "../../data/mockData";
import type { Historia } from "../../data/types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  sun: Sun,
  "cloud-lightning": CloudLightning,
  heart: Heart,
  flame: Flame,
  mountain: Mountain,
};

export function HistoriasPage() {
  const [selected, setSelected] = useState<Historia | null>(null);

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm text-neblina-soft">
          Mitos, leyendas y cosmovisión del pueblo pemón de la Gran Sabana y Canaima.
        </p>
      </div>

      {/* Story cards */}
      <div className="space-y-3">
        {historias.map((h) => {
          const Icon = iconMap[h.icono] || BookOpen;
          return (
            <button
              key={h.id}
              type="button"
              onClick={() => setSelected(h)}
              className="flex w-full items-start gap-4 rounded-2xl bg-tanino-light p-5 text-left transition-colors hover:bg-tanino-light/80"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-oro/10">
                <Icon className="h-6 w-6 text-oro" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-base tracking-wide text-neblina">
                  {h.titulo.toUpperCase()}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-neblina-soft/70">
                  {h.resumen}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Story detail overlay */}
      {selected && (
        <div className="fixed inset-0 z-50 flex flex-col bg-tanino">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3">
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="flex items-center gap-1 text-sm font-bold text-neblina-soft transition-colors hover:text-neblina"
            >
              <X className="h-5 w-5" /> Cerrar
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-5 pb-10">
            <h2 className="font-display text-2xl tracking-wide text-oro">
              {selected.titulo.toUpperCase()}
            </h2>

            <div className="mt-6 space-y-4">
              {selected.contenido.split("\n\n").map((paragraph, i) => (
                <p key={i} className="text-sm leading-relaxed text-neblina-soft">
                  {paragraph}
                </p>
              ))}
            </div>

            {selected.fuente && (
              <p className="mt-8 text-xs text-neblina-soft/40">
                Fuente: {selected.fuente}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
