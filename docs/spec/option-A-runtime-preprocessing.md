# Especificación: Opción A — Preprocesado Runtime de Markdown (Implementable por LLM)

📌 **Objetivo:** Permitir que un único `index.html` (RevealJS) cargue y muestre cualquier MD del repositorio como una sesión dinámica sin modificar los archivos MD en disco. Al hacer click en enlaces relativos dentro de un MD (p.ej. `./ApuntesYEjemplos/Sesion3/Sesion3.md`), el sistema debe interceptar la acción, hacer fetch del MD destino, preprocesarlo en memoria (resolver recursos relativos, detectar anchors y reescribir temporalmente enlaces para navegación SPA) e inyectarlo en `.slides`, todo sin recargar la página y manteniendo deep-links y el historial del navegador.

> Nota: el enfoque de generación de `sessions.json` fue desactivado y el script `scripts/generate-sessions.js` eliminado; la navegación ahora depende del loader runtime y de enlaces a archivos MD.

---

## 1. Alcance y restricciones ✳️
- No se modifican los archivos `.md` en disco. Todas las transformaciones ocurren en memoria al cargarlos.  
- El sitio se sirve como estático (p.ej. GitHub Pages).  
- Debe soportarse enlaces Markdown y HTML dentro de los MD, recursos relativos (imágenes/recursos), anclas internas y deep-links.  
- El enfoque busca ser SPA-friendly y compatible con los plugins Reveal ya usados (RevealMarkdown, RevealNotes, RevealHighlight).

---

## 2. Artefactos a crear / editar 📁
- Nuevo: `docs/spec/option-A-runtime-preprocessing.md` (esta especificación).  
- Nuevo: `scripts/md-utils.js` (helpers puros para manipular MD en memoria).  
- Editar: `scripts/load-sessions.js` → refactor para exponer `loadMarkdown()` y manejar inyección dinámica. Podría renombrarse a `scripts/runtime-loader.js` si se prefiere.  
- Opcional: `scripts/generate-sessions.js` → generar `sessions.json` con metadata (no obligatorio).  
- Documentación y tests: `scripts/test-md-utils.js`, actualizar `docs/SessionsIntegration.md`.

---

## 3. Esquema de navegación y hash (decisión) ⚖️
Recomiendo usar un esquema transparente para deep links: **`#/md/<url-encoded-path>#<anchor>`**. Ejemplos:
- `#/md/ApuntesYEjemplos%2FSesion3%2FSesion3.md` → inicio de la sesión.
- `#/md/ApuntesYEjemplos%2FSesion3%2FSesion3.md#introduccion` → slide/ancla `introduccion` dentro de esa sesión.

Motivación: no dependemos de índices globales calculados en build, y la ruta muestra claramente qué MD se quiere cargar. Si más adelante se desea mapear a `#/h/v` se podría añadir en `sessions.json`.

---

## 4. API y firmas sugeridas (para LLM implementar) 🧩
### `scripts/md-utils.js` (puro, sin side-effects)
- `slugify(text: string): string` → slug compatible con anchors.  
- `extractAnchors(mdText: string): Array<{ id: string, text: string }>` → lista de headings con IDs.  
- `resolveRelativeResource(basePath: string, resourceUrl: string): string` → convierte `./img.png` en `ApuntesYEjemplos/Sesion3/img.png` (normaliza separadores).  
- `rewriteLinksInMemory(mdText: string, basePath: string, sessionsMap?: SessionsMap): string` → en la copia en memoria, reescribe enlaces a `.md`/`.html` para ser manejados por el runtime (sustituir por `#/md/<encoded>` o marcar con `data-*`), y reescribe recursos relativos (images, hrefs) a rutas root-compatibles.  

### `scripts/load-sessions.js` (runtime loader)
- `async loadMarkdown(mdPath: string, options?: { anchor?: string })` → flujo principal para cargar una sesión desde `mdPath`:
  1. normalizar `mdPath` (resolve relative to site root), consultar cache.
  2. fetch del MD (HTTP). Si falla, lanzar error o mostrar banner de UX.  
  3. `processed = rewriteLinksInMemory(rawMd, basePath, sessionsMap)`  
  4. inyectar `processed` en `.slides` (reemplazando la sección actual o insertando nueva).  
  5. llamar a `Reveal.sync()` o re-renderizar para que RevealMarkdown procese el contenido y luego navegar al `anchor` si existe.  
- `initLoader(opts?: { initialMd?: string })` → cargar MD inicial (`README.md`) y registrar el click interceptor y handlers de hash/popstate.  
- `onLinkClick(event)` → handler global para interceptar clicks dentro de los MD; resuelve ruta y llama `loadMarkdown()` cuando corresponda.  

### `sessionsMap` (opcional, generado en build)
- Estructura: `{ [normalizedPath]: { path, anchors: { [slug]: { /* optional meta */ } } } }`  
- Uso: permite resolver enlaces que apuntaban a `sesion3.html` (si existen) sin tener que editar MD.

---

## 5. Implementación: pasos detallados (para un LLM) ⚙️
A continuación pasos secuenciados que el LLM implementará, con notas técnicas y ejemplos de código donde procede.

### Paso 1 — Crear `scripts/md-utils.js` (pseudocódigo)
- Implementar funciones: `slugify`, `extractAnchors`, `resolveRelativeResource`, `rewriteLinksInMemory`.
- Tests unitarios: asegurarse con ejemplos de MD que `rewriteLinksInMemory`:
  - devuelve rutas de imágenes convertidas a `ApuntesYEjemplos/SesionX/img.png` (normaliza `\`→`/`),
  - convierte `[Ver](ApuntesYEjemplos/Sesion2/Sesion2.md#ancla)` en algo manejable por runtime (por ejemplo `#/md/Apuntes...%2FSesion2%2FSesion2.md#ancla`) o marca `data-md-link="Apuntes..."`.

Ejemplo de función (esqueleto):
```js
// md-utils.js
export function slugify(text) { /* ... */ }
export function extractAnchors(md) { /* ... */ }
export function resolveRelativeResource(basePath, url) { /* ... */ }
export function rewriteLinksInMemory(md, basePath, sessionsMap) {
  // regex para markdown links y anchors HTML
  // - resolver url relativo -> relTarget
  // - reemplazar por `#/md/${encodeURIComponent(relTarget)}${anchor ? '#'+anchor : ''}`
}
```

### Paso 2 — Refactor `scripts/load-sessions.js` (o crear `runtime-loader.js`)
- Añadir `loadMarkdown(mdPath, { anchor })`:
  - Normaliza ruta (por ejemplo `mdPath.replace(/^\.\//, '')`).
  - Fetch MD (GET).
  - Llamar `md-utils.rewriteLinksInMemory` con `basePath = dirname(mdPath)`.
  - Inyectar el MD procesado en la sección: `section = document.createElement('section'); section.setAttribute('data-markdown', '...')` o insertar el HTML resultante de `marked(processed)`.
  - Si se inyecta `data-markdown`, se debe esperar a que `RevealMarkdown` lo procese y entonces navegar al `anchor`.
- Manejar cache: `const cache = new Map(); cache.set(mdPath, processedHtml)`.
- Error UX: mostrar `div.alert` con mensaje y un link al MD original como fallback.

Ejemplo (esqueleto):
```js
async function loadMarkdown(mdPath, options = {}) {
  if (cache.has(mdPath)) { /* usar cache */ }
  const resp = await fetch(mdPath);
  if (!resp.ok) throw new Error('fetch failed');
  let raw = await resp.text();
  const processed = rewriteLinksInMemory(raw, dirname(mdPath), sessionsMap);
  // inyectar
  const sec = document.createElement('section');
  sec.setAttribute('data-markdown', '');
  sec.innerHTML = '<textarea data-template>' + escape(processed) + '</textarea>';
  // Replace current slide container content or append
  document.querySelector('.slides').innerHTML = '';
  document.querySelector('.slides').appendChild(sec);
  // forzar Reveal a procesar (RevealMarkdown plugin will pick it)
  Reveal.sync();
  if (options.anchor) navigateToAnchor(options.anchor);
}
```

> Nota técnica: Reveal's Markdown plugin carga texto mediante XHR si `data-markdown` apunta a un archivo; para evitar múltiples XHR y aplicar transformaciones, preferimos inyectar el contenido ya procesado (como un `<script type="text/template">` o un `<textarea data-template>` y luego invocarlo). Otra alternativa es crear un Blob URL con `URL.createObjectURL(new Blob([processed], {type:'text/plain'}))` y asignarlo a `data-markdown`.

### Paso 3 — Click Interceptor y Resolución de enlaces
- Modificar el handler existente para:
  - Si `href` es absoluto (http, mailto) → permitir.
  - Si `href` es `#/md/....` → decode y llamar `loadMarkdown()`.
  - Si `href` es relativo a `.md` o `.html` → resolver ruta relativa respecto al MD actual o al `index` y llamar `loadMarkdown()` con ruta MD (usar `sessionsMap` si existe para mapear `.html` → `.md`).

### Paso 4 — Deep-links y `popstate`/`hashchange`
- Cuando se cargue una sesión, actualizar `location.hash = '#/md/' + encodeURIComponent(mdPath) + (anchor ? '#'+anchor : '')`.  
- Registrar `window.addEventListener('hashchange'...)` para cargar la sesión correcta cuando el user hace back/forward o abre un deep link.

### Paso 5 — Tests y QA
- Pruebas manuales: abrir `index.html`, hacer click en `[Ir a Sesión 3](ApuntesYEjemplos/Sesion3/Sesion3.md#ancla)`, comprobar que la página no recarga y que Reveal muestra la slide correcta.  
- Probar imágenes/recursos relativos.  
- Probar back/forward.  
- Automatizar `md-utils` tests.

---

## 6. Ejemplos concretos y casos de uso (para incluir en el spec) 🧪
- MD autor escribe (sin cambios):
  - `Enlace a la sesión: [Ir a Sesión 3](ApuntesYEjemplos/Sesion3/Sesion3.md#introduccion)`
  - `Imagen: ![](./Recursos/diag.png)`
- Resultado runtime: al click → `index.html` carga y muestra `Sesion3.md` transformado, la imagen apunta ahora a `ApuntesYEjemplos/Sesion3/Recursos/diag.png`, la URL se convierte en `#/md/ApuntesYEjemplos%2FSesion3%2FSesion3.md#introduccion`.

---

## 7. Criterios de aceptación ✅
- [ ] Los archivos MD en disco no cambian tras ejecutar el flujo.  
- [ ] Hacer click en enlace relativo MD→MD carga la sesión sin recarga completa.  
- [ ] Recursos relativos cargan correctamente dentro de la sesión inyectada.  
- [ ] Deep-links y el uso del botón atrás/adelante funcionan.  
- [ ] Enlaces externos no son interceptados.

---

## 8. Notas finales y posibles mejoras ✨
- Mejora opcional: creación de `sessions.json` en build para acelerar resolución de `.html` antiguos o para permitir `#/h/v` si se desea.  
- Mejora opcional: agregar un watcher para regenerar mapas o invalidar cache durante desarrollo.  

---

¿Quieres que escriba el **código esqueleto real** (implementación inicial de `md-utils.js` y `load-sessions.js` listo para pruebas) como siguiente paso para que lo incorpores en el repo? 🚀