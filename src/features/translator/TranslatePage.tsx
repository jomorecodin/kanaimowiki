import { useState, useMemo, useCallback } from "react";
import { ArrowDownUp, BookOpen, MessageSquare, Sparkles, Loader2 } from "lucide-react";
import { palabras, frases } from "../../data/mockData";
import { normalize } from "../../data/search";
import { translateWithAI } from "../../data/aiTranslate";
import { StatusBadge } from "../../ui/StatusBadge";
import type { Estado } from "../../data/types";

type Direction = "es-pemon" | "pemon-es";

interface TranslateResult {
  type: "palabra" | "frase" | "ai";
  from: string;
  to: string;
  estado: Estado;
  nota?: string;
  confidence?: string;
  score: number;
}

function scoreMatch(text: string, query: string): number {
  const nt = normalize(text);
  const nq = normalize(query);
  if (!nq) return 0;
  if (nt === nq) return 100;
  if (nt.startsWith(nq)) return 80;
  if (nq.startsWith(nt)) return 70;
  if (nt.includes(nq)) return 60;
  if (nq.includes(nt)) return 50;
  const queryWords = nq.split(/\s+/);
  const matchCount = queryWords.filter((w) => nt.includes(w)).length;
  if (matchCount === queryWords.length) return 40;
  if (matchCount > 0) return 20 * (matchCount / queryWords.length);
  return 0;
}

export function TranslatePage() {
  const [direction, setDirection] = useState<Direction>("es-pemon");
  const [input, setInput] = useState("");
  const [aiResult, setAiResult] = useState<TranslateResult | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [lastAiQuery, setLastAiQuery] = useState("");

  const localResults = useMemo((): TranslateResult[] => {
    const q = input.trim();
    if (!q) return [];

    const matches: TranslateResult[] = [];

    for (const p of palabras) {
      const fromField = direction === "es-pemon" ? p.es : p.pemon;
      const toField = direction === "es-pemon" ? p.pemon : p.es;
      const score = scoreMatch(fromField, q);
      if (score > 0) {
        matches.push({ type: "palabra", from: fromField, to: toField, estado: p.estado, nota: p.nota_cultural, score });
      }
    }

    for (const f of frases) {
      const fromField = direction === "es-pemon" ? f.es : f.pemon;
      const toField = direction === "es-pemon" ? f.pemon : f.es;
      const score = scoreMatch(fromField, q);
      if (score > 0) {
        matches.push({ type: "frase", from: fromField, to: toField, estado: f.estado_pemon, score });
      }
    }

    matches.sort((a, b) => b.score - a.score);
    return matches.slice(0, 10);
  }, [input, direction]);

  const handleAiTranslate = useCallback(async () => {
    const q = input.trim();
    if (!q || aiLoading) return;
    setAiLoading(true);
    setAiResult(null);
    setLastAiQuery(q + direction);
    try {
      const result = await translateWithAI(q, direction);
      if (result && result.translation) {
        setAiResult({
          type: "ai",
          from: q,
          to: result.translation,
          estado: "pendiente",
          nota: result.note,
          confidence: result.confidence,
          score: 0,
        });
      }
    } finally {
      setAiLoading(false);
    }
  }, [input, direction, aiLoading]);

  // Clear AI result when input or direction changes
  const currentKey = input.trim() + direction;
  if (lastAiQuery && lastAiQuery !== currentKey && aiResult) {
    setAiResult(null);
    setLastAiQuery("");
  }

  const hasLocalResults = localResults.length > 0;
  const showAiSection = input.trim().length > 0;

  const quickWords = ["hola", "agua", "gracias", "como estas", "madre", "casa", "tengo hambre", "jaguar"];

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
        rows={2}
        className="w-full resize-none rounded-xl bg-tanino-light p-4 text-neblina placeholder:text-neblina-soft/40 outline-none focus:ring-2 focus:ring-oro/50"
      />

      {/* Local results from dictionary */}
      {hasLocalResults && (
        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-neblina-soft/40">
            Del diccionario
          </p>
          {localResults.map((r, i) => (
            <ResultCard key={i} result={r} />
          ))}
        </div>
      )}

      {/* AI translation section */}
      {showAiSection && (
        <div className="space-y-3">
          {!hasLocalResults && !aiResult && !aiLoading && (
            <div className="rounded-2xl bg-tanino-light p-5 text-center">
              <p className="text-sm text-neblina-soft">
                No se encontró en el diccionario.
              </p>
            </div>
          )}

          {aiResult && (
            <>
              <p className="text-xs font-bold uppercase tracking-wider text-neblina-soft/40">
                Sugerencia de IA
              </p>
              <div className="rounded-2xl border border-oro/20 bg-tanino-light p-4">
                <div className="mb-1 flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-oro/60" />
                  <span className="text-xs text-oro/60">
                    IA — Confianza: {aiResult.confidence}
                  </span>
                </div>
                <p className="font-display text-xl tracking-wide text-neblina">
                  {aiResult.to}
                </p>
                <p className="mt-0.5 text-sm text-roca">{aiResult.from}</p>
                {aiResult.nota && (
                  <p className="mt-2 text-xs italic text-neblina-soft/50">{aiResult.nota}</p>
                )}
                <p className="mt-3 rounded-lg bg-oro/10 px-3 py-2 text-xs text-oro/80">
                  Traduccion sugerida por IA. No ha sido revisada por hablantes nativos.
                </p>
              </div>
            </>
          )}

          {!aiResult && (
            <button
              type="button"
              onClick={handleAiTranslate}
              disabled={aiLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-oro/30 py-3 text-sm font-bold text-oro transition-colors hover:bg-oro/10 disabled:opacity-50"
            >
              {aiLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Traduciendo...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Traducir con IA
                </>
              )}
            </button>
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
                setAiResult(null);
                setLastAiQuery("");
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

function ResultCard({ result }: { result: TranslateResult }) {
  return (
    <div className="rounded-2xl bg-tanino-light p-4">
      <div className="mb-1 flex items-center gap-2">
        {result.type === "palabra" ? (
          <BookOpen className="h-3.5 w-3.5 text-neblina-soft/40" />
        ) : (
          <MessageSquare className="h-3.5 w-3.5 text-neblina-soft/40" />
        )}
        <span className="text-xs text-neblina-soft/40">
          {result.type === "palabra" ? "Palabra" : "Frase"}
        </span>
      </div>
      <p className="font-display text-xl tracking-wide text-neblina">
        {result.to}
      </p>
      <p className="mt-0.5 text-sm text-roca">{result.from}</p>
      {result.nota && (
        <p className="mt-2 text-xs italic text-neblina-soft/50">{result.nota}</p>
      )}
      <div className="mt-2 flex items-center gap-2">
        <StatusBadge estado={result.estado} />
        <span className="text-xs text-neblina-soft/30">Audio pendiente</span>
      </div>
    </div>
  );
}
