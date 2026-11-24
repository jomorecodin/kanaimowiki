import type { Palabra, Frase, Categoria, ParteFrase, Historia } from "./types";

/**
 * Vocabulary gathered from published online sources.
 * ALL entries are "propuesta" — nothing is confirmed without Professor Roger.
 *
 * Sources:
 * - gransabanayroraima.blogspot.com (Vocablos en Pemón)
 * - cdibolivar.es.tl (Centro de Idiomas Pemón)
 * - ambienteuniversalpy.wordpress.com (Diccionario Pemón)
 * - steemit.com/@anadiez177 (Diccionario Pemón)
 * - Diccionario Piloto Pemón-Español (Uzcátegui, 1982)
 *
 * Contradictions exist between sources (dialects: Kamarakoto, Taurepán, Arekuna).
 * When variants are found, the "variante" field notes the dialect.
 * None of this data is treated as truth — it awaits human review.
 */

export const categorias: Categoria[] = [
  { id: "cat-nat", nombre: "Naturaleza", icono: "leaf" },
  { id: "cat-fam", nombre: "Familia", icono: "users" },
  { id: "cat-com", nombre: "Comida", icono: "utensils" },
  { id: "cat-lug", nombre: "Lugares", icono: "map-pin" },
  { id: "cat-cue", nombre: "Cuerpo", icono: "heart" },
  { id: "cat-acc", nombre: "Acciones", icono: "zap" },
  { id: "cat-ani", nombre: "Animales", icono: "bug" },
  { id: "cat-sal", nombre: "Saludos", icono: "hand-metal" },
  { id: "cat-num", nombre: "Numeros", icono: "hash" },
  { id: "cat-obj", nombre: "Objetos", icono: "box" },
  { id: "cat-adj", nombre: "Adjetivos", icono: "sparkles" },
];

export const palabras: Palabra[] = [
  // ── Naturaleza ──
  { id: "w-tepuy", es: "montaña, cerro", pemon: "tepuy", categoria: "cat-nat", nota_cultural: "Formación rocosa de arenisca, típica de la Gran Sabana. También tüpü en taurepán.", fuente: "libro", estado: "propuesta" },
  { id: "w-tuna", es: "agua", pemon: "tuna", categoria: "cat-nat", fuente: "libro", estado: "propuesta" },
  { id: "w-wei", es: "sol", pemon: "wei", categoria: "cat-nat", nota_cultural: "En la mitología, Wei era un indígena de rostro brillante antes de convertirse en sol.", fuente: "libro", estado: "propuesta" },
  { id: "w-weyu", es: "luz", pemon: "weyú", categoria: "cat-nat", fuente: "comunidad", estado: "propuesta" },
  { id: "w-kapuy", es: "luna", pemon: "kapüy", categoria: "cat-nat", fuente: "comunidad", estado: "propuesta" },
  { id: "w-chirikoton", es: "estrellas", pemon: "chïrikoton", categoria: "cat-nat", fuente: "comunidad", estado: "propuesta" },
  { id: "w-kaiwak", es: "rayo", pemon: "kaiwak", categoria: "cat-nat", fuente: "libro", estado: "propuesta" },
  { id: "w-parai", es: "río", pemon: "parai", categoria: "cat-nat", fuente: "libro", estado: "propuesta" },
  { id: "w-meru", es: "salto de agua, cascada", pemon: "merú", categoria: "cat-nat", fuente: "comunidad", estado: "propuesta" },
  { id: "w-apo", es: "fuego", pemon: "apö", categoria: "cat-nat", fuente: "comunidad", estado: "propuesta" },
  { id: "w-warpo", es: "oscuridad, tinieblas", pemon: "warpö", categoria: "cat-nat", fuente: "comunidad", estado: "propuesta" },
  { id: "w-yoy", es: "árbol", pemon: "yöy", categoria: "cat-nat", fuente: "comunidad", estado: "propuesta" },
  { id: "w-dariku", es: "flor", pemon: "darïku", categoria: "cat-nat", fuente: "comunidad", estado: "propuesta" },

  // ── Familia ──
  { id: "w-amay", es: "mamá, madre", pemon: "amäy", categoria: "cat-fam", fuente: "comunidad", estado: "propuesta" },
  { id: "w-papay", es: "papá, padre", pemon: "papay", categoria: "cat-fam", fuente: "comunidad", estado: "propuesta" },
  { id: "w-upy", es: "mi hermano", pemon: "upy", categoria: "cat-fam", fuente: "comunidad", estado: "propuesta" },
  { id: "w-achy", es: "hermana mayor", pemon: "a'chy", categoria: "cat-fam", fuente: "comunidad", estado: "propuesta" },
  { id: "w-awo", es: "tío, suegro", pemon: "a'wo", categoria: "cat-fam", fuente: "comunidad", estado: "propuesta" },
  { id: "w-inton", es: "tío", pemon: "intön", categoria: "cat-fam", fuente: "comunidad", estado: "propuesta" },
  { id: "w-wanu", es: "tía, suegra", pemon: "wa'nü", categoria: "cat-fam", fuente: "comunidad", estado: "propuesta" },
  { id: "w-yeruk", es: "cuñada", pemon: "ye'ruk", categoria: "cat-fam", fuente: "comunidad", estado: "propuesta" },
  { id: "w-yeset", es: "cuñado", pemon: "ye'set", categoria: "cat-fam", fuente: "comunidad", estado: "propuesta" },
  { id: "w-rume", es: "hijo, hija", pemon: "rume", categoria: "cat-fam", fuente: "comunidad", estado: "propuesta" },
  { id: "w-kowai", es: "abuela", pemon: "ko'wai", categoria: "cat-fam", fuente: "comunidad", estado: "propuesta" },
  { id: "w-apa", es: "abuelo", pemon: "apa", categoria: "cat-fam", fuente: "comunidad", estado: "propuesta" },
  { id: "w-yombaton", es: "familia", pemon: "yombaton", categoria: "cat-fam", fuente: "comunidad", estado: "propuesta" },
  { id: "w-wurui", es: "mujer", pemon: "würüi", categoria: "cat-fam", fuente: "comunidad", estado: "propuesta" },
  { id: "w-pemon", es: "persona, gente", pemon: "pemón", categoria: "cat-fam", nota_cultural: "Nombre del pueblo y del idioma. Significa 'gente'.", fuente: "libro", estado: "propuesta" },

  // ── Comida ──
  { id: "w-kasiri", es: "bebida de yuca fermentada", pemon: "kachiri", categoria: "cat-com", nota_cultural: "Bebida alcohólica tradicional, preparada por las mujeres.", fuente: "comunidad", estado: "propuesta" },
  { id: "w-tuma", es: "comida", pemon: "tuma", categoria: "cat-com", fuente: "comunidad", estado: "propuesta" },
  { id: "w-yuma", es: "comida", pemon: "yuma", variante: "Variante de tuma", categoria: "cat-com", fuente: "comunidad", estado: "propuesta" },
  { id: "w-pumui", es: "ají picante", pemon: "pumui", categoria: "cat-com", fuente: "comunidad", estado: "propuesta" },
  { id: "w-entanantok", es: "comida (plato servido)", pemon: "entanantök", categoria: "cat-com", fuente: "comunidad", estado: "propuesta" },

  // ── Lugares ──
  { id: "w-tapuy", es: "casa, churuata", pemon: "tapüy", categoria: "cat-lug", fuente: "comunidad", estado: "propuesta" },
  { id: "w-wey", es: "sabana", pemon: "wëy", categoria: "cat-lug", fuente: "libro", estado: "propuesta" },
  { id: "w-kerepakupai", es: "Salto Ángel", pemon: "Kerepakupai Vená", categoria: "cat-lug", nota_cultural: "Nombre pemón del Salto Ángel, la cascada más alta del mundo.", fuente: "libro", estado: "propuesta" },
  { id: "w-ituiyita", es: "Gran Sabana", pemon: "itüyita", categoria: "cat-lug", fuente: "comunidad", estado: "propuesta" },
  { id: "w-wotüpu", es: "casa de espíritus", pemon: "wö tüpü", categoria: "cat-lug", nota_cultural: "Lugar sagrado en la cosmología pemón.", fuente: "comunidad", estado: "propuesta" },
  { id: "w-yen", es: "lugar de hábitat", pemon: "yen", categoria: "cat-lug", fuente: "comunidad", estado: "propuesta" },
  { id: "w-taro", es: "aquí", pemon: "tarö", categoria: "cat-lug", fuente: "comunidad", estado: "propuesta" },

  // ── Cuerpo ──
  { id: "w-pupay", es: "cabeza", pemon: "pupay", categoria: "cat-cue", fuente: "comunidad", estado: "propuesta" },
  { id: "w-dempata", es: "cara", pemon: "dempatá", categoria: "cat-cue", fuente: "comunidad", estado: "propuesta" },
  { id: "w-denuton", es: "ojos", pemon: "denuton", categoria: "cat-cue", fuente: "comunidad", estado: "propuesta" },
  { id: "w-deuna", es: "nariz", pemon: "deuna", categoria: "cat-cue", fuente: "comunidad", estado: "propuesta" },
  { id: "w-muta", es: "boca", pemon: "müta", categoria: "cat-cue", fuente: "comunidad", estado: "propuesta" },
  { id: "w-pana", es: "oreja", pemon: "pana", categoria: "cat-cue", fuente: "comunidad", estado: "propuesta" },
  { id: "w-dennato", es: "manos", pemon: "dennätö", categoria: "cat-cue", fuente: "comunidad", estado: "propuesta" },
  { id: "w-denna", es: "dedo", pemon: "denna", categoria: "cat-cue", fuente: "comunidad", estado: "propuesta" },
  { id: "w-dewan", es: "barriga", pemon: "dewan", categoria: "cat-cue", fuente: "comunidad", estado: "propuesta" },
  { id: "w-pata-pie", es: "pie", pemon: "pata", variante: "Homónimo de pata (grande)", categoria: "cat-cue", fuente: "comunidad", estado: "propuesta" },

  // ── Animales ──
  { id: "w-ene", es: "animal", pemon: "enë", categoria: "cat-ani", fuente: "comunidad", estado: "propuesta" },
  { id: "w-toron", es: "pájaro", pemon: "törön", categoria: "cat-ani", fuente: "comunidad", estado: "propuesta" },
  { id: "w-kaikuse", es: "jaguar", pemon: "kaikuse", categoria: "cat-ani", fuente: "comunidad", estado: "propuesta" },
  { id: "w-kusari", es: "venado", pemon: "kusari", categoria: "cat-ani", fuente: "comunidad", estado: "propuesta" },
  { id: "w-maikuri", es: "tapir, danta", pemon: "maikuri", categoria: "cat-ani", fuente: "comunidad", estado: "propuesta" },
  { id: "w-arimaraka", es: "perro", pemon: "arimaraka", categoria: "cat-ani", fuente: "comunidad", estado: "propuesta" },
  { id: "w-okoi", es: "serpiente, culebra", pemon: "ököi", categoria: "cat-ani", fuente: "comunidad", estado: "propuesta" },
  { id: "w-porotukuk", es: "sapo", pemon: "pörötukuk", categoria: "cat-ani", fuente: "comunidad", estado: "propuesta" },
  { id: "w-achimiko", es: "hormiga", pemon: "achimikö", categoria: "cat-ani", fuente: "comunidad", estado: "propuesta" },
  { id: "w-iwarka", es: "mono capuchino", pemon: "iwarka", categoria: "cat-ani", fuente: "comunidad", estado: "propuesta" },
  { id: "w-wadara", es: "guacamaya", pemon: "wadara", categoria: "cat-ani", fuente: "comunidad", estado: "propuesta" },
  { id: "w-kumarakapay", es: "pájaro tijereta", pemon: "kumarakapay", categoria: "cat-ani", fuente: "comunidad", estado: "propuesta" },
  { id: "w-kauchik", es: "golondrina", pemon: "kauchik", categoria: "cat-ani", fuente: "comunidad", estado: "propuesta" },

  // ── Acciones y verbos ──
  { id: "w-aro", es: "ir, llevar", pemon: "arö", categoria: "cat-acc", fuente: "libro", estado: "propuesta" },
  { id: "w-enato", es: "ver", pemon: "enato", categoria: "cat-acc", fuente: "libro", estado: "propuesta" },
  { id: "w-ata", es: "venir", pemon: "ata", categoria: "cat-acc", fuente: "libro", estado: "propuesta" },
  { id: "w-eporü", es: "encontrar", pemon: "eporü", categoria: "cat-acc", fuente: "comunidad", estado: "propuesta" },
  { id: "w-itoputu", es: "ir (caminar)", pemon: "itöpütü", categoria: "cat-acc", fuente: "comunidad", estado: "propuesta" },
  { id: "w-senupato", es: "estudiar", pemon: "senupato", categoria: "cat-acc", fuente: "comunidad", estado: "propuesta" },

  // ── Adjetivos ──
  { id: "w-waku", es: "bueno, buena", pemon: "wa'kü", categoria: "cat-adj", fuente: "comunidad", estado: "propuesta" },
  { id: "w-nary", es: "malo, mala", pemon: "nary", categoria: "cat-adj", fuente: "comunidad", estado: "propuesta" },
  { id: "w-amanon", es: "bonita, linda", pemon: "amanon", categoria: "cat-adj", fuente: "comunidad", estado: "propuesta" },
  { id: "w-amoine", es: "bonito, lindo", pemon: "amöine", categoria: "cat-adj", fuente: "comunidad", estado: "propuesta" },
  { id: "w-kaipunpe", es: "grande", pemon: "kaipun-pe", variante: "Kamarakoto. En taurepán: tanno-pe", categoria: "cat-adj", fuente: "comunidad", estado: "propuesta" },
  { id: "w-awaro", es: "feo, malo", pemon: "awarö", categoria: "cat-adj", fuente: "comunidad", estado: "propuesta" },
  { id: "w-sokoropano", es: "bravo, brava", pemon: "sokoropano", categoria: "cat-adj", fuente: "comunidad", estado: "propuesta" },
  { id: "w-ennakine", es: "flojo, floja", pemon: "ennakine", categoria: "cat-adj", fuente: "comunidad", estado: "propuesta" },
  { id: "w-tesennakamasen", es: "trabajador", pemon: "tesennakamasen", categoria: "cat-adj", fuente: "comunidad", estado: "propuesta" },

  // ── Saludos y expresiones ──
  { id: "w-wakuwey", es: "hermoso día", pemon: "waku wey", categoria: "cat-sal", fuente: "comunidad", estado: "propuesta" },
  { id: "w-upetoy", es: "amigo, amiga", pemon: "upetöy", categoria: "cat-sal", fuente: "comunidad", estado: "propuesta" },
  { id: "w-ailo", es: "chao, adiós", pemon: "ailo", categoria: "cat-sal", fuente: "comunidad", estado: "propuesta" },
  { id: "w-inna", es: "sí", pemon: "inna", categoria: "cat-sal", fuente: "comunidad", estado: "propuesta" },
  { id: "w-ake", es: "no", pemon: "ake", categoria: "cat-sal", fuente: "comunidad", estado: "propuesta" },
  { id: "w-wakuperoman", es: "¿cómo está usted?", pemon: "waküperö medan", categoria: "cat-sal", fuente: "comunidad", estado: "propuesta" },
  { id: "w-wakupeman", es: "gracias", pemon: "wakupeman", categoria: "cat-sal", fuente: "comunidad", estado: "propuesta" },
  { id: "w-sorowaro", es: "ahora", pemon: "söröwarö", variante: "Taurepán. En kamarakoto: chiröwarö", categoria: "cat-sal", fuente: "comunidad", estado: "propuesta" },
  { id: "w-arepanpok", es: "rápido", pemon: "arepanpök", categoria: "cat-sal", fuente: "comunidad", estado: "propuesta" },

  // ── Numeros ──
  { id: "w-teukin", es: "uno (1)", pemon: "teukin", categoria: "cat-num", fuente: "comunidad", estado: "propuesta" },
  { id: "w-sakune", es: "dos (2)", pemon: "saküne", categoria: "cat-num", fuente: "comunidad", estado: "propuesta" },
  { id: "w-miatoikin", es: "cinco (5)", pemon: "mia toikin", categoria: "cat-num", fuente: "comunidad", estado: "propuesta" },
  { id: "w-yennato", es: "diez (10)", pemon: "yenna-to", categoria: "cat-num", fuente: "comunidad", estado: "propuesta" },

  // ── Objetos ──
  { id: "w-kami", es: "chinchorro, hamaca", pemon: "kamï", categoria: "cat-obj", fuente: "comunidad", estado: "propuesta" },
  { id: "w-aponnok", es: "silla", pemon: "apönnök", categoria: "cat-obj", fuente: "comunidad", estado: "propuesta" },
  { id: "w-ponto", es: "ropa", pemon: "ponto", categoria: "cat-obj", fuente: "comunidad", estado: "propuesta" },
  { id: "w-imenu", es: "pintura, color", pemon: "imenü", categoria: "cat-obj", fuente: "comunidad", estado: "propuesta" },
  { id: "w-wayare", es: "morral, bolso", pemon: "wayare", categoria: "cat-obj", fuente: "comunidad", estado: "propuesta" },
  { id: "w-pusau", es: "vaso", pemon: "püsau", categoria: "cat-obj", fuente: "comunidad", estado: "propuesta" },
  { id: "w-kurai", es: "cerbatana", pemon: "kurai", categoria: "cat-obj", fuente: "comunidad", estado: "propuesta" },
  { id: "w-purou", es: "flecha", pemon: "püröu", categoria: "cat-obj", fuente: "comunidad", estado: "propuesta" },
];

export const frases: Frase[] = [
  { id: "f-1", es: "¿Cuál es tu nombre?", pemon: "Anük adesek?", situacion: "saludos", estado_pemon: "propuesta" },
  { id: "f-2", es: "Mi nombre es...", pemon: "Yesek mörö...", situacion: "saludos", estado_pemon: "propuesta" },
  { id: "f-3", es: "¿Cómo estás?", pemon: "Öktukay medan?", situacion: "saludos", estado_pemon: "propuesta" },
  { id: "f-4", es: "Hermoso día", pemon: "Waku wey", situacion: "saludos", estado_pemon: "propuesta" },
  { id: "f-5", es: "Tengo hambre", pemon: "Iwanpe edai", situacion: "comida", estado_pemon: "propuesta" },
  { id: "f-6", es: "Tengo sed", pemon: "Tuna nipay edai", situacion: "comida", estado_pemon: "propuesta" },
  { id: "f-7", es: "Quiero comer", pemon: "Enta' napai e'daik", situacion: "comida", estado_pemon: "propuesta" },
  { id: "f-8", es: "Sabrosa comida", pemon: "Ipöpe kiarimam", situacion: "comida", estado_pemon: "propuesta" },
  { id: "f-9", es: "Tengo miedo", pemon: "Nanike' edai", situacion: "sentimientos", estado_pemon: "propuesta" },
  { id: "f-10", es: "Te quiero", pemon: "Apötöpök e'day", situacion: "sentimientos", estado_pemon: "propuesta" },
  { id: "f-11", es: "Te amo mucho", pemon: "Anünkada ipanpe", situacion: "sentimientos", estado_pemon: "propuesta" },
  { id: "f-12", es: "Dame un beso", pemon: "Upichukak", situacion: "sentimientos", estado_pemon: "propuesta" },
  { id: "f-13", es: "Quiero estudiar", pemon: "Esenupapai e'dai", situacion: "cotidiano", estado_pemon: "propuesta" },
  { id: "f-14", es: "Hace frío", pemon: "Komikeman pata", situacion: "naturaleza", estado_pemon: "propuesta" },
  { id: "f-15", es: "Hace calor", pemon: "Kuineman pata", situacion: "naturaleza", estado_pemon: "propuesta" },
];

export const partesFrase: ParteFrase[] = [
  { id: "pf-1", rol: "accion", pemon: "arö", es: "ir", palabra_id: "w-aro" },
  { id: "pf-2", rol: "accion", pemon: "enato", es: "ver", palabra_id: "w-enato" },
  { id: "pf-3", rol: "accion", pemon: "ata", es: "venir", palabra_id: "w-ata" },
  { id: "pf-4", rol: "accion", pemon: "eporü", es: "encontrar", palabra_id: "w-eporü" },
  { id: "pf-5", rol: "lugar", pemon: "parai", es: "río", palabra_id: "w-parai" },
  { id: "pf-6", rol: "lugar", pemon: "tepuy", es: "montaña", palabra_id: "w-tepuy" },
  { id: "pf-7", rol: "lugar", pemon: "wëy", es: "sabana", palabra_id: "w-wey" },
  { id: "pf-8", rol: "lugar", pemon: "tapüy", es: "casa", palabra_id: "w-tapuy" },
  { id: "pf-9", rol: "objeto", pemon: "tuna", es: "agua", palabra_id: "w-tuna" },
  { id: "pf-10", rol: "objeto", pemon: "wei", es: "sol", palabra_id: "w-wei" },
  { id: "pf-11", rol: "objeto", pemon: "apö", es: "fuego", palabra_id: "w-apo" },
];

/**
 * Stories from published sources about Pemón mythology and Canaima.
 * Content summarized from: venezuela1811.com, mitologicus.com, pueblosindigenas.es
 */
export const historias: Historia[] = [
  {
    id: "h-makunaima",
    titulo: "Makunaima y el origen del pueblo pemón",
    resumen: "El héroe cultural que nació del sol y del jaspe, y dio origen a los primeros pemones.",
    icono: "sun",
    contenido: `Según la tradición pemón, antes de convertirse en sol, Wei era un indígena de rostro brillante. Tras buscar pareja sin éxito entre las mujeres de su pueblo, encontró a Aromadapuén, una mujer creada de jaspe, la piedra sagrada de la Gran Sabana.

De la unión de Wei y Aromadapuén nacieron los Makunaima, los primeros pemones. Este relato fundacional enseña valores centrales para el pueblo: el trabajo, la resistencia, la complementariedad entre hombre y mujer, y el respeto profundo por la naturaleza.

Makunaima es también el héroe del tepuy Roraima y el talador del árbol Wazacá, el árbol mítico que contenía todos los frutos y alimentos del mundo. Al talarlo, las aguas se desbordaron y se formaron los ríos de la Gran Sabana.`,
    fuente: "Tradición oral pemón / venezuela1811.com",
  },
  {
    id: "h-kanaima",
    titulo: "Kanaima: el espíritu de la selva",
    resumen: "El espíritu vengador que acecha en el bosque y da nombre al parque nacional.",
    icono: "cloud-lightning",
    contenido: `Para los pemones, la muerte nunca es natural. Siempre hay una causa, y esa causa es Kanaima — el espíritu maligno que acecha en el bosque denso, la serpiente venenosa en la maleza, la rama que hiere.

Kanaima es una forma de hechicería oscura en la cosmología pemón. Convertirse en Kanaima requiere una iniciación que implica un acto de transgresión fundamental contra la comunidad.

A Kanaima se opone el piache, el curandero o chamán que protege a la comunidad y contrarresta los daños del hechicero. Esta dualidad entre el bien y el mal, entre el piache y el Kanaima, estructura la vida espiritual del pueblo pemón.

El Parque Nacional Canaima, Patrimonio de la Humanidad, toma su nombre de este mismo vocablo indígena. En las comunidades pemón contemporáneas de la Gran Sabana, la creencia en Kanaima es una realidad viva.`,
    fuente: "mitologicus.com / godsandmonsters.info",
  },
  {
    id: "h-kueka",
    titulo: "Abuela Kueka: amor, castigo y memoria",
    resumen: "La piedra sagrada que viajó a Berlín y regresó 22 años después.",
    icono: "heart",
    contenido: `Una joven makushí y un joven pemón se enamoraron en contra de las normas de sus pueblos. Como castigo, Makunaima los convirtió en una piedra de jaspe: la Kueka, que se convirtió en símbolo de fertilidad, protección y equilibrio espiritual para los pemones.

En 1998, la piedra fue extraída de la Gran Sabana y trasladada a Berlín, Alemania, donde permaneció 22 años como pieza de un jardín escultórico. Para los pemones, su ausencia representó una ruptura profunda en su cosmovisión, pues la Kueka es considerada un ancestro vivo.

La piedra regresó a Venezuela en 2020, aunque fue tallada y pulida durante su estadía en Europa, transformando su forma original. Ahora reposa en Santa Cruz de Mapaurí, junto al Abuelo Kueka, como recordatorio de que el patrimonio cultural no tiene precio.`,
    fuente: "venezuela1811.com / pueblosindigenas.es",
  },
  {
    id: "h-cocuyo",
    titulo: "El cocuyo y la mora",
    resumen: "Por qué los cocuyos son negros y se lanzan al fuego.",
    icono: "flame",
    contenido: `Este mito pemón narra la historia de por qué los cocuyos (luciérnagas) son negros y tienen la costumbre de lanzarse hacia el fuego cuando ven una llama.

Según la tradición, en los tiempos antiguos el cocuyo era de colores brillantes y vivía enamorado de la mora, un fruto del bosque. Pero la mora no correspondía su amor y lo rechazó. El cocuyo, desesperado, se lanzó al fuego para acabar con su tristeza.

El fuego lo quemó y lo volvió negro, pero no lo mató. Desde entonces, los cocuyos llevan una luz dentro de sí — el recuerdo de su amor — y no pueden evitar lanzarse hacia cualquier llama que ven, repitiendo eternamente su acto de amor desesperado.

Este mito enseña que en la cosmovisión pemón, la naturaleza actúa con emociones y moral propias. Los animales, las plantas y los elementos no son simples objetos: tienen historia, sentimientos y razones para ser como son.`,
    fuente: "Tradición oral pemón / venezuela1811.com",
  },
  {
    id: "h-cosmovision",
    titulo: "La cosmovisión pemón: todo tiene espíritu",
    resumen: "Los tepuyes son sagrados, los ríos son caminos y la palabra transforma.",
    icono: "mountain",
    contenido: `Los pemones interpretan el mundo como un tejido vivo donde absolutamente todo posee espíritu. Los tepuyes no son simples montañas: son sagrados, moradas de espíritus y guardianes del equilibrio del mundo. Los ríos no son solo agua: son caminos energéticos que conectan los mundos.

La palabra tiene poder transformador. Los cantos y el tarén — un salmo mágico de protección — son herramientas reales que el piache usa para curar, proteger y mantener la armonía entre el mundo visible y el invisible.

Los pemones tradicionalmente creían que cada persona tiene cinco almas que parecen sombras humanas. La quinta alma es la que habla y deja el cuerpo para viajar cuando la persona sueña. Esta es la única que va al más allá después de la muerte, en ruta hacia la Vía Láctea.

El primer no-nativo que estudió seriamente los mitos pemón fue el etnólogo alemán Theodor Koch-Grünberg, quien visitó Roraima en 1912. Después, Fray Cesáreo de Armellada vivió casi dos décadas entre los pemones y escribió "Tauron Panton: cuentos y leyendas de los indios pemón", la obra más completa sobre su mitología.`,
    fuente: "Koch-Grünberg (1912) / Armellada / venezuela1811.com",
  },
];
