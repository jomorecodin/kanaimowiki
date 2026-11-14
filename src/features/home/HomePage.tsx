import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Sun } from "lucide-react";
import { palabras, categorias } from "../../data/mockData";
import { StatusBadge } from "../../ui/StatusBadge";

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Buenos dias";
  if (h < 18) return "Buenas tardes";
  return "Buenas noches";
}

export function HomePage() {
  const wordOfDay = useMemo(() => {
    const idx = new Date().getDate() % palabras.length;
    return palabras[idx];
  }, []);

  const categoriaCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of palabras) {
      counts[p.categoria] = (counts[p.categoria] || 0) + 1;
    }
    return counts;
  }, []);

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div className="flex items-center gap-2 text-neblina-soft">
        <Sun className="h-5 w-5" />
        <span>{getGreeting()}</span>
      </div>

      {/* Word of the day */}
      <div className="relative overflow-hidden rounded-2xl bg-tanino-light p-6">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.1em] text-oro/60">
          Palabra del dia
        </p>
        <h2 className="font-display text-4xl tracking-wide text-oro">
          {wordOfDay.pemon.toUpperCase()}
        </h2>
        <p className="mt-2 text-lg text-neblina">{wordOfDay.es}</p>
        {wordOfDay.nota_cultural && (
          <p className="mt-2 text-sm italic text-neblina-soft/70">
            {wordOfDay.nota_cultural}
          </p>
        )}
        <div className="mt-4">
          <StatusBadge estado={wordOfDay.estado} />
        </div>
        <p className="mt-2 text-xs text-neblina-soft/40">Audio pendiente</p>
      </div>

      {/* Progress strip */}
      <div>
        <h3 className="mb-3 font-display text-sm uppercase tracking-wider text-neblina-soft">
          Tu progreso
        </h3>
        <div className="flex gap-2">
          <StatCard value="0" label="palabras vistas" />
          <StatCard value="1" label="dia de racha" />
          <StatCard value="0" label="frases armadas" />
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="mb-3 font-display text-sm uppercase tracking-wider text-neblina-soft">
          Categorias
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {categorias.map((cat) => (
            <Link
              key={cat.id}
              to={`/diccionario?cat=${cat.id}`}
              className="flex items-center justify-between rounded-xl bg-tanino-light p-4 transition-colors hover:bg-tanino-light/80"
            >
              <div>
                <p className="font-bold text-neblina">{cat.nombre}</p>
                <p className="text-xs text-neblina-soft">
                  {categoriaCounts[cat.id] || 0} palabras
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-neblina-soft/40" />
            </Link>
          ))}
        </div>
      </div>

      {/* Recent */}
      <div>
        <h3 className="mb-3 font-display text-sm uppercase tracking-wider text-neblina-soft">
          Recientes
        </h3>
        <div className="rounded-xl bg-tanino-light p-6 text-center">
          <p className="text-sm text-neblina-soft/50">
            Explora el diccionario para ver tus palabras recientes aqui.
          </p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex-1 rounded-xl bg-tanino-light p-4 text-center">
      <p className="font-display text-3xl text-oro">{value}</p>
      <p className="mt-1 text-xs text-neblina-soft">{label}</p>
    </div>
  );
}
