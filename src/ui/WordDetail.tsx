import { X } from "lucide-react";
import type { Palabra } from "../data/types";
import { categorias } from "../data/mockData";
import { StatusBadge } from "./StatusBadge";

interface WordDetailProps {
  palabra: Palabra;
  onClose: () => void;
}

export function WordDetail({ palabra, onClose }: WordDetailProps) {
  const cat = categorias.find((c) => c.id === palabra.categoria);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Sheet */}
      <div className="relative z-10 w-full max-w-md rounded-t-2xl bg-tanino p-6 pb-[max(2rem,env(safe-area-inset-bottom))]">
        {/* Drag handle */}
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-neblina-soft/30" />

        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 rounded-full p-2 text-neblina-soft hover:bg-tanino-light"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="font-display text-3xl tracking-wide text-neblina">
          {palabra.pemon}
        </h2>

        <p className="mt-2 text-lg text-roca">{palabra.es}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <StatusBadge estado={palabra.estado} />
          {cat && (
            <span className="rounded-full bg-tanino-light px-3 py-0.5 text-xs text-neblina-soft">
              {cat.nombre}
            </span>
          )}
        </div>

        {palabra.nota_cultural && (
          <div className="mt-5">
            <h3 className="mb-1 text-xs font-bold uppercase tracking-wider text-neblina-soft">
              Nota
            </h3>
            <p className="text-sm leading-relaxed text-neblina-soft">
              {palabra.nota_cultural}
            </p>
          </div>
        )}

        {!palabra.audio_archivo && (
          <p className="mt-5 text-xs text-neblina-soft/50">
            Audio pendiente
          </p>
        )}
      </div>
    </div>
  );
}
