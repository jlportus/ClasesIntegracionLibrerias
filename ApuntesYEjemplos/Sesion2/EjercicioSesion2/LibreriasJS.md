````md
# Librerías JavaScript puro (sin npm). ESM y CJS

---

### INDICE

- [Librerías JavaScript puro (sin npm). ESM y CJS](#librerías-javascript-puro-sin-npm-esm-y-cjs)
  - [INDICE](#indice)
  - [¿Qué es una librería en JavaScript “puro”?](#qué-es-una-librería-en-javascript-puro)
  - [Formas de integrar sin npm](#formas-de-integrar-sin-npm)
  - [Modelo 1: Script global (window)](#modelo-1-script-global-window)
  - [Modelo 2: ESM (ECMAScript Modules)](#modelo-2-esm-ecmascript-modules)
  - [CJS (CommonJS) y por qué existe](#cjs-commonjs-y-por-qué-existe)
  - [Comparativa ESM vs CJS](#comparativa-esm-vs-cjs)
  - [Inyectar HTML: template e innerHTML](#inyectar-html-template-e-innerhtml)
  - [“Componentes” sin frameworks: Web Components](#componentes-sin-frameworks-web-components)
  - [Ejemplo completo: Calculadora IVA como componente](#ejemplo-completo-calculadora-iva-como-componente)
  - [Cómo ejecutar sin npm (servidor mínimo)](#cómo-ejecutar-sin-npm-servidor-mínimo)
  - [Ejercicio para el alumno](#ejercicio-para-el-alumno)
- [Fin de la presentación](#fin-de-la-presentación)

---

## ¿Qué es una librería en JavaScript “puro”?

Una **librería** en JavaScript puro es código reutilizable que:

- vive en uno o varios ficheros `.js`
- expone una **API** (funciones/objetos/componentes)
- se integra por:
  - carga de scripts (`<script src=...>`) o
  - módulos nativos del navegador (`<script type="module">`)

Notas:
Sin npm seguimos teniendo “librerías”, solo cambia el mecanismo de distribución. En lugar de instalar un paquete, integramos ficheros locales o remotos directamente en la página. Esto permite entender lo esencial: separación librería/consumidor, API pública y forma de integración. En cursos es útil porque elimina tooling y deja el concepto “al desnudo”.

---

## Formas de integrar sin npm

Dos formas principales en navegador:

1) **Script global** (lo clásico)
- `<script src="lib.js"></script>`
- la librería suele colgar cosas en `window`

2) **ESM (módulos)** (lo moderno)
- `<script type="module" src="app.js"></script>`
- `export` / `import` entre ficheros

Notas:
El modelo global es simple, pero puede ensuciar el espacio global, generar colisiones y depender del orden de carga. ESM resuelve gran parte de esto: cada fichero es un módulo con imports explícitos, y el navegador gestiona dependencias. Para “librerías JavaScript puro”, ambos modelos son válidos para enseñar integración, y es útil compararlos.

---

# Modelo 1: Script global (window)

### Idea

- `lib/finanzas-global.js` define funciones y las expone en `window.Finanzas`
- `app-global.js` consume `window.Finanzas`
- `index-global.html` carga scripts en orden

Notas:
Este modelo es el equivalente a “copiar un JAR a una carpeta y añadirlo al classpath”, pero en web: cargas un archivo y te aparecen funciones disponibles globalmente. Es fácil para empezar, pero sufre problemas si dos librerías definen el mismo nombre global o si se cargan en orden incorrecto.

--

### index-global.html

```html
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <title>JS puro (global)</title>
</head>
<body>
  <h3>Demo JS puro (global)</h3>
  <div id="root"></div>

  <!-- Importante: primero la librería, después la app -->
  <script src="lib/finanzas-global.js"></script>
  <script src="app-global.js"></script>
</body>
</html>
````

Notas:
El orden es obligatorio: si la app se carga antes que la librería, fallará porque `window.Finanzas` no existirá aún. Esta es una fuente típica de errores cuando se integran scripts globales.

--

### lib/finanzas-global.js

```js
(function () {
  function calcularIva(base, tipoIva) {
    if (base < 0) throw new Error("La base no puede ser negativa");
    if (tipoIva < 0) throw new Error("El tipo de IVA no puede ser negativo");
    return base * tipoIva;
  }

  function calcularTotal(base, tipoIva) {
    return base + calcularIva(base, tipoIva);
  }

  // API pública
  window.Finanzas = {
    calcularIva,
    calcularTotal
  };
})();
```

Notas:
Se usa una IIFE para no dejar variables sueltas en el global. La “API pública” es `window.Finanzas`. Es un patrón muy típico en librerías antiguas en navegador. La validación mínima ayuda a que el consumidor reciba errores claros.

--

### app-global.js (consumidor)

```js
const root = document.getElementById("root");

root.innerHTML = `
  <label>Base (€): <input id="base" type="number" value="100"></label><br/>
  <label>IVA (ej. 0.21): <input id="iva" type="number" step="0.01" value="0.21"></label><br/>
  <button id="calc">Calcular</button>
  <pre id="out"></pre>
`;

document.getElementById("calc").addEventListener("click", () => {
  const base = Number(document.getElementById("base").value);
  const tipoIva = Number(document.getElementById("iva").value);

  const iva = window.Finanzas.calcularIva(base, tipoIva);
  const total = window.Finanzas.calcularTotal(base, tipoIva);

  document.getElementById("out").textContent =
    `IVA: ${iva}\nTotal: ${total}`;
});
```

Notas:
Aquí se ve la integración: la app no implementa el cálculo, lo consume de la librería. Se inyecta HTML en el DOM con `innerHTML`, que es la manera más simple de “insertar UI” sin frameworks. El alumno debe ver el paralelismo: `Finanzas` es la API, igual que una clase utilitaria en Java.

---

# Modelo 2: ESM (ECMAScript Modules)

### Idea

* `lib/finanzas-esm.js` usa `export`
* `app-esm.js` usa `import`
* `index-esm.html` usa `<script type="module">`

Notas:
ESM es el estándar moderno. La ventaja clave para integración: dependencias explícitas. No dependes del orden de `<script>` y reduces colisiones. También facilita empaquetado/bundling si más adelante se introduce tooling, pero aquí seguimos sin npm.

--

### index-esm.html

```html
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <title>JS puro (ESM)</title>
</head>
<body>
  <h3>Demo JS puro (ESM)</h3>
  <div id="root"></div>

  <script type="module" src="app-esm.js"></script>
</body>
</html>
```

Notas:
En ESM, el navegador trata el script como módulo. Esto permite `import` y `export`. Importante: en muchos navegadores, los módulos deben cargarse por HTTP para evitar restricciones (por eso más abajo se da un servidor mínimo).

--

### lib/finanzas-esm.js

```js
export function calcularIva(base, tipoIva) {
  if (base < 0) throw new Error("La base no puede ser negativa");
  if (tipoIva < 0) throw new Error("El tipo de IVA no puede ser negativo");
  return base * tipoIva;
}

export function calcularTotal(base, tipoIva) {
  return base + calcularIva(base, tipoIva);
}
```

Notas:
La API pública la define lo que se exporta. Esto es una gran mejora respecto al global: no hay `window.Finanzas`; el consumidor importa lo que necesita. Además, ESM favorece reutilización selectiva (importas solo ciertas funciones).

--

### app-esm.js

```js
import { calcularIva, calcularTotal } from "./lib/finanzas-esm.js";

const root = document.getElementById("root");

root.innerHTML = `
  <label>Base (€): <input id="base" type="number" value="100"></label><br/>
  <label>IVA (ej. 0.21): <input id="iva" type="number" step="0.01" value="0.21"></label><br/>
  <button id="calc">Calcular</button>
  <pre id="out"></pre>
`;

document.getElementById("calc").addEventListener("click", () => {
  const base = Number(document.getElementById("base").value);
  const tipoIva = Number(document.getElementById("iva").value);

  const iva = calcularIva(base, tipoIva);
  const total = calcularTotal(base, tipoIva);

  document.getElementById("out").textContent =
    `IVA: ${iva}\nTotal: ${total}`;
});
```

Notas:
La integración es más limpia: el consumidor declara explícitamente su dependencia. Esto facilita mantenimiento: si cambias el nombre de un export, el error aparece al compilar/cargar el módulo, no como una variable global “undefined”.

---

# CJS (CommonJS) y por qué existe

CJS es el sistema de módulos tradicional de Node.js:

* Exportación: `module.exports = ...`
* Importación: `require("...")`

Ejemplo:

```js
// lib-cjs.js
module.exports = {
  suma: (a, b) => a + b
};

// app-cjs.js
const lib = require("./lib-cjs.js");
console.log(lib.suma(2, 3));
```

Notas:
CJS nació para Node (servidor) cuando aún no existía ESM como estándar maduro en JS. En navegador, CJS no funciona directamente sin tooling (bundlers). Aun así, es importante explicarlo porque gran parte del ecosistema histórico de Node se basó en CJS. En integración profesional, aparecen problemas cuando un paquete es “CJS-only” o “ESM-only” y el consumidor espera lo contrario.

---

## Comparativa ESM vs CJS

* ESM:

  * estándar moderno
  * funciona en navegador nativo
  * `import/export`
* CJS:

  * histórico en Node
  * no nativo en navegador
  * `require/module.exports`

Notas:
La idea de la asignatura aquí no es resolver todos los casos avanzados, sino situar conceptos: ESM es el camino “puro” en navegador. CJS explica compatibilidades en Node. Cuando más adelante se introduzca npm, aparecerá el mundo “mixto”, donde algunas librerías se publican con doble formato o con configuración `exports`. Por ahora, el alumno debe entender: “para navegador sin npm, ESM es el camino”.

---

# Inyectar HTML: template e innerHTML

### innerHTML (rápido)

```js
root.innerHTML = `<h3>Hola</h3><button id="b">OK</button>`;
```

### template (más mantenible)

```html
<template id="tpl">
  <section>
    <h3>Calculadora IVA</h3>
    <button class="calc">Calcular</button>
    <pre class="out"></pre>
  </section>
</template>
```

```js
const node = document.getElementById("tpl").content.cloneNode(true);
document.getElementById("root").appendChild(node);
```

Notas:
`innerHTML` sirve para demos rápidas, pero mezclar grandes strings con lógica no escala bien. Los `<template>` permiten declarar el HTML en la página y luego instanciarlo con JS, lo que acerca el enfoque al concepto de “componente” sin frameworks.

---

# “Componentes” sin frameworks: Web Components

### Idea

Crear un elemento reutilizable:

* `<iva-calculator></iva-calculator>`

Se define con:

* `customElements.define(...)`
* Clase que extiende `HTMLElement`

Notas:
Esto es literalmente construir un “componente” estándar del navegador. Es ideal para una asignatura de integración: puedes empaquetar un Web Component como “librería local” (un fichero JS) e integrarlo en páginas distintas sin frameworks y sin npm.

---

## Ejemplo completo: Calculadora IVA como componente

### index-component.html

```html
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <title>Web Component</title>
</head>
<body>
  <h3>Web Component: IVA</h3>

  <iva-calculator></iva-calculator>

  <script type="module" src="iva-calculator.js"></script>
</body>
</html>
```

Notas:
Se integra el componente como un módulo (ESM). Esto facilita que dentro del componente importemos nuestra librería `finanzas-esm.js`.

--

### iva-calculator.js (componente ESM que integra librería)

```js
import { calcularIva, calcularTotal } from "./lib/finanzas-esm.js";

class IvaCalculator extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section>
        <label>Base (€): <input id="base" type="number" value="100"></label><br/>
        <label>IVA (ej. 0.21): <input id="iva" type="number" step="0.01" value="0.21"></label><br/>
        <button id="calc">Calcular</button>
        <pre id="out"></pre>
      </section>
    `;

    this.querySelector("#calc").addEventListener("click", () => {
      const base = Number(this.querySelector("#base").value);
      const tipoIva = Number(this.querySelector("#iva").value);

      const iva = calcularIva(base, tipoIva);
      const total = calcularTotal(base, tipoIva);

      this.querySelector("#out").textContent = `IVA: ${iva}\nTotal: ${total}`;
    });
  }
}

customElements.define("iva-calculator", IvaCalculator);
```

Notas:
Aquí se ve una integración completa “sin npm”: el componente es un fichero reutilizable que actúa como “librería de UI”, y además integra otra librería interna (`finanzas-esm.js`) para la lógica. Este diseño separa responsabilidades: el componente gestiona DOM y eventos; la librería finanzas gestiona cálculos. Esto reproduce el patrón “librería + consumidor” pero en frontend.

---

## Cómo ejecutar sin npm (servidor mínimo)

En la carpeta del proyecto:

```bash
python3 -m http.server 8000
```

Abrir:

* `http://localhost:8000/index-esm.html`
* `http://localhost:8000/index-component.html`

Notas:
Los módulos ESM suelen requerir servir los ficheros por HTTP. Abrir directamente con `file://` puede fallar por restricciones de seguridad del navegador (CORS y carga de módulos). Este servidor de Python es una forma simple y estándar de ejecutar demos sin instalar tooling frontend.

---

# Ejercicio para el alumno

## Parte A: Librería “Conversor” (ESM)

Crear `lib/conversor-esm.js` con:

* `eurosAPesetas(euros)`
* `pesetasAEuros(pesetas)`

Ejemplo:

```js
export function eurosAPesetas(euros) {
  return euros * 166.386;
}

export function pesetasAEuros(pesetas) {
  return pesetas / 166.386;
}
```

Notas:
Esta parte refuerza la idea de API pública en ESM: el alumno define exports claros y los reutiliza. El factor es fijo y suficiente para el ejercicio. Se valora que el alumno no duplique lógica en la app o componente.

--

## Parte B: Integrar la librería en un Web Component

Crear un componente `<conversor-moneda></conversor-moneda>` que:

* pida cantidad
* permita elegir dirección (euros→pesetas o pesetas→euros)
* muestre el resultado

Requisito:

* el componente debe usar `import` desde `lib/conversor-esm.js`

Notas:
Este paso obliga a integrar una librería propia dentro de un componente, sin npm. Es el patrón que luego se trasladará a proyectos con npm: la diferencia será el mecanismo de instalación, pero el diseño (separar lógica, declarar dependencias, exponer API) será el mismo.

--

## Parte C (opcional): versión global

Crear versión global de la librería:

* `lib/conversor-global.js` expone `window.Conversor`

Y una página `index-global.html` que lo use.

Notas:
Esto sirve para comparar modelos. El alumno verá que la versión global es más frágil por orden de carga, pero más simple. La versión ESM es más explícita y mantenible.

---

# Fin de la presentación
<a href="..\..\README.md">Ir al indice de Presentaciones</a>
<a href="../Sesion2/Sesion2.md">Ir a la Sesion 2</a>

Notas:
En esta sesión se ha construido el concepto de “librería” en JavaScript sin npm: ficheros reutilizables con una API pública. Se han visto dos modelos de integración: scripts globales y módulos ESM, y se ha introducido CommonJS como el sistema histórico de Node. Además, se ha mostrado cómo “inyectar HTML” y cómo crear componentes estándar con Web Components, integrando librerías internas mediante imports. En sesiones posteriores, npm y bundlers automatizarán parte del proceso, pero el concepto base de integración seguirá siendo el mismo.

```
::contentReference[oaicite:0]{index=0}
```
