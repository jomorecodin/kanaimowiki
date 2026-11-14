import { Outlet } from "react-router-dom";
import { BottomNav } from "../ui/BottomNav";
import { Plus, Info } from "lucide-react";
import { useState } from "react";

export function Layout() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col">
      {/* Header */}
      <header className="flex h-14 shrink-0 items-center justify-between bg-tanino/90 px-4 backdrop-blur-lg">
        <h1 className="font-display text-xl tracking-widest text-oro">
          KANAIMOWIKI
        </h1>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setShowInfo(true)}
            aria-label="Informacion"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-neblina-soft/60 transition-colors hover:bg-tanino-light hover:text-neblina"
          >
            <Info className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Proponer palabra"
            className="flex items-center gap-1.5 rounded-lg bg-tanino-light px-3 py-1.5 text-xs font-bold text-oro transition-colors hover:bg-oro/15"
          >
            <Plus className="h-4 w-4" />
            <span>Aportar</span>
          </button>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1 overflow-y-auto px-4 pb-24 pt-4">
        <Outlet />
      </main>

      <BottomNav />

      {/* Info modal */}
      {showInfo && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowInfo(false)} />
          <div className="relative z-10 w-full max-w-md rounded-t-2xl bg-tanino p-6 pb-10">
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-neblina-soft/30" />
            <h2 className="font-display text-2xl tracking-wide text-oro">
              KANAIMOWIKI
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-neblina-soft">
              Un diccionario vivo del idioma pemon kamarakoto, nacido del libro
              maestro del profesor Roger, director de la escuela Araiwonu de
              Canaima, estado Bolivar, Venezuela.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-neblina-soft">
              Todas las palabras son revisadas por hablantes nativos antes de
              publicarse. Puedes proponer palabras nuevas y grabaciones con el
              boton <span className="font-bold text-oro">+ Aportar</span>.
            </p>
            <p className="mt-3 text-xs text-neblina-soft/40">
              El pemon vive en su gente.
            </p>
            <button
              type="button"
              onClick={() => setShowInfo(false)}
              className="mt-6 w-full rounded-xl bg-tanino-light py-3 font-bold text-neblina transition-colors hover:bg-tanino-light/80"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
