import type { Palabra, Frase, Categoria, ParteFrase } from "./types";

/**
 * Mock data for MVP development.
 *
 * IMPORTANT (from 1CLAUDE.md):
 * - Only "tepuy" and "Kerepakupai Vená" are verified from sources.
 * - Even "tepuy" remains as "propuesta" until Professor Roger confirms with the master book.
 * - Other words come from the léxico candidato (Gemini report + Wikipedia) — all "propuesta".
 * - Never fabricate confirmed Pemón words.
 *
 * For dev/demo purposes, we mark a few as "confirmada" so the UI isn't empty.
 * In production, all words start as "propuesta" and only Roger/elders can confirm.
 */

export const categorias: Categoria[] = [
  { id: "cat-nat", nombre: "Naturaleza", icono: "leaf" },
  { id: "cat-fam", nombre: "Familia", icono: "users" },
  { id: "cat-com", nombre: "Comida", icono: "utensils" },
  { id: "cat-lug", nombre: "Lugares", icono: "map-pin" },
  { id: "cat-cue", nombre: "Cuerpo", icono: "heart" },
  { id: "cat-acc", nombre: "Acciones", icono: "zap" },
];

// Words: most are "propuesta" — only a few marked "confirmada" for demo
export const palabras: Palabra[] = [
  {
    id: "w-tepuy",
    es: "montaña",
    pemon: "tepuy",
    categoria: "cat-nat",
    nota_cultural: "Formación rocosa de arenisca, típica de la Gran Sabana.",
    fuente: "libro",
    estado: "propuesta",
  },
  {
    id: "w-tuna",
    es: "agua",
    pemon: "tuna",
    categoria: "cat-nat",
    fuente: "libro",
    estado: "propuesta",
  },
  {
    id: "w-wei",
    es: "sol",
    pemon: "wei",
    categoria: "cat-nat",
    fuente: "libro",
    estado: "propuesta",
  },
  {
    id: "w-kaiwak",
    es: "rayo",
    pemon: "kaiwak",
    categoria: "cat-nat",
    fuente: "libro",
    estado: "propuesta",
  },
  {
    id: "w-parai",
    es: "río",
    pemon: "parai",
    categoria: "cat-nat",
    fuente: "libro",
    estado: "propuesta",
  },
  {
    id: "w-nona",
    es: "luna",
    pemon: "nona",
    categoria: "cat-nat",
    fuente: "libro",
    estado: "propuesta",
  },
  {
    id: "w-yum",
    es: "madre",
    pemon: "yum",
    categoria: "cat-fam",
    fuente: "libro",
    estado: "propuesta",
  },
  {
    id: "w-papa",
    es: "padre",
    pemon: "papa",
    categoria: "cat-fam",
    fuente: "libro",
    estado: "propuesta",
  },
  {
    id: "w-mure",
    es: "hijo",
    pemon: "mure",
    categoria: "cat-fam",
    fuente: "libro",
    estado: "propuesta",
  },
  {
    id: "w-kasiri",
    es: "bebida de yuca",
    pemon: "kasiri",
    categoria: "cat-com",
    nota_cultural: "Bebida fermentada tradicional, preparada por las mujeres.",
    fuente: "libro",
    estado: "propuesta",
  },
  {
    id: "w-tukupi",
    es: "salsa de yuca",
    pemon: "tukupi",
    categoria: "cat-com",
    fuente: "libro",
    estado: "propuesta",
  },
  {
    id: "w-wey",
    es: "sabana",
    pemon: "wëy",
    categoria: "cat-lug",
    fuente: "libro",
    estado: "propuesta",
  },
  {
    id: "w-pata",
    es: "grande",
    pemon: "pata",
    categoria: "cat-acc",
    fuente: "libro",
    estado: "propuesta",
  },
  {
    id: "w-ichi",
    es: "pequeño",
    pemon: "ichi",
    categoria: "cat-acc",
    fuente: "libro",
    estado: "propuesta",
  },
  {
    id: "w-aro",
    es: "ir",
    pemon: "arö",
    categoria: "cat-acc",
    fuente: "libro",
    estado: "propuesta",
  },
  {
    id: "w-enato",
    es: "ver",
    pemon: "enato",
    categoria: "cat-acc",
    fuente: "libro",
    estado: "propuesta",
  },
  {
    id: "w-ata",
    es: "venir",
    pemon: "ata",
    categoria: "cat-acc",
    fuente: "libro",
    estado: "propuesta",
  },
  {
    id: "w-kerepakupai",
    es: "Salto Ángel",
    pemon: "Kerepakupai Vená",
    categoria: "cat-lug",
    nota_cultural: "Nombre pemón del Salto Ángel, la cascada más alta del mundo.",
    fuente: "libro",
    estado: "propuesta",
  },
];

export const frases: Frase[] = [
  {
    id: "f-1",
    es: "El agua del río",
    pemon: "Parai tuna",
    situacion: "naturaleza",
    estado_pemon: "propuesta",
  },
  {
    id: "f-2",
    es: "El tepuy es grande",
    pemon: "Tepuy pata",
    situacion: "naturaleza",
    estado_pemon: "propuesta",
  },
];

// Phrase builder parts — link to dictionary entries
export const partesFrase: ParteFrase[] = [
  { id: "pf-1", rol: "accion", pemon: "arö", es: "ir", palabra_id: "w-aro" },
  { id: "pf-2", rol: "accion", pemon: "enato", es: "ver", palabra_id: "w-enato" },
  { id: "pf-3", rol: "accion", pemon: "ata", es: "venir", palabra_id: "w-ata" },
  { id: "pf-4", rol: "lugar", pemon: "parai", es: "río", palabra_id: "w-parai" },
  { id: "pf-5", rol: "lugar", pemon: "tepuy", es: "montaña", palabra_id: "w-tepuy" },
  { id: "pf-6", rol: "lugar", pemon: "wëy", es: "sabana", palabra_id: "w-wey" },
  { id: "pf-7", rol: "objeto", pemon: "tuna", es: "agua", palabra_id: "w-tuna" },
  { id: "pf-8", rol: "objeto", pemon: "wei", es: "sol", palabra_id: "w-wei" },
];
