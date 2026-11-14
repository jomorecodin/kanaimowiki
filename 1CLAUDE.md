# Kamarakoto

App web (PWA) para preservar y aprender el idioma pemón, variante kamarakoto, de Canaima y el Auyán-tepui (estado Bolívar, Venezuela). Diccionario con audio, traductor, constructor de frases y aportes de la comunidad con revisión humana.

La fuente principal es el **libro maestro**: un diccionario físico que conserva el profesor Roger, director de la escuela Araiwonu de Canaima. El idioma se está perdiendo entre los jóvenes. La app es primero para la comunidad pemón; los turistas que llegan al aeropuerto de Canaima son el segundo público.

## Reglas que no se rompen

1. **Nunca inventes vocabulario pemón.** Ni en código, ni en datos de prueba, ni en textos de ejemplo, ni en tests. Si necesitas una palabra pemón de ejemplo, usa `tepuy` o un marcador como `[pemón pendiente]`.
2. **Ninguna palabra se muestra como disponible sin revisión humana.** Solo se muestra si `estado = "confirmada"`, `pemon` no está vacío y `revisado_por` no está vacío. No hay excepciones, ni siquiera para datos que parezcan obvios.
3. **Nunca generes ni sintetices audio en pemón.** Si no hay grabación real, la interfaz dice "Audio pendiente".
4. **Nada de IA generativa ni traducción en vivo en la etapa 1.** Todas las traducciones salen de datos guardados y revisados.
5. **El español de la interfaz es básico, directo y conciso.** Oraciones cortas y palabras simples. Para mucha gente de la comunidad, el español es su segundo idioma.
6. **Datos personales mínimos.** El nombre es opcional y solo sirve para dar crédito a un aporte. Nada de analítica de terceros ni rastreadores. Las fotos de caras, de niños o de lugares sagrados no se publican sin permiso.
7. **Cifras, testimonios o estadísticas que no salgan de datos reales no van** en ninguna pantalla ni documento.
8. **Ante una duda cultural o lingüística, no decidas tú.** Déjala anotada en `docs/preguntas-roger.md` y sigue con otra cosa.

## Estado actual

- **Diseño aprobado:** dirección visual "Tepuy", en un lienzo de Claude Design (privado; pide al dueño acceso o capturas): https://claude.ai/artifact/MRL8iV4uoeaLVxfKRxF1Be
- **Prototipo clickeable anterior** (flujo correcto, estilo viejo): https://claude.ai/artifact/YDVZaDnot6M8aMMNLRB6uq
- **Datos verificados:** solo `tepuy` (montaña) y `Kerepakupai Vená` (nombre pemón del Salto Ángel). Aun así, `tepuy` sigue como `propuesta` hasta que el profesor Roger lo confirme con el libro maestro.
- **Léxico candidato:** `data/lexico-candidato.csv`, con 15 filas en estado `propuesta`, sacadas de un informe de Gemini y de Wikipedia. Hay contradicciones entre fuentes. No se muestran como disponibles.
- **Investigación:** `docs/investigacion/`. El informe de Gemini cita mal sus fuentes; úsalo como mapa general, no como verdad.
- **Contexto ampliado:** `docs/brain-domain/` (contexto, modelo de datos, pipeline, reglas).

## Stack (decisión inicial, se puede cambiar)

- Vite + React + TypeScript (modo estricto).
- `vite-plugin-pwa` (Workbox) para funcionar sin conexión. En Canaima la señal es débil o no hay.
- IndexedDB con Dexie para el caché local y la cola de aportes sin enviar.
- Datos fuente en CSV dentro de `data/`. Un script los valida y los convierte a JSON en el build.
- Vitest + Testing Library para tests. Playwright para el flujo completo en tamaño de teléfono.
- Sin backend en la etapa 1. Los aportes quedan en una cola local, con una interfaz `ContributionSync` que por ahora no envía nada (stub).

Convención: el código va en inglés; los nombres de campo de los datos (CSV/JSON) van en español, porque los revisan personas no técnicas.

## Estructura

```
data/                 CSV fuente (diccionario, frases, léxico candidato)
docs/                 brain-domain, investigación, preguntas-roger.md
scripts/              validar y compilar los datos
src/
  app/                rutas y layout
  features/
    onboarding/       bienvenida, recorrido y registro
    dictionary/
    translator/
    phrases/
    contributions/    aportar y mis aportes
  data/               tipos, carga y búsqueda
  ui/                 componentes y tokens del sistema Tepuy
public/fonts/         fuentes locales (sin depender de internet)
```

## Modelo de datos

**`data/diccionario.csv`**
```
id,es,pemon,variante,categoria,nota_cultural,fuente,pagina_libro,audio_archivo,estado,revisado_por,fecha_revision
```
- `estado`: `pendiente` (falta el pemón), `propuesta` (espera revisión) o `confirmada`.
- Ciclo: `pendiente` → `propuesta` → `confirmada`. Si el revisor pide un ajuste, vuelve a `propuesta`.

**`data/frases.csv`** (frases paralelas)
```
id,es,pemon,en,fr,pt,ru,zh,situacion,estado_pemon,estado_otros
```
- `estado_pemon`: `propuesta` o `confirmada`.
- `estado_otros`: `automatica` (salió de un servicio de traducción, desde el español) o `revisada` (la revisó un hablante de ese idioma).

**Aporte** (cola local)
```
id, tipo (palabra | foto | palabra_y_foto), es, pemon?, foto?, audio?, nota?, contribuyente?, estado, nota_revisor?, creado_en
```
- `estado`: `en_revision`, `aceptada`, `aceptada_con_cambios` o `rechazada`.
- Toda respuesta del revisor trae su `nota_revisor`. El aviso al usuario aparece en "Mis aportes", dentro de la app.

El script de validación de `scripts/` debe fallar el build si una fila `confirmada` no tiene `revisado_por` o `fecha_revision`.

## Traducción

- El español es el idioma intermedio: pemón ↔ español sale del diccionario y las frases revisadas; español ↔ inglés, francés, portugués, ruso y chino sale de las columnas de `frases.csv`.
- Cada resultado en otro idioma se muestra con su origen: "traducción automática desde el español". Si `estado_otros = revisada`, se indica.
- Si una palabra no está, la app dice "Esta palabra no está lista todavía" y ofrece proponerla. Nunca rellena con una traducción adivinada.

## Búsqueda y escritura

- La búsqueda no distingue mayúsculas, tildes, diéresis (ü, ö) ni el saltillo ('). "pemon" encuentra "pemón".
- Los campos donde se escribe en pemón traen teclas extra para ü, ö y '.
- El alfabeto oficial no está confirmado. Guarda el texto tal como lo escribe el libro maestro y no lo normalices al guardar, solo al buscar.

## Constructor de frases

- Funciona por casillas (acción, lugar, etc.). Cada opción viene de una entrada `confirmada`.
- Una casilla sin datos confirmados se muestra como "falta". No se oculta ni se rellena.
- Las reglas de gramática (orden de palabras, plurales, ergativo) no se programan hasta que el profesor Roger las confirme. Hasta entonces, solo se muestran frases completas ya revisadas.
- Cuando aparezca "nosotros", la app pregunta si incluye a quien escucha. El pemón distingue las dos formas.

## Sistema de diseño Tepuy

Colores:
- `--tanino: #3B170B`: fondo principal, el agua oscura de la laguna de Canaima.
- `--tanino-claro: #5C2A17`: superficies y filas.
- `--roca: #E0A58C` y `--roca-oscura: #C97F66`: paredes de los tepuyes.
- `--sabana: #2F4B35`: verde, estado "lista" o "aceptada".
- `--oro: #F2B544`: acento, acción principal y selección.
- `--neblina: #F5EEE6`: texto principal y campos de entrada.
- `--neblina-suave: #E7D3C7`: texto secundario.

Tipografía:
- Títulos y palabras protagonistas: Big Shoulders Display 800. Las letras altas y estrechas evocan las paredes de un tepuy.
- Texto: Atkinson Hyperlegible 400/700, hecha para leer con facilidad.
- Las dos fuentes van servidas desde `public/fonts/`, nunca desde Google en producción.
- Para ruso y chino, usa una pila de fuentes del sistema de respaldo; estas fuentes no cubren cirílico ni chino.

Reglas:
- Botones de al menos 44 px. Contraste de texto 4.5:1.
- Íconos en SVG de línea, nunca emoji.
- Botones reales (`<button>`, `<a>`), con `aria-label` en los que solo tienen ícono.
- Sin degradados de fondo ni tarjetas con borde de color a la izquierda.
- Ilustración: siluetas planas de tepuyes en capas (cielo oro, roca, sabana, tanino), con una línea de cascada.

## Flujo de la app

1. **Bienvenida y recorrido:** 4 pantallas, con opción "Saltar".
2. **Registro (4 pasos):**
   1. idioma de la app: español listo; inglés, francés, portugués, ruso y chino "pronto";
   2. rol: aprendiz, hablante, líder o visitante (el rol de líder lo confirma el profesor Roger);
   3. nombre o apodo y lugar, ambos opcionales;
   4. nivel de pemón.
3. **Tu tarjeta:** el resumen del registro.
4. **La app:** Inicio (palabra del día), Diccionario, Ficha de palabra, Traductor y Frases.
5. **Aportes:** formulario con la foto primero, y "Mis aportes" con el estado y la nota del revisor de cada aporte.

## Etapas

1. **Etapa 1 (ahora):** PWA sin conexión, datos en CSV revisados, sin IA. Interfaz en español.
2. **Etapa 2:** un backend simple para recibir aportes y un panel de revisión para el profesor Roger y los líderes, pensado para personas no técnicas.
3. **Etapa 3:** traducción asistida por IA. Todo lo que genere entra como `propuesta`. La prioridad es reunir frases paralelas, porque el valor está en las frases de ejemplo del libro maestro más que en las explicaciones de gramática.

## Cómo trabajar en este repo

- Antes de cambiar el modelo de datos, actualiza este archivo y `docs/brain-domain/`.
- Los tests cubren sobre todo las reglas duras: que nada `propuesta` se muestre como disponible, y que la búsqueda ignore diéresis y saltillo.
- Revisa cada pantalla a 390 px de ancho.
- Los comandos se documentan aquí apenas existan:
  - instalar: `[por definir]`
  - desarrollo: `[por definir]`
  - tests: `[por definir]`
  - validar datos: `[por definir]`
