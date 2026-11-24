import { palabras, frases } from "./mockData";

const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

/**
 * Build a few-shot context from our existing corpus so Gemini
 * has real Pemón Kamarakoto examples to work from.
 */
function buildCorpusContext(): string {
  const wordExamples = palabras
    .slice(0, 40)
    .map((p) => `  ${p.es} = ${p.pemon}`)
    .join("\n");

  const phraseExamples = frases
    .map((f) => `  ${f.es} = ${f.pemon}`)
    .join("\n");

  return `Known Pemón Kamarakoto vocabulary:\n${wordExamples}\n\nKnown phrases:\n${phraseExamples}`;
}

interface AiTranslation {
  translation: string;
  confidence: "alta" | "media" | "baja";
  note?: string;
}

export async function translateWithAI(
  text: string,
  direction: "es-pemon" | "pemon-es"
): Promise<AiTranslation | null> {
  if (!GEMINI_KEY) return null;

  const corpus = buildCorpusContext();
  const fromLang = direction === "es-pemon" ? "Spanish" : "Pemón Kamarakoto";
  const toLang = direction === "es-pemon" ? "Pemón Kamarakoto" : "Spanish";

  const prompt = `You are a translator for the Pemón language (Kamarakoto dialect), spoken in Canaima and Gran Sabana, Venezuela.

${corpus}

Translate the following from ${fromLang} to ${toLang}:
"${text}"

Respond ONLY in this exact JSON format, nothing else:
{"translation": "the translation here", "confidence": "alta|media|baja", "note": "optional brief note about dialect or uncertainty"}

Rules:
- Use the vocabulary above as reference for Kamarakoto dialect.
- confidence "alta" only if the words are directly in the corpus above.
- confidence "media" if you can infer from the corpus patterns.
- confidence "baja" if you are guessing based on general Pemón knowledge.
- If you truly cannot translate, return: {"translation": "", "confidence": "baja", "note": "No se encontró traducción"}
- Keep the note in Spanish, short (max 15 words).`;

  try {
    const res = await fetch(`${GEMINI_URL}?key=${GEMINI_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 200,
        },
      }),
    });

    if (!res.ok) return null;

    const data = await res.json();
    const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Extract JSON from response (Gemini sometimes wraps in markdown)
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;

    const parsed = JSON.parse(jsonMatch[0]) as AiTranslation;
    if (!parsed.translation) return null;

    return parsed;
  } catch {
    return null;
  }
}
