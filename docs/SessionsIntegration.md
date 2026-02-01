# Integración de sesiones (implementación)

Resumen rápido:
- `scripts/generate-sessions.js` genera **sessions.json** a partir de `README.md` y los `*.md` bajo `ApuntesYEjemplos/`.
- `scripts/load-sessions.js` inyecta en runtime las secciones (`<section data-markdown="...">`) en `.slides` y añade un manejador para enlaces internos a `.md`.

Uso:
- Ejecuta `npm run generate-sessions` para regenerar `sessions.json` (se ejecuta automáticamente antes de `npm start` y `npm run build`).
- Abre `index.html` servida desde un servidor (ej.: `npm start`, `npx http-server -p 8080` o GitHub Pages). No funciona correctamente con `file://` por el `fetch`.

Notas sobre enlaces entre MD:
- Escribir enlaces relativos en MD como `[Ir a sesión 2](ApuntesYEjemplos/Sesion2/Sesion2.md#ancla)`.
- El generador extrae headings y mapea `#ancla` a la posición (h,v) dentro de `sessions.json` para navegación directa.
- Si prefieres un comportamiento explícito, puedes usar enlaces `reveal://sesion-id#ancla` y el handler podría adaptarse (no implementado por defecto).

Pruebas básicas tras cambios:
1. `npm run generate-sessions` y `npm start`.
2. Abrir `http://localhost:1948` (según gulp serve) y comprobar que las diapositivas se cargan.
3. Hacer click en vínculos a otros MD y comprobar que Reveal navega al slide correcto.
4. Probar `#/<h>/<v>` deep links y las notas (Reveal Notes).

Si quieres, implemento también:
- Reescritura de enlaces en MD durante el build (opcional).
- Soporte de `reveal://` scheme para la edición de contenidos.
