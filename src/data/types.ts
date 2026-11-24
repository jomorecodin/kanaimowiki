// Data field names in Spanish per convention (reviewed by non-technical people)

export type Estado = "pendiente" | "propuesta" | "confirmada";
export type Fuente = "libro" | "comunidad" | "ai_sugerida";

export interface Palabra {
  id: string;
  es: string;
  pemon: string;
  variante?: string;
  categoria: string;
  nota_cultural?: string;
  fuente: Fuente;
  pagina_libro?: string;
  audio_archivo?: string;
  estado: Estado;
  revisado_por?: string;
  fecha_revision?: string;
}

export interface Frase {
  id: string;
  es: string;
  pemon: string;
  situacion?: string;
  estado_pemon: Estado;
}

export interface Categoria {
  id: string;
  nombre: string;
  icono: string; // SVG line icon identifier
}

export interface ParteFrase {
  id: string;
  rol: "accion" | "lugar" | "objeto" | "sujeto";
  pemon: string;
  es: string;
  palabra_id?: string;
}

export interface Historia {
  id: string;
  titulo: string;
  resumen: string;
  contenido: string;
  fuente?: string;
  icono: string;
}
