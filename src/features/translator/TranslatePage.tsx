import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { ArrowDownUp, BookOpen, MessageSquare, Sparkles, Loader2, Search } from "lucide-react";
import { palabras, frases } from "../../data/mockData";
import { normalize } from "../../data/search";
import { translateWithAI } from "../../data/aiTranslate";
import { StatusBadge } from "../../ui/StatusBadge";
import type { Estado } from "../../data/types";

type Direction = "es-pemon" | "pemon-es";

interface TranslateResult {
  type: "palabra" | "frase" | "ai" | "desglose";
  from: string;
  to: string;
  estado: Estado;
  nota?: string;
  confidence?: string;
  score: number;
}

interface WordBreakdown {
  original: string;
  translation: string | null;
  found: boolean;
}

// --- Scoring ---

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

// --- Spanish stop words to skip in decomposition ---

const STOP_WORDS = new Set([
  "a", "al", "el", "la", "los", "las", "un", "una", "unos", "unas",
  "de", "del", "en", "con", "por", "para", "y", "o", "que", "se",
  "me", "te", "nos", "les", "lo", "mi", "tu", "su",
]);

// --- Word-by-word decomposition ---

function decomposeAndTranslate(query: string, direction: Direction): WordBreakdown[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length <= 1) return [];

  return words.map((word) => {
    if (STOP_WORDS.has(word)) {
      return { original: word, translation: null, found: false };
    }

    // Search in palabras
    let bestMatch: { translation: string; score: number } | null = null;

    for (const p of palabras) {
      const fromField = direction === "es-pemon" ? p.es : p.pemon;
      const toField = direction === "es-pemon" ? p.pemon : p.es;
      const score = scoreMatch(fromField, word);
      if (score >= 70 && (!bestMatch || score > bestMatch.score)) {
        bestMatch = { translation: toField, score };
      }
    }

    return {
      original: word,
      translation: bestMatch?.translation ?? null,
      found: !!bestMatch,
    };
  });
}

// --- Main component ---

export function TranslatePage() {
  const [direction, setDirection] = useState<Direction>("es-pemon");
  const [input, setInput] = useState("");
  const [aiResult, setAiResult] = useState<TranslateResult | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const aiAbortRef = useRef(0);

  // Local dictionary matches
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
    return matches.slice(0, 8);
  }, [input, direction]);

  // Word-by-word breakdown (for multi-word queries)
  const breakdown = useMemo((): WordBreakdown[] => {
    const q = input.trim();
    if (!q || q.split(/\s+/).length <= 1) return [];
    return decomposeAndTranslate(q, direction);
  }, [input, direction]);

  const hasFoundWords = breakdown.some((b) => b.found);

  // Auto-trigger AI translation with debounce
  useEffect(() => {
    const q = input.trim();
    if (!q || q.length < 2) {
      setAiResult(null);
      return;
    }

    // Only auto-trigger if local results are weak
    const hasStrongLocal = localResults.length > 0 && localResults[0].score >= 80;
    if (hasStrongLocal) {
      setAiResult(null);
      return;
    }

    const id = ++aiAbortRef.current;
    setAiLoading(true);
    setAiResult(null);

    const timer = setTimeout(async () => {
      try {
        const result = await translateWithAI(q, direction);
        if (id !== aiAbortRef.current) return; // stale
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
      } catch {
        // silent fail
      } finally {
        if (id === aiAbortRef.current) {
          setAiLoading(false);
        }
      }
    }, 800);

    return () => {
      clearTimeout(timer);
      if (id === aiAbortRef.current) {
        setAiLoading(false);
      }
    };
  }, [input, direction, localResults]);

  const handleManualAi = useCallback(async () => {
    const q = input.trim();
    if (!q || aiLoading) return;
    const id = ++aiAbortRef.current;
    setAiLoading(true);
    setAiResult(null);
    try {
      const result = await translateWithAI(q, direction);
      if (id !== aiAbortRef.current) return;
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
      if (id === aiAbortRef.current) setAiLoading(false);
    }
  }, [input, direction, aiLoading]);

  const hasLocalResults = localResults.length > 0;
  const hasInput = input.trim().length > 0;

  const quickWords = ["hola", "agua", "gracias", "como estas", "madre", "casa", "tengo hambre", "jaguar", "vamos al rio", "donde esta"];

  return (
    <div className="space-y-5">
      {/* Direction toggle */}
      <button
        type="button"
        onClick={() => setDirection(direction === "es-pemon" ? "pemon-es" : "es-pemon")}
        className="flex w-full items-center justify-center gap-3 rounded-xl bg-tanino-light py-3 font-bold text-neblina transition-colors hover:bg-tanino-light/80"
      >
        <span className={direction === "es-pemon" ? "text-oro" : "text-neblina-soft"}>
          Español
        </span>
        <ArrowDownUp className="h-4 w-4 text-neblina-soft" />
        <span className={direction === "pemon-es" ? "text-oro" : "text-neblina-soft"}>
          Pemón
        </span>
      </button>

      {/* Input */}
      <div className="relative">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            direction === "es-pemon"
              ? "Escribe en español..."
              : "Escribe en pemón..."
          }
          maxLength={200}
          rows={2}
          className="w-full resize-none rounded-xl bg-tanino-light p-4 pr-12 text-neblina placeholder:text-neblina-soft/40 outline-none focus:ring-2 focus:ring-oro/50"
        />
        {aiLoading && (
          <div className="absolute right-4 top-4">
            <Loader2 className="h-5 w-5 animate-spin text-oro/60" />
          </div>
        )}
        {!aiLoading && hasInput && (
          <div className="absolute right-4 top-4">
            <Search className="h-5 w-5 text-neblina-soft/30" />
          </div>
        )}
      </div>

      {/* Word-by-word breakdown */}
      {breakdown.length > 0 && hasFoundWords && (
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-neblina-soft/40">
            Palabra por palabra
          </p>
          <div className="flex flex-wrap gap-2">
            {breakdown.map((b, i) => (
              <div
                key={i}
                className={`rounded-lg px-3 py-2 text-center ${
                  b.found
                    ? "bg-sabana/10 border border-sabana/20"
                    : "bg-tanino-light/50"
                }`}
              >
                <p className="text-xs text-neblina-soft/60">{b.original}</p>
                {b.found && b.translation ? (
                  <p className="font-display text-sm tracking-wide text-neblina">
                    {b.translation}
                  </p>
                ) : (
                  <p className="text-xs italic text-neblina-soft/30">
                    {STOP_WORDS.has(b.original) ? "—" : "?"}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

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
      {hasInput && (
        <div className="space-y-3">
          {aiLoading && !aiResult && (
            <div className="flex items-center justify-center gap-2 rounded-2xl border border-oro/20 bg-tanino-light p-5">
              <Loader2 className="h-4 w-4 animate-spin text-oro/60" />
              <span className="text-sm text-oro/60">Consultando IA...</span>
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
                  Traducción sugerida por IA. No ha sido revisada por hablantes nativos.
                </p>
              </div>
            </>
          )}

          {/* Manual retry button — only show if AI didn't auto-trigger or failed */}
          {!aiResult && !aiLoading && (
            <button
              type="button"
              onClick={handleManualAi}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-oro/30 py-3 text-sm font-bold text-oro transition-colors hover:bg-oro/10"
            >
              <Sparkles className="h-4 w-4" />
              Traducir con IA
            </button>
          )}

          {!hasLocalResults && !aiResult && !aiLoading && (
            <div className="rounded-2xl bg-tanino-light p-5 text-center">
              <p className="text-sm text-neblina-soft">
                No se encontró en el diccionario local.
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
                setAiResult(null);
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
      </div>
    </div>
  );
}
