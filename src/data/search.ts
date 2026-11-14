/**
 * Accent/diacritic-insensitive search.
 * "pemon" matches "pemón", "u" matches "ü", ignores saltillo (').
 */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // strip accents
    .replace(/['']/g, "")            // strip saltillo
    .replace(/ö/g, "o")
    .replace(/ü/g, "u")
    .replace(/ë/g, "e")
    .trim();
}

export function matchesQuery(text: string, query: string): boolean {
  if (!query) return true;
  return normalize(text).includes(normalize(query));
}
