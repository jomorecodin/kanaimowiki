import { User } from "lucide-react";

interface ProfileCardProps {
  nombre: string;
  rol: string;
  nivel: string;
  lugar: string;
  onContinue: () => void;
}

const rolLabels: Record<string, string> = {
  aprendiz: "Aprendiz",
  hablante: "Hablante",
  lider: "Lider comunitario",
  visitante: "Visitante",
};

const nivelLabels: Record<string, string> = {
  ninguno: "Ninguno",
  basico: "Basico",
  intermedio: "Intermedio",
  avanzado: "Avanzado",
};

export function ProfileCard({ nombre, rol, nivel, lugar, onContinue }: ProfileCardProps) {
  const displayName = nombre || "Visitante";

  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-6 bg-tanino px-8 text-center">
      {/* Avatar */}
      <div className="grid h-20 w-20 place-items-center rounded-full bg-tanino-light">
        <User className="h-8 w-8 text-roca" />
      </div>

      {/* Name */}
      <h2 className="font-display text-3xl tracking-wide text-oro">
        {displayName.toUpperCase()}
      </h2>

      {/* Badges */}
      <div className="flex flex-wrap justify-center gap-2">
        {rol && (
          <span className="rounded-full bg-oro/20 px-3 py-1 text-xs font-bold text-oro">
            {rolLabels[rol] || rol}
          </span>
        )}
        {nivel && (
          <span className="rounded-full bg-tanino-light px-3 py-1 text-xs font-bold text-neblina-soft">
            Nivel: {nivelLabels[nivel] || nivel}
          </span>
        )}
        {lugar && (
          <span className="rounded-full bg-tanino-light px-3 py-1 text-xs font-bold text-neblina-soft">
            {lugar}
          </span>
        )}
      </div>

      <p className="max-w-[260px] text-sm text-neblina-soft/60">
        Tu tarjeta. Puedes cambiar estos datos en cualquier momento.
      </p>

      <button
        type="button"
        onClick={onContinue}
        className="w-full max-w-xs rounded-xl bg-oro py-3.5 font-bold text-tanino transition-all active:scale-[0.97]"
      >
        Entrar a KanaimoWiki
      </button>
    </div>
  );
}
