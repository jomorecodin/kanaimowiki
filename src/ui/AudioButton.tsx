import { Volume2 } from "lucide-react";

interface AudioButtonProps {
  available?: boolean;
}

/**
 * Audio playback button. In Stage 1, no real audio exists.
 * Shows "Audio pendiente" state when not available.
 * Never synthesize or generate Pemón audio.
 */
export function AudioButton({ available = false }: AudioButtonProps) {
  if (!available) return null;

  return (
    <button
      type="button"
      aria-label="Escuchar pronunciación"
      className="flex h-9 w-9 items-center justify-center rounded-full bg-tanino-light text-neblina-soft transition-colors hover:bg-oro/20 hover:text-oro"
    >
      <Volume2 className="h-4 w-4" />
    </button>
  );
}
