import type { Palabra } from "../data/types";
import { StatusBadge } from "./StatusBadge";

interface WordCardProps {
  palabra: Palabra;
  onTap?: (palabra: Palabra) => void;
}

export function WordCard({ palabra, onTap }: WordCardProps) {
  return (
    <button
      type="button"
      onClick={() => onTap?.(palabra)}
      className="flex w-full items-center justify-between rounded-xl bg-tanino-light px-4 py-3 text-left transition-colors hover:bg-tanino-light/80"
    >
      <div className="min-w-0 flex-1">
        <p className="font-display text-lg tracking-wide text-neblina">
          {palabra.pemon}
        </p>
        <p className="text-sm text-neblina-soft">{palabra.es}</p>
      </div>
      <StatusBadge estado={palabra.estado} />
    </button>
  );
}
